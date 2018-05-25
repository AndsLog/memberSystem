(function(){
    const firebase = require('firebase-admin');
    
    function AuthModel() {};

    AuthModel.prototype.insert = function(insertUserData){
        return firebase.ref('users/').push().then((ref) => {
            let userId = ref.key;
            return firebase.database().ref('users/' + userId).set(insertUserData);
        }).then(() => {
            return insertUserData;
        }).catch(() => {
            return null;
        })
    }
    module.exports = new AuthModel();
}())
