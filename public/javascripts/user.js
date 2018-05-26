(function () {
    var api = window.restfulAPI;

    let userData = {};

    var userId;
    try {
        var payload = window.jwt_decode(window.localStorage.getItem('jwt'));
        userId = payload.uid;
    } catch (ex) {
        userId = '';
    }

    $(document).on('click', '#submit', insertUser);
    $(document).on('click', '#update', updateUser);
    $(document).on('click', '#delete', deleteUser);

    return api.user.find(userId).then((resJson) => {
        $('#insert-form').addClass('d-none');
        $('#userInfo').empty();
        let users = resJson.data;
        for(let userId in users) {
            let user = users[userId];
            let name = user.name ? user.name : '未填寫';
            let birthday = user.birthday ? user.birthday : '未填寫';
            let elementStr =
                '<tr>' +
                    '<td id="td-email" rel="' + user.email + '">' + user.email + '</td>' +
                    '<td id="td-name" rel="' + name + '">' + name + '</td>' +
                    '<td id="td-birthday" rel="' + birthday + '">' + birthday + '</td>' +
                    '<td>' +
                        '<button type="submit" id="update" class="btn">update</button>' +
                        '<button type="submit" id="delete" class="btn btn-danger">delete</button>' +
                    '</td>' +
                '</tr>';
            $('#userInfo').append(elementStr);
        }
    }).catch((error) => {
        console.log(error);
    });

    function insertUser () {
        let name = $('#name').val();
        let birthday = $('#birthday').val();

        userData.name = name;
        userData.birthday = birthday;

        return api.user.insert(userId, userData).then((resJson) => {
            let user = resJson.data;
            $('#name').val(user[userId].name);
            $('#birthday').val(user[userId].birthday);
            $('#insert-form').addClass('d-none');
            let name = user[userId].name ? user[userId].name : '未填寫';
            let birthday = user[userId].birthday ? user[userId].birthday : '未填寫';
            let appendStr =
                '<tr>' +
                    '<td id="td-email">' + user[userId].email + '</td>' +
                    '<td id="td-name" rel="' + name + '">' + name + '</td>' +
                    '<td id="td-birthday" rel="' + birthday + '">' + birthday + '</td>' +
                    '<td>' +
                        '<button type="submit" id="update" class="btn">update</button>' +
                        '<button type="submit" id="delete" class="btn btn-danger">delete</button>' +
                    '</td>' +
                '</tr>';
            $('#userInfo').append(appendStr);
            $('#user-table').removeClass('d-none');
        }).catch((error) => {
            console.log(error);
        })
    }

    function updateUser () {
        let email = $('#td-email').attr('rel');

        userData.email = email;

        $('#insert-form').removeClass('d-none');
        $('#user-table').addClass('d-none');
        $('#userInfo').empty();
    }

    function deleteUser () {

    }
}());
