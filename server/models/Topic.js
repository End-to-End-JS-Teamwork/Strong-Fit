var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
    name: {
        type: String,
        validate: function (input) {
            return (input.length > 5 && input.length <= 30)
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} name of the topic should be between 5 and 30 symbols'
    },
    createdOn: {type: Date, default: Date.now},
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]
});

var Topic = mongoose.model('Topic', topicSchema);

function topicSeed() {
    // TODO: add initial topics
}

module.exports.seedInitialTopics = function() {
    topicSeed();
};