const { createProxyMiddleware } = require('http-proxy-middleware');
 
 module.exports = function(app) {
   app.use(
     '/backend1',
     createProxyMiddleware({
       target: 'http://165.22.50.213:3000',
       changeOrigin: true,
     })
   );
    }