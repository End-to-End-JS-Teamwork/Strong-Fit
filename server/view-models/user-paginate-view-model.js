function UserPaginateViewModel(users) {
    var usersModel = [];
    for (var i = 0; i < users.length; i++) {
        var currentUser = users[i];

        var index = currentUser.registerDate.toString().indexOf('G');
        var registeredDate = currentUser.registerDate.toString()
            .substring(0, index - 1)
            .substring(3, index - 1);

        var newUserModel = {
            username: currentUser.username,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            registerDate: registeredDate + 'h'
        };

        usersModel.push(newUserModel);
    }

    return usersModel;
}

module.exports = {
    getUserPaginateViewModel: function (users) {
        return new UserPaginateViewModel(users);
    }
};
