var app = new Vue({
    el: '#ola',
    data: {
        data: {
            lsCargoNo: [],
            lsCoFrCarPkgNo: []
        },
        tabObj: 1,
        signMethodSelect: 0,
        showSubmit: false,
        showTK: false,
        loadingObj: true,
        showPopObject: false,
        lstDataObj: [],
        tabObj: 1,

        // Số page vận đơn
        pageCargoNo: 1,
        textPage: "1/5",
        totalCargoNo: 1,
        //danh sách vận đơn
        //listCargoNo: [],
        CargoNo: {
            corrType: "",
            cargoNo: "",
            issueDateOfBl: "",
            goodsDes: "",
            hSCd: "",
            marksAndNos: "",
            dFstStkBndWrh: "",
            prodBndFactId: "",
            invClsCd: "",
            placeOriginMan: "",
            placeOrigManNm: "",
            deptLocOfCargo: "",
            deptLocTransNm: "",
            arrLocOfCargo: "",
            arrLocNmOfCar: "",
            typeOfMftCargo: "",
            transEquipCd: "",
            vesselNm: "",
            arrDateOfCargo: "",
            imperCd: "",
            imperNm: "",
            addressOfImp: "",
            experCd: "",
            experNm: "",
            addressOfExp: "",
            trustorCd: "",
            trustorNm: "",
            trustorAddr: "",
            qtt: "",
            cdUnitOfM: "",
            cargoWeigGrs: "",
            weigUnitCdGrs: "",
            capacity: "",
            capacityUnitCd: "",
            price: "",
            curTypeCd: "",
            permitNo: "",
            permitDate: "",
            expDatePermit: "",
            remarks2: "",
            lsRemarksCode: [],
            lsOtherLawCode: [],
        },
        // Danh sách hàng
        pageProduct: 1,
        textPageProduct: "1/10",
        totalProduct: 1,
        CoFrCarPkgNo: {
            coFrCarPkgNo: "",
            lineNoOnDcl: "",
            headingNo: "",
            lsSealNo: [],
            index: 0
        },
        page: 1,
        Product: [],
        TempProduct: [],
        lsCoFrCarPkgNo: [],
        lsCargoNo: [],
        // style page
        activeColor: '#08c',
        disableColor: '#898989',
        isSubmitUSB: false,
        isSubmit: false,
        showRadio: false,
        showPop: false,
        textSearchObj: "",
        showCheckbox: false,
        showLoading: true,
        isChecked: true,
        yes: true,
        no: false,
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
        cargoAmount: 1,
        lstSealUnit: [],
        lstWeightUnit: [],
        confirmOfDcl: false,
        typeSearch: 0,
        txtCodePop: "",
        txtNamePop: "",
        lstDataPop: [], //Ds dữ liệu popup
        //Trình ký
        messTK: "",
        statusTK: 0,
        jobCode: "OLA",
        disableSubmit: false,
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.lsPermit = [];
            data.lsDosAttc = [];
            data.lsCargoNo = [];
            data.lsVanPlcCd = [];
            data.lsTransLocInfo = [];
            data.lsExpDcl = [];

            for (var i = 0; i < 5; i++) {
                this.data.lsExpDcl.push({ expDclNo: "" });
            };
            data.lsRemarksCode = [];
            for (var j = 0; j < 5; j++) {
                this.CargoNo.lsRemarksCode.push({ remarkCdForDmg: "" });
            }
            data.lsOtherLawCode = [];
            for (var j = 0; j < 5; j++) {
                this.CargoNo.lsOtherLawCode.push({ otherLawCd: "" });
            }
            //for (var i = 0; i < 5; i++) {
            //    this.data.lsVanPlcCd.push({ vanPlcCd: "" });
            //}
            for (var i = 0; i < 3; i++) {
                this.data.lsTransLocInfo.push({ tranLocBtrans: "", dOfArrInTran: "", dOfDeptTranLoc: "" });
            }
            //data.lsCoFrCarPkgNo = [];
            for (var i = 0; i < 5; i++) {
                var lsSealNo = [];
                var indexPro = i + 1;
                for (var j = 0; j < 6; j++) {
                    lsSealNo.push({ sealNo: "" });
                }
                this.Product.push({ lsSealNo: lsSealNo, coFrCarPkgNo: "", lineNoOnDcl: "", headingNo: "", index: indexPro })
            }

            data.meansOfTrsCd = 0;
            data.invPrcCdtCd = 0;
            data.invPrcKindCd = 0;
            data.cargoClsCd = 0;
            data.cstSubSection = 0;
            data.invClsCd = 0;
            data.termOfPay = 0;
            data.accountId = 0;
            data.invCurCd = 0;
            //data.permitType = 0;
            data.destTransPlace = 0;

            data.type = 2//gia tri cao
            // this.lstUnitPriceCur = this.lstCstValueCur = this.currency = await Lib.getCurrency();
            //  this.lstCargoCls = await Lib.getcargoClsCdCode();
            this.lstMeansOfTrs = await Lib.getmeansOfTrsCd();
            this.lstCstSubSection = await Lib.getCustomsSubSection();
            // this.lsPermit = await Lib.getPermitType();
            this.lstInvCls = await Lib.getInvoiceClassification();
            this.lstTermOfPay = await Lib.getTermOfPayment();
            //  this.lstExtPayDue = await Lib.getTaxExpiration();
            //  this.lstClsAttach = await Lib.getClassificationAttachment();
            //  this.lstTransportPlace = await Lib.getTransportPlace();
            //  this.lstInvPrcKind = await Lib.getinvPrcKindCd();
            //  this.lstPrcCdtCd = await Lib.getInvoiceValueCondition();
            this.currency = await Lib.getCurrency();
            this.lstOrganizationType = await Lib.getOrganizationType();
            //    this.lstValDemar = await Lib.getInvoiceValue();
            //    this.lstFreightDemar = await Lib.GetTransportFeeCodes();
            //   this.lstInsDemar = await Lib.getInsuranceFeeCode();
            //   this.lstAdjDemarNm = await Lib.getAdjName();
            this.lstSealUnit = await Lib.getQuantityUnit();
            this.lstWeightUnit = await Lib.getWeightUnit();
            this.showCheckbox = true;
            this.showRadio = true;
            this.loadDetail();
        },
        getList: async function () {
            try {
                var token = $('#hdfToken').val();
                var dt = {
                };
                const response = await axios.get(Config.API_Login + "TransportDeclaration/SearchOLA",
                    {
                        params: this.data,
                        headers: { "Authorization": "Bearer " + token },
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.lstDeclaration = response.data.Data;

                    if (typeof callback != 'undefined' && typeof callback == 'function')
                        callback()
                }
                else return null;
            } catch (error) {
                console.error(error);
            }
        },
        loadDetailByNo: async function () {
            try {
                debugger;
                var token = $('#hdfToken').val();
                const response = await axios.get(Config.API_Login + "TransportDeclaration/GetOLADetail?no=" + this.data.btDclNo,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    debugger;
                    this.data = response.data.Data;
                    this.changeData();
                    this.cargoAmount = res.Data.lsCargoNo.length;
                    this.totalCargoNo = res.Data.lsCargoNo.length;
                    this.totalProduct = res.Data.lsCoFrCarPkgNo.length;
                    //this.listCargoNo = res.Data.lsCargoNo;
                    this.lsCargoNo = res.Data.lsCargoNo;
                    this.CargoNo = res.Data.lsCargoNo[0];
                    this.lsCoFrCarPkgNo = res.Data.lsCoFrCarPkgNo;

                    var lsExpLen = res.Data.lsExpDcl.length;
                    var pageLsExpDcl = 0;
                    if (lsExpLen > 0) {
                        if ((lsExpLen % 5) == 0) {
                            pageLsExpDcl = lsExpLen / 5;
                        } else {
                            pageLsExpDcl = Math.floor(lsExpLen / 5) + 1;
                        }
                        for (var i = 0; i < (pageLsExpDcl * 5) - lsExpLen; i++) {
                            this.data.lsExpDcl.push({ expDclNo: "" });
                        }
                    } else {
                        for (var i = 0; i < 5; i++) {
                            this.data.lsExpDcl.push({ expDclNo: "" });
                        };
                    }
                    for (var i = 0; i < 3; i++) {
                        this.data.lsTransLocInfo.push({ tranLocBtrans: "", dOfArrInTran: "", dOfDeptTranLoc: "" });
                    }
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
                            if (utils.getCookie("isAgency") == 2 || utils.getCookie("Type") == 2)
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

                    if (res.Data.confirmOfDcl == "1") {
                        this.confirmOfDcl = true;
                    } else {
                        this.confirmOfDcl = false;
                    }
                    if (res.Data.dclrTime) {
                        var resultTime = this.formatTime(res.Data.dclrTime);
                        res.Data.dclrTime = resultTime;
                    }
                    if (res.Data.approvalTime) {
                        var resultTime1 = this.formatTime(res.Data.approvalTime);
                        res.Data.approvalTime = resultTime1;
                    }
                    this.CargoNo.lsRemarksCode = [];
                    for (var j = 0; j < 5; j++) {
                        this.CargoNo.lsRemarksCode.push({ remarkCdForDmg: "" });
                    }
                    this.CargoNo.lsOtherLawCode = [];
                    for (var j = 0; j < 5; j++) {
                        this.CargoNo.lsOtherLawCode.push({ otherLawCd: "" });
                    }
                    var totalCoFrCarPkgNo = this.lsCoFrCarPkgNo.length;
                    var count = 0;
                    var intCount = 0;
                    if (totalCoFrCarPkgNo > 0) {
                        this.Product = [];
                        if (totalCoFrCarPkgNo < 5) {
                            for (var i = 0; i < this.lsCoFrCarPkgNo.length; i++) {
                                intCount++;
                                this.CoFrCarPkgNo = this.lsCoFrCarPkgNo[i];
                                this.CoFrCarPkgNo.index = intCount;
                                this.Product.push(this.CoFrCarPkgNo);
                            }
                            count = 5 - totalCoFrCarPkgNo;
                            for (var i = 0; i < count; i++) {
                                intCount++;
                                var lsSealNo = [];
                                for (var j = 0; j < 6; j++) {
                                    lsSealNo.push({ sealNo: "" });
                                }
                                this.Product.push({ lsSealNo: lsSealNo, coFrCarPkgNo: "", lineNoOnDcl: "", headingNo: "", index: intCount })
                            }
                        } else {
                            for (var i = 0; i < 5; i++) {
                                intCount++;
                                this.CoFrCarPkgNo = this.lsCoFrCarPkgNo[i];
                                this.CoFrCarPkgNo.index = intCount;
                                this.Product.push(this.CoFrCarPkgNo);
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var url = new URL(window.location.href);
                var olaId = url.searchParams.get("olaid");
                var accId = $("#accIdLogin").val();
                var accountInfo;
                if (!olaId || olaId <= 0) {
                    accountInfo = await Lib.GetAccountInfo();
                    if (!accountInfo) return;
                    accountInfo = accountInfo.Accounts
                    this.SearchBusiness(accountInfo.accountId);
                    var data = this.data;
                    this.$forceUpdate()
                    return;
                } else {
                    accountInfo = await Lib.GetInfoByAccountID(accId);
                }
                const response = await axios.get(Config.API_Login + "TransportDeclaration/GetOLADetail?olaid=" + olaId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    debugger;
                    this.data = response.data.Data;
                    this.changeData();
                    this.cargoAmount = res.Data.lsCargoNo.length;
                    this.totalCargoNo = res.Data.lsCargoNo.length;
                    this.totalProduct = res.Data.lsCoFrCarPkgNo.length;
                    //this.listCargoNo = res.Data.lsCargoNo;
                    this.lsCargoNo = res.Data.lsCargoNo;
                    this.CargoNo = res.Data.lsCargoNo[0];
                    this.lsCoFrCarPkgNo = res.Data.lsCoFrCarPkgNo;

                    var lsExpLen = res.Data.lsExpDcl.length;
                    var pageLsExpDcl = 0;
                    if (lsExpLen > 0) {
                        if ((lsExpLen % 5) == 0) {
                            pageLsExpDcl = lsExpLen / 5;
                        } else {
                            pageLsExpDcl = Math.floor(lsExpLen / 5) + 1;
                        }
                        for (var i = 0; i < (pageLsExpDcl * 5) - lsExpLen; i++) {
                            this.data.lsExpDcl.push({ expDclNo: "" });
                        }
                    } else {
                        for (var i = 0; i < 5; i++) {
                            this.data.lsExpDcl.push({ expDclNo: "" });
                        };
                    }
                    for (var i = 0; i < 3; i++) {
                        this.data.lsTransLocInfo.push({ tranLocBtrans: "", dOfArrInTran: "", dOfDeptTranLoc: "" });
                    }
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
                            if (utils.getCookie("isAgency") == 2 || utils.getCookie("Type") == 2)
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

                    if (res.Data.confirmOfDcl == "1") {
                        this.confirmOfDcl = true;
                    } else {
                        this.confirmOfDcl = false;
                    }
                    if (res.Data.dclrTime) {
                        var resultTime = this.formatTime(res.Data.dclrTime);
                        res.Data.dclrTime = resultTime;
                    }
                    if (res.Data.approvalTime) {
                        var resultTime1 = this.formatTime(res.Data.approvalTime);
                        res.Data.approvalTime = resultTime1;
                    }
                    this.CargoNo.lsRemarksCode = [];
                    for (var j = 0; j < 5; j++) {
                        this.CargoNo.lsRemarksCode.push({ remarkCdForDmg: "" });
                    }
                    this.CargoNo.lsOtherLawCode = [];
                    for (var j = 0; j < 5; j++) {
                        this.CargoNo.lsOtherLawCode.push({ otherLawCd: "" });
                    }
                    var totalCoFrCarPkgNo = this.lsCoFrCarPkgNo.length;
                    var count = 0;
                    var intCount = 0;
                    if (totalCoFrCarPkgNo > 0) {
                        this.Product = [];
                        if (totalCoFrCarPkgNo < 5) {
                            for (var i = 0; i < this.lsCoFrCarPkgNo.length; i++) {
                                intCount++;
                                this.CoFrCarPkgNo = this.lsCoFrCarPkgNo[i];
                                this.CoFrCarPkgNo.index = intCount;
                                if (this.CoFrCarPkgNo.lsSealNo != null && this.CoFrCarPkgNo.lsSealNo.length) {
                                    var countSealNo = 6 - this.CoFrCarPkgNo.lsSealNo.length;
                                    if (countSealNo > 0) {
                                        var lsSealNo = [];
                                        for (var j = 0; j < countSealNo; j++) {
                                            this.CoFrCarPkgNo.lsSealNo.push({ sealNo: "" });
                                            //lsSealNo.push({ sealNo: "" });
                                        }
                                    }
                                }
                                this.Product.push(this.CoFrCarPkgNo);
                            }
                            count = 5 - totalCoFrCarPkgNo;
                            for (var i = 0; i < count; i++) {
                                intCount++;
                                var lsSealNo = [];
                                for (var j = 0; j < 6; j++) {
                                    lsSealNo.push({ sealNo: "" });
                                }
                                this.Product.push({ lsSealNo: lsSealNo, coFrCarPkgNo: "", lineNoOnDcl: "", headingNo: "", index: intCount })
                            }
                        } else {
                            for (var i = 0; i < 5; i++) {
                                intCount++;
                                this.CoFrCarPkgNo = this.lsCoFrCarPkgNo[i];
                                this.CoFrCarPkgNo.index = intCount;
                                if (this.CoFrCarPkgNo.lsSealNo != null && this.CoFrCarPkgNo.lsSealNo.length) {
                                    var countSealNo = 6 - this.CoFrCarPkgNo.lsSealNo.length;
                                    if (countSealNo > 0) {
                                        var lsSealNo = [];
                                        for (var j = 0; j < countSealNo; j++) {
                                            this.CoFrCarPkgNo.lsSealNo.push({ sealNo: "" });
                                        }
                                    }
                                }
                                this.Product.push(this.CoFrCarPkgNo);
                            }
                        }
                    }
                }
                else {
                    utils.Message(data.Description);
                }
                //else return null;
            } catch (error) {
                console.log(error);
            }
        },
        AddRow: function () {
            for (var i = 0; i < 5; i++) {
                this.data.lsExpDcl.push({ expDclNo: "" });
            };
        },
        resetCargoNo: function () {
            this.CargoNo = {
                corrType: "",
                cargoNo: "",
                issueDateOfBl: "",
                goodsDes: "",
                hSCd: "",
                marksAndNos: "",
                dFstStkBndWrh: "",
                prodBndFactId: "",
                invClsCd: "",
                placeOriginMan: "",
                placeOrigManNm: "",
                deptLocOfCargo: "",
                deptLocTransNm: "",
                arrLocOfCargo: "",
                arrLocNmOfCar: "",
                typeOfMftCargo: "",
                transEquipCd: "",
                vesselNm: "",
                arrDateOfCargo: "",
                imperCd: "",
                imperNm: "",
                addressOfImp: "",
                experCd: "",
                experNm: "",
                addressOfExp: "",
                trustorCd: "",
                trustorNm: "",
                trustorAddr: "",
                qtt: "",
                cdUnitOfM: "",
                cargoWeigGrs: "",
                weigUnitCdGrs: "",
                capacity: "",
                capacityUnitCd: "",
                price: "",
                curTypeCd: "",
                permitNo: "",
                permitDate: "",
                expDatePermit: "",
                remarks2: "",
                lsRemarksCode: [],
                lsOtherLawCode: [],
            }
            //this.listCargoNo.push(this.CargoNo);
        },
        resetProDec: function (count) {
            this.CoFrCarPkgNo = {
                coFrCarPkgNo: "",
                lineNoOnDcl: "",
                headingNo: "",
                lsSealNo: []
            };
            for (var i = count - 5; i < count; i++) {
                this.Product[i].coFrCarPkgNo = "";
                this.Product[i].lineNoOnDcl = "";
                this.Product[i].headingNo = "";
                this.Product[i].lsSealNo = [];
            }
        },
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
            this.data.transCd = item.taxIdNumber;
            this.data.transNm = item.name;
            this.data.transAddress = item.address;
            if (this.tabObj == 1) {
                app.data.accountId = item.accountId;
            }
            else {
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
            //Địa điểm nhận hàng cuối cùng // vị trí xếp/dỡ hàng
            else if (this.typeSearch == 4) {
                urlSearch = Config.API_Login + "tax/GetLoadingLocation";
                dataSearch = {
                    loadLocCd: this.txtCodePop.trim(),
                    loadLocNm: this.txtNamePop.trim(),
                }
            }
            //Cảnh - cửa khẩu
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
            else if (this.typeSearch == 13) {
                urlSearch = Config.API_Login + "tax/GetCustomsWarehouse";
                dataSearch = {
                    cstWrhCd: this.txtCodePop.trim(),
                    cstWrhNm: this.txtNamePop.trim(),
                }
            }
            //Địa điểm nhận hàng cuối cùng
            else if (this.typeSearch == 14) {
                urlSearch = Config.API_Login + "tax/GetLoadingLocation";
                dataSearch = {
                    loadLocCd: this.txtCodePop.trim(),
                    loadLocNm: this.txtNamePop.trim(),
                }
            }
            //Cảng / cửa khẩu
            else if (this.typeSearch == 15) {
                urlSearch = Config.API_Login + "tax/GetUnloadingPort";
                dataSearch = {
                    unloadPortCd: this.txtCodePop.trim(),
                    unloadPortNm: this.txtNamePop.trim(),
                }
            }
            //Mã nước
            if (this.typeSearch == 16) {
                urlSearch = Config.API_Login + "tax/GetCountry";
                dataSearch = {
                    countryCode: this.txtCodePop.trim(),
                    countryName: this.txtNamePop.trim(),
                }
            }
            //Địa điểm nhận hàng cuối cùng
            else if (this.typeSearch == 18) {
                urlSearch = Config.API_Login + "tax/GetUnloadingPort";
                dataSearch = {
                    unloadPortCd: this.txtCodePop.trim(),
                    unloadPortNm: this.txtNamePop.trim(),
                }
            }
            //Địa điểm xếp hàng
            else if (this.typeSearch == 17) {
                urlSearch = Config.API_Login + "tax/GetUnloadingPort";
                dataSearch = {
                    unloadPortCd: this.txtCodePop.trim(),
                    unloadPortNm: this.txtNamePop.trim(),
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
                app.data.deptLocTransA = item.cstWrhCd;
                app.data.deptLocNmTrans = item.cstWrhNm;
            }
            else if (app.typeSearch == 4) {
                app.data.deptLocTransCd = item.loadLocCd;
                app.data.deptLocTransNm = item.loadLocNm;
            }
            else if (app.typeSearch == 5) {
                app.data.deptLocTransP = item.unloadPortCd;
                //app.data.deptLocTransNm = item.unloadPortNm;
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
                app.CargoNo.transEquipCd = item.loadVesselCd;
                app.CargoNo.vesselNm = item.loadVesselNm;
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
            else if (app.typeSearch == 13) {
                app.data.arrLocBdTranBa = item.cstWrhCd;
                app.data.arrLocNmBtrans = item.name;
            }
            else if (app.typeSearch == 14) {
                app.data.arrLocBtransCd = item.loadLocCd;
                app.data.arrLocBtransNm = item.name;
            }
            else if (app.typeSearch == 15) {
                app.data.arrLocBtransPd = item.unloadPortCd;
                //app.data.arrLocBtransNm = item.unloadPortNm;
            }
            else if (app.typeSearch == 16) {
                app.CargoNo.placeOriginMan = item.countryCode;
                app.CargoNo.placeOrigManNm = item.countryName;
            }
            else if (app.typeSearch == 17) {
                app.CargoNo.deptLocOfCargo = item.unloadPortCd;
                app.CargoNo.deptLocTransNm = item.unloadPortNm;
            }
            else if (app.typeSearch == 18) {
                app.CargoNo.arrLocOfCargo = item.unloadPortCd;
                app.CargoNo.arrLocNmOfCar = item.unloadPortNm;
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
                this.data.agencyId = $("#accIdLogin").val();
                //this.data.businessId = $("#accIdLogin").val();
                this.data.sigAccId = this.data.businessId;
            }
            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 2 && this.signMethodSelect == 3) {
                this.data.initType = 7;
                this.data.accountId = this.data.businessId;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.agencyId = utils.getCookie("accountIdBuss");
                //this.data.businessId = $("#accIdLogin").val();
                this.data.sigAccId = utils.getCookie("accountIdBuss");
            }
            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && (utils.getCookie("permitGroup") == 2 || utils.getCookie("permitGroup") == 3)) {
                this.data.initType = 5;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.agencyId = utils.getCookie("parentId");
                this.data.sigAccId = utils.getCookie("parentId");
            }

            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2 && this.signMethodSelect == 3) {
                this.data.initType = 6;
                this.data.accountId = this.data.businessId;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.sigAccId = this.data.businessId;
            }
            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2) {
                this.data.initType = 4;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.agencyId = $("#accIdLogin").val();
                //this.data.businessId = $("#accIdLogin").val();
                this.data.sigAccId = $("#accIdLogin").val();
            }
            else {
                bootbox.alert("Tài khoản của bạn không có quyền tạo");
                return;
            }
            if (this.CargoNo.marksAndNos) {
                this.CargoNo.marksAndNos = this.CargoNo.marksAndNos.trim();
            }

            if (!this.data.ieIndication || !this.data.cstOffice || !this.data.transCd || !this.data.meansOfTrsCd || !this.data.transPurposeCd || !this.data.transType || !this.data.esSdateOfTrans || !this.data.esFdateOfTrans ||
                !this.CargoNo.cargoNo || !this.CargoNo.goodsDes) {
                bootbox.alert("Bạn cần nhập đầy đủ các thông tin bắt buộc");
                return;
            }
            console.log(this.data);
            var token = $('#hdfToken').val();
            var self = this;
            this.lsCargoNo.push(self.CargoNo);
            this.data.lsCargoNo = self.lsCargoNo;
            if (this.data.lsCargoNo) {
                for (var i = 0; i < this.data.lsCargoNo.length; i++) {
                    this.data.lsCargoNo[i].cargoNo = this.data.lsCargoNo[i].cargoNo ? this.data.lsCargoNo[i].cargoNo.toUpperCase() : null;
                }
            }
            if (this.Product != null && this.Product.length > 0) {
                for (var i = 0; i < this.Product.length; i++) {
                    if (this.Product[i].coFrCarPkgNo != null && this.Product[i].coFrCarPkgNo.length > 0) {
                        this.CoFrCarPkgNo = this.Product[i];
                        this.data.lsCoFrCarPkgNo.push(this.CoFrCarPkgNo);
                    }
                }
                if (this.data.lsCoFrCarPkgNo) {
                    for (var i = 0; i < this.data.lsCoFrCarPkgNo.length; i++) {
                        if (this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo != null && this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo.length > 0) {
                            this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo = this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo.toUpperCase();
                            if (this.data.lsCoFrCarPkgNo[i].lsSealNo && this.data.lsCoFrCarPkgNo[i].lsSealNo.length > 0) {
                                for (var j = 0; j < this.data.lsCoFrCarPkgNo[i].lsSealNo.length; j++) {
                                    if (this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo != null && this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo.length > 0) {
                                        this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo = this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo.toUpperCase();
                                    }
                                }
                            }
                        }

                    }
                }
            } else {
                this.data.lsCoFrCarPkgNo = [];
            }
            this.data.deptLocTransA = this.data.deptLocTransA ? this.data.deptLocTransA.toUpperCase() : null;
            this.data.arrLocBdTranBa = this.data.arrLocBdTranBa ? this.data.arrLocBdTranBa.toUpperCase() : null;
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "TransportDeclaration/createola",
                type: 'POST',
                data: JSON.stringify(this.data),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    console.log("createOla: ", data);
                    utils.unLoading();
                    if (data) {
                        if (data.ResponseCode > 0 && data.Data !== null) {
                            self.data = data.Data;
                            bootbox.alert("Tạo tờ khai thành công!", function () {
                                window.location.href = Config.Url_Root + "TransportDeclaration/ola?olaid=" + data.Data.btDclId + "&ishight=7&tab=1";
                            });
                        }
                        else {
                            utils.Message(data.Description);
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
        signDecla: function () {
            debugger;
            if (utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 3) {
                bootbox.alert(" Doanh nghiệp chưa cho phép đại lý trình ký!");
                return;
            }

            var self = this;
            var token = $('#hdfToken').val();
            var dclId = this.data.btDclId;
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "TransportDeclaration/GetSignatureOla?dclId=" + dclId,
                type: 'POST',
                data: {},
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
        submit: function (status) {
            var self = this;
            var token = $('#hdfToken').val();
            var data = this.data;
            var confirmOfDcl = "";
            if (status == 503 && !app.confirmOfDcl) {
                bootbox.alert("Bạn chưa xác nhận khai báo vận chuyển cùng số quản lý hàng hóa");
                return;
            }
            if (status === 503 && this.confirmOfDcl == "0") {
                //confirmOfDcl = this.confirmOfDcl ? 1 : 0;
                bootbox.alert("Bạn chưa cập nhật thông tin xác nhận khai báo vận chuyển cùng số quản lý hàng hóa");
                return;
            }
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "TransportDeclaration/SubmitOLA",
                type: 'POST',
                data: JSON.stringify({ btDclId: data.btDclId, status: status, btDclNo: data.btDclNo }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    utils.unLoading();
                    if (data) {
                        if (data.ResponseCode >= 0) {
                            bootbox.alert("Thành công!", function () {
                                if (status == 501) {
                                    window.location.href = Config.Url_Root + "TransportDeclaration/ola?olaid=" + data.Data.btDclId + "&ishight=7&tab=1"
                                }
                                else if (status == 502) {
                                    window.location.href = Config.Url_Root + "TransportDeclaration/ola?olaid=" + data.Data.btDclId + "&ishight=7&tab=1"
                                }
                                else if (status == 503) {
                                    window.location.href = Config.Url_Root + "TransportDeclaration/olc?olaid=" + data.Data.btDclId + "&ishight=7&tab=3"
                                }
                                else if (status == 506) {
                                    window.location.href = Config.Url_Root + "TransportDeclaration/olc?olaid=" + data.Data.btDclId + "&ishight=7&tab=3"
                                }
                                else if (status == 505) {
                                    window.location.href = Config.Url_Root + "TransportDeclaration/cot?olaid=" + data.Data.btDclId + "&ishight=7&tab=5"
                                }
                                else if (status == 510) {
                                    window.location.href = Config.Url_Root + "TransportDeclaration/itf?olaid=" + data.Data.btDclId + "&ishight=7&tab=8"
                                }
                                else {
                                    location.reload();
                                }
                            });
                        } else {
                            if (data.Data && data.Data.object) {
                                bootbox.alert("Mời bạn kiểm tra lại dữ liệu đã nhập");
                                mess_GP.lstMess = data.Data.object;
                                mess_GP.forcusMess();
                            }
                            else {
                                bootbox.alert(data.Description);
                            }
                        }
                        //else if (data.ResponseCode == -99) {
                        //    bootbox.alert(ress.Data.Description);
                        //}
                        //else if (data.ResponseCode == -100001) {
                        //    bootbox.alert(ress.Description);
                        //}
                        //else if (data.ResponseCode == -100) {
                        //    bootbox.alert(data.Description);
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
        submitUSB: function (status) {
            var self = this;
            var token = $('#hdfToken').val();
            var data = this.data;
            if ($("#downSignkey").val() == 1) {
                bootbox.confirm("Bạn chưa có Chữ ký số hoặc Chữ số ký chưa cập nhật. <br> Mời bạn tải Chữ ký số", function (res) {
                    if (res) {
                        downTK();
                    }
                });
                return;
            }
            if (status == 503 && !app.confirmOfDcl) {
                bootbox.alert("Bạn chưa xác nhận khai báo vận chuyển cùng số quản lý hàng hóa");
                return;
            }
            this.statusTK = status;
            var data = {
                "dclId": this.data.btDclId,
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
        update: function () {
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
                this.data.agencyId = $("#accIdLogin").val();
                //this.data.businessId = $("#accIdLogin").val();
                this.data.sigAccId = this.data.businessId;
            }
            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 2 && this.signMethodSelect == 3) {
                this.data.initType = 7;
                this.data.accountId = this.data.businessId;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.agencyId = utils.getCookie("accountIdBuss");
                //this.data.businessId = $("#accIdLogin").val();
                this.data.sigAccId = utils.getCookie("accountIdBuss");
            }
            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 1 && (utils.getCookie("permitGroup") == 2 || utils.getCookie("permitGroup") == 3)) {
                this.data.initType = 5;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.agencyId = utils.getCookie("parentId");
                this.data.sigAccId = utils.getCookie("parentId");
            }

            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2 && this.signMethodSelect == 3) {
                this.data.initType = 6;
                this.data.accountId = this.data.businessId;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.sigAccId = this.data.businessId;
            }
            else if (utils.getCookie("isAgency") == 2 && utils.getCookie("Type") == 2) {
                this.data.initType = 4;
                this.data.createdAccId = $("#accIdLogin").val();
                this.data.agencyId = $("#accIdLogin").val();
                //this.data.businessId = $("#accIdLogin").val();
                this.data.sigAccId = $("#accIdLogin").val();
            }
            else {
                bootbox.alert("Tài khoản của bạn không có quyền cập nhật");
                return;
            }
            if (this.CargoNo.marksAndNos) {
                this.CargoNo.marksAndNos = this.CargoNo.marksAndNos.trim();
            }
            if (!this.data.ieIndication || !this.data.cstOffice || !this.data.transCd || !this.data.meansOfTrsCd || !this.data.transPurposeCd || !this.data.transType || !this.data.esSdateOfTrans || !this.data.esFdateOfTrans ||
                !this.CargoNo.cargoNo || !this.CargoNo.goodsDes) {
                bootbox.alert("Bạn cần nhập đầy đủ các thông tin bắt buộc");
                return;
            }
            console.log(this.data);
            var token = $('#hdfToken').val();

            if (app.confirmOfDcl) {
                this.data.confirmOfDcl = "1";
            } else {
                this.data.confirmOfDcl = "0";
            }
            var self = this;
            if (this.lsCargoNo.length < this.totalCargoNo) {
                this.lsCargoNo.push(this.CargoNo);
            }
            this.data.lsCargoNo = this.lsCargoNo;
            if (this.data.lsCargoNo) {
                for (var i = 0; i < this.data.lsCargoNo.length; i++) {
                    this.data.lsCargoNo[i].cargoNo = this.data.lsCargoNo[i].cargoNo ? this.data.lsCargoNo[i].cargoNo.toUpperCase() : null;
                }
            }
            if (this.Product != null && this.Product.length > 0) {
                this.data.lsCoFrCarPkgNo = [];
                for (var i = 0; i < this.Product.length; i++) {
                    if (this.Product[i].coFrCarPkgNo != null && this.Product[i].coFrCarPkgNo.length > 0) {
                        this.CoFrCarPkgNo = this.Product[i];
                        this.data.lsCoFrCarPkgNo.push(this.CoFrCarPkgNo);
                    }
                }
                if (this.data.lsCoFrCarPkgNo) {
                    for (var i = 0; i < this.data.lsCoFrCarPkgNo.length; i++) {
                        if (this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo != null && this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo.length > 0) {
                            this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo = this.data.lsCoFrCarPkgNo[i].coFrCarPkgNo.toUpperCase();
                            if (this.data.lsCoFrCarPkgNo[i].lsSealNo && this.data.lsCoFrCarPkgNo[i].lsSealNo.length > 0) {
                                for (var j = 0; j < this.data.lsCoFrCarPkgNo[i].lsSealNo.length; j++) {
                                    if (this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo != null && this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo.length > 0) {
                                        this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo = this.data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo.toUpperCase();
                                    }
                                }
                            }
                        }

                    }
                }
            } else {
                this.data.lsCoFrCarPkgNo = [];
            }
            this.data.deptLocTransA = this.data.deptLocTransA ? this.data.deptLocTransA.toUpperCase() : null;
            this.data.arrLocBdTranBa = this.data.arrLocBdTranBa ? this.data.arrLocBdTranBa.toUpperCase() : null;
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "TransportDeclaration/updateola",
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
                        if (data.ResponseCode >= 0 && data.Data !== null) {
                            bootbox.alert("Cập nhật tờ khai thành công!", function () {
                                window.location.reload();
                            });
                            console.log(data.Data);
                            self.data = data.Data;
                        }
                        else {
                            utils.Message(data.Description);
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
        copyOLA: function () {
            var self = this;
            var token = $('#hdfToken').val();
            utils.Loading();
            $.ajax({
                url: Config.API_Login + "TransportDeclaration/CloneOLA",
                type: 'POST',
                data: JSON.stringify({ btDclId: this.data.btDclId }),
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
                                window.location.href = Config.Url_Root + "TransportDeclaration/ola?olaid=" + data.Data.btDclId + "&ishight=7&tab=1"
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
        listChange: function () {
            this.$forceUpdate()
        },
        changeData: function () {
            if (this.data.dateOfTrsCtrct && !this.data.dateOfTrsCtrct.includes('-')) {
                this.data.dateOfTrsCtrct = this.convertDate(this.data.dateOfTrsCtrct);
            }
            if (this.data.expDateOfTrans && !this.data.expDateOfTrans.includes('-')) {
                this.data.expDateOfTrans = this.convertDate(this.data.expDateOfTrans);
            }
            if (this.data.esSdateOfTrans && !this.data.esSdateOfTrans.includes('-')) {
                this.data.esSdateOfTrans = this.convertDate(this.data.esSdateOfTrans);
            }
            if (this.data.esFdateOfTrans && !this.data.esFdateOfTrans.includes('-')) {
                this.data.esFdateOfTrans = this.convertDate(this.data.esFdateOfTrans);
            }
            if (this.data.dateOfDcl && !this.data.dateOfDcl.includes('-')) {
                this.data.dateOfDcl = this.convertDate(this.data.dateOfDcl);
            }
            if (this.data.approvalDate && !this.data.approvalDate.includes('-')) {
                this.data.approvalDate = this.convertDate(this.data.approvalDate);
            }
            if (this.data.cancelDate && !this.data.cancelDate.includes('-')) {
                this.data.cancelDate = this.convertDate(this.data.cancelDate);
            }
            if (this.data.dateOfArr && !this.data.dateOfArr.includes('-')) {
                this.data.dateOfArr = this.convertDate(this.data.dateOfArr);
            }
            if (this.data.dateOfDept && !this.data.dateOfDept.includes('-')) {
                this.data.dateOfDept = this.convertDate(this.data.dateOfDept);
            }
            if (this.data.lsCargoNo && this.data.lsCargoNo.length > 0) {
                for (var i = 0; i < this.data.lsCargoNo.length; i++) {
                    if (this.data.lsCargoNo[i].issueDateOfBl && !this.data.lsCargoNo[i].issueDateOfBl.includes('-')) {
                        this.data.lsCargoNo[i].issueDateOfBl = this.convertDate(this.data.lsCargoNo[i].issueDateOfBl);
                    }
                    if (this.data.lsCargoNo[i].arrDateOfCargo && !this.data.lsCargoNo[i].arrDateOfCargo.includes('-')) {
                        this.data.lsCargoNo[i].arrDateOfCargo = this.convertDate(this.data.lsCargoNo[i].arrDateOfCargo);
                    }
                    if (this.data.lsCargoNo[i].expDatePermit && !this.data.lsCargoNo[i].expDatePermit.includes('-')) {
                        this.data.lsCargoNo[i].expDatePermit = this.convertDate(this.data.lsCargoNo[i].expDatePermit);
                    }
                    if (this.data.lsCargoNo[i].permitDate && !this.data.lsCargoNo[i].permitDate.includes('-')) {
                        this.data.lsCargoNo[i].permitDate = this.convertDate(this.data.lsCargoNo[i].permitDate);
                    }
                    if (this.data.lsCargoNo[i].dFstStkBndWrh && !this.data.lsCargoNo[i].dFstStkBndWrh.includes('-')) {
                        this.data.lsCargoNo[i].dFstStkBndWrh = this.convertDate(this.data.lsCargoNo[i].dFstStkBndWrh);
                    }
                }
            }
        },
        showTab: function (a) {
            if (a === 1) {
                $("#divTab1").show();
                $("#divTab2").hide();
                $("#divTab3").hide();
                $('body,html').animate({ scrollTop: 0 }, 800);
            }
            else if (a === 2) {
                $("#divTab1").hide();
                $("#divTab2").show();
                $("#divTab3").hide();
                $('body,html').animate({ scrollTop: 0 }, 800);
            }
            else {
                $("#divTab1").hide();
                $("#divTab2").hide();
                $("#divTab3").show();
                $('body,html').animate({ scrollTop: 0 }, 800);
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
                    utils.Message("Xóa hàng hóa thành công", function () {
                        app.getList();
                    });
                }

                //else return null;
            } catch (error) {
                console.error(error);
            }
        },
        convertDate: function (date) {
            if (!date) return;
            return `${date.substring(4, 8)}-${date.substring(2, 4)}-${date.substring(0, 2)}`
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
                "dclId": parseInt(this.data.btDclId),
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
        ChangeText: function () {
            if (this.CargoNo.qtt) {
                this.CargoNo.qtt = this.CargoNo.qtt.toUpperCase();
                this.CargoNo.qtt = utils.ConvertVietNamese(this.CargoNo.qtt);
            }
            if (this.CargoNo.cargoNo) {
                this.CargoNo.cargoNo = this.CargoNo.cargoNo.toUpperCase();
                this.CargoNo.cargoNo = utils.ConvertVietNamese(this.CargoNo.cargoNo);
            }
            if (this.CargoNo.marksAndNos) {
                this.CargoNo.marksAndNos = this.CargoNo.marksAndNos.toUpperCase();
                this.CargoNo.marksAndNos = utils.ConvertVietNamese(this.CargoNo.marksAndNos);
            }
            if (this.CargoNo.placeOriginMan) {
                this.CargoNo.placeOriginMan = this.CargoNo.placeOriginMan.toUpperCase();
                this.CargoNo.placeOriginMan = utils.ConvertVietNamese(this.CargoNo.placeOriginMan);
            }
            if (this.CargoNo.deptLocOfCargo) {
                this.CargoNo.deptLocOfCargo = this.CargoNo.deptLocOfCargo.toUpperCase();
                this.CargoNo.deptLocOfCargo = utils.ConvertVietNamese(this.CargoNo.deptLocOfCargo);
            }
            if (this.CargoNo.arrLocOfCargo) {
                this.CargoNo.arrLocOfCargo = this.CargoNo.arrLocOfCargo.toUpperCase();
                this.CargoNo.arrLocOfCargo = utils.ConvertVietNamese(this.CargoNo.arrLocOfCargo);
            }
            //if (this.data.lsCoFrCarPkgNo[0].coFrCarPkgNo) {
            //    this.data.lsCoFrCarPkgNo[0].coFrCarPkgNo = this.data.lsCoFrCarPkgNo[0].coFrCarPkgNo.toUpperCase();
            //    this.data.lsCoFrCarPkgNo[0].coFrCarPkgNo = utils.ConvertVietNamese(this.data.lsCoFrCarPkgNo[0].coFrCarPkgNo);
            //}
            if (this.data.deptLocTransA) {
                this.data.deptLocTransA = this.data.deptLocTransA.toUpperCase();
                this.data.deptLocTransA = utils.ConvertVietNamese(this.data.deptLocTransA);
            }
            if (this.data.arrLocBdTranBa) {
                this.data.arrLocBdTranBa = this.data.arrLocBdTranBa.toUpperCase();
                this.data.arrLocBdTranBa = utils.ConvertVietNamese(this.data.arrLocBdTranBa);
            }
            if (this.data.route) {
                this.data.route = this.data.route.toUpperCase();
                this.data.route = utils.ConvertVietNamese(this.data.route);
            }
            this.$forceUpdate();
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
                            app.data.transCd = ress.Data.Business.taxIdNumber;
                            app.data.transNm = ress.Data.Business.name;
                            app.data.transAddress = ress.Data.Business.address;
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
            if (this.data.btDclId) id = this.data.btDclId;
            var dclNo = 0;
            if (this.data.btDclNo) dclNo = this.data.btDclNo;

            window.location.href = Config.Url_Root + "TransportDeclaration/ResultXLTK_OLA?olaid=" + id + "&dclNo=" + dclNo + "&tab=" + tab + "&ishight=7";
        },
        formatTime: function (time) {
            if (!time)
                return "";
            var h = "";
            var m = "";
            var result = "";
            if (time.length == 2) {
                h = time.substring(0, 2);
                result = h;
            } else if (time.length >= 3) {
                h = time.substring(0, 2);
                m = time.substring(2, 4);
                result = h + ":" + m;
            }
            return result;
        },
        AddRow: function () {
            for (var i = 0; i < 5; i++) {
                this.data.lsExpDcl.push({ expDclNo: "" });
            }
            this.$forceUpdate();
        },
        nextPro: function () {
            if (this.pageCargoNo == 5)

                return;
            this.pageCargoNo++;
            this.textPage = this.pageCargoNo + "/5";
            if (this.pageCargoNo > this.totalCargoNo)
                this.totalCargoNo++;
            if (this.lsCargoNo[this.pageCargoNo - 2]) {
                this.lsCargoNo[this.pageCargoNo - 2] = this.CargoNo;
                this.resetCargoNo();
                if (this.lsCargoNo[this.pageCargoNo - 1]) {
                    this.CargoNo = this.lsCargoNo[this.pageCargoNo - 1];
                }
            }
            else {
                this.lsCargoNo.push(this.CargoNo);
                this.resetCargoNo();
            }
        },
        prePro: function () {
            if (this.pageCargoNo == 1)
                return;
            this.pageCargoNo--;
            this.textPage = this.pageCargoNo + "/5";

            if (this.lsCargoNo[this.pageCargoNo]) {
                this.lsCargoNo[this.pageCargoNo] = this.CargoNo;
            }
            else {
                this.lsCargoNo.push(this.CargoNo);
            }
            this.resetCargoNo();
            this.CargoNo = this.lsCargoNo[this.pageCargoNo - 1];
        },
        preStartPro: function () {
            this.pageCargoNo = 1;
            this.textPage = this.pageCargoNo + "/5";
            this.resetCargoNo();
            this.CargoNo = this.lsCargoNo[this.pageCargoNo - 1];
        },
        nextEndPro: function () {
            this.pageCargoNo = 5;
            this.textPage = this.pageCargoNo + "/5";
            if (this.lsCargoNo[this.pageCargoNo - 1]) {
                this.CargoNo = this.lsCargoNo[this.pageCargoNo - 1];
            } else {
                this.lsCargoNo.push(this.CargoNo);
                this.resetCargoNo();
            }
        },

        nextProDec: function () {
            debugger;
            if (this.pageProduct == 10)
                return;
            this.pageProduct++;
            this.textPageProduct = this.pageProduct + "/10";
            //this.Product = [];
            var indexCount = 0;
            if (this.lsCoFrCarPkgNo[(this.pageProduct - 1) * 5]) {
                if (this.lsCoFrCarPkgNo.length <= (this.pageProduct * 5)) {
                    for (var i = (this.pageProduct - 1) * 5; i < this.lsCoFrCarPkgNo.length; i++) {
                        indexCount = i + 1;
                        this.CoFrCarPkgNo = this.lsCoFrCarPkgNo[i];
                        this.CoFrCarPkgNo.index = indexCount;
                        this.Product.push(this.CoFrCarPkgNo);
                    }
                    count = parseInt(this.pageProduct * 5) - parseInt(this.lsCoFrCarPkgNo.length);
                    indexCount = parseInt(this.lsCoFrCarPkgNo.length);
                    for (var i = indexCount; i < this.pageProduct * 5; i++) {
                        indexCount++;
                        var lsSealNo = [];
                        for (var j = 0; j < 6; j++) {
                            lsSealNo.push({ sealNo: "" });
                        }
                        this.Product.push({ lsSealNo: lsSealNo, coFrCarPkgNo: "", lineNoOnDcl: "", headingNo: "", index: indexCount })
                    }
                }
            } else {
                for (var i = (this.pageProduct - 1) * 5; i < (this.pageProduct * 5); i++) {
                    var lsSealNo = [];
                    var indexPro = i + 1;
                    for (var j = 0; j < 6; j++) {
                        lsSealNo.push({ sealNo: "" });
                    }
                    this.Product.push({ lsSealNo: lsSealNo, coFrCarPkgNo: "", lineNoOnDcl: "", headingNo: "", index: indexPro })
                }
            }
        },
        preProDec: function () {
            if (this.pageProduct == 1)
                return;
            this.pageProduct--;
            this.textPageProduct = this.pageProduct + "/10";
            var scrH = $("#lsProduct").offset().top;
            $('body,html').animate({ scrollTop: scrH }, 800);
        },
        preStartProDec: function () {
            debugger;
            this.pageProduct = 1;
            this.textPageProduct = this.pageProduct + "/10";
            var scrH = $("#lsProduct").offset().top;
            $('body,html').animate({ scrollTop: scrH }, 800);
        },
        nextEndProDec: function () {
            debugger;
            this.pageProduct = 10;
            this.textPageProduct = this.pageProduct + "/10";
            //this.Product = [];
            var indexCount = 0;
            if (this.Product) {
                var count = parseInt(this.pageProduct * 5) - parseInt(this.Product.length);
                var indexCount = parseInt(this.Product.length);
                if (count > 0) {
                    for (var i = 0; i < count; i++) {
                        indexCount++;
                        var lsSealNo = [];
                        for (var j = 0; j < 6; j++) {
                            lsSealNo.push({ sealNo: "" });
                        }
                        this.Product.push({ lsSealNo: lsSealNo, coFrCarPkgNo: "", lineNoOnDcl: "", headingNo: "", index: indexCount })
                    }
                }
            } else {
                for (var i = 0; i < this.pageProduct * 5; i++) {
                    var lsSealNo = [];
                    var indexPro = i + 1;
                    for (var j = 0; j < 6; j++) {
                        lsSealNo.push({ sealNo: "" });
                    }
                    this.Product.push({ lsSealNo: lsSealNo, coFrCarPkgNo: "", lineNoOnDcl: "", headingNo: "", index: indexPro })
                }
            }
        },
        exportOLA: async function () {
            utils.Loading();
            var token = $('#hdfToken').val();
            var url = new URL(window.location.href);
            var olaId = url.searchParams.get("olaid");
            const response = await axios.get(Config.API_Login + "TransportDeclaration/GetOLADetail?olaid=" + olaId,
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0) {
                // gọi hàm xuất file excel
                $.ajax({
                    url: Config.Url_Root + "TransportDeclaration/ExportExcelOLA",
                    type: 'POST',
                    data: JSON.stringify(res.Data),
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    cache: false,
                    contentType: "application/json; charset=utf-8",
                    processData: false,
                    success: function (data) {
                        utils.unLoading();
                        if (data.ResponseStatus == 1) {
                            var urlFile = data.linkDown;
                            console.log(urlFile);
                            //window.location.href = data.linkDown;
                            window.open(urlFile);
                        }
                    },
                    error: function () {
                        bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                        return;
                    }
                })
            } else {
                bootbox.alert('Dữ liệu truyền vào không hợp lệ');
            }
        },
    },
    mounted() {
        var self = this;
        var decId = $("#dclId").val();
        //this.init();
        //this.loadDetail();
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
        cargoAmount: function (valString) {
            if (!valString) return;
            var val = parseInt(valString);
            if (val <= 0) return;
            var lsCargoNo = this.data.lsCargoNo;
            if (!lsCargoNo) {
                lsCargoNo = [];
                for (var i = 0; i < val; i++) {
                    var lsRemarksCode = [];
                    for (var j = 0; j < 5; j++) {
                        lsRemarksCode.push({ remarkCdForDmg: "" });
                    }
                    var lsOtherLawCode = [];
                    for (var j = 0; j < 5; j++) {
                        lsOtherLawCode.push({ otherLawCd: "" });
                    }
                    data.lsCargoNo.push({ cargoNo: "", lsRemarksCode: lsRemarksCode, lsOtherLawCode: lsOtherLawCode });
                }
            }
            else {
                if (val > lsCargoNo.length) {
                    var off = val - lsCargoNo.length;
                    for (var i = 0; i < off; i++) {
                        var lsRemarksCode = [];
                        for (var j = 0; j < 5; j++) {
                            lsRemarksCode.push({ remarkCdForDmg: "" });
                        }
                        var lsOtherLawCode = [];
                        for (var j = 0; j < 5; j++) {
                            lsOtherLawCode.push({ otherLawCd: "" });
                        }
                        data.lsCargoNo.push({ cargoNo: "", lsRemarksCode: lsRemarksCode, lsOtherLawCode: lsOtherLawCode });
                    }
                }
                else if (val < lsCargoNo.length) {
                    var off = lsCargoNo.length - val;
                    for (var i = lsCargoNo.length - 1; i >= 0; --i) {
                        if (lsCargoNo[i].cargoNo) continue;
                        if (lsCargoNo.length <= val) break;
                        if (!lsCargoNo[i].cargoNo) {
                            lsCargoNo.splice(i, 1);
                        }
                    }
                }
            }
        },
        //'data.cstOffice': function (valString) {
        //    this.data.cstOffice = valString.toUpperCase();
        //},
        //'data.deptLocTransA': function (valString) {
        //    this.data.deptLocTransA = valString.toUpperCase();
        //},
        //'data.arrLocBdTranBa': function (valString) {
        //    this.data.arrLocBdTranBa = valString.toUpperCase();
        //}
    }
});