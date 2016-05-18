const d3 = require('d3');
const _ = require('lodash/util');

function pieChartFactory() {

  const pieChart = function(selection) {

    const shadeColor2 = (color, percent) => {
      const f = parseInt(color.slice(1), 16);
      const t = percent < 0 ? 0 : 255;
      const p = percent < 0 ? percent * -1 : percent;
      const R = f >> 16;
      const G = f >> 8 & 0x00FF;
      const B = f & 0x0000FF;
      return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    }

    const colour = d3.scale.category10();
    const sliceBorderColour = (d) => shadeColor2(colour(d), 0.4);

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

      const container = svg.append('g').attr('class', 'container');

      // This is the slice arc. It has width.
      const arc = d3.svg.arc()
                    .innerRadius(radius * 0.4)
                    .outerRadius(radius * 0.8);

      const borderArc = d3.svg.arc()
                          .innerRadius(radius * 0.75)
                          .outerRadius(radius * 0.82);

      // This is an outer circle for anchoring text and polylines
      const outerArc = d3.svg.arc()
                        .innerRadius(radius * 0.9)
                        .outerRadius(radius * 0.9);

      const pie = d3.layout.pie()
                    .value(_.property('count'))
                    .sort(null);

      const pieData = pie(data);

      const sliceSelect = svg.select('.container').selectAll('.slice').data(pieData);

      const sliceEnter = sliceSelect.enter();
      const sliceGroup = sliceEnter.append('g').attr('class', 'sliceGroup');

      sliceGroup
      sliceGroup.append('path')
                .attr('d', arc)
                .attr('fill', (d) => colour(d.data.publisher))
                .attr('class', 'slice')
                .style('stroke', (d) => sliceBorderColour(d.data.publisher))
                .style('stroke-width', '0')
                .on('mouseover', (d) => {
                  console.log('Mousing over ' + d.data.publisher);
                });

      sliceGroup.append('text')
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

      sliceGroup.append('polyline')
                .attr('points', (d) => {
                  let pos = outerArc.centroid(d);
                  pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                  return [arc.centroid(d), outerArc.centroid(d), pos]
                });

      sliceSelect.exit().remove();

    });
  }

  return pieChart;
}

module.exports = pieChartFactory;
