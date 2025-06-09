const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080", // đúng cổng của Spring Boot
      changeOrigin: true,
    })
  );
};
