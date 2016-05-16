var d3 = require('d3');
var barChartFactory = require('./charts/bar-chart.component');

$('.content').waitUntilExists(setup, true);

function setup() {
  var barChart = retrievePreviewsData.bind(this, drawBarChart);
  var donutChart = retrievePreviewsData.bind(this, drawDonutChart);

  d3.select('.bar-item')
    .on('click.redraw', barChart);

  d3.select('.donut-item')
    .on('click.redraw', donutChart);

  barChart();
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
  var width = 360;
  var height = 360;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;

  var data = topResults(countByPublisher(data), 10);

  var colour = d3.scale.category20();

  var svg = d3.select('.content')
              .html('')
            .append('svg')
              .attr('width', width)
              .attr('height', height)
            .append('g')
              .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

  var arc = d3.svg.arc()
              .innerRadius(radius - donutWidth)
              .outerRadius(radius);

  var pie = d3.layout.pie()
              .value(function(d) { return d.count; })
              .sort(null);

  var path = svg.selectAll('path')
                .data(pie(data))
                .enter()
                  .append('path')
                    .attr('d', arc)
                    .attr('fill', function(d) {
                      return colour(d.data.publisher);
                    });

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
