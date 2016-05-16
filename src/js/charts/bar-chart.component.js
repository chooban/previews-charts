var d3 = require('d3');
var _ = require('lodash/util');

function barChartFactory() {

  var barChart = function(selection) {
    selection.each(function(data) {
      var max = d3.max(data.map(_.property('count')));
      var maxWidth = parseInt(d3.select(this).style('width'), 10);
      var xScale = d3.scale.linear()
                            .domain([0, max])
                            .range([0, maxWidth]);

      var sel = d3.select(this)
                  .selectAll('div')
                    .data(data)

      sel.enter()
          .append('div')
            .style('width', width)
            .text(label);

      sel.selectAll('div').style('width', width);

      function width(d) {
        return xScale(d.count) + "px";
      }

      function label(d) {
        return d.publisher + " (" + d.count + ")";
      }
    });
  }

  return barChart;
}

module.exports = barChartFactory;
