var app = new Vue({
    el: '#form-input-file',
    data: {
        data: { 
		},
		tabObj: 1,
        signMethodSelect: 0,
        signMethod: 0,  
        enableSubmit: false,
		enableTK: false,
		disabledSubmit: false,

        currency: [],
        //lstCstSubSection: [],
        lstOrganizationType: [],
        lstPrcCdtCd: [],
        lstInvPrcKind: [],
        lstInsDemar: [],
        lstFreightDemar: [],

        //Trình ký
        messTK: "",
        statusTK: 0,
        jobCode: "MIC",
        disableSubmit: false,
		//ẩn hiện submit theo tk
		submitTT: false,
		submitUSB: false,

		showCopy: false
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.type = 1//gia tri thap 
            data.cstValueCurCd = 0;
            data.curCdTtlTaxVal = 0; 
            data.initType = 1;

            data.imperCd = "";
            data.phoneNoOfImp = "";
            data.imperNm = "";
			data.addressOfImp = "";
			data.clsOrg = ""; 
			data.invPrcKindCd = "";
			data.invPrcCdtCd = "";
			data.invCurCd = "";
			data.freightDemarCd = "";
			data.freightCurCd = "";
			data.insDemarCd = "";
			data.insCurCd = "";

			data.cstOffice = utils.getCookie("cusCode") == null ? "" : utils.getCookie("cusCode");
			data.cstSubSection = utils.getCookie("cusCodeImport") == null ? "" : utils.getCookie("cusCodeImport");

            utils.Loading();
            //this.lstCstSubSection = await Lib.getCustomsSubSection();
            this.lstOrganizationType = await Lib.getOrganizationType();
            this.currency = await Lib.getCurrency();
            this.lstPrcCdtCd = await Lib.getInvoiceValueCondition();
            this.lstInvPrcKind = await Lib.getinvPrcKindCd();
            this.lstInsDemar = await Lib.getInsuranceFeeCode();
            this.lstFreightDemar = await Lib.GetTransportFeeCodes();
            await this.loadDetail();
            utils.unLoading()
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var dclId = $("#dclId").val();
				if (!dclId || dclId <= 0) {  
					return;
				}
                const response = await axios.get(Config.API_Login + "import/GetDeclarationDetail?dclId=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
					});
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.data = response.data.Data; 
					this.changeData();

					//Check hiện button submit
					this.submitTT = Vali.CheckButtonSubmit().submitTT;
					this.submitUSB = Vali.CheckButtonSubmit().submitUSB;
					//enable
					this.enableSubmit = Vali.CheckEnable(res.Data.initType, res.Data.createdAccId).enableSubmit;
					this.enableTK = Vali.CheckEnable(res.Data.initType, res.Data.createdAccId).enableTK;

					this.data.arrDate = this.data.arrDate ? Ctrl.convertDate(this.data.arrDate).date : ""; 
					this.data.regDate = this.data.regDate ? Ctrl.convertDateInt(this.data.regDate).date : "";
					this.data.regTime = this.data.regTime ? Ctrl.convertTimeInt(this.data.regTime).time : ""; 
					this.data.regDateOfCor = this.data.regDateOfCor ? Ctrl.convertDateInt(this.data.regDateOfCor).date : "";
					this.data.regTimeOfCor = this.data.regTimeOfCor ? Ctrl.convertTimeInt(this.data.regTimeOfCor).time : "";

					if ($("#accIdLogin").val() == this.data.createdAccId)
						this.showCopy = true;

					//tên nước xuất xứ
					//if (this.data.Countrys && this.data.placeOriginCd) {
					//	for (var i = 0; i < this.data.Countrys.length; i++) {
					//		if (this.data.placeOriginCd == this.data.Countrys[i].countryCode) {
					//			this.data.countryName = this.data.Countrys[i].countryName;
					//			break;
					//		}
					//	}
					//}
                }
                //else return null;
			} catch (error) {
				utils.unLoading();
                console.error(error);
            }
        },
		ViewResult: function (tab) { 
			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight"); 
            
            var id = this.data.dclId ? this.data.dclId : 0;
            var dclNo = this.data.dclNo ? this.data.dclNo : 0;
			window.location.href = Config.Url_Root + "Declaration/MIC_Result?IdDec=" + id + "&dclNo=" + dclNo + "&ishight=" + ishight + "&tab=" + tab;
        },
		save: function () {
			var self = this;

			if (!this.data.clsOrg) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('SKB');
					}
				});
				return;
			}
			if (!this.data.cstOffice) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CH');
					}
				});
				return;
			}
			if (!this.data.imperCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('IMC');
					}
				});
				return;
			}
			if (!this.data.phoneNoOfImp) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('IMT');
					}
				});
				return;
			}
			if (!this.data.consignorNm) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPN');
					}
				});
				return;
			}
			if (!this.data.countryCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPO');
					}
				});
				return;
			} 
			if (!this.data.address1Street) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPA');
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
			if (!this.data.arrDate) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('ARR');
					}
				});
				return;
			}
			if (!this.data.flightNo) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('VSN');
					}
				});
				return;
			}
			if (!this.data.unloadPortCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('DST');
					}
				});
				return;
			}
			if (!this.data.loadLocCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('PSC');
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
			if (!this.data.placeOriginCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('OR');
					}
				});
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

			this.data.cstOffice = this.data.cstOffice ? this.data.cstOffice.toUpperCase() : null;
			this.data.cstWrhCd = this.data.cstWrhCd ? this.data.cstWrhCd.toUpperCase() : null;
            this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
			this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
			this.data.address3CityNm = this.data.address3CityNm ? this.data.address3CityNm.toUpperCase() : null;
			this.data.countryNm = this.data.countryNm ? this.data.countryNm.toUpperCase() : null;
			this.data.placeOriginCd = this.data.placeOriginCd ? this.data.placeOriginCd.toUpperCase() : null;
			this.data.masterAwbNo = this.data.masterAwbNo ? this.data.masterAwbNo.toUpperCase() : null;
			this.data.houseAwbNo = this.data.houseAwbNo ? this.data.houseAwbNo.toUpperCase() : null;
			this.data.eiControlNo = this.data.eiControlNo ? this.data.eiControlNo.toUpperCase() : null;
			this.data.flightNo = this.data.flightNo ? this.data.flightNo.toUpperCase() : null;
			this.data.unloadPortCd = this.data.unloadPortCd ? this.data.unloadPortCd.toUpperCase() : null;
			this.data.loadLocCd = this.data.loadLocCd ? this.data.loadLocCd.toUpperCase() : null;
			this.data.countryCd = this.data.countryCd ? this.data.countryCd.toUpperCase() : null;

			this.data.itemName = this.data.itemName ? this.data.itemName.replace(/(?:\r\n|\r|\n)/g, '') : "";
			this.data.addressOfImp = this.data.addressOfImp ? this.data.addressOfImp.replace(/(?:\r\n|\r|\n)/g, '') : "";
			this.data.notes = this.data.notes ? this.data.notes.replace(/(?:\r\n|\r|\n)/g, '') : "";
			 
			var token = $('#hdfToken').val();
            utils.Loading()
            $.ajax({
                url: Config.API_Login + "agency/CreateDeclaration",
                type: 'POST',
                data: JSON.stringify(this.data),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) { 
                    utils.unLoading()
                    if (data) {
                        if (data.ResponseCode > 0) {
                            console.log("save Mec: ", data.Data);
                            //bootbox.alert("Thêm tờ khai thành công!");
                            bootbox.alert("Thêm tờ khai thành công!", function () {
                                window.location.href = Config.Url_Root + "Declaration/LowValueDeInsert?ishight=1&tab=1&IdDec=" + data.Data.dclId;
                            });
                            self.data = data.Data;
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
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading()
                }
            });
        },
        update: function () { 

			if (!this.data.clsOrg) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('SKB');
					}
				});
				return;
			}
			if (!this.data.cstOffice) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('CH');
					}
				});
				return;
			}
			if (!this.data.imperCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('IMC');
					}
				});
				return;
			}
			if (!this.data.phoneNoOfImp) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('IMT');
					}
				});
				return;
			}
			if (!this.data.consignorNm) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPN');
					}
				});
				return;
			}
			if (!this.data.countryCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPO');
					}
				});
				return;
			}
			if (!this.data.address1Street) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('EPA');
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
			if (!this.data.arrDate) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('ARR');
					}
				});
				return;
			}
			if (!this.data.flightNo) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('VSN');
					}
				});
				return;
			}
			if (!this.data.unloadPortCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('DST');
					}
				});
				return;
			}
			if (!this.data.loadLocCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('PSC');
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
			if (!this.data.placeOriginCd) {
				bootbox.alert({
					title: "Thông báo",
					message: "Bạn cần phải điền đẩy đủ thông tin vào các trường bắt buộc",
					callback: function () {
						self.SetForcus('OR');
					}
				});
				return;
			} 

			this.data.cstOffice = this.data.cstOffice ? this.data.cstOffice.toUpperCase() : null;
			this.data.cstWrhCd = this.data.cstWrhCd ? this.data.cstWrhCd.toUpperCase() : null;
			this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
			this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
			this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
			this.data.address3CityNm = this.data.address3CityNm ? this.data.address3CityNm.toUpperCase() : null;
			this.data.countryNm = this.data.countryNm ? this.data.countryNm.toUpperCase() : null;
			this.data.placeOriginCd = this.data.placeOriginCd ? this.data.placeOriginCd.toUpperCase() : null;
			this.data.masterAwbNo = this.data.masterAwbNo ? this.data.masterAwbNo.toUpperCase() : null;
			this.data.houseAwbNo = this.data.houseAwbNo ? this.data.houseAwbNo.toUpperCase() : null;
			this.data.eiControlNo = this.data.eiControlNo ? this.data.eiControlNo.toUpperCase() : null;
			this.data.flightNo = this.data.flightNo ? this.data.flightNo.toUpperCase() : null;
			this.data.unloadPortCd = this.data.unloadPortCd ? this.data.unloadPortCd.toUpperCase() : null;
			this.data.loadLocCd = this.data.loadLocCd ? this.data.loadLocCd.toUpperCase() : null;
			this.data.countryCd = this.data.countryCd ? this.data.countryCd.toUpperCase() : null;

			this.data.itemName = this.data.itemName ? this.data.itemName.replace(/(?:\r\n|\r|\n)/g, '') : "";
			this.data.addressOfImp = this.data.addressOfImp ? this.data.addressOfImp.replace(/(?:\r\n|\r|\n)/g, '') : "";
			this.data.notes = this.data.notes ? this.data.notes.replace(/(?:\r\n|\r|\n)/g, '') : "";

			this.data.regDate = this.data.regDate ? this.data.regDate.replace(/-/g, '') : "";
			this.data.regTime = this.data.regTime ? this.data.regTime.replace(/:/g, '') : ""; 
			this.data.regDateOfCor = this.data.regDateOfCor ? this.data.regDateOfCor.replace(/-/g, '') : "";
			this.data.regTimeOfCor = this.data.regTimeOfCor ? this.data.regTimeOfCor.replace(/:/g, '') : "";

			var token = $('#hdfToken').val();
            var self = this;
            utils.Loading()
            $.ajax({
                url: Config.API_Login + "agency/UpdateDeclaration",
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
                            // bootbox.alert("Cập nhật tờ khai thành công!");
                            bootbox.alert("Cập nhật tờ khai thành công", function () {
                                window.location.reload();
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
        signDecla: function () {

            if (utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 3) {
                bootbox.alert(" Doanh nghiệp chưa cho phép đại lý trình ký!");
                return;
            }

            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "agency/SignDecla",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.dclId }),
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
        submit: function (status) {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "agency/submit",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.dclId, status: status }),
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
                            bootbox.alert("Thành công!");
                            //bootbox.alert("Thành công!", function () {
                            //});
                            console.log(data.Data);
                            self.data = data.Data;
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
        getSeachFileAttack: function (index) {
            hq.getSeachFileAttack(index);
        },
        listChange: function () {
            this.$forceUpdate()
        },
        rename: function () {
            debugger;
            var valuecheck = $("#slmeansOfTrsCd").val();
            if (valuecheck != 4 && valuecheck != 5) {
                data.loadPortCd = this.data.loadPortCd.replace("VN", "");
            }
        },
        changeData: function () {
            if (this.data.permitWrhDate && !this.data.permitWrhDate.includes('-')) {
                this.data.permitWrhDate = this.convertDate(this.data.permitWrhDate);
            }
            if (this.data.deptPlanDate && !this.data.deptPlanDate.includes('-')) {
                this.data.deptPlanDate = this.convertDate(this.data.deptPlanDate);
            }
            if (this.data.arrDate && !this.data.arrDate.includes('-')) {
                this.data.arrDate = this.convertDate(this.data.arrDate);
            }
            if (this.data.strDateTrs && !this.data.strDateTrs.includes('-')) {
                this.data.strDateTrs = this.convertDate(this.data.strDateTrs);
            }
        },
        convertDate: function (date) {
            if (!date) return;
            return `${date.substring(6, 10)}-${date.substring(0, 2)}-${date.substring(3, 5)}`
        },
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
						for (var i = 0; i < data.Data.length; i++) {
							if (errorCode == data.Data[i].id) {
								var text = data.Data[i].text;
								text = text.replace(/\n/g, "<br>");
								$("#mess_error p").html(text);
								break;
							}
						} 
                    }
					 
                },
                error: function (data) {
                    console.log(data);
                }
            });
        }, 
        SubmitSign: function(status){ 
            //debugger;
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
                "dclId": this.data.dclId,
                "status": status
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
                        app.messTK = ediStr;
                        sendWsJs(CMD.SIGN_TXT, FORMAT.BINARY, [ediStr]);
                    }
                    else { 
						app.messTK = xhttp.responseText;
						bootbox.alert(jsonObj.Description);
						app.disabledSubmit = false;
                    }
                } 
            };
            xhttp.open("POST", Config.API_Login + "Agency/GetEdiToSign", true);
            xhttp.setRequestHeader("content-type", "application/json");
            xhttp.send(JSON.stringify(data));
		},
		//
		copy: function () {
			var self = this;
			var token = $('#hdfToken').val();
			utils.Loading();
			$.ajax({
				url: Config.API_Login + "tax/CloneDeclaration",
				type: 'POST',
				data: JSON.stringify({ declarationId: this.data.dclId }),
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
							window.location.href = Config.Url_Root + "Declaration/LowValueDeInsert?IdDec=" + data.Data.dclId + "&ishight=1&tab=1";
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
		exportXLS: function () {
			utils.Loading();
			$.ajax({
				type: 'POST',
				url: Config.Url_Root + "Declaration/ExportXLSMIC",
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
    },
    mounted() {
        this.init();
        var self = this; 
    },
    computed: {
        // a computed getter
        stream: function () {
            var luong = this.data.insClsCd;
            luong += '';

            // `this` points to the vm instance
            if (this.data.insClsCd === '1')
                return 'Luồng xanh';
            if (this.data.insClsCd === '2')
                return 'Luồng vàng';
            if (luong.indexOf('3') > -1)
                return 'Luồng đỏ';
            return 'Chưa phân luồng';
        }
    },
    watch: {
    }
});