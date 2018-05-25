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
            let appendStr =
            '<tr data-userId="' + user.user_id + '" data-email="' + user.e_mail + '">'+
                '<td >' + user.name + '</td>'+
                '<td >' + user.birthday + '</td>'+
            '</tr>'+ 
            '<button type="submit" id="update" class="btn">update</button>'+
            '<button type="submit" id="delete" class="btn btn-danger">delete</button>';
            $('#userInfo').append(appendStr);
        }
    }).catch((error) => {
        console.log(error);
    })

    function insertMember() {
        let name = $('#name').val();
        let birthday = $('#birthday').val();

        let memberData = {
            name: name,
            birthday: birthday
        }

        return api.member.insert(userId, memberData).then((resJson) => {
            $('#name').val(resJson.name);
            $('#birthday').val(resJson.birthday);
            $('#insert-form').addClass('d-none');
            let appendStr = 
                '<tr>'+
                    '<td >' + resJson.name + '</td>'+
                    '<td >' + resJson.birthday + '</td>'+
                '</tr>'+ 
                '<button type="submit" id="update" class="btn">update</button>'+
                '<button type="submit" id="delete" class="btn btn-danger">delete</button>';;
            $('#userInfo').append(appendStr);
        }).catch((error) => {
            console.log(error);
        })
    }

    function updateMember() {
        $('#insert-form').removeClass('d-none');
        $('#userInfo').empty();
    }

    function deleteMember() {
        
    }
}());