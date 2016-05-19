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
    const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;
    const key = (d) => d.data.label;

    selection.each(function(data) {
      const width = parseInt(d3.select(this).style('width'), 10);
      const height = 500;
      const radius = Math.min(width, height) / 2;
      const labelr = radius - 10;

      // This is the slice arc. It has width.
      const arc = d3.svg.arc()
                    .innerRadius(radius * 0.4)
                    .outerRadius(radius * 0.8);

      // This is an outer circle for anchoring text and polylines
      const outerArc = d3.svg.arc()
                        .innerRadius(radius * 0.9)
                        .outerRadius(radius * 0.9);

      const pie = d3.layout.pie()
                    .value(_.property('value'))
                    .sort((a, b) => a.label.localeCompare(b.label));

      const svg = d3.select(this)
                    .selectAll('svg')
                      .data([data]);

      svg.enter().append('svg')
                    .attr('width', width)
                    .attr('height', height)
                  .append('g')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')')
                    .attr('class', 'container');

      const slice = svg.select('.container').selectAll('.sliceGroup').data(pie(data), key);

      const sliceGroup = slice.enter()
                              .append('g')
                                .attr('class', 'sliceGroup');

      sliceGroup.append('path')
                .attr('d', arc)
                .attr('fill', (d) => colour(d.data.label))
                .attr('class', 'slice')
                .on('mouseover', (d) => console.log('Mousing over ' + d.data.label));

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
                .text(_.property('data.label'));

      sliceGroup.append('polyline')
                .attr('points', (d) => {
                  let pos = outerArc.centroid(d);
                  pos[0] = radius * 0.95 * (midAngle(d) < Math.PI ? 1 : -1);
                  return [arc.centroid(d), outerArc.centroid(d), pos]
                });

      slice
        .select('.slice')
        .transition().duration(1000)
        .attrTween('d', function(d) {
          this._current = this._current || d;
          var interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);
          return (t) => arc(interpolate(t));
        });

      slice
        .select('text')
        .transition().duration(1000)
        .attrTween('transform', function(d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);

          return (t) => {
            const d2 = interpolate(t);
            let pos = outerArc.centroid(d2);
            pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
            return 'translate(' + pos + ')';
          };
        })
        .styleTween("text-anchor", function(d){
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);

          return (t) => midAngle(interpolate(t)) < Math.PI ? "start" : "end";
        });

      slice
        .select('polyline')
        .transition().duration(1000)
        .attrTween('points', function(d) {
          this._current = this._current || d;
          const interpolate = d3.interpolate(this._current, d);
          this._current = interpolate(0);

          return (t) => {
            const d2 = interpolate(t);
            let pos = outerArc.centroid(d2);
            pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
            return [arc.centroid(d2), outerArc.centroid(d2), pos];
          };
        });

      slice.exit().remove();

    });
  }

  return pieChart;
}

module.exports = pieChartFactory;
