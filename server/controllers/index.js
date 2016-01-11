'use strict';

// Export all controllers here

var usersController = require('../controllers/usersController'),
    forumHomeController = require('../controllers/forumHomeController');

module.exports = {
    users: usersController,
    forumHome: forumHomeController
};