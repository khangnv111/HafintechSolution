window.Login = {
    confirmLogin: function () {
        var u = $('#txtUsername').val();
        var p = $('#txtPassword').val();
        if (u == '' || p == '') {
            $('#LoginError').html("Yêu cầu nhập tài khoản và mật khẩu!").show();
        }
        else {
            utils.Loading();
            $.ajax({
                type: 'POST',
				url: Config.API_Login + "oauth2/token",
                data: {
                    username: u,
                    password: MD5(p),
                    grant_type: "password",
                    type: 0,
                    ID: 0,
                    AccessToken: "",
                    //type:4
                },
                contentType: "application/x-www-form-urlencoded",
                dataType: "json",
                //processData: true,
                //crossDomain: true,
                //xhrFields: { withCredentials: true },
                //cache: false,
                success: function (data) {
                    //console.log(data);
                    utils.unLoading();
                    if (data != null && data != "") {
						if (parseInt(data.AccountID) > 0) {
							utils.Loading();

							$("#LoginError").html("Đăng nhập thành công").show();
							$("#LoginError").css("color", "blue");
							window.localStorage.setItem("token", data.access_token);
							Login.setAuthen(data.AccountID, data.AccountName, data.FullName, data.access_token, data.address);
                            //var verify = "VerifyEmailStatus:" + data.VerifyEmailStatus;
                            //utils.setCookie("verifyAcc", verify, 0.5);
                            //utils.setCookie("Type", data.Type, 0.5);
                        }
                        else {
                            $("#LoginError").html("Hệ thống bận, vui lòng quay lại sau!" + data.AccountID).show();
                            $('#txtPassword').focus();
                        }
                    }
                },
                error: function (data) {
                    $("#LoginError").html(data.responseJSON.error_description).show();
                    $('#txtPassword').focus();
                    utils.unLoading();
                }
            });
        }
    },

	setAuthen: function (AccountID, UserName, FullName, AccessToken, address) {
        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "Home/SetAuthen",
            data: JSON.stringify({
                "AccountID": AccountID,
                "UserName": UserName,
				"FullName": FullName,
				"Address": address,
                "AccessToken": AccessToken
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            success: function (dt) {
                utils.unLoading();

                if (dt) {
                    if (parseInt(dt) > 0) {
						window.location.href = Config.Url_Root + "setup-vnaccs";
                        //window.location.href = Config.Url_Root + "dashboard";
                    }
                    else {
                        $("#LoginError").html("Có lỗi xảy ra!").show();
                    }
                }
            },
            error: function (dt) {
                utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    ForgotPassword: function () {
        utils.Loading();

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
                utils.unLoading();
                utils.ShowOverLay();
                $("BODY").append('<div id="forGetPass">' + data + '</div>');
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    confirmForgotPassword: function () {
        var email = $('#txtEmailgetPass').val();
        if (email == '') {
            $('#ForgotError').html("Yêu cầu nhập mail!").show();
        }
        else {
            utils.Loading();
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
                    utils.unLoading();
                    if (data) {
                        if (data.ResponseCode > 0) {
                            utils.closeAll();
                            utils.Message("Mời bạn vào email lấy lại mật khẩu!");
                        }
                        else {
                            $('#ForgotError').html(data.Description).show();
                        }
                    }
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        }
	},

	LoginAgency: function () {
		var userName = $('#txtUsername').val();
		var pass = $('#txtPassword').val();
		if (!userName || !pass) {
			$('#LoginError').html("Yêu cầu nhập tài khoản và mật khẩu!").show();
		}
		else {
			utils.Loading();
			$.ajax({
				type: 'POST',
				url: Config.API_Login + "Agency/login",
				data: {
					username: userName,
					password: MD5(pass), 
				},
				contentType: "application/x-www-form-urlencoded",
				dataType: "json", 
				success: function (data) {
					//console.log(data);
					utils.unLoading();
					if (data.ResponseCode > 0) {
						utils.Loading();

						$("#LoginError").html("Đăng nhập thành công").show();
						$("#LoginError").css("color", "blue"); 

						Login.setAuthen(data.Data.AccountID, data.Data.AccountName, data.Data.FullName, data.Data.access_token, data.Data.UpdateStatus);
						var verify = "VerifyEmailStatus:" + data.Data.VerifyEmailStatus;
						//utils.setCookie("verifyAcc", verify, 0.5);
						//utils.setCookie("Type", data.Data.Type, 0.5);
					}
					else {
						$("#LoginError").html(data.Description).show(); 
					}
				},
				error: function (data) { 
					utils.unLoading();
					$("#LoginError").html("Hệ thống bận, vui lòng quay lại sau!").show();
					$('#txtPassword').focus(); 
				}
			});
		}
	},
};

window.Reg = {
    ShowRegister: function () {
        utils.Loading();
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
                utils.unLoading();
                utils.ShowOverLay();
                $("BODY").append('<div id="BoxRegister">' + data + '</div>');
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    confirmRegister: function () {
        var taxIdNumber = $('#CodeBusinessReg').val();
        var name = $('#NameBusinessReg').val();
        var passWord = $('#txtPasswordReg').val();
        var RepassWord = $('#txtRePassword').val();

        var address = $('#AddressBusiness').val();
        var legalRepre = $('#Representative').val();
        var zipCode = $('#CodeBC').val();
        var fax = $('#txtFac').val();
        var phoneNumber = $('#txtPhone').val();
        var email = $('#txtEmail').val();
        var isAgency = $("input[name=typeUser]:checked").val();

        if (taxIdNumber == null || taxIdNumber == "") {
            $("#RegisterError").html("Bạn chưa nhập mã doanh nghiệp");
            $("#RegisterError").show();
            return;
        }
        if (name == null || name == "") {
            $("#RegisterError").html("Bạn chưa nhập tên doanh nghiệp");
            $("#RegisterError").show();
            return;
        }
        if (passWord == null || passWord == "") {
            $("#RegisterError").html("Bạn chưa nhập mật khẩu");
            $("#RegisterError").show();
            return;
		}
		if (passWord.length < 8) {
			$("#RegisterError").html("Bạn phải nhập mật khẩu đủ từ 8 ký tự trở lên");
			$("#RegisterError").show();
			return;
		}
        if (RepassWord == null || RepassWord == "") {
            $("#RegisterError").html("Bạn chưa nhập lại mật khẩu");
            $("#RegisterError").show();
            return;
        }
        if (phoneNumber == null || phoneNumber == "") {
            $("#RegisterError").html("Bạn chưa nhập số điện thoại");
            $("#RegisterError").show();
            return;
        }
        if (email == null || email == "") {
            $("#RegisterError").html("Bạn chưa nhập email");
            $("#RegisterError").show();
            return;
		}
		email = email.trim();

        if (passWord != RepassWord) {
            $("#RegisterError").html("Mật khẩu nhập lại không trùng khớp");
            $("#RegisterError").show();
            return;
        }

        if (!Vali.validateEmail(email)) {
            $("#RegisterError").html("Email không tồn tại");
            $("#RegisterError").show();
            return;
        }

        if (!isAgency) {
            $("#RegisterError").html("Bạn chưa chọn đối tượng sử dụng");
            $("#RegisterError").show();
            return;
        }

        utils.Loading();
        if (isAgency == 2) {
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Agency/Create",
                data: JSON.stringify({
                    "taxIdNumber": taxIdNumber,
                    "name": name,
                    "passWord": MD5(passWord),
                    "address": address,
                    "legalRepre": legalRepre,
                    "zipCode": zipCode,
                    "fax": fax,
                    "phoneNumber": phoneNumber,
                    "email": email,
                    "isAgency": isAgency,
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //processData: true,
                //crossDomain: true,
                //xhrFields: { withCredentials: true },
                //cache: false,
                success: function (data) {
                    console.log(data);
                    utils.unLoading();

                    if (data.ResponseCode > 0) {
                        utils.closeAll();
                        utils.Message("Chúc mừng bạn đã đăng ký thành công. Bạn vui lòng vào Email đã đăng ký trên hệ thống để kích hoạt tài khoản");
                    }
                    else {
                        $('#RegisterError').html(data.Description).show();
                    }
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        }
        else if (isAgency == 1) {
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Business/Create",
                data: JSON.stringify({
                    "taxIdNumber": taxIdNumber,
                    "name": name,
                    "passWord": MD5(passWord),
                    "address": address,
                    "legalRepre": legalRepre,
                    "zipCode": zipCode,
                    "fax": fax,
                    "phoneNumber": phoneNumber,
                    "email": email,
                    "isAgency": isAgency,
                }),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                //processData: true,
                //crossDomain: true,
                //xhrFields: { withCredentials: true },
                //cache: false,
                success: function (data) {
                    console.log(data);
                    utils.unLoading();

                    if (data.ResponseCode > 0) {
                        utils.closeAll();
                        utils.Message("Chúc mừng bạn đã đăng ký thành công. Bạn vui lòng vào Email đã đăng ký trên hệ thống để kích hoạt tài khoản");
                    }
                    else {
                        $('#RegisterError').html(data.Description).show();
                    }
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
		}
		else if (isAgency == 3) {
			$.ajax({
				type: 'POST',
				url: Config.API_Login + "Agency/ScannerCreateAcc",
				data: JSON.stringify({
					"taxIdNumber": taxIdNumber,
					"name": name,
					"passWord": MD5(passWord),
					"address": address,
					"legalRepre": legalRepre,
					"zipCode": zipCode,
					"fax": fax,
					"phoneNumber": phoneNumber,
					"email": email, 
				}),
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				//processData: true,
				//crossDomain: true,
				//xhrFields: { withCredentials: true },
				//cache: false,
				success: function (data) {
					console.log(data);
					utils.unLoading();

					if (data.ResponseCode > 0) {
						utils.closeAll();
						utils.Message("Chúc mừng bạn đã đăng ký thành công. Bạn vui lòng vào Email đã đăng ký trên hệ thống để kích hoạt tài khoản");
					}
					else {
						$('#RegisterError').html(data.Description).show();
					}
				},
				error: function (data) {
					utils.Message("Hệ thống bận, vui lòng quay lại sau!");
					utils.unLoading();
				}
			});
		}
    },

    ShowOTP: function () {
        utils.Loading();
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
                utils.unLoading();

                $("BODY").append('<div id="popOTP">' + data + '</div>');
                utils.ShowOverLay();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    confirmOTP: function () {
        var token = $('#hdfToken').val();
        var txtOTP = $('#txtOTP').val();
        if (txtOTP == '') {
            $('#OTPError').html("Yêu cầu nhập đủ thông tin OTP!").show();
        }
        else {
            utils.Loading();
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
                success: function (data) {
                    utils.unLoading();

                    if (data.ResponseCode > 0) {
                        utils.Message("Xác thực tài khoản thành công!");
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                    else {
                        $('#OTPError').html(data.Description).show();
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        }
    }
};