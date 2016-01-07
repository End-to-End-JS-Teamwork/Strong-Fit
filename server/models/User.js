var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption'),
    config = require('../config/config');

var userSchema = mongoose.Schema({
    username: {type: String, require: '{PATH} is required', unique: true},
    firstName: {type: String, require: '{PATH} is required'},
    lastName: {type: String, require: '{PATH} is required'},
    registerDate: {type: Date, default: Date.now},
    salt: String,
    hashPass: String,
    roles: [String],
    imageUrl: String
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

// TODO: add default avatar (path) from "public/common/img" folder
function userSeed(salt, hashedPass) {
    // Admin
    User.create({
        username: 'admin',
        firstName: 'Anton',
        lastName: 'Hristov',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.admin]
    });

    // User
    User.create({
        username: 'albena',
        firstName: 'Albena',
        lastName: 'Georgieva',
        salt: salt,
        hashPass: hashedPass,
        roles: [config.identity.roles.user]
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