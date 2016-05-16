$('.content').waitUntilExists(retrievePreviewsData);

function retrievePreviewsData() {
  d3.json('api/previews/latest', function(err, data) {
    if (err) {
      console.error(err);
      d3.select('.content').text('Sorry, could not load required data');
      return;
    }

    var data = countByPublisher(data.contents);
    var max = d3.max(data.map(function(e) { return e.count; }));
    var xScale = d3.scale.linear()
                  .domain([0, max])
                  .range([0, 1020]);

    d3.select('.content')
        .html('')
      .append('div')
        .attr('class', 'chart')
      .selectAll('div')
        .data(data)
      .enter()
        .append('div')
          .style('width', function(d) { return xScale(d.count) + "px"; })
          .text(function(d) { return d.publisher + " (" + d.count + ")"; });
  });

  function countByPublisher(previewsContents) {
    return previewsContents.map(mapByPublisher)
                            .reduce(countByKey, [])
                            .sort(byValue);

    function byValue(a, b) {
      return b.count - a.count;
    }

    function countByKey(acc, item) {
      var idx = acc.findIndex(function(e, idx) {
        return (e.publisher === item.publisher);
      });

      if (idx > -1) {
        acc[idx] = {
          publisher: item.publisher,
          count: acc[idx].count + 1
        };
      } else {
        acc.push(item);
      }

      return acc;
    }

    function mapByPublisher(lineItem) {
      return {
        publisher: lineItem.publisher,
        count: 1
      }
    }
  }
}
