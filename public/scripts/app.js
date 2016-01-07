'use strict';

var strongFitApp = angular
    .module('strongFitApp', ['ngResource', 'ngRoute', 'ngCookies'])
    .config(function($routeProvider) {
        var routeUserCheck = {
            adminRole: {
                authenticate: function(auth) {
                    return auth.isAuthorizedForRole('admin');
                }
            },
            authenticated: {
                authenticate: function(auth) {
                    return auth.isAuthenticated();
                }
            }
        };
    })
    .value('toastr', toastr)
    .constant('appName', 'StrongFit')
    .constant('serverPath', 'http://localhost:3210');

strongFitApp.run(function($rootScope, $location) {
    // When failed to change route -> change location path
    $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
        if (rejection === 'not authorized') {
            $location.path('/unauthorized');
        }
    });
});