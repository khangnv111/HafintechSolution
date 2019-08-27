var app = new Vue({
    el: '#mec-decla',
    data: {
        data: {},
        currency: [],
        //lstCstSubSection: [],  
        signMethodSelect: 0,
        showSubmit: false,
		showTK: false,
		showRadio: false,

        //Popup chọn đối tượng
        loadingObj: true,
        showPopObject: false,
        lstDataObj: [], 
        tabObj: 1,
        textSearchObj: "", 
        //Popup
        showLoading: true,
        showPop: false,
        lstDataPop: [], //Ds dữ liệu popup
        txtCodePop: "",
        txtNamePop: "",
        typeSearch: 0,

        //chữ ký số
        statusTK: 0,
        messTK: "", 
        jobCode: "MEC",
		disabledSubmit: false,
		//ẩn hiện submit theo tk
		submitTT: false,
		submitUSB: false,

		showCopy: false,

		infoAccount: null, //Thông tin tk đang đăng nhập
    },
    methods: {
        init: async function (callback) {
            var data = this.data;
            data.type = 3;//gia tri thap
			data.cstSubSection = utils.getCookie("cusCodeExport");
			data.cstOffice = utils.getCookie("cusCode");
            //người xuất khẩu
            data.experCd = "";
            data.experNm = "";
            data.postcode = "";
            data.addressOfExp = "";
            data.phoneNoOfExp = "";
            //người NK
            data.consigneeCd = "";
            data.consigneeNm = "";
			 
            data.curCdTtlTaxVal = ""; 
             
            //this.lstCstSubSection = await Lib.getCustomsSubSection();
			this.currency = await Lib.getCurrency(); 

			//Check hiện button submit
			this.submitTT = Vali.CheckButtonSubmit().submitTT;
			this.submitUSB = Vali.CheckButtonSubmit().submitUSB;
			//Lấy account info
			this.infoAccount = await Lib.GetAccountInfo();

			this.showRadio = true;
            if (typeof callback != 'undefined' && typeof callback == 'function')
                callback();
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var dclId = $("#dclId").val();
                if (!dclId || dclId <= 0) return;
                utils.Loading();
                const response = await axios.get(Config.API_Login + "export/GetEDADetail?dclId=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                utils.unLoading();
                if (res.ResponseCode >= 0)
                {
					this.data = response.data.Data;
					if (res.Data.CustomsWarehouses) {
						for (var i = 0; i < res.Data.CustomsWarehouses.length; i++) {
							if (res.Data.cstWrhCd == res.Data.CustomsWarehouses[i].cstWrhCd) {
								this.data.cstWrhNm = res.Data.CustomsWarehouses[i].cstWrhNm;
								break;
							}
						}
					} 
					//Enable  
					this.showSubmit = Vali.CheckEnable(res.Data.initType, res.Data.createdAccId).enableSubmit;
					this.showTK = Vali.CheckEnable(res.Data.initType, res.Data.createdAccId).enableTK;

					if ($("#accIdLogin").val() == this.data.createdAccId)
						this.showCopy = true;
                } 
            } catch (error) {
                utils.unLoading();
                console.error(error);
            }
        },
        //Object
        selectTabObj: function(tab){
            this.textSearchObj = "";
			this.tabObj = tab;
			if (this.tabObj == 3)
			{
				this.data.experNm = this.infoAccount.Accounts.fullName ? this.infoAccount.Accounts.fullName : "";
				this.data.phoneNoOfExp = this.infoAccount.Accounts.mobile ? this.infoAccount.Accounts.mobile : "";
				this.data.addressOfExp = this.infoAccount.Business.address ? this.infoAccount.Business.address : "";
				this.data.addressOfExp = this.infoAccount.Business.address ? this.infoAccount.Business.address : "";
				this.data.experCd = this.infoAccount.Business.taxIdNumber ? this.infoAccount.Business.taxIdNumber : "";
				this.$forceUpdate();

				this.closeObj();
			}
			else
				this.searchObject()
        },
        searchObject: function(){
              
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
            
            if(this.tabObj == 2){
                urlSearch = Config.API_Login + "Business/SearchBusiness";
                dataSearch = {
                    parentId: parentId,
                    businessId: null,
                    taxIdNumber: this.textSearchObj,
                    status: 1,
                }
            }

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
                    app.loadingObj = false;
                    if(data)
                    {
                        app.lstDataObj = data.Data;
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
                }
            });
        },
        pickObj: function(item){
             
            this.data.experNm = item.name;
            this.data.phoneNoOfExp = item.phoneNumber; 
            this.data.addressOfExp = item.address;

            if(this.tabObj == 1){
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
        closeObj: function(){
            this.showPopObject = false; 
            this.loadingObj = true;
            this.textSearchObj = "";
        },
        //popup
        OpenPop: function(type){
            this.typeSearch = type;
            this.showPop = true; 
            this.SearchPop(); 
        },
        SearchPop: function(){
            //hải quan
            var urlSearch = Config.API_Login + "tax/GetCustomsOffice";
            var dataSearch = {
                cstOfficeCd: this.txtCodePop,
                cstOfficeNm: this.txtNamePop,
            }
            //Mã nước
            if(this.typeSearch == 2){
                urlSearch = Config.API_Login + "tax/GetCountry";
                dataSearch = {
					countryCode: this.txtCodePop,
					name: this.txtNamePop,
                }
            }
            //Mã địa điểm lưu kho hàng chờ thông quan dự kiến
            else if(this.typeSearch == 3){
                urlSearch = Config.API_Login + "tax/GetCustomsWarehouse";
                dataSearch = {
                    cstWrhCd: this.txtCodePop,
                    cstWrhNm: this.txtNamePop,
                }
            }
            //Địa điểm nhận hàng cuối cùng
            else if(this.typeSearch == 4){
                urlSearch = Config.API_Login + "tax/GetLoadingLocation";
                dataSearch = {
                    loadLocCd: this.txtCodePop,
                    loadLocNm: this.txtNamePop,
                }
            }
                //Địa điểm xếp hàng
            else if(this.typeSearch == 5){
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
                    if(data){
                        app.lstDataPop = data.Data;
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        },
        SelectPop: function(item){ 
            //Mã cơ quan hải quan tiếp nhận tờ khai 
            if(this.typeSearch == 1){
                this.data.cstOffice = item.cstOfficeCd;
                this.data.cstOfficeNm = item.cstOfficeNm;
            }  
            else if(this.typeSearch == 2){
                this.data.countryCd = item.countryCode; 
            } 
            else if(this.typeSearch == 3){
				this.data.cstWrhCd = item.cstWrhCd; 
				this.data.cstWrhNm = item.cstWrhNm; 
            }
            else if(this.typeSearch == 4){
                this.data.finalDesCd = item.loadLocCd; 
                if(item.type == 2){
                    this.data.finalDesCd = item.countryCd + this.data.finalDesCd;
                }
                
                this.data.finalDesNm = item.loadLocNm; 
            }
            else if(this.typeSearch == 5){
                this.data.loadPortCd = item.unloadPortCd; 
                this.data.loadPortCd = this.data.loadPortCd.replace("VN", "");
                this.data.loadPortNm = item.unloadPortNm; 
            }
            
            this.ClosePop();
        },
        ClosePop: function(){
            this.typeSearch = 0;
            this.showLoading = true;
            this.showPop = false;
            this.lstDataPop = []; //Ds dữ liệu popup
            this.txtCodePop = "";
            this.txtNamePop = "";
        },
        //========= Libs ===================== 
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
        ChangeText: function(){
            if(this.data.consigneeNm){
                this.data.consigneeNm = this.data.consigneeNm.toUpperCase();
                this.data.consigneeNm = utils.ConvertVietNamese(this.data.consigneeNm);
            }
            if(this.data.address1Street){
                this.data.address1Street = this.data.address1Street.toUpperCase();
                this.data.address1Street = utils.ConvertVietNamese(this.data.address1Street);
            }
            if(this.data.address2Street){
                this.data.address2Street = this.data.address2Street.toUpperCase();
                this.data.address2Street = utils.ConvertVietNamese(this.data.address2Street);
            }
            if(this.data.address3CityNm){
                this.data.address3CityNm = this.data.address3CityNm.toUpperCase();
                this.data.address3CityNm = utils.ConvertVietNamese(this.data.address3CityNm);
            }
            if(this.data.countryNm){
                this.data.countryNm = this.data.countryNm.toUpperCase();
                this.data.countryNm = utils.ConvertVietNamese(this.data.countryNm);
            }
            if(this.data.houseAwbNo){
                this.data.houseAwbNo = this.data.houseAwbNo.toUpperCase();
                this.data.houseAwbNo = utils.ConvertVietNamese(this.data.houseAwbNo);
            }
            if(this.data.eiControlNo){
                this.data.eiControlNo = this.data.eiControlNo.toUpperCase();
                this.data.eiControlNo = utils.ConvertVietNamese(this.data.eiControlNo);
            }
		},
		SetForcus: function (Field) {

			if ($("." + Field)[0]) {
				$("." + Field).addClass("error");
				var scrH = $("." + Field).offset().top;
				$('body,html').animate({ scrollTop: scrH }, 800);

				setTimeout(function () {
					$("." + Field).removeClass("error");
				}, 5000);
			}
		},
        //========== button action ============
        ViewResult: function(tab){
            var id = 0;
            if(this.data.declarationId) id = this.data.declarationId;
            var dclNo = 0;
			if (this.data.dclNo) dclNo = this.data.dclNo;

			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight"); 

			window.location.href = Config.Url_Root + "ExportDeclaration/ResultMEC?decId=" + id + "&dclNo=" + dclNo + "&tab=" + tab + "&ishight=" + ishight;
        }, 
        submitMEC: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/SubmitMEC",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.declarationId }),
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
                            //utils.Message("Thành công!");
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/MEC_InsertUpdate?decId=" + data.Data.declarationId + "&tab=1&ishight=3";
                            }); 
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data && data.Data.object) {
                                bootbox.alert("Không thành công! Mời bạn kiểm tra lại dữ liệu đã nhập");
                                mess_GP.lstMess = data.Data.object;
                                mess_GP.forcusMess();
                            }
                            else {
                                bootbox.alert(data.Description);
                            }
                        }
                    }
                    else {
                        bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    } 
                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
                }
            });
        },
        submitMEE: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/SubmitMEE",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.declarationId }),
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
                            //utils.Message("Thành công!");
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/MEC_InsertUpdate?decId=" + data.Data.declarationId + "&tab=3&ishight=3";
                            });  
                        }
                        else {
							if (data.Data && data.Data.object) {
								bootbox.alert("Không thành công! Mời bạn kiểm tra lại dữ liệu đã nhập");
								mess_GP.lstMess = ress.Data.object;
								mess_GP.forcusMess();
							}
							else {
								bootbox.alert(data.Description);
							}
                        }
                    }
                    else {
                        bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    } 
                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
                }
            });
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
                url: Config.API_Login + "Agency/GetSignatureExport",
                type: 'POST',
                data: JSON.stringify({ dclId: this.data.declarationId }),
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
                            bootbox.alert("Thành công!", function(){
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
		save: function () {
			var self = this;

			if (!this.data.experCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPC');
					}
				});
				return;
			}
			if (!this.data.phoneNoOfExp) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPT');
					}
				});
				return;
			} 
			if (!this.data.consigneeNm) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CGN');
					}
				});
				return;
			}
			if (!this.data.address1Street) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CGA');
					}
				});
				return;
			}
			if (!this.data.houseAwbNo) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('AWB');
					}
				});
				return;
			}
			if (!this.data.cargoPiece) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('NO');
					}
				});
				return;
			}
			if (!this.data.cstWrhCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('ST');
					}
				});
				return;
			}
			if (!this.data.cargoWeigGrs) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('GW');
					}
				});
				return;
			} 
			if (!this.data.finalDesCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('DSC');
					}
				});
				return;
			} 
			if (!this.data.loadPortCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('PSC');
					}
				});
				return;
			} 
			if (!this.data.totalTaxVal) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('FKK');
					}
				});
				return;
			} 
			if (!this.data.curCdTtlTaxVal) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('FCD');
					}
				});
				return;
			}
			if (!this.data.itemName) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CMN');
					}
				});
				return;
			} 

			//debugger;
			if (utils.getCookie("isAgency") == 2 && this.tabObj == 3) {
				this.data.initType = 9;
				this.data.accountId = utils.getCookie("accountIdBuss");
				this.data.createdAccId = $("#accIdLogin").val();
				this.data.agencyId = this.data.accountId;
				this.data.businessId = this.data.accountId;
				this.data.sigAccId = this.data.accountId;
			}
			else if(utils.getCookie("isAgency") == 1 && utils.getCookie("Type") == 2){
                this.data.initType = 2;
                this.data.accountId = $("#accIdLogin").val();
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.agencyId = $("#accIdLogin").val();
                this.data.businessId = $("#accIdLogin").val();
                this.data.sigAccId = $("#accIdLogin").val();
			} 
            else if(utils.getCookie("isAgency") == 1 && utils.getCookie("Type") == 1 && (utils.getCookie("permitGroup") == 2 || utils.getCookie("permitGroup") == 3)){
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
			 
            var token = $('#hdfToken').val();
			this.data.countryCd = this.data.countryCd ? this.data.countryCd.toUpperCase() : ""; 
			this.data.cstOffice = this.data.cstOffice ? this.data.cstOffice.toUpperCase() : ""; 
			this.data.cstWrhCd = this.data.cstWrhCd ? this.data.cstWrhCd.toUpperCase() : ""; 
			this.data.finalDesCd = this.data.finalDesCd ? this.data.finalDesCd.toUpperCase() : ""; 
			this.data.loadPortCd = this.data.loadPortCd ? this.data.loadPortCd.toUpperCase() : ""; 
            
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/createeda",
                type: 'POST',
                data: JSON.stringify(this.data),
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
                            bootbox.alert("Thêm tờ khai thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/MEC_InsertUpdate?decId=" + data.Data.declarationId + "&ishight=3&tab=1";
                            });
							 
                        }
                        else {
                            bootbox.alert(data.Description);
                        }
                    }
                    else {
                        bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    }
                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!") 
                }
            });
        },
		update: function () { 
			var self = this;

			if (!this.data.experCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPC');
					}
				});
				return;
			}
			if (!this.data.phoneNoOfExp) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPT');
					}
				});
				return;
			}
			if (!this.data.consigneeNm) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CGN');
					}
				});
				return;
			}
			if (!this.data.address1Street) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CGA');
					}
				});
				return;
			}
			if (!this.data.houseAwbNo) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('AWB');
					}
				});
				return;
			}
			if (!this.data.cargoPiece) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('NO');
					}
				});
				return;
			}
			if (!this.data.cstWrhCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('ST');
					}
				});
				return;
			}
			if (!this.data.cargoWeigGrs) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('GW');
					}
				});
				return;
			}
			if (!this.data.finalDesCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('DSC');
					}
				});
				return;
			}
			if (!this.data.loadPortCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('PSC');
					}
				});
				return;
			}
			if (!this.data.totalTaxVal) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('FKK');
					}
				});
				return;
			}
			if (!this.data.curCdTtlTaxVal) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('FCD');
					}
				});
				return;
			}
			if (!this.data.itemName) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CMN');
					}
				});
				return;
			} 
			 
			this.data.countryCd = this.data.countryCd ? this.data.countryCd.toUpperCase() : "";
			this.data.cstOffice = this.data.cstOffice ? this.data.cstOffice.toUpperCase() : "";
			this.data.cstWrhCd = this.data.cstWrhCd ? this.data.cstWrhCd.toUpperCase() : "";
			this.data.finalDesCd = this.data.finalDesCd ? this.data.finalDesCd.toUpperCase() : "";
			this.data.loadPortCd = this.data.loadPortCd ? this.data.loadPortCd.toUpperCase() : ""; 

            var token = $('#hdfToken').val();  
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/updateeda",
                type: 'POST',
                data: JSON.stringify(this.data),
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
                            //utils.Message("Cập nhật tờ khai thành công!");
							bootbox.alert("Cập nhật tờ khai thành công", function () {
								location.reload();
                            });  
                        }
                        else {
                            bootbox.alert(data.Description);
                        }
                    }
                    else {
                        bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    
                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
                }
            });
        },
        SubmitSign: function(status){
            if($("#downSignkey").val() == 1){
                bootbox.confirm("Bạn chưa có Chữ ký số hoặc Chữ số ký chưa cập nhật. <br> Mời bạn tải Chữ ký số", function(res){
                    if(res){
                        downTK();
                    }
                });
                return;
            }

			this.disabledSubmit = true;
            this.statusTK  = status;  
            var data = {
                "dclId": this.data.declarationId,
                "status": status
            }
            utils.Loading();
            var xhttp = new XMLHttpRequest();
            xhttp.withCredentials = true;
            xhttp.onreadystatechange = function () { 
                
                if (this.readyState == 4 && this.status == 200) {
                    utils.unLoading();
                    var jsonObj = JSON.parse(xhttp.responseText);
                    //console.log("jsonObj - SubmitSign: ", jsonObj);
                    if (jsonObj["ResponseCode"] >= 0) {
                        var ediStr = jsonObj["Data"].replace('"', '');
                        //document.getElementById("txtMessage").value = ediStr;
                        app.messTK = ediStr;
                        sendWsJs(CMD.SIGN_TXT, FORMAT.BINARY, [ediStr]);
                    }
                    else {
                        //document.getElementById("txtMessage").value = xhttp.responseText;
						app.disabledSubmit = false;
						app.messTK = xhttp.responseText;
						bootbox.alert(jsonObj.Data.message);
                    }
                }
            };
			xhttp.open("POST", Config.API_Login + "Agency/GetEdiToSign", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(data));
		},

		///
		copy: function () {
			var self = this;
			var token = $('#hdfToken').val();
			utils.Loading();
			$.ajax({
				url: Config.API_Login + "tax/CloneExportDeclaration",
				type: 'POST',
				data: JSON.stringify({ declarationId: this.data.declarationId }),
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
							window.location.href = Config.Url_Root + "ExportDeclaration/MEC_InsertUpdate?decId=" + data.Data.declarationId + "&ishight=3&tab=1";
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
		ExportXLS: function () {

			utils.Loading();
			$.ajax({
				type: 'POST',
				url: Config.Url_Root + "ExportDeclaration/ExportXLSMEC",
				data: JSON.stringify(this.data),
				contentType: "application/json; charset=utf-8",
				dataType: "html",
				processData: true,
				crossDomain: true,
				xhrFields: { withCredentials: true },
				cache: false,
				success: function (data) {
					utils.unLoading();
					if (data) {
						data = JSON.parse(data);
						if (data.Response > 0) {
							window.location.href = data.linkDown;
						}
						else {
							bootbox.alert(data.msg);
						}
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				}
			});

		},
    },
    mounted() { 
        var self = this; 
        var dclId = $("#dclId").val();
        this.init(function(){
            if(dclId > 0){
                app.loadDetail();
            }
        });

        if(dclId == 0 || !dclId){ 

			if ((utils.getCookie("isAgency") == "2" && utils.getCookie("Type") == "2") || (utils.getCookie("agency") == "1" &&  utils.getCookie("permitGroup") != "3")){
                this.showPopObject = true;
                this.searchObject();
            } 
        }
    },
    computed: {
        // a computed getter
            stream: function () {
                var luong = this.data.insClsCd;
                luong += '';

                // `this` points to the vm instance
                if (this.data.insClsCd == '1')
                    return 'Luồng xanh';
                if (this.data.insClsCd == '2')
                    return 'Luồng vàng';
                if (luong.indexOf('3') > -1)
                    return 'Luồng đỏ';
                return 'Chưa phân luồng';
            }
    }
});