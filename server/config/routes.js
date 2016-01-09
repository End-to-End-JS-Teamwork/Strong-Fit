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

    // Default
    app.get('/', function (req, res) {
        controllers.categories.get()
            .then(function (categories) {
                res.render('index', {currentUser: req.user,
                    categories: categories});
            }, function (error) {
                res.status(400);
                res.send('Error getting categories: ' + error);
            });
    });

    // ------- Tests routes -------
    // This routes will be updated later
    // All final routes must be placed in "Final routes" section
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../server/partials/' + req.params.partialArea + '/' + req.params.partialName)
    });
};
