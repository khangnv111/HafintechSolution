
window.utils = {
    ShowOverLay: function () {
        var html = '<div id="OverLay"  style="width: 100%; height: 100%; left: 0; top: 0; position: fixed; z-index: 12; background-color: black; opacity: 0.6"></div>';
        $("BODY").append(html);
    },

    RemoveOverLay: function () {
        $("#OverLay").remove();
    },

    Loading: function () {
        var html = '<div id="loading" style="width: 100%; height: 100%; left: 0; top: 0; position: fixed; z-index: 113; background-color: black; opacity: 0.6">';
        html += '<div style="top: 50%; left: 50%; position: absolute; transform: translate(-50%, -50%);">';
        html += '<img style="width: 150px" src="' + Config.Url_Root + 'content/img/loading.gif" /></div></div>';

        $("BODY").append(html);
    },

    unLoading: function () {
        $("#loading").remove();
    },

    closeAll: function () {

        $("#popupwrap").remove();
        $('#overlayPopup').remove();

        $("#BoxRegister").remove();
        $("#forGetPass").remove();
        $("#popOTP").remove();

        $("#OverLay").remove();
        $("#PopupInsert").remove();
        $("#popMess").remove();
        $("#popupSearch").remove();
        $("#popGetTax").remove();
    },

    Message: function (msg) {
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Home/Message",
            data: {
            },
            //contentType: "application/json; charset=utf-8",
            dataType: "html",
            //processData: true,
            //crossDomain: true,
            //xhrFields: { withCredentials: true },
            //cache: false,
            success: function (data) {
                utils.closeAll();
                utils.ShowOverLay();
                $("BODY").append('<div id="popMess">' + data + '</div>');
                $("#popMess .info-mess").html(msg);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    CloseMess: function () {
        $("#popMess").remove();
        $("#OverLay").remove();
    },

    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";
    },

    getCookie: function (cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
        }
        return "";
    },

    del_cookie: function (name) {
        document.cookie = name +
        '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
    },

    CheckVietNamese: function (str) {
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
    },
}

window.Vali = {
    CheckOnlyNumber: function (obj, e) {
        var whichCode = (window.Event && e.which) ? e.which : e.keyCode; /*if (whichCode == 13) { this.onPlaceOrder(); return false; }*/
        if (whichCode == 9) return true;
        if ((whichCode >= 48 && whichCode <= 57) || whichCode == 8) {
            var n = obj.value.replace(/,/g, ""); if (whichCode == 8) {
                if (n.length != 0)
                    n = n.substr(0, n.length - 1);
            }
            if (parseFloat(n) == 0) {
                n = '';
            }
            return true;
        }
        e.returnValue = false; return false;
    },

    validateEmail: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
            return false;
        }
        else {
            return true;
        }
    },
}

window.Ctrl = {

    GetProvince: function (id) {
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "service/getlistprovince",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var html = '';
                if (data != null && data != "" && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        html += '<option value="' + data[i].ProvinceCode + '">' + data[i].ProvinceName + '</option>';
                    }
                }

                $("#" + id).append(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    GetDistrict: function (idPv, idDt) {
        var tt = $('#' + idPv).val();

        if (tt != "") {
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "service/GetListDistrict",
                data: {
                    provinceCode: tt
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {

                    var html = '<option value="">Quận/huyện</option>';
                    if (data != null && data != "" && data.length > 0) {
                        for (var i = 0; i < data.length; i++) {
                            html += '<option value="' + data[i].DistrictCode + '">' + data[i].DistrictName + '</option>';
                        }
                    }

                    $("#" + idDt).html(html);
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }
        else {
            var html = '<option value="">Quận/huyện</option>';
            $("#" + idDt).html(html);
        }

    },

    formatDateTime: function (date, type) {
        //type 1: dd/MM/yyyy
        //type 2: MM/dd/yyyy
        //type 3: yyyy/MM/dd
        if (date == null || date == undefined)
            return "";
        var d = new Date(date);
        var currDate = d.getDate();
        if (currDate < 10) currDate = '0' + currDate;

        var currMonth = d.getMonth() + 1;
        if (currMonth < 10) currMonth = '0' + currMonth;
        var currYear = d.getFullYear();

        var dateFormat = "";
        if (type == 1) {
            dateFormat = currDate + "/" + currMonth + "/" + currYear;
        }
        else if (type == 2) {
            dateFormat = currMonth + "/" + currDate + "/" + currYear;
        }
        else if (type == 3) {
            dateFormat = currYear + "/" + currMonth + "/" + currDate;
        }

        return dateFormat;
    },

    GetDay: function (date) {
        if (date == null || date == undefined)
            return "";
        var d = new Date(date);
        var currDate = d.getDate();
        if (currDate < 10) currDate = '0' + currDate;

        return currDate;
    },

    GetMoth: function (date) {
        if (date == null || date == undefined)
            return "";
        var d = new Date(date);
        var currMonth = d.getMonth() + 1;

        return currMonth;
    },
    GetYear: function (date) {
        if (date == null || date == undefined)
            return "";
        var d = new Date(date);
        var currYear = d.getFullYear();

        return currYear;
    },

}