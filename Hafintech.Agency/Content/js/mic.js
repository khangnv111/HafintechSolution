var app = new Vue({
    el: '#form-input-file',
    data: {
        data: {},
        currency: [],
        lstCstSubSection: [],
        lstOrganizationType: [],
        lstPrcCdtCd: [],
        lstInvPrcKind: [],
        lstInsDemar: [],
        lstFreightDemar: []
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.type = 1//gia tri thap
            data.cstSubSection = 0;
            data.cstValueCurCd = 0;
            data.curCdTtlTaxVal = 0;
            //utils.Loading();
            this.lstCstSubSection = await Lib.getCustomsSubSection();
            this.lstOrganizationType = await Lib.getOrganizationType();
            this.currency = await Lib.getCurrency();
            this.lstPrcCdtCd = await Lib.getInvoiceValueCondition();
            this.lstInvPrcKind = await Lib.getinvPrcKindCd();
            this.lstInsDemar = await Lib.getInsuranceFeeCode();
            this.lstFreightDemar = await Lib.GetTransportFeeCodes();
            await this.loadDetail();
            //utils.unLoading()
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
                    data.addressOfImp = accountInfo.address;
                    data.phoneNoOfImp = accountInfo.mobile;
                    data.imperNm = accountInfo.fullName;
                    data.imperCd = accountInfo.dentity;
                }
                const response = await axios.get(Config.API_Login + "import/GetDeclarationDetail?dclId=" + dclId,
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
                console.error(error);
            }
        },
        save: function () {
            console.log(this.data);
            var token = $('#hdfToken').val();
            this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
            var self = this;
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
                    debugger;
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
                            bootbox.alert(JSON.stringify(data.Data.object));
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
            console.log(this.data);
            var token = $('#hdfToken').val();
            this.data.consignorNm = this.data.consignorNm ? this.data.consignorNm.toUpperCase() : null;
            this.data.address1Street = this.data.address1Street ? this.data.address1Street.toUpperCase() : null;
            this.data.address2Street = this.data.address2Street ? this.data.address2Street.toUpperCase() : null;
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
                    debugger;
                    utils.unLoading();
                    if (data) {
                        if (data.ResponseCode > 0) {
                           // bootbox.alert("Cập nhật tờ khai thành công!");
                            bootbox.alert("Cập nhật tờ khai thành công", function () {
                                window.location.reload();
                            });
                            console.log(data.Data);
                           // self.data = data.Data;
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
        signDecla: function () {

            if(utils.getCookie("Type") == 1 && utils.getCookie("permitGroup") == 3){
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
                            bootbox.alert("Thành công!");
                            //bootbox.alert("Thành công!", function () {
                            //});
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
        this.init();
        var self = this;
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