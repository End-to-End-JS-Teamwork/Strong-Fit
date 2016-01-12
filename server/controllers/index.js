'use strict';

// Export all controllers here

var forumHomeController = require('../controllers/forumHomeController'),
    usersController = require('../controllers/usersController'),
    subcategoryController = require('../controllers/subcategoryController');

module.exports = {
    users: usersController,
    forumHome: forumHomeController,
    subcategories: subcategoryController
};