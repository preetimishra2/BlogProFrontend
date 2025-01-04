const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (root) {
    const target =
        process.env.NODE_ENV === 'production'
            ? 'https://blogbackendpro-pp5a.onrender.com' // Deployed backend for production
            : 'http://localhost:8000'; // Local backend for development

    const allowedOrigin =
        process.env.NODE_ENV === 'production'
            ? 'https://blogprofrontend.onrender.com' // Deployed frontend URL
            : 'http://localhost:3000'; // Local frontend URL

    root.use(
        '/api', // Adjust the path you want to proxy
        createProxyMiddleware({
            target: target,
            changeOrigin: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            headers: {
                'Access-Control-Allow-Origin': allowedOrigin, // Adjust based on the environment
            },
        })
    );
};
