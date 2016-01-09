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
    topic: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Topic'
    }]
});

var Subcategory = mongoose.model('Subcategory', subcategorySchema);

function subcategorySeed() {
    // TODO: add initial subcategories
}

module.exports.seedInitialSubcategories = function() {
    subcategorySeed();
};