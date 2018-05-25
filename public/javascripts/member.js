(function () {
    var api = window.restfulAPI;

    var userId;
    try {
        var payload = window.jwt_decode(window.localStorage.getItem('jwt'));
        userId = payload.uid;
    } catch (ex) {
        userId = '';
    }

    $(document).on('click', '#submit', insertMember);
    $(document).on('click', '#update', updateMember);
    $(document).on('click', '#delete', deleteMember);

    return api.member.find(userId).then((resJson) => {
        $('#insert-form').addClass('d-none');
        $('#userInfo').empty();
        let users = resJson.data;
        for(let userId in users) {
            let user = users[userId];
            let name = user.name ? user.name : '未填寫';
            let birthday = user.birthday ? user.birthday : '未填寫';
            let elementStr =
                '<tr data-userId="' + user.user_id + '">' +
                    '<td id="email">' + user.e_mail + '</td>' +
                    '<td id="name">' + name + '</td>' +
                    '<td id="birthday">' + birthday + '</td>' +
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

    function insertMember () {
        let name = $('#name').val();
        let birthday = $('#birthday').val();

        let memberData = {
            name: name,
            birthday: birthday
        }

        return api.member.insert(userId, memberData).then((resJson) => {
            let user = resJson.data;
            $('#name').val(user[userId].name);
            $('#birthday').val(user[userId].birthday);
            $('#insert-form').addClass('d-none');
            let appendStr =
                '<tr data-userId="' + user[userId].user_id + '" data-email="' + user[userId].e_mail + '">' +
                    '<td>' + user[userId].name ? user[userId].name : '未填寫' + '</td>' +
                    '<td>' + user[userId].birthday ? user[userId].birthday : '未填寫' + '</td>' +
                    '<td>' +
                        '<button type="submit" id="update" class="btn">update</button>' +
                        '<button type="submit" id="delete" class="btn btn-danger">delete</button>' +
                    '</td>' +
                '</tr>';
            $('#userInfo').append(appendStr);
        }).catch((error) => {
            console.log(error);
        })
    }

    function updateMember () {
        $('#insert-form').removeClass('d-none');
        $('#user-table').addClass('d-none');
        $('#userInfo').empty();
    }

    function deleteMember () {

    }
}());
