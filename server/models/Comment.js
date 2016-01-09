var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    content: {
        type: String,
        validate: function (input) {
            return (input.length > 10 && input.length < 1500);
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} content of message should be between 10 and 1500 symbols'
    },
    createdOn: {type: Date, default: Date.now},
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

var Comment = mongoose.model('Comment', commentSchema);

function commentSeed() {
    // TODO: add initial comments
}

module.exports.seedInitialComments = function() {
    commentSeed();
};