const d3 = require('d3');

const retrievePreviewsData = (issue, done) => {
  d3.json('api/previews/' + issue, (err, data) => {
    if (err) {
      console.error(err);
      d3.select('.content').text('Sorry, could not load required data');
      return;
    }

    done(data);
  })
}

const retrievePreviewsList = (done) => {
  d3.json('api/previews/', (err, data) => {
    if (err) {
      console.error(err);
      d3.select('.content').text('Sorry, could not load required data');
      return;
    }

    done(data);
  });
}

export { retrievePreviewsList, retrievePreviewsData };
