'use strict';

// Export all models here

var UserModel = require('../models/User'),
    CategoryModel = require('../models/Category'),
    SubcategoryModel = require('../models/Subcategory'),
    TopicModel = require('../models/Topic'),
    CommentModel = require('../models/Comment'),
    ArticleModel = require('../models/Article');

module.exports = {
    User: UserModel,
    Category: CategoryModel,
    Subcategory: SubcategoryModel,
    Topic: TopicModel,
    Comment: CommentModel,
    Article: ArticleModel
};