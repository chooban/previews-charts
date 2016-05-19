const d3 = require('d3');
const barChart = require('./charts/bar-chart.component')();
const donutChart = require('./charts/donut-chart.component')();
const func = require('lodash/function');
import * as Previews from './api/previews';

$('.content').ready(setup);

function setup() {
  let currentChart = drawDonutChart;

  Previews.retrievePreviewsList((listOfIssues) => {
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
                              Previews.retrievePreviewsData(issue, currentChart);
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
}


function drawDonutChart(data) {
  const ignore = ['MERCHANDISE', 'APPAREL', 'SUPPLIES', 'UK ITEMS', 'BOOKS'];
  const toExtract = /(IMAGE|MARVEL|DC COMICS|DARK HORSE|IDW)/i;
  //var data = topResults(countByPublisher(data.contents), 10, ignore);

  const filteredData = countByPublisher(data.contents)
                          .filter((d) => d.label.match(toExtract) !== null);

  var chart = d3.select('.chart')
                  .datum(filteredData)
                  .call(donutChart);

  function topResults(data, n, ignore = []) {
    const results = data.filter((d) => !ignore.includes(d.label))
                        .slice(0, n);
    return results;
  }
}

function drawBarChart(data) {
  var data = countByPublisher(data.contents);

  var chart = d3.select('.chart')
                  .datum(data)
                  .call(barChart);

  d3.select(window).on('resize', func.debounce(draw, 250));

  function draw() {
    chart.call(barChart);
  }
}

function countByPublisher(previewsContents) {
  return previewsContents.map(mapByPublisher)
                          .reduce(countByKey, [])
                          .sort(byValue);

  function byValue(a, b) {
    return b.value - a.value;
  }

  function countByKey(acc, item) {
    const idx = acc.findIndex((e, idx) => e.label === item.label);

    if (idx > -1) {
      acc[idx] = {
        label: item.label,
        value: acc[idx].value + 1
      };
    } else {
      acc.push(item);
    }

    return acc;
  }

  function mapByPublisher(lineItem) {
    return {
      label: lineItem.publisher,
      value: 1
    }
  }
}
