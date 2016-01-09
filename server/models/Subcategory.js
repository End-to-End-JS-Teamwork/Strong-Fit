var mongoose = require('mongoose');

var subcategorySchema = mongoose.Schema({
    name: {
        type: String,
        validate: function (input) {
            return (input.length > 5 && input.length <= 30)
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} name of the subcategory should be between 5 and 30 symbols'
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category'
    },
    topic: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Topic'
    }]
});

var Subcategory = mongoose.model('Subcategory', subcategorySchema);
var Category = mongoose.model('Category');

// Test subcategories (will be changed)
var subcategories = ['Test Subcategory #1', 'Test Subcategory #2', 'Test Subcategory #3'];

function subcategorySeed() {
    Subcategory
        .find({})
        .exec(function (err, collection) {
            if (err) {
                console.log('Cannot find subcategories...');
                return;
            }

            Category
                .find({})
                .exec(function (err, categories) {
                    if (err) {
                        console.log('Seeding subcategories error: ' + err);
                        return;
                    }

                    if (collection.length === 0) {
                        categories.forEach(function (category) {
                            subcategories.forEach(function (item) {
                                Subcategory.create({
                                    name: item,
                                    category: category,
                                    topic: []
                                });
                            });
                        });

                        console.log('Subcategories added to database...');
                    }
                });
        });
}

module.exports.seedInitialSubcategories = function() {
    setTimeout(subcategorySeed, 1300);
};