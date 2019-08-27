var app = new Vue({
    el: '#ama-dec',
    data: {
		data: { 
			listProducts: [],
		},
		showSubmit: false,
		showTK: false,
		showRadio: false,

		ListCurrency: [], //Mã tiền tệ của tiền thuế 
		//popup
		showPop: false, 
		typeSearch: 0,
		lstDataPop: [],
		showLoading: true,
		txtCodePop: "",
		txtNamePop: "", 

		//Popup chọn đối tượng
		loadingObj: true,
		showPopObject: false,
		lstDataObj: [],
		tabObj: 1,
		textSearchObj: "", 

		///Hàng hóa
		totalProduct: 1,
		pageProduct: 1,
		textPage: "1/50",
		listProducts: [], //danh sách hàng hóa
		//chi tiết hàng hóa
		Product: { 
			lsProREInfo: [], //Ds thuế và thu khác
		}, 

		//Chữ ký số
		statusTK: 0,
		jobCode: "AMA",

		//ẩn hiện submit theo tk
		submitTT: false,
		submitUSB: false, 
		//infoAccount: null, //Thông tin tk đang đăng nhập
    },
	methods: {
		init: async function (callback) {
			var data = this.data;
			data.curCdTaxAmt = "";
			data.curCdBTaxAmend = "";
			data.cstOfficeNm = "";
			data.extPayDueCd = "";
			data.amendDlcReaCd = "";
			//Lấy account info
			//this.infoAccount = await Lib.GetAccountInfo();

			this.ListCurrency = await Lib.getCurrency();
			 
			for (var i = 0; i < 5; i++) {
				this.Product.lsProREInfo.push(
					{
						stTaxValBTaxAm: "",
						stQuanBTaxAm: "",
						msBOTaxColAm: "",
						"clsfCdBTaxAm": "",
						"tRateBTaxColAm": "",
						"tAmtBOTColAm": "",
						"stTaxValTCAm": "",
						"stQuanAOTCAm": "",
						"msUCSQAOTCAm": "",
						"clsfCdAOTColAm": "",
						"tRateAOTColAm": "",
						"tAmtAOTColAm": ""
					}
				);
			}
			this.showRadio = true;

			if (callback != 'undefined' && typeof callback == 'function') {
				callback();
			}
		},
		loadDetail: function (decId) {
			var self = this;

			utils.Loading();
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'POST',
				url: Config.API_Login + "tax/GetAMADetail",
				data: JSON.stringify({
					"id": decId,
				}),
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					utils.unLoading();
					console.log("loadDetail - AMA: ", data);
					if (data) {
						self.data = data.Data;
						self.data.ieDclDate = self.formatDate(self.data.ieDclDate).date;
						self.data.dateOfPermit = self.formatDate(self.data.dateOfPermit).date;
						self.data.timeLimReIE = self.formatDate(self.data.timeLimReIE).date; 

						self.listProducts = data.Data.listProducts;
						self.Product = data.Data.listProducts[0];
						self.totalProduct = self.listProducts.length;

						self.getNameCst(data.Data.cstOffice); 

						self.showSubmit = Vali.CheckEnable(data.Data.initType, data.Data.createdAccId).enableSubmit;
						self.showTK = Vali.CheckEnable(data.Data.initType, data.Data.createdAccId).enableTK;

						//Check hiện button submit
						self.submitTT = Vali.CheckButtonSubmit().submitTT;
						self.submitUSB = Vali.CheckButtonSubmit().submitUSB;
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
					return;
				}
			});
		},
		//Libs
		onChange: function () {
			this.$forceUpdate();
		},
		resetProduct: function () {
			this.Product = { 
				lsProREInfo: [], //Ds thuế và thu khác
			};

			for (var i = 0; i < 5; i++) {
				this.Product.lsProREInfo.push(
					{
						stTaxValBTaxAm: "",
						stQuanBTaxAm: "",
						msBOTaxColAm: "",
						"clsfCdBTaxAm": "",
						"tRateBTaxColAm": "",
						"tAmtBOTColAm": "",
						"stTaxValTCAm": "",
						"stQuanAOTCAm": "",
						"msUCSQAOTCAm": "",
						"clsfCdAOTColAm": "",
						"tRateAOTColAm": "",
						"tAmtAOTColAm": ""
					}
				);
			}
		},
		formatDate: function (date) {
			if (!date)
				return "";

			var d = date.substring(0, 2);
			var m = date.substring(2, 4);
			var y = date.substring(4, date.length);
			var date = y + "-" + m + "-" + d;
			return {
				"day": d, "month": m, "year": y,
				"date": date,
			}
		},
		getNameCst: function (cstCode) {

			var urlSearch = Config.API_Login + "tax/GetCustomsOffice";
			var dataSearch = {
				cstOfficeCd: cstCode,
				cstOfficeNm: "",
			}
			var self = this;
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'GET',
				url: urlSearch,
				data: dataSearch,
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					if (data && data.ResponseCode > 0 && data.Data.length > 0) {
						self.data.cstOfficeNm = data.Data[0].cstOfficeNm;
						self.$forceUpdate();
					}
				},
				error: function (data) {
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					return;
				}
			});
		},
		//Object
		selectTabObj: function (tab) {
			this.textSearchObj = "";
			this.tabObj = tab;
			if (this.tabObj == 3) {

				//this.data.experNm = this.infoAccount.Accounts.fullName ? this.infoAccount.Accounts.fullName : "";
				//this.data.phoneNoOfExp = this.infoAccount.Accounts.mobile ? this.infoAccount.Accounts.mobile : "";
				//this.data.addressOfExp = this.infoAccount.Business.address ? this.infoAccount.Business.address : "";
				//this.data.addressOfExp = this.infoAccount.Business.address ? this.infoAccount.Business.address : "";
				this.data.experCd = this.infoAccount.Business.taxIdNumber ? this.infoAccount.Business.taxIdNumber : "";

				this.closeObj();
			}
			else
				this.searchObject();
		},
		searchObject: function () {

			var parentId;
			if (utils.getCookie("Type") == "1") {
				parentId = utils.getCookie("parentId");
			}
			else {
				parentId = $("#accIdLogin").val();
			}

			var urlSearch = Config.API_Login + "Agency/SearchPersonal";
			var dataSearch = {
				personalId: 0,
				identity: this.textSearchObj,
				parentId: parentId,
				type: 0
			}

			if (this.tabObj == 2) {
				urlSearch = Config.API_Login + "Business/SearchBusiness";
				dataSearch = {
					parentId: parentId,
					businessId: null,
					taxIdNumber: this.textSearchObj,
					status: 1,
				}
			}

			var self = this;
			this.loadingObj = true;
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'POST',
				url: urlSearch,
				data: JSON.stringify(dataSearch),
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					self.loadingObj = false;
					if (data) {
						self.lstDataObj = data.Data;
					}
				},
				error: function (data) {
					self.loadingObj = false;
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				}
			});
		},
		pickObj: function (item) {

			this.data.experNm = item.name;
			this.data.phoneNoOfExp = item.phoneNumber;
			this.data.addressOfExp = item.address;

			if (this.tabObj == 1) {
				this.data.accountId = item.accountId;
			}
			else {
				//app.data.initType = 3;
				this.data.experCd = item.taxIdNumber;
				this.data.businessId = item.accountId;
				this.signMethodSelect = item.signMethod;
			}
			this.data.agencyId = utils.getCookie("isAgency");

			this.closeObj();
		},
		closeObj: function () {
			this.showPopObject = false;
			this.loadingObj = true;
			this.textSearchObj = "";
		},
		//popup
		OpenPop: function (type) {
			this.typeSearch = type;
			this.showPop = true;
			this.SearchPop();
		},
		SearchPop: function () {
			//hải quan
			var urlSearch = Config.API_Login + "tax/GetCustomsOffice";
			var dataSearch = {
				cstOfficeCd: this.txtCodePop,
				cstOfficeNm: this.txtNamePop,
			}
			//Mã nước
			if (this.typeSearch == 2) {
				urlSearch = Config.API_Login + "tax/GetCountry";
				dataSearch = {
					countryCode: this.txtCodePop,
					countryName: this.txtNamePop,
				}
			}
			//Mã địa điểm lưu kho hàng chờ thông quan dự kiến
			else if (this.typeSearch == 3) {
				urlSearch = Config.API_Login + "tax/GetCustomsWarehouse";
				dataSearch = {
					cstWrhCd: this.txtCodePop,
					cstWrhNm: this.txtNamePop,
				}
			}
			//Địa điểm nhận hàng cuối cùng
			else if (this.typeSearch == 4) {
				urlSearch = Config.API_Login + "tax/GetLoadingLocation";
				dataSearch = {
					loadLocCd: this.txtCodePop,
					loadLocNm: this.txtNamePop,
				}
			}
			//Địa điểm xếp hàng
			else if (this.typeSearch == 5) {
				urlSearch = Config.API_Login + "tax/GetUnloadingPort";
				dataSearch = {
					unloadPortCd: this.txtCodePop,
					unloadPortNm: this.txtNamePop,
				}
			}

			this.showLoading = true;
			this.lstDataPop = [];
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'GET',
				url: urlSearch,
				data: dataSearch,
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					app.showLoading = false;
					//console.log(data); 
					if (data) {
						app.lstDataPop = data.Data;
					}
				},
				error: function (data) {
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					return;
				}
			});
		},
		SelectPop: function (item) {
			//Mã cơ quan hải quan tiếp nhận tờ khai 
			if (this.typeSearch == 1) {
				this.data.cstOffice = item.cstOfficeCd;
				this.data.cstOfficeNm = item.cstOfficeNm;
			}
			else if (this.typeSearch == 2) {
				this.data.countryCd = item.countryCode;
			}
			else if (this.typeSearch == 3) {
				this.data.cstWrhCd = item.cstWrhCd;
			}
			else if (this.typeSearch == 4) {
				this.data.finalDesCd = item.loadLocCd;
				if (item.type == 2) {
					this.data.finalDesCd = item.countryCd + this.data.finalDesCd;
				}

				this.data.finalDesNm = item.loadLocNm;
			}
			else if (this.typeSearch == 5) {
				this.data.loadPortCd = item.unloadPortCd;
				this.data.loadPortCd = this.data.loadPortCd.replace("VN", "");
				this.data.loadPortNm = item.unloadPortNm;
			}

			this.ClosePop();
		},
		ClosePop: function () {
			this.typeSearch = 0;
			this.showLoading = true;
			this.showPop = false;
			this.lstDataPop = []; //Ds dữ liệu popup
			this.txtCodePop = "";
			this.txtNamePop = "";
		},
		//actions
		ViewResult: function (id, tab) {
			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight");
			var IdDec = url.searchParams.get("IdDec");

			window.location.href = Config.Url_Root + "AMA/ResultAMA?decId=" + id + "&ishight=" + ishight + "&tab=" + tab + "&IdDec=" + IdDec;
		}, 
		getDataInfoAMA: function () { 
			if (!this.data.dclNo)
				return;
			var self = this;
			var dclNo = this.data.dclNo.trim();
			utils.Loading();
			var token = $('#hdfToken').val(); 
			$.ajax({
				type: 'GET',
				url: Config.API_Login + "tax/SearchDeclaration2",
				data: { 
					dclNo: dclNo, 
					page: 0
				},
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					console.log(data);
					utils.unLoading();

					if (data) {
						if (data.ResponseCode > 0 && data.Data.ListDeclarations && data.Data.ListDeclarations.length > 0) {
							var t = data.Data.ListDeclarations[0];
							var dclId = t.dclId + "";
							if (dclId.substring(0, 2) == "10") {
								self.data.ieClsf = "I";
								self.data.dclrName = t.imperNm;
								self.data.dclrPhoneNo = t.phoneNoOfImp;
								self.data.addrDclr = t.addressOfImp; 
								self.data.dclrCode = t.imperCd;
							}
							else {
								self.data.ieClsf = "E"; 
								self.data.dclrName = t.experNm;
								self.data.dclrPhoneNo = t.phoneNoOfExp;
								self.data.addrDclr = t.addressOfExp;
								self.data.dclrCode = t.experCd;
							}
							
							self.data.dclKindCd = t.dclKindCd; 
							self.data.cstOfficeNm = t.cstOfficeNm;
							self.data.cstOffice = t.cstOffice; 
							self.data.cstSubSection = t.cstSubSection; 

							//self.data.initType = t.initType;
							//self.data.accountId = t.accountId;
							//self.data.createdAccId = t.createdAccId;
							//self.data.agencyId = t.agencyId;
							//self.data.businessId = t.businessId;
							//self.data.sigAccId = t.sigAccId;
							//self.data.acceptAccId = t.acceptAccId;
							//self.data.statusCode = t.statusCode;

							self.$forceUpdate();
						}
					}
					else {
						bootbox.alert("Số tờ khai không tồn tại hoặc chưa được khai báo!");
					} 
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
					return;
				}
			});
		},
		nextPro: function () {
			if (this.pageProduct == 50)
				return;
			this.pageProduct++;
			this.textPage = this.pageProduct + "/50"; 

			if (this.pageProduct > this.totalProduct)
				this.totalProduct++;

			if (this.listProducts[this.pageProduct - 2]) {
				this.listProducts[this.pageProduct - 2] = this.Product;
				this.resetProduct();

				if (this.listProducts[this.pageProduct - 1])
					this.Product = this.listProducts[this.pageProduct - 1];
			}
			else {
				this.listProducts.push(this.Product);
				this.resetProduct();
			} 
		},
		prePro: function () {
			if (this.pageProduct == 1)
				return;
			this.pageProduct--;
			this.textPage = this.pageProduct + "/50";

			if (this.listProducts[this.pageProduct]) {
				this.listProducts[this.pageProduct] = this.Product;
			}
			else {
				this.listProducts.push(this.Product);
			}
			this.resetProduct();
			this.Product = this.listProducts[this.pageProduct - 1];
		},
		//submit
		SubmitAMA: function () {
			var self = this;
			var token = $('#hdfToken').val(); 
			utils.Loading();
			$.ajax({
				url: Config.API_Login + "tax/SubmitAMA",
				type: 'POST',
				data: JSON.stringify({
					"id": self.data.id,
				}),
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					console.log(data);
					utils.unLoading();
					if (data.ResponseCode > 0) {

						bootbox.alert("Thành công", function () {
							location.reload();
						});
					}
					else {
						if (data.Data && data.Data.object) {
							bootbox.alert("Mời bạn kiểm tra lại dữ liệu đã nhập");
							mess_GP.lstMess = data.Data.object;
							mess_GP.forcusMess();
						}
						else {
							bootbox.alert(data.Description);
						}
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
				}
			});
		},
		SubmitAMC: function () {
			 
			utils.Loading();
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'POST',
				url: Config.API_Login + "tax/SubmitAMC",
				data: JSON.stringify({
					"amendDclNo": this.data.amendDclNo.trim(),
				}),
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					console.log(data);
					utils.unLoading();
					if (data.ResponseCode > 0 && data.Data) {

						bootbox.alert("Thành công", function () {
							window.location.href = Config.Url_Root + "AMA/InsertUpdateAMA?ishight=6&tab=3" + "&amendDclNo=" + data.Data.amendDclNo + "&decId=" + data.Data.id;
						});
					}
					else {
						if (data.Data && data.Data.object) {
							bootbox.alert("Mời bạn kiểm tra lại dữ liệu đã nhập");
							mess_GP.lstMess = data.Data.object;
							mess_GP.forcusMess();
						}
						else {
							bootbox.alert(data.Description);
						}
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				}
			});
		},
		SubmitSign: function (status) {
			if ($("#downSignkey").val() == 1) {
				bootbox.confirm("Bạn chưa có Chữ ký số hoặc Chữ số ký chưa cập nhật. <br> Mời bạn tải Chữ ký số", function (res) {
					if (res) {
						downTK();
					}
				});
				return;
			}
			console.log(this.data);
			this.statusTK = status;
			var data = {
				"dclId": this.data.id,
				"status": status,
				"sigAccId": this.data.sigAccId,
				"createdAccId": this.data.createdAccId,
				"agencyId": this.data.agencyId,
				"businessId": this.data.businessId,
				"initType": this.data.initType,
				"statusCode": this.data.statusCode,
				"acceptAccId": this.data.acceptAccId,
				"dclNo": this.data.amendDclNo,
			}
			utils.Loading();
			var xhttp = new XMLHttpRequest();
			xhttp.withCredentials = true;
			xhttp.onreadystatechange = function () {

				if (this.readyState == 4 && this.status == 200) {
					utils.unLoading();
					var jsonObj = JSON.parse(xhttp.responseText);
					if (jsonObj["ResponseCode"] >= 0) {
						var ediStr = jsonObj["Data"].replace('"', ''); 
						sendWsJs(CMD.SIGN_TXT, FORMAT.BINARY, [ediStr]);
					} 
					else {  
						if (jsonObj.Data) {
							bootbox.alert(jsonObj.Data.message);
						}
						else {
							bootbox.alert(jsonObj.Description);
						}
					}
				}
			};
			xhttp.open("POST", Config.API_Login + "Agency/GetEdiToSign", true);
			xhttp.setRequestHeader("content-type", "application/json");
			xhttp.send(JSON.stringify(data));
		},
		signDecla: function () {

			if (utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 3) {
				bootbox.alert(" Doanh nghiệp chưa cho phép đại lý trình ký!");
				return;
			}

			var self = this;
			var token = $('#hdfToken').val();
			utils.Loading();
			$.ajax({
				url: Config.API_Login + "agency/getSignatureAma",
				type: 'POST',
				data: JSON.stringify({ declarationId: this.data.id }),
				headers: {
					"Authorization": "Bearer " + token
				},
				cache: false,
				contentType: "application/json; charset=utf-8",
				processData: false,
				success: function (data) {
					utils.unLoading();
					debugger;
					if (data) {
						if (data.ResponseCode > 0) {
							bootbox.alert("Thành công!", function () {
								location.reload();
							});  
						}
						else {
							bootbox.alert(JSON.stringify(data.Data.message));
						}
					}
					else {
						bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					}
				},
				error: function (data) {
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					utils.unLoading();
				}
			});
		},
		//--------
		Save: function () {
			if (!this.data.dclNo || !this.data.ieClsf || !this.data.dclKindCd) {
				bootbox.alert("Thiếu thông tin số tờ khai bổ xung");
				return;
			}
			if (!this.data.cstOffice) {
				bootbox.alert("Thiếu thông tin cơ HQ");
				return;
			}
			if (!this.data.dateOfPermit) {
				bootbox.alert("Thiếu Ngày cấp phép");
				return;
			}
			if (!this.data.amendDlcReaCd) {
				bootbox.alert("Bạn chưa chọn mã lý do khai bổ xung");
				return;
			}
			if (!this.data.curCdTaxAmt) {
				bootbox.alert("Bạn chưa chọn Mã tiền tệ của tiền thuế");
				return;
			} 

			if (utils.getCookie("isAgency") == 2 && this.tabObj == 3) {
				this.data.initType = 9;
				this.data.accountId = utils.getCookie("accountIdBuss");
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = this.data.accountId;
				this.data.businessId = this.data.accountId;
				this.data.sigAccId = this.data.accountId;
			}
			else if (utils.getCookie("isAgency") == 1 && utils.getCookie("Type") == 2) {
				this.data.initType = 2;
				this.data.accountId = $("#accIdLogin").val();
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = $("#accIdLogin").val();
				this.data.businessId = $("#accIdLogin").val();
				this.data.sigAccId = $("#accIdLogin").val();
			}
			else if (utils.getCookie("isAgency") == 1 && utils.getCookie("Type") == 1 && (utils.getCookie("permitGroup") == 2 || utils.getCookie("permitGroup") == 3)) {
				this.data.initType = 3;
				this.data.accountId = utils.getCookie("parentId");
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = utils.getCookie("parentId");
				this.data.businessId = utils.getCookie("parentId");
				this.data.sigAccId = utils.getCookie("parentId");
			}
			else if (utils.getCookie("isAgency") == 2 && this.tabObj == 2 && this.signMethodSelect == 21) {
				this.data.initType = 8;
				this.data.accountId = this.data.businessId;
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = utils.getCookie("accountIdBuss");
				this.data.sigAccId = this.data.businessId;
			}
			else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 2 && this.signMethodSelect == 3) {
				this.data.initType = 7;
				this.data.accountId = this.data.businessId;
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = utils.getCookie("accountIdBuss"); 
				this.data.sigAccId = utils.getCookie("accountIdBuss");
			}
			else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && (utils.getCookie("permitGroup") == 2 || utils.getCookie("permitGroup") == 3)) {
				//k cần truyền businessId
				this.data.initType = 5;
				if (!this.data.accountId) this.data.accountId = utils.getCookie("accountIdBuss");
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = utils.getCookie("parentId");
				this.data.sigAccId = utils.getCookie("parentId");
			}
			else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2 && this.signMethodSelect == 3) {
				this.data.initType = 6;
				this.data.accountId = this.data.businessId;
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = $("#accIdLogin").val();
				this.data.sigAccId = this.data.businessId;
			}
			else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2) {
				//k cần truyền businessId
				this.data.initType = 4;
				if (!this.data.accountId) this.data.accountId = utils.getCookie("accountIdBuss");
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = $("#accIdLogin").val();
				this.data.sigAccId = $("#accIdLogin").val();
			}
			else {
				bootbox.alert("Tài khoản của bạn không có quyền tạo");
				return;
			}

			this.data.dclNo = this.data.dclNo.trim(); 
			this.listProducts.push(this.Product); 
			this.data.listProducts = this.listProducts;

			utils.Loading();
			var token = $('#hdfToken').val(); 
			$.ajax({
				url: Config.API_Login + "tax/CreateAMANew",
				type: 'POST',
				data: JSON.stringify(this.data),
				headers: {
					"Authorization": "Bearer " + token
				},
				cache: false,
				contentType: "application/json; charset=utf-8",
				processData: false,
				success: function (data) {
					console.log(data);
					utils.unLoading();
					if (data.ResponseCode > 0) {
						bootbox.alert("Thành công", function () {
							window.location.href = Config.Url_Root + "AMA/InsertUpdateAMA?decId=" + data.Data.id + "&ishight=6&tab=1";
						});
					}
					else {
						bootbox.alert(data.Description);
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
				}
			});

		},
		Update: function () {
			if (!this.data.dclNo || !this.data.ieClsf || !this.data.dclKindCd) {
				bootbox.alert("Thiếu thông tin số tờ khai bổ xung");
				return;
			}
			if (!this.data.cstOffice) {
				bootbox.alert("Thiếu thông tin cơ HQ");
				return;
			}
			if (!this.data.dateOfPermit) {
				bootbox.alert("Thiếu Ngày cấp phép");
				return;
			}
			if (!this.data.amendDlcReaCd) {
				bootbox.alert("Bạn chưa chọn mã lý do khai bổ xung");
				return;
			}
			if (!this.data.curCdTaxAmt) {
				bootbox.alert("Bạn chưa chọn Mã tiền tệ của tiền thuế");
				return;
			}

			var self = this;
			this.data.dclNo = this.data.dclNo.trim(); 
			
			if (this.listProducts.length < this.totalProduct) {
				this.listProducts.push(this.Product);
			}
			this.data.listProducts = this.listProducts;

			if (!this.data.timeLimReIE) this.data.timeLimReIE = "";

			utils.Loading();
			var token = $('#hdfToken').val();
			$.ajax({
				url: Config.API_Login + "tax/UpdateAMANew",
				type: 'POST',
				data: JSON.stringify(this.data),
				headers: {
					"Authorization": "Bearer " + token
				},
				cache: false,
				contentType: "application/json; charset=utf-8",
				processData: false,
				success: function (data) {
					console.log(data);
					utils.unLoading();
					if (data) {
						//self.data = data.Data;
						if (data.ResponseCode > 0) {
							bootbox.alert("Thành công", function () {
								location.reload();
							});
						}
						else {
							bootbox.alert(data.Description);
						}
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				}
			});
		},
		//
		copy: function () {
			var self = this;
			var token = $('#hdfToken').val();
			utils.Loading();
			$.ajax({
				url: Config.API_Login + "tax/CloneAMA",
				type: 'POST',
				data: JSON.stringify({ declarationId: this.data.id }),
				headers: {
					"Authorization": "Bearer " + token
				},
				cache: false,
				contentType: "application/json; charset=utf-8",
				processData: false,
				success: function (data) {
					utils.unLoading();
					if (data.ResponseCode > 0) {
						bootbox.alert("Thành công!", function () {
							window.location.href = Config.Url_Root + "AMA/InsertUpdateAMA?decId=" + data.Data.id + "&ishight=6&tab=1";
						});
					}
					else {
						bootbox.alert(data.Description);
					}
				},
				error: function (data) {
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					utils.unLoading();
				}
			});
		},
		//
		isNumber: function (type, item) {
			//var txt = "";
			if (type == 1) {
				this.Product.taxAmtBTaxAm = this.Product.taxAmtBTaxAm.replace(/[^0-9\,.]+/g, "").replace('.', ','); 
			}
			else if (type == 2) {
				this.Product.taxAmtATaxAm = this.Product.taxAmtATaxAm.replace(/[^0-9\,]+/g, "").replace('.', ',');
			}
			else if (type == 3) {
				item.tAmtBOTColAm = item.tAmtBOTColAm.replace(/[^0-9\,]+/g, "").replace('.', ',');
			}
			else {
				item.tAmtAOTColAm = item.tAmtAOTColAm.replace(/[^0-9\,]+/g, "").replace('.', ',');
			}
		}
    },
    mounted() {
		var self = this;
		var decId = $("#decId").val();
		this.init(function () {
			if (decId && decId > 0) {
				self.loadDetail(decId);
			}
		}); 
		//this.setInputFilter();
		if (decId == 0 || !decId) {

			if ((utils.getCookie("isAgency") == "2" && utils.getCookie("Type") == "2") || (utils.getCookie("agency") == "1" && utils.getCookie("permitGroup") != "3")) {
				this.showPopObject = true;
				this.searchObject();
			}
		}
		 
    },
    computed: {
        // a computed getter
        //stream: function () {
        //    // `this` points to the vm instance
        //    if (this.data.insClsCd === '1')
        //        return 'Luồng xanh';
        //    if (this.data.insClsCd === '2')
        //        return 'Luồng vàng';
        //    if (this.data.insClsCd === '3')
        //        return 'Luồng đỏ';
        //    return 'Chưa phân luồng';
        //}
    },
    watch: {
    }
});