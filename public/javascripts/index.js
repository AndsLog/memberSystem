(function () {
    var api = window.restfulAPI;

    var userId;
    try {
        var payload = window.jwt_decode(window.localStorage.getItem('jwt'));
        userId = payload.uid;
    } catch (ex) {
        userId = '';
    }


    $(document).on('click', '#signup-submit', signUp);
    $(document).on('click', '#signin-submit', signIn);
    $(document).on('blur', '#signin-confirm-password', checkPassword);
    $(document).on('click', '#btn-signin', showSignin);
    $(document).on('click', '#btn-signup', showSignup);

    $(document).ready(function () {
        $('#signup').addClass('d-none');
    });

    function showSignin () {
        $('#signin').removeClass('d-none');
        $('#signup').addClass('d-none');
    }

    function showSignup () {
        $('#signup').removeClass('d-none');
        $('#signin').addClass('d-none');
    }

    function checkPassword () {
        let password = $('#signin-password').val();
        let confirmPassword = $('#signin-confirm-password').val();

        if (password && password !== confirmPassword) {
            alert('與密碼不相符');
            return false;
        }
        return true;
    }

    function signIn () {
        let email = $('#signin-e-mail').val();
        let password = $('#signin-password').val();

        let user = {
            email: email,
            password: password
        };

        let checked = checkPassword();

        if(!checked) {
            alert('與密碼不相符');
            return;
        }

        return api.auth.signIn(user).then((resJson) => {
            let jwt = resJson.jwt;
            window.localStorage.setItem('jwt', jwt);
            window.location.replace('/user');
        }).catch((error) => {
            console.log(error);
        });
    }

    function signUp () {
        let email = $('#signup-e-mail').val();
        let password = $('#signup-password').val();
        let user = {
            email: email,
            password: password
        };
        return api.auth.signUp(user).then((resJson) => {
            let jwt = resJson.jwt;
            window.localStorage.setItem('jwt', jwt);
            window.location.replace('/user');
        }).catch((error) => {
            console.log(error);
        });
    }
}());
