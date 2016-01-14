var User = require('mongoose').model('User');
var moment = require('moment');
    moment.locale('bg');

function OpenedTopicViewModel(comments) {
    var openedTopicCommentsModel = [];

    for (var i = 0; i < comments.length; i++) {
        var comment = comments[i];
        User.findOne({username: comment.createdBy}).exec(function (err, user) {
            if (err) {
                console.log('Cannot find user: ' + err);
                return;
            }

            var commentModel = {
                content: comment.content,
                createdOn: moment(comment.createdOn).fromNow(),
                createdBy: {
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    registerDate: user.registerDate,
                    imageUrl: user.imageUrl
                }
            };

            openedTopicCommentsModel.push(commentModel);
        });
    }

    return openedTopicCommentsModel;
}

module.exports = {
    getOpenedTopicCommentsViewModel: function (comments) {
        return new OpenedTopicViewModel(comments);
    }
};