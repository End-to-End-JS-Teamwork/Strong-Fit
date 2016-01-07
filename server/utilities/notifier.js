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