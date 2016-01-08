(function () {
    'use strict';

    strongFitApp.controller('LoginController', function LoginController($scope, indentity) {
        //$scope.identity = identity;
        $scope.login = function (user) {
            console.log(user);
        };
    });
}());