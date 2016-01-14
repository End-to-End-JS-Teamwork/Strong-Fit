function CommentDetailViewModel(comments) {
    var commentsCollection = [];

    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];

        var index = comment.createdOn.toString().indexOf('G');
        var createdOnDate = comment.createdOn.toString()
            .substring(0, index - 1)
            .substring(3, index - 1);

        var commentModel = {
            content: comment.content,
            topic: comment.topic,
            createdBy: comment.createdBy,
            createdOn: createdOnDate + 'h'
        };

        commentsCollection.push(commentModel);
    }

    return commentsCollection;
}

module.exports = {
    getCommentDetailViewModel: function (comments) {
        return new CommentDetailViewModel(comments);
    }
};