var Comment = require('mongoose').model('Comment'),
    paginate = require('express-paginate'),
    viewModels = require('../view-models'),
    helpers = require('../utilities/help-functions');

module.exports = {
    postCreateComment: function (req, res, next) {
        var topicName = req.params.name;
        console.log('Topic name: ' + topicName);
        var name = helpers.replaceAll(topicName, '%20', ' ');

        var comment = {
            content: req.body.content,
            topic: name,
            createdBy: {
                username: req.user.username,
                imageUrl: req.user.imageUrl
            }
        };

        Comment.create(comment, function (err, comment) {
            if (err) {
                console.log('Cannot create article: ' + err);
                return;
            }

            req.session.error = 'Success: Успешно добавихте коментар';
            res.redirect('/forum/topic/');
        });
    },
    getAllComments: function (req, res, next) {
        Comment.find({}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find comments: ' + err);
            }

            Comment.paginate({}, { page: req.query.page, limit: req.query.limit }, function (err, topics, pageCount, itemCount) {
                if (err) {
                    console.log(err);
                }

                var commentViewModel = viewModels.CommentDetailViewModel.getCommentDetailViewModel(collection);

                if (req.query.sort === 'topic') {
                    commentViewModel.sort(function (firstComment, secondComment) {
                        var firstTopic = firstComment.topic.toLowerCase(),
                            secondTopic = secondComment.topic.toLowerCase();

                        if (firstTopic < secondTopic) {
                            return -1;
                        }

                        if (firstTopic > secondTopic) {
                            return 1;
                        }

                        return 0;
                    });
                } else if (req.query.sort === 'date') {
                    commentViewModel.sort(function (firstComment, secondComment) {
                        var firstDate = new Date(firstComment.createdOn),
                            secondDate = new Date(secondComment.createdOn);

                        return secondDate - firstDate;
                    });
                } else if (req.query.sort === 'author') {
                    commentViewModel.sort(function (firstComment, secondComment) {
                        var firstAuthor = firstComment.createdBy.toLowerCase(),
                            secondAuthor = secondComment.createdBy.toLowerCase();

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
                var commentsCollection = [];
                for (var i = ((page - 1) * limit), j = i; i < j + limit; i++) {
                    commentsCollection.push(commentViewModel[i]);
                }

                res.render('partials/forum/comments', {
                    comments: commentsCollection,
                    sectionHeader: 'Коментари',
                    pageCount: pageCount,
                    itemCount: itemCount,
                    pages: paginate.getArrayPages(req)(5, commentViewModel.length / limit, req.query.page)
                });
            });
        });
    },
    getAllCommentsForTopic: function (req, res, next) {
        var topicName = req.params.name;
        var name = helpers.replaceAll(topicName, '%20', ' ');

        Comment.find({topic: name}).exec(function (err, collection) {
            if (err) {
                console.log('Cannot find comments with this topic: ' + err);
                res.render('partials/main/not-found');
                return;
            }

            Comment.paginate({}, { page: req.query.page, limit: req.query.limit }, function (err, comments, pageCount, itemCount) {
                if (err) {
                    console.log(err);
                }
                console.log(collection);
                var commentViewModel = viewModels.OpenedTopicViewModel.getOpenedTopicCommentsViewModel(collection);
                var page = req.query.page;
                var limit = 2;
                var commentsCollection = [];
                for (var i = ((page - 1) * limit), j = i; i < j + limit; i++) {
                    commentsCollection.push(commentViewModel[i]);
                }

                res.render('partials/forum/opened-topic', {
                    comments: commentsCollection,
                    sectionHeader: name,
                    pageCount: pageCount,
                    itemCount: itemCount,
                    pages: paginate.getArrayPages(req)(5, commentViewModel.length / limit, req.query.page)
                });
            });
        });
    },
    getAllCommentsForSubcategory: function (req, res, next) {

    }
};
