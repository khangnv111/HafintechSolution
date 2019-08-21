var _dataMethodCode = '';
var _dataCustom = '';
var _dataCountry = '';

(function () {
    window.hq = {};

    hq.SubmitIDCHighValue = function (declarationID) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getotp",
            data: {
                type: 0
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.ResponseCode >= 0) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/SubmitIDCHighValue",
                        data: { declarationId: declarationID },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
                else {
                    bootbox.alert(data.Description);
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.ConfirmIDCHighValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDCHighValue",
            data: JSON.stringify({
                "declarationId": declarationId,
                "otp": $('#txtOTP').val()
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
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        bootbox.alert(data.Description);
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SubmitIDCLowValue = function (declarationID) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getotp",
            data: {
                type: 0
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.ResponseCode >= 0) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/SubmitIDCLowValue",
                        data: { declarationId: declarationID },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
                else {
                    bootbox.alert(data.Description);
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.ConfirmIDCLowValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDCLowValue",
            data: JSON.stringify({
                "declarationId": declarationId,
                "otp": $('#txtOTP').val()
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
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        bootbox.alert(data.Description);
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.getSeachMethod = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDeclarationKind",
            data: {
                dclKindCd: txtCode,
                dclKindNm: txtName,
                dclKindCdOld: "",
                dclKindCdOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachMethod",
                        data: {
                            dclKindCd: txtCode,
                            dclKindNm: txtName,
                            dclKindCdOld: "",
                            dclKindNmOld: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.dclKindCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.dclKindCd + "</td><td>" + value.dclKindNm + "</td><td><a onclick='hq.SelectedMethod(\"" + value.dclKindCd + "\",\"" + value.dclKindNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedMethod = function (code, name) {
        accounts.ClosePopup();
        $('#hdfdclKindCd,#txtdclKindCd').val(code);
        $('#txtdclKindCd_text').val(name);
        try {
            app.data.dclKindCd = code;
            app.data.dclKindNm = name;
        }
        catch (e) {
        }
    };

    hq.getSeachWeightUnit = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetWeightUnit",
            data: {
                weigUnitCd: txtCode,
                weigUnitNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachWeightUnit",
                        data: {
                            weigUnitCd: txtCode,
                            weigUnitNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.weigUnitCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.weigUnitCd + "</td><td>" + value.weigUnitNm + "</td><td><a onclick='hq.SelectedWeightUnit(\"" + value.weigUnitCd + "\",\"" + value.weigUnitNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedWeightUnit = function (code, name) {
        accounts.ClosePopup();
        $('#hdfweigUnitCdGrs').val(code);
        $('#txtweigUnitCdGrs').val(name);
        try {
            app.data.weigUnitCdGrs = code;
        }
        catch (e) {
        }
    };

    hq.getSeachSealUnit = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetQuantityUnit",
            data: {
                quanUnitCd: txtCode,
                quanUnitNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachSealUnit",
                        data: {
                            quanUnitCd: txtCode,
                            quanUnitNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data != undefined && data.Data != null && data.Data[0] != undefined && data.Data[0] != null) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.quanUnitCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.quanUnitCd + "</td><td>" + value.quanUnitNm + "</td><td><a onclick='hq.SelectedSealUnit(\"" + value.quanUnitCd + "\",\"" + value.quanUnitNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedSealUnit = function (code, name) {
        accounts.ClosePopup();
        $('#hdfpieceUnitCd').val(code);
        $('#txtpieceUnitCd_text').val(name);
        try {
            app.data.pieceUnitCd = code;
            app.data.quanUnitNm = name;
        }
        catch (e) {
        }
    };

    hq.getListCustom = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsOffice",
            data: {
                cstOfficeCd: "",
                cstOfficeNm: "",
                cstOfficeCdOld: "",
                cstOfficeNmOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slCustoms').append($('<option/>', {
                            value: value.cstOfficeCd,
                            text: value.cstOfficeNm
                        }));
                    })
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.getSeachCustom = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsOffice",
            data: {
                cstOfficeCd: txtCode,
                cstOfficeNm: txtName,
                cstOfficeCdOld: "",
                cstOfficeNmOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachCustom",
                        data: {
                            cstOfficeCd: txtCode,
                            cstOfficeNm: txtName,
                            cstOfficeCdOld: "",
                            cstOfficeNmOld: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data != null && data.Data != "" && data.Data.length > 0) {
                                    $.each(data.Data, function (index, value) {
                                        $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.cstOfficeCd + "</td><td>" + value.cstOfficeNm + "</td><td><a onclick='hq.SelectedCustom(\"" + value.cstOfficeCd + "\",\"" + value.cstOfficeNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedCustom = function (code, name) {
        accounts.ClosePopup();
        $('#txtcstOffice,#hdfcstOffice').val(code);
        $('#txtcstOfficeNm').val(name);
        try {
            app.data.cstOffice = code;
            app.data.cstOffice = code;
        }
        catch (e) {
        }
    };
    //Lấy danh sách nước
    hq.getCountry2 = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCountry",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slplaceOriginCd').append($('<option/>', {
                            value: value.countryCode,
                            text: value.countryName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.getSeachCountry = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCountry",
            data: {
                countryCode: txtCode,
                countryName: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachCountry",
                        data: {
                            countryCode: txtCode,
                            countryName: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer tbody').html("");
                                if (data.Data != null && data.Data != "" && data.Data.length > 0) {
                                    $.each(data.Data, function (index, value) {
                                        $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.countryCode + "</td><td>" + value.countryName + "</td><td><a onclick='hq.SelectedCountry(\"" + value.countryCode + "\",\"" + value.countryName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedCountry = function (code, name) {
        accounts.ClosePopup();

        $('#txtcountryCd,#hdfcountryCd,#placeOriginCd').val(code);
        $('#txtcountryNm').val(name);
        try {
            app.data.countryCd = code;
        }
        catch (e) {
        }
    };

    //Lấy nước người xuất khẩu GTT
    hq.getSeachCountryExport = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCountry",
            data: {
                countryCode: txtCode,
                countryName: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachCountry",
                        data: {
                            countryCode: txtCode,
                            countryName: txtName,
                            typeFind: 1,
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer tbody').html("");
                                if (data.Data != null && data.Data != "" && data.Data.length > 0) {
                                    $.each(data.Data, function (index, value) {
                                        $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.countryCode + "</td><td>" + value.countryName + "</td><td><a onclick='hq.SelectedCountryExport(\"" + value.countryCode + "\",\"" + value.countryName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedCountryExport = function (code, name) {
        accounts.ClosePopup();
        $('#hdfcountryCd, #txthdfcountryCd').val(code);
        try {
            app.data.countryCd = code;
        }
        catch (e) {
        }
        //$('#txtcountryNmAddress').val(name);
    }

    //Lấy nước xuất xứ
    hq.getSeachCountryOrigin = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCountry",
            data: {
                countryCode: txtCode,
                countryName: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachCountry",
                        data: {
                            countryCode: txtCode,
                            countryName: txtName,
                            typeFind: 2
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer tbody').html("");
                                if (data.Data != null && data.Data != "" && data.Data.length > 0) {
                                    $.each(data.Data, function (index, value) {
                                        $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.countryCode + "</td><td>" + value.countryName + "</td><td><a onclick='hq.SelectedCountryOrigin(\"" + value.countryCode + "\",\"" + value.countryName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedCountryOrigin = function (code, name) {
        accounts.ClosePopup();
        $('#txtplaceOriginCd, #placeOriginCd').val(code);
        $('#txtcountryNm').val(name);
        try {
            app.data.placeOriginCd = code;
        }
        catch (e) {
        }
    }
    //tìm nước tạo hàng hóa
    hq.getSeachCountryHH = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCountry",
            data: {
                countryCode: txtCode,
                countryName: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachCountryHH",
                        data: {
                            countryCode: txtCode,
                            countryName: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup2(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer2 tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.countryCode) {
                                            $('#listContainer2 tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.countryCode + "</td><td>" + value.countryName + "</td><td><a onclick='hq.SelectedCountryHH(\"" + value.countryCode + "\",\"" + value.countryName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                    $("#popupwrap2").css('border', '1pt solid lightgray');
                                }
                                else {
                                    $('#listContainer2 tbody').html("");
                                    $("#popupwrap2").css('border', '1pt solid lightgray');
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    //chọn nước ở tạo hàng hóa
    hq.SelectedCountryHH = function (code, name) {
        accounts.ClosePopupHH();
        $('#slplaceOriginCd,#txtplaceOriginCd').val(code);
        $('#txtcountryNmOrigin').val(name);
    };

    //tìm Thuế Tự vệ chống bán phá giá tạo hàng hóa
    hq.getTaxAntiDumpingDuty = function (type, Page) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxAntiDumpingDuty",
            data: {
                code: txtCode,
                name: txtName,
                type: type
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTax",
                        data: {
                            code: txtCode,
                            name: txtName,
                            type: type,
                            Page: Page
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup3(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer2 tbody').html("");
                                debugger;
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.code) {
                                            $('#listContainer2 tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.code + "</td><td id=\"row_" + type + Page + (index + 1) + "\">" + value.name + "</td><td><a onclick=\"hq.SelectedTaxHH(\'" + value.code + "\'," + Page + "," + type + "," + (index + 1) + ");\" class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer2 tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    //Thuế tiêu thụ đặc biệt
    hq.getTaxSpecialConsumption = function (type, Page) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxSpecialConsumption",
            data: {
                code: txtCode,
                name: txtName,
                type: type
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTax",
                        data: {
                            code: txtCode,
                            name: txtName,
                            type: type,
                            Page: Page
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup3(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer2 tbody').html("");
                                debugger;
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.code) {
                                            $('#listContainer2 tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.code + "</td><td id=\"row_" + type + Page + (index + 1) + "\">" + value.name + "</td><td><a onclick=\"hq.SelectedTaxHH(\'" + value.code + "\'," + Page + "," + type + "," + (index + 1) + ");\" class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer2 tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Thuế bảo về môi trường
    hq.getTaxEnvironment = function (type, Page) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxEnvironment",
            data: {
                code: txtCode,
                name: txtName,
                type: type
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTax",
                        data: {
                            code: txtCode,
                            name: txtName,
                            type: type,
                            Page: Page
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup3(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer2 tbody').html("");
                                debugger;
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.code) {
                                            $('#listContainer2 tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.code + "</td><td id=\"row_" + type + Page + (index + 1) + "\">" + value.name + "</td><td><a onclick=\"hq.SelectedTaxHH(\'" + value.code + "\'," + Page + "," + type + "," + (index + 1) + ");\" class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer2 tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Thuế giá trị gia tăng
    hq.getTaxValueAdded = function (type, Page) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxValueAdded",
            data: {
                code: txtCode,
                name: txtName,
                type: type
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTax",
                        data: {
                            code: txtCode,
                            name: txtName,
                            type: type,
                            Page: Page
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup3(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer2 tbody').html("");
                                debugger;
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.code) {
                                            $('#listContainer2 tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.code + "</td><td id=\"row_" + type + Page + (index + 1) + "\">" + value.name + "</td><td><a onclick=\"hq.SelectedTaxHH(\'" + value.code + "\'," + Page + "," + type + "," + (index + 1) + ");\" class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer2 tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Thuế chống phân biệt đối xử
    hq.getTaxAntiDiscrimination = function (type, Page) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxAntiDiscrimination",
            data: {
                code: txtCode,
                name: txtName,
                type: type
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTax",
                        data: {
                            code: txtCode,
                            name: txtName,
                            type: type,
                            Page: Page
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup3(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer2 tbody').html("");
                                debugger;
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.code) {
                                            $('#listContainer2 tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.code + "</td><td id=\"row_" + type + Page + (index + 1) + "\">" + value.name + "</td><td><a onclick=\"hq.SelectedTaxHH(\'" + value.code + "\'," + Page + "," + type + "," + (index + 1) + ");\" class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer2 tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Mã miễn / Giảm / Không chịu thuế nhập khẩu

    hq.getReductionImportTax = function (type, Page) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetReductionImportTax",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTax",
                        data: {
                            code: txtCode,
                            name: txtName,
                            type: type,
                            Page: Page
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup3(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer2 tbody').html("");
                                debugger;
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.rdcImpTaxCd) {
                                            $('#listContainer2 tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.rdcImpTaxCd + "</td><td id=\"row_" + type + Page + (index + 1) + "\">" + value.rdcImpTaxNm + "</td><td><a onclick=\"hq.SelectedTaxHH(\'" + value.rdcImpTaxCd + "\'," + Page + "," + type + "," + (index + 1) + ");\" class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer2 tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //chọn Thuế thu ở tạo hàng hóa
    hq.SelectedTaxHH = function (code, page, type, index) {
        var name = $("#row_" + type + page + index).text();
        if (page == 1 && type == 1) {
            $('#txtoTaxTypeCd1').val(code);
            $('#sloTaxTypeCd1').val(code);
        }
        else if (page == 1 && type == 2) {
            $('#txtoTaxRdcCd1').val(code);
            $('#sloTaxRdcCd1').val(code);
        }
        else if (page == 2 && type == 1) {
            $('#txtoTaxTypeCd2').val(code);
            $('#sloTaxTypeCd2').val(code);
        }
        else if (page == 2 && type == 2) {
            $('#txtoTaxRdcCd2').val(code);
            $('#sloTaxRdcCd2').val(code);
        }
        else if (page == 3 && type == 1) {
            $('#txtoTaxTypeCd3').val(code);
            $('#sloTaxTypeCd3').val(code);
        }
        else if (page == 3 && type == 2) {
            $('#txtoTaxRdcCd3').val(code);
            $('#sloTaxRdcCd3').val(code);
        }
        else if (page == 4 && type == 1) {
            $('#txtoTaxTypeCd4').val(code);
            $('#sloTaxTypeCd4').val(code);
        }
        else if (page == 4 && type == 2) {
            $('#txtoTaxRdcCd4').val(code);
            $('#sloTaxRdcCd4').val(code);
        }
        else if (page == 5 && type == 1) {
            $('#txtoTaxTypeCd5').val(code);
            $('#sloTaxTypeCd5').val(code);
        }
        else if (page == 5 && type == 2) {
            $('#txtoTaxRdcCd5').val(code);
            $('#sloTaxRdcCd5').val(code);
        }
        else if (page == 6 && type == 10) {
            $('#txtrdcImpTaxCd').val(code);
            $('#slrdcImpTaxCd').val(code);
        }

        setTimeout(function () {
            accounts.ClosePopupTax();
        })
    };

    hq.onchangeData = function () {
        var value1 = $('#txtcstOffice').val().trim();
        if (value1 != "" && value1 != undefined && value1 != null) {
            $('#hdfcstOffice').val(value1);
        }
    }
    //onchange thay đổi value field ẩn
    hq.onChangeThue = function () {
        var value1 = $('#txtoTaxTypeCd1').val().trim();
        var value2 = $('#txtoTaxTypeCd2').val().trim();
        var value3 = $('#txtoTaxTypeCd3').val().trim();
        var value4 = $('#txtoTaxTypeCd4').val().trim();
        var value5 = $('#txtoTaxTypeCd5').val().trim();
        var value6 = $('#txtrdcImpTaxCd').val().trim();
        var value7 = $('#txtoTaxRdcCd1').val().trim();
        var value8 = $('#txtoTaxRdcCd2').val().trim();
        var value9 = $('#txtoTaxRdcCd3').val().trim();
        var value10 = $('#txtoTaxRdcCd4').val().trim();
        var value11 = $('#txtoTaxRdcCd5').val().trim();

        var value13 = $('#txtoTaxRdcAmt2').val().trim();
        var value14 = $('#txtoTaxRdcAmt3').val().trim();
        var value15 = $('#txtoTaxRdcAmt4').val().trim();
        var value16 = $('#txtoTaxRdcAmt5').val().trim();
        if (value1 != "" && value1 != undefined && value1 != null) {
            $('#sloTaxTypeCd1').val(value1);
        }
        else {
            if (value1 == "") {
                $('#sloTaxTypeCd1').val("");
            }
        }
        if (value2 != "" && value2 != undefined && value2 != null) {
            $('#sloTaxTypeCd2').val(value2);
        }
        else {
            if (value2 == "") {
                $('#sloTaxTypeCd2').val("");
            }
        }
        if (value3 != "" && value3 != undefined && value3 != null) {
            $('#sloTaxTypeCd3').val(value3);
        }
        else {
            if (value3 == "") {
                $('#sloTaxTypeCd3').val("");
            }
        }
        if (value4 != "" && value4 != undefined && value4 != null) {
            $('#sloTaxTypeCd4').val(value4);
        }
        else {
            if (value4 == "") {
                $('#sloTaxTypeCd4').val("");
            }
        }
        if (value5 != "" && value5 != undefined && value5 != null) {
            $('#sloTaxTypeCd5').val(value5);
        }
        else {
            if (value5 == "") {
                $('#sloTaxTypeCd5').val("");
            }
        }
        if (value6 != "" && value6 != undefined && value6 != null) {
            $('#slrdcImpTaxCd').val(value6);
        }
        else {
            if (value6 == "") {
                $('#slrdcImpTaxCd').val("");
            }
        }
        if (value7 != "" && value7 != undefined && value7 != null) {
            $('#sloTaxRdcCd1').val(value7);
        }
        else {
            if (value7 == "") {
                $('#sloTaxRdcCd1').val("");
            }
        }
        if (value8 != "" && value8 != undefined && value8 != null) {
            $('#sloTaxRdcCd2').val(value8);
        }
        else {
            if (value8 == "") {
                $('#sloTaxRdcCd2').val("");
            }
        }
        if (value9 != "" && value9 != undefined && value9 != null) {
            $('#sloTaxRdcCd3').val(value9);
        }
        else {
            if (value9 == "") {
                $('#sloTaxRdcCd3').val("");
            }
        }
        if (value10 != "" && value10 != undefined && value10 != null) {
            $('#sloTaxRdcCd4').val(value10);
        }
        else {
            if (value10 == "") {
                $('#sloTaxRdcCd4').val("");
            }
        }
        if (value11 != "" && value11 != undefined && value11 != null) {
            $('#sloTaxRdcCd5').val(value11);
        }
        else {
            if (value11 == "") {
                $('#sloTaxRdcCd5').val("");
            }
        }
    }
    hq.getSeachPlace = function (callback) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetLoadingLocation",
            data: {
                loadLocCd: txtCode,
                loadLocNm: txtName,
                countryCd: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachPlace",
                        data: {
                            loadLocCd: txtCode,
                            loadLocNm: txtName,
                            countryCd: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.loadLocCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.loadLocCd + "</td><td>" + value.loadLocNm + "</td><td><a onclick='hq.SelectedPlace(\"" + value.loadLocCd + "\",\"" + value.loadLocNm + "\",\"" + value.type + "\",\"" + value.countryCd + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();

                            if (typeof callback != undefined && typeof callback == 'function')
                                callback();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedPlace = function (code, name, type, countryCd) {
        accounts.ClosePopup();
        var value = countryCd + code;
        if (type == 2) {
            $('#txtloadLocCd,#hdfloadLocCd').val(value);
            $('#txtloadLocNm').val(name);
        }
        else {
            $('#txtloadLocCd,#hdfloadLocCd').val(code);
            $('#txtloadLocNm').val(name);
        }
        try {
            if (type == 2)
                app.data.finalDesCd = value;
            else
                app.data.finalDesCd = code;
            app.data.finalDesNm = name;
        }
        catch (e) {
        }
    };

    hq.getSeachUnPlace = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetUnloadingPort",
            data: {
                unloadPortCd: txtCode,
                unloadPortNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachUnPlace",
                        data: {
                            unloadPortCd: txtCode,
                            unloadPortNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.unloadPortCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.unloadPortCd + "</td><td>" + value.unloadPortNm + "</td><td><a onclick='hq.SelectedUnPlace(\"" + value.unloadPortCd + "\",\"" + value.unloadPortNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedUnPlace = function (code, name) {
        accounts.ClosePopup();
        $('#txtunloadPortCd, #hdfunloadPortCd').val(code);
        $('#txtunloadPortNm').val(name);
        try {
            app.data.loadPortCd = code;
            app.data.loadPortNm = name;
        }
        catch (e) {
        }
        hq.vaOnchangedata();
    };

    hq.getSeachUncstWrhCd = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsWarehouse",
            data: {
                cstWrhCd: txtCode,
                cstWrhNm: txtName,
                province: "",
                cstOfficeCd: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachUnwaitStgPlcCode",
                        data: {
                            cstWrhCd: txtCode,
                            cstWrhNm: txtName,
                            province: "",
                            cstOfficeCd: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data != null && data.Data.length > 0 && data.Data[0] != null) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.cstWrhCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.cstWrhCd + "</td><td>" + value.cstWrhNm + "</td><td><a onclick='hq.SelectedUncstWrhCd(\"" + value.cstWrhCd + "\",\"" + value.cstWrhNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedUncstWrhCd = function (code, name) {
        accounts.ClosePopup();

        $('#txtcstWrhCd,#hdfcstWrhCd').val(code);
        $('#txtcstWrhCd_text').val(name);
        try {
            app.data.cstWrhCd = code;
            app.data.cstClrWrhNm = name;
        }
        catch (e) {
        }
    };

    hq.getSeachslotherLawCd = function (n) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDocumment",
            data: {
                docummentCode: txtCode,
                docummentName: txtName,
                docummentDate: "",
                content: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachsldocummentData",
                        data: {
                            n: n,
                            docummentCode: txtCode,
                            docummentName: txtName,
                            docummentDate: "",
                            content: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.docummentCode) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.docummentCode + "</td><td>" + value.docummentName + "</td><td><a onclick='hq.SelectedUncstWrhCd" + n + "(\"" + value.docummentCode + "\",\"" + value.docummentName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedUncstWrhCd1 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd1').val(code);
        $('#txtotherLawCd1').val(name);
    };
    hq.SelectedUncstWrhCd2 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd2').val(code);
        $('#txtotherLawCd2').val(name);
    };
    hq.SelectedUncstWrhCd3 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd3').val(code);
        $('#txtotherLawCd3').val(name);
    };
    hq.SelectedUncstWrhCd4 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd4').val(code);
        $('#txtotherLawCd4').val(name);
    };
    hq.SelectedUncstWrhCd5 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd5').val(code);
        $('#txtotherLawCd5').val(name);
    };

    hq.getSeachBank = function (n) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtIDBank = $('#txtIDBank').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtIDBank == "" || txtIDBank == undefined) txtIDBank = "";
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetBank",
            data: {
                bankCode: txtCode,
                bankName: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachBank",
                        data: {
                            n: n,
                            bankCode: txtCode,
                            bankName: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.bankCode) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.bankCode + "</td><td>" + value.bankName + "</td><td><a onclick='hq.SelectedBank" + n + "(\"" + value.bankCode + "\",\"" + value.bankName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedBank1 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfbankPayCd,#txtbankPayCd').val(code);
        $('#txtbankPayCd_text').val(name);
        try {
            app.data.bankPayCd = code;
            app.data.bankPayNm = name;
        }
        catch (e) {
        }
    };
    hq.SelectedBank2 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfsecSupplBankCd,#txtsecSupplBankCd').val(code);
        $('#txtsecSupplBankCd_text').val(name);
        try {
            app.data.secSupplBankCd = code;
            app.data.secSupplBankNm = name;
        }
        catch (e) {
        }
    };

    hq.getSeachFileAttack = function (n) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtCode != "" && txtCode != undefined) {
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "tax/GetDeclarationDetail",
                data: {
                    DeclarationID: txtCode
                },
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            $.ajax({
                                type: 'GET',
                                url: Config.Url_Root + "Declaration/getSeachFileAttack",
                                data: {
                                    n: n,
                                    DeclarationID: txtCode
                                },
                                contentType: "application/json; charset=utf-8",
                                dataType: "html",
                                processData: true,
                                crossDomain: true,
                                xhrFields: { withCredentials: true },
                                cache: false,
                                success: function (dt) {
                                    if (dt) {
                                        console.log(data);
                                        accounts.ShowPopup(dt, 800, 1000);
                                        $('#listContainer tbody').html("");
                                        debugger;
                                        if (data) {
                                            var t = data.Data.Declarations;
                                            var tt = data.Data.DeclarationsLowValues;
                                            var tc = data.Data.DeclarationsHighValues;
                                            if (t.type == 1) {
                                                if (tt.fileAttachs != "" && tt.fileAttachs != null) {
                                                    var arr = tt.fileAttachs.split(';');
                                                    console.log(arr);
                                                    $.each(arr, function (index, value) {
                                                        console.log(arr);
                                                        if (value) {
                                                            var item = value.split(',');
                                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td><p><a href='" + Config.API_Login + "data/files/" + item[2] + "'>- " + item[2] + "</a></p></td><td><a onclick='hq.SelectedFileAttack" + n + "(\"" + item[2] + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                                        }
                                                    });
                                                }
                                            }
                                            else {
                                                if (tc.fileAttachs != "" && tc.fileAttachs != null) {
                                                    var arr = tc.fileAttachs.split(';');
                                                    console.log(arr);
                                                    $.each(arr, function (index, value) {
                                                        console.log(arr);
                                                        if (value) {
                                                            var item = value.split(',');
                                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td><p><a href='" + Config.API_Login + "data/files/" + item[2] + "'>- " + item[2] + "</a></p></td><td><a onclick='hq.SelectedFileAttack" + n + "(\"" + item[2] + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        else {
                                            $('#listContainer tbody').html("");
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
                        else {
                            bootbox.alert(data.Description);
                            accounts.Unloading();
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
            $.ajax({
                type: 'GET',
                url: Config.Url_Root + "Declaration/getSeachFileAttack",
                data: { n: n },
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                processData: true,
                crossDomain: true,
                xhrFields: { withCredentials: true },
                cache: false,
                success: function (dt) {
                    if (dt) {
                        accounts.ShowPopup(dt, 800, 1000);
                        accounts.Unloading();
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        }
    };
    hq.SelectedFileAttack1 = function (name) {
        accounts.ClosePopup();
        $('#hdfNumberFile1,#txtNumberFile1').val(name);
    };
    hq.SelectedFileAttack2 = function (name) {
        accounts.ClosePopup();
        $('#hdfNumberFile2,#txtNumberFile2').val(name);
    };
    hq.SelectedFileAttack3 = function (name) {
        accounts.ClosePopup();
        $('#hdfNumberFile3,#txtNumberFile3').val(name);
    };

    hq.getSearchTransportation = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetLoadingVessel",
            data: {
                loadVesselCd: txtCode,
                loadVesselNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTransportation",
                        data: {
                            loadVesselCd: txtCode,
                            loadVesselNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.loadVesselCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.loadVesselCd + "</td><td>" + value.loadVesselNm + "</td><td><a onclick='hq.SelectedTransportation(\"" + value.loadVesselCd + "\",\"" + value.loadVesselNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
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
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedTransportation = function (code, name) {
        accounts.ClosePopup();

        $('#hdfTransport,#txtTransport').val(code);
        $('#txtloadVesselAcNm').val(name);
        try {
            app.data.lPlanVesselCd = code;
            app.data.lPlanVesselNm = name;
        }
        catch (e) {
        }
    };

    hq.CheckOnSubmit = function (type) {
        if (!hq.CheckSTT()) {
            accounts.Message("Số thứ tự của dòng hàng trên tờ khai tạm nhập tái xuất tương ứng phải có 2 ký tự. Nếu nhỏ hơn 1 thì phải có 0 đằng trước");

            return;
        }

        if (type == 1) {
            $('#hdfTypeSubmit').val(1);
        }
        else {
            $('#hdfTypeSubmit').val(2);
        }
        $('#btnSubmitProduct').click();
    };

    hq.CheckSTT = function () {
        var stt = $("#txttenDclLineNo").val();
        if (stt.length == 1)
            return false;

        return true;
    }

    hq.CheckSubmitDeclaration = function (type) {
        if (type == 1) {
            $('#hdfStatus').val(1);
        }
        else {
            $('#hdfStatus').val(0);
        }
        $('#btnSaveDeclaration').click();
    };

    hq.SelectedDeclarationID = function (DeclarationID) {
        accounts.ClosePopup();
        $('#txtD_code2').val(DeclarationID);
    };

    //Trang Danh sách tờ khai
    hq.getListDeclaration = function (page) {
        var token = $('#hdfToken').val();
        var slstatus = $('#slstatus').val();
        var slclearanStatus = $('#slclearanStatus').val();
        var slinsClsCd = $('#slinsClsCd').val();
        var sldclKindCd = $('#grType').val();
        var slType = $('#slType').val();
        var slCustoms = $('#slCustoms').val();
        var datepickerFrom = $('#datepickerFromD').val();
        var datepickerTo = $('#datepickerToD').val();
        var txtDeclaration = $('#txtDeclaration').val();
        
        if (page == undefined || page == null) page = 0;

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchDeclaration",
            data: {
                dclId: "",
                startCreatedDate: datepickerFrom,
                endCreatedDate: datepickerTo,
                cstOffice: slCustoms,
                type: slType,
                dclNo: txtDeclaration,
                dclKindCd: sldclKindCd,
                insClsCd: slinsClsCd,
                status: slstatus,
                clearanStatus: slclearanStatus,
                page: page,
                count: 100,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    var str = "<table id='listContainer' class='table table-bordered data-table table-striped with-check' role='grid' aria-describedby='example1_info'><thead>";
                    str += "<tr><th class='text-center' style='min-width:100px'>STT</th>";
                    str += "<th class='text-center' style='min-width:100px'>Số tờ khai</th>";
                    str += "<th class='text-center' style='min-width:100px'>Số tờ khai hải quan</th>";
                    str += "<th class='text-center'>Ngày đăng ký</th><th class='text-center'>Loại hình</th>";
                    str += "<th class='text-center'>Hải quan</th><th class='text-center'>Phân luồng</th>";
                    str += "<th class='text-center'>Thông quan</th><th class='text-center'>Ngày hàng đến</th>";
                    str += "<th class='text-center'>Trạng thái</th><th class='text-center'>Thao tác</th></tr></thead><tbody>";
                    if (data.ResponseCode > 0) {
                        if (data.Data && data.Data.ListDeclarations && data.Data.ListDeclarations.length > 0) {
                            for (var i = 0; i < data.Data.ListDeclarations.length; i++) {
                                var value = data.Data.ListDeclarations[i];

                                str += "<tr><td>" + (i + 1) + "</td>";
                                str += "<td><a href='" + Config.Url_Root + "Declaration/Declaration" + (value.type == 1 ? "" : "HighValue") + "_Detail?decID=" + value.dclId + "&status=" + value.status + "&type=" + value.type + "'>" + (value.dclId == null ? "" : value.dclId) + "</a></td>";

                                str += "<td><a href='" + Config.Url_Root + "Declaration/Declaration" + (value.type == 1 ? "" : "HighValue") + "_Detail?decID=" + value.dclId + "&status=" + value.status + "&type=" + value.type + "'>" + (value.dclNo == null ? "" : value.dclNo) + "</a></td>";

                                str += "<td>" + hq.formDateTime(value.createdDate) + "</td><td>" + hq.selectedMethodCode(value.dclKindCd) + "</td><td>" + (value.cstOfficeNm == null ? "" : value.cstOfficeNm) + "</td>";

                                str += "<td>" + hq.PhanLuong(value.insClsCd) + "</td>";

                                str += "<td>" + (value.dateOfPermit != undefined && value.dateOfPermit != "" && value.dateOfPermit != null ? "Thông quan" : "Chưa thông quan") + "</td>";
                                str += "<td>" + hq.formDateTime2(value.arrDate) + "</td><td>" + hq.caseStatusDeclaration(value.status) + "</td>";
                                str += "<td><a onclick='hq.linkToUpdateform(" + value.dclId + "," + value.type + ")' class='btn btn-warning'>Sửa</a><a onclick='hq.deleteSource(" + value.dclId + ")' class='btn btn-danger'>Xóa</a></td></tr>";

                                if ((i + 1) == data.Data.ListDeclarations.length) {
                                    str += "</tbody></table>";
                                    $('#divUpdate').html(str);
                                    //formatDataTable();
                                }
                            }

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
    hq.getDeclarationDetail = function () {
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
                    if (data.Data) {
                        console.log("getDeclarationDetail: ", data.Data);
                        var t = data.Data;
                        $("input[name=rdGroupType][value=" + t.groupTypeId + "]").prop('checked', true);
                        $('#txtfirstDclNo').val(t.firstDclNo);
                        $('#txtdclPlannedDate').val(t.dclPlannedDate);
                        $('#txttimeLimReExp').val(t.timeLimReExp);
                        $('#txtdclKindCd,#hdfdclKindCd').val(t.dclKindCd);
                        if (t.DeclarationKinds != null && t.DeclarationKinds.length > 0) {
                            $('#txtdclKindCd_text').val(t.DeclarationKinds[0].dclKindNm);
                        }
                        $('#txtinsClsCd').val(t.insClsCd);
                        $("#phan-luong").html(hq.PhanLuong(t.insClsCd));
                        if (t.dateOfPermit) {
                            $("#thong-quan").html("Thông quan");
                        }

                        if (t.CustomsOffices != undefined && t.CustomsOffices != null && t.CustomsOffices.length > 0) {
                            $('#txtcstOfficeNm').val(t.CustomsOffices[0].cstOfficeNm);
                            $('#txtcstOffice,#hdfcstOffice').val(t.CustomsOffices[0].cstOfficeCd);
                        }
                        $('#slmeansOfTrsCd').val(t.meansOfTrsCd);
                        $('#slTransport').val(t.transportCode);
                        $('#txttentativeDclNo').val(t.tentativeDclNo);
                        $('#slcargoClsCd').val(t.cargoClsCd);
                        $('#slclsOrg').val(t.clsOrg);
                        $('#slcstSubSection').val(t.cstSubSection);
                        $('#txtimperCd').val(t.imperCd);
                        $('#txtimperNm').val(t.imperNm);
                        $('#txtpostcode').val(t.postcode);
                        $('#txtphoneNoOfImp').val(t.phoneNoOfImp);
                        $('#txtaddressOfImp').val(t.addressOfImp);
                        $('#txtimpCtrCd').val(t.impCtrCd);
                        $('#txtimpCtrNm').val(t.impCtrNm);
                        $('#txtconsignorCd').val(t.consignorCd);
                        $('#txtconsignorNm').val(t.consignorNm);
                        $('#txtpostcodeIdt').val(t.postcodeIdt);

                        $("#dclNoHQ").val(t.dclNo);

                        $('#txthouseAwbNo').val(t.houseAwbNo);
                        $('#txtmasterAwbNo').val(t.masterAwbNo);
                        $('#txtflightNo').val(t.flightNo);
                        $('#txtitemName').val(t.itemName);
                        //trị giá tính thuế
                        if (t.listProducts != undefined && t.listProducts.length > 0) {
                            $('#txtcstValue').val(t.listProducts[0].cstValue);
                        }
                        else {
                            $('#txtcstValue').val(t.cstValue);
                        }

                        $('#txteiControlNo').val(t.eiControlNo);

                        $('#txtplaceOriginCd, #placeOriginCd').val(t.placeOriginCd);

                        if (t.Countrys != null && t.Countrys.length > 0) {
                            for (var i = 0; i < t.Countrys.length; i++) {
                                if (t.Countrys[i].countryCode == t.placeOriginCd) {
                                    $('#txtcountryNm').val(t.Countrys[i].countryName);
                                    break;
                                }
                            }
                        }

                        $('#hdfpieceUnitCd').val(t.pieceUnitCd);
                        if (t.QuantityUnits != null && t.QuantityUnits.length > 0) {
                            $('#txtpieceUnitCd_text').val(t.QuantityUnits[0].quanUnitNm);
                        }

                        $('#hdfTransport,#txtTransport').val(t.loadVesselCd);
                        $('#txtloadVesselAcNm').val(t.loadVesselAcNm);
                        $('#txtexportCsgNm').val(t.exportCsgNm);
                        $('#txtplannedDeclCd').val(t.plannedDeclCd);
                        $('#txtcargoPiece').val(t.cargoPiece);

                        $('#txtcargoWeigGrs').val(t.cargoWeigGrs);
                        $('#hdfweigUnitCdGrs').val(t.weigUnitCdGrs);
                        if (t.WeightUnits != null && t.WeightUnits.length > 0) {
                            $('#txtweigUnitCdGrs').val(t.WeightUnits[0].weigUnitNm);
                        }
                        $('#txtimperCd').val(t.imperCd);

                        $('#txttotalTaxVal').val(t.totalTaxVal);
                        $('#txtinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txttaxSubjectCd').val(t.taxSubjectCd);
                        $('#txttaxSubjectNm').val(t.taxSubjectNm);
                        $('#txttotalTaxAmt').val(t.totalTaxAmt);
                        $('#txtnoColTotalTax').val(t.noColTotalTax);
                        $('#txttotalPayTax').val(t.totalPayTax);
                        $('#txtsecAmt').val(t.secAmt);
                        $('#txtcurCd').val(t.curCd);
                        //$('#txtcurExcRate').val(t.curExcRate);
                        $('#txtloadVesselAcNm').val(t.loadVesselAcNm);

                        $('#txtstructure').val(t.structure);
                        $('#txtnoOfDclColumn').val(t.noOfDclColumn);
                        $('#txtrepTaxCd').val(t.repTaxCd);
                        //Số tờ khai giá trị thấp
                        if (t.dclNo != undefined && t.dclNo != null)
                            $("#dclNoHQ").val(t.dclNo);

                        //Ngày đăng ký
                        var dateReg = hq.formDateTime3(t.regDate);
                        var timeReg = hq.formDateHour(t.regTime)
                        $("#regDate").val(dateReg + " " + timeReg);

                        //ngày thay đổi đăng ký regTimeOfCor
                        var dateRegOfCor = hq.formDateTime3(t.regDateOfCor);
                        var timeRegOfCor = hq.formDateHour(t.regTimeOfCor)
                        $("#regDateOfCor").val(dateRegOfCor + " " + timeRegOfCor);

                        //phân loại kiểm tra tài liệu
                        $("#insClsCd").val(t.insClsCd);

                        //ngày cấp phép nhập khẩu
                        var datePermit = hq.formDateTime3(t.dateOfPermit);
                        var timePermit = hq.formDateHour(t.timeOfPermit)
                        $("#dateOfPermit").val(datePermit + " " + timePermit);

                        //ngày hoàn thành kiểm tra
                        var dateComplete = hq.formDateTime3(t.dateCmplInsp);
                        var timeComplete = hq.formDateHour(t.timeCmplInsp)
                        $("#dateCmplInsp").val(dateComplete + " " + timeComplete);

                        //phân loại kiểm tra sau thông quan
                        $("#clsfOfPostInsp").val(t.clsfOfPostInsp);

                        //ngày hủy khai báo hải quan
                        var dateCancel = hq.formDateTime3(t.dateImpDclCan);
                        var timeCancel = hq.formDateHour(t.timeImpDclCan)
                        $("#dateImpDclCan").val(dateCancel + " " + timeCancel);

                        //ngày chuyển xử lý khai báo bằng tay
                        var dateTran = hq.formDateTime3(t.dTrfManPrImDcl);
                        var timeTran = hq.formDateHour(t.tTrfManPrImDcl)
                        $("#dTrfManPrImDcl").val(dateTran + " " + timeTran);

                        $('#txtarrDate').val(t.arrDate);

                        //Địa điểm xếp hàng
                        if (t.LoadingLocations != undefined && t.LoadingLocations != "" && t.LoadingLocations != null && t.LoadingLocations.length > 0) {
                            $('#hdfloadLocCd,#txtloadLocCd').val(t.LoadingLocations[0].loadLocCd);
                            $('#txtloadLocNm').val(t.LoadingLocations[0].loadLocNm);
                        }
                        else {
                            $('#hdfloadLocCd,#txtloadLocCd').val(t.loadLocCd);
                            $('#txtloadLocNm').val(t.loadLocNm);
                        }

                        //Địa điểm dỡ hàng
                        if (t.UnloadingPorts != undefined && t.UnloadingPorts != "" && t.UnloadingPorts != null && t.UnloadingPorts.length > 0) {
                            var unloadPordCd = t.UnloadingPorts[0].unloadPortCd;
                            if (unloadPordCd.length > 3) unloadPordCd = unloadPordCd.substring(unloadPordCd.length - 3, unloadPordCd.length);

                            $('#hdfunloadPortCd,#txtunloadPortCd').val(unloadPordCd);
                            $("#txtunloadPortNm").val(t.UnloadingPorts[0].unloadPortNm);
                        }
                        else {
                            var unloadPordCd = t.unloadPortCd;
                            if (unloadPordCd.length > 3) unloadPordCd = unloadPordCd.substring(unloadPordCd.length - 3, unloadPordCd.length);
                            $('#hdfunloadPortCd,#txtunloadPortCd').val(t.unloadPortCd);
                            $("#txtunloadPortNm").val(t.unloadPortNm);
                        }

                        $('#txtmarksAndNos').val(t.marksAndNos);
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtArrDateOfTrs').val(hq.formDateTime2(t.arrDateOfTrs));
                        $('#hdfcstWrhCd,#txtcstWrhCd').val(t.cstWrhCd);
                        if (t.CustomsWarehouses != null && t.CustomsWarehouses.length > 0) {
                            $('#txtcstWrhCd_text').val(t.CustomsWarehouses[0].cstWrhNm);
                        }
                        $('#slresultInsCd,#txtresultInsCd').val(t.resultInsCd);
                        $('#txtnoHandledCtn').val(t.noHandledCtn);

                        $("#txthdfcountryCd, #hdfcountryCd").val(t.countryCd);
                        $("#txtaddress1Street").val(t.address1Street);
                        $("#txtaddress2Street").val(t.address2Street);
                        $("#txtaddress3CityNm").val(t.address3CityNm);
                        $("#txtcountryNmAddress").val(t.countryNm);

                        if (t.otherLawCd != "" && t.otherLawCd != null) {
                            var item = t.otherLawCd.split(';');
                            $("#hdfotherLawCd1").val(item[0]);
                            $("#hdfotherLawCd2").val(item[1]);
                            $("#hdfotherLawCd3").val(item[2]);
                            $("#hdfotherLawCd4").val(item[3]);
                            $("#hdfotherLawCd5").val(item[4]);
                            $.each(t.Documments, function (index, value) {
                                if (value.docummentId == item[0]) {
                                    $('#txtotherLawCd1').val(value.docummentName);
                                }
                                if (value.docummentId == item[1]) {
                                    $('#txtotherLawCd2').val(value.docummentName);
                                }
                                if (value.docummentId == item[2]) {
                                    $('#txtotherLawCd3').val(value.docummentName);
                                }
                                if (value.docummentId == item[3]) {
                                    $('#txtotherLawCd4').val(value.docummentName);
                                }
                                if (value.docummentId == item[4]) {
                                    $('#txtotherLawCd5').val(value.docummentName);
                                }
                            });
                        }

                        if (t.permitType != undefined && t.permitType != null) {
                            if (t.permitType.length > 0) {
                                $.each(t.permitType, function (index, value) {
                                    $('#txtpermitType' + (index + 1)).val(value.permitLicNo);
                                    $('#slpermitType' + (index + 1)).val(value.permitLicNo);
                                });
                            }
                        }

                        if (t.adjDemarNm != undefined && t.adjDemarNm != null) {
                            if (t.adjDemarNm.length > 0) {
                                $.each(t.adjDemarNm, function (index, value) {
                                    $('#sladj' + (index + 1)).val(value.adjDemarNm);
                                    $('#slFeeCode' + (index + 1)).val(value.adjDemarCd);
                                    $('#slCurcyType' + (index + 1)).val(value.curCdOfEvaAmt);
                                    $('#txtValue' + (index + 1)).val(value.evaluatedAmt);
                                    $('#txtTotalValue' + (index + 1)).val(value.totalDisEva);
                                });
                            }
                        }
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destTransPlace);
                        $('#txtArrDateOfTrs').val(t.arrDateOfTrs);
                        $('#slinvClsCd').val(t.invClsCd);
                        $('#txtinvNo').val(t.invNo);
                        $('#txteleInvRecNo').val(t.eleInvRecNo);
                        $('#sltermOfPay').val(t.termOfPay);

                        //Trị giá hóa đơn
                        $('#slinvPrcCdtCd').val(t.invPrcCdtCd);
                        $('#slinvCurCd').val(t.invCurCd);
                        $('#slinvPrcKindCd').val(t.invPrcKindCd);

                        $('#txtinvDate').val(hq.formDateTime2(t.invDate));
                        $('#txttotalInvPrc').val(t.totalInvPrc);
                        $('#slvalDemarCd').val(t.valDemarCd);
                        $('#txtcompDclNo').val(t.compDclNo);
                        $('#slcurCdBasePrc').val(t.curCdBasePrc);
                        $('#txtbasePrcValAdj').val(t.basePrcValAdj);
                        $('#slfreightDemarCd').val(t.freightDemarCd);
                        $('#slinsDemarCd').val(t.insDemarCd);
                        $('#slfreightCurCd').val(t.freightCurCd);
                        $('#slinsCurCd').val(t.insCurCd);
                        $('#txtfreight').val(t.freight);
                        $('#txtinsAmt').val(t.insAmt);
                        $('#txtregNoIns').val(t.regNoIns);
                        $('#txtdetailsOfVal').val(t.detailsOfVal);
                        $('#txttotalDisTaxVal').val(t.totalDisTaxVal);
                        $('#txttaxPayer').val(t.taxPayer);
                        $('#slreasonCd,#txtreasonCd').val(t.reasonCd);
                        $('#hdfbankPayCd,#txtbankPayCd').val(t.bankPayCd);
                        if ((t.bankPayCd != null || t.secSupplBankCd != null) && t.Banks != undefined && t.Banks != null) {
                            $.each(t.Banks, function (index, value) {
                                if (value.bankCode == t.bankPayCd) {
                                    $('#txtbankPayCd_text').val(value.bankName);
                                }
                                if (value.bankCode == t.secSupplBankCd) {
                                    $('#txtsecSupplBankCd_text').val(value.bankName);
                                }
                            });
                        }

                        if (t.lsTransInfo != null && t.lsTransInfo.length > 0) {
                            $.each(t.lsTransInfo, function (index, value) {
                                txtTransshipmentPlace1
                                $('#slTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentarrDate' + (index + 1)).val(value.arrDateTrnLoc);
                                $('#txtTransshipmentStartDate' + (index + 1)).val(value.strDateTrnLoc);
                            });
                        }

                        $('#txtbankPayIssYear').val(t.bankPayIssYear);
                        $('#txtbankPaySign').val(t.bankPaySign);
                        $('#txtbankPayNo').val(t.bankPayNo);
                        $('#slextPayDueCd,#txtextPayDueCd').val(t.extPayDueCd);
                        $('#hdfsecSupplBankCd,#txtsecSupplBankCd').val(t.secSupplBankCd);
                        $('#txtissuedYear').val(t.issuedYear);
                        $('#txtsecBankSign').val(t.secBankSign);
                        $('#txtsecNo').val(t.secNo);
                        $('#txtpermitWrhDate').val(hq.formDateTime2(t.permitWrhDate));
                        $('#txtstrDateTrs').val(hq.formDateTime2(t.strDateTrs));
                        $('#txtcontractNumber').val(t.contractNumber);
                        $('#txtcontractDate').val(hq.formDateTime2(t.contractDate));
                        $('#txtexpiryDate').val(hq.formDateTime2(t.expiryDate));
                        $('#txtetpControlNo').val(t.etpControlNo);
                        $('#txtnotes').val(t.notes);
                        if (t.cargoNo != undefined && t.cargoNo != null) {
                            if (t.cargoNo.length > 0) {
                                $.each(t.cargoNo, function (index, value) {
                                    $('#txtcargoNo' + (index + 1)).val(value.cargoNo);
                                });
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

    //Chi tiết tờ khai GTC
    hq.getDeclarationDetail_HV = function () {
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
                    if (data.Data) {
                        console.log(data.Data);
                        var t = data.Data;
                        if (t.status != 0 && t.status != 1) {
                            $("#divTablehide").css("display", "");
                            $(".submited-ida").show();
                        }
                        $("input[name=rdGroupType][value=" + t.groupTypeId + "]").prop('checked', true);
                        $('#dclNoHQ').val(t.dclNo);
                        //$('#hdfdclNo').val(t.dclNo);
                        $("#txtDeclaration").text(t.dclNo);
                        $('#txtdclPlannedDate').val(t.dclPlannedDate);
                        $('#txttimeLimReExp').val(t.timeLimReExp);
                        $('#txtdclKindCd,#hdfdclKindCd').val(t.dclKindCd);
                        if (t.DeclarationKinds != null && t.DeclarationKinds.length > 0) {
                            $('#txtdclKindCd_text').val(t.DeclarationKinds[0].dclKindNm);
                        }
                        $('#txtinsClsCd').val(t.insClsCd);
                        $("#phan-luong").html(hq.PhanLuong(t.insClsCd));
                        if (t.dateOfPermit) {
                            $("#thong-quan").html("Thông quan");
                        }

                        if (t.CustomsOffices != undefined && t.CustomsOffices != null && t.CustomsOffices.length > 0) {
                            $('#txtcstOfficeNm').val(t.CustomsOffices[0].cstOfficeNm);
                            $('#txtcstOffice,#hdfcstOffice').val(t.CustomsOffices[0].cstOfficeCd);
                        }
                        else {
                            $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                            $('#txtcstOfficeNm').val(t.cstOfficeNm);
                        }
                        

                        $('#slmeansOfTrsCd').val(t.meansOfTrsCd);
                        $('#slTransport').val(t.transportCode);
                        $('#txttentativeDclNo').val(t.tentativeDclNo);
                        $('#slcargoClsCd').val(t.cargoClsCd);
                        $('#slclsOrg').val(t.clsOrg);
                        $('#slcstSubSection').val(t.cstSubSection);
                        $('#txtimperCd').val(t.imperCd);
                        $('#txtimperNm').val(t.imperNm);
                        $('#txtpostcode').val(t.postcode);
                        $('#txtphoneNoOfImp').val(t.phoneNoOfImp);
                        $('#txtaddressOfImp').val(t.addressOfImp);
                        $('#txtimpCtrCd').val(t.impCtrCd);
                        $('#txtimpCtrNm').val(t.impCtrNm);
                        $('#txtconsignorCd').val(t.consignorCd);
                        $('#txtconsignorNm').val(t.consignorNm);
                        $('#txtpostcodeIdt').val(t.postcodeIdt);
                        $('#txtcountryCd,#hdfcountryCd').val(t.countryCd);
                        if (t.Countrys != null && t.Countrys.length > 0) {
                            $('#txtcountryNm').val(t.Countrys[0].countryName);
                        }

                        $('#hdfpieceUnitCd').val(t.pieceUnitCd);
                        if (t.QuantityUnits != null && t.QuantityUnits.length > 0) {
                            $('#txtpieceUnitCd_text').val(t.QuantityUnits[0].quanUnitNm);
                        }

                        $('#txtloadVesselAcNm').val(t.loadVesselAcNm);
                        $('#hdfTransport,#txtTransport').val(t.loadVesselCd);

                        $('#txtexportCsgNm').val(t.exportCsgNm);
                        $('#txtplannedDeclCd').val(t.plannedDeclCd);
                        $('#txtcargoPiece').val(t.cargoPiece);

                        $('#txtcargoWeigGrs').val(t.cargoWeigGrs);
                        $('#hdfweigUnitCdGrs').val(t.weigUnitCdGrs);
                        if (t.WeightUnits != null && t.WeightUnits.length > 0) {
                            $('#txtweigUnitCdGrs').val(t.WeightUnits[0].weigUnitNm);
                        }
                        $('#txtimperCd').val(t.imperCd);

                        $('#txttotalTaxVal').val(t.totalTaxVal);
                        $('#txtinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txttaxSubjectCd').val(t.taxSubjectCd);
                        $('#txttaxSubjectNm').val(t.taxSubjectNm);
                        $('#txttotalTaxAmt').val(t.totalTaxAmt);
                        $('#txtnoColTotalTax').val(t.noColTotalTax);
                        $('#txttotalPayTax').val(t.totalPayTax);
                        $('#txtsecAmt').val(t.secAmt);
                        $('#txtcurCd').val(t.curCd);
                        //$('#txtcurExcRate').val(t.curExcRate);
                        //$('#slpaymentCls').val(t.TermOfPayments[0].termOfPay);
                        $('#txtstructure').val(t.structure);
                        $('#txtnoOfDclColumn').val(t.noOfDclColumn);
                        $('#txtrepTaxCd').val(t.repTaxCd);
                        $('#slDestinationTrs').val(t.destinationTrs);
                        $('#slresultInsCd').val(t.resultInsCd);

                        $('#txtarrDate').val(t.arrDate);
                        $('#hdfloadLocCd,#txtloadLocCd').val(t.loadLocCd);
                        $('#txtloadLocNm').val(t.loadLocNm);
                        $('#txtunloadPortNm').val(t.unloadPortNm);
                        $('#hdfunloadPortCd,#txtunloadPortCd').val(t.unloadPortCd);
                        $('#txtmarksAndNos').val(t.marksAndNos);
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtArrDateOfTrs').val(hq.formDateTime2(t.arrDateOfTrs));
                        $('#hdfcstWrhCd,#txtcstWrhCd').val(t.cstWrhCd);
                        if (t.CustomsWarehouses != null && t.CustomsWarehouses.length > 0) {
                            $('#txtcstWrhCd_text').val(t.CustomsWarehouses[0].cstWrhNm);
                        }
                        $('#slresultInsCd,#txtresultInsCd').val(t.resultInsCd);
                        $('#txtnoHandledCtn').val(t.noHandledCtn);
                        $("#txtaddress1Street").val(t.address1Street);
                        $("#txtaddress2Street").val(t.address2Street);
                        $("#txtaddress3CityNm").val(t.address3CityNm);
                        //$("#txtcountryNm").val(t.countryNm);

                        if (t.Documments != undefined && t.Documments != null) {
                            if (t.Documments.length > 0) {
                                $.each(t.Documments, function (index, value) {
                                    $('#txtotherLawCd' + (index + 1)).val(value.docummentName);
                                    $('#hdfotherLawCd' + (index + 1)).val(value.docummentCode);
                                });
                            }
                        }

                        if (t.PermitTypes != undefined && t.PermitTypes != null) {
                            if (t.PermitTypes.length > 0) {
                                $.each(t.PermitTypes, function (index, value) {
                                    $('#txtpermitType' + (index + 1)).val(value.permitName);
                                    $('#slpermitType' + (index + 1)).val(value.permitType);
                                });
                            }
                        }

                        if (t.lsAdjDemar != undefined && t.lsAdjDemar != null) {
                            if (t.lsAdjDemar.length > 0) {
                                $.each(t.lsAdjDemar, function (index, value) {
                                    $('#sladj' + (index + 1)).val(value.adjDemarNm);
                                    $('#slFeeCode' + (index + 1)).val(value.adjDemarCd);
                                    $('#slCurcyType' + (index + 1)).val(value.curCdOfEvaAmt);
                                    $('#txtValue' + (index + 1)).val(value.evaluatedAmt);
                                    $('#txtTotalValue' + (index + 1)).val(value.totalDisEva);
                                });
                            }
                        }
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtdestarrDate').val(t.arrDateOfTrs);
                        $('#slinvClsCd').val(t.invClsCd);
                        $('#txtinvNo').val(t.invNo);
                        $('#txteleInvRecNo').val(t.eleInvRecNo);
                        $('#sltermOfPay').val(t.termOfPay);
                        $('#slinvPrcCdtCd').val(t.invPrcCdtCd);
                        $('#slinvCurCd').val(t.invCurCd);
                        $('#slinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txtinvDate').val(hq.formDateTime2(t.invDate));
                        $('#txttotalInvPrc').val(t.totalInvPrc);
                        $('#slvalDemarCd').val(t.valDemarCd);
                        $('#txtcompDclNo').val(t.compDclNo);
                        $('#slcurCdBasePrc').val(t.curCdBasePrc);
                        $('#txtbasePrcValAdj').val(t.basePrcValAdj);
                        $('#slfreightDemarCd').val(t.freightDemarCd);
                        $('#slinsDemarCd').val(t.insDemarCd);
                        $('#slfreightCurCd').val(t.freightCurCd);
                        $('#slinsCurCd').val(t.insCurCd);
                        $('#txtfreight').val(t.freight);
                        $('#txtinsAmt').val(t.insAmt);
                        $('#txtregNoIns').val(t.regNoIns);
                        $('#txtdetailsOfVal').val(t.detailsOfVal);
                        $('#txttotalDisTaxVal').val(t.totalDisTaxVal);
                        $('#txttaxPayer').val(t.taxPayer);
                        $('#slreasonCd,#txtreasonCd').val(t.reasonCd);
                        $('#hdfbankPayCd,#txtbankPayCd').val(t.bankPayCd);
                        //if ((t.bankPayCd != null || t.secSupplBankCd != null) && t.Banks.length > 0) {
                        //$.each(t.Banks, function (index, value) {
                        //if (value.bankCode == t.bankPayCd) {
                        //$('#txtbankPayCd_text').val(value.bankName);
                        //}
                        //if (value.bankCode == t.secSupplBankCd) {
                        //$('#txtsecSupplBankCd_text').val(value.bankName);
                        //}
                        //});
                        //}

                        if (t.lsCurrency != undefined && t.lsCurrency != null) {
                            if (t.lsCurrency.length > 0) {
                                $.each(t.lsCurrency, function (index, value) {
                                    $('#txtcurCd' + (index + 1)).val(value.curCd);
                                    $('#txtcurExcRate' + (index + 1)).val(value.curExcRate);
                                });
                            }
                        }

                        if (t.lsTaxInfo != undefined && t.lsTaxInfo != null) {
                            if (t.lsTaxInfo.length > 0) {
                                $.each(t.lsTaxInfo, function (index, value) {
                                    $('#txttaxSubjectCd' + (index + 1)).val(value.taxSubjectCd);
                                    $('#txttaxSubjectNm' + (index + 1)).val(value.taxSubjectNm);
                                    $('#txtnoColTotalTax' + (index + 1)).val(value.noColTotalTax);
                                    $('#txtoTaxRdcAmt' + (index + 1)).val(value.oTaxCerAmt);
                                });
                            }
                        }
                        if (t.lsTransInfo != null && t.lsTransInfo.length > 0) {
                            $.each(t.lsTransInfo, function (index, value) {
                                txtTransshipmentPlace1
                                $('#slTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentarrDate' + (index + 1)).val(value.arrDateTrnLoc);
                                $('#txtTransshipmentStartDate' + (index + 1)).val(value.strDateTrnLoc);
                            });
                        }
                        $("#txtdateOfPermit").val(hq.formDateTime3(t.dateOfPermit));
                        $("#txttimeOfPermit").val(hq.formTime(t.timeOfPermit));
                        $("#txtdateCmplInsp").val(hq.formDateTime3(t.dateCmplInsp));
                        $("#txttimeCmplInsp").val(hq.formTime(t.timeCmplInsp));
                        $("#txtclsfOfPostInsp").val(t.clsfOfPostInsp);
                        $("#txtbpApprovalDate").val(hq.formDateTime3(t.bpApprovalDate));
                        $("#txtbpApprovalTime").val(hq.formTime(t.bpApprovalTime));
                        $("#txtbpInspCmplDate").val(hq.formDateTime3(t.bpInspCmplDate));
                        $("#txtbpInspCmplTime").val(hq.formTime(t.bpInspCmplTime));
                        $("#txtdateImpDclCan").val(hq.formDateTime3(t.dateImpDclCan));
                        $("#txttimeImpDclCan").val(hq.formTime(t.timeImpDclCan));
                        $("#txtdTrfManPrImDcl").val(t.dTrfManPrImDcl);
                        $("#txttTrfManPrImDcl").val(t.tTrfManPrImDcl);
                        $("#txtdDataEleRegis").val(hq.formDateTime3(t.dDataEleRegis));
                        $("#txttDataEleRegis").val(hq.formTime(t.tDataEleRegis));
                        $("#txtpIDataEleRegis").val(t.pIDataEleRegis);

                        $('#txtbankPayIssYear').val(t.bankPayIssYear);
                        $('#txtbankPaySign').val(t.bankPaySign);
                        $('#txtbankPayNo').val(t.bankPayNo);
                        $('#slextPayDueCd,#txtextPayDueCd').val(t.extPayDueCd);
                        $('#hdfsecSupplBankCd,#txtsecSupplBankCd').val(t.secSupplBankCd);
                        $('#txtissuedYear').val(t.issuedYear);
                        $('#txtsecBankSign').val(t.secBankSign);
                        $('#txtsecNo').val(t.secNo);
                        $('#txtpermitWrhDate').val(hq.formDateTime2(t.permitWrhDate));
                        $('#txtstrDateTrs').val(hq.formDateTime2(t.strDateTrs));
                        $('#txtcontractNumber').val(t.contractNumber);
                        $('#txtcontractDate').val(hq.formDateTime2(t.contractDate));
                        $('#txtexpiryDate').val(hq.formDateTime2(t.expiryDate));
                        $('#txtetpControlNo').val(t.etpControlNo);
                        $('#txtnotes').val(t.notes);
                        if (t.lsCargoNo != undefined && t.lsCargoNo != null) {
                            if (t.lsCargoNo.length > 0) {
                                $.each(t.lsCargoNo, function (index, value) {
                                    $('#txtcargoNo' + (index + 1)).val(value.cargoNo);
                                });
                            }
                        }
                    }
                    hq.vaOnchangedata();
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

    hq.getSeachDeclaration = function () {
        var denngay = new Date();
        var dd = denngay.getDate();
        var mm = denngay.getMonth() + 1; //January is 0!
        var yyyy = denngay.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        denngay = mm + '/' + dd + '/' + yyyy;
        tungay = mm + '/' + (dd - 1) + '/' + yyyy;
        var token = $('#hdfToken').val();
        var datepickerFrom = $('#datepickerFrom').val();
        if (datepickerFrom == undefined || datepickerFrom == "undefined" || datepickerFrom == "")
            datepickerFrom = tungay;
        var datepickerTo = $('#datepickerTo').val();
        if (datepickerTo == undefined || datepickerTo == "undefined" || datepickerTo == "")
            datepickerTo = denngay;
        var txtDeclaration = $('#txtDeclaration').val();
        if (txtDeclaration == '' || txtDeclaration == undefined || txtDeclaration == "undefined") { txtDeclaration = 0; }
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/Search",
            data: {
                declarationID: txtDeclaration,
                startdate: datepickerFrom,
                endDate: datepickerTo
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/Declaration_Search",
                        data: {},
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.declarationId) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.declarationId + "</td><td>" + hq.formDateTime(value.createdDate) + "</td><td>" + hq.selectedMethodCode(value.methodCode) + "</td><td>" + hq.selectedCustom(value.customCode) + "</td><td><a onclick='hq.SelectedDeclarationID(" + value.declarationId + ");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                                $('#datepickerFrom').val(datepickerFrom);
                                $('#datepickerTo').val(datepickerTo);
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Show box thêm hàng
    hq.ShowCommodity_Add = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Declaration/Commodity_Add",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                accounts.Unloading();
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                    $('#hdf_declarationID').val($('#hdfdclNo').val());
                    $("#titleHH").text("THÊM HÀNG HÓA VÀO TỜ KHAI");
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    hq.confirmAddProduct = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertProduct",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        accounts.Message("Thêm hàng vào tờ khai thành công!");
                        hq.getListProduct();
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

    hq.confirmReAddProduct = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertProduct",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        hq.getListProduct();
                        hq.ShowCommodity_Add();
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

    hq.GetAccountInfo = function () {
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
                        $('#txtCMND').val(data.Data.Accounts.identity);
                        $('#txtFullName,#txtimperNm').val(data.Data.Accounts.fullName);
                        $('#txtPhone,#txtphoneNoOfImp').val(data.Data.Accounts.mobile);
                        $('#txtAddress,#txtaddressOfImp').val(data.Data.Accounts.address);
                        if (data.Data.Accounts.vrfEmailStatus == 0) {
                            bootbox.alert("Bạn chưa xác thực tài khoản nên không thể thực hiện chức năng này!<br>Hệ thống tự chuyển về trang cập nhật thông tin sau 3s...");
                            setTimeout(function () { window.location.href = Config.Url_Root + "home/UpdateInfo"; }, 3000);
                        }
                        if (data.Data.Accounts.identity == null || data.Data.Accounts.fullName == null || data.Data.Accounts.mobile == null || data.Data.Accounts.address == null) {
                            bootbox.alert("Bạn chưa cập nhật đầy đủ thông tin tài khoản nên không thể thực hiện chức năng này!<br>Hệ thống tự chuyển về trang cập nhật thông tin sau 3s...");
                            setTimeout(function () { window.location.href = Config.Url_Root + "home/UpdateInfo"; }, 3000);
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

    //Tạo tờ khai
    hq.confirmInsertDeclaration = function () {
        var token = $('#hdfToken').val();

        var dc1 = $("#txtaddress1Street").val();
        var dc2 = $("#txtaddress2Street").val();
        var dc3 = $("#txtaddress3CityNm").val();
        var dc4 = $("#txtcountryNm").val();
        if (dc1 == "" && dc2 == "" && dc3 == "" && dc4 == "") {
            accounts.Message("Địa chỉ bắt buộc phải nhập ít nhất 1 ô");
            return;
        }

        if ($("#slfreightDemarCd").val() != "" && $("#slfreightCurCd").val() != "" && $("#txtfreight").val() == "") {
            accounts.Message("Bạn chưa điền phí vận chuyển");
            return;
        }

        if ($("#slinsDemarCd").val() != "" && $("#slinsCurCd").val() != "" && $("#txtinsAmt").val() == "") {
            accounts.Message("Bạn chưa điền phí bảo hiểm");
            return;
        }

        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertDeclaration",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("confirmInsertDeclaration: ", data.Data.Declarations.dclId);
                if (data != null && data != '') {
                    if (data.ResponseCode > 0) {
                        bootbox.alert("Thành công", function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_Detail?decID=" + data.Data.Declarations.dclId + "&status=" + data.Data.Declarations.status + "&type=" + data.Data.Declarations.type;
                        });
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

    //Cập nhật tờ khai
    hq.confirmUpDateDeclaration = function (isMIE) {
        var token = $('#hdfToken').val();

        var dc1 = $("#txtaddress1Street").val();
        var dc2 = $("#txtaddress2Street").val();
        var dc3 = $("#txtaddress3CityNm").val();
        var dc4 = $("#txtcountryNm").val();
        if (dc1 == "" && dc2 == "" && dc3 == "" && dc4 == "") {
            accounts.Message("Địa chỉ bắt buộc phải nhập ít nhất 1 ô");
            return;
        }

        if ($("#slfreightDemarCd").val() != "" && $("#slfreightCurCd").val() != "" && $("#txtfreight").val() == "") {
            accounts.Message("Bạn chưa điền phí vận chuyển");
            return;
        }

        if ($("#slinsDemarCd").val() != "" && $("#slinsCurCd").val() != "" && $("#txtinsAmt").val() == "") {
            accounts.Message("Bạn chưa điền phí bảo hiểm");
            return;
        }

        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/UpdateDeclaration",
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
                        bootbox.alert("Thành công", function () {
                            if (isMIE != undefined && isMIE == 1) {
                                location.reload();
                            }
                            else {
                                window.location.href = Config.Url_Root + "Declaration/Declaration_Detail?decID=" + data.Data.Declarations.dclId + "&status=" + data.Data.Declarations.status + "&type=" + data.Data.Declarations.type;
                            }
                        });
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

    //Trang Danh sách sản phẩm
    hq.getListProduct = function () {
        var token = $('#hdfToken').val();
        var declarationID = $('#hdfdclNo').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProduct",
            data: {
                declarationID: declarationID
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                $('#listContainer tbody').html("");
                if (data) {
                    if (data.Data) {
                        $.each(data.Data, function (index, value) {
                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.ProductName + "</td><td>" + value.CountryCode + "</td><td>" + hq.formatMoney(value.Quantity) + "</td><td>" + value.Unit + "</td><td>" + value.TaxRate + "</td><td>" + hq.formatMoney(value.Price) + "</td><td><a onclick='' class='btn btn-warning'>Sửa</a><a onclick='' class='btn btn-danger'>Xóa</a></td></tr>");
                        });
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    /////////////////////////////////////////////////////
    //----------Tờ khai Giá trị cao---------------------
    //Show popup Add new hàng hóa
    hq.ShowCommodityHV_Add = function (productID) {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Declaration/CommodityHighValue_Add",
            data: {
                productID: productID
            },
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopupAdd(data, 650, 1000);
                    $('#hdf_declarationID').val($('#hdfdclNo').val());
                    $("#titleHH").text("THÊM HÀNG HÓA VÀO TỜ KHAI");
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //
    hq.ShowCommodityHV_Detail = function (productID) {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Declaration/CommodityHighValue_Detail",
            data: {
                productID: productID
            },
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopupAdd(data, 650, 1000);
                    $('#hdf_declarationID').val($('#hdfdclNo').val());
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //Thêm hàng hóa
    hq.confirmAddProduct_HV = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertHighProduct",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        accounts.Message("Thêm hàng vào tờ khai thành công!");
                        hq.getListProduct_HV();
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

    //ReAdd Product
    hq.confirmReAddProduct_HV = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertHighProduct",
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
                        hq.getListProduct_HV();
                        hq.ShowCommodityHV_Add(1);
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

    //Trang Danh sách sản phẩm
    hq.getListProduct_HV = function () {
        var token = $('#hdfToken').val();
        var declarationID = $('#hdfdclNo').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchHighProduct",
            data: {
                declarationID: declarationID
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#listContainer tbody').html("");
                if (data) {
                    if (data.Data) {
                        $.each(data.Data, function (index, value) {
                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td><a onclick='hq.getProductDetail(" + value.productId + ")'>" + value.hSCd + "</a></td><td>" + value.itemName + "</td><td>" + value.placeOriginCd + "</td><td>" + value.qtt1 + "</td><td>" + value.qtt2 + "</td><td>" + value.qttUnitCd1 + "</td><td>" + value.invUnitPrice + "</td><td>" + value.unitPriceCurCd + "</td><td>" + value.invValue + "</td><td>" + value.cstValue + "</td><td>" + value.importTaxClfCd + "</td><td>" + value.dutyRate + "</td><td>" + value.rdcImpTaxCd + "</td><td>" + value.rdcAmtImpTax + "</td>" + hq.checkUndefined(value.oTaxTypeCd) + "<td><a onclick='hq.getEditProductDetail(" + value.productId + ")' class='btn btn-warning'>Sửa</a><a onclick='hq.deleteProduct(" + value.productId + ")' class='btn btn-danger'>Xóa</a></td></tr>");
                        });
                        //formatDataTable();
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.checkUndefined = function (datacheck) {
        var html = "";
        if (datacheck == undefined) {
            return html = "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
        }
        else {
            if (datacheck.length == 0 || datacheck.length == 1) {
                return html = "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
            }
            if (datacheck.length == 2) {
                return html = "<td>" + datacheck[1].oTaxTypeCd + "</td> <td></td> <td>" + datacheck[1].oTaxRdcCd + "</td> <td>" + datacheck[1].oTaxRdcAmt + "</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>";
            }
            if (datacheck.length == 3) {
                return html = "<td>" + datacheck[1].oTaxTypeCd + "</td> <td></td> <td>" + datacheck[1].oTaxRdcCd + "</td> <td>" + datacheck[1].oTaxRdcAmt + "</td><td>" + datacheck[2].oTaxTypeCd + "</td><td></td><td>" + datacheck[2].oTaxRdcCd + "</td><td>" + datacheck[2].oTaxRdcAmt + "</td><td></td><td></td><td></td><td></td>";
            }
            if (datacheck.length == 4 || datacheck.length == 5) {
                return html = "<td>" + datacheck[1].oTaxTypeCd + "</td> <td></td> <td>" + datacheck[1].oTaxRdcCd + "</td> <td>" + datacheck[1].oTaxRdcAmt + "</td><td>" + datacheck[2].oTaxTypeCd + "</td><td></td><td>" + datacheck[2].oTaxRdcCd + "</td><td>" + datacheck[2].oTaxRdcAmt + "</td><td>" + datacheck[3].oTaxTypeCd + "</td><td></td><td>" + datacheck[3].oTaxRdcCd + "</td><td>" + datacheck[3].oTaxRdcAmt + "</td>";
            }
        }
    }

    //Tạo tờ khai
    hq.confirmInsertDeclaration_HV = function () {
        $('#hdfdataFileDocsInput1').val($('#fileinputdocs1').val());
        $('#hdfdataFileDocsInput2').val($('#fileinputdocs2').val());
        $('#hdfdataFileDocsInput3').val($('#fileinputdocs3').val());

        if ($('#slfreightDemarCd').val() != "" && $('#slfreightCurCd').val() != "" && $('#txtfreight').val() == "") {
            accounts.Message("Bạn chưa nhập phí vận chuyển!");
            location.href = "#txtfreight";
            return;
        }

        if ($('#slinsDemarCd').val() != "" && $('#slinsCurCd').val() != "" && $('#txtinsAmt').val() == "") {
            accounts.Message("Bạn chưa nhập phí bảo hiểm!");
            location.href = "#txtinsAmt";
            return;
        }

        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertHighDeclaration",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                //debugger;
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        window.location.href = Config.Url_Root + "Declaration/CommodityHighValue_List?decID=" + data.Data.Declarations.dclId;
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

    //Cập nhật tờ khai
    hq.confirmUpdateDeclaration_HV = function () {
        $('#hdfdataFileDocsInput1').val($('#fileinputdocs1').val());
        $('#hdfdataFileDocsInput2').val($('#fileinputdocs2').val());
        $('#hdfdataFileDocsInput3').val($('#fileinputdocs3').val());

        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/UpdateHighDeclaration",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                accounts.Unloading();
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        window.location.href = Config.Url_Root + "Declaration/DeclarationHighValue_Detail?decID=" + data.Data.Declarations.dclId;
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //>>------GET DATA DROPDOWNLIST------

    // Điều kiện giá hóa đơn
    hq.getInvoiceValueCondition = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInvoicePriceCondition",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvPrcCdtCd').append($('<option/>', {
                            value: value.invPrcCdtCd,
                            text: value.invPrcCdtCd + " || " + value.invPrcCdtNm
                        }));
                    })
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Phân loại hình thức hóa đơn
    hq.getInvoiceType = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInvoiceClassification",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvClsCd').append($('<option/>', {
                            value: value.invClsCd,
                            text: value.invClsCd + " || " + value.invClsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại giá hóa đơn
    hq.getinvPrcKindCd = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInvoicePriceKind",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvPrcKindCd').append($('<option/>', {
                            value: value.invPrcKindCd,
                            text: value.invPrcKindCd + " || " + value.invPrcKindNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Danh sách loại tiền
    hq.getCurrency2 = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCurrency",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvCurCd').append($('<option/>', {
                            value: value.currencyCode,
                            text: value.currencyCode + " || " + value.currencyName
                        }));
                        $('#slcurCdBasePrc,#slfreightCurCd,#slinsCurCd,#slCurcyType1,#slCurcyType2,#slCurcyType3,#slCurcyType4,#slCurcyType5').append($('<option/>', {
                            value: value.currencyCode,
                            text: (value.currencyCode + " (" + value.currencyName + ")")
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Danh sách loại tiền
    hq.getCurrency3 = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCurrency",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slCurrcyCode,#slCurrcyCode2').append($('<option/>', {
                            value: value.CurrencyCode,
                            text: value.Name
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.Currency3OnChange = function () {
        var txtCurrcyCode = $("#slCurrcyCode").val();
        $("#txtCurrcyCode").val(txtCurrcyCode);
    };

    // Mã Phân loại đính kèm
    hq.getInvoiceAttach = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetClassificationAttachment",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slTypefile1,#slTypefile2,#slTypefile3').append($('<option/>', {
                            value: value.clsAttachCd,
                            text: value.clsAttachCd + " || " + value.clsAttachNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Giấy phép nhập khẩu
    hq.getImportLicence = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetPermitType",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slpermitType1,#slpermitType2,#slpermitType3,#slpermitType4,#slpermitType5').append($('<option/>', {
                            value: value.permitType,
                            text: value.permitType + "||" + value.permitName,
                            name: value.permitName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.permitType1OnChange = function () {
        var txtpermitType1 = $("select[id='slpermitType1']").find("option:selected").attr("name");
        $("#txtpermitType1").val(txtpermitType1);
    };
    hq.permitType2OnChange = function () {
        var txtpermitType2 = $("select[id='slpermitType2']").find("option:selected").attr("name");
        $("#txtpermitType2").val(txtpermitType2);
    };
    hq.permitType3OnChange = function () {
        var txtpermitType3 = $("select[id='slpermitType3']").find("option:selected").attr("name");
        $("#txtpermitType3").val(txtpermitType3);
    };
    hq.permitType4OnChange = function () {
        var txtpermitType4 = $("select[id='slpermitType4']").find("option:selected").attr("name");
        $("#txtpermitType4").val(txtpermitType4);
    };
    hq.permitType5OnChange = function () {
        var txtpermitType5 = $("select[id='slpermitType5']").find("option:selected").attr("name");
        $("#txtpermitType5").val(txtpermitType5);
    };

    //onchange VN
    hq.vaOnchangedata = function () {
        var valuecheck = $("#slmeansOfTrsCd").val();
        if (valuecheck != 4 && valuecheck != 5) {
            var a = $("#txtunloadPortCd").val().replace("VN", "");
            $("#txtunloadPortCd").val(a);
            $("#hdfunloadPortCd").val(a);
        }
        else {
            var a = $("#txtunloadPortCd").val();
            var b = $("#hdfunloadPortCd").val();
            if (a.length == 3 && b.length == 3) {
                $("#txtunloadPortCd").val("VN" + a);
                $("#hdfunloadPortCd").val("VN" + b);
            }
        }
    }

    // Mã loại Phí vận chuyển
    hq.GetTransportFeeCodes = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetFreightDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slfreightDemarCd').append($('<option/>', {
                            value: value.freightDemarCd,
                            text: value.freightDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã loại Phí bảo hiểm
    hq.getInsuranceFeeCode = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInsuranceDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slinsDemarCd').append($('<option/>', {
                            value: value.insDemarCd,
                            text: value.insDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã ngân hàng
    hq.getBank = function (bankId, p) {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetBank",
            data: {
                bankId: bankId,
                bankCode: "",
                bankName: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0) {
                    if (data.Data.length > 0) {
                        if (p == 1) {
                            $('#txtbankPayCd_text').val(data.Data[0].customsName);
                        }
                        else {
                            $('#txtsecSupplBankCd_text').val(data.Data[0].customsName);
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

    // Mã lý do đề nghị bảo lãnh
    hq.getGuaranteeReasonCode = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetReason",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slreasonCd').append($('<option/>', {
                            value: value.reasonCd,
                            text: value.reasonCd + " || " + value.reasonNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.GuaranteeReasonOnChange = function () {
        var txtreasonCd = $("#slreasonCd").val();
        $("#txtreasonCd").val(txtreasonCd);
    };

    // Địa điểm trung chuyển
    hq.getTransportPlace = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetLocationTransport",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slTransshipmentPlace1,#slTransshipmentPlace2,#slTransshipmentPlace3,#sldestTransPlace,#slDestinationTrs').append($('<option/>', {
                            value: value.locTrs,
                            text: value.locTrs + " || " + value.locTrsName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.TransportPlace1OnChange = function () {
        var txtTransshipmentPlace1 = $("#slTransshipmentPlace1").val();
        $("#txtTransshipmentPlace1").val(txtTransshipmentPlace1);
    };
    hq.TransportPlace2OnChange = function () {
        var txtTransshipmentPlace2 = $("#slTransshipmentPlace2").val();
        $("#txtTransshipmentPlace2").val(txtTransshipmentPlace2);
    };
    hq.TransportPlace3OnChange = function () {
        var txtTransshipmentPlace3 = $("#slTransshipmentPlace3").val();
        $("#txtTransshipmentPlace3").val(txtTransshipmentPlace3);
    };
    hq.destTransPlaceOnChange = function () {
        var txtdestTransPlace = $("#sldestTransPlace").val();
        $("#txtdestTransPlace").val(txtdestTransPlace);
    };

    // Mã kết quả kiểm tra nội dung
    hq.getResult = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetResultCodeOfInspection",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slresultInsCd').append($('<option/>', {
                            value: value.resultInsCd,
                            text: value.resultInsCd + " || " + value.resultInsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.ResultOnChange = function () {
        var slresultInsCd = $("#slresultInsCd").val();
        $("#txtresultInsCd").val(slresultInsCd);
    };

    // Phân loại cá nhân tổ chức
    hq.getOrganizationType = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetClassificationOrganization",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slclsOrg').append($('<option/>', {
                            value: value.clsOrgCd,
                            text: value.clsOrgCd + " || " + value.clsOrgNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại hàng hóa
    hq.getcargoClsCdCode = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCargoClassification",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slcargoClsCd').append($('<option/>', {
                            value: value.cargoClsCd,
                            text: value.cargoClsCd + " || " + value.cargoClsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã tên
    hq.getAdjName = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetAdjustmentDemarcationName",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#sladj1,#sladj2,#sladj3,#sladj4,#sladj5').append($('<option/>', {
                            value: value.adjDemarNmCd,
                            text: value.adjDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại khai trị giá
    hq.getInvoiceValue = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetValuationDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slvalDemarCd').append($('<option/>', {
                            value: value.valDemarCd,
                            text: value.valDemarCd + " || " + value.valDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại
    hq.getAdjustmentCode = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetAdjustmentDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slFeeCode1,#slFeeCode2,#slFeeCode3,#slFeeCode4,#slFeeCode5').append($('<option/>', {
                            value: value.adjDemarCd,
                            text: value.adjDemarCd + " || " + value.adjDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã bộ phận xử lý tờ khai
    hq.getDepartment = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsSubSection",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slcstSubSection').append($('<option/>', {
                            value: value.cstSubCd,
                            text: value.cstSubCd + " || " + value.cstSubNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Thông tin trung chuyển
    hq.getMethod_TC = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDeclarationKind",
            data: {
                dclKindCd: "",
                dclKindNm: "",
                dclKindCdOld: "",
                dclKindCdOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slTransshipmentPlace1,#slTransshipmentPlace2,#slTransshipmentPlace3').append($('<option/>', {
                            value: value.dclKindCd,
                            text: value.dclKindNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.countryOnChange = function () {
        var txtTransshipmentPlace1 = $("#slTransshipmentPlace1").val();
        $("#txtTransshipmentPlace1").val(txtTransshipmentPlace1);
    };
    hq.countryOnChange = function () {
        var txtTransshipmentPlace2 = $("#slTransshipmentPlace2").val();
        $("#txtTransshipmentPlace2").val(txtTransshipmentPlace2);
    };
    hq.countryOnChange = function () {
        var txtTransshipmentPlace3 = $("#slTransshipmentPlace3").val();
        $("#txtTransshipmentPlace3").val(txtTransshipmentPlace3);
    };

    // Mã xác định thời hạn nộp thuế
    hq.getTaxExpiration = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetExtendingPaymentDueDate",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slextPayDueCd').append($('<option/>', {
                            value: value.extPayDueCd,
                            text: value.extPayDueCd + " || " + value.extPayDueNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.TaxExpirationOnChange = function () {
        var txtextPayDueCd = $("#slextPayDueCd").val();
        $("#txtextPayDueCd").val(txtextPayDueCd);
    };

    ///////////////////////////////////////////////////

    //Lấy danh hải quan
    hq.getCustoms = function (customsCode) {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustoms",
            data: {
                customsId: "",
                province: "",
                customsName: "",
                customsCode: customsCode,
                ctsNameOld: "",
                ctsCodeOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.ResponseCode > 0) {
                    if (data.Data.length > 0)
                        $('#txtcstOfficeNm').val(data.Data[0].customsName);
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.CustomsOnChange = function () {
        var txtcstOffice = $("#slCustom").val();
        $("#txtcstOffice").val(txtcstOffice);
    };

    //Lấy danh sách phương thức vận chuyển
    hq.getVehicleMethod = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetVehicleMethod",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slTransport').append($('<option/>', {
                            value: value.VehicleMethod,
                            text: value.Name
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Phương thức thanh toán
    hq.getMethodPaid = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTermOfPayment",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#sltermOfPay,#slpaymentCls').append($('<option/>', {
                            value: value.termOfPay,
                            text: value.termOfPay + " || " + value.termOfPayNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //chọn số lượng kiện
    hq.TypeNumberOnChange = function () {
        var txtNumber = $("#slTypeNumber").val();
        $("#txtNumber").val(txtNumber);
    };

    //chọn tổng trọng lượng
    hq.GrossOnChange = function () {
        var txtGross = $("#slGross").val();
        $("#txtGross").val(txtGross);
    };

    //danh sách loại sản phẩm
    hq.getProductType = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProductType",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slProductType').append($('<option/>', {
                            value: value.ProductType,
                            text: value.Name
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Nhóm loại hình
    hq.getGroupType = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetGroupType",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        if (index == 0) {
                            $('div#grType').append("<label style=\"display:inline-block\"><input type=\"radio\" id=\"rdGroupType" + (index + 1) + "\" checked name=\"rdGroupType\" value=\"" + value.groupTypeId + "\" /> " + value.groupTypeName + "</label>");
                        }
                        else {
                            $('div#grType').append("<label style=\"display:inline-block\"><input type=\"radio\" id=\"rdGroupType" + (index + 1) + "\" name=\"rdGroupType\" value=\"" + value.groupTypeId + "\" /> " + value.groupTypeName + "</label>");
                        }
                    });

                    $.each(data.Data, function (index, value) {
                        $('#grType').append($('<option/>', {
                            value: value.groupTypeId,
                            text: value.groupTypeName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phương thức vận chuyển
    hq.getmeansOfTrsCd = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetMeansOfTransportation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slmeansOfTrsCd').append($('<option/>', {
                            value: value.meansOfTrsCd,
                            text: value.meansOfTrsCd + " || " + value.meansOfTrsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.selectedMethodCode = function (code) {
        var str = code;
        if (str == undefined || str == null) {
            return "";
        }

        if (_dataMethodCode.length > 0) {
            $.each(_dataMethodCode, function (index, value) {
                if (value.MethodCode == code) {
                    str = value.Name;
                }
            });
        }
        return str;
    };

    hq.selectedCustom = function (code) {
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

    hq.selectedCountry = function (code) {
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

    hq.formDateTime2 = function (date) {
        if (date == null || date == undefined)
            return "";
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        return currMonth + "/" + currDate
            + "/" + currYear;
    };

    hq.formDateTime = function (date) {
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        var currHours = d.getHours();
        var currMinutes = d.getMinutes();
        return currMonth + "/" + currDate
            + "/" + currYear + " " + currHours + ":" + currMinutes;
    };

    hq.formDateHour = function (date) {
        if (date == undefined || date == "" || date == null) {
            return "";
        }
        var h = date.substring(0, 2);
        var m = date.substring(2, 4);
        var s = date.substring(4, date.length);

        var time = h + ":" + m + ":" + s;

        return time;
    };

    //ngày tháng liền nhau ddMMyyyy
    hq.formDateTime3 = function (date) {
        if (date == undefined || date == "" || date == null) {
            return "";
        }
        var d = date.substring(0, 2);
        var m = date.substring(2, 4);
        var y = date.substring(4, date.length);

        var time = d + "/" + m + "/" + y;

        return time;
    };
    hq.formTime = function (time) {
        if (time == undefined || time == "" || time == null) {
            return "";
        }
        var h = time.substring(0, 2);
        var m = time.substring(2, 4);
        var s = time.substring(4, time.length);

        var time = h + ":" + m + ":" + s;

        return time;
    };

    hq.formatMoney = function (argValue) {
        var comma = (1 / 2 + '').charAt(1);
        var digit = ',';
        if (comma == '.') {
            digit = '.';
        }

        var sSign = "";
        if (argValue < 0) {
            sSign = "-";
            argValue = -argValue;
        }

        var sTemp = "" + argValue;
        var index = sTemp.indexOf(comma);
        var digitExt = "";
        if (index != -1) {
            digitExt = sTemp.substring(index + 1);
            sTemp = sTemp.substring(0, index);
        }

        var sReturn = "";
        while (sTemp.length > 3) {
            sReturn = digit + sTemp.substring(sTemp.length - 3) + sReturn;
            sTemp = sTemp.substring(0, sTemp.length - 3);
        }
        sReturn = sSign + sTemp + sReturn;
        if (digitExt.length > 0) {
            sReturn += comma + digitExt;
        }
        return sReturn;
    };

    hq.KeyPressTextboxBill = function (t) {
        var str = "";
        var stt = $(t).attr("data-stt");
        var txtWaybill = $("#txtWaybill" + stt).val();
        var txtDateWaybill = $("#txtDateWaybill" + stt).val();
        var txtHAWB = $("#txtHAWB" + stt).val();
        var txtMAWB = $("#txtMAWB" + stt).val();
        var flag = 1;
        if (txtWaybill == "") { $("#txtWaybill" + stt).addClass("error"); flag = 0; }
        else { $("#txtWaybill" + stt).removeClass("error"); flag = 1; }

        if (txtDateWaybill == "") { $("#txtDateWaybill" + stt).addClass("error"); flag = 0; }
        else { $("#txtDateWaybill" + stt).removeClass("error"); flag = 1; }

        if (txtHAWB == "") { $("#txtHAWB" + stt).addClass("error"); flag = 0; }
        else { $("#txtHAWB" + stt).removeClass("error"); flag = 1; }

        if (txtMAWB == "") { $("#txtMAWB" + stt).addClass("error"); flag = 0; }
        else { $("#txtMAWB" + stt).removeClass("error"); flag = 1; }
        //if (flag > 0)
        //{
        $("#txtWaybill" + (parseInt(stt) + 1)).removeAttr("disabled");
        $("#txtDateWaybill" + (parseInt(stt) + 1)).removeAttr("disabled");
        $("#txtHAWB" + (parseInt(stt) + 1)).removeAttr("disabled");
        $("#txtMAWB" + (parseInt(stt) + 1)).removeAttr("disabled");
        //}
        for (var i = 0; i < 30; i++) {
            if ($("#txtWaybill" + i).is(":disabled") == false) {
                txtWaybill = $("#txtWaybill" + i).val();
                txtDateWaybill = $("#txtDateWaybill" + i).val();
                txtHAWB = $("#txtHAWB" + i).val();
                txtMAWB = $("#txtMAWB" + i).val();
                if (txtWaybill != "" || txtDateWaybill != "" || txtHAWB != "" || txtMAWB != "")
                    str += txtWaybill + "," + txtDateWaybill + "," + txtHAWB + "," + txtMAWB + ";";
            }
        }
        $('#hdfBillLadingData').val(str);
    };

    //Next page
    hq.nextPage = function () {
        accounts.ShowLoading();
        setTimeout(function () {
            $('#btnNextPage').click();
            var count = 0;
            $('#divTab1 label.error').each(function () {
                if ($(this).is(':visible')) { count += 1; }
            })
            if (count == 0) {
                var tenXuatKhau = $("#txtconsignorNm").val();
                if (hq.CheckVietNamese(tenXuatKhau)) {
                    accounts.Message("Tên người xuất khẩu phải là kí tự hoa không dấu");
                    accounts.Unloading();
                    $('body,html').animate({ scrollTop: 1200 }, 800);
                    return;
                }

                if (!hq.checkAdress()) {
                    accounts.Message("Địa chỉ người xuất khẩu phải nhập ít nhất 1 ô và là ký tự hoa không dấu");
                    accounts.Unloading();
                    $('body,html').animate({ scrollTop: 1300 }, 800);
                    return;
                }

                $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                $('#btnTab2').removeClass("btn-success").addClass("btn-warning");
                $('#divTab2').removeClass("noneTab");
                $('#divTab1').addClass("noneTab");
                setTimeout(function () {
                    $('body,html').animate({ scrollTop: 0 }, 800);
                }, 500);
            }
            accounts.Unloading();
        }, 500);
    }

    hq.OnClickTabDeclaration = function (t) {
        accounts.ShowLoading();
        setTimeout(function () {
            if (t == 1) {
                $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                $('#btnTab1').removeClass("btn-success").addClass("btn-warning");
                $('#divTab1').removeClass("noneTab");
                $('#divTab2').addClass("noneTab");
            }
            else {
                $('#btnSaveDeclaration').click();
                var count = 0;
                $('#divTab1 label.error').each(function () {
                    if ($(this).is(':visible')) { count += 1; }
                })
                console.log(count);
                if (count == 0) {
                    var tenXuatKhau = $("#txtconsignorNm").val();
                    if (hq.CheckVietNamese(tenXuatKhau)) {
                        accounts.Message("Tên người xuất khẩu phải là kí tự hoa không dấu");
                        accounts.Unloading();
                        $('body,html').animate({ scrollTop: 1200 }, 800);
                        return;
                    }

                    if (!hq.checkAdress()) {
                        accounts.Message("Địa chỉ người xuất khẩu phải nhập ít nhất 1 ô và là ký tự hoa không dấu");
                        accounts.Unloading();
                        $('body,html').animate({ scrollTop: 1300 }, 800);
                        return;
                    }

                    $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                    $('#btnTab2').removeClass("btn-success").addClass("btn-warning");
                    $('#divTab2').removeClass("noneTab");
                    $('#divTab1').addClass("noneTab");
                    setTimeout(function () {
                        $('body,html').animate({ scrollTop: 0 }, 800);
                    }, 500);
                }
            }
            accounts.Unloading();
        }, 500);
    };

    hq.CheckUrl = function (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str);
    };

    hq.caseStatusDeclaration = function (str) {
        var _des = "";
        switch (str) {
            case 0:
                _des = "Đang thêm mới";
                break;
            case 1:
                _des = "Đang thêm mới";
                break;
            case 2:
                _des = "Đã gửi IDA";
                break;
            case 3:
                _des = "Đã gửi IDB";
                break;
            case 4:
                _des = "Đã gửi IDC";
                break;
            case 5:
                _des = "Đã gửi IDA01";
                break;
            case 6:
                _des = "Đã gửi IDD";
                break;
            case 7:
                _des = "Đã gửi IDE";
                break;
            case 8:
                _des = "Đã gửi MIC";
                break;
            case 9:
                _des = "Đã gửi MID";
                break;
            case 10:
                _des = "Đã gửi MIE";
                break;
            case -1:
                _des = "Đã hủy";
                break;
            default:
                _des = "--(" + str + ")--";
                break;
        }
        return _des;
    };
    //Get mã đơn vị tính
    hq.getWeightUnit = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetWeightUnit",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slqttUnitCd1,#slqttUnitCd2').append($('<option/>', {
                            value: value.weigUnitCd,
                            text: value.weigUnitCd + " || " + value.weigUnitNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Miễn giảm thuế không chịu nhập thuế

    //get mã đồng tiền
    hq.getCurrencys = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCurrency",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slcurCdAbsDuty, #slcstValueCurCd, #slunitPriceCurCd').append($('<option/>', {
                            value: value.currencyCode,
                            text: value.currencyCode
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Mã biểu thuế nhập khẩu
    hq.getImportTaxClassification = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetImportTaxClassification",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slimportTaxClfCd').append($('<option/>', {
                            value: value.importTaxClfCd,
                            text: value.importTaxClfCd + " || " + value.importTaxClfNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Đơn vị của đơn giá hóa đơn và số lượng
    hq.getQuantityUnit = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetQuantityUnit",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slpriceQttUnit').append($('<option/>', {
                            value: value.quanUnitCd,
                            text: value.quanUnitNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Mã đồng tiền trị giá tính thuế
    hq.getAbsoluteDutyRateUnit = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetAbsoluteDutyRateUnit",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slperUnitTaxCd,#slabsDutyUnitCd').append($('<option/>', {
                            value: value.absDutyUnitCd,
                            text: value.absDutyUnitCd
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //delete tờ khai
    hq.deleteDeclaration = function (declarationId) {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/DeleteDeclaration",
            data: {
                declarationId: declarationId
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        window.location.href = Config.Url_Root + "Declaration/Declaration_List";
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
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Update tờ khai
    hq.linkToUpdateform = function (declarationId, type) {
        window.location.href = Config.Url_Root + "Declaration/Declaration" + (type == 1 ? "" : "HighValue") + "_Update?decID=" + declarationId + "&type=" + type;
    }

    //Dialog Delete tờ khai
    hq.deleteSource = function (declarationId) {
        var token = $('#hdfToken').val();
        bootbox.dialog({
            title: "Xác nhận xóa tờ khai",
            message: 'Bạn có muốn xóa tờ khai có ID là:' + declarationId,
            buttons: {
                success: {
                    label: "Xác nhận",
                    className: "btn-danger",
                    callback: function () {
                        $.ajax({
                            type: 'GET',
                            url: Config.API_Login + "tax/DeleteDeclaration",
                            data: {
                                declarationId: declarationId
                            },
                            headers: {
                                "Authorization": "Bearer " + token
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                //console.log(data);
                                if (data != null && data != '' && data != undefined) {
                                    if (data.ResponseCode > 0) {
                                        window.location.href = Config.Url_Root + "Declaration/Declaration_List";
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
                                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                                return;
                            }
                        });
                    }
                }
            }
        })
    }
    hq.linkToUpdateProduct = function () {
        var id = $("#hdf_productID").val();
        accounts.ClosePopup();
        accounts.ShowLoading();
        setTimeout(function () {
            hq.getEditProductDetail(id);
        }, 800)
        accounts.Unloading();
    }
    // Chi tiết hàng hóa tờ khai
    hq.getEditProductDetail = function (productId) {
        setTimeout(function () {
            $("#typeUpdate").val(1);
        }, 900);
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProductDetail",
            data: {
                productId: productId
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data) {
                    hq.ShowCommodityHV_Add(2);
                    var t = data.Data
                    accounts.ShowLoading();
                    setTimeout(function () {
                        $("#titleHH").text("SỬA THÔNG TIN HÀNG HÓA CỦA TỜ KHAI");
                        $('#hdf_productID').val(t.productId);
                        $('#txthSCd').val(t.hSCd);
                        $('#txtmaterialCd').val(t.materialCd);
                        $('#txtdutyRate').val(t.dutyRate);
                        $('#txtabsTariffRate').val(t.absTariffRate);
                        $('#slabsDutyUnitCd').val(t.absDutyUnitCd);
                        $('#slcurCdAbsDuty').val(t.curCdAbsDuty);
                        $('#txtitemName').val(t.itemName);
                        $('#slplaceOriginCd').val(t.placeOriginCd);
                        $('#txtplaceOriginCd').val(t.placeOriginCd);
                        $('#txtcountryNmOrigin').val(t.oriPlaceNm);
                        $('#slimportTaxClfCd').val(t.importTaxClfCd);
                        $('#txttariffQuotaClf').val(t.tariffQuotaClf);
                        $('#slperUnitTaxCd').val(t.perUnitTaxCd);
                        $('#txtqtt1').val(t.qtt1);
                        $('#slqttUnitCd1').val(t.qttUnitCd1);
                        $('#txtqtt2').val(t.qtt2);
                        $('#slqttUnitCd2').val(t.qttUnitCd2);
                        $('#txtinvValue').val(t.invValue);
                        $('#txtinvUnitPrice').val(t.invUnitPrice);
                        $('#slunitPriceCurCd').val(t.unitPriceCurCd);
                        $('#slpriceQttUnit').val(t.priceQttUnit);
                        $('#txtcstValue').val(t.cstValue);
                        $('#slcstValueCurCd').val(t.cstValueCurCd);
                        $('#txtvaluationNo1').val(t.lsvaluationNo);
                        $('#txttenDclLineNo').val(t.tenDclLineNo);
                        $('#txttaxExpLsNo').val(t.taxExpLsNo);
                        $('#txttaxExpLsLineNo').val(t.taxExpLsLineNo);
                        $('#slrdcImpTaxCd').val(t.rdcImpTaxCd);
                        $('#txtrdcImpTaxCd').val(t.rdcImpTaxCd);
                        if (t.lsOtherTax != undefined && t.lsOtherTax != null) {
                            if (t.lsOtherTax.length > 0) {
                                $.each(t.lsOtherTax, function (index, value) {
                                    $('#txtoTaxTypeCd' + (index + 1)).val(value.oTaxTypeCd);
                                    $('#txtoTaxRdcCd' + (index + 1)).val(value.oTaxRdcCd);
                                    $('#txtoTaxRdcAmt' + (index + 1)).val(value.oTaxCerAmt);
                                    $('#sloTaxTypeCd' + (index + 1)).val(value.oTaxTypeCd);
                                    $('#sloTaxRdcCd' + (index + 1)).val(value.oTaxRdcCd);
                                    $('#sloTaxRdcAmt' + (index + 1)).val(value.cstOTaxAmt);
                                });
                            }
                        }
                    }, 1500);
                    accounts.Unloading();
                }
                accounts.Unloading();
            },
            error: function (data) {
                console.log(data);
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //update hàng hóa
    hq.getProductDetail = function (productId) {
        setTimeout(function () {
            $("#typeUpdate").val(2);
        }, 900);
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProductDetail",
            data: {
                productId: productId
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data)
                if (data) {
                    hq.ShowCommodityHV_Detail(2);
                    var t = data.Data
                    accounts.ShowLoading();
                    setTimeout(function () {
                        $("#titleHH").text("THÔNG TIN HÀNG HÓA");
                        $('#hdf_productID').val(t.productId);
                        $('#txthSCd').val(t.hSCd);
                        $('#txtmaterialCd').val(t.materialCd);
                        $('#txtdutyRate').val(t.dutyRate);
                        $('#txtabsTariffRate').val(t.absTariffRate);
                        $('#slabsDutyUnitCd').val(t.absDutyUnitCd);
                        $('#slcurCdAbsDuty').val(t.curCdAbsDuty);
                        $('#txtitemName').val(t.itemName);
                        $('#slplaceOriginCd').val(t.placeOriginCd);
                        $('#txtplaceOriginCd').val(t.placeOriginCd);
                        $('#txtcountryNmOrigin').val(t.placeOriginNm);
                        $('#slimportTaxClfCd').val(t.importTaxClfCd);
                        $('#txttariffQuotaClf').val(t.tariffQuotaClf);
                        $('#slperUnitTaxCd').val(t.perUnitTaxCd);
                        $('#txtqtt1').val(t.qtt1);
                        $('#slqttUnitCd1').val(t.qttUnitCd1);
                        $('#txtqtt2').val(t.qtt2);
                        $('#slqttUnitCd2').val(t.qttUnitCd2);
                        $('#txtinvValue').val(t.invValue);
                        $('#txtinvUnitPrice').val(t.invUnitPrice);
                        $('#slunitPriceCurCd').val(t.unitPriceCurCd);
                        $('#slpriceQttUnit').val(t.priceQttUnit);
                        $('#txtcstValue').val(t.cstValue);
                        $('#slcstValueCurCd').val(t.cstValueCurCd);
                        $('#txtvaluationNo1').val(t.lsvaluationNo);
                        $('#txttenDclLineNo').val(t.tenDclLineNo);
                        $('#txttaxExpLsNo').val(t.taxExpLsNo);
                        $('#txttaxExpLsLineNo').val(t.taxExpLsLineNo);
                        $('#slrdcImpTaxCd').val(t.rdcImpTaxCd);
                        $('#txtrdcImpTaxCd').val(t.rdcImpTaxCd);
                        $('#txtimpTaxAmt').val(t.impTaxAmt);
                        $('#txtrdcImpTaxAmt').val(t.rdcImpTaxAmt);
                        $('#txtimpTaxRateCd').val(t.impTaxRateCd);
                        $('#txtimpTaxRate').val(t.impTaxRate);
                        $('#txtimpTaxRateInp').val(t.impTaxRateInp);
                        $('#txtcstValSystem').val(t.cstValSystem);
                        $('#txttaxValManual').val(t.taxValManual);
                        if (t.lsOtherTax != undefined && t.lsOtherTax != null) {
                            if (t.lsOtherTax.length > 0) {
                                $.each(t.lsOtherTax, function (index, value) {
                                    $('#txtoTaxTypeCd' + (index + 1)).val(value.oTaxTypeCd);
                                    $('#txtoTaxRdcCd' + (index + 1)).val(value.oTaxRdcCd);
                                    $('#txtoTaxRdcAmt' + (index + 1)).val(value.oTaxCerAmt);
                                    $('#sloTaxTypeCd' + (index + 1)).val(value.oTaxTypeCd);
                                    $('#sloTaxRdcCd' + (index + 1)).val(value.oTaxRdcCd);
                                    $('#sloTaxRdcAmt' + (index + 1)).val(value.oTaxCerAmt);
                                    $("#txttaxRateOfOTax" + (index + 1)).val(value.taxRateOfOTax);
                                    $("#txtitemNmOTax" + (index + 1)).val(value.itemNmOTax);
                                    $("#txtoTaxCerAmt" + (index + 1)).val(value.oTaxCerAmt);
                                    $("#txtotherTaxAmt" + (index + 1)).val(value.otherTaxAmt);
                                    $("#txtprvOTaxInLaw" + (index + 1)).val(value.prvOTaxInLaw);
                                    $("#txtstdOTax" + (index + 1)).val(value.stdOTax);
                                    $("#txtstdOTaxUnitCd" + (index + 1)).val(value.stdOTaxUnitCd);
                                    $("#txtcstOTaxAmt" + (index + 1)).val(value.cstOTaxAmt);
                                });
                            }
                        }
                        $("div[id^='loginbox']").find("input,button,textarea,select").attr("disabled", "disabled");
                        $("#btnDelete").remove();
                        $("#btnviewUpdate").css("display", "");
                    }, 800);
                    accounts.Unloading();
                }
                accounts.Unloading();
            },
            error: function (data) {
                console.log(data);
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Update sản phẩm
    hq.confirmUpDateProduct = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/UpdateProduct",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                console.log(data);
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0 && data.Data != null && data.Data != undefined) {
                        //window.location.href = Config.Url_Root + "Declaration/CommodityHighValue_List?decID=" + data.Data;
                        location.reload();
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

    //Delete sản phẩm
    hq.deleteProduct = function (productId) {
        var token = $('#hdfToken').val();
        bootbox.dialog({
            title: "Xác nhận xóa hàng hóa",
            message: 'Bạn có muốn xóa hàng hóa có ID là:' + productId,
            buttons: {
                success: {
                    label: "Xác nhận",
                    className: "btn-danger",
                    callback: function () {
                        $.ajax({
                            type: 'GET',
                            url: Config.API_Login + "tax/DeleteProduct",
                            data: {
                                productId: productId
                            },
                            headers: {
                                "Authorization": "Bearer " + token
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                //console.log(data);
                                if (data != null && data != '' && data != undefined) {
                                    if (data.ResponseCode > 0) {
                                        //window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                                        location.reload();
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
                                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                                return;
                            }
                        });
                    }
                }
            }
        })
    }

    //Submit IDA
    hq.SubmitIDAHighValue = function (declarationID) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getotp",
            data: {
                type: 0
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.ResponseCode >= 0) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/SubmitIDAHighValue",
                        data: { declarationId: declarationID },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
                else {
                    bootbox.alert(data.Description);
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Confirm IDA
    hq.ConfirmIDAHighValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDAHighValue",
            data: JSON.stringify({
                "declarationId": declarationId,
                "otp": $('#txtOTP').val()
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
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        bootbox.alert(data.Description);
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Submit IDA high value new
    hq.newSubmitIDAHighValueSH = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDA",
            data: JSON.stringify({
                "declarationId": declarationId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                debugger;
                if (data) {
                    if (data.ResponseCode > 0) {
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        //bootbox.alert(data.Description);
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field);
                        }
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.newSubmitIDAHighValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        bootbox.dialog({
            title: "Xác nhận Submit IDA",
            message: 'Bạn có muốn submit IDA tờ khai có ID là:' + declarationId,
            buttons: {
                success: {
                    label: "Xác nhận",
                    className: "btn-danger",
                    callback: function () {
                        $.ajax({
                            type: 'POST',
                            url: Config.API_Login + "tax/SubmitIDA",
                            data: JSON.stringify({
                                "declarationId": declarationId,
                            }),
                            headers: {
                                "Authorization": "Bearer " + token
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                debugger;
                                if (data) {
                                    if (data.ResponseCode > 0) {
                                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                                        setTimeout(function () {
                                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                                        }, 2000);
                                    }
                                    else {
                                        //bootbox.alert(data.Description);
                                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                                            //hq2.ValidationFocus(data.Data.object[0].Field);

                                            bootbox.confirm({
                                                title: "THÔNG BÁO",
                                                message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                                buttons: {
                                                },
                                                callback: function () {
                                                }
                                            });

                                            var err = '';
                                            for (var i = 0; i < data.Data.object.length; i++) {
                                                err += '<tr><td>' + data.Data.object[i].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                                                err += '<td>' + data.Data.object[i].Disposition + '</td></tr>';
                                            }

                                            $("#giai-phap-submit").html(err);
                                        }
                                    }
                                    accounts.Unloading();
                                }
                            },
                            error: function (data) {
                                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                                return;
                            }
                        });
                    }
                }
            }
        })
        accounts.Unloading();
    };
    //Submit IDC High value
    hq.newSubmitIDCHighValueSH = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDC",
            data: JSON.stringify({
                "declarationId": declarationId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                debugger;
                if (data) {
                    if (data.ResponseCode > 0) {
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        //bootbox.alert(data.Description);
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field);
                        }
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.newSubmitIDCHighValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        bootbox.dialog({
            title: "Xác nhận Submit IDC",
            message: 'Bạn có muốn submit IDC tờ khai có ID là:' + declarationId,
            buttons: {
                success: {
                    label: "Xác nhận",
                    className: "btn-danger",
                    callback: function () {
                        $.ajax({
                            type: 'POST',
                            url: Config.API_Login + "tax/SubmitIDC",
                            data: JSON.stringify({
                                "declarationId": declarationId,
                            }),
                            headers: {
                                "Authorization": "Bearer " + token
                            },
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                console.log(data);
                                debugger;
                                if (data) {
                                    if (data.ResponseCode > 0) {
                                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                                        setTimeout(function () {
                                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                                        }, 2000);
                                    }
                                    else {
                                        //bootbox.alert(data.Description);
                                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                                            hq2.ValidationFocus(data.Data.object[0].Field);
                                        }
                                    }
                                    accounts.Unloading();
                                }
                            },
                            error: function (data) {
                                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                                return;
                            }
                        });
                    }
                }
            }
        })
        accounts.Unloading();
    };

    //IID submit high value
    hq.newSubmitIIDHighValue = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var dclNo = $("#txtdclNo").val();
        dclNo = dclNo.trim();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIID",
            data: JSON.stringify({
                "dclNo": dclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                accounts.Unloading();
                if (data) {
                    if (data.ResponseCode > 0) {
                        if (data.Data.type == 1) {
                            window.location.href = Config.Url_Root + "Declaration/DeclarationDetailIID?decID=" + data.Data.dclId + "&dclNo=" + data.Data.dclNo + "&type=1";
                        }
                        else {
                            window.location.href = Config.Url_Root + "Declaration/DeclarationHighValue_Detail?decID=" + data.Data.dclId + "&dclNo=" + data.Data.dclNo + "&type=2";
                        }
                    }
                    else if (data.ResponseCode == -100001) {
                        accounts.Message("Tờ khai không tồn tại");
                    }
                    else {
                        //bootbox.alert(data.Description);
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field);
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

    //Lơ value submit MIC
    hq.newSubmitIDALowValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitMIC",
            data: JSON.stringify({
                "declarationId": declarationId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                accounts.Unloading();
                if (data) {
                    console.log(data);
                    debugger;
                    if (data.ResponseCode > 0) {
                        bootbox.alert("Xác thực tờ khai thành công.", function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_Detail?decID=" + data.Data.dclId + "&status=" + data.Data.status + "&type=" + data.Data.type;
                        });
                    }
                    else if (data.ResponseCode == -99) {
                        bootbox.alert(data.Description);
                        accounts.Unloading();
                        return;
                    }
                    else {
                        //bootbox.alert(data.Description);
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field, 0);

                            bootbox.confirm({
                                title: "THÔNG BÁO",
                                message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                buttons: {
                                },
                                callback: function () {
                                }
                            });

                            var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                            err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';

                            $("#giai-phap-submit").html(err);
                        }
                        else {
                            bootbox.alert("Có lỗi xảy ra");
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

    //Submit MID giá trị thấp
    hq.SubmitMID = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();

        var dclNo = $("#txtdclNo").val();

        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitMID",
            data: JSON.stringify({
                "dclNo": dclNo,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                accounts.Unloading();

                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        //accouts.Message("");
                        window.location.href = Config.Url_Root + "Declaration/DecalrationMIE?decID=" + data.Data.dclId + "&dclNo=" + data.Data.dclNo + "&type=1&tab=3";
                    }
                    else if (data.ResponseCode == -100001) {
                        accounts.Message("Tờ khai không tồn tại");
                    }
                    else {
                        if (data.Data && data.Data.object) {
                            bootbox.confirm({
                                title: "THÔNG BÁO",
                                message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                buttons: {
                                },
                                callback: function () {
                                }
                            });

                            var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                            err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';

                            $("#giai-phap-submit").html(err);
                        }
                        else {
                            bootbox.alert("Có lỗi xảy ra");
                        }
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    hq.SubmitMIE = function (dclId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();

        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitMIE",
            data: JSON.stringify({
                "declarationId": dclId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                accounts.Unloading();
                if (data != null && data != "") {
                    if (data.ResponseCode > 0 && data.Data != null) {
                        bootbox.alert("Thành công", function () {
                            window.location.href = Config.Url_Root + "Declaration/DecalrationMIE_view?decID=" + data.Data.dclId + "&dclNo=" + data.Data.dclNo + "&type=1";
                        });
                    }
                    else if (data.ResponseCode == -100001) {
                        accounts.Message("Tờ khai không tồn tại");
                    }
                    else {
                        //accounts.Message(data.Description);
                        if (data.Data != undefined && data.Data != null && data.Data != "" && data.Data.object[0]) {
                            hq2.ValidationFocus(data.Data.object[0].Field, 0);

                            bootbox.confirm({
                                title: "THÔNG BÁO",
                                message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                buttons: {
                                },
                                callback: function () {
                                }
                            });

                            var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                            err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';

                            $("#giai-phap-submit").html(err);
                        }
                        else {
                            accounts.Message("Có lỗi xảy ra");
                        }
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
                return;
            }
        });
    };

    //Submit IDA GTT
    hq.SubmitIDALowValue = function (declarationID) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getotp",
            data: {
                type: 0
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data.ResponseCode >= 0) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/SubmitIDALowValue",
                        data: { declarationId: declarationID },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
                else {
                    if (data.Data != undefined && data.Data != null && data.Data != "" && data.Data.object[0]) {
                        bootbox.confirm({
                            title: "THÔNG BÁO",
                            message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                            buttons: {
                            },
                            callback: function () {
                            }
                        });

                        var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                        err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';

                        $("#giai-phap-submit").html(err);
                    }
                    else {
                        accounts.Message("Có lỗi xảy ra");
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Confirm IDA GTT
    hq.ConfirmIDALowValue = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/SubmitIDALowValue",
            data: JSON.stringify({
                "declarationId": declarationId,
                "otp": $('#txtOTP').val()
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
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        bootbox.alert(data.Description);
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.CheckVietNamese = function (str) {
        if (str == "" || str == null || str == undefined) {
            return;
        }

        var checkStr = "áàạảãăắằẳặăẵâấầậẩẫđèéẹẻẽêếềệễểíìịĩỉòóọõỏôốồộổỗớờơợỡởúùụũủưứừựữửýỳỵỷỹ";
        checkStr += "ÁÀẠẢÃẮẰẶẴẲẦẤẬẪẨĐÈÉẸẺẼÊỀẾỆỂỄÍÌỊĨỈÒỎÓỌÕỒỐỘỖỔÔƠỚỜỢỞỠÚÙỤŨỦƯỪỨỰỮỬÝỲỴỸỶ";
        var len = checkStr.length;
        var bo = false;
        for (var i = 0; i < len; i++) {
            if (str.indexOf(checkStr[i]) > -1) {
                bo = true;
                break;
            }
        }
        return bo;
    }

    hq.checkAdress = function () {
        var dc_1 = $("#txtaddress1Street").val();
        var dc_2 = $("#txtaddress2Street").val();
        var dc_3 = $("#txtaddress3CityNm").val();
        var dc_4 = $("#txtaddress4CityNm").val();
        if (dc_1 == "" && dc_2 == "" && dc_3 == "" && dc_4 == "") {
            return false;
        }

        if (dc_1 != "" && dc_1 != null) {
            if (hq.CheckVietNamese(dc_1)) {
                return false;
            }
        }

        if (dc_2 != "" && dc_2 != null) {
            if (hq.CheckVietNamese(dc_2)) {
                return false;
            }
        }

        if (dc_3 != "" && dc_3 != null) {
            if (hq.CheckVietNamese(dc_3)) {
                return false;
            }
        }

        if (dc_4 != "" && dc_4 != null) {
            if (hq.CheckVietNamese(dc_4)) {
                return false;
            }
        }

        return true;
    }

    hq.ConvertVietNamese = function (str) {
        str = str.toUpperCase();

        str = str.replace('Á', 'A');
        str = str.replace('À', 'A');
        str = str.replace('Ạ', 'A');
        str = str.replace('Ả', 'A');
        str = str.replace('Ã', 'A');

        str = str.replace('Â', 'A');
        str = str.replace('Ấ', 'A');
        str = str.replace('Ầ', 'A');
        str = str.replace('Ẫ', 'A');
        str = str.replace('Ẩ', 'A');
        str = str.replace('Ậ', 'A');

        str = str.replace('Ă', 'A');
        str = str.replace('Ắ', 'A');
        str = str.replace('Ằ', 'A');
        str = str.replace('Ẵ', 'A');
        str = str.replace('Ẳ', 'A');
        str = str.replace('Ặ', 'A');

        str = str.replace('Đ', 'D');

        str = str.replace('È', 'E');
        str = str.replace('È', 'E');
        str = str.replace('Ẻ', 'E');
        str = str.replace('Ẹ', 'E');
        str = str.replace('Ẽ', 'E');

        str = str.replace('Ê', 'E');
        str = str.replace('Ề', 'E');
        str = str.replace('Ế', 'E');
        str = str.replace('Ể', 'E');
        str = str.replace('Ệ', 'E');
        str = str.replace('Ễ', 'E');

        str = str.replace('Í', 'I');
        str = str.replace('Ì', 'I');
        str = str.replace('Ị', 'I');
        str = str.replace('Ỉ', 'I');
        str = str.replace('Ĩ', 'I');

        str = str.replace('Ó', 'O');
        str = str.replace('Ò', 'O');
        str = str.replace('Ọ', 'O');
        str = str.replace('Ỏ', 'O');
        str = str.replace('Õ', 'O');

        str = str.replace('Ô', 'O');
        str = str.replace('Ố', 'O');
        str = str.replace('Ồ', 'O');
        str = str.replace('Ộ', 'O');
        str = str.replace('Ỗ', 'O');
        str = str.replace('Ổ', 'O');

        str = str.replace('Ù', 'U');
        str = str.replace('Ù', 'U');
        str = str.replace('Ụ', 'U');
        str = str.replace('Ủ', 'U');
        str = str.replace('Ũ', 'U');

        str = str.replace('Ư', 'U');
        str = str.replace('Ứ', 'U');
        str = str.replace('Ừ', 'U');
        str = str.replace('Ự', 'U');
        str = str.replace('Ủ', 'U');
        str = str.replace('Ữ', 'U');

        str = str.replace('Ý', 'Y');
        str = str.replace('Ỳ', 'Y');
        str = str.replace('Ỵ', 'Y');
        str = str.replace('Ỷ', 'Y');
        str = str.replace('Ỹ', 'Y');

        return str;
    }

    hq.confirmCloneDeclaration_HV = function (declarationId) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "tax/CloneDeclaration",
            data: JSON.stringify({
                "declarationId": declarationId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                debugger;
                if (data) {
                    if (data.ResponseCode > 0) {
                        bootbox.alert("Xác thực tờ khai thành công. Hệ thống sẽ tự chuyển về trang danh sách...!");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/Declaration_List";
                        }, 2000);
                    }
                    else {
                        //bootbox.alert(data.Description);
                        if (data.Data != undefined && data.Data != null && data.Data.object != undefined && data.Data.object != null && data.Data.object.length > 0) {
                            hq2.ValidationFocus(data.Data.object[0].Field);
                        }
                    }
                    accounts.Unloading();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.PhanLuong = function (code) {
        if (code == undefined) code = "";

        var str = "";
        if (code == 1)
            str = "Luồng xanh";
        else if (code == 2)
            str = "Luồng vàng";
        else if (code.indexOf("3") > -1)
            str = "Luồng đỏ";

        return str;
    }
})();