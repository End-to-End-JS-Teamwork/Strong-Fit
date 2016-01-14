// http://www.acunetix.com/websitesecurity/cross-site-scripting/

var helpers = require('../utilities/help-functions');

var HTML_TAGS = ['<script>', '</script>', '<body>', '</body>', '<img>', '<iframe>', '<input>', '<table>', '<br/>',
    '<object>', '<applet>', '<embed>','<form>', '<div>', '</div>'];

module.exports = {
    handleHtmlTags: function(input) {
        var securedInput = helpers.replaceAll(input, HTML_TAGS[0], ' ');

        for (var i = 1; i < HTML_TAGS.length; i++) {
            securedInput = helpers.replaceAll(securedInput, HTML_TAGS[i], ' ');
        }

        return securedInput;
    }
};