const apiBaseUrl = '/api';
const controllersDir = './src/routes/';

function initialize(app) {
    registerApiRoute(app,'loginRoute.js', '/login');

    registerApiRoute(app,'registerRoute.js','/register');

    registerApiRoute(app,'homeRoute.js','/home');

    registerApiRoute(app,'userRoute.js','/user')

    registerApiRoute(app,'productRoute.js','/products');

    registerApiRoute(app,'categoryRoute.js','/c');

    registerApiRoute(app,'searchRoute.js','/search');

    registerApiRoute(app,'ratingRoute.js', '/r');
}

function registerApiRoute(app, routeFileName, endpoint) {
    app.use(appendBaseUrl(endpoint), require(routesPath(routeFileName)))
}

function appendBaseUrl(path) {
    return apiBaseUrl.concat(path);
}

function routesPath(file) {
    return controllersDir.concat(file);
}

module.exports = {
    initialize,
};