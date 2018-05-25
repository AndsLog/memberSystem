(function(){
    const firebase = require('firebase-admin');
    
    function MemberModel() {};

    MemberModel.prototype.get = function(userId) {
        return firebase.database().ref('/users/' + userId).once('value').then((snap) => {
            let user = snap.val();
            return user;
        }).catch(() => {
            return null;
        })
    }

    MemberModel.prototype.insert = function(userId, insertMember) {
        return firebase.database().ref('/users/' + userId).set(insertMember).then(() => {
            return insertMember;
        }).catch(() => {
            return null;
        })
    }

    MemberModel.prototype.delete = function(userId, insertMember) {
        return firebase.database().ref('/users/' + userId).off().then(() => {
            return insertMember;
        }).catch(() => {
            return null;
        })
    }
    module.exports = new MemberModel();
}())