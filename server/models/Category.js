var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    name: {
        type: String,
        validate: function (input) {
            return (input.length > 5 && input.length <= 30)
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} name of the category should be between 5 and 30 symbols'
    },
    subcategories: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Subcategory'
    }]
});

var Category = mongoose.model('Category', categorySchema);

// Test categories (will be changed)
var categories = ['Test Category #1', 'Test Category #2', 'Test Category #3', 'Test Category #4', 'Test Category #5'];

function categorySeed() {
    Category
        .find({})
        .exec(function (err, collection) {
            if (err) {
                console.log('Cannot find categories...');
                return;
            }

            if (collection.length === 0) {
                categories.forEach(function (categoryName) {
                    Category.create({name: categoryName, subcategories: []});
                });

                console.log('Categories added to database...');
            }
        });
}

module.exports.seedInitialCategories = function() {
    setTimeout(categorySeed, 1200);
};