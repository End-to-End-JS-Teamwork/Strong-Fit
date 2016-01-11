'use strict';

var passport = require('passport'),
    socket = require('./socket'),
    viewModels = require('../view-models');

module.exports = {
    login: function (req, res, next) {
        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }

            if (!user) {
                res.send({
                    success: false
                });
            }

            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }

                // The username will be sent inside the token
                user.token = socket.getToken({
                    username: user.username
                });
                res.send({
                    success: true,
                    user: viewModels.UserViewModel.getUserViewModel(user),
                    token: user.token
                });
            });
        });

        auth(req, res, next);
    },
    logout: function (req, res, next) {
        req.logout();
        res.end();
    },
    isAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(401);
            res.end();
        } else {
            next();
        }
    },
    isInRole: function (roles) {
        return function (req, res, next) {
            if (roles instanceof Array) {
                roles.forEach(function (role) {
                    if (req.isAuthenticated() && req.user.roles.indexOf(role) > -1) {
                        next();
                    }
                });
            } else if (req.isAuthenticated() && req.user.roles.indexOf(roles) > -1) {
                next();
            } else {
                res.status(403);
                res.render('partials/main/unauthorized');
            }
        }
    }
};