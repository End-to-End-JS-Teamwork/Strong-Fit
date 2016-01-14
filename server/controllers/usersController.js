'use strict';

var fs = require('fs'),
    formidable = require('formidable'),
    encryption = require('../utilities/encryption'),
    User = require('mongoose').model('User'),
    DEFAULT_UPLOAD_DIRECTORY = './public/images',
    DEFAULT_AVATAR = 'img/default-avatar.jpg',
    CONTROLLER_NAME = 'users',
    PARTIAL_NAME = 'partials/',
    paginate = require('express-paginate'),
    viewModels = require('../view-models');

var getImageGuid = function (image) {
    var guidIndex = image.path.lastIndexOf('/');

    if (guidIndex < 0) {
        var guidIndex = image.path.lastIndexOf('\\');
    }

    var guid = image.path.substring(guidIndex + 1);
    return guid;
};

module.exports = {
    getRegister: function (req, res) {
        res.render(PARTIAL_NAME + CONTROLLER_NAME + '/register');
    },
    postRegister: function (req, res, next) {
        var newUserData = {
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            imageUrl: DEFAULT_AVATAR
        };

        if (newUserData.password !== newUserData.confirmPassword) {
            req.session.error = 'Passwords do not match!';
            res.redirect('/register');
        } else if (newUserData.password.length < 6) {
            req.session.error = 'Password should be at least 6 characters long!';
            res.redirect('/register');
        } else {
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
                    } else {
                        req.session.error = 'Success: Register successful';
                        res.redirect('/');
                    }
                });
            });
        }
    },
    getLogin: function (req, res) {
        res.render(PARTIAL_NAME + CONTROLLER_NAME + '/login');
    },
    getUser: function (req, res) {
        res.render(PARTIAL_NAME + CONTROLLER_NAME + '/profile', {currentUser:req.user,result: viewModels});
    },
    updateUser: function (req, res, next) {

        /* var currentUser = req.user;
        console.log(currentUser.username);

        // || User.currentUser.role === 'admin'
        console.log(User.username);

        if (User.username === req.username) {
            var newUserData = req.body;
            if (newUserData.password) {
                if (newUserData.password !== newUserData.confirmPassword) {
                    req.session.error = 'Passwords do not match!';
                    res.redirect('/profile');
                } else if (newUserData.password.length < 6) {
                    req.session.error = 'Password should be at least 6 characters long!';
                    res.redirect('/profile');
                } else  {
                    newUserData.salt = encryption.generateSalt();
                    newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, newUserData.password);
                }
            }

            console.log('stop')
            debugger;
            User.update(newUserData.username, req.body, function (err, updatedUser) {
                if (err) {
                    req.session.error = 'There was problem updating the user profile: ' + err.errmsg;
                    res.redirect('/');
                    return;
                }

                User.currentUser = updatedUser;
                req.session.info = `${updatedUser.username} updated successfully.`;
                res.redirect('back');
            })
        } else {
            req.session.error = 'You do not have sufficient permissions to access this page!';
            res.redirect('/');
        }*/



        if (!fs.existsSync(DEFAULT_UPLOAD_DIRECTORY)) {
            fs.mkdirSync(DEFAULT_UPLOAD_DIRECTORY);
        }



        var form = new formidable.IncomingForm();
        form.encoding = 'utf-8';
        form.uploadDir = DEFAULT_UPLOAD_DIRECTORY;
        form.keepExtensions = true;



        form.parse(req, function (err, fields, files) {
            // Finds user to be updated
            User.findOne({_id: req.params.id}).exec(function (err, user) {
                if (err || !user) {
                    res.status(400);
                    res.send('Error updating user: ' + err);
                }

                User.firstName = req.user.firstName;
                User.lastName = req.user.lastName;

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
                console.log('gosho');
                User.update({_id: req.body._id}, req.bod, function (err) {
                    if (err) {
                        res.status(400).send('Error updating user: ' + err);
                        console.log(err);
                        return;
                    }

                    console.log(req.body._id);
                    User.findOne({_id: req.body._id}).exec(function (err, user) {
                        console.log(user);
                        res.send(user);
                        res.status(200).send('User updated successfully!');
                        res.redirect('/');
                    })
                });

                /*User.update(function (err) {
                    if (err) {
                        res.status(400).send('Error updating user: ' + err);
                        return;
                    }

                    res.status(200).send('User updated successfully!');
                    res.redirect('/');
                });*/
            });
        });
    },
    getById: function (req, res, next) {
        User
            .findOne({_id: req.params.id})
            .select('_id username firstName lastName imageUrl registerDate roles comments articles')
            .exec(function (err, user) {
                if (err) {
                    res.status(400).send('User could not be found: ' + err);
                    console.log('User could not be found: ' + err);
                    return;
                }

                res.send(user);
            });
    },
    getByUsername: function (req, res, next) {
        User
            .findOne({username: req.params.username})
            .select('_id username firstName lastName imageUrl registerDate roles comments articles')
            .exec(function (err, user) {
                if (err) {
                    res.status(400).send('User could not be found: ' + err);
                    console.log('User could not be found: ' + err);
                    return;
                }

                res.send(user);
            });
    },
    deleteUser: function (req, res, next) {
        // Allowed for admins
        User
            .findOne({username: req.body.username})
            .remove()
            .exec(function (err) {
                if (err) {
                    res.status(400).send('User could not be found: ' + err);
                    console.log('User could not be found: ' + err);
                    return;
                }

                //req.session.error = 'Success: User deleted successfully | User: ' + req.body.username;
                res.redirect('/admin/users');
                res.status(200);
            });
    },
    getAllUsers: function (req, res, next) {
        User.find({}).exec(function (err, collection) {
            User.paginate({}, {
                page: req.query.page,
                limit: req.query.limit
            }, function (err, users, pageCount, itemCount) {
                if (err) {
                    console.log('Cannot find users...');
                    return;
                }

                var usersCollection = viewModels.UserPaginateViewModel.getUserPaginateViewModel(collection);

                if (req.query.sort === 'username') {
                    usersCollection.sort(function (firstUser, secondUser) {
                        var firstUsername = firstUser.username.toLowerCase(),
                            secondUsername = secondUser.username.toLowerCase();

                        if (firstUsername < secondUsername) {
                            return -1;
                        }

                        if (firstUsername > secondUsername) {
                            return 1;
                        }

                        return 0;
                    })
                } else if (req.query.sort === 'lastName') {
                    usersCollection.sort(function (firstUser, secondUser) {
                        var firstName = firstUser.lastName.toLowerCase(),
                            secondName = secondUser.lastName.toLowerCase();

                        if (firstName < secondName) {
                            return -1;
                        }

                        if (firstName > secondName) {
                            return 1;
                        }

                        return 0;
                    })
                }

                var page = req.query.page;
                var limit = 4;
                var userCollection = [];
                for (var i = ((page - 1) * limit), j = i; i < j + limit; i++) {
                    userCollection.push(usersCollection[i]);
                }

                res.render('partials/admin/users', {
                    users: userCollection,
                    sectionHeader: 'Потребители',
                    pageCount: pageCount,
                    itemCount: itemCount,
                    pages: paginate.getArrayPages(req)(3, usersCollection.length / limit, req.query.page)
                });
            });
        });
    }
};