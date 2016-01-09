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
    subcategory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Subcategory'
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
var Subcategory = mongoose.model('Subcategory');
var User = mongoose.model('User');

// Test topics (will be changed)
var topics = ['Test Topic #1', 'Test Topic #2', 'Test Topic #3', 'Test Topic #4', 'Test Topic #5', 'Test Topic #6'];

function topicSeed() {
    Topic
        .find({})
        .exec(function (err, collection) {
            if (err) {
                console.log('Cannot find topics...');
                return;
            }

            Subcategory
                .find({})
                .exec(function (err, subcategories) {
                    if (err) {
                        console.log('Seeding topics error: ' + err);
                        return;
                    }

                    User
                        .find({})
                        .exec(function (err, users) {
                            if (err) {
                                console.log('Seeding topics error: ' + err);
                                return;
                            }

                            if (collection.length === 0) {
                                subcategories.forEach(function (subcategory) {
                                    users.forEach(function (user) {
                                        topics.forEach(function (topicName) {
                                            Topic.create({
                                                name: topicName,
                                                subcategory: subcategory,
                                                createdBy: user,
                                                comments: []
                                            });
                                        });
                                    });
                                });

                                console.log('Topics added to database...');
                            }
                        });
                });
        });
}

module.exports.seedInitialTopics = function() {
    setTimeout(topicSeed, 1500);
};