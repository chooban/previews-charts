var d3 = require('d3');
var barChartFactory = require('./charts/bar-chart.component');
var donutChartFactory = require('./charts/donut-chart.component');
var _ = require('lodash/function');

$('.content').ready(setup);

function setup() {
  let currentChart = drawDonutChart;

  retrievePreviewsList((listOfIssues) => {
    const row = d3.select('.content')
                    .html('')
                    .append('div')
                      .classed('row', true);

    const firstColumn = row.append('div').classed('col-md-2', true);
    row.append('div').classed('col-md-10', true).classed('chart', true);

    const list = firstColumn.append('select')
                            .classed('issueSelect', true)
                            .on('change', function() {
                              const issue = d3.select('.issueSelect').property('value');
                              retrievePreviewsData(issue, currentChart);
                            })
                            .selectAll('option')
                              .data(listOfIssues)

    list.enter()
        .append('option')
          .attr('selected', (d, i) => i === 0 ? 'true' : '')
          .property('selected', (d, i) => i === 0)
          .text((d) => d);

    list.exit().remove();

    d3.select('.issueSelect').on('change')();
  });

  //d3.select('.bar-item')
    //.on('click.redraw', barChart);

  //d3.select('.donut-item')
    //.on('click.redraw', donutChart);

  //donutChart();
}

const retrievePreviewsData = (issue, done) => {
  d3.json('api/previews/' + issue, (err, data) => {
    if (err) {
      console.error(err);
      d3.select('.content').text('Sorry, could not load required data');
      return;
    }

    done(data);
  })
}

const retrievePreviewsList = (done) => {
  d3.json('api/previews/', (err, data) => {
    if (err) {
      console.error(err);
      d3.select('.content').text('Sorry, could not load required data');
      return;
    }

    done(data);
  });
}

function drawDonutChart(data) {
  var donutChart = donutChartFactory();
  var data = topResults(countByPublisher(data.contents), 10);

  var chart = d3.select('.chart')
                  .html('')
                  .datum(data)
                  .call(donutChart);

  function topResults(data, n) {
    var newData = data.slice(0, n);

    return newData;
  }
}

function drawBarChart(data) {
  var barChart = barChartFactory();
  var data = countByPublisher(data.contents);

  var chart = d3.select('.chart')
                  .html('')
                  .datum(data)
                  .call(barChart);

  d3.select(window).on('resize', _.debounce(draw, 250));

  function draw() {
    chart.call(barChart);
  }
}

function countByPublisher(previewsContents) {
  return previewsContents.map(mapByPublisher)
                          .reduce(countByKey, [])
                          .sort(byValue);

  function byValue(a, b) {
    return b.count - a.count;
  }

  function countByKey(acc, item) {
    var idx = acc.findIndex(function(e, idx) {
      return (e.publisher === item.publisher);
    });

    if (idx > -1) {
      acc[idx] = {
        publisher: item.publisher,
        count: acc[idx].count + 1
      };
    } else {
      acc.push(item);
    }

    return acc;
  }

  function mapByPublisher(lineItem) {
    return {
      publisher: lineItem.publisher,
      count: 1
    }
  }
}
