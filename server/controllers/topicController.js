var Topic = require('mongoose').model('Topic'),
    Subcategory = require('mongoose').model('Subcategory'),
    paginate = require('express-paginate'),
    viewModels = require('../view-models');

module.exports = {
    getCreateTopic: function (req, res, next) {
        Subcategory.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find subcategories: ' + err);
                return;
            }

            res.render('partials/forum/create-topic', {collection: collection});
        });
    },
    postCreateTopic: function (req, res, next) {
        console.log(req);
        var topic = {
            name: req.body.name,
            subcategory: req.body.subcategory,
            createdBy: req.user.username,
            comments: [
                {
                    content: req.body.description,
                    subcategory: req.body.subcategory,
                    topic: req.body.name,
                    createdBy: req.user.username
                }
            ]
        };

        console.log(topic);

        Topic.create(topic, function (err, topic) {
            if (err) {
                console.log('Cannot create topic: ' + err);
                return;
            }

            req.session.error = 'Success: Успешно създадена тема';
            res.redirect('/forum');
        });
    },
    getAllTopics: function (req, res, next) {
        Topic.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find topics: ' + err);
                return;
            }

            Topic.paginate({}, { page: req.query.page, limit: req.query.limit }, function (err, topics, pageCount, itemCount) {
                if (err) {
                    console.log(err);
                }

                var topicViewModelCollection = viewModels.TopicDetailViewModel.getTopicDetailViewModel(collection);

                if (req.query.sort === 'name') {
                    topicViewModelCollection.sort(function (firstTopic, secondTopic) {
                        var firstName = firstTopic.name.toLowerCase(),
                            secondName = secondTopic.name.toLowerCase();

                        if (firstName < secondName) {
                            return -1;
                        }

                        if (firstName > secondName) {
                            return 1;
                        }

                        return 0;
                    });
                } else if (req.query.sort === 'date') {
                    topicViewModelCollection.sort(function (firstTopic, secondTopic) {
                        var firstDate = new Date(firstTopic.createdOn),
                            secondDate = new Date(secondTopic.createdOn);

                        return secondDate - firstDate;
                    });
                } else if (req.query.sort === 'author') {
                    topicViewModelCollection.sort(function (firstTopic, secondTopic) {
                        var firstAuthor = firstTopic.createdBy.toLowerCase(),
                            secondAuthor = secondTopic.createdBy.toLowerCase();

                        if (firstAuthor < secondAuthor) {
                            return -1;
                        }

                        if (firstAuthor > secondAuthor) {
                            return 1;
                        }

                        return 0;
                    });
                }

                var page = req.query.page;
                var limit = 2;
                var topicsCollection = [];
                for (var i = ((page - 1) * limit), j = i; i < j + limit; i++) {
                    topicsCollection.push(topicViewModelCollection[i]);
                }

                res.render('partials/forum/topics', {
                    topics: topicsCollection,
                    sectionHeader: 'Теми',
                    pageCount: pageCount,
                    itemCount: itemCount,
                    pages: paginate.getArrayPages(req)(5, topicViewModelCollection.length / limit, req.query.page)
                });
            });
        });
    }
};