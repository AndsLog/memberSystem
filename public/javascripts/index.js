return function () {
    $(documnet).on(click, getValue);

    function getValue(){
        let eMail = $('#e-mail').val();
        let password = $('#password').val();
        console.log("e-mail:" + eMail + " password:" + password);
    }
}