(function () {
    "use strict";

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);
        if (response.status === 'connected') {
            setUserData();
        } else if (response.status === 'not_authorized') {
            document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
        } else {
            document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
        }
    }
    // This function is called when someone finishes with the Login Button.
    function checkLoginState() {
        console.log('Check login state!!!!!!!!!!!!!!!!!!!!!!!');
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
        window.location.reload();
    }
    window.fbAsyncInit = function () {
        FB.init({
            appId: '768604839929508',
            cookie: true,
            xfbml: true,
            version: 'v2.2'
        });
        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    };
    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    // Sets the user data to localStorage
    function setUserData() {
        toastr.info('Please, wait a moment till we process your data. You can try to refresh. Thank you! :)')
        FB.api('/me?fields=id,name,email', function (response) {
            localStorage.setItem('username', response.name);
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem('profilePicture', 'http://graph.facebook.com/' + response.id + '/picture?type=large');
            var url = window.location.href;
            var index = url.lastIndexOf('#');
            var newUrl = url.substring(0, index + 1) + '/home';
            if (window.location.href !== newUrl) {
                window.location.reload();
            }
            window.location = newUrl;
        });
    }
    var loginButton = document.getElementById('facebook-container');
    loginButton.onclick = function () {
        window.location.reload();
    };
    // Logout user
    var signOutButton = document.getElementById('signOut-button');
    signOutButton.onclick = function facebookLogout() {
            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    FB.logout(function (response) {
                        localStorage.clear();
                        window.location.reload();
                    });
                }
            });
        }
}());