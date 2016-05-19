const express = require('express');
const httpProxy = require('express-http-proxy');
const compression = require('compression');
const app = express();

const apiProxy = (host, port) => {
  return function(req, res, next) {
    if (req.url.match(/^\/api\//)) {
      proxy.proxyRequest(req, res, { host: host, port: port });
    } else {
      next();
    }
  }
};

app.use(compression());
app.use(express.static('public'));
app.set('x-powered-by', false);
app.use('/api', httpProxy('previewsapi:8100', {
  forwardPath: function(req, res) {
    return require('url').parse(req.url).path;
  }
}));

app.listen(3001);
