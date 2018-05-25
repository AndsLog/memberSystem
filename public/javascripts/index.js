(function () {
    var api = window.restfulAPI;

    var userId;
    try {
        var payload = window.jwt_decode(window.localStorage.getItem('jwt'));
        userId = payload.uid;
    } catch (ex) {
        userId = '';
    }

    $(document).on('click', '#submit', signUp);


    function auth () {
        let email = $('#e-mail').val();
        let password = $('#password').val();
    }

    function signUp () {
        let email = $('#e-mail').val();
        let password = $('#password').val();
        let user = {
            email: email,
            password: password
        };
        return api.auth.signUp(user).then((resJson) => {
            let jwt = resJson.jwt;
            window.localStorage.setItem('jwt', jwt);
            window.location.replace('/member');
        }).catch((error) => {
            console.log(error);
        });
    }
}());
