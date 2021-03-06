const d3 = require('d3');
const _ = require('lodash');

function pieChartFactory() {

  const dispatch = d3.dispatch('sliceClicked', 'back');

  let showBackButton = false;

  const pieChart = function(selection) {

    const mergeWithFirstEqualZero = (first, second) => {
      let secondSet = d3.set();
      second.forEach((d) => secondSet.add(d.label));

      const onlyFirst = first.filter((d) => !secondSet.has(d.label))
                             .map((d) => { return { label: d.label, value: 0 }});

      return d3.merge([second, onlyFirst])
                .sort((a,b) => d3.ascending(a.label, b.label));
    }

    const midAngle = (d) => d.startAngle + (d.endAngle - d.startAngle) / 2;
    const key = (d) => d.data.label;

    selection.each(function(data) {
      const width = parseInt(d3.select(this).style('width'), 10);
      const height = 500;
      const radius = Math.min(width, height) / 2;

      let svg = d3.select(this).selectAll('svg');
      let currentData = svg.data().pop() || [];

      if (currentData.length == 0) currentData = data;
      const was = mergeWithFirstEqualZero(data, currentData);
      const is = mergeWithFirstEqualZero(currentData, data);

      const extractLabels = (arr) => arr.map((d) => d.label);
      const domain = _.chain(['OTHERS'])
                      .union(extractLabels(was))
                      .union(extractLabels(is))
                      .value();

      const colour = d3.scale.category20b().domain(domain);

      // This is the slice arc. It has width.
      const arc = d3.svg.arc()
                    .innerRadius(radius * 0.4)
                    .outerRadius(radius * 0.8);

      // This is an outer circle for anchoring text and polylines
      const outerArc = d3.svg.arc()
                        .innerRadius(radius * 0.9)
                        .outerRadius(radius * 0.9);

      const valueLabelArc = d3.svg.arc()
                              .innerRadius(radius * 0.6)
                              .outerRadius(radius * 0.6);

      const pie = d3.layout.pie()
                    .value(_.property('value'))
                    .sort((a, b) => d3.ascending(a.label, b.label));

      svg = svg.data([data]);

      const container = svg.enter().append('svg')
                .attr('width', width)
                .attr('height', height)
                  .append('g')
                    .attr('class', 'container')
                    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');

      container.append('g').attr('class', 'slices');
      container.append('g').attr('class', 'labels');
      container.append('g').attr('class', 'lines');
      container.append('g').attr('class', 'values');
      container.append('g').attr('class', 'backlink');

      addSlices(was, is, data);
      addValues(was, is, data);
      addTextLabels(was, is, data);
      addPolylines(was, is, data);

      container.select('.backlink')
          .append('text')
          .attr('class', 'backlink')
          .style('text-anchor', 'middle')
          .on('click', () => dispatch.back())
          .text('Back up');

      svg.selectAll('text.backlink')
          .style('visibility', () => showBackButton ? 'visible' : 'hidden');

      function addValues(was, is, data) {
        let text = svg.select('.values').selectAll('text').data(pie(was), key);

        text.enter()
              .append('text')
              .attr('class', 'valueLabel')
              .attr('dy', '0.35em')
              .style('opacity', 0)
              .text((d) => d.data.value)
              .each(function(d) {
                this._current = d;
              });

        text = svg.select('.values').selectAll('text').data(pie(is), key);

        text.transition().duration(1000)
            .style('opacity', (d) => d.data.value == 0 ? 0 : 1)
            .tween('text', function(d) {
              var i = d3.interpolate(this.textContent, d.data.value);
              return function(t) {
                this.textContent = Math.round(i(t));
              };
            })
            .attrTween('transform', function(d) {
              const interpolate = d3.interpolate(this._current, d);
              return (t) => {
                const d2 = interpolate(t);
                this._current = d2;
                return 'translate(' + valueLabelArc.centroid(d2) + ')';
              }
            });

        text = svg.select('.values').selectAll('text').data(pie(data), key);

        text.exit().transition().delay(1000).remove();
      }

      function addPolylines(was, is, data) {
        let lines = svg.select('.lines').selectAll('polyline').data(pie(was), key);

        lines.enter()
                .append('polyline')
                .style('opacity', 0)
                .each(function(d) {
                  this._current = d;
                });

        lines = svg.select('.lines').selectAll('polyline').data(pie(is), key);

        lines.transition().duration(1000)
              .style('opacity', (d) => d.data.value == 0 ? 0 : 0.5)
              .attrTween('points', function(d) {
                const interpolate = d3.interpolate(this._current, d);
                return (t) => {
                  var d2 = interpolate(t);
                  this._current = d2;

                  let pos = outerArc.centroid(d2);
                  pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                  return [arc.centroid(d2), outerArc.centroid(d2), pos];
                }
              });

        lines = svg.select('.lines').selectAll('polyline').data(pie(data), key);
        lines.exit().transition().delay(1000).remove();
      }

      function addTextLabels(was, is, data) {
        let text = svg.select('.labels').selectAll('text.label').data(pie(was), key);

        text.enter()
            .append('text')
              .attr('class', 'label')
              .attr('dy', '0.35em')
              .style('opacity', 0)
              .text((d) => d.data.label)
              .each(function(d) {
                this._current = d;
              });

        text = svg.select('.labels').selectAll('text.label').data(pie(is), key);

        text.transition().duration(1000)
            .style('opacity', (d) => d.data.value == 0 ? 0 : 1)
            .attrTween('transform', function(d) {
              const interpolate = d3.interpolate(this._current, d);
              return (t) => {
                const d2 = interpolate(t);
                this._current = d2;

                let pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return 'translate(' + pos + ')';
              }
            })
            .styleTween('text-anchor', function(d) {
              const interpolate = d3.interpolate(this._current, d);
              return (t) => midAngle(interpolate(t)) < Math.PI ? 'start' : 'end' ;
            });

        text = svg.select('.labels').selectAll('text.label').data(pie(data), key);

        text.exit().transition().delay(1000).remove();
      }

      function addSlices(was, is, data) {
        let slice = svg.select('.slices')
                          .selectAll('path.slice')
                          .data(pie(was), key);

        slice.enter()
              .insert('path')
                .attr('fill', (d) => colour(d.data.label))
                .attr('class', 'slice')
                .on('click', function(d) {
                  dispatch.sliceClicked(d.data);
                })
                .each(function(d) {
                  this._current = d;
                });

        slice = svg.select('.slices')
                    .selectAll('path.slice')
                    .data(pie(is), key);

        slice.transition().duration(1000)
            .attrTween('d', function(d) {
              const interpolate = d3.interpolate(this._current, d);

              return (t) => {
                this._current = interpolate(t);
                return arc(this._current);
              };
            });

        slice = svg.select('.slices')
                    .selectAll('path.slice')
                    .data(pie(data), key);

        slice.exit().transition().delay(1000).duration(0).remove();
      }
    });
  }

  pieChart.showBack = function(value) {
    if (!arguments.length) return showBackButton;

    showBackButton = value;
    return pieChart;
  }

  return d3.rebind(pieChart, dispatch, 'on');
}

module.exports = pieChartFactory;
