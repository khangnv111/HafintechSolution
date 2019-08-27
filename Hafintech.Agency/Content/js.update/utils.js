window.utils = {

    rootUrl: function () {
        var rooturl = appPath;
        return rooturl;
    }, 

    convertUTFStr: function (str) {
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
        str = str.replace(/-+-/g, "-");
        str = str.replace(/^\-+|\-+$/g, "");
        return str;
    },    

    documentHeight: function () {
        return $(document).height();
    },

    documentWidth: function () {
        return $(document).width();
    },

    windowHeight: function () {
        return $(window).height();
    },

    windowWidth: function () {
        return $(window).width();
    },

    loading: function () {
        this.unLoading();
        var html = '<div id="LoadingContainer"><div  id="Loading" style="display: none; text-align: center; overflow-y: none; vertical-align: middle;"><img src="' + this.rootUrl() + 'images/loading.gif" alt="Loading" /></div>';
        html += '<div  id="LoadingOverlay"></div>';
        html += '<style> #Loading{	width: 300px;	height: 300px;	z-index: 1400;	position: fixed;	padding: 5px;}#LoadingOverlay{	-moz-opacity: 0.8;	opacity: .80;	filter: alpha(opacity=80);	position: absolute;	z-index: 1201;	top: 0;	left: 0;	width: 100%;	height: 100%;	display: none;	background-color: #ccc;}</style></div>';
        $('body').append(html);
        $('#Loading');
        $('#LoadingOverlay').show();
        var leftOffset = (this.windowWidth() - 300) / 2;
        var topOffset = (this.windowHeight() - 300) / 2;
        $('#Loading').css('width', 300);
        $('#Loading').css('height', 300);
        $('#Loading').css('left', leftOffset);
        $('#Loading').css('top', '47%');
        $('#Loading').show();
        $('#LoadingOverlay').css('height', this.documentHeight());
    },

    Background_cen: function () {
        this.unLoading();
        var html = '<div id="LoadingContainer"><div  id="Loading" style="display: none; text-align: center; overflow-y: none; vertical-align: middle;"></div>';
        html += '<div  id="LoadingOverlay"></div>';
        html += '<style> #Loading{	width: 300px;	height: 300px;	z-index: 1400;	position: fixed;	padding: 5px;}#LoadingOverlay{	-moz-opacity: 0.8;	opacity: .80;	filter: alpha(opacity=80);	position: absolute;	z-index: 1201;	top: 0;	left: 0;	width: 100%;	height: 100%;	display: none;	background-color: #ccc;}</style></div>';
        $('body').append(html);
        $('#Loading');
        $('#LoadingOverlay').show();
        var leftOffset = (this.windowWidth() - 300) / 2;
        var topOffset = (this.windowHeight() - 300) / 2;
        $('#Loading').css('width', 300);
        $('#Loading').css('height', 300);
        $('#Loading').css('left', leftOffset);
        $('#Loading').css('top', '47%');
        $('#Loading').show();
        $('#LoadingOverlay').css('height', this.documentHeight());
    },

    unBackground_cen: function () {
        $('#LoadingContainer').remove();
    },

    unLoading: function () {
        $('#LoadingContainer').remove();
    },

    hidePoup: function () {
        $("#popupwrap").remove(); $("#overlayPopup").remove();
    },

    // Hàm lấy xâu định dạng theo kiểu tiền tệ: 1234123 --> 1.234.123
    formatMoney: function (argValue) {
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
    },
    // Hàm convert chuỗi json Datetime sang Date
    // value: chuỗi jSon datetime
    jSonToDate: function (value) { value = value.replace('/Date(', ''); value = value.replace(')/', ''); var expDate = new Date(parseInt(value)); return expDate; },

    // Hàm convert chuỗi json Datetime sang chuối ngày tháng
    // value: chuỗi jSon datetime
    // option:
    //      0: dd/MM/yyyy hh:mm:ss
    //      1: dd/MM/yyyy
    //      2: hh:mm:ss dd/MM/yyyy
    //      3: yyyy/MM/dd hh:mm:ss
    //      5: hhmm
    jSonDateToString: function (value, option) {
        if (typeof (option) == 'undefined') {
            option = 0;
        }
        var expDate = this.jSonToDate(value);
        var day = expDate.getDate();
        var month = expDate.getMonth() + 1;
        var year = expDate.getFullYear();
        var hour = expDate.getHours();
        var minute = expDate.getMinutes();
        var second = expDate.getSeconds();
        if (day < 10) day = "0" + day;
        if (month < 10) month = "0" + month;
        if (hour < 10) hour = "0" + hour;
        if (minute < 10) minute = "0" + minute;
        if (second < 10) second = "0" + second;
        switch (option) {
            case 0:
                return day + '/' + month + '/' + year + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 1:
                return day + '/' + month + '/' + year;
                break;
            case 2:
                return hour + ':' + minute + ':' + second + ' ' + day + '/' + month + '/' + year;
                break;
            case 3:
                return year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
                break;
            case 4:
                return year + '/' + month + '/' + day;
                break;
            case 5:
                return day + 'h' + minute;
                break;
            default:
                return expDate.toString();
                break;
        }
    },

    //Kéo thanh crollbar lên đầu
    scrollTop: function () { $("html:not(:animated),body:not(:animated)").animate({ scrollTop: 0 }, 'slow'); },
    scrollBottom: function () { $("html:not(:animated),body:not(:animated)").animate({ scrollTop: utils.documentHeight() }, 'slow'); },

    validateDate: function (dtValue) {
        try {
            var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
            var status = dtRegex.test(dtValue);
            if (!status) return status;
            var arr = dtValue.toString().split('/');
            if (arr.length != 3) return false;
            var day = parseInt(arr[0]);
            var month = parseInt(arr[1]);
            var year = parseInt(arr[2]);
            if (day < 0 || day > 31) return false;
            if (month > 12) return false;
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // Check format email xem có chính xác hay không
    validateEmail: function (email) { var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; return filter.test(email); },

    //Check chuỗi ký tự gồm ký tự chuẩn và số ._ 
    validateOnlyLetter: function (text) { var filter = /^[a-zA-Z]+$/; return filter.test(text); },

    //Check chuỗi ký tự gồm ký tự chuẩn và số ._ 
    validateLetter: function (text) { var filter = /^[a-zA-Z0-9]+$/; return filter.test(text); },

    validateUserName: function (_text) { var filter = /^[a-zA-Z0-9._]+$/; return filter.test(_text); },

    //Check Password
    validateLetterPassword: function (text) { var filter = /^[a-zA-Z0-9\.\_~!@#$%^&*(:)-+=]+$/; return filter.test(text); },

    validateNumberOnly: function (text) { var filter = /^[0-9]+$/; return filter.test(text); },
    
    CheckOnlyNumber: function (obj, event) {
        var whichCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;// ? event.which : whichCode;
        // Allow: backspace, delete, tab, escape, and enter
        if (whichCode == 46 || whichCode == 8 || whichCode == 9 || whichCode == 27 || whichCode == 13 ||
            // Allow: Ctrl+A
            (whichCode == 65 && event.ctrlKey === true) ||
            // Allow: home, end, left, right
            (whichCode >= 35 && whichCode <= 39)) {
            // let it happen, don't do anything
            return true;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (!event.shiftKey && whichCode >= 48 && whichCode <= 57) {
                return true;
            }

            //Ký tự #
            if (event.shiftKey && whichCode == 51)
                return false;

            //event.preventDefault();
            return false;
        }
    },

    // type=0:letter, 1 : number, 2:only letter, 3: password, 4 UserName
    inputExtender: function (id, type) {
        try {
            var val = $('#' + id).val();
            if (val == '' || val == 'undefined') {
                return;
            }

            var str = '';
            switch (type) {
                case 0:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateLetter(val.charAt(index))) {
                            str += val.charAt(index);
                        }
                        $('#' + id).val(str);
                    }

                    break;
                case 1:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateNumberOnly(val.charAt(index))) {

                            str += val.charAt(index);
                        }
                    }

                    $('#' + id).val(str);

                    break;
                case 2:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateOnlyLetter(val.charAt(index))) {
                            str += val.charAt(index);
                        }
                        $('#' + id).val(str);
                    }

                    break;
                case 3:
                    for (var index = 0; index < val.length; index++) {
                        if (utils.validateLetterPassword(val.charAt(index))) {
                            str += val.charAt(index);
                        }
                        $('#' + id).val(str);
                    }
                    break;
                case 4:
                    for (var index = 0; index < val.length; index++) {
                        if (!utils.validateNumberOnly(val.charAt(index))) {
                            $('#' + id).val(val.replace(val.charAt(index), ''));
                        }
                    }
                    break;
            }
        }
        catch (err) { }
    },

    formDateTime: function (date) {
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth();
        var currYear = d.getFullYear();
        return currDate + "-" + currMonth
            + "-" + currYear;
    },    

    errorMessage: function (text) {
        this.clearErrorMessage("lblError");
        var html = '<img src="' + utils.rootUrl() + 'Images/login/Popup_NapTien_06.png"><p>' + text + '</p>';
        $('#lblError').html(html);
    },

    successMessage: function (text) {
        this.clearErrorMessage("lblError");
        var html = '<p class="errorSucces">' + text + '</p>';
        $('#lblError').html(html);
    },

    clearErrorMessage: function (fieldid) {
        $('#' + fieldid).empty();
    },    

    FormatNumber: function (pSStringNumber) {
        pSStringNumber += '';
        var x = pSStringNumber.split(',');
        var x1 = x[0];
        var x2 = x.length > 1 ? ',' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + '.' + '$2');

        return x1 + x2;
    },        
    
    //Hàm chuyển số thành chữ
    DocSo3ChuSo: function (baso) {
        var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
        var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
        var tram;
        var chuc;
        var donvi;
        var KetQua = "";
        tram = parseInt(baso / 100);
        chuc = parseInt((baso % 100) / 10);
        donvi = baso % 10;
        if (tram == 0 && chuc == 0 && donvi == 0) return "";
        if (tram != 0) {
            KetQua += ChuSo[tram] + " trăm ";
            if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
        }
        if ((chuc != 0) && (chuc != 1)) {
            KetQua += ChuSo[chuc] + " mươi";
            if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
        }
        if (chuc == 1) KetQua += " mười ";
        switch (donvi) {
            case 1:
                if ((chuc != 0) && (chuc != 1)) {
                    KetQua += " mốt ";
                }
                else {
                    KetQua += ChuSo[donvi];
                }
                break;
            case 5:
                if (chuc == 0) {
                    KetQua += ChuSo[donvi];
                }
                else {
                    KetQua += " lăm ";
                }
                break;
            default:
                if (donvi != 0) {
                    KetQua += ChuSo[donvi];
                }
                break;
        }
        return KetQua;
    },

    DocTienBangChu: function (SoTien) {
        var ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
        var Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");
        var lan = 0;
        var i = 0;
        var so = 0;
        var KetQua = "";
        var tmp = "";
        var ViTri = new Array();
        if (SoTien < 0) return "Số tiền âm !";
        if (SoTien == 0) return "Không đồng !";
        if (SoTien > 0) {
            so = SoTien;
        }
        else {
            so = -SoTien;
        }
        if (SoTien > 8999999999999999) {
            //SoTien = 0;
            return "Số quá lớn!";
        }
        ViTri[5] = Math.floor(so / 1000000000000000);
        if (isNaN(ViTri[5]))
            ViTri[5] = "0";
        so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
        ViTri[4] = Math.floor(so / 1000000000000);
        if (isNaN(ViTri[4]))
            ViTri[4] = "0";
        so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
        ViTri[3] = Math.floor(so / 1000000000);
        if (isNaN(ViTri[3]))
            ViTri[3] = "0";
        so = so - parseFloat(ViTri[3].toString()) * 1000000000;
        ViTri[2] = parseInt(so / 1000000);
        if (isNaN(ViTri[2]))
            ViTri[2] = "0";
        ViTri[1] = parseInt((so % 1000000) / 1000);
        if (isNaN(ViTri[1]))
            ViTri[1] = "0";
        ViTri[0] = parseInt(so % 1000);
        if (isNaN(ViTri[0]))
            ViTri[0] = "0";
        if (ViTri[5] > 0) {
            lan = 5;
        }
        else if (ViTri[4] > 0) {
            lan = 4;
        }
        else if (ViTri[3] > 0) {
            lan = 3;
        }
        else if (ViTri[2] > 0) {
            lan = 2;
        }
        else if (ViTri[1] > 0) {
            lan = 1;
        }
        else {
            lan = 0;
        }
        for (i = lan; i >= 0; i--) {
            tmp = this.DocSo3ChuSo(ViTri[i]);
            KetQua += tmp;
            if (ViTri[i] > 0) KetQua += Tien[i];
            if ((i > 0) && (tmp.length > 0)) KetQua += ',';//&& (!string.IsNullOrEmpty(tmp))
        }
        if (KetQua.substring(KetQua.length - 1) == ',') {
            KetQua = KetQua.substring(0, KetQua.length - 1);
        }
        KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
        KetQua += " đồng";
        return KetQua;//.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
    },       
    
    replaceAll: function (sources, strTarget, strSubString) {
        var strText = sources;
        var intIndexOfMatch = strText.indexOf(strTarget);

        // Keep looping while an instance of the target string
        // still exists in the string.
        while (intIndexOfMatch != -1) {
            // Relace out the current instance.
            strText = strText.replace(strTarget, strSubString)

            // Get the index of any next matching substring.
            intIndexOfMatch = strText.indexOf(strTarget);
        }

        return (strText);
    },

    formatString: function (str, param) {
        var args = param.toString().split(',');
        for (var i = 0; i < args.length; i++) {
            var reg = new RegExp("\\{" + i + "\\}", "");
            str = utils.replaceAll(str, '{' + i + '}', args[i].toString());
        }
        return str;
    },

    currentDate: function () {
        var date = new Date();
        var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var month = date.getMonth() + 1 < 10 ? "0" + date.getMonth() + 1 : date.getMonth() + 1;
        var year = date.getFullYear();
        date = day + "/" + month + "/" + year;
        return date;
    },

    getParameterByName: function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },

    trackingGoogleAnalystic: function () {
        var GA_UA = utils.getParameterByName('gacode')
        ga('create', GA_UA, 'vtcgame.vn/kiem-vcoin');
    },

    SetCookie: function (name, value, days) { if (days) { var date = new Date(); date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000)); var expires = "; expires=" + date.toGMTString(); } else var expires = ""; document.cookie = name + "=" + value + expires + "; path=/"; },

    GetCookie: function (name) { var nameEQ = name + "="; var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) == ' ') c = c.substring(1, c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length); } return null; },
    getCookie: function (name) { var nameEQ = name + "="; var ca = document.cookie.split(';'); for (var i = 0; i < ca.length; i++) { var c = ca[i]; while (c.charAt(0) == ' ') c = c.substring(1, c.length); if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length); } return null; },

    DeleteCookie: function (name) { utils.SetCookie(name, "", -1); },

    // getFaceBook(document, 'script', 'facebook-jssdk');
    getFaceBook: function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { FB.XFBML.parse(); return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.0";
        fjs.parentNode.insertBefore(js, fjs);
    }
};

