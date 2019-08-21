var app = new Vue({
    el: '#form-input',
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
        lstAdjDemarNm: []
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.lsPermit = [];
            data.lsDosAttc = [];
            data.lsCargoNo = [];
            data.lsVanPlcCd = [];
            data.lsContainerNo = [];
            data.clsAttachment = [];

            data.lsAdjDemar = [];
            for (var i = 0; i < 5; i++) {
                data.lsAdjDemar.push({ adjDemarNm: "", adjDemarCd: "", curCdOfEvaAmt: "", evaluatedAmt: "", totalDisEva: "" })
            }
            for (var i = 0; i < 5; i++) {
                data.lsPermit.push({ permitType: "" });
            }
            for (var i = 0; i < 3; i++) {
                data.clsAttachment.push({ clsAttachment: "", attachmentNo: "" })
            }
            data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" })
            data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" })
            data.lsDosAttc.push({ clsAttachment: "", attachmentNo: "" })
            data.lsTransInfo = [];
            data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' })
            data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' })
            data.lsTransInfo.push({ trnLocTrs: "", arrDateTrnLoc: "", strDateTrnLoc: '' })
            data.lsCargoNo.push({ cargoNo: "" })
            data.lsCargoNo.push({ cargoNo: "" })
            data.lsCargoNo.push({ cargoNo: "" })
            for (var i = 0; i < 5; i++) {
                data.lsVanPlcCd.push({ vanPlcCd: "" })
            }
            for (var i = 0; i < 50; i++) {
                data.lsContainerNo.push({ containerNo: "" })
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
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var dclId = $("#dclId").val();
                if (!dclId || dclId <= 0) {
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
                const response = await axios.get(Config.API_Login + "import/GetDeclarationDetail?dclId=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.data = response.data.Data;
                    this.changeData();
                    if (!this.data.lsAdjDemar || this.data.lsAdjDemar.length == 0)
                        for (var i = 0; i < 5; i++) {
                            this.data.lsAdjDemar.push({ adjDemarNm: "", adjDemarCd: "", curCdOfEvaAmt: "", evaluatedAmt: "", totalDisEva: "" })
                        }
                    if (!this.data.clsAttachment || this.data.clsAttachment.length == 0)
                        for (var i = 0; i < 3; i++) {
                            this.data.clsAttachment.push({ clsAttachment: "", attachmentNo: "" })
                        }
                }
                //else return null;
            } catch (error) {
                console.error(error);
            }
        },
        save: async function () {
            console.log(this.data);
            //return;
            var token = $('#hdfToken').val();
            var self = this;
            this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
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
                                window.location.href = Config.Url_Root + "Declaration/ListProduct?IdDec=" + data.Data.dclId + "&ishight=2&tab=2";
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
        saveAndContinue: function () {
        },
        update: function () {
            console.log(this.data);
            var token = $('#hdfToken').val();
            this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
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
                            bootbox.alert("Thành công!");
                            console.log(data.Data);
                            self.data = data.Data;
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
                                else {
                                    window.location.href = Config.Url_Root + "Declaration/HightValueDeInsert?IdDec=" + data.Data.dclId + "&ishight=2&tab=3";
                                }
                            });
                            console.log(data.Data);
                            self.data = data.Data;
                        }
                        else {
                            bootbox.alert(JSON.stringify(data.Data));
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
        showTab: function (a) {
            if (a == 1) {
                $("#divTab1").show();
                $("#divTab2").hide();
                $("#divTab3").hide();
                $('body,html').animate({ scrollTop: 0 }, 800);
            }
            else if (a == 2) {
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
        viewEditProduct: function (idPro) {
            utils.Loading();
            var id = $("#dclId").val();
            $.ajax({
                type: 'GET',
                url: Config.Url_Root + "DeclarationEDA/EDADetail",
                data: {
                    IdDec: id,
                    IdPro: idPro
                },
                dataType: "html",
                success: function (data) {
                    utils.unLoading();
                    accounts.ShowOverLay();
                    $("BODY").append('<div id="popupwrap" style="left: 50%;z-index: 111;">' + data + '</div>');
                    edaDetail.LoadDetail();
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
                url: Config.Url_Root + "DeclarationEDA/ProductView",
                data: {
                    IdDec: id,
                    IdPro: idPro
                },
                dataType: "html",
                success: function (data) {
                    utils.unLoading();
                    accounts.ShowOverLay();
                    $("BODY").append('<div id="popupwrap" style="left: 50%; top: 50%;z-index: 111;transform: translate(-50%, -50%);; overflow-y: scroll; position: fixed; max-height: 90%">' + data + '</div>');
                    edaDetail.LoadDetail();
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
                    });
                }

                //else return null;
            } catch (error) {
                console.error(error);
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

        $('input[type=checkbox],input[type=radio],input[type=file]').uniform();
        $("#form-input").validate({
            rules: {
                slclsOrg: "required",
                slmeansOfTrsCd: "required",
                txtphoneNoOfImp: "required",
                txtconsignorNm: "required",
                txtpieceUnitCd: "required",
                txtarrDate: "required",
                slinvClsCd: "required",
                slinvPrcCdtCd: "required",
                slinvPrcKindCd: "required",
                txttotalInvPrc: "required",
                hdfpieceUnitCd: "required",
            },
            messages: {
                slclsOrg: "",
                slmeansOfTrsCd: "",
                txtphoneNoOfImp: "",
                txtconsignorNm: "",
                txtpieceUnitCd: "",
                txtarrDate: "",
                slinvClsCd: "",
                slinvPrcCdtCd: "",
                slinvPrcKindCd: "",
                txttotalInvPrc: "",
                hdfpieceUnitCd: "",
            }
        });
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
    }
});