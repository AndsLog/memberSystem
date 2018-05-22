// return function () {
// }

$(document).ready(function() {
    $(document).on(click, '#submit', getValue);
});

function getValue(){
    let eMail = $('#e-mail').val();
    let password = $('#password').val();
    console.log("e-mail:" + eMail + " password:" + password);
}