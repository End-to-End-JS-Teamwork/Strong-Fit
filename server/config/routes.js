'use strict';

var auth = require('./auth'),
    path = require('path'),
    controllers = require('../controllers');

module.exports = function (app) {
    function currentUserMiddleware(req, res, next){
        console.log(req.user);
        req.currentUser = req.user;
        next();
    };

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

    // Errors
    app.get('/not-found', function (req, res) {
        res.render('partials/main/not-found');
    });
    app.get('/unauthorized', function (req, res) {
        res.render('partials/main/unauthorized');
    });

    // Forum
    app.get('/forum', controllers.forumHome.getForumMainData);

    app.get('/forum/:category/:subcategory', controllers.subcategories.getTopics);

    // Admin: To enable admin add -> auth.isInRole('admin')
    app.get('/admin/users',  controllers.users.getAllUsers);

    // Default
    app.get('/', function (req, res) {
        res.render('index', {currentUser: req.user});
    });

    // ------- Tests routes -------
    // This routes will be updated later
    // All final routes must be placed in "Final routes" section
    app.get('/partials/:partialArea/:partialName', function (req, res) {
        res.render('../../server/views/partials/' + req.params.partialArea + '/' + req.params.partialName)
    });
};
