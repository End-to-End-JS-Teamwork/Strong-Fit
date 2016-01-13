function ArticleDetailAdminPartViewModel(articles) {
    var articlesViewModel = [];

    for (var i = 0; i < articles.length; i++) {
        var currentArticle = articles[i];

        var index = currentArticle.createdOn.toString().indexOf('G');
        var createdOnDate = currentArticle.createdOn.toString()
            .substring(0, index - 1)
            .substring(3, index - 1);

        var article = {
            title: currentArticle.title,
            createdOn: createdOnDate + 'h'
        };

        articlesViewModel.push(article);
    }

    return articlesViewModel;
}

module.exports = {
    getArticleDetailAdminPartViewModel: function (articles) {
        return new ArticleDetailAdminPartViewModel(articles);
    }
};
