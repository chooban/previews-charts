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
  const ignore = [
    'APPAREL',
    'BOOKS',
    'GAMES',
    'MAGAZINES',
    'MERCHANDISE',
    'RPG',
    'SUPPLIES',
    'UK ITEM',
    'UK ITEMS',
    'UK SUPPLIES',
    'UNKNOWN'
  ];
  const toLabelAndValue = (objValue, key) => { return { label: key, value: objValue } }

  let history = [];

  const byPublisher = _.chain(data.contents)
    .filter((d) => !ignore.includes(d.publisher))
    .countBy(_.property('publisher'))
    .map(toLabelAndValue)
    .value();

  const root = extractPublishers(byPublisher, 100);
  history.push(root);

  d3.select('.chart')
      .datum(root)
      .call(donutChart);

  donutChart.on('sliceClicked', function(d) {
    if (d.childData && d.childData.length) {
      history.push(d.childData);
      d3.select('.chart')
        .datum(d.childData)
        .call(donutChart.showBack(true));
    }
  });

  donutChart.on('back', function() {
    // Current chart is the tail of the history
    history.pop();

    d3.select('.chart')
      .datum(history[history.length - 1])
      .call(donutChart.showBack(history.length > 1));
  });

  function extractPublishers(allPublishers, count) {
    const filter = (d) => (count <= 2) ? true : d.value >= count;
    const totalItems = (d) => _.reduce(d, (sum, n) => sum += n.value, 0);

    let extracted = _.filter(allPublishers, filter)

    let others = _.chain(allPublishers)
                    .differenceBy(extracted, _.property('label'))
                    .sortBy(_.property('value'))
                    .reverse()
                    .value();

    while ((totalItems(extracted) < totalItems(others)) && extracted.length < 19) {
      extracted = extracted.concat(others.splice(0,1));
    }

    extracted = _.map(extracted, countPublishedItems);

    if (totalItems(others) < 25) {
      extracted = extracted.concat(others);
      others = null;
    }

    if (others && others.length) {
      const othersTotaled = others.reduce((acc, item) => {
          acc.value += item.value;
          return acc;
        },
        {label: 'OTHERS', value: 0, childData: []}
      );
      othersTotaled.childData = extractPublishers(others, Math.ceil(count * (2/3)));
      extracted.push(othersTotaled);
    }

    return extracted;
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

