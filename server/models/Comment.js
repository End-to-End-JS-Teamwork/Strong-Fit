var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

var commentSchema = mongoose.Schema({
    content: {
        type: String,
        validate: function (input) {
            return (input.length > 10 && input.length < 4000);
        },
        required: true,
        require: '{PATH} is required',
        message: '{PATH} content of message should be between 10 and 4000 symbols'
    },
    createdOn: {type: Date, default: Date.now},
    subcategory: {type: String},
    topic: {type: String},
    createdBy: {
        username: String,
        imageUrl: String
    }
});

commentSchema.plugin(mongoosePaginate);

var Comment = mongoose.model('Comment', commentSchema);

function commentSeed() {
    Comment.find({}).exec(function (err, collection) {
        Comment.create({
            content: 'Триците накисваш ли ги предварително?',
            subcategory: 'Рецепти',
            topic: 'Бананови мъфини',
            createdBy: 'mariaaa'
        });

        Comment.create({
            content: 'Не',
            subcategory: 'Рецепти',
            topic: 'Бананови мъфини',
            createdBy: 'pavel'
        });

        Comment.create({
            content: 'Изглежда вкусно, още днес ще се пробва',
            subcategory: 'Рецепти',
            topic: 'Бананови мъфини',
            createdBy: 'albena'
        });

        Comment.create({
            content: 'А дали може овесените трици да се заместят с нещо друго?',
            subcategory: 'Рецепти',
            topic: 'Бананови мъфини',
            createdBy: 'zdravko'
        });
    });
}

module.exports.seedInitialComments = function() {
    setTimeout(commentSeed, 1700);
};