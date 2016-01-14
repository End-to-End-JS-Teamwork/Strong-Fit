var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate'),
    encryption = require('../utilities/encryption'),
    config = require('../config/config');

var userSchema = new mongoose.Schema({
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
userSchema.plugin(mongoosePaginate);

userSchema.method({
    authenticate: function (password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
    },
    isInRole: function (role) {
        return this.roles.indexOf(role) > -1
    },
    update: function(newProps){
        for(var prop in newProps){
            this[`${prop}`] = newProps[`${prop}`];
        }

        this.save();
        return this;
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
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'albena',
        firstName: 'Albena',
        lastName: 'Georgieva',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'dsd',
        firstName: 'Dimitar',
        lastName: 'Malinov',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'pesho',
        firstName: 'Pesho',
        lastName: 'Georgiev',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'zTer',
        firstName: 'Zdravko',
        lastName: 'Stoichev',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });
    // User
    User.create({
        username: 'd7sd',
        firstName: 'Dimitar',
        lastName: 'Malinov',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'pe4sho',
        firstName: 'Pesho',
        lastName: 'Georgiev',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'z1Ter',
        firstName: 'Zdravko',
        lastName: 'Stoichev',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });
    // User
    User.create({
        username: 'dsd9',
        firstName: 'Dimitar',
        lastName: 'Malinov',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'pesh9o',
        firstName: 'Pesho',
        lastName: 'Georgiev',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'zT9er',
        firstName: 'Zdravko',
        lastName: 'Stoichev',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'vaseto',
        firstName: 'Vasil',
        lastName: 'Petkov',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
    });

    // User
    User.create({
        username: 'mariaaa',
        firstName: 'Mara',
        lastName: 'Stoicheva',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user],
        imageUrl: 'img/default-avatar.jpg',
        comments: [],
        articles: []
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