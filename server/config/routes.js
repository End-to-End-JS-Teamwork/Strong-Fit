'use strict';

var auth = require('./auth'),
    path = require('path'),
    controllers = require('../controllers');

module.exports = function(app) {
    // ------- Final routes -------
    // Users
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // Favicon
    app.get('/favicon.ico', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../favicon.ico'))
    });


    // ------- Tests routes -------
    // This routes will be updated later
    // All final routes must be placed in "Final routes" section
    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/partials/' + req.params.partialArea + '/' + req.params.partialName)
    });


    app.get('/:partial', function(req, res){

    });

    app.get('/not-found', function (req, res) {
        res.status(404);
        res.end();
    });

    app.get('/', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};