(function () {
    const firebase = require('firebase-admin');

    function AuthModel () {};

    AuthModel.prototype.insert = function (insertUserData) {
        let userData = {};
        return firebase.database().ref('users/').push().then((ref) => {
            let userId = ref.key;
            return Promise.all([
                firebase.database().ref('users/' + userId).set(insertUserData),
                userId
            ]);
        }).then((results) => {
            let userId = results[1];
            userData[userId] = {
                birthday: insertUserData.birthday,
                e_mail: insertUserData.e_mail,
                name: insertUserData.name,
                user_id: insertUserData.user_id
            };
            return userData;
        }).catch(() => {
            return null;
        });
    }
    module.exports = new AuthModel();
}());
