'use strict';

var auth = require('./auth'),
    path = require('path'),
    controllers = require('../controllers');

module.exports = function (app) {
    // ------- Final routes -------
    // Users
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // Favicon
    app.get('/favicon.ico', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../favicon.ico'))
    });

    // Errors
    app.get('/not-found', function (req, res) {
        res.render('partials/main/not-found');
    });
    app.get('/unauthorized', function (req, res) {
        res.render('partials/main/unauthorized');
    });

    // Route to registration
    app.post('/register', controllers.users.createUser)
   /* app.post('/partials/identity/register', function (req, res) {
        res.render('/partials/identity/register');
    });*/

    // Default
    app.get('/', function (req, res) {
        res.render('index', {currentUser: req.user});
    });

    // ------- Tests routes -------
    // This routes will be updated later
    // All final routes must be placed in "Final routes" section
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../server/partials/' + req.params.partialArea + '/' + req.params.partialName)
    });
};