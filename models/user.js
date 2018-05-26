(function () {
    const firebase = require('firebase-admin');

    function UserModel () {};

    UserModel.prototype.get = function (userId) {
        let user = {};
        return firebase.database().ref('/users/' + userId).once('value').then((snap) => {
            user[snap.key] = snap.val();
            return user;
        }).catch(() => {
            return null;
        });
    }

    UserModel.prototype.insert = function (userId, insertUser) {
        let user = {};
        return firebase.database().ref('/users/' + userId).set(insertUser).then(() => {
            user[userId] = Object.assign({}, insertUser);
            return user;
        }).catch(() => {
            return null;
        });
    }

    UserModel.prototype.delete = function (userId) {
        return firebase.database().ref('/users/' + userId).off().then(() => {
            return userId;
        }).catch(() => {
            return null;
        });
    }
    module.exports = new UserModel();
}());
