'use strict';

var mongoose = require('mongoose'),
    models = require('../models');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.once('open', function (error) {
        if (error) {
            console.log('Database could not be opened: ' + error);
            return;
        }
        //mongoose.connection.db.dropDatabase();
        console.log('Database up and running...');
    });

    db.on('error', function (error) {
        console.log('Database error: ' + error);
    });

    // Seed initial data
    //models.User.seedInitialUsers();
    //models.Category.seedInitialCategories();
    //models.Subcategory.seedInitialSubcategories();
    //models.Topic.seedInitialTopics();
    //models.Comment.seedInitialComments();
    //models.Article.seedInitialArticles();
};

