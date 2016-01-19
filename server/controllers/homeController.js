var Article = require('mongoose').model('Article');

module.exports = {
    getNewestArticles: function (req, res, next) {
        Article.find({}).exec(function (err, articles) {
            if (err) {
                console.log('Cannot find articles: ' + err);
                return;
            }

            articles.sort(function (firstArticle, secondArticle) {
                var firstDate = new Date(firstArticle.createdOn),
                    secondDate = new Date(secondArticle.createdOn);

                return secondDate - firstDate;
            });

            var newestArticles = [];

            for (var i = 0; i < 4; i++) {
                var currentArticle = articles[i];
                newestArticles.push(currentArticle);
            }

            res.render('index',
                {
                    firstArticle: newestArticles[0],
                    secondArticle: newestArticles[1],
                    thirdArticle: newestArticles[2],
                    forthArticle: newestArticles[3]
                });
        });

    }
};