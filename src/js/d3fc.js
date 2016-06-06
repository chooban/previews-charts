/* global $ */
window.$ = window.jQuery = require('jquery');
require('bootstrap');

const d3 = require('d3');
const fc = require('d3fc');
const _ = require('lodash');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const gigsByArtist = require('./gig-data.json');

$('.content').ready(setup);

function setup() {
  const svgAttrs = {
    'width': 500,
    'height': 250,
    'padding': 30
  };

  const root = d3.select('.content').html('')

  gigsByMonth(root.append('svg'), svgAttrs);
  popularArtists(root.append('svg'), svgAttrs);
}

function popularArtists(selection, config) {
  const gigs = _.chain(gigsByArtist)
                        .mapValues((v, k) => {
                          return {
                            'artist': k,
                            'count': v.gigs.length
                          };
                        })
                        .values()
                        .filter((artist) => artist.count > 2)
                        .value();

  const xScale = d3.scale.ordinal()
    .domain(_.map(gigs, (d) => d.artist))
    .rangePoints([0, config.width - config.padding], 1);

  const yScale = d3.scale.linear()
    .domain([0, d3.max(gigs, (d) => d.count)])
    .range([config.height - config.padding, config.padding]);

  const yAxis = fc.svg.axis()
    .scale(yScale)
    .tickValues([2,4,6,8,10])
    .orient('right')

  const series = fc.series.bar()
    .xValue((d) => d.artist)
    .yValue((d) => d.count)
    .xScale(xScale)
    .yScale(yScale);

  selection.attr({
    width: config.width,
    height: config.height
  });

  selection
    .datum(gigs)
    .call(series);

  selection.append('g').call(yAxis)
    .attr('transform', 'translate(' + (config.width - config.padding) + ', 0)')
}

function gigsByMonth(selection, config) {
  const gigsByMonth = _.chain(gigsByArtist)
                        .map((artist) => artist.gigs)
                        .flattenDeep()
                        .map((gig) => {
                          const gigDate = new Date(gig.date);
                          return {
                            'month': months[gigDate.getMonth()]
                          };
                        })
                        .countBy(_.property('month'))
                        .mapValues((v, k) => {
                          return {
                            'month': k,
                            'count': v
                          };
                        })
                        .values()
                        .value();


  var yExtent = fc.util.extent()
    .include(0)
    .pad([0, 0.5])
    .fields(['count']);

  var chart = fc.chart.cartesian(d3.scale.ordinal(), d3.scale.linear())
    .chartLabel('Gigs By Month')
    .xDomain(months)
    .yDomain(yExtent(gigsByMonth))
    .yTicks(5)
    .yNice();

  var series = fc.series.bar()
    .xValue((d) => d.month)
    .yValue((d) => d.count);

  chart.plotArea(series);

  selection.attr({
    width: config.width,
    height: config.height
  });

  selection
    .datum(gigsByMonth)
    .call(chart);


}
