function TopicDetailViewModel(topics) {
    var topicsCollection = [];

    for (var i = 0; i < topics.length; i++) {
        var topic = topics[i];

        var index = topic.createdOn.toString().indexOf('G');
        var createdOnDate = topic.createdOn.toString()
            .substring(0, index - 1)
            .substring(3, index - 1);

        var topicModel = {
            name: topic.name,
            createdOn: createdOnDate + 'h',
            createdBy: topic.createdBy
        };

        topicsCollection.push(topicModel);
    }

    return topicsCollection;
}

module.exports = {
    getTopicDetailViewModel: function (topics) {
        return new TopicDetailViewModel(topics);
    }
};