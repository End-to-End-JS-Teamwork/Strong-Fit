var mongoose = require('mongoose');

var articleSchema = mongoose.Schema({
    title: {
        type: String,
        validate: function (input) {
            return (input.length > 5 && input.length <= 25);
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} title should be between 5 and 25 symbols'
    },
    description: {
        type: String,
        validate: function (input) {
            return (input.length > 100 && input.length <= 3000);
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} description should be between 100 and 3000 symbols'
    },
    createdOn: {type: Date, default: Date.now},
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    imageUrl: {type: String}
});

var Article = mongoose.model('Article', articleSchema);

function articleSeed() {
    // TODO: add initial articles
}

module.exports.seedInitialArticles = function() {
    articleSeed();
};