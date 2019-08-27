var app = new Vue({
    el: '#form-input',
    data: {
        data: {
            loadLocCd:""
		},
		tabInfo: 1,

		tabObj: 1,
        signMethodSelect: 0, 
        enableSubmit: false,
		enableTK: false,
		disabledSubmit: false, //disable khi đang trong quá trình submit USB

        signMethod: 0,
        dclKindNm: "",

        lstMeansOfTrs: [],
        lstCargoCls: [],
        lstCstSubSection: [],
        lsPermit: [],
        lstCstValueCur: [],
        lstInvCls: [],
        lstTermOfPay: [],
        lstExtPayDue: [],
        lstClsAttach: [],
        lstTransportPlace: [],
        lstInvPrcKind: [],
        lstPrcCdtCd: [],
        currency: [],
        lstOrganizationType: [],
        lstProduct: [],
        lstValDemar: [],
        lstFreightDemar: [],
        lstInsDemar: [],
        lstAdjDemarNm: [],
        lstCodeResult: [], //Mã kết quả kiểm tra nội dung
		 
		permitType: [],//Dữ liệu giấy phép nhập khẩu

        //Trình ký
        messTK: "",
        statusTK: 0,
        jobCode: "IDA",
		disableSubmit: false, 
		//ẩn hiện submit theo tk
		submitTT: false,
		submitUSB: false,

		showCopy: false,
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.lsPermit = [];
            data.lsDosAttc = [];
            data.lsCargoNo = [];
            //data.lsVanPlcCd = [];
            data.lsContainerNo = [];
			data.clsAttachment = [];
			data.lsOtherLawCode = [];  
			data.lsAdjDemar = [];
			data.lsTransInfo = []; 

            for (var i = 0; i < 50; i++) {
				data.lsContainerNo.push({ containerNo: "" });  

				if (i < 5) {
					data.lsAdjDemar.push({ adjDemarNm: "", adjDemarCd: "", curCdOfEvaAmt: "", evaluatedAmt: "", totalDisEva: "" });
					//Giấy phép nhập khẩu
					data.lsPermit.push({ permitType: "", permitLicNo: "" });
					this.permitType.push({str :""});
					//Văn bản pháp quy
					data.lsOtherLawCode.push({ otherLawCd: "" }); 
					//
					//data.lsVanPlcCd.push({ vanPlcCd: "" });
					//vận đơn
					data.lsCargoNo.push({ cargoNo: "" });
				}  
				if (i < 3) {
					data.clsAttachment.push({ clsAttachment: "", attachmentNo: "" });
					data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" });
					data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' });
				} 
			} 

            data.meansOfTrsCd = "";
			data.invPrcCdtCd = "";
			data.clsOrg = "";
            data.invPrcKindCd = "";
            data.cargoClsCd = 0; 
            data.invClsCd = "";
            data.termOfPay = 0;
            data.accountId = 0;
            data.invCurCd = ""; 
			data.destTransPlace = 0;
			data.freightDemarCd = "";
			data.freightCurCd = "";
			data.taxPayer = 1;
			data.resultInsCd = "";
			data.curCdBasePrc = "";

			data.cstOffice = utils.getCookie("cusCode") == null ? "" : utils.getCookie("cusCode");
			data.cstSubSection = utils.getCookie("cusCodeImport") == null ? "" : utils.getCookie("cusCodeImport");

            data.type = 2//gia tri cao
			 
            this.lstCargoCls = await Lib.getcargoClsCdCode();
            this.lstMeansOfTrs = await Lib.getmeansOfTrsCd();
            this.lstCstSubSection = await Lib.getCustomsSubSection();
            this.lsPermit = await Lib.getPermitType();
            this.lstInvCls = await Lib.getInvoiceClassification();
            this.lstTermOfPay = await Lib.getTermOfPayment();
            this.lstExtPayDue = await Lib.getTaxExpiration();
            this.lstClsAttach = await Lib.getClassificationAttachment();
            this.lstTransportPlace = await Lib.getTransportPlace();
            this.lstInvPrcKind = await Lib.getinvPrcKindCd();
            this.lstPrcCdtCd = await Lib.getInvoiceValueCondition();
            this.currency = await Lib.getCurrency();
            this.lstOrganizationType = await Lib.getOrganizationType();
            this.lstValDemar = await Lib.getInvoiceValue();
            this.lstFreightDemar = await Lib.GetTransportFeeCodes();
            this.lstInsDemar = await Lib.getInsuranceFeeCode();
            this.lstAdjDemarNm = await Lib.getAdjName();
			this.lstCodeResult = await Lib.getResult(); 
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var dclId = $("#dclId").val();
                if (!dclId || dclId <= 0) {
                     
					this.$forceUpdate();
                    return;
                }
                
				utils.Loading();
                const response = await axios.get(Config.API_Login + "import/GetDeclarationDetail?dclId=" + dclId + "&dclNo=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
					}); 
				utils.unLoading();
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.data = response.data.Data;
					this.changeData();

                    if (!this.data.lsAdjDemar || this.data.lsAdjDemar.length == 0)
                        for (var i = 0; i < 5; i++) {
							this.data.lsAdjDemar.push({ adjDemarNm: "", adjDemarCd: "", curCdOfEvaAmt: "", evaluatedAmt: "", totalDisEva: "" });
                        }
                    if (!this.data.clsAttachment || this.data.clsAttachment.length == 0)
                        for (var i = 0; i < 3; i++) {
							this.data.clsAttachment.push({ clsAttachment: "", attachmentNo: "" });
						}

					var taxLen = response.data.Data.lsTaxInfo.length;
					if (taxLen < 6)
						for (var i = 0; i < 6 - taxLen; i++) {
							this.data.lsTaxInfo.push({ taxSubjectCd: "", taxSubjectNm: "", totalTaxAmt: "", noColTotalTax: "" });
						}
					var curLen = response.data.Data.lsCurrency.length;
					if (curLen < 3)
						for (var i = 0; i < 3 - curLen; i++) {
							this.data.lsCurrency.push({ curCd: "", curExcRate: "" });
						}
					var lsCargoNoLen = response.data.Data.lsCargoNo.length;
					if (lsCargoNoLen < 5)
						for (var i = 0; i < 5 - lsCargoNoLen; i++) {
							this.data.lsCargoNo.push({ cargoNo: "" });
						}

					var lsOtherLawLen = response.data.Data.lsOtherLawCode.length;
					if (lsOtherLawLen < 5)
						for (var i = 0; i < 5 - lsOtherLawLen; i++) {
							this.data.lsOtherLawCode.push({ otherLawCd: "" });
						} 
					for (var i = 0; i < response.data.Data.lsOtherLawCode.length; i++) { 
						if (response.data.Data.lsOtherLawCode[i].otherLawCd) {
							this.SearchNameLaw(response.data.Data.lsOtherLawCode[i]);
						}
					}

					var lsPermit = response.data.Data.lsPermit.length;
					for (var i = 0; i < lsPermit; i++) {
						if (this.data.lsPermit[i].permitType && this.data.lsPermit[i].permitLicNo) {
							var str = this.data.lsPermit[i].permitType + "||" + this.data.lsPermit[i].permitLicNo;
							this.permitType[i].str = str;
						}
					}
					if (lsPermit < 5) {
						for (var i = 0; i < 5 - lsPermit; i++) {
							this.data.lsPermit.push({ permitType: "", permitLicNo: "" });
						}
					}
					
					//Get Name
					if (this.data.DeclarationKinds) this.dclKindNm = this.data.DeclarationKinds[0].dclKindNm;
					if (this.data.LoadingLocations) this.data.loadLocNm = this.data.LoadingLocations[0].loadLocNm;
					if (this.data.CustomsOffices) {
						this.data.cstOfficeNm = this.data.CustomsOffices[0].cstOfficeNm;
					}
					if (this.data.CustomsWarehouses) {
						this.data.cstWrhNm = this.data.CustomsWarehouses[0].cstWrhNm;
					}
					if (this.data.UnloadingPorts) this.data.unloadPortNm = this.data.UnloadingPorts[0].unloadPortNm;

					//Check hiện button submit
					this.submitTT = Vali.CheckButtonSubmit().submitTT;
					this.submitUSB = Vali.CheckButtonSubmit().submitUSB;
                    //enable  
					this.enableSubmit = Vali.CheckEnable(res.Data.initType, res.Data.createdAccId).enableSubmit;
					this.enableTK = Vali.CheckEnable(res.Data.initType, res.Data.createdAccId).enableTK;  

					if ($("#accIdLogin").val() == this.data.createdAccId)
						this.showCopy = true;

					//convert datetime
					this.data.dclPlannedDate = this.data.dclPlannedDate ? Ctrl.convertDate(this.data.dclPlannedDate).date : "";
					this.data.timeLimReExp = this.data.timeLimReExp ? Ctrl.convertDate(this.data.timeLimReExp).date : "";
					this.data.arrDate = this.data.arrDate ? Ctrl.convertDate(this.data.arrDate).date : "";
					this.data.invDate = this.data.invDate ? Ctrl.convertDate(this.data.invDate).date : "";
					this.data.permitWrhDate = this.data.permitWrhDate ? Ctrl.convertDate(this.data.permitWrhDate).date : "";
					this.data.strDateTrs = this.data.strDateTrs ? Ctrl.convertDate(this.data.strDateTrs).date : "";
					this.data.arrDateOfTrs = this.data.arrDateOfTrs ? Ctrl.convertDate(this.data.arrDateOfTrs).date : "";

					this.data.regDate = this.data.regDate ? Ctrl.convertDateInt(this.data.regDate).date : "";
					this.data.regTime = this.data.regTime ? Ctrl.convertTimeInt(this.data.regTime).time : "";
					this.data.regDateOfCor = this.data.regDateOfCor ? Ctrl.convertDateInt(this.data.regDateOfCor).date : "";
					this.data.regTimeOfCor = this.data.regTimeOfCor ? Ctrl.convertTimeInt(this.data.regTimeOfCor).time : "";

					if (this.data.lsTransInfo) {
						for (var i = 0; i < this.data.lsTransInfo.length; i++) {
							this.data.lsTransInfo[i].arrDateTrnLoc = this.data.lsTransInfo[i].arrDateTrnLoc ? Ctrl.convertDate(this.data.lsTransInfo[i].arrDateTrnLoc).date : "";
							this.data.lsTransInfo[i].strDateTrnLoc = this.data.lsTransInfo[i].strDateTrnLoc ? Ctrl.convertDate(this.data.lsTransInfo[i].strDateTrnLoc).date : "";
						}
					}
                }
                //else return null;
			} catch (error) {
				utils.unLoading();
                console.error(error);
            }
		}, 
		//-------new page----
		ViewResult: function (tab) {
			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight"); 

            var id = this.data.dclId ? this.data.dclId : 0;
            var dclNo = this.data.dclNo ? this.data.dclNo : 0;
			window.location.href = Config.Url_Root + "Declaration/IDA_Result?IdDec=" + id + "&dclNo=" + dclNo + "&ishight=" + ishight + "&tab=" + tab;
        },
        ViewProduct: function(tab){
			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight"); 

            var id = this.data.dclId ? this.data.dclId : 0;
			var dclNo = this.data.dclNo ? this.data.dclNo : 0;
			window.location.href = Config.Url_Root + "Declaration/ListProduct?IdDec=" + id + "&dclNo=" + dclNo + "&ishight=" + ishight +"&tab=" + tab;
		}, 
		//------actions--
        getSeachFileAttack: function (index) {
            hq.getSeachFileAttack(index);
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
		SelectTabInfo: function (tab) {
			this.tabInfo = tab;
			$('body,html').animate({ scrollTop: 0 }, 800);
		},
		//===================
		//---Libs---
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
		listChange: function (type, index) { 
			if (type == 1) {
				var str = this.permitType[index].str.split('||');
				this.data.lsPermit[index].permitType = str[0] ? str[0] : "";
				this.data.lsPermit[index].permitLicNo = str[1] ? str[1] : "";
			}
			this.$forceUpdate();
		}, 
		//Pop Law
		PopLaw: function (index) {
			DePop.PopLaw(index);
		},
		SearchNameLaw: function (item) {
			var self = this;
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'GET',
				url: Config.API_Login + "tax/GetDocumment",
				data: {
					docummentCode: item.otherLawCd,
					docummentName: "",
					docummentDate: "",
					content: ""
				},
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					//console.log(data); 
					if (data.ResponseCode > 0) {
						item.otherLawCdText = item.otherLawCd + " | " + data.Data[0].docummentName;
					}
				},
				error: function (data) {
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
					return;
				}
			});
		},
		//---Submit--
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
                    debugger;
                    if (data) {
                        if (data.ResponseCode > 0) {
                            //bootbox.alert("Thành công!");
                            bootbox.alert("Thành công!", function () {
                                if (status == 6) {
                                    window.location.href = Config.Url_Root + "Declaration/HightValueDeInsert?IdDec=" + data.Data.dclId + "&ishight=2&tab=5";
                                }
                                else if (status == 7) {
                                    window.location.href = Config.Url_Root + "Declaration/HightValueDeInsert?IdDec=" + data.Data.dclId + "&ishight=2&tab=6";
								}
								else if (status == 5) {
									window.location.href = Config.Url_Root + "Declaration/HightValueDeInsert?IdDec=" + data.Data.dclId + "&ishight=2&tab=5";
								}
                                else {
                                    window.location.href = Config.Url_Root + "Declaration/HightValueDeInsert?IdDec=" + data.Data.dclId + "&ishight=2&tab=3";
                                }
                            });
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
		save: function () {
			if (!this.data.dclKindCd) {
				bootbox.alert("Bạn chưa chọn mã loại hình"); 
				this.SetForcus('ICB', 1);
				return;
			}
			if (!this.data.clsOrg) {
				bootbox.alert("Bạn chưa chọn phân loại cá nhân tổ chức"); 
				this.SetForcus('SKB', 1);
				return;
			}
			if (!this.data.meansOfTrsCd) {
				bootbox.alert("Bạn chưa chọn Mã phương thức vận chuyển"); 
				this.SetForcus('MTC', 1);
				return;
			}
			if (!this.data.phoneNoOfImp) {
				bootbox.alert("Bạn chưa nhập SĐT người nhập khẩu"); 
				this.SetForcus('IMT', 1);
				return;
			}
			if (!this.data.consignorNm) {
				bootbox.alert("Bạn chưa nhập Tên người xuất khẩu"); 
				this.SetForcus('EPN', 1);
				return;
			}
			if (!this.data.address1Street) {
				bootbox.alert("Bạn cần nhập thông tin trường địa chỉ đầu tiên người xuất khẩu"); 
				this.SetForcus('EPN', 1);
				return;
			}
			if (!this.data.countryCd) {
				bootbox.alert("Bạn chưa Mã nước xuất khẩu"); 
				this.SetForcus('EPO', 1);
				return;
			}
			if (!this.data.cargoPiece) {
				bootbox.alert("Bạn chưa nhập số lượng kiện"); 
				this.SetForcus('NO', 1);
				return;
			}
			if (!this.data.pieceUnitCd) {
				bootbox.alert("Bạn chưa nhập Đơn vị số lượng kiện"); 
				this.SetForcus('NOT', 1);
				return;
			}
			if (!this.data.arrDate) {
				bootbox.alert("Bạn chưa nhập Ngày hàng đến"); 
				this.SetForcus('ARR', 1);
				return;
			}
			if (!this.data.loadLocCd) {
				bootbox.alert("Bạn chưa nhập Địa điểm xếp hàng"); 
				this.SetForcus('PSC', 1);
				return;
			}
			if (!this.data.invClsCd) {
				bootbox.alert("Bạn chưa nhập Phân loại hình thức hóa đơn"); 
				this.SetForcus('IV1', 2);
				return;
			}
			if (!this.data.invPrcCdtCd) {
				bootbox.alert("Bạn chưa nhập Điều kiện giá hóa đơn"); 
				this.SetForcus('IP2', 2);
				return;
			}
			if (!this.data.invPrcKindCd) {
				bootbox.alert("Bạn chưa nhập Mã phân loại giá hóa đơn"); 
				this.SetForcus('IP1', 2);
				return;
			}
			if (!this.data.invCurCd) {
				bootbox.alert("Bạn chưa nhập Mã đồng tiền của hóa đơn"); 
				this.SetForcus('IP3', 2);
				return;
			}
			if (!this.data.totalInvPrc) {
				bootbox.alert("Bạn chưa nhập Tổng trị giá hóa đơn"); 
				this.SetForcus('IP4', 2);
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
			 
			//return;
			var token = $('#hdfToken').val();
			var self = this;
			this.data.cstOffice = this.data.cstOffice ? this.data.cstOffice.toUpperCase() : "";
			this.data.unloadPortCd = this.data.unloadPortCd ? this.data.unloadPortCd.toUpperCase() : "";
			this.data.loadLocCd = this.data.loadLocCd ? this.data.loadLocCd.toUpperCase() : "";

			this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : "";
			this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : "";
			this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : "";
			this.data.address3CityNm = this.data.address3CityNm ? this.data.address3CityNm.toUpperCase() : "";
			this.data.countryNm = this.data.countryNm ? this.data.countryNm.toUpperCase() : "";
			this.data.impCtrNm = this.data.impCtrNm ? this.data.impCtrNm.toUpperCase() : "";
			this.data.loadVesselCd = this.data.loadVesselCd ? this.data.loadVesselCd.toUpperCase() : "";
			this.data.loadVesselAcNm = this.data.loadVesselAcNm ? this.data.loadVesselAcNm.toUpperCase() : "";
			this.data.cstWrhCd = this.data.cstWrhCd ? this.data.cstWrhCd.toUpperCase() : "";
			this.data.countryCd = this.data.countryCd ? this.data.countryCd.toUpperCase() : "";
			this.data.marksAndNos = this.data.marksAndNos ? this.data.marksAndNos.toUpperCase() : "";

			debugger;
			for (var i = 0; i < this.data.lsCargoNo.length; i++) {
				var item = this.data.lsCargoNo[i];
				item.cargoNo = item.cargoNo ? item.cargoNo.toUpperCase() : "";
			}

			utils.Loading();
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
					console.log("createeda: ", data);
					utils.unLoading();

					if (data) {
						if (data.ResponseCode > 0 && data.Data != null) {
							self.data = data.Data;
							bootbox.alert("Thêm tờ khai thành công!", function () {
								window.location.href = Config.Url_Root + "Declaration/ListProduct?IdDec=" + data.Data.dclId + "&ishight=2&tab=1";
							});
						}
						else {
							if (data.Data && data.Data.object) {
								bootbox.alert(JSON.stringify(data.Data.object));
							}
							else {
								utils.Message(data.Description);
							} 
						}
					}
					else {
						utils.Message("Hệ thống bận, vui lòng quay lại sau!");
					}
				},
				error: function (data) {
					utils.Message("Hệ thống bận, vui lòng quay lại sau!");
					utils.unLoading();
				}
			});
		},
		update: function () {

			if (!this.data.dclKindCd) {
				bootbox.alert("Bạn chưa chọn mã loại hình");
				this.SetForcus('ICB', 1);
				return;
			}
			if (!this.data.clsOrg) {
				bootbox.alert("Bạn chưa chọn phân loại cá nhân tổ chức");
				this.SetForcus('SKB', 1);
				return;
			}
			if (!this.data.meansOfTrsCd) {
				bootbox.alert("Bạn chưa chọn Mã phương thức vận chuyển");
				this.SetForcus('MTC', 1);
				return;
			}
			if (!this.data.phoneNoOfImp) {
				bootbox.alert("Bạn chưa nhập SĐT người nhập khẩu");
				this.SetForcus('IMT', 1);
				return;
			}
			if (!this.data.consignorNm) {
				bootbox.alert("Bạn chưa nhập Tên người xuất khẩu");
				this.SetForcus('EPN', 1);
				return;
			}
			if (!this.data.address1Street) {
				bootbox.alert("Bạn cần nhập thông tin trường địa chỉ đầu tiên người xuất khẩu");
				this.SetForcus('EPN', 1);
				return;
			}
			if (!this.data.countryCd) {
				bootbox.alert("Bạn chưa Mã nước xuất khẩu");
				this.SetForcus('EPO', 1);
				return;
			}
			if (!this.data.cargoPiece) {
				bootbox.alert("Bạn chưa nhập số lượng kiện");
				this.SetForcus('NO', 1);
				return;
			}
			if (!this.data.pieceUnitCd) {
				bootbox.alert("Bạn chưa nhập Đơn vị số lượng kiện");
				this.SetForcus('NOT', 1);
				return;
			}
			if (!this.data.arrDate) {
				bootbox.alert("Bạn chưa nhập Ngày hàng đến");
				this.SetForcus('ARR', 1);
				return;
			}
			if (!this.data.loadLocCd) {
				bootbox.alert("Bạn chưa nhập Địa điểm xếp hàng");
				this.SetForcus('PSC', 1);
				return;
			}
			if (!this.data.invClsCd) {
				bootbox.alert("Bạn chưa nhập Phân loại hình thức hóa đơn");
				this.SetForcus('IV1', 2);
				return;
			}
			if (!this.data.invPrcCdtCd) {
				bootbox.alert("Bạn chưa nhập Điều kiện giá hóa đơn");
				this.SetForcus('IP2', 2);
				return;
			}
			if (!this.data.invPrcKindCd) {
				bootbox.alert("Bạn chưa nhập Mã phân loại giá hóa đơn");
				this.SetForcus('IP1', 2);
				return;
			}
			if (!this.data.invCurCd) {
				bootbox.alert("Bạn chưa nhập Mã đồng tiền của hóa đơn");
				this.SetForcus('IP3', 2);
				return;
			}
			if (!this.data.totalInvPrc) {
				bootbox.alert("Bạn chưa nhập Tổng trị giá hóa đơn");
				this.SetForcus('IP4', 2);
				return;
			}

			var token = $('#hdfToken').val();

			this.data.cstOffice = this.data.cstOffice ? this.data.cstOffice.toUpperCase() : "";
			this.data.unloadPortCd = this.data.unloadPortCd ? this.data.unloadPortCd.toUpperCase() : "";
			this.data.loadLocCd = this.data.loadLocCd ? this.data.loadLocCd.toUpperCase() : "";

			this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : "";
			this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : "";
			this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : "";
			this.data.address3CityNm = this.data.address3CityNm ? this.data.address3CityNm.toUpperCase() : "";
			this.data.countryNm = this.data.countryNm ? this.data.countryNm.toUpperCase() : "";
			this.data.impCtrNm = this.data.impCtrNm ? this.data.impCtrNm.toUpperCase() : ""; 
			this.data.loadVesselCd = this.data.loadVesselCd ? this.data.loadVesselCd.toUpperCase() : "";
			this.data.loadVesselAcNm = this.data.loadVesselAcNm ? this.data.loadVesselAcNm.toUpperCase() : "";
			this.data.cstWrhCd = this.data.cstWrhCd ? this.data.cstWrhCd.toUpperCase() : "";
			this.data.countryCd = this.data.countryCd ? this.data.countryCd.toUpperCase() : "";
			this.data.marksAndNos = this.data.marksAndNos ? this.data.marksAndNos.toUpperCase() : "";

			this.data.regDate = this.data.regDate ? this.data.regDate.replace(/-/g, '') : "";
			this.data.regTime = this.data.regTime ? this.data.regTime.replace(/:/g, '') : "";
			this.data.regDateOfCor = this.data.regDateOfCor ? this.data.regDateOfCor.replace(/-/g, '') : "";
			this.data.regTimeOfCor = this.data.regTimeOfCor ? this.data.regTimeOfCor.replace(/:/g, '') : "";

			var self = this;
			utils.Loading();
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
						if (data.ResponseCode > 0 && data.Data != null) {
							bootbox.alert("Cập nhật tờ khai thành công!", function () {
								window.location.reload();
							});
							console.log(data.Data);
							// self.data = data.Data;
						}
						else {
							if (data.Data && data.Data.object) {
								bootbox.alert(JSON.stringify(data.Data.object));
							}
							else {
								utils.Message(data.Description);
							} 
						}
					}
					else {
						utils.Message("Hệ thống bận, vui lòng quay lại sau!");
					}
				},
				error: function (data) {
					utils.Message("Hệ thống bận, vui lòng quay lại sau!");
					utils.unLoading();
				}
			});
		},
		//
		copy: function () {
			var self = this;
			var token = $('#hdfToken').val();
			utils.Loading();
			$.ajax({
				url: Config.API_Login + "tax/CloneDeclaration",
				type: 'POST',
				data: JSON.stringify({ declarationId: this.data.dclId}),
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
							window.location.href = Config.Url_Root + "Declaration/HightValueDeInsert?IdDec=" + data.Data.dclId + "&ishight=2&tab=1";
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
		SetForcus: function (Field, tab) {
			this.tabInfo = tab;

			setTimeout(function () {
				if ($("." + Field)[0]) {
					$("." + Field).addClass("error");
					var scrH = $("." + Field).offset().top;
					$('body,html').animate({ scrollTop: scrH }, 800);

					setTimeout(function () {
						$("." + Field).removeClass("error");
					}, 5000);
				}
			}, 500); 
		},
		ExportXLS: function () {
			utils.Loading();
			$.ajax({
				type: 'POST',
				url: Config.Url_Root + "Declaration/ExportXLSIDA",
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
		this.init();  
		this.loadDetail();
		windowOnload();
    },
    computed: {
        // a computed getter
        stream: function () {
            // `this` points to the vm instance
            if (this.data.insClsCd === '1')
                return 'Luồng xanh';
            if (this.data.insClsCd === '2')
                return 'Luồng vàng';
            if (this.data.insClsCd === '3')
                return 'Luồng đỏ';
            return 'Chưa phân luồng';
        }
    },
    watch: { 
    }
});