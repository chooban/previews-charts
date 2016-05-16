var d3 = require('d3');
var barChartFactory = require('./charts/bar-chart.component');
var donutChartFactory = require('./charts/donut-chart.component');
var _ = require('lodash/function');

$('.content').ready(setup);

function setup() {
  var barChart = retrievePreviewsData.bind(this, drawBarChart);
  var donutChart = retrievePreviewsData.bind(this, drawDonutChart);

  d3.select('.bar-item')
    .on('click.redraw', barChart);

  d3.select('.donut-item')
    .on('click.redraw', donutChart);

  donutChart();
}

function retrievePreviewsData(done) {
  d3.json('api/previews/latest', function(err, data) {
    if (err) {
      console.error(err);
      d3.select('.content').text('Sorry, could not load required data');
      return;
    }

    done(data.contents);
  });
}

function drawDonutChart(data) {
  var donutChart = donutChartFactory();
  var data = topResults(countByPublisher(data), 10);

  var chart = d3.select('.content').html('')
                .append('div')
                  .attr('class', 'chart')
                  .datum(data)
                  .call(donutChart);

  function topResults(data, n) {
    var newData = data.slice(0, n);

    return newData;
  }
}

function drawBarChart(data) {
  var barChart = barChartFactory();
  var data = countByPublisher(data);

  var chart = d3.select('.content')
                  .html('')
                .append('div')
                  .attr('class', 'chart')
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
