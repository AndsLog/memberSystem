(function () {
    var api = window.restfulAPI;

    var userId;
    try {
        var payload = window.jwt_decode(window.localStorage.getItem('jwt'));
        userId = payload.uid;
    } catch (ex) {
        userId = '';
    }

    // Initialize Firebase
    firebase.initializeApp(config);

    $('#signup').addClass('d-none');

    $(document).on('click', '#signup-submit', signUp);
    $(document).on('click', '#signin-submit', signIn);
    // $(document).on('blur', '#signup-confirm-password', checkPassword);
    $(document).on('click', '#btn-signin', showSignin);
    $(document).on('click', '#btn-signup', showSignup);

        

    function showSignin () {
        $('#signin').removeClass('d-none');
        $('#signup').addClass('d-none');
    }

    function showSignup () {
        $('#signup').removeClass('d-none');
        $('#signin').addClass('d-none');
    }

    function checkPassword () {
        let password = $('#signup-password').val();
        let confirmPassword = $('#signup-confirm-password').val();

        if (password && password !== confirmPassword) {
            alert('與密碼不相符');
            return false;
        }
        return true;
    }

    function signIn () {
        let email = $('#signin-e-mail').val();
        let password = $('#signin-password').val();

        return firebase.auth().signInWithEmailAndPassword(email, password).then((resJson) => {
            let userId = resJson.user.uid;
            let user = {
                userId: userId
            }
            return api.auth.signIn(user);
        }).then((resJson) => {
            let jwt = resJson.jwt;
            window.localStorage.setItem('jwt', jwt);
            window.location.replace('/user');
        }).catch((error) => {
            alert(error);
        });
    }

    function signUp () {
        let email = $('#signup-e-mail').val();
        let password = $('#signup-password').val();
        let user = {
            email: email,
            password: password
        };

        let checked = checkPassword();

        if(!checked) {
            alert('與密碼不相符');
            return;
        }

        return api.auth.signUp(user).then((resJson) => {
            let jwt = resJson.jwt;
            window.localStorage.setItem('jwt', jwt);
            window.location.replace('/user');
        }).catch((error) => {
            alert(error);
        });
    }
}());
