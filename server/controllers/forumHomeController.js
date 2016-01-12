'use strict';

var Category = require('mongoose').model('Category'),
    Subcategory = require('mongoose').model('Subcategory'),
    Comment = require('mongoose').model('Comment'),
    viewModels = require('../view-models');

module.exports = {
    getForumMainData: function (req, res) {
        Category
            .find({})
            .exec(function (err, categories) {
                if (err) {
                    console.log('Error while getting categories forum data: ' + err);
                    return;
                }

                Subcategory
                    .find({})
                    .exec(function (err, subcategories) {
                        if (err) {
                            console.log('Error while getting subcategories forum data: ' + err);
                            return;
                        }

                        Comment
                            .find({})
                            .exec(function (err, comments) {
                                if (err) {
                                    console.log('Error while getting comments forum data: ' + err);
                                    return;
                                }

                                var viewModelResult = viewModels
                                    .ForumHomeViewModel
                                    .getForumHomeViewModel(categories, subcategories, comments);

                                res.render('partials/forum/forum-home', {currentUser:req.user,result: viewModelResult}); //TODO check where is login or no
                            });
                    });
            });
    }
};