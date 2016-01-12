'use strict';

var Subcategory = require('mongoose').model('Subcategory');

module.exports = {
    getTopics: function(req, res) {
        Subcategory.findOne({
            name: req.params.subcategory,
            category: req.params.category})
            .exec(function (err, subcategory) {
                if (err) {
                    console.log("Error retrieving subcategory...");
                }

                res.render('partials/forum/subcategory', {subcategory: subcategory});
            });
    }
    /*getForumMainData: function (req, res) {
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

                                res.render('partials/forum/forum-home', {result: viewModelResult});
                            });
                    });
            });
    }*/
};
