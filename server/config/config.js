'use strict';

var path = require('path'),
    rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/strongfitdb',
        port: process.env.PORT || 3210
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://admin:telerik2016@ds037015.mongolab.com:37015/strongfitdb',
        port: process.env.PORT || 3210
    },
    identity: {
        roles: {
            admin: 'admin',
            user: 'user'
        }
    }
};