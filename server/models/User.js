var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    config = require('../config/config');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        validate: function (input) {
            return /[0-9A-z]/.test(input);
        },
        require: '{PATH} is required',
        message: '{PATH} is not a valid username'
    },
    firstName: {
        type: String,
        validate: function (input) {
            return /[A-z]/.test(input);
        },
        require: '{PATH} is required',
        message: '{PATH} your name contains illegal characters'
    },
    lastName: {
        type: String,
        validate: function (input) {
            return /[A-z]/.test(input);
        },
        require: '{PATH} is required',
        message: '{PATH} your name contains illegal characters'
    },
    registerDate: {type: Date, default: Date.now},
    salt: String,
    hashPass: String,
    roles: [String],
    imageUrl: String,
    comments: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }],
    articles: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Article'
    }]
});

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    },
    isInRole: function (role) {
        return this.roles.indexOf(role) > -1
    }
});

var User = mongoose.model('User', userSchema);

// TODO: add initial comments and articles to users
function userSeed(salt, hashedPass) {
    // Admin
    User.create({
        username: 'admin',
        firstName: 'Anton',
        lastName: 'Hristov',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.admin],
        imageUrl: 'img/default-avatar.jpg'
    });

    // User
    User.create({
        username: 'albena',
        firstName: 'Albena',
        lastName: 'Georgieva',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg'
    });
}

module.exports.seedInitialUsers = function () {
    User
        .find({})
        .exec(function (error, collection) {
            if (error) {
                console.log('Cannot find users: ' + error);
                return;
            }

            if (collection.length === 0) {
                var salt,
                    hashedPass;

                salt = encryption.generateSalt();
                hashedPass = encryption.generateHashedPassword(salt, '123456q');
                userSeed(salt, hashedPass);
                console.log('Users added to database...');
            }
        });
};