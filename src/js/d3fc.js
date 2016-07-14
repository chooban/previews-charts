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
    'height': 300,
    'padding': 30
  };

  const root = d3.select('.content').html('')

  //gigsByMonth(root.append('svg'), svgAttrs);
  //popularArtists(root.append('svg'), svgAttrs);
  gigsByYear(root.append('svg'), gigsByArtist, svgAttrs);
}

function gigsByYear(selection, data, config) {
  const gigs = d3.nest()
    .key((gig) => gig.date.substring(0,4))
    .rollup((d) => d.length)
    .entries(_.flattenDeep(_.map(data, (artist) => artist.gigs)))

  const yExtent = fc.util.extent()
    .fields(['values'])
    .include([0])
    .pad([0, 0.2]);

  const chart = fc.chart.cartesian(d3.scale.ordinal(), d3.scale.linear())
    .chartLabel('Gigs By Year')
    .xDomain(_.map(gigs, y => y.key))
    .yDomain(yExtent(gigs))
    .yTicks(5)
    .yNice();

  const series = fc.series.bar()
    .xValue((d) => d.key)
    .yValue((d) => d.values)
    .decorate((s) => {
      s.enter().select('path')
        .on('click', function(d) {
          const filteredGigs = _.chain(data)
            .map((artist) => artist.gigs)
            .flattenDeep()
            .filter((gig) => gig.date.substring(0, 4) === '' + d.key)
            .value();

          const gigs = d3.nest()
            .key((gig) => { 
              console.log("Looking up " + gig.date.substring(5,2));
              return months[+gig.date.substring(5,2)]
            })
            .rollup((d) => d.length)
            .entries(filteredGigs);

          chart
            .chartLabel("Gigs By Month For " + d.year)
            .xDomain(months)
            .yDomain(yExtent(gigs));

          chart.plotArea(series);

          selection
            .datum(gigs)
            .transition()
            .duration(1500)
            .call(chart);
        })
    });

  chart.plotArea(series);

  selection.attr({
    width: 1000,
    height: config.height
  });

  selection
    .datum(gigs)
    .transition()
    .duration(1500)
    .call(chart);
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
                        .filter((artist) => artist.count >= 2)
                        .value();

  const xScale = d3.scale.ordinal()
    .domain(_.map(gigs, (d) => d.artist))
    .rangePoints([config.padding, config.width - config.padding], 1);

  const xAxis = fc.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .decorate((s) => {
      s.enter().select('text')
        .style('text-anchor', 'end')
        .attr('transform', 'rotate(-65 10 10)')
    })

  const xAxisNode = selection.append('g')
    .classed('xaxis', true)
    .call(xAxis)

  const xAxisHeight = Math.ceil(xAxisNode.node().getBBox().height);

  xAxisNode.attr('transform', 'translate(0, ' + (config.height - xAxisHeight) + ')')

  const yScale = d3.scale.linear()
    .domain([0, d3.max(gigs, (d) => d.count) + 2])
    .range([config.height - xAxisHeight, config.padding]);

  const yAxis = fc.svg.axis()
    .scale(yScale)
    .tickValues([2,4,6,8,10,12])
    .orient('right')

  const series = fc.series.bar()
    .xValue((d) => d.artist)
    .yValue((d) => d.count)
    .xScale(xScale)
    .yScale(yScale)
    .decorate((s) => {
      s.select('path')
        .append('title')
          .text((d) => d.artist + ' (' + d.count + ')')
    })

  selection.attr({
    width: config.width,
    height: config.height
  });

  selection
    .append('g')
    .classed('bars', true)
    .datum(gigs)
    .call(series);

  selection.append('g')
    .classed('yaxis', true)
    .call(yAxis)
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
