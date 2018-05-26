(function () {
    const firebase = require('firebase-admin');

    function AuthModel () {};

    AuthModel.prototype.insert = function (userId, insertUserData) {
        let userData = {};
        return firebase.database().ref('users/' + userId).set(insertUserData).then((ref) => {
            console.log(ref);
            for (let dataTitle in insertUserData) {
                userData[userId].dataTitle = insertUserData.dataTitle;
            }
            // memberData[memberId] = {
            //     birthday: insertMemberData.birthday,
            //     email: insertMemberData.email,
            //     name: insertMemberData.name,
            //     user_id: insertMemberData.user_id
            // };
            return userData;
        }).catch(() => {
            return null;
        });
    }
    module.exports = new AuthModel();
}());
