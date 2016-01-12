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
};
