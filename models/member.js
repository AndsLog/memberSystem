(function () {
    const firebase = require('firebase-admin');

    function MemberModel () {};

    MemberModel.prototype.get = function (userId) {
        let user = {};
        return firebase.database().ref('/users/' + userId).once('value').then((snap) => {
            user[snap.key] = snap.val();
            return user;
        }).catch(() => {
            return null;
        });
    }

    MemberModel.prototype.insert = function (userId, insertMember) {
        return firebase.database().ref('/users/' + userId).set(insertMember).then(() => {
            return insertMember;
        }).catch(() => {
            return null;
        });
    }

    MemberModel.prototype.delete = function (userId) {
        return firebase.database().ref('/users/' + userId).off().then(() => {
            return userId;
        }).catch(() => {
            return null;
        });
    }
    module.exports = new MemberModel();
}());
