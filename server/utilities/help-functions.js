module.exports = {
    replaceAll: function (text, find, replace) {
        return text.replace(new RegExp(find, 'g'), replace);
    }
};