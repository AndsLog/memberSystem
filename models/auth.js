(function () {
    const firebase = require('firebase-admin');

    function AuthModel () {};

    AuthModel.prototype.insert = function (userId, insertUserData) {
        let userData = {};
        return firebase.database().ref('users/' + userId).set(insertUserData).then(() => {
            userData[userId] = Object.assign({}, insertUserData);
            return userData;
        }).catch(() => {
            return null;
        });
    }
    module.exports = new AuthModel();
}());
