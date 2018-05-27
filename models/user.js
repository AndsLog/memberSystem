(function () {
    const firebase = require('firebase-admin');

    function UserModel () {};

    UserModel.prototype.find = function (userId) {
        let users = {};
        return firebase.database().ref('/users/' + userId).once('value').then((snap) => {
            if (!userId) {
                users = Object.assign({}, snap.val());
                return users;
            }
            users[snap.key] = Object.assign({}, snap.val());
            return users;
        }).catch(() => {
            return null;
        });
    }

    UserModel.prototype.insert = function (userId, insertUser) {
        let users = {};
        return firebase.database().ref('/users/' + userId).set(insertUser).then(() => {
            users[userId] = Object.assign({}, insertUser);
            return users;
        }).catch(() => {
            return null;
        });
    }

    UserModel.prototype.delete = function (userId) {
        return firebase.database().ref('/users/' + userId).remove().then(() => {
            return userId;
        }).catch(() => {
            return null;
        });
    }
    module.exports = new UserModel();
}());
