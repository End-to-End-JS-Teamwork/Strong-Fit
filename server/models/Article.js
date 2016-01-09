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
var User = mongoose.model('User');


// Test articles (will be changed)
var articles = [
    {
        title: 'Test Article #1',
        description: 'Test Description #1 Test Description #1 Test Description #1 Test Description #1 Test Description #1 Test Description #1'
    },
    {
        title: 'Test Article #2',
        description: 'Test Description #2 Test Description #2 Test Description #2 Test Description #2 Test Description #2 Test Description #2'
    }
];

function articleSeed() {
    Article
        .find({})
        .exec(function (err, collection) {
            if (err) {
                console.log('Cannot find articles...');
                return;
            }

            User
                .find({})
                .exec(function (err, users) {
                    if (err) {
                        console.log('Seeding articles error: ' + err);
                        return;
                    }

                    if (collection.length === 0) {
                        articles.forEach(function (article) {
                            users.forEach(function (user) {
                                Article.create({
                                    title: article.title,
                                    description: article.description,
                                    createdBy: user
                                });

                            });
                        });

                        console.log('Articles added to database...');
                    }
                });
        });
}

module.exports.seedInitialArticles = function () {
    setTimeout(articleSeed, 1200);
};