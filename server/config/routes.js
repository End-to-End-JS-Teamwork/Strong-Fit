'use strict';

var auth = require('./auth'),
    path = require('path'),
    controllers = require('../controllers');

module.exports = function (app) {
    function currentUserMiddleware(req, res, next){
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
    app.get('/logout', auth.isAuthenticated, auth.logout);

    app.get('/profile', controllers.users.getUser);
    app.post('/profile', auth.isAuthenticated, controllers.users.updateUser);
    app.post('/delete/user', auth.isAuthenticated, controllers.users.deleteUser);

    // Favicon
    app.get('/favicon.ico', function (req, res) {
        res.sendFile(path.resolve(__dirname + '/../../favicon.ico'))
    });
    // Admin: To enable admin add -> auth.isInRole('admin')
    app.get('/admin/administration', auth.isInRole('admin'), function (req, res) {
        res.render('partials/admin/administration');
    });
    app.get('/admin/users',  auth.isInRole('admin'), controllers.users.getAllUsers);
    app.get('/admin/articles', auth.isInRole('admin'), controllers.article.getAllArticles);
    app.get('/admin/articles/add', auth.isInRole('admin'), controllers.article.getCreateArticle);
    app.post('/admin/articles/add', auth.isInRole('admin'), controllers.article.postCreateArticle);

    // Forum
    app.get('/forum', controllers.forumHome.getForumMainData);
    app.get('/forum/topics');
    app.get('/forum/comments');
    app.get('/forum/topics/add', auth.isAuthenticated, controllers.topic.getCreateTopic);
    app.post('/forum/topics/add', auth.isAuthenticated, controllers.topic.postCreateTopic);
    app.get('/forum/:category/:subcategory', controllers.subcategories.getTopics);

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
