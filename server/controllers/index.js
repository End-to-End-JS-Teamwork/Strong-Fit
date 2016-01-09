'use strict';

// Export all controllers here

var usersController = require('../controllers/usersController');
var categoriesController = require('../controllers/categoriesController');

module.exports = {
    users: usersController,
    categories: categoriesController
};
