const d3 = require('d3');
const _ = require('lodash/util');

function pieChartFactory() {

  const pieChart = function(selection) {
    const colour = d3.scale.category20();

    selection.each(function(data) {
      let width = parseInt(d3.select(this).style('width'), 10);
      let height = 500;
      let radius = Math.min(width, height) / 2;
      let labelr = radius - 10;

      const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;
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
                        .innerRadius(radius * 0.9)
                        .outerRadius(radius * 0.9);

      const pie = d3.layout.pie()
                    .value(_.property('count'))
                    .sort(null);

      const pieData = pie(data);

      const slice = svg.select('.slices')
                      .selectAll('path.slice')
                        .data(pieData);

      slice.enter()
            .append('path')
              .attr('d', arc)
              .attr('fill', (d) => colour(d.data.publisher))
              .attr('class', 'slice');

      slice.exit().remove();

      const text = svg.select('.labels')
                      .selectAll('text')
                        .data(pieData);

      text.enter()
        .append('text')
        .attr('dy', '.35em')
        .attr('transform', (d) => {
          let pos = outerArc.centroid(d);
          pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1)
          return 'translate(' + pos + ')';
        })
        .attr('text-anchor', (d) => {
          return midAngle(d) < Math.PI ? 'start' : 'end';
        })
        .text(_.property('data.publisher'));

      text.exit().remove();

      const polyline = svg.select('.lines')
                          .selectAll('polyline')
                          .data(pieData);

      polyline.enter()
              .append('polyline')
              .attr('points', (d) => {
                let pos = outerArc.centroid(d);
                pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                return [arc.centroid(d), outerArc.centroid(d), pos]
              });

      polyline.exit()
              .remove();

    });
  }

  return pieChart;
}

module.exports = pieChartFactory;
