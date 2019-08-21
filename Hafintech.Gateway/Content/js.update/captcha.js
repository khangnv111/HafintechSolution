(function () {
    window.captcha = {};

    captcha.Login = function () {
        $("#LoginCaptchaShow").show();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "captcha/get?length=3&width=70&height=26",
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (json) {
                $("#LoginCaptcha").attr("src", "data:image/jpeg;base64," + json[1] + "");
                $("#LoginVerify").val(json[0]);
            }
        });
    };

    $(document).ready(function () {

    });
})();