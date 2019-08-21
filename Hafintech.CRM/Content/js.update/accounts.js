(function () {
    window.accounts = {};

    accounts.GetAccountInfo = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "cms/GetInfo?accountID=" + $('#hdfUID').val(),
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    if (data.ResponseCode > 0) {
                        var dt = data.Data;
                        console.log(dt);
                        $('#spID').text(dt.AccountID);
                        $('#spCreatedDate').text(accounts.formDateTime2(dt.CreatedDate));
                        $('#spEmail').text(dt.UserName);
                        $('#spPhone').text(dt.Mobile);
                        $('#fullname').text(dt.FullName);
                        $('#Birthday').text(accounts.formDateTime2(dt.Birthday));
                        $('#Gender').text(dt.Gender == 0 ? "Nữ" : "Nam");
                        $('#Identity').text(dt.Identity);
                        $('#PlaceReleased').text(dt.PlaceReleased);
                        $('#Address').text(dt.Address);
                        if (dt.PassportImgPath != "" && dt.PassportImgPath != undefined)
                        {
$('#imgPasspostImgPath').html("<a href='" + Config.API_Login + "Data\\upload\\" + dt.PassportImgPath + "' data-lightbox='roadtrip'><img src='" + Config.API_Login + "Data\\upload\\" + dt.PassportImgPath + "' style='height:50px;' /> </a>");
                        }
                        if (dt.IdentityImgPath1 != "" && dt.IdentityImgPath1 != undefined) {
                            $('#imgIdentityImgPath1').html("<a href='" + Config.API_Login + "Data\\upload\\" + dt.IdentityImgPath1 + "' data-lightbox='roadtrip'><img src='" + Config.API_Login + "Data\\upload\\" + dt.IdentityImgPath1 + "' style='height:50px;' /> </a>");
                        }
                        if (dt.IdentityImgPath2 != "" && dt.IdentityImgPath2 != undefined) {
                            $('#imgIdentityImgPath2').html("<a href='" + Config.API_Login + "Data\\upload\\" + dt.IdentityImgPath2 + "' data-lightbox='roadtrip'><img src='" + Config.API_Login + "Data\\upload\\" + dt.IdentityImgPath2 + "' style='height:50px;' /> </a>");
                        }
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

    //Trang Danh sách tờ khai
    accounts.getListDeclaration = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/Search?accountID=" + $('#hdfUID').val(),
            data: { },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    var str = "<table id='listContainer' class='table table-bordered data-table table-striped with-check' role='grid' aria-describedby='example1_info'><thead><tr><th class='text-center' style='min-width:100px'>STT</th><th class='text-center' style='min-width:100px'>Số tờ khai</th><th class='text-center'>Ngày đăng ký</th><th class='text-center'>Loại hình</th><th class='text-center'>Hải quan</th><th class='text-center'>Website</th><th class='text-center'>Địa chỉ</th><th class='text-center'>Nước</th><th class='text-center'>Vận đơn</th><th class='text-center'>Ngày thông quan</th></tr></thead><tbody>";
                    if (data.ResponseCode > 0) {
                        if (data.Data.length > 0) {
                            $.each(data.Data, function (index, value) {
                                if (value.DeclarationID) {
                                    str += ("<tr><td>" + (index + 1) + "</td><td><a href='" + Config.Url_Root + "Declaration/Declaration_Detail?decID=" + value.DeclarationID + "'>" + value.DeclarationID + "</a></td><td>" + hq.formDateTime(value.CreatedDate) + "</td><td>" + hq.selectedMethodCode(value.MethodCode) + "</td><td>" + hq.selectedCustom(value.CustomCode) + "</td><td>" + value.Website + "</td><td>" + value.Address + "</td><td>" + hq.selectedCountry(value.CountryCode) + "</td><td>" + (value.BillLadingData != null ? value.BillLadingData : "") + "</td><td>" + hq.formDateTime2(value.DateEntry) + "</td></tr>");
                                }
                                if ((index + 1) == data.Data.length) {
                                    str += "</tbody></table>";
                                    $('#divUpdate').html(str);
                                    formatDataTable();
                                }
                            });
                        }
                        else {
                            str += "</tbody></table>";
                            $('#divUpdate').html(str);
                        }
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Chi tiết tờ khai
    accounts.getDeclarationDetail = function () {
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
                    //console.log(data);
                    if (data.ResponseCode > 0) {
                        $('#txtCMND').val(data.Data.Identity);
                        $('#txtFullName').val(data.Data.FullName);
                        $('#txtPhone').val(data.Data.Mobile);
                        $('#txtAddress').val(data.Data.Address);
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
            }
        });

        setTimeout(function () {
            var txtDeclaration = $('#txtDeclaration').text();
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "tax/GetDeclarationDetail",
                data: {
                    DeclarationID: txtDeclaration
                },
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    if (data.Data) {
                        if (data.Data.length > 0) {
                            var t = data.Data[0];
                            $('#txtD_code2').val(t.ReferenceDeclarationID);
                            $('#txtCodeType,#slType').val(t.MethodCode);
                            $('#txtCodeCustom,#slCustom').val(t.CustomCode);
                            $('#slTransport').val(t.VehicleMethod);
                            $('#txtCode2').val(t.TrusteeCode);
                            $('#txtFullName2').val(t.TrusteeName);
                            $('#txtWebsite').val(t.Website);
                            $('#txtAddress2').val(t.Address);
                            $('#txtCodeCountry,#slCodeCountry').val(t.CountryCode);
                            $('#txtNumber').val(t.NumberSeal);
                            $('#slTypeNumber').val(t.UnitSeal);
                            $('#txtGross').val(t.TotalWeight);
                            $('#slGross').val(t.UnitWeight);
                            $('#txtCodeTransportation').val(t.VehicleCode);
                            $('#txtPlace,#slPlace').val(t.PlaceLoadingID);
                            $('#txtPlace2,#slPlace2').val(t.PlaceUnloadingID);
                            $('#txtDateOfArrival').val(hq.formDateTime2(t.DateEntry));
                            $('#txtBills').val(t.BillCode);
                            $('#txtReleaseDate').val(hq.formDateTime2(t.DateReleased));
                            $('#slPayment').val(t.MethodPaid);
                            $('#txtTotalBill').val(t.TotalBillAmount);
                            $('#slCoinCode').val(t.CurrencyCode);
                            if (t.BillLadingData != "" && t.BillLadingData != null) {
                                var item = t.BillLadingData.split(';');
                                $("#txtBill1").val(item[0]);
                                $("#txtBill2").val(item[1]);
                                $("#txtBill3").val(item[2]);
                                $("#txtBill4").val(item[3]);
                                $("#txtBill5").val(item[4]);
                                $("#txtBill6").val(item[5]);
                            }

                            if (t.FileIncludePath != "" && t.FileIncludePath != null) {
                                var arr = t.FileIncludePath.split(';');
                                for (var i = 0; i < arr.length; i++) {
                                    var item = arr[i].split(',');
                                    if (item[2] != undefined && item[2] != "") {
                                        $("#divListFile").append("<p><a href='" + Config.API_Login + "data/files/" + item[2] + "'>- " + item[2] + "</a></p>");
                                    }

                                }
                            }

                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                    return;
                }
            });
        }, 1500);
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
                return;
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
                            //accounts.Message("Đăng nhập thành công! AccountID:" + data.AccountID);
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
                    return;
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
                    if (parseInt(dt) > 0 && UpdateStatus != "False") {
                        window.location.href = Config.Url_Root + "home/ListUser";
                    }
                    else if (UpdateStatus == "False") {
                        window.location.href = Config.Url_Root + "home/ListUser";
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
                return;
            }
        });
    };

    //>>---Đăng nhập

    accounts.SearchUser = function () {
        var accountId = $('#txtAccountID').val();
        if (accountId == null || accountId == "")
            accountId = 0

        var userName = $('#txtEmail').val();
        var fullname = $('#fullName').val();
        var identity = $('#txtIdentity').val();
        var mobile = $('#txtMobile').val();
        var declarCode = $('#declarCode').val();
        var startCreatedDate = $('#startCreatedDate').val();
        var endCreatedDate = $('#endCreatedDate').val();
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "service/FindUser",
            data: { 
                accountId: accountId,
                userName: userName,
                fullname: fullname,
                identity: identity,
                mobile: mobile,
                declarCode: declarCode,
                startCreatedDate: startCreatedDate,
                endCreatedDate: endCreatedDate
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (value) {
                console.log("dữ liệu: ", value);
                if (value) {
                    $('#listContainer tbody').html("");
                    var str = "<table id='listContainer' class='table table-bordered data-table table-striped with-check' role='grid' aria-describedby='example1_info'><thead>";
                    str += "<tr><th class='text-left'>AccountID</th>";
                    str += "<th class='text-left'>Username</th>";
                    str += "<th class='text-left'>FullName</th>";
                    str += "<th class='text-left'>Identity</th>";
                    str += "<th class='text-left'>Mobile</th>";
                    str += "<th class='text-left'>Address</th>";
                    str += "<th class='text-left'>CreatedDate</th>";
                    str += "<th class='text-left'>UpdatedDate</th></tr></thead><tbody>";

                    if (value.ResponseCode > 0)
                    {
                        if (value.Data != "" && value.Data != undefined && value.Data != null && value.Data.length > 0)
                        {
                            for (var i = 0; i < value.Data.length; i++) {
                                var data = value.Data[i];

                                str += "<tr><td><a href='" + Config.Url_Root + "home/accountinfo?uid=" + data.accountId + "'>" + (data.accountId != null ? data.accountId : "") + "</a></td>";
                                str += "<td>" + (data.userName != null ? data.userName : "") + "</td>";
                                str += "<td>" + (data.fullName != null ? data.fullName : "") + "</td>";
                                str += "<td>" + (data.identity != null ? data.identity : "") + "</td>";
                                str += "<td>" + (data.mobile != null ? data.mobile : "") + "</td>";
                                str += "<td>" + (data.address != null ? data.address : "") + "</td>";
                                str += "<td>" + (data.createdDate != null ? accounts.formDateTime(data.createdDate) : "") + "</td>";
                                str += "<td>" + (data.updatedDate != null ? accounts.formDateTime(data.updatedDate) : "") + "</td></tr>";

                            }

                            str += "</tbody></table>";
                            $('#divUpdate').html(str);
                            formatDataTable();
                        }
                        
                    }
                    else
                    {
                        str += "</tbody></table>";
                        $('#divUpdate').html(str);
                    }
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
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

    accounts.Logout = function () {
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
            $('body').append('<div id="overlayPopup" style="position: absolute;z-index: 1200;top: 0;left: 0;width: 100%;height: 100%;display: block;opacity: .80;background: rgb(48, 45, 45);filter: alpha(opacity=60);-moz-opacity: 0.8;"></div>');
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

    accounts.ClosePopup = function () {
        $("#popupwrap").remove();
        $('#overlayPopup').remove();
    };

    accounts.ShowLoading = function () {
        this.Unloading();
        var html = '<div  id="LoadingOverlay"></div><div id="LoadingContainer"><div  id="Loading" style="display: none; text-align: center; overflow-y: none; vertical-align: middle;"><div class="loader" style="margin: auto auto"><img style="width: 100px; margin-left:-50%" src="' + Config.Url_Root + 'content/img/loading.gif" /></div></div>';
        html += '<style> #Loading{	width: 300px;	height: 300px;	z-index: 1400;	position: absolute;	padding: 5px;}#LoadingOverlay{	-moz-opacity: 0.8;	opacity: .80;	filter: alpha(opacity=80);	position: fixed;	z-index: 1500;	top: 0;	left: 0;	width: 100%;	height: 100%;	display: none;	background-color: #000;}</style></div>';
        $('body').append(html);
        //$('#Loading');
        $('#LoadingOverlay').show();
        $('#Loading').css('width', 100);
        $('#Loading').css('height', 100);
        $('#Loading').css('left', "50%");
        $('#Loading').css('top', "20%");
        $('#Loading').css('z-index', '1501');
        $('#Loading').show();
        $('#LoadingOverlay').css('height', "100%");
    };

    accounts.Unloading = function () {
        $('#LoadingContainer').remove();
        $('#LoadingOverlay').remove();
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

    accounts.formDateTime2 = function (date) {
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        return currMonth + "/" + currDate
            + "/" + currYear;
    };

    accounts.formDateTime = function (date) {
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        var currHours = d.getHours();
        var currMinutes = d.getMinutes();
        return currMonth + "/" + currDate
            + "/" + currYear + " " + currHours + ":" + currMinutes;
    };

    accounts.selectedMethodCode = function (code) {
        var str = code;
        if (_dataMethodCode.length > 0) {
            $.each(_dataMethodCode, function (index, value) {
                if (value.MethodCode == code) {
                    str = value.Name;
                }
            });
        }
        return str;
    };

    accounts.selectedCustom = function (code) {
        var str = code;
        if (_dataCustom.length > 0) {
            $.each(_dataCustom, function (index, value) {
                if (value.CustomsCode == code) {
                    str = value.CustomsName;
                }
            });
        }
        return str;
    };

    accounts.selectedCountry = function (code) {
        var str = code;
        if (_dataCountry.length > 0) {
            $.each(_dataCountry, function (index, value) {
                if (value.CountryCode == code) {
                    str = value.Name;
                }
            });
        }

        return str;
    };

})();
