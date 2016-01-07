'use strict';

var fs = require('fs'),
    formidable = require('formidable'),
    encryption = require('../utilities/encryption'),
    User = require('mongoose').model('User'),
    DEFAULT_UPLOAD_DIRECTORY = './public/images',
    DEFAULT_AVATAR = 'default-avatar.jpg';

var getImageGuid = function (image) {
    var guidIndex = image.path.lastIndexOf('/');

    if (guidIndex < 0) {
        var guidIndex = image.path.lastIndexOf('\\');
    }

    var guid = image.path.substring(guidIndex + 1);
    return guid;
};

module.exports = {
    createUser: function (req, res, next) {
        var newUserData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            imageUrl: DEFAULT_AVATAR
        };

        newUserData.salt = encryption.generateSalt();
        newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);
        newUserData.roles = ['user'];

        User.create(newUserData, function (err, user) {
            if (err) {
                console.log('Failed to register new user: ' + err);
                res.status(400);
                res.send(false);
                return;
            }

            req.logIn(user, function (err) {
                if (err) {
                    res.status(400);
                    return res.send({
                        reason: err.toString()
                    });
                }

                res.send('user');
            });
        });
    },
    updateUser: function (req, res, next) {
        if (!fs.existsSync(DEFAULT_UPLOAD_DIRECTORY)) {
            fs.mkdirSync(DEFAULT_UPLOAD_DIRECTORY);
        }

        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = DEFAULT_UPLOAD_DIRECTORY;
        form.keepExtensions = true;

        form.parse(req, function (err, fields, files) {
            // Finds user to be updated
            User.findOne({_id: fields._id}).exec(function (err, user) {
                if (err || !user) {
                    res.status(400);
                    res.send('Error updating user: ' + err);
                }

                user.firstName = fields.firstName;
                user.lastName = fields.lastName;

                if (files.image) {
                    if (process.env.NODE_ENV) {
                        return res.status(403)
                            .send({
                                message: 'Changing profile photos has been disabled for security reasons!'
                            });
                    }

                    // Removes the old image
                    var oldImagePath = DEFAULT_UPLOAD_DIRECTORY + '/' + user.imageUrl;
                    if (user.imageUrl !== DEFAULT_AVATAR && fs.existsSync(oldImagePath)) {
                        fs.unlink(oldImagePath);
                    }

                    // Sets the new imageUrl
                    var newImageGuid = getImageGuid(files.image);
                    user.imageUrl = newImageGuid;
                }

                if (fields.password && fields.password.length > 5) {
                    user.salt = encryption.generateSalt();
                    user.hashPass = encryption.generateHashedPassword(user.salt, fields.password);
                }

                user.save(function (err) {
                    if (err) {
                        res.status(400).send('Error updating user: ' + err);
                        return;
                    }

                    res.status(200).send('User updated successfully!');
                });
            });
        });
    },
    getById: function (req, res, next) {
        User
            .findOne({ _id: req.params.id })
            .select('_id username firstName lastName imageUrl roles ')
            .exec(function (err, item) {
                if (err) {
                    res.status(400).send('User could not be found: ' + err);
                    console.log('User could not be found: ' + err);
                    return;
                }

                res.send(item);
            });
    },
    deleteUser: function (req, res, next) {
        // Allowed for admins
        User
            .findOne({ _id: req.params.id })
            .remove()
            .exec(function (err) {
                if (err) {
                    res.status(400).send('User could not be found: ' + err);
                    console.log('User could not be found: ' + err);
                    return;
                }

                res.status(200).send("User deleted successfully");
            });
    }
};