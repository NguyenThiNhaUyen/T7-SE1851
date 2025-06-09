const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    "/api",
    createProxyMiddleware({
<<<<<<< HEAD
      target: "http://localhost:5000",
=======
      target: "http://localhost:8080", // đúng cổng của Spring Boot
>>>>>>> 70d00663ad4221e36b34b59810540de516f56885
      changeOrigin: true,
    })
  );
};
