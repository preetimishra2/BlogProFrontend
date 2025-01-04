const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    // Determine the backend target based on environment (production or development)
    const target =
        process.env.NODE_ENV === 'production'
            ? 'https://blogbackendpro-pp5a.onrender.com' // Deployed backend for production
            : 'http://localhost:8000'; // Local backend for development

    // Determine the allowed origin based on environment (production or development)
    const allowedOrigin =
        process.env.NODE_ENV === 'production'
            ? 'https://blogprofrontend.onrender.com' // Deployed frontend URL for production
            : 'http://localhost:3000'; // Local frontend URL for development

    // Use the proxy middleware to forward requests to the backend
    app.use(
        '/api', // Adjust the path you want to proxy (e.g., /api/posts)
        createProxyMiddleware({
            target: target,
            changeOrigin: true, // For CORS issues in development
            secure: process.env.NODE_ENV === 'production', // Secure only in production (for HTTPS)
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin, // Dynamically set allowed origin
            },
            onProxyReq: (proxyReq, req, res) => {
                // You can add custom headers if needed
                proxyReq.setHeader('X-Forwarded-For', req.connection.remoteAddress);
            },
        })
    );
};
