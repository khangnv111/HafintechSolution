
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

	Loading2: function () {
		var html = '<div id="loading" style="width: 100%; height: 100%; left: 0; top: 0; position: fixed; z-index: 113; background-color: black; opacity: 0.6">';
		html += '<div style="top: 50%; left: 50%; position: absolute; transform: translate(-50%, -50%);">';
		html += '<i class="fa fa-spinner fa-pulse fa-5x fa-fw" style="color: #fff"></i></div></div>';

		$("BODY").append(html);
	},

	percentLoading: function () {
		$.ajax({
			type: 'GET',
			url: Config.Url_Root + "ExpImpData/Loading",
			data: {
			}, 
			dataType: "html", 
			success: function (data) {
				$("BODY").append(data);
			},
			error: function (data) {
				bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				return;
			}
		});
	},

    unLoading: function () {
		$("#loading").remove();
		$("#pop_loading").remove();
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
		if (!str) {
			return false;
        }

        var checkStr = "áàạảãăắằẳặăẵâấầậẩẫđèéẹẻẽêếềệễểíìịĩỉòóọõỏôốồộổỗớờơợỡởúùụũủưứừựữửýỳỵỷỹ";
        checkStr += "ÁÀẠẢÃẮẰẶẴẲẦẤẬẪẨĐÈÉẸẺẼÊỀẾỆỂỄÍÌỊĨỈÒỎÓỌÕỒỐỘỖỔÔƠỚỜỢỞỠÚÙỤŨỦƯỪỨỰỮỬÝỲỴỸỶ";
		var len = checkStr.length; 

        for (var i = 0; i < len; i++) {
			if (str.indexOf(checkStr[i]) > -1) {
				return true;
                break;
            }
		}
		return false;
    },

    ConvertVietNamese: function (str) {  
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

        str = str.replace('Ơ', 'O');
        str = str.replace('Ớ', 'O');
        str = str.replace('Ờ', 'O');
        str = str.replace('Ợ', 'O');
        str = str.replace('Ỡ', 'O');
        str = str.replace('Ở', 'O');

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

	CheckPhone: function (phonenumber) {

		var filter = /^((01|03|05|07|08|09)[0-9])|([+](84)[0-9])*$/;
		if (filter.test(phonenumber) == false) { 
			return false;
		}
		if (phonenumber.length < 10 || phonenumber.length > 12) { 
			return false;
		}

		return true;
	},

	// Validates date formatted as "mm/dd/yyyy"
	CheckDate: function (dateString) {
		// First check for the pattern
		if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
			return false;

		// Parse the date parts to integers
		var parts = dateString.split("/");
		var day = parseInt(parts[1], 10);
		var month = parseInt(parts[0], 10);
		var year = parseInt(parts[2], 10);

		// Check the ranges of month and year
		if (year < 1000 || year > 3000 || month <= 0 || month > 12)
			return false;

		var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		// Adjust for leap years
		if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
			monthLength[1] = 29;

		// Check the range of the day
		return day > 0 && day <= monthLength[month - 1];
	},

	CheckSpecial: function (str) {
		var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';.,/{}|\\":<>\?]/); 

		if (pattern.test(str))
			return true;
		return false;
	
	},

	CheckHaveText: function (str) {
		if (!str)
			return false;

		if (str.match(/[a-z]/i))
			return true;

		var checkStr = "áàạảãăắằẳặăẵâấầậẩẫđèéẹẻẽêếềệễểíìịĩỉòóọõỏôốồộổỗớờơợỡởúùụũủưứừựữửýỳỵỷỹ";
		checkStr += "ÁÀẠẢÃẮẰẶẴẲẦẤẬẪẨĐÈÉẸẺẼÊỀẾỆỂỄÍÌỊĨỈÒỎÓỌÕỒỐỘỖỔÔƠỚỜỢỞỠÚÙỤŨỦƯỪỨỰỮỬÝỲỴỸỶ";
		var len = checkStr.length;

		for (var i = 0; i < len; i++) {
			if (str.indexOf(checkStr[i]) > -1) {
				return true;
				break;
			}
		}
	},

	//check ẩn hiện submit
	CheckEnable: function (initType, createdAccid) {
		var enableSubmit = false;
		var enableTK = false;

		if (utils.getCookie("Type") == 2 && createdAccid == $("#accIdLogin").val()) {
			enableSubmit = true;
			enableTK = true;
		}
		else if (initType == 1 || initType == 2 || initType == 4) {
			enableSubmit = true;
		}
		else if (initType == 6 && utils.getCookie("isAgency") == 2 && utils.getCookie("permitGroup") != 2) {
			enableSubmit = true;
		}
		else if ((initType == 3 || initType == 5) && utils.getCookie("permitGroup") == 2) {
			enableTK = true;
		}
		else if ((initType == 3 || initType == 5) && (utils.getCookie("permitGroup") == 3 || utils.getCookie("Type") == 2)) {
			enableSubmit = true;
		}

		else if (initType == 7 && utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2) {
			enableSubmit = true;
		}
		else if (initType == 7 && utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") != 2) {
			enableSubmit = true;
		}
		else if (initType == 7 && utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 2) {
			enableTK = true;
		}

		else if (initType == 8 && utils.getCookie("isAgency") == 2) {
			enableTK = true;
		}
		else if (initType == 8 && utils.getCookie("isAgency") == 1 && (utils.getCookie("Type") == 2 || utils.getCookie("permitGroup") != 2)) {
			enableSubmit = true;
		}
		else if (initType == 9 && utils.getCookie("permitGroup") == 2) {
			enableTK = true;
		}
		else if (initType == 9 && (utils.getCookie("permitGroup") == 3 || utils.getCookie("Type") == 2)) {
			enableSubmit = true;
		} 

		return {
			enableSubmit: enableSubmit,
			enableTK: enableTK
		}
	},

	//check hiện thị submit TT hay submit USB
	CheckButtonSubmit: function () {
		var submitTT = false;
		var submitUSB = false;
		var submitMethod = utils.getCookie("submitMethod");
		if (submitMethod == 0)
			submitUSB = true;
		else if (submitMethod == 1)
			submitTT = true;
		else if (submitMethod == 'null') {
			submitTT = true;
			submitUSB = true;
		}

		return {
			submitTT: submitTT,
			submitUSB: submitUSB
		};
	},

	setInputFilter: function(textbox, inputFilter) {
	["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function (event) {
		textbox.addEventListener(event, function () {
			if (inputFilter(this.value)) {
				this.oldValue = this.value;
				this.oldSelectionStart = this.selectionStart;
				this.oldSelectionEnd = this.selectionEnd;
			} else if (this.hasOwnProperty("oldValue")) {
				this.value = this.oldValue;
				this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
			}
		});
	});
	},

	OnlyNumber: function (idInput) {
		var str = $('#' + idInput).val();
		str = str.replace(/[^0-9]+/g, '');
		$('#' + idInput).val(str);
	},
	 
	OnlyNumber2: function (idInput) {
		var str = $('#' + idInput).val();
		str = str.replace(/[^0-9\+]+/g, '');
		$('#' + idInput).val(str);
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
		//type 4: yyyy-MM-dd
		if (date == null || date == undefined)
			return "";
		var d = new Date(date);

		var currDate = d.getDate();
		if (currDate < 10) currDate = '0' + currDate;

		var currMonth = d.getMonth() + 1;
		if (currMonth < 10) currMonth = '0' + currMonth;
		var currYear = d.getFullYear() + '';
		if (4 - currYear.length > 0) {
			var lenYear = 4 - currYear.length;
			for (var i = 0; i < lenYear; i++) {
				currYear = '0' + currYear;
			}
		}

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
		else if (type == 4) {
			dateFormat = currYear + "-" + currMonth + "-" + currDate;
		}

		return dateFormat;
	},

	//Convert type dd-MM-yyyy HH:mm:ss to other
	convertDate: function (date) {
		var arr = date.split(' ');
		var dateStr = arr[0];
		var timeStr = arr[1];
		dateStr = dateStr.split('-');
		timeStr = timeStr.split(':');
		return {
			day: dateStr[0],
			month: dateStr[1],
			year: dateStr[2],
			hour: timeStr[0],
			minute: timeStr[1],
			second: timeStr[2],
			date: dateStr[2] + "-" + dateStr[1] + "-" + dateStr[0],
		};
	},

	convertDateInt: function (date) {
		var d = date.substring(0, 2);
		var m = date.substring(2, 4);
		var y = date.substring(4, date.length);

		return {
			day: d, month: m, year: y, date: d + "-" + m + "-" + y
		}
	},

	convertTimeInt: function (time) {
		var h = time.substring(0, 2);
		var m = time.substring(2, 4);
		var s = time.substring(4, time.length);

		return {
			hour: h, minute: m, second: s, time: h + ":" + m + ":" + s
		}
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

	formatNumber: function (stringNumber) {
		stringNumber += '';
		var x = stringNumber.split(',');
		var x1 = x[0];
		var x2 = x.length > 1 ? ',' + x[1] : '';
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(x1))
			x1 = x1.replace(rgx, '$1' + ',' + '$2');

		return x1 + x2;
	},

	numFormat: function (num, digits) {
		var si = [
			{ value: 1, symbol: "" },
			{ value: 1E3, symbol: " Nghìn" },
			{ value: 1E6, symbol: " Triệu" },
			{ value: 1E9, symbol: " Tỉ" },
			//{ value: 1E12, symbol: " T" },
			//{ value: 1E15, symbol: " P" },
			//{ value: 1E18, symbol: " E" }
		];
		var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
		var i;
		for (i = si.length - 1; i > 0; i--) {
			if (num >= si[i].value) {
				break;
			}
		}
		num = (num / si[i].value).toFixed(digits).replace(rx, "$1");
		num = Ctrl.formatNumber(num);

		return num + si[i].symbol;
	},
}