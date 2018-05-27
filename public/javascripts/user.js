(function () {
    var api = window.restfulAPI;

    let userData = {};

    var userId;
    var role;
    var email;
    try {
        var jwt = window.localStorage.getItem('jwt');
        checkJwt(jwt);
        var payload = window.jwt_decode(jwt);
        role = payload.role;
        userId = payload.uid;
        email = payload.email;
        if (role) {
            userId = '';
        }
    } catch (ex) {
        userId = '';
    }

    // Initialize Firebase
    firebase.initializeApp(config);

    greetingText();
    findUser();

    $(document).on('click', '#submit', insertUser);
    $(document).on('click', '#update', updateUser);
    $(document).on('click', '#remove', removeUser);
    $(document).on('click', '#signout', signOut);
    $(document).on('click', '#back', backPage);

    function findUser() {
        return api.user.find(userId).then((resJson) => {
            $('#userInfo').empty();
            let users = resJson.data;
            if (userId && !users[userId].name && !users[userId].birthday) {
                userData.email = users[userId].email;
                $('#submit').attr('rel', userId);
                $('#insert-form').removeClass('d-none');
                $('#submit').removeClass('d-none');
                return;
            }
            for(let resUserId in users) {
                let user = users[resUserId];
                let nameText = user.name ? user.name : '未填寫';
                let birthdayText = user.birthday ? user.birthday : '未填寫';
                let elementStr =
                    '<tr rel="' + resUserId + '">' +
                        '<td id="td-email" rel="' + user.email + '">' + user.email + '</td>' +
                        '<td id="td-name" rel="' + user.name + '">' + nameText + '</td>' +
                        '<td id="td-birthday" rel="' + user.birthday + '">' + birthdayText + '</td>' +
                        '<td>' +
                            '<button type="submit" id="update" class="btn">update</button>';
                if (1 === role && user.email !== email) {
                    elementStr +=
                            '<button type="submit" id="remove" class="btn btn-danger">remove</button>' +
                        '</td>' +
                    '</tr>';
                };
                $('#userInfo').append(elementStr);
                $('#user-table').removeClass('d-none');
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function insertUser () {
        let userId = $('#submit').attr('rel');
        let name = $('#name').val();
        let birthday = $('#birthday').val();

        userData.name = name;
        userData.birthday = birthday;

        return api.user.insert(userId, userData).then((resJson) => {
            $('#userInfo').empty();
            let user = resJson.data;
            $('#name').val(user[userId].name);
            $('#birthday').val(user[userId].birthday);
            $('#insert-form').addClass('d-none');
            $('#submit').addClass('d-none');
            let nameText = user[userId].name ? user[userId].name : '未填寫';
            let birthdayText = user[userId].birthday ? user[userId].birthday : '未填寫';
            let appendStr =
                '<tr rel="' + userId + '">' +
                    '<td id="td-email" rel="' + user[userId].email + '">' + user[userId].email + '</td>' +
                    '<td id="td-name" rel="' + user[userId].name + '">' + nameText + '</td>' +
                    '<td id="td-birthday" rel="' + user[userId].birthday + '">' + birthdayText + '</td>' +
                    '<td>' +
                        '<button type="submit" id="update" class="btn">update</button>';
            if (1 === role && user[userId].email !== email) {
                appendStr +=
                        '<button type="submit" id="remove" class="btn btn-danger">remove</button>' +
                    '</td>' +
                '</tr>';
            };
            $('#userInfo').append(appendStr);
            $('#user-table').removeClass('d-none');
            $('#back').addClass('d-none');
            if (1 === role) {
                $('#back').removeClass('d-none');
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    function updateUser () {
        $('#name').val('');
        $('#birthday').val('');

        let userId = $(this).parent().parent().attr('rel');
        let email = $(this).parent().parent().find('#td-email').attr('rel');
        let name = $(this).parent().parent().find('#td-name').attr('rel');
        let birthday = $(this).parent().parent().find('#td-birthday').attr('rel');

        userData.email = email;
        $('#email').text(email);

        $('#submit').attr('rel', userId);

        if (name) {
            $('#name').val(name);
        }

        if(birthday) {
            $('#birthday').val(birthday);
        }

        $('#insert-form').removeClass('d-none');
        $('#back').removeClass('d-none');
        $('#submit').removeClass('d-none');
        $('#user-table').addClass('d-none');
        $('#userInfo').empty();
    }

    function removeUser () {
        let userId = $(this).parent().parent().attr('rel');
        let ok = confirm('是否要刪除?');
        if(ok) {
            return api.user.remove(userId).then((resJson) => {
                $(this).parent().parent().remove();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    function signOut () {
        return firebase.auth().signOut().then(() => {
            window.localStorage.removeItem('jwt');
            window.location.replace('/');
        }).catch((error) => {
            console.log(error);
        })
    }

    function checkJwt (jwt) {
        if(!jwt) {
            window.location.replace('/');
        }
    }

    function backPage () {
        $('#insert-form').addClass('d-none');
        $('#back').addClass('d-none');
        $('#submit').addClass('d-none');
        findUser();
    }

    function greetingText() {
        let greeting = email + '，您好';
        $('#greeting').text(greeting);
    }
}());
