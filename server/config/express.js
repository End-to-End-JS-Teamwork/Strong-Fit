'use strict';

var express = require('express'),
    flash = require('connect-flash'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    paginate = require('express-paginate'),
    morgan  = require('morgan'),
    toastr = require('express-toastr'),
    STATIC_DIRECTORY = '/public',
    secretPassPhrase = 'SequGcJeUcAXR7SymwXMmW6kDr8aYH86jCrwE8UdC7n';

module.exports = function (app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');

    app.use(morgan('dev'));

    app.use(cookieParser(secretPassPhrase));
    app.use(paginate.middleware(10, 50));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
        secret: secretPassPhrase,
        saveUninitialized: true,
        resave: true
    }));
    app.use(flash());
    app.use(toastr());
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + STATIC_DIRECTORY));
    app.use(function (req, res, next) {
        if (req.session.error) {
            var msg = req.session.error,
                index = msg.indexOf('Success: ');

            if (index > -1) {
                req.session.error = undefined;
                app.locals.successMessage = msg.substring(9, msg.length);
            } else {
                req.session.error = undefined;
                app.locals.errorMessage = msg;
            }
        }
        else {
            app.locals.errorMessage = undefined;
            app.locals.successMessage = undefined;
        }

        next();
    });
   /* app.use(function(req, res, next) {
        if (req.user) {
            app.locals.currentUser = req.user;
        }

        next();
    });*/
};