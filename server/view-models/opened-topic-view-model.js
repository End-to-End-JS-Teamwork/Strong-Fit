var User = require('mongoose').model('User');
var moment = require('moment');
    moment.locale('bg');

function OpenedTopicViewModel(comments) {
    var openedTopicCommentsModel = [];

    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];

            var commentModel = {
                content: comment.content,
                createdOn: moment(comment.createdOn).fromNow(),
                createdBy: {
                    username: comment.createdBy.username,
                    imageUrl: comment.createdBy.imageUrl
                }
            };

            openedTopicCommentsModel.push(commentModel);
    }

    console.log('Collection to be returned LENGTH: ' + openedTopicCommentsModel.length);
    return openedTopicCommentsModel;
}

module.exports = {
    getOpenedTopicCommentsViewModel: function (comments) {
        return new OpenedTopicViewModel(comments);
    }
};