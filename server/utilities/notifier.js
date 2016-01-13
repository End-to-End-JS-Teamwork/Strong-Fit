(function(){
    'use strict';

    var toastr = require('toastr');

    function success(message) {
        toastr.success(message);
    }

    function error(message) {
        toastr.error(message);
    }

    module.exports = {
        success: success,
        error: error
    }
}());
