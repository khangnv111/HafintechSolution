var app = new Vue({
    el: '#app',
    data: {
        data: {},
        tabEda: 1,

        signMethodSelect: 0,
        showSubmit: false,
        isSubmitUSB: false,
        isSubmit: false,
        showTK: false,
        showUpdate: true,
        tabDecla: 1,

        showRadio: false,
        //Popup chọn đối tượng
        loadingObj: true,
        showPopObject: false,
        lstDataObj: [],
        tabObj: 1,
        textSearchObj: "",

        lstMeansOfTrs: [],//mã hiệu phương thức vc
        lstCargoCls: [], //Mã phân loại hàng hóa
        lstCstSubSection: [], //Mã bộ phận xử lý tờ khai
        lsPermit: [],//Giấy phép xuất khẩu
        lstInvCls: [],//Phân loại hình thức hóa đơn
        lstTermOfPay: [], //Phương thức thanh toán
        lstPrcCdtCd: [],//Tổng trị giá hóa đơn
        lstInvPrcKind: [],//
        currency: [],//
        lstExtPayDue: [],//Mã xác định thời hạn nộp thuế
        lstTransportPlace: [],//Địa điểm thông tin trung chuyển
        //---Popup---
        showLoading: true,
        showPop: false,
        lstDataPop: [], //Ds dữ liệu popup
        txtCodePop: "",
        txtNamePop: "",
        typeSearch: 0,

        lstCstValueCur: [],
        lstClsAttach: [],
        lstProduct: [],
        lstMess: [],
        //chữ ký số
        statusTK: 0,
        messTK: "",
        jobCode: "EDA",
        disableSubmit: false,
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.type = 4//gia tri cao 

            data.lsCargoNo = [];
            data.lsCargoNo.push({ cargoNo: "" });
            data.lsCargoNo.push({ cargoNo: "" });
            data.lsCargoNo.push({ cargoNo: "" });

            data.lsDosAttc = [];
            data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" });
            data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" });
            data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" });

            data.lsTransInfo = [];
            data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' });
            data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' });
            data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' });

            data.lsPermit = [];
            for (var i = 0; i < 5; i++) {
                data.lsPermit.push({ permitType: "" });
            }
            data.taxPayer = 1;
            //data.meansOfTrsCd = 0;
            //data.cargoClsCd = "";
            data.cstSubSection = 0;
            data.invClsCd = "";
            data.termOfPay = "";
            data.invPrcCdtCd = "";
            data.invPrcKindCd = "";
            data.invCurCd = "";
            data.curCdTtlTaxVal = "";
            data.extPayDueCd = "";
            data.destTransPlace = "";
            data.dclKindNm = "";

            this.lstMeansOfTrs = await Lib.getmeansOfTrsCd();//mã hiệu phương thức vc
            this.lstCargoCls = await Lib.getcargoClsCdCode();
            this.lstCstSubSection = await Lib.getCustomsSubSection();
            this.lstInvCls = await Lib.getInvoiceClassification();
            this.lstTermOfPay = await Lib.getTermOfPayment();
            this.lstPrcCdtCd = await Lib.getInvoiceValueCondition();
            this.lstInvPrcKind = await Lib.getinvPrcKindCd();
            this.currency = await Lib.getCurrency();
            this.lstExtPayDue = await Lib.getTaxExpiration();
            this.lstTransportPlace = await Lib.getTransportPlace();
            //-------
            data.lsVanPlcCd = [];
            data.lsContainerNo = [];

            for (var i = 0; i < 5; i++) {
                data.lsVanPlcCd.push({ vanPlcCd: "" })
            }
            for (var i = 0; i < 50; i++) {
                data.lsContainerNo.push({ containerNo: "" })
            }
            data.accountId = 0;
            this.lsPermit = await Lib.getPermitType();
            this.lstClsAttach = await Lib.getClassificationAttachment();
            this.showRadio = true;
            this.loadDetail();
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var url = new URL(window.location.href);
                var dclId = url.searchParams.get("decId");
                var accId = $("#accIdLogin").val();
                var accountInfo;
                if (!dclId || dclId <= 0) {
                    accountInfo = await Lib.GetAccountInfo();
                    if (!accountInfo) return;
                    accountInfo = accountInfo.Accounts
                    this.SearchBusiness(accountInfo.accountId);
                    this.$forceUpdate()
                    return;
                } else {
                    accountInfo = await Lib.GetInfoByAccountID(accId);
                }
                const response = await axios.get(Config.API_Login + "export/GetEDADetail?dclId=" + dclId + "&dclNo=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.data = response.data.Data;
                    this.data.dDataEleRegis = this.FormatDate(this.data.dDataEleRegis);
                    this.data.tDataEleRegis = this.FormatTime(this.data.tDataEleRegis);

                    this.changeData();

                    //var linkManagerVoucher = Config.Url_Root + $("#linkManagerVoucher").attr("data-controler") + "/" + $("#linkManagerVoucher").attr("data-action") + "?idDec=" + $("#linkManagerVoucher").attr("data-idDec") + "&type=5&tab=1&ishight=4&dclNo=" + this.data.dclNo;
                    //$("#linkManagerVoucher").attr("href", linkManagerVoucher);
                    if (accountInfo.Business.submitMethod == null) {
                        this.isSubmitUSB = true;
                        this.isSubmit = true;
                    } else if (accountInfo.Business.submitMethod == 1) {
                        this.isSubmit = true;
                    } else if (accountInfo.Business.submitMethod == 0) {
                        this.isSubmitUSB = true;
                    }

                    //Check hiển thị button
                    switch (res.Data.initType) {
                        case 1:
                            this.showSubmit = true;
                            break;
                        case 2:
                            this.showSubmit = true;
                            break;
                        case 3:
                            if (utils.getCookie("permitGroup") == 3 || utils.getCookie("Type") == 2) //GroupPermit = 3 : Hiển thị nút submit (262) && Account.type = 2 => Hiển thị nút submit (260)
                                this.showSubmit = true;
                            else if (utils.getCookie("permitGroup") == 2) // //GroupPermit = 2 : Hiển thị nút trình ký (261); 
                                this.showTK = true;
                            break;
                        case 4:
                            if (utils.getCookie("isAgency") == 2 && (utils.getCookie("permitGroup") != 2))
                                this.showSubmit = true;
                            break;
                        case 5:
                            if (utils.getCookie("permitGroup") == 3 || utils.getCookie("Type") == 2) //GroupPermit = 3 : Hiển thị nút submit (262) && Account.type = 2 => Hiển thị nút submit (260)
                                this.showSubmit = true;
                            else if (utils.getCookie("permitGroup") == 2) // //GroupPermit = 2 : Hiển thị nút trình ký (261); 
                                this.showTK = true;
                            break;
                        case 6:
                            if (utils.getCookie("isAgency") == 2 && utils.getCookie("permitGroup") != 2)
                                this.showSubmit = true;
                            break;
                        case 7:
                            if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2)
                                this.showSubmit = true;
                            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") != 2)
                                this.showSubmit = true;
                            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 2)
                                this.showTK = true;
                            break;
                        case 8:
                            if (utils.getCookie("isAgency") == 2)
                                this.showTK = true;
                            else if (utils.getCookie("isAgency") == 1 && utils.getCookie("Type") == 2 || utils.getCookie("permitGroup") != 2)
                                this.showSubmit = true;
                            break;
                        case 9:
                            if (utils.getCookie("permitGroup") == 3 || utils.getCookie("Type") == 2) //GroupPermit = 3 : Hiển thị nút submit (262) && Account.type = 2 => Hiển thị nút submit (260)
                                this.showSubmit = true;
                            else if (utils.getCookie("permitGroup") == 2) // //GroupPermit = 2 : Hiển thị nút trình ký (261); 
                                this.showTK = true;
                            break;
                    }

                    var lsConLength = res.Data.lsContainerNo.length;
                    if (lsConLength < 50)
                        for (var i = 0; i < 50 - lsConLength; i++) {
                            this.data.lsContainerNo.push({ containerNo: "" })
                        }

                    var lsCargoNoLen = res.Data.lsCargoNo.length;
                    if (lsCargoNoLen < 3)
                        for (var j = 0; j < 3 - lsCargoNoLen; j++) {
                            this.data.lsCargoNo.push({ cargoNo: "" });
                        }
                    var lstPermit = res.Data.lsPermit.length;
                    if (lstPermit < 1) {
                        for (var i = 0; i < 5; i++) {
                            this.data.lsPermit.push({ permitType: "" });
                        }
                    }
                    var lsDosAttc = res.Data.lsDosAttc.length;
                    if (lsDosAttc < 3) {
                        for (var j = 0; j < 3 - lsDosAttc; j++) {
                            this.data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" });
                        }
                    }
                    var lsTransInfo = res.Data.lsTransInfo.length;
                    if (lsTransInfo < 3) {
                        for (var j = 0; j < 3 - lsTransInfo; j++) {
                            this.data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' });
                        }
                    }

                    // Check hiển thị nút cập nhật
                    if (this.data.declarationId) {
                        if (this.data.statusCode == 'EDC' || this.data.statusCode == 'EDA01' || this.data.statusCode == 'EDA' || this.data.statusCode == 'EDE') {
                            this.showUpdate = false;
                        }
                        //if (this.data.statusCode == 'EDE') {
                        //    var dclNo = this.data.dclNo;
                        //    dclNo = dclNo.Substring(dclNo.length - 1, dclNo.length);
                        //    if (parseInt(dclNo) >= 9) {
                        //        this.showUpdate = false;
                        //    }
                        //}
                    }
                }
                //else return null;
            } catch (error) {
                console.log(error);
            }
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
                url: Config.API_Login + "agency/GetSignatureExport",
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
                            bootbox.alert("Thành công!");
                            //self.data = data.Data;
                            setTimeout(function () {
                                location.reload();
                            }, 3000);
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
        //Object
        selectTabObj: function (tab) {
            this.textSearchObj = "";
            this.tabObj = tab;
            this.searchObject()
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
            if (this.tabObj == 3) {
                var accountId = $("#accIdLogin").val();
                var url = Config.API_Login + "Account/GetInfo?accountID=" + accountId;
                var token = $('#hdfToken').val();
                $.ajax({
                    type: 'GET',
                    url: url,
                    data: {},
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (ress) {
                        if (ress) {
                            this.data.initType = 9;
                            this.data.accountId = ress.Data.Business.accountId;
                            this.data.createdAccId = accountId;
                            this.data.agencyId = ress.Data.Business.accountId;
                            this.data.businessId = ress.Data.Business.accountId;
                            this.data.sigAccId = ress.Data.Business.accountId;
                        }
                    },
                    error: function (ress) {
                        bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    }
                });
                this.closeObj();
                return;
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
                    if (data) {
                        app.lstDataObj = data.Data;
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                }
            });
        },
        pickObj: function (item) {
            this.data.experNm = item.name;
            this.data.phoneNoOfExp = item.phoneNumber;
            this.data.addressOfExp = item.address;

            if (this.tabObj == 1) {
                app.data.accountId = item.accountId;
            }
            else {
                //app.data.initType = 3;
                app.data.experCd = item.taxIdNumber;
                app.data.businessId = item.accountId;
                app.signMethodSelect = item.signMethod;
            }
            app.data.agencyId = utils.getCookie("isAgency");

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
                cstOfficeCd: this.txtCodePop.trim(),
                cstOfficeNm: this.txtNamePop.trim(),
            }
            //Mã nước
            if (this.typeSearch == 2) {
                urlSearch = Config.API_Login + "tax/GetCountry";
                dataSearch = {
                    countryCode: this.txtCodePop.trim(),
                    countryName: this.txtNamePop.trim(),
                }
            }
            //Mã địa điểm lưu kho hàng chờ thông quan dự kiến
            else if (this.typeSearch == 3) {
                urlSearch = Config.API_Login + "tax/GetCustomsWarehouse";
                dataSearch = {
                    cstWrhCd: this.txtCodePop.trim(),
                    cstWrhNm: this.txtNamePop.trim(),
                }
            }
            //Địa điểm nhận hàng cuối cùng
            else if (this.typeSearch == 4) {
                urlSearch = Config.API_Login + "tax/GetLoadingLocation";
                dataSearch = {
                    loadLocCd: this.txtCodePop.trim(),
                    loadLocNm: this.txtNamePop.trim(),
                    countryCd:"",
                }
            }
            //Địa điểm xếp hàng
            else if (this.typeSearch == 5) {
                urlSearch = Config.API_Login + "tax/GetUnloadingPort";
                dataSearch = {
                    unloadPortCd: this.txtCodePop.trim(),
                    unloadPortNm: this.txtNamePop.trim(),
                }
            }
            //Số lượng kiện
            else if (this.typeSearch == 6) {
                urlSearch = Config.API_Login + "tax/GetQuantityUnit";
                dataSearch = {
                    quanUnitCd: this.txtCodePop.trim(),
                    quanUnitNm: this.txtNamePop.trim(),
                }
            }
            //Số lượng kiện
            else if (this.typeSearch == 7) {
                urlSearch = Config.API_Login + "tax/GetWeightUnit";
                dataSearch = {
                    weigUnitCd: this.txtCodePop.trim(),
                    weigUnitNm: this.txtNamePop.trim(),
                }
            }
            //Phương tiện vận chuyển
            else if (this.typeSearch == 8) {
                urlSearch = Config.API_Login + "tax/GetLoadingVessel";
                dataSearch = {
                    loadVesselCd: this.txtCodePop.trim(),
                    loadVesselNm: this.txtNamePop.trim(),
                }
            }
            //ngân hàng
            else if (this.typeSearch == 9 || this.typeSearch == 10) {
                urlSearch = Config.API_Login + "tax/GetBank";
                dataSearch = {
                    bankCode: this.txtCodePop.trim(),
                    bankName: this.txtNamePop.trim(),
                }
            }
            //Mã loại hình
            else if (this.typeSearch == 12) {
                urlSearch = Config.API_Login + "tax/GetExportKind";
                dataSearch = {
                    code: this.txtCodePop.trim(),
                    name: this.txtNamePop.trim(),
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
            if (app.typeSearch == 1) {
                app.data.cstOffice = item.cstOfficeCd;
                app.data.cstOfficeNm = item.cstOfficeNm;
            }
            else if (app.typeSearch == 2) {
                app.data.countryCd = item.countryCode;
            }
            else if (app.typeSearch == 3) {
                app.data.cstWrhCd = item.cstWrhCd;
                app.data.cstClrWrhNm = item.cstWrhNm;
            }
            else if (app.typeSearch == 4) {
                app.data.finalDesCd = item.loadLocCd;
                app.data.finalDesNm = item.loadLocNm;
                app.data.countryCd = item.countryCd;
            }
            else if (app.typeSearch == 5) {
                app.data.loadPortCd = item.unloadPortCd;
                //app.data.loadPortCd = this.data.loadPortCd.replace("VN", "");
                app.data.loadPortNm = item.unloadPortNm;
            }
            else if (app.typeSearch == 6) {
                app.data.pieceUnitCd = item.quanUnitCd;
                app.data.quanUnitNm = item.quanUnitNm;
            }
            else if (app.typeSearch == 7) {
                app.data.weigUnitCdGrs = item.weigUnitCd;
                app.data.weigUnitNm = item.weigUnitNm;
            }
            else if (app.typeSearch == 8) {
                //app.data.lPlanVesselCd = item.loadVesselCd;
                app.data.lPlanVesselNm = item.loadVesselNm;
            }
            else if (app.typeSearch == 9) {
                app.data.bankPayCd = item.bankCode;
                app.data.bankPayNm = item.bankName;
            }
            else if (app.typeSearch == 10) {
                app.data.secSupplBankCd = item.bankCode;
                app.data.secSupplBankNm = item.bankName;
            }
            else if (app.typeSearch == 11) {
                app.data.dclKindCd = item.dclKindCd;
                app.data.dclKindNm = item.dclKindNm;
            }
            else if (app.typeSearch == 12) {
                app.data.dclKindCd = item.code;
                app.data.dclKindNm = item.name;
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
        //========Libs========
        ChangeText: function () {
            if (this.data.expCtrNm) {
                this.data.expCtrNm = this.data.expCtrNm.toUpperCase();
                this.data.expCtrNm = utils.ConvertVietNamese(this.data.expCtrNm);
            }
            if (this.data.address1Street) {
                this.data.address1Street = this.data.address1Street.toUpperCase();
                this.data.address1Street = utils.ConvertVietNamese(this.data.address1Street);
            }
            if (this.data.address2Street) {
                this.data.address2Street = this.data.address2Street.toUpperCase();
                this.data.address2Street = utils.ConvertVietNamese(this.data.address2Street);
            }
            if (this.data.address3CityNm) {
                this.data.address3CityNm = this.data.address3CityNm.toUpperCase();
                this.data.address3CityNm = utils.ConvertVietNamese(this.data.address3CityNm);
            }
            if (this.data.address4CityNm) {
                this.data.address4CityNm = this.data.address4CityNm.toUpperCase();
                this.data.address4CityNm = utils.ConvertVietNamese(this.data.address4CityNm);
            }
            if (this.data.countryNm) {
                this.data.countryNm = this.data.countryNm.toUpperCase();
                this.data.countryNm = utils.ConvertVietNamese(this.data.countryNm);
            }
            if (this.data.houseAwbNo) {
                this.data.houseAwbNo = this.data.houseAwbNo.toUpperCase();
                this.data.houseAwbNo = utils.ConvertVietNamese(this.data.houseAwbNo);
            }
            if (this.data.eiControlNo) {
                this.data.eiControlNo = this.data.eiControlNo.toUpperCase();
                this.data.eiControlNo = utils.ConvertVietNamese(this.data.eiControlNo);
            }
            if (this.data.loadPortCd) {
                this.data.loadPortCd = this.data.loadPortCd.toUpperCase();
                this.data.loadPortCd = utils.ConvertVietNamese(this.data.loadPortCd);
            }
            if (this.data.loadPortNm) {
                this.data.loadPortNm = this.data.loadPortNm.toUpperCase();
                this.data.loadPortNm = utils.ConvertVietNamese(this.data.loadPortNm);
            }
            if (this.data.finalDesCd) {
                this.data.finalDesCd = this.data.finalDesCd.toUpperCase();
                this.data.finalDesCd = utils.ConvertVietNamese(this.data.finalDesCd);
            }
            if (this.data.finalDesNm) {
                this.data.finalDesNm = this.data.finalDesNm.toUpperCase();
                this.data.finalDesNm = utils.ConvertVietNamese(this.data.finalDesNm);
            }
            if (this.data.cstWrhCd) {
                this.data.cstWrhCd = this.data.cstWrhCd.toUpperCase();
                this.data.cstWrhCd = utils.ConvertVietNamese(this.data.cstWrhCd);
            }
            if (this.data.cstClrWrhNm) {
                this.data.cstClrWrhNm = this.data.cstClrWrhNm.toUpperCase();
                this.data.cstClrWrhNm = utils.ConvertVietNamese(this.data.cstClrWrhNm);
            }
            if (this.data.countryCd) {
                this.data.countryCd = this.data.countryCd.toUpperCase();
                this.data.countryCd = utils.ConvertVietNamese(this.data.countryCd);
            }
            if (this.data.lPlanVesselCd) {
                this.data.lPlanVesselCd = this.data.lPlanVesselCd.toUpperCase();
                this.data.lPlanVesselCd = utils.ConvertVietNamese(this.data.lPlanVesselCd);
            }
            if (this.data.lPlanVesselNm) {
                this.data.lPlanVesselNm = this.data.lPlanVesselNm.toUpperCase();
                this.data.lPlanVesselNm = utils.ConvertVietNamese(this.data.lPlanVesselNm);
            }
            if (this.data.consigneeNm) {
                this.data.consigneeNm = this.data.consigneeNm.toUpperCase();
                this.data.consigneeNm = utils.ConvertVietNamese(this.data.consigneeNm);
            }
            if (this.data.dclKindCd) {
                this.data.dclKindCd = this.data.dclKindCd.toUpperCase();
                this.data.dclKindCd = utils.ConvertVietNamese(this.data.dclKindCd);
            }
            if (this.data.cstOffice) {
                this.data.cstOffice = this.data.cstOffice.toUpperCase();
                this.data.cstOffice = utils.ConvertVietNamese(this.data.cstOffice);
            }
            if (this.data.cargoClsCd) {
                this.data.cargoClsCd = this.data.cargoClsCd.toUpperCase();
                this.data.cargoClsCd = utils.ConvertVietNamese(this.data.cargoClsCd);
            }
            if (this.data.marksAndNos) {
                this.data.marksAndNos = this.data.marksAndNos.toUpperCase();
                this.data.marksAndNos = utils.ConvertVietNamese(this.data.marksAndNos);
            }
        },
        FormatDate: function (date) {
            if (!date) {
                return "";
            }
            var d = date.substring(0, 2);
            var m = date.substring(2, 4);
            var y = date.substring(4, date.length);

            var time = d + "/" + m + "/" + y;

            return time;
        },
        FormatTime: function (time) {
            if (!time) {
                return "";
            }
            var h = time.substring(0, 2);
            var m = time.substring(2, 4);
            var s = time.substring(4, time.length);

            var time = h + ":" + m + ":" + s;

            return time;
        },
        //====button=====
        save: async function () {
            if (utils.getCookie("isAgency") == 1 && utils.getCookie("Type") == 2) {
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
            console.log(this.data);
            //return;
            var token = $('#hdfToken').val();
            var self = this;
            debugger;
            this.data.consigneeNm = this.data.consigneeNm ? this.data.consigneeNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
            this.data.lPlanVesselNm = this.data.lPlanVesselNm ? this.data.lPlanVesselNm.toUpperCase() : null;
            if (this.data.lsCargoNo && this.data.lsCargoNo.length > 0)
                for (var i = 0; i < this.data.lsCargoNo.length; i++)
                    this.data.lsCargoNo[i].cargoNo = this.data.lsCargoNo[i].cargoNo.toUpperCase();
            if (this.data.finalDesCd && this.data.finalDesCd.length > 0) {
                if (this.data.finalDesCd.length == 3) {
                    this.data.finalDesCd = this.data.countryCd + this.data.finalDesCd;
                }
            }
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
                    console.log("createeda: ", data);
                    utils.unLoading();

                    if (data) {
                        if (data.ResponseCode > 0 && data.Data != null) {
                            self.data = data.Data;
                            bootbox.alert("Thêm tờ khai thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + data.Data.declarationId + "&tab=1&ishight=4";
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
                        //else {
                        //    utils.Message(data.Description);
                        //}
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
            console.log(this.data);
            var token = $('#hdfToken').val();
            this.data.consigneeNm = this.data.consigneeNm ? this.data.consigneeNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
            this.data.lPlanVesselNm = this.data.lPlanVesselNm ? this.data.lPlanVesselNm.toUpperCase() : null;
            if (this.data.lsCargoNo && this.data.lsCargoNo.length > 0)
                for (var i = 0; i < this.data.lsCargoNo.length; i++)
                    this.data.lsCargoNo[i].cargoNo = this.data.lsCargoNo[i].cargoNo.toUpperCase();

            if (this.data.finalDesCd && this.data.finalDesCd.length > 0) {
                if (this.data.finalDesCd.length == 3) {
                    this.data.finalDesCd = this.data.countryCd + this.data.finalDesCd;
                }
            }
            var self = this;
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
                        if (data.ResponseCode > 0 && data.Data != null) {
                            //utils.Message("Cập nhật tờ khai thành công!");
                            bootbox.alert("Cập nhật tờ khai thành công!", function () {
                                window.location.reload();
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
                        //else {
                        //    utils.Message(data.Description);
                        //}
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
        submitEDA: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/SubmitCKSTT",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.declarationId }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + data.Data.declarationId + "&tab=1&ishight=4";
                            });
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data.object[0]) {
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
                                utils.Message(data.Description);
                            }
                        }
                    }
                    else {
                        utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    utils.unLoading();
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        },
        submitEDC: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/SubmitCKSTT",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.declarationId }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/EDCDeclaration?decId=" + data.Data.declarationId + "&tab=3&ishight=4";
                            });

                            self.data = data.Data;
                        }
                        else {
                            //utils.Message(data.Description);
                            if (data.Data && data.Data.object[0]) {
                                //utils.Message(data.Data.object[0].Description);
                                bootbox.confirm({
                                    title: "THÔNG BÁO",
                                    message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                    buttons: {
                                        //cancel: {
                                        //    label: '<i class="fa fa-times"></i> Cancel'
                                        //},
                                        confirm: {
                                            label: '<i class="fa fa-check"></i> Confirm'
                                        }
                                    },
                                    callback: function () {
                                    }
                                });

                                var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                                err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';

                                $("#giai-phap-submit").html(err);
                            }
                        }
                    }
                    else {
                        utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    utils.unLoading();
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        },
        submitEDE: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/SubmitCKSTT",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.declarationId }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/EDEDeclaration?decId=" + data.Data.declarationId + "&tab=6&ishight=4";
                            });
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data.object[0]) {
                                //utils.Message(data.Data.object[0].Description);
                                bootbox.confirm({
                                    title: "THÔNG BÁO",
                                    message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                    buttons: {
                                        //cancel: {
                                        //    label: '<i class="fa fa-times"></i> Cancel'
                                        //},
                                        confirm: {
                                            label: '<i class="fa fa-check"></i> Confirm'
                                        }
                                    },
                                    callback: function () {
                                    }
                                });

                                var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                                err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';
                                $("#giai-phap-submit").html(err);
                            }
                            else {
                                utils.Message(data.Description);
                            }
                        }
                    }
                    else {
                        utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    utils.unLoading();
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        },
        submitEDA01: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/SubmitCKSTT",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.declarationId }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/EDA01Declaration?decId=" + data.Data.declarationId + "&tab=5&ishight=4";
                            });
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data.object[0]) {
                                //utils.Message(data.Data.object[0].Description);
                                bootbox.confirm({
                                    title: "THÔNG BÁO",
                                    message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                    buttons: {
                                        //cancel: {
                                        //    label: '<i class="fa fa-times"></i> Cancel'
                                        //},
                                        confirm: {
                                            label: '<i class="fa fa-check"></i> Confirm'
                                        }
                                    },
                                    callback: function () {
                                    }
                                });

                                var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                                err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';
                                $("#giai-phap-submit").html(err);
                            }
                            else {
                                utils.Message(data.Description);
                            }
                        }
                    }
                    else {
                        utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    utils.unLoading();
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        },
        submitUSB: function (status) {
            if ($("#downSignkey").val() == 1) {
                bootbox.confirm("Bạn chưa có Chữ ký số hoặc Chữ số ký chưa cập nhật. <br> Mời bạn tải Chữ ký số", function (res) {
                    if (res) {
                        downTK();
                    }
                });
                return;
            }

            this.statusTK = status;
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
        submit: function (status) {
            var self = this;
            var token = $('#hdfToken').val();
            var data = this.data;
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/SubmitCKSTT",
                type: 'POST',
                data: JSON.stringify({ declarationId: data.declarationId, status: status, dclNo: data.dclNo }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (ress) {
                    utils.unLoading();
                    if (ress) {
                        if (ress.ResponseCode >= 0) {
                            bootbox.alert("Thành công!", function () {
                                if (status == 11) {
                                    window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + ress.Data.declarationId + "&tab=1&ishight=4";
                                }
                                else if (status == 12) {
                                    window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + ress.Data.declarationId + "&tab=1&ishight=4";
                                }
                                else if (status == 13) {
                                    window.location.href = Config.Url_Root + "ExportDeclaration/EDCDeclaration?decId=" + ress.Data.declarationId + "&tab=3&ishight=4";
                                }
                                else if (status == 14) {
                                    window.location.href = Config.Url_Root + "ExportDeclaration/EDA01Declaration?decId=" + ress.Data.declarationId + "&tab=5&ishight=4";
                                }
                                else if (status == 15) {
                                    window.location.href = Config.Url_Root + "ExportDeclaration/EDCDeclaration?decId=" + ress.Data.declarationId + "&tab=3&ishight=4";
                                }
                                else if (status == 16) {
                                    window.location.href = Config.Url_Root + "ExportDeclaration/EDEDeclaration?decId=" + ress.Data.declarationId + "&tab=6&ishight=4";
                                }
                                else if (status == 20) {
                                    window.location.href = Config.Url_Root + "ExportDeclaration/IEXDeclaration?decId=" + ress.Data.declarationId + "&tab=7&ishight=4";
                                }
                                else {
                                    location.reload();
                                }

                            });
                        }

                        else {
                            //utils.Message(JSON.stringify(ress.Data));
                            if (ress.Data && ress.Data.object) {
                                bootbox.alert("Mời bạn kiểm tra lại dữ liệu đã nhập");
                                mess_GP.lstMess = ress.Data.object;
                                mess_GP.forcusMess();
                            }
                            else {
                                bootbox.alert(ress.Description);
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
        copyEDA: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "export/CloneEDA",
                type: 'POST',
                data: JSON.stringify({ declarationId: this.data.declarationId }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    if (data) {
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + data.Data.declarationId + "&tab=1&ishight=4";
                            });
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data.object[0]) {
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
                                utils.Message(data.Description);
                            }
                        }
                    }
                    else {
                        utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    utils.unLoading();
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
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
        changeData: function () {
            if (this.data.arrDateTrnLoc && !this.data.arrDateTrnLoc.includes('-')) {
                this.data.arrDateTrnLoc = this.convertDate(this.data.arrDateTrnLoc);
            }
            if (this.data.arrDateOfTrs && !this.data.arrDateOfTrs.includes('-')) {
                this.data.arrDateOfTrs = this.convertDate(this.data.arrDateOfTrs);
            }
            if (this.data.strDateTrnLoc && !this.data.strDateTrnLoc.includes('-')) {
                this.data.strDateTrnLoc = this.convertDate(this.data.strDateTrnLoc);
            }
            if (this.data.dclPlannedDate && !this.data.dclPlannedDate.includes('-')) {
                this.data.dclPlannedDate = this.convertDate(this.data.dclPlannedDate);
            }
            if (this.data.deptPlanDate && !this.data.deptPlanDate.includes('-')) {
                this.data.deptPlanDate = this.convertDate(this.data.deptPlanDate);
            }
            if (this.data.invDate && !this.data.invDate.includes('-')) {
                this.data.invDate = this.convertDate(this.data.invDate);
            }
            if (this.data.strDateTrs && !this.data.strDateTrs.includes('-')) {
                this.data.strDateTrs = this.convertDate(this.data.strDateTrs);
            }
            if (this.data.timeLimReExp && !this.data.timeLimReExp.includes('-')) {
                this.data.timeLimReExp = this.convertDate(this.data.timeLimReExp);
            }
        },
        showTab: function (a) {
            this.tabDecla = a;
            if (a == 3) {
                app.getList();
            }
            $('body,html').animate({ scrollTop: 0 }, 800);
        },
        //------Product------
        addProduct: function () {
            var id = $("#dclId").val();
            if (id == 0) {
                utils.Message("Bạn cần phải tạo tờ khai trước");
                return;
            }

            utils.Loading();

            $.ajax({
                type: 'GET',
                url: Config.Url_Root + "ExportDeclaration/EDADetail",
                data: {
                    IdDec: id
                },
                dataType: "html",
                success: function (data) {
                    utils.unLoading();
                    utils.ShowOverLay();
                    $("BODY").append('<div id="popupwrap" style="left: 50%;z-index: 111; overflow-y: auto; max-height: 90%">' + data + '</div>');

                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        },
        viewDetailProduct: function (idPro) {
            utils.Loading();
            var id = $("#dclId").val();
            $.ajax({
                type: 'GET',
                url: Config.Url_Root + "ExportDeclaration/EDADetail",
                data: {
                    IdDec: id,
                    IdPro: idPro
                },
                dataType: "html",
                success: function (data) {
                    utils.unLoading();
                    utils.ShowOverLay();
                    $("BODY").append('<div id="popupwrap" style="left: 50%; top: 50%;z-index: 111;transform: translate(-50%, -50%);overflow-y: auto; position: fixed; max-height: 90%">' + data + '</div>');
                    //edaDetail.LoadDetail();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        },
        getList: async function () {
            try {
                var token = $('#hdfToken').val();
                var id = $("#dclId").val();
                const response = await axios.get(Config.API_Login + "export/SearchEDAProduct?declarationID=" + id + "&type=5",
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0)
                    this.lstProduct = response.data.Data;
                else return null;
            } catch (error) {
                console.log(error);
            }
        },
        delProduct: async function (dclId) {
            try {
                var token = $('#hdfToken').val();
                //var dclId = $("#dclId").val();
                const response = await axios.get(Config.API_Login + "export/DeleteEDAProduct?productid=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.lstProduct = response.data.Data;
                    bootbox.alert("Xóa hàng hóa thành công", function () {
                        app.getList();
                        app.loadDetail();
                    });
                }

                //else return null;
            } catch (error) {
                console.log(error);
            }
        },
        //------------
        convertDate: function (date) {
            if (!date) return;
            return `${date.substring(4, 8)}-${date.substring(2, 4)}-${date.substring(0, 2)}`
        },
        getIntroMess: function (jobCode, errorCode, isFocus) {
            debugger;
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
        signedDataCallback: function (edi, signData, keyData) {
            var signedData = {
                "data": edi,
                "signature": signData,
                "publicKey": keyData,
                "isSendFile": false,
                "isSign": true,
                "dclId": parseInt(this.data.declarationId),
                "dclNo": this.data.dclNo,
                "status": parseInt(this.statusTK)
            }
            utils.Loading();
            var token = $('#hdfToken').val();
            $.ajax({
                url: Config.API_Login + "Agency/SendSignedData",
                type: 'POST',
                data: JSON.stringify(signedData),
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
                                window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + data.Data.declarationId + "&tab=4&ishight=4";
                            });
                        }
                        else if (data.ResponseCode == -99) {
                            bootbox.alert(data.Data.message);
                        }
                        else if (data.ResponseCode == -100001) {
                            bootbox.alert(data.Description);
                        }
                        else {
                            var mess = JSON.parse(data.Data.message);
                            var textMess = "ErrorCode: " + mess.error[0].ErrorCode + "<br>Description: " + mess.error[0].Description + "<br>Disposition: " + mess.error[0].Disposition;
                            bootbox.alert(textMess, function () {
                                //Err.showError(iex.jobCode, mess.error[0].Field, 1);
                            });
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
        NextTabDecla: function (t) {
            utils.Loading();
            setTimeout(function () {
                $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                $(this).addClass("btn-warning");
                $(this).removeClass("noneTab");
                $('#btnTab1').removeClass("btn-success").addClass("btn-warning");
                $('#divTab1').removeClass("noneTab");
                $('#divTab2').addClass("noneTab");
                $('body,html').animate({ scrollTop: 0 }, 800);
                if (t == 3) {
                    app.getList();
                }
                utils.unLoading();
            }, 200);
        },
        SearchBusiness: function (accountId) {
            var url = Config.API_Login + "Account/GetInfo?accountID=" + accountId;
            var token = $('#hdfToken').val();
            $.ajax({
                type: 'GET',
                url: url,
                data: {},
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (ress) {
                    if (ress) {
                        if (utils.getCookie("isAgency") == 1 || utils.getCookie("isAgency") == "1") {
                            app.data.experCd = ress.Data.Business.taxIdNumber;
                            app.data.experNm = ress.Data.Business.name;
                            app.data.addressOfExp = ress.Data.Business.address;
                            app.data.phoneNoOfExp = ress.Data.Business.phoneNumber;
                        }
                        if (ress.Data.Business.cusCode) {
                            app.data.cstOffice = ress.Data.Business.cusCode;
                        }
                        if (ress.Data.Business.cusCodeExport) {
                            app.data.cstSubSection = ress.Data.Business.cusCodeExport;
                        }
                        app.$forceUpdate();
                    }
                },
                error: function (ress) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                }
            });
        },
        ViewResult: function (tab) {
            var id = 0;
            if (this.data.declarationId) id = this.data.declarationId;
            var dclNo = 0;
            if (this.data.dclNo) dclNo = this.data.dclNo;

            window.location.href = Config.Url_Root + "ExportDeclaration/TabResultXLTK?decId=" + id + "&dclNo=" + dclNo + "&tab=" + tab + "&ishight=4";
        }
    },
    mounted() {
        //var self = this;
        //this.init();
        var self = this;
        var decId = $("#dclId").val();
        this.init(function () {
            if (decId && decId > 0) {
                self.loadDetail(decId);
            }
        });

        if (decId == 0 || !decId) {
            if ((utils.getCookie("isAgency") == "2" && utils.getCookie("Type") == "2") || (utils.getCookie("agency") == "1" && utils.getCookie("permitGroup") != "3")) {
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