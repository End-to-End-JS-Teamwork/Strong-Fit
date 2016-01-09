'use strict';
var Category = require('mongoose').model('Category');

function get() {
    return new Promise(function (resolve, reject) {
        Category.find({}, function (err, categories) {
            if (err) {
                reject(err);
            }

            resolve(categories);
        });
    });
}

module.exports = {
    get: get
}
