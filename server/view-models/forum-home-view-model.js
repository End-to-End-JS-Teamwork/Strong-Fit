function ForumHomeViewModel(categories, subcategories, comments) {
    this.categories = categories;
    this.subcategories = subcategories;
    this.comments = comments;//groupComments(comments);
    return this;
}

module.exports = {
    getForumHomeViewModel: function (categories, subcategories, comments) {
        return new ForumHomeViewModel(categories, subcategories, comments);
    }
};

function groupComments(comments) {
    var collection = [],
        subcategories = {},
        i, j, currentComment;

    for (i = 0, j = comments.length; i < j; i++) {
        currentComment = comments[i];

        if (!(currentComment.subcategory in subcategories)) {
            subcategories[currentComment.subcategory] = [];
            collection.push(subcategories[currentComment.subcategory]);
        }

        subcategories[currentComment.type].push(currentComment);
    }

    return collection;
}
