var Article = require('mongoose').model('Article'),
    paginate = require('express-paginate'),
    viewModels = require('../view-models');

module.exports = {
    getCreateArticle: function (req, res, next) {
        res.render('partials/admin/create-article');
    },
    postCreateArticle: function (req, res, next) {
        var article = {
            title: req.body.title,
            description: req.body.description,
            createdBy: 'Anton Hristov',
            imageUrl: req.body.imageUrl
        };

        Article.create(article, function (err, article) {
            if (err) {
                console.log('Cannot create article: ' + err);
                req.session.error = 'Error occurred: cannot create article';
                return;
            }

            //req.session.error = 'Success: Article created';
            res.redirect('/admin/articles');
        });
    },
    getAllArticles: function (req, res, next) {
        Article.find({}).exec(function (err, articles) {
            Article.paginate({}, {
                page: req.query.page,
                limit: req.query.limit
            }, function (err, articleCollection, pageCount, itemCount) {
                if (err) {
                    console.log(err);
                }

                var articleViewModel = viewModels.ArticleDetailAdminPartViewModel.getArticleDetailAdminPartViewModel(articles);

                if (req.query.sort === 'title') {
                    articleViewModel.sort(function (firstArticle, secondArticle) {
                        var firstTitle = firstArticle.title.toLowerCase(),
                            secondTitle = secondArticle.title.toLowerCase();

                        if (firstTitle < secondTitle) {
                            return -1;
                        }

                        if (firstTitle > secondTitle) {
                            return 1;
                        }

                        return 0;
                    })
                } else if (req.query.sort === 'date') {
                    articleViewModel.sort(function (firstArticle, secondArticle) {
                        var firstDate = new Date(firstArticle.createdOn),
                            secondDate = new Date(secondArticle.createdOn);

                        return secondDate - firstDate;
                    })
                }

                var page = req.query.page;
                var limit = 2;
                var articlesCollection = [];
                for (var i = ((page - 1) * limit), j = i; i < j + limit; i++) {
                    articlesCollection.push(articleViewModel[i]);
                }

                res.render('partials/admin/articles', {
                    articles: articlesCollection,
                    sectionHeader: 'Статии',
                    pageCount: pageCount,
                    itemCount: itemCount,
                    pages: paginate.getArrayPages(req)(5, articleViewModel.length / limit, req.query.page)
                });
            });
        });
    }
};