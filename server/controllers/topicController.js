var Topic = require('mongoose').model('Topic'),
    Subcategory = require('mongoose').model('Subcategory');

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

    }
};