(function() {
    $(document).ready(function() {
        $(document).on('click', '#submit', signUp);
    });
    
    function auth(){
        let email = $('#e-mail').val();
        let password = $('#password').val();
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            window.location.replace("../member");
        }).catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert("無此使用者")
            console.log("errorMessage:" + errorMessage + " code:"+errorCode);
        });
    }

    function signUp() {
        let email = $('#e-mail').val();
        let password = $('#password').val();
        firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
            window.location.replace("../member");
        }).catch((error) => {
            console.error("寫入使用者資訊錯誤",error);
        });
    }
}());
