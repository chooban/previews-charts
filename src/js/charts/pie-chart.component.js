var d3 = require('d3');
var _ = require('lodash/util');

function pieChartFactory() {

  var pieChart = function(selection) {
    var width = 360;
    var height = 360;
    var radius = Math.min(width, height) / 2;
    var donutWidth = 75;
    var colour = d3.scale.category20();

    selection.each(function(data) {
      var svg = d3.select(this)
                    .append('svg')
                      .attr('width', width)
                      .attr('height', height)
                    .append('g')
                      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

      var arc = d3.svg.arc()
                  .innerRadius(radius - donutWidth)
                  .outerRadius(radius);

      var pie = d3.layout.pie()
                  .value(_.property('count'))
                  .sort(null);

      var path = svg.selectAll('path')
                    .data(pie(data))
                    .enter()
                      .append('path')
                        .attr('d', arc)
                        .attr('fill', function(d) {
                          return colour(d.data.publisher);
                        });
    });
  }

  return pieChart;
}

module.exports = pieChartFactory;
