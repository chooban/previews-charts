/* global $ */

const d3 = require('d3');
const fc = require('d3fc');

var generator = fc.data.random.walk().steps(11);
var dateFormatter = d3.time.format('%b');

var data = generator(1).map((d, i) => {
    return {
        month: dateFormatter(new Date(0, i + 1, 0)),
        sales: d + i / 2
    };
});

$('.content').ready(setup);

function setup() {
  const width = 500;
  const height = 250;

  const container = d3.select('.content')
                      .append('svg')
                        .attr({ width: width,
                                height: height
                              });

  const xScale = d3.scale.ordinal()
                    .domain(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'])
                    .rangePoints([0, width], 1);
  const yScale = d3.scale.linear()
                    .domain([0, 10])
                    .range([height, 0]);

  const series = fc.series.bar()
                  .xValue((d) => d.month)
                  .yValue((d) => d.sales)
                  .xScale(xScale)
                  .yScale(yScale);

  container
    .datum(data)
    .call(series);
}
