const d3 = require('d3');
const _ = require('lodash/util');

function pieChartFactory() {

  const pieChart = function(selection) {
    let width = 720;
    let height = 500;
    let radius = Math.min(width, height) / 2;
    let labelr = radius - 10;
    let donutWidth = 75;
    const colour = d3.scale.category20();

    selection.each(function(data) {
      const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 1;
      const svg = d3.select(this)
                    .append('svg')
                      .attr('width', width)
                      .attr('height', height)
                    .append('g')
                      .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

      svg.append('g').attr('class', 'slices');
      svg.append('g').attr('class', 'labels');
      svg.append('g').attr('class', 'lines');

      const arc = d3.svg.arc()
                  .innerRadius(radius * 0.4)
                  .outerRadius(radius * 0.8);

      const outerArc = d3.svg.arc()
                        .innerRadius(radius * 1.0)
                        .outerRadius(radius * 1.0);

      const pie = d3.layout.pie()
                  .value(_.property('count'))
                  .sort(null);

      const slice = svg.select('.slices')
                    .selectAll('path.slice')
                    .data(pie(data));

      slice.enter()
            .append('path')
              .attr('d', arc)
              .attr('fill', (d) => colour(d.data.publisher))
              .attr('class', 'slice');

      slice.exit().remove();

      const text = svg.select('.labels')
                    .selectAll('text')
                      .data(pie(data));

      text.enter()
        .append('text')
        .attr('dy', '.35em')
        .attr('transform', (d) => {
          let [ x, y ] = arc.centroid(d);
          // Pythagorean theorem for hypotenuse
          var h = Math.sqrt(x*x + y*y);
          return 'translate(' + (x/h * labelr) +  ',' + (y/h * labelr) +  ')';
        })
        .attr('text-anchor', (d) => (
          // Are we past the center?
          (d.endAngle + d.startAngle)/2 > Math.PI ? 'end' : 'start'
        ))
        .text(_.property('data.publisher'));

      text.exit().remove();

    });
  }

  return pieChart;
}

module.exports = pieChartFactory;
