var app = new Vue({
    el: '#app',
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
        lstProduct: []
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.lsPermit = [];
            data.lsDosAttc = [];
            data.lsCargoNo = [];
            data.lsVanPlcCd = [];
            data.lsContainerNo = [];
            for (var i = 0; i < 5; i++) {
                data.lsPermit.push({ permitType: "" })
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

            data.type = 4//gia tri cao
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
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var dclId = $("#dclId").val();
                const response = await axios.get(Config.API_Login + "export/GetEDADetail?dclId=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.data = response.data.Data;
                    this.changeData();
                }
                //else return null;
            } catch (error) {
                console.log(error);
            }
        },
        save: async function () {
            console.log(this.data);
            //return;
            var token = $('#hdfToken').val();
            var self = this;
            this.data.consigneeNm = this.data.consigneeNm ? this.data.consigneeNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
            this.data.lPlanVesselNm = this.data.lPlanVesselNm ? this.data.lPlanVesselNm.toUpperCase() : null;
            accounts.ShowLoading();
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
                    accounts.Unloading();

                    if (data) {
                        if (data.ResponseCode > 0 && data.Data != null) {
                            self.data = data.Data;
                            bootbox.alert("Thêm tờ khai thành công!", function () {
                                //$("#idDcl").val(data.Data.declarationId);
                                //Export.ShowTab(3);
                                window.location.href = Config.Url_Root + "DeclarationEDA/EDAGeneral?Id=" + data.Data.declarationId + "&type=5&tab=1";
                            });

                            //hq.getListProduct();
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
        saveAndContinue: function () {
        },
        update: function () {
            console.log(this.data);
            var token = $('#hdfToken').val();
            this.data.consigneeNm = this.data.consigneeNm ? this.data.consigneeNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
            this.data.lPlanVesselNm = this.data.lPlanVesselNm ? this.data.lPlanVesselNm.toUpperCase() : null;
            var self = this;
            accounts.ShowLoading();
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
                    accounts.Unloading();
                    if (data) {
                        if (data.ResponseCode > 0 && data.Data != null) {
                            //accounts.Message("Cập nhật tờ khai thành công!");
                            bootbox.alert("Cập nhật tờ khai thành công!", function () {
                                window.location.reload();
                            });
                            console.log(data.Data);
                            self.data = data.Data;
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
        submitEDA: function () {
            var self = this;
            var token = $('#hdfToken').val();
            accounts.ShowLoading();
            $.ajax({
                url: Config.API_Login + "export/submitEDA",
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
                                window.location.href = Config.Url_Root + "DeclarationEDA/EDCDeclaration?Id=" + data.Data.declarationId + "&type=5";
                                //window.location.reload();
                            });
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data.object[0]) {
                                bootbox.confirm({
                                    title: "THÔNG BÁO",
                                    message: "Description: " + data.Data.object[0].Description + "<br>Name: " + data.Data.object[0].Name,
                                    buttons: {
                                        //cancel: {
                                        //    label: '<i class="fa fa-times"></i> Cancel'
                                        //},
                                        //confirm: {
                                        //    label: '<i class="fa fa-check"></i> Confirm'
                                        //}
                                    },
                                    callback: function () {
                                    }
                                });

                                var err = '<tr><td>' + data.Data.object[0].ErrorCode + '</td><td>' + data.Data.object[0].Description + '</td>';
                                err += '<td>' + data.Data.object[0].Disposition + '</td></tr>';

                                $("#giai-phap-submit").html(err);
                            }
                            else {
                                accounts.Message(data.Description);
                            }
                        }
                    }
                    else {
                        accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        },
        submitEDC: function () {
            var self = this;
            var token = $('#hdfToken').val();
            accounts.ShowLoading();
            $.ajax({
                url: Config.API_Login + "export/submitEDC",
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
                                window.location.href = Config.Url_Root + "DeclarationEDA/IEXDeclHight?Id=" + data.Data.declarationId + "&type=5";
                            });

                            self.data = data.Data;
                        }
                        else {
                            //accounts.Message(data.Description);
                            if (data.Data && data.Data.object[0]) {
                                //accounts.Message(data.Data.object[0].Description);
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
                        accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        },
        submitEDE: function () {
            var self = this;
            var token = $('#hdfToken').val();
            accounts.ShowLoading();
            $.ajax({
                url: Config.API_Login + "export/submitEDE",
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
                                window.location.href = Config.Url_Root + "DeclarationEDA/EDAGeneral?Id=" + data.Data.declarationId + "&type=5&tab=6";
                            });
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data.object[0]) {
                                //accounts.Message(data.Data.object[0].Description);
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
                                accounts.Message(data.Description);
                            }
                        }
                    }
                    else {
                        accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        },
        submitEDA01: function () {
            var self = this;
            var token = $('#hdfToken').val();
            accounts.ShowLoading();
            $.ajax({
                url: Config.API_Login + "export/submitEDA01",
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
                            //accounts.Message("Thành công!");
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "DeclarationEDA/EDAGeneral?Id=" + data.Data.declarationId + "&type=5&tab=5";
                            });
                            self.data = data.Data;
                        }
                        else {
                            if (data.Data.object[0]) {
                                //accounts.Message(data.Data.object[0].Description);
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
                                accounts.Message(data.Description);
                            }
                        }
                    }
                    else {
                        accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
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
            accounts.ShowLoading();
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
                    accounts.Unloading();
                    accounts.ShowOverLay();
                    $("BODY").append('<div id="popupwrap" style="left: 50%;z-index: 111;">' + data + '</div>');
                    edaDetail.LoadDetail();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        },
        viewDetailProduct: function (idPro) {
            accounts.ShowLoading();
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
                    accounts.Unloading();
                    accounts.ShowOverLay();
                    $("BODY").append('<div id="popupwrap" style="left: 50%; top: 50%;z-index: 111;transform: translate(-50%, -50%);; overflow-y: scroll; position: fixed; max-height: 90%">' + data + '</div>');
                    edaDetail.LoadDetail();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
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
                console.log(error);
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
        // this.getList();
        //$("div[id^='divTab']").find("input,button,textarea,select").attr("disabled", "disabled");

        $("#form-input").validate({
            rules: {
                txtdclKindCd_text: "required",
                slclsOrg: "required",
                slmeansOfTrsCd: "required",
                txtconsignorNm: "required",
                txtcountryCd_text: "required",
                txtpieceUnitCd: "required",
                txtpieceUnitCd_text: "required",
                txtarrDate: "required",
                txtloadLocNm: "required",
                slinvClsCd: "required",
                slinvPrcCdtCd: "required",
                slinvPrcKindCd: "required",
                txttotalInvPrc: "required",
                hdfpieceUnitCd: "required",
                txtweigUnitCdGrs: "required"
            },
            messages: {
                txtdclKindCd_text: "",
                slclsOrg: "",
                slmeansOfTrsCd: "",
                txtconsignorNm: "",
                txtcountryCd_text: "",
                txtpieceUnitCd: "",
                txtpieceUnitCd_text: "",
                txtarrDate: "",
                txtloadLocNm: "",
                slinvClsCd: "",
                slinvPrcCdtCd: "",
                slinvPrcKindCd: "",
                txttotalInvPrc: "",
                hdfpieceUnitCd: "",
                txtweigUnitCdGrs: ""
            },
        });
        var a = $("li[class='treeview act']");
        if (a.length > 1) {
            a[1].removeAttribute("class", "act");
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
    }
});