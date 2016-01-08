/*
strongFitApp.factory('notifier', function (toastr) {
    return {
        success: function (message) {
            toastr.success(message);
        },
        error: function (message) {
            toastr.error(message);
        }
    }
});
*/

(function(){
    "use strict";

    var pathToastr = require('../public/lib/toastr')
        toastr = require(pathToastr + '/' + 'toastr'),
        notifier;

    notifier ({
        success: function(message) {
            toastr.success(message);
        },
        error: function(message) {
            toastr.error(message);
        }
    });

    module.exports = {
        notifier: notifier
    }
}());
