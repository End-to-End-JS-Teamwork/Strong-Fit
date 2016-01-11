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
    subcategory: {type: String},
    topic: {
        type: mongoose.Schema.ObjectId,
        ref: 'Topic'
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
});

var Comment = mongoose.model('Comment', commentSchema);
var Topic = mongoose.model('Topic');
var User = mongoose.model('User');

// Test comments (will be changed)
var comments = ['Comment #1', 'Comment #2'];

function commentSeed() {
    Comment
        .find({})
        .exec(function (err, collection) {
            if (err) {
                console.log('Cannot find comments...');
                return;
            }

            User
                .find({})
                .exec(function (err, users) {
                    if (err) {
                        console.log('Seeding comments error: ' + err);
                        return;
                    }

                    Topic
                        .find({})
                        .exec(function (err, topics) {
                            if (err) {
                                console.log('Seeding comments error: ' + err);
                                return;
                            }

                            if (collection.length === 0) {
                                comments.forEach(function (commentContent) {
                                    users.forEach(function (user) {
                                        topics.forEach(function (topic) {
                                            Comment.create({
                                                content: commentContent,
                                                topic: topic,
                                                createdBy: user
                                            });
                                        });
                                    });
                                });

                                console.log('Comments added to database...');
                            }
                        });
                });
        });
}

module.exports.seedInitialComments = function() {
    setTimeout(commentSeed, 1700);
};