'use strict';

// Export all controllers here

var forumHomeController = require('../controllers/forumHomeController'),
    usersController = require('../controllers/usersController'),
    subcategoryController = require('../controllers/subcategoryController'),
    administrationController = require('../controllers/administrationController'),
    articleController = require('../controllers/articleController'),
    topicController = require('../controllers/topicController');

module.exports = {
    users: usersController,
    forumHome: forumHomeController,
    subcategories: subcategoryController,
    administration: administrationController,
    article: articleController,
    topic: topicController
};