/* global $ */
const d3 = require('d3');
const donutChart = require('./charts/donut-chart.component')();
const _ = require('lodash');
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
  const toLabelAndValue = (objValue, key) => { return { label: key, value: objValue } }

  const byPublisher = _.chain(data.contents)
    .filter((d) => !ignore.includes(d.publisher))
    .countBy(_.property('publisher'))
    .map(toLabelAndValue)
    .value();

  let { topLevel, others } = extractPublishers(byPublisher, (d) => d.value > 100);
  topLevel.push(others);

  d3.select('.chart')
      .datum(topLevel)
      .call(donutChart);

  donutChart.on('sliceClicked', function(d) {
    if (d.childData && d.childData.length) {
      d3.select('.chart')
        .datum(d.childData)
        .call(donutChart);
    }
  });

  function extractPublishers(allPublishers, filter) {
    const extracted = _.chain(allPublishers)
      .filter(filter)
      .map(countPublishedItems)
      .value();

    const others = _.differenceBy(allPublishers, extracted, _.property('label'));
    const othersTotaled = others.reduce((acc, item) => {
      acc.value += item.value;
      acc.childData.push(item);
      return acc;
    },
    { label: 'OTHERS', value: 0, childData: []});

    return {
      topLevel: extracted,
      others: othersTotaled
    }
  }

  function countPublishedItems(entry) {
    const publisherItems = _.filter(data.contents, (d) => d.publisher === entry.label);
    const trades = _.remove(publisherItems, (d) => d.title.match(/ TP /));
    const hardcovers = _.remove(publisherItems, (d) => d.title.match(/ HC /));

    entry.childData = [
      {
        label: 'Trades',
        value: trades.length
      },
      {
        label: 'HC Trades',
        value: hardcovers.length
      },
      {
        label: 'Floppies',
        value: publisherItems.length
      }
    ];
    return entry;
  }

}

