$('.content').waitUntilExists(retrievePreviewsData);

function retrievePreviewsData() {
  d3.json('api/previews/latest', function(err, data) {
    if (err) {
      console.error(err);
      d3.select('.content').text('Sorry, could not load required data');
      return;
    }

    d3.select('.content').text("I am loaded");
  });
}
