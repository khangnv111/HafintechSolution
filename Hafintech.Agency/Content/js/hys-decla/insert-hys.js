var app = new Vue({
    el: '#hys-insert',
    data: {
        data: {},
		txtappProType: [],   
		lstFiles: [],
		signMethodSelect: 0,
		showSubmit: false,
		showTK: false,
		showRadio: false,
		lstCstSubSection: [],

		//Object
		loadingObj: true,
		showPopObject: false,
		lstDataObj: [],
		tabObj: 1,
		textSearchObj: "", 

		showPop: false,
		typeSearch: 1,
		lstDataPop: [],
		txtCodePop: "",
		txtNamePop: "",
		showLoading: true,
		//
		statusTK: 701,
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.cstOffice = "";
            data.cstSubSection = "";
            data.appProType = ""; 
            data.appPhoneNo = "";
            data.eiControlNo = "";
            data.remarks = "";

			this.txtappProType = await Lib.GetApplicationProcedureType();  
			this.lstCstSubSection = await Lib.getCustomsSubSection();
			this.showRadio = true;
        },
        loadDetail: function (id) {
			var self = this;
            utils.Loading();
            var token = $('#hdfToken').val();
            $.ajax({
                type: 'POST',
				url: Config.API_Login + "tax/GetDetailHYS",
                data: JSON.stringify({
					"id": id,
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("loadDetail: ", data);
                    utils.unLoading();
                    if(data){
						self.data = data.Data;
						  
						//enable  
						self.showSubmit = Vali.CheckEnable(data.Data.initType, data.Data.createdAccId).enableSubmit;
						self.showTK = Vali.CheckEnable(data.Data.initType, data.Data.createdAccId).enableTK; 
                    }
                },
                error: function (data) {
                    utils.unLoading(); 
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
                }
            });
        },
        listChange: function () {
			this.$forceUpdate();
        },
        ReadNameFile: function(){   
            this.lstFiles = []; 
            //var file = ev.target.files; 
			var file = this.$refs.myFiles.files;
            for (var i = 0; i < file.length; i++) { 
                this.lstFiles.push(file[i]); 
            } 
		}, 
		//Objects
		selectTabObj: function (tab) {
			this.textSearchObj = "";
			this.tabObj = tab;

			if (this.tabObj == 3) {  

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
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				}
			});
		},
		pickObj: function (item) {

			//this.data.experNm = item.name;
			//this.data.phoneNoOfExp = item.phoneNumber;
			//this.data.addressOfExp = item.address;

			if (this.tabObj == 1) {
				this.data.accountId = item.accountId;
			}
			else {
				//this.data.initType = 3;
				//this.data.experCd = item.taxIdNumber;
				this.data.businessId = item.accountId;
				this.signMethodSelect = item.signMethod;
			}
			this.data.agencyId = utils.getCookie("isAgency");

			this.closeObj();
		},
		closeObj: function () {
			this.showPopObject = false;
			//this.tabObj = 1;
			this.loadingObj = true;
			this.textSearchObj = "";
		},
		//Libs
		getIntroMess: function (jobCode, errorCode, isFocus) {
			$.ajax({
				type: 'POST',
				url: Config.API_Login + "tax/GetGuideInformation?jobCode=" + jobCode + "&id=" + errorCode,
				data: {
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					//console.log(data);
					if (data.ResponseCode > 0 && data.Data && data.Data.length > 0) {
						var text = data.Data[0].text;
						text = text.replace(/\n/g, "<br>");
						$("#mess_error p").html(text);
					}

					//scroll and focus
					if (isFocus !== undefined && isFocus === 1) {
						var scrH = $("." + errorCode).offset().top;
						$('body,html').animate({ scrollTop: scrH }, 800);

						$("." + errorCode).addClass("error");
						setTimeout(function () {
							$("." + errorCode).removeClass("error");
						}, 3000);
					}
				},
				error: function (data) {
					console.log(data);
				}
			});
		},
		SearchCustom: function () {
			this.showPop = true;
			this.SearchPop();
		},
		SearchPop: function () {
			var self = this;
			//hải quan
			var urlSearch = Config.API_Login + "tax/GetCustomsOffice";
			var dataSearch = {
				cstOfficeCd: this.txtCodePop,
				cstOfficeNm: this.txtNamePop,
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
					self.showLoading = false;
					//console.log(data); 
					if (data) {
						self.lstDataPop = data.Data;
					}
				},
				error: function (data) {
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					return;
				}
			});
		},
		SelectPop: function (item) {
			this.data.cstOffice = item.cstOfficeCd;
			this.data.cstOfficeNm = item.cstOfficeNm;

			this.ClosePop();
		},
		ClosePop: function () { 
			this.showLoading = true;
			this.showPop = false;
			this.lstDataPop = []; //Ds dữ liệu popup
			this.txtCodePop = "";
			this.txtNamePop = "";
		},
        //Button
        ViewResult: function(){
            var data = this.data;
            var id = 0;
            if(data.id) id = data.id;
            var attNo = 0;
			if (data.attachmentNo) attNo = data.attachmentNo;

			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight"); 

			window.location.href = Config.Url_Root + "HYS/ResultsHYS?decId=" + id + "&attNo=" + attNo + "&ishight=" + ishight + "&tab=1&IdDec=" + id;
        },
		Save: function () { 
			var data = this.data;
			if (!data.cstOffice) {
				bootbox.alert("Bạn chưa nhập Mã cơ quan HQ");
				return;
			}
			if (!data.appProType) {
				bootbox.alert("Bạn chưa nhập Phân loại thủ tục khai báo");
				return;
			}

			var totalSize = 0;
			for (var i = 0; i < this.lstFiles.length; i++) {
				var size = parseFloat(this.lstFiles[i].size / 1024).toFixed(2);
				totalSize = +totalSize + +size;
			}
			if (totalSize > 3000) {
				bootbox.alert("Tổng dung lượng file không được quá 3 MB");
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

			data.cstOffice = data.cstOffice.toUpperCase();
			data.appProType = data.appProType.toUpperCase();

            var formData = new FormData();
            for (var i = 0; i < this.lstFiles.length; i++) {
                formData.append(this.lstFiles[i].name, this.lstFiles[i]);
            } 
            formData.append("jsonData", JSON.stringify(data)); 

            utils.Loading();
            var token = $('#hdfToken').val();
            $.ajax({
				url: Config.API_Login + "tax/CreateHYSAgency",
                type: 'POST',
                data: formData,
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) { 
                    utils.unLoading();
					console.log("CreateHYS: ", data);

                    if (data && data.ResponseCode > 0) {
                        $("#attachmentNo").val(data.Data.attachmentNo);
                        bootbox.alert("Khai báo thành công", function () {
							window.location.href = Config.Url_Root + "HYS/InsertHYS?decId=" + data.Data.id + "&ishight=5&tab=1";
                        });
                    }
                    else {
                          
						if (data.Data && data.Data.object) {
							bootbox.alert("Không thành công");
							mess_GP.lstMess = data.Data.object;
							mess_GP.forcusMess();
						}
						else {
							bootbox.alert(data.Description);
						}
                    }
                 
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });

		}, 
		SaveUpdate: function () {
			var data = this.data;
			if (!data.cstOffice) {
				bootbox.alert("Bạn chưa nhập Mã cơ quan HQ");
				return;
			}
			if (!data.appProType) {
				bootbox.alert("Bạn chưa nhập Phân loại thủ tục khai báo");
				return;
			}

			var totalSize = 0;
			for (var i = 0; i < this.lstFiles.length; i++) {
				var size = parseFloat(this.lstFiles[i].size / 1024).toFixed(2);
				totalSize = +totalSize + +size;
			}
			if (totalSize > 3000) {
				bootbox.alert("Tổng dung lượng file không được quá 3 MB");
				return;
			} 

			data.cstOffice = data.cstOffice ? data.cstOffice.toUpperCase() : "";
			data.appProType = data.appProType ? data.appProType.toUpperCase() : "";

			var formData = new FormData();
			for (var i = 0; i < this.lstFiles.length; i++) {
				formData.append(this.lstFiles[i].name, this.lstFiles[i]);
			}
			formData.append("jsonData", JSON.stringify(data));

			utils.Loading();
			var token = $('#hdfToken').val();
			$.ajax({
				url: Config.API_Login + "agency/UpdateHYS",
				type: 'POST',
				data: formData,
				headers: {
					"Authorization": "Bearer " + token
				},
				cache: false,
				contentType: false,
				processData: false,
				success: function (data) {
					utils.unLoading();
					console.log("CreateHYS: ", data);

					if (data && data.ResponseCode > 0) {
						$("#attachmentNo").val(data.Data.attachmentNo);
						bootbox.alert("Thành công", function () {
							window.location.href = Config.Url_Root + "HYS/InsertHYS?decId=" + data.Data.id + "&ishight=5&tab=1";
						});
					}
					else {
						if (data.Data && data.Data.object) {
							bootbox.alert("Không thành công");
							mess_GP.lstMess = data.Data.object;
							mess_GP.forcusMess();
						}
						else {
							bootbox.alert(data.Description);
						}
					}

				},
				error: function (data) {
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					utils.unLoading();
				}
			});

		}, 
		//Submit
		SignHYS: function () {

			if (utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 3) {
				bootbox.alert(" Doanh nghiệp chưa cho phép đại lý trình ký!");
				return;
			}

			var self = this;
			var token = $('#hdfToken').val();
			utils.Loading();
			$.ajax({
				url: Config.API_Login + "Agency/getSignatureAttachment",
				type: 'POST',
				data: JSON.stringify({ dclId: this.data.id }),
				headers: {
					"Authorization": "Bearer " + token
				},
				cache: false,
				contentType: "application/json; charset=utf-8",
				processData: false,
				success: function (data) {
					utils.unLoading();
					if (data) {
						if (data.ResponseCode > 0) {
							bootbox.alert("Thành công!", function () {
								location.reload();
							});
							//self.data = data.Data;
						}
						else if (data.ResponseCode == -100001) {
							bootbox.alert(data.Description);
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
		SubmitHYS: function () {
			if ($("#downSignkey").val() == 1) {
				bootbox.confirm("Bạn chưa có Chữ ký số hoặc Chữ số ký chưa cập nhật. <br> Mời bạn tải Chữ ký số", function (res) {
					if (res) {
						downTK();
					}
				});
				return;
			}

			var ediStr = this.data.ediFileToSign;
			//ediStr += "";
			//ediStr = ediStr.replace('"', '');
			sendWsJs(CMD.SIGN_TXT, FORMAT.BINARY, [ediStr]);
		},
    },
    mounted() {
        this.init();  
		var decId = $("#decId").val();
		if (decId == 0 || !decId) {
			if ((utils.getCookie("isAgency") == "2" && utils.getCookie("Type") == "2") || (utils.getCookie("agency") == "1" && utils.getCookie("permitGroup") != "3")) {
				this.showPopObject = true;
				this.searchObject();
			}
		}
		else {
			this.loadDetail(decId);
		}
    },
    computed: {

	}, 

});