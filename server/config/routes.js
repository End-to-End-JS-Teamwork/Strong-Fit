'use strict';

var auth = require('./auth'),
    path = require('path'),
    controllers = require('../controllers');

module.exports = function (app) {
    function currentUserMiddleware(req, res, next){
        console.log(req.user);
        req.currentUser = req.user;
        next();
    }

    app.get('/*', currentUserMiddleware);

    // ------- Final routes -------
    // Users
    app.get('/register', controllers.users.getRegister);
    app.post('/register', controllers.users.postRegister);

    app.get('/login', controllers.users.getLogin);
    app.post('/login', auth.login);
    app.get('/logout', auth.logout);

    // Favicon
    app.get('/favicon.ico', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../favicon.ico'))
    });

    // Forum
    app.get('/forum', controllers.forumHome.getForumMainData);
    app.get('/forum/:category/:subcategory', controllers.subcategories.getTopics);
    app.get('/forum/topics');
    app.get('/forum/comments');

    // Admin: To enable admin add -> auth.isInRole('admin')
    app.get('/admin/users', auth.isInRole('admin'), controllers.users.getAllUsers);

    // Default
    app.get('/', function (req, res) {
        res.render('index', {currentUser: req.user});
    });

    // Errors
    app.get('/unauthorized', function (req, res) {
        res.render('partials/main/unauthorized');
    });
    app.get('*', function (req, res) {
        res.render('partials/main/not-found');
    });
};
