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

function categorySeed() {
    // TODO: add initial categories
}

module.exports.seedInitialCategories = function() {
    categorySeed();
};