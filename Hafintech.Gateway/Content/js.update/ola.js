var app = new Vue({
    el: '#ola',
    data: {
        data: {},
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
        confirmOfDcl: false
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.lsPermit = [];
            data.lsDosAttc = [];
            data.lsCargoNo = [];
            data.lsVanPlcCd = [];

            data.lsExpDcl = [];
            for (var i = 0; i < 5; i++) {
                data.lsExpDcl.push({ expDclNo: "" });
            };
            for (var i = 0; i < this.cargoAmount; i++) {
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

            for (var i = 0; i < 5; i++) {
                data.lsVanPlcCd.push({ vanPlcCd: "" });
            }

            data.lsCoFrCarPkgNo = [];

            for (var i = 0; i < 1; i++) {
                var lsSealNo = [];
                for (var j = 0; j < 6; j++) {
                    lsSealNo.push({ sealNo: "" });
                }
                data.lsCoFrCarPkgNo.push({ lsSealNo: lsSealNo })
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
            // this.lstInvCls = await Lib.getInvoiceClassification();
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
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var url = new URL(window.location.href);
                var olaId = url.searchParams.get("olaid");
                if (!olaId || olaId <= 0) {
                    var accountInfo = await Lib.GetAccountInfo();
                    if (!accountInfo) return;
                    accountInfo = accountInfo.Accounts
                    var data = this.data;
                    //data.addressOfImp = accountInfo.address;
                    //data.phoneNoOfImp = accountInfo.mobile;
                    //data.imperNm = accountInfo.fullName;
                    //data.imperCd = accountInfo.dentity;
                    this.$forceUpdate()
                    return;
                }
                const response = await axios.get(Config.API_Login + "TransportDeclaration/GetOLADetail?olaid=" + olaId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.data = response.data.Data;
                    this.changeData();
                    this.cargoAmount = this.lsCargoNo.length;
                    if (!this.cargoAmount) this.cargoAmount = 1;

                    if (!this.data.lsExpDcl || this.data.lsExpDcl.length === 0)
                        for (var i = 0; i < 5; i++) {
                            data.lsExpDcl.push({ expDclNo: "" });
                        };
                    if (!this.data.lsCoFrCarPkgNo || this.data.lsCoFrCarPkgNo.length === 0)
                        for (var i = 0; i < 1; i++) {
                            var lsSealNo = [];
                            for (var j = 0; j < 6; j++) {
                                lsSealNo.push({ sealNo: "" });
                            }
                            data.lsCoFrCarPkgNo.push({ lsSealNo: lsSealNo })
                        }
                }
                //else return null;
            } catch (error) {
                console.log(error);
            }
        },
        save: async function () {
            console.log(this.data);
            var token = $('#hdfToken').val();
            var self = this;
            //this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
            //this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            //this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
            accounts.ShowLoading();
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
                    accounts.Unloading();
                    if (data) {
                        if (data.ResponseCode > 0 && data.Data !== null) {
                            self.data = data.Data;
                            bootbox.alert("Cập nhật tờ khai thành công!", function () {
                                window.location.href = Config.Url_Root + "TransportDeclaration/ola?olaid=" + data.Data.btDclId + "&type=7";
                            });
                        }
                        else {
                            accounts.Message(data.Description);
                        }
                    }
                    else {
                        accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        },
        submit: function (status) {
            var self = this;
            var token = $('#hdfToken').val();
            var data = this.data;
            accounts.ShowLoading();
            var confirmOfDcl = "";
            if (status === 503 || status === 505) {
                confirmOfDcl = this.confirmOfDcl ? 1 : 0;
            }
            $.ajax({
                url: Config.API_Login + "TransportDeclaration/submit",
                type: 'POST',
                data: JSON.stringify({ btDclId: data.btDclId, status: status, btDclNo: data.btDclNo, confirmOfDcl: confirmOfDcl }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    accounts.Unloading();
                    if (data) {
                        if (data.ResponseCode >= 0) {
                            bootbox.alert("Thành công!", function () {
                                window.location.reload();
                            });
                        }
                        else {
                            accounts.Message(JSON.stringify(data.Data));
                        }
                    }
                    else {
                        accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        },
        update: function () {
            console.log(this.data);
            var token = $('#hdfToken').val();
            //this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
            //this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            //this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
            var self = this;
            accounts.ShowLoading();
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
                    accounts.Unloading();
                    if (data) {
                        if (data.ResponseCode >= 0 && data.Data !== null) {
                            bootbox.alert("Cập nhật tờ khai thành công!", function () {
                                window.location.reload();
                            });
                            console.log(data.Data);
                            // self.data = data.Data;
                        }
                        else {
                            accounts.Message(data.Description);
                        }
                    }
                    else {
                        accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
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
                    accounts.Message("Xóa hàng hóa thành công", function () {
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
        }
    },
    mounted() {
        var self = this;
        this.init();
        this.loadDetail();
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
        }
    }
});