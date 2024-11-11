const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/oauth', createProxyMiddleware({
    target: "https://www.linkedin.com/",
    changeOrigin: true,
    // pathRewrite: {
    //     '^/linkedin-token': '/'
    //   }
  }));
  app.use('/me', createProxyMiddleware({
    target: "https://api.linkedin.com/v2/",
    changeOrigin: true,
    // pathRewrite: {
    //     '^/linkedin-token': '/'
    //   }
  }));
};