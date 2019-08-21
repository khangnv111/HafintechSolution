var _dataMethodCode = "";
(function () {
    window.accounts = {};

    accounts.ShowOTP = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/OTP",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.confirmOTP = function () {
        var token = $('#hdfToken').val();
        var txtOTP = $('#txtOTP').val();
        if (txtOTP == '') {
            $('#OTPError').html("Yêu cầu nhập đủ thông tin OTP!").show();
        }
        else {
            accounts.ShowLoading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "account/verify",
                data: JSON.stringify({
                    "otp": txtOTP
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //processData: true,
                //crossDomain: true,
                //xhrFields: { withCredentials: true },
                //cache: false,
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            accounts.Message("Xác thực tài khoản thành công!");
                            setTimeout(function () {
                                location.reload();
                            }, 3000);
                        }
                        else {
                            $('#OTPError').html(data.Description).show();
                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        }
    };

    accounts.InfoAuthentication = function (type) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getotp",
            data: {
                type: type
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //processData: true,
            //crossDomain: true,
            //xhrFields: { withCredentials: true },
            //cache: false,
            success: function (data) {
                if (data) {
                    debugger;
                    if (data.ResponseCode > 0)
                        accounts.ShowOTP();
                    else
                        accounts.Message(data.Description);
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.ShowChangePassWord = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/ChangePassword",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.confirmChangePassWord = function () {
        var token = $('#hdfToken').val();
        var txtPasswordOld = $('#txtPasswordOld').val();
        var txtPasswordNew = $('#txtPasswordNew').val();
        var txtRePasswordNew = $('#txtRePasswordNew').val();
        if (txtPasswordOld == '' || txtPasswordNew == '' || txtRePasswordNew == '') {
            $('#ChangeError').html("Yêu cầu nhập đủ thông tin!").show();
        }
        else if (txtPasswordNew != txtRePasswordNew) {
            $('#ChangeError').html("Nhập lại mật khẩu mới không khớp!").show();
        }
        else {
            accounts.ShowLoading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "account/changepassword",
                data: JSON.stringify({
                    "OldPassword": MD5(txtPasswordOld),
                    "Password": MD5(txtPasswordNew)
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            accounts.Message("Đổi mật khẩu thành công!");
                        }
                        else {
                            $('#ChangeError').html(data.Description).show();
                        }
                    }
                    accounts.Unloading();
                },
                error: function (err) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        }
    };

    //<<---Đăng nhập

    accounts.ShowLogin = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/Login",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.confirmLogin = function () {
        var flag = false;
        var u = $('#txtUsername').val();
        var p = $('#txtPassword').val();
        if (u == '' || p == '') {
            $('#LoginError').html("Yêu cầu nhập tài khoản và mật khẩu!").show();
        }
        else {
            accounts.ShowLoading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "oauth2/token",
                data: {
                    username: u,
                    password: MD5(p),
                    grant_type: "password",
                    type: 0,
                    ID: 0,
                    AccessToken: ""
                },
                contentType: "application/x-www-form-urlencoded",
                //dataType: "json",
                //processData: true,
                //crossDomain: true,
                //xhrFields: { withCredentials: true },
                //cache: false,
                success: function (data) {
                    if (data) {
                        if (parseInt(data.AccountID) > 0) {
                            accounts.setAuthen(data.AccountID, data.AccountName, data.FullName, data.access_token, data.UpdateStatus);
                        }
                        else {
                            $("#LoginError").html("Hệ thống bận, vui lòng quay lại sau!" + data.AccountID).show();
                            $('#txtPassword').focus();
                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    $("#LoginError").html(data.responseJSON.error_description).show();
                    $('#txtPassword').focus();
                    accounts.Unloading();
                }
            });
        }
    };

    accounts.setAuthen = function (AccountID, UserName, FullName, AccessToken, UpdateStatus) {
        accounts.ShowLoading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "Home/SetAuthen",
            data: JSON.stringify({
                "AccountID": AccountID,
                "UserName": UserName,
                "FullName": FullName,
                "AccessToken": AccessToken
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (dt) {
                if (dt) {
                    if (parseInt(dt) > 0) {
                        window.location.href = Config.Url_Root + "home/UpdateInfo";
                    }
                    else {
                        $("#LoginError").html("Set Authen lỗi!").show();
                    }
                }
                accounts.Unloading();
            },
            error: function (dt) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //>>---Đăng nhập

    accounts.ShowForgotPassword = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/ForgotPassword",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.ShowUpdateInfo = function (info) {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/UpdateInfo_Part",
            data: info,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    $('#divContent_update').html(data);
                    accounts.GetListProvince();
                    if (info.vrfEmailStatus == 0) {
                        $('#btnVerifyEmail').show();
                        accounts.ShowAccuracyGuide();
                    }
                    if (info.vrfMobiStatus == 0) {
                        $('#btnVerifyMobile').show();
                        accounts.ShowAccuracyGuide();
                    }
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.ShowAccuracyGuide = function (info) {
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/AccuracyGuide",
            data: info,
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data != "" && data != null) {
                    accounts.ShowPopup(data, 650, 1000);
                }
            },
            error: function (data) {
            }
        });
    };

    accounts.GetAccountInfo = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getinfo",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    console.log(data);
                    if (data.ResponseCode > 0) {
                        accounts.ShowUpdateInfo(data.Data.Accounts);
                    }
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.UpdatePhoneAndMail = function () {
        var token = $('#hdfToken').val();
        var txtEmail = $('#txtEmail').val();
        var txtMobile = $('#txtMobile').val();
        var txtPassword = $('#txtPassword').val();
        if (txtEmail == '' || txtMobile == '' || txtPassword == '') {
            $('#Update1Error').html("Yêu cầu nhập đủ thông tin Email, Số ĐT, Mật khẩu!").show();
        }
        else {
            accounts.ShowLoading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "account/updateemail",
                data: JSON.stringify({
                    "UserName": txtEmail,
                    "Password": MD5(txtPassword),
                    "Mobile": txtMobile
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        console.log(data);
                        if (data.ResponseCode > 0) {
                            location.reload();
                        }
                        else {
                            $('#Update1Error').html(data.Description).show();
                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        }
    };

    //<<---Đăng ký

    accounts.ShowRegister = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/Register",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                    //accounts.GetListProvince();
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.confirmRegister = function () {
        var name = $('#txtFullName').val();
        var email = $('#txtEmail').val();
        var phone = $('#txtPhone').val();
        var pass = $('#txtPass').val();
        if (name == '' || email == '' || phone == '' || pass == '') {
            $('#RegisterError').html("Yêu cầu nhập đầy đủ thông tin (*)!").show();
        }
        else {
            accounts.ShowLoading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "auth/register",
                data: JSON.stringify({
                    "FullName": name,
                    "UserName": email,
                    "Mobile": phone,
                    "Password": MD5(pass),
                    "Address": "",
                    "CommuneCode": "",
                    "DistrictCode": "",
                    "ProvinceCode": "",
                    "TaxCode": ""
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //processData: true,
                //crossDomain: true,
                //xhrFields: { withCredentials: true },
                //cache: false,
                success: function (data) {
                    console.log(data);
                    if (data) {
                        if (data.ResponseCode > 0) {
                            accounts.ClosePopup();
                            accounts.Message("Chúc mừng bạn đã đăng ký tài khoản thành công!");
                        }
                        else {
                            $('#RegisterError').html(data.Description).show();
                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        }
    };

    accounts.showPassRegister = function () {
        var a = document.getElementById("txtPass");
        var b = document.getElementById("EYE");
        if (a.type == "password") {
            a.type = "text";
            b.src = "https://i.stack.imgur.com/waw4z.png";
        }
        else {
            a.type = "password";
            b.src = "https://i.stack.imgur.com/Oyk1g.png";
        }
    };

    //>>---Đăng ký

    accounts.confirmUpdateInfo = function () {
        var token = $('#hdfToken').val();
        $('#hdfPassportImgPath').val($('#filePassportImgPath').val());
        $('#hdfIdentityImgPath1').val($('#fileIdentityImgPath1').val());
        $('#hdfIdentityImgPath2').val($('#fileIdentityImgPath2').val());
        //var name = $('#txtFullName').val();
        //var txtDay = $('#txtDay').val();
        //var slMonth = $('#slMonth').val();
        //var txtYear = $('#txtYear').val();
        //var slGt = $('#slGt').val();
        //var txtIdentity = $('#txtIdentity').val();
        //var repass = $('#txtRePass').val();

        //if (name == '' || email == '' || phone == '' || pass == '' || repass == '') {
        //    $('#LoginError').html("Yêu cầu nhập đầy đủ thông tin (*)!").show();
        //}
        //else if (pass != repass) {
        //    $('#LoginError').html("Hai mật khẩu không trùng nhau!").show();
        //}
        //else {
        //    $.ajax({
        //        type: 'POST',
        //        url: Config.API_Login + "account/update",
        //        data: JSON.stringify({
        //            "UserName": txtEmail,
        //            "Password": MD5(txtPassword),
        //            "Mobile": txtMobile
        //        }),
        //        headers: {
        //            "Authorization": "Bearer " + token
        //        },
        //        contentType: "application/json; charset=utf-8",
        //        dataType: "json",
        //        processData: true,
        //        crossDomain: true,
        //        xhrFields: { withCredentials: true },
        //        cache: false,
        //        success: function (data) {
        //            if (data) {
        //                accounts.Message(data);
        //            }
        //        },
        //        error: function (data) {
        //            accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
        //            return;
        //        }
        //    });
        //}
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "account/update",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        accounts.Message("Cập nhật thông tin thành công!");
                        accounts.GetAccountInfo();
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    accounts.confirmForgotPassword = function () {
        var email = $('#txtEmailgetPass').val();
        if (email == '') {
            $('#ForgotError').html("Yêu cầu nhập mail!").show();
        }
        else {
            accounts.ShowLoading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "mail/forgotpassword",
                data: JSON.stringify({
                    "Email": email
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //processData: true,
                //crossDomain: true,
                //xhrFields: { withCredentials: true },
                //cache: false,
                success: function (data) {
                    debugger;
                    console.log(data);
                    if (data) {
                        if (data.ResponseCode > 0) {
                            accounts.Message("Mời bạn vào email lấy lại mật khẩu!");
                        }
                        else {
                            $('#ForgotError').html(data.Description).show();
                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                    return;
                }
            });
        }
    };

    accounts.Message = function (msg) {
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/Message",
            data: {
                msg: msg
            },
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Lấy danh sách Tỉnh thành
    accounts.GetListProvince = function () {
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "service/getlistprovince",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slTinhThanh').append($('<option/>', {
                            value: value.ProvinceCode,
                            text: value.ProvinceName
                        }));
                    });
                    var hdfProvinceCode = $('#hdfProvinceCode').val();
                    if (hdfProvinceCode != "") {
                        $('#slTinhThanh').val(hdfProvinceCode);
                        accounts.GetListDistrict();
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Lấy danh sách Quận huyện
    accounts.GetListDistrict = function () {
        var tt = $('#slTinhThanh').val();
        if (tt != 0) {
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "service/GetListDistrict",
                data: {
                    provinceCode: tt
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        $('#slQuanHuyen').html("");
                        $('#slQuanHuyen').append($('<option/>', {
                            value: 0,
                            text: "--Chọn Quận / Huyện--"
                        }));
                        $.each(data, function (index, value) {
                            $('#slQuanHuyen').append($('<option/>', {
                                value: value.DistrictCode,
                                text: value.DistrictName
                            }));
                        });
                        //$('#divQuanHuyen').show();
                        var hdfDistrictCode = $('#hdfDistrictCode').val();
                        if (hdfDistrictCode != "") {
                            $('#slQuanHuyen').val(hdfDistrictCode);
                            accounts.GetListCommune();
                        }
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }
        else {
            //$('#slQuanHuyen,#slPhuongXa').html("");
            //$('#divQuanHuyen,#divPhuongXa').hide();
            $('#slQuanHuyen').append($('<option/>', {
                value: "0",
                text: "--Chọn Quận / Huyện--"
            }));
        }
    };

    //Lấy danh sách phường xã
    accounts.GetListCommune = function () {
        var qh = $('#slQuanHuyen').val();
        if (qh != 0 && qh != undefined && qh != null) {
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "service/GetListCommune",
                data: {
                    districtCode: qh
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        $('#slPhuongXa').html("");
                        $('#slPhuongXa').append($('<option/>', {
                            value: 0,
                            text: "--Chọn Phường / Xã--"
                        }));
                        $.each(data, function (index, value) {
                            $('#slPhuongXa').append($('<option/>', {
                                value: value.CommuneCode,
                                text: value.CommuneName
                            }));
                        });
                        //$('#divPhuongXa').show();
                        var hdfCommuneCode = $('#hdfCommuneCode').val();
                        $('#slPhuongXa').val(hdfCommuneCode);
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }
        //else {
        //    $('#slPhuongXa').html("");
        //    $('#divPhuongXa').hide();
        //}
    };

    accounts.Logout = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "Home/Logout",
            data: {},
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                location.href = Config.Url_Root + 'home/login';
            },
            error: function (data) {
                return;
            }
        });
    };

    accounts.ShowPopup = function (html, widthPopup, heightPopup) {
        accounts.ClosePopup();
        if ($('#popupwrap').length <= 0) {
            $('body').append('<div id="popupwrap"></div>');
            $('body').append('<div id="overlayPopup" style="position: fixed;z-index: 1200;top: 0;left: 0;width: 100%;height: 100%;display: block;opacity: .80;background: rgb(48, 45, 45);filter: alpha(opacity=60);-moz-opacity: 0.8;"></div>');
            $("#popupwrap").html(html);
            $('#popupwrap').css('left', "50%");
            $('#popupwrap').css("top", "50%");
            $('#popupwrap').css('z-index', 9999);
            $('#popupwrap').css('position', 'fixed');
            $('#overlayPopup').css('height', "100%");
            $('#overlayPopup').unbind("click");
            $("#overlayPopup").bind("click", function () {
                //accounts.ClosePopup();
            });
            $("#TopMostPopUp").css("z-index", 9999);
            $('#popupwrap').css('margin-left', -$("#popupwrap").width() / 2);
            $('#popupwrap').css("margin-top", -$("#popupwrap").height() / 2);
        }
    };

    accounts.ShowPopup2 = function (html, widthPopup, heightPopup) {
        //accounts.ClosePopup();
        if ($('#popupwrap2').length <= 0) {
            $('body').append('<div id="popupwrap2"></div>');
            //$('body').append('<div id="overlayPopup2" style="position: fixed;z-index: 1200;top: 0;left: 0;width: 100%;height: 100%;display: block;opacity: .80;background: rgb(48, 45, 45);filter: alpha(opacity=60);-moz-opacity: 0.8;"></div>');
            $("#popupwrap2").html(html);
            $('#popupwrap2').css('left', "50%");
            $('#popupwrap2').css("top", "50%");
            $('#popupwrap2').css('z-index', 9999);
            $('#popupwrap2').css('position', 'fixed');
            //accounts.ClosePopup();
            $('#popupwrap2').css('margin-left', -$("#popupwrap2").width() / 2);
            $('#popupwrap2').css("margin-top", -$("#popupwrap2").height() / 2);
            //$('#popupwrap2').css('border', 9999);
            $("#popupwrap2").css('border', '1pt solid lightgray');
        }
    };
    accounts.ShowPopup3 = function (html, widthPopup, heightPopup) {
        //accounts.ClosePopup();
        if ($('#popupwrap3').length <= 0) {
            $('body').append('<div id="popupwrap3"></div>');
            //$('body').append('<div id="overlayPopup2" style="position: fixed;z-index: 1200;top: 0;left: 0;width: 100%;height: 100%;display: block;opacity: .80;background: rgb(48, 45, 45);filter: alpha(opacity=60);-moz-opacity: 0.8;"></div>');
            $("#popupwrap3").html(html);
            $('#popupwrap3').css('left', "50%");
            $('#popupwrap3').css("top", "50%");
            $('#popupwrap3').css('z-index', 9999);
            $('#popupwrap3').css('position', 'fixed');
            //accounts.ClosePopup();
            $('#popupwrap3').css('margin-left', -$("#popupwrap3").width() / 2);
            $('#popupwrap3').css("margin-top", -$("#popupwrap3").height() / 2);
            //$('#popupwrap2').css('border', 9999);
            $("#popupwrap3").css('border', '1pt solid lightgray');
        }
    };

    accounts.ShowPopupAdd = function (html, widthPopup, heightPopup) {
        accounts.ClosePopup();
        if ($('#popupwrap').length <= 0) {
            $('body').append('<div id="popupwrap"></div>');
            $('body').append('<div id="overlayPopup" style="position: fixed;z-index: 1200;top: 0;left: 0;width: 100%;height: 100%;display: block;opacity: .80;background: rgb(48, 45, 45);filter: alpha(opacity=60);-moz-opacity: 0.8;"></div>');
            $("#popupwrap").html(html);
            $('#popupwrap').css('left', "50%");
            $('#popupwrap').css("top", "50%");
            $('#popupwrap').css('z-index', 9999);
            $('#popupwrap').css('position', 'fixed');
            $('#overlayPopup').css('height', "100%");
            $('#overlayPopup').unbind("click");
            $("#overlayPopup").bind("click", function () {
                //accounts.ClosePopup();
            });
            $("#TopMostPopUp").css("z-index", 9999);
            $('#popupwrap').css('margin-left', -$("#popupwrap").width() / 2);
            $('#popupwrap').css("margin-top", -$("#popupwrap").height() / 2);
            $("div[id='popupwrap']").css("margin-top", "-600px");
        }
    };

    accounts.ShowOverLay = function () {
        $('body').append('<div id="overlayPopup" style="position: fixed;z-index: 99;top: 0;left: 0;width: 100%;height: 100%;display: block;opacity: .80;background: rgb(48, 45, 45);filter: alpha(opacity=60);-moz-opacity: 0.8;"></div>');
    };

    accounts.ClosePopup = function () {
        $("#popupwrap").remove();
        $('#overlayPopup').remove();
    };

    accounts.ClosePopupHH = function () {
        $("#popupwrap2").remove();
        //$('#overlayPopup2').remove();
    };
    accounts.ClosePopupTax = function () {
        $("#popupwrap3").remove();
        //$('#overlayPopup2').remove();
    };

    accounts.ShowLoading = function () {
        this.Unloading();
        var html = '<div  id="LoadingOverlay"></div><div id="LoadingContainer"><div  id="Loading" style="display: none; text-align: center; overflow-y: none; vertical-align: middle;"><div class="loader" style="margin: auto auto"><img style="width: 100px; margin-left:-50%" src="' + Config.Url_Root + 'content/img/loading.gif" /></div></div>';
        html += '<style> #Loading{	width: 300px;	height: 300px;	z-index: 10000;	position: fixed;	padding: 5px;}#LoadingOverlay{	-moz-opacity: 0.8;	opacity: .80;	filter: alpha(opacity=80);	position: fixed;	z-index: 10000;	top: 0;	left: 0;	width: 100%;	height: 100%;	display: none;	background-color: #000;}</style></div>';
        $('body').append(html);
        //$('#Loading');
        $('#LoadingOverlay').show();
        $('#Loading').css('width', 100);
        $('#Loading').css('height', 100);
        $('#Loading').css('left', "50%");
        $('#Loading').css('top', "50%");
        $('#Loading').css('z-index', '10005');
        $('#Loading').show();
        $('#LoadingOverlay').css('height', "100%");
    };

    accounts.Unloading = function () {
        $('#LoadingContainer').remove();
        $('#LoadingOverlay').remove();
    };

    //<<---Login Facebook

    var FBInfo = {
        accessToken: '',
        id: '',
        name: '',
        email: ''
    };
    accounts.loginFacebook = function () {
        var self = this;
        FB.login(function (response) {
            self.fbCallback(response);
        }, { scope: 'email,public_profile' });
    }

    accounts.fbCallback = function (response) {
        var self = this;
        console.log(response);
        // The response object is returned with a status field that lets the
        // app know the current login status of the person.
        // Full docs on the response object can be found in the documentation
        // for FB.getLoginStatus().
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            FBInfo.accessToken = response.authResponse.accessToken;
            FBInfo.id = response.authResponse.userID;
            console.log('Welcome!  Fetching your information.... ');
            this.getFBInfomation(function () {
                var data = {
                    AccessToken: FBInfo.accessToken,
                    ID: FBInfo.id,
                    UserName: FBInfo.name,
                    Email: FBInfo.email,
                    Type: 1,
                    grant_type: "password"
                };
                accounts.ShowLoading();
                $.ajax({
                    url: Config.API_Login + "oauth2/token",
                    data: data,
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    // crossDomain: true,
                    cache: false,
                    //xhrFields: {
                    //    withCredentials: true
                    //},
                    success: function (result) {
                        accounts.setAuthen(result.AccountID, result.AccountName, result.FullName, result.access_token, result.UpdateStatus);
                        accounts.Unloading();
                    },
                    error: function () {
                        console.log('Đăng ký không thành công');
                    }
                });
            });
        } else if (response.status === 'not_authorized') {
            // The person is logged into Facebook, but not your app.
            console.log('The person is logged into Facebook, but not your app.');
        } else {
            console.log("Thông báo", "Bạn chưa đăng nhập facebook");
        }
    }

    accounts.getFBInfomation = function (callback) {
        var self = this;
        FB.api('/me', { fields: 'id,name,email' }, function (response) {
            console.log(response);
            if (!response) {
                console.log("Đăng nhập không thành công, mời bạn thử lại");
                return;
            }
            FBInfo.name = response.name;
            FBInfo.email = response.email;
            if (callback) callback();
        });
    }

    //>>---Login Facebook

    //<<---Login Google
    accounts.loginGmail = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signIn().then(function (data) {
            console.log(data.El);
            var data = {
                AccessToken: data.Zi.access_token,
                ID: data.El,
                UserName: "",
                Email: "",
                Type: 2,
                grant_type: "password"
            };
            accounts.ShowLoading();
            $.ajax({
                url: Config.API_Login + "oauth2/token",
                data: data,
                type: "POST",
                contentType: "application/x-www-form-urlencoded",
                // crossDomain: true,
                cache: false,
                //xhrFields: {
                //    withCredentials: true
                //},
                success: function (result) {
                    accounts.setAuthen(result.AccountID, result.AccountName, result.FullName, result.access_token, result.UpdateStatus);
                },
                error: function () {
                    console.log('Đăng ký không thành công');
                }
            });
        });
    };
    //>>---Login Google
})();

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_LA/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function () {
    FB.init({
        appId: "126980301509921",
        cookie: true,  // enable cookies to innerHTMLallow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.8' // use graph api version 2.8
    });
    if (window.name === '') return;
};

function signIn() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signIn().then(function (data) {
        console.log(data);
    });
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}