(function () {
    var api = window.restfulAPI;

    let memberData = {};

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
                '<tr id="tr-user_id" rel="' + user.user_id + '">' +
                    '<td id="td-email" rel="' + user.e_mail + '">' + user.e_mail + '</td>' +
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

    function insertMember () {
        let name = $('#name').val();
        let birthday = $('#birthday').val();

        memberData.name = name;
        memberData.birthday = birthday;

        return api.member.insert(userId, memberData).then((resJson) => {
            let user = resJson.data;
            $('#name').val(user[userId].name);
            $('#birthday').val(user[userId].birthday);
            $('#insert-form').addClass('d-none');
            let name = user[userId].name ? user[userId].name : '未填寫';
            let birthday = user[userId].birthday ? user[userId].birthday : '未填寫';
            let appendStr =
                '<tr id="tr-user_id" rel="' + user[userId].user_id + '">' +
                    '<td id="td-email">' + user[userId].e_mail + '</td>' +
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

    function updateMember () {
        let user_id = $('#tr-user_id').attr('rel');
        let e_mail = $('#td-email').attr('rel');

        memberData.user_id = user_id ;
        memberData.e_mail = e_mail;

        $('#insert-form').removeClass('d-none');
        $('#user-table').addClass('d-none');
        $('#userInfo').empty();
    }

    function deleteMember () {

    }
}());
