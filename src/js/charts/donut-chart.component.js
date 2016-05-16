var d3 = require('d3');
var _ = require('lodash/util');

function pieChartFactory() {

  var pieChart = function(selection) {
    var width = 720;
    var height = 500;
    var radius = Math.min(width, height) / 2;
    var labelr = radius - 10;
    var donutWidth = 75;
    var colour = d3.scale.category20();

    selection.each(function(data) {
      var svg = d3.select(this)
                    .append('svg')
                      .attr('width', width)
                      .attr('height', height)
                    .append('g')
                      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

      svg.append('g').attr('class', 'slices');
      svg.append('g').attr('class', 'labels');
      svg.append('g').attr('class', 'lines');

      var arc = d3.svg.arc()
                  .innerRadius(radius * 0.4)
                  .outerRadius(radius * 0.8);

      var outerArc = d3.svg.arc()
                        .innerRadius(radius * 1.0)
                        .outerRadius(radius * 1.0);

      var pie = d3.layout.pie()
                  .value(_.property('count'))
                  .sort(null);

      var slice = svg.select('.slices')
                    .selectAll('path.slice')
                    .data(pie(data));

      slice.enter()
            .append('path')
              .attr('d', arc)
              .attr('fill', function(d) {
                return colour(d.data.publisher);
              })
              .attr('class', 'slice');

      slice.exit().remove();

      var text = svg.select('.labels')
                    .selectAll('text')
                      .data(pie(data));

      function midAngle(d){
        return d.startAngle + (d.endAngle - d.startAngle)/2;
      }

      text.enter()
        .append('text')
        .attr('dy', '.35em')
        .attr("transform", function(d) {
          var c = arc.centroid(d);
          var x = c[0];
          var y = c[1];
          // pythagorean theorem for hypotenuse
          var h = Math.sqrt(x*x + y*y);
          return "translate(" + (x/h * labelr) +  ',' + (y/h * labelr) +  ")";
        })
        .attr("text-anchor", function(d) {
          // are we past the center?
          return (d.endAngle + d.startAngle)/2 > Math.PI ?  "end" : "start";
        })
        .text(function(d) {
          return d.data.publisher;
        });

      text.exit().remove();
    });
  }

  return pieChart;
}

module.exports = pieChartFactory;
