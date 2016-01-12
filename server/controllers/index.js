'use strict';

// Export all controllers here

var usersController = require('../controllers/usersController'),
    forumHomeController = require('../controllers/forumHomeController'),
    subcategoryController = require('../controllers/subcategoryController');

module.exports = {
    users: usersController,
    forumHome: forumHomeController,
    subcategories: subcategoryController
};