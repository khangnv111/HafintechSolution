var app = new Vue({
    el: '#form-input-file',
    data: {
        data: {},
        currency: [],
        lstCstSubSection: [],
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.type = 3//gia tri thap
            data.cstSubSection = 0;
            data.cstValueCurCd = 0;
            data.curCdTtlTaxVal = 0;
            accounts.ShowLoading();
            this.lstCstSubSection = await Lib.getCustomsSubSection();
            this.currency = await Lib.getCurrency();
            await this.loadDetail();
            accounts.Unloading();
        },
        loadDetail: async function () {
            try {
                var token = $('#hdfToken').val();
                var dclId = $("#dclId").val();
                if (!dclId || dclId <= 0) return;
                const response = await axios.get(Config.API_Login + "export/GetEDADetail?dclId=" + dclId,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0)
                    this.data = response.data.Data;
                //else return null;
            } catch (error) {
                console.error(error);
            }
        },
        save: function () {
            console.log(this.data);
            var token = $('#hdfToken').val();
            this.data.consigneeNm = this.data.consigneeNm.toUpperCase()
            var self = this;
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
                    
                    accounts.Unloading();
                    if (data) {
                        if (data.ResponseCode > 0) {
                            console.log("save Mec: ", data.Data);
                            //accounts.Message("Thêm tờ khai thành công!");
                            bootbox.alert("Thêm tờ khai thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/MECDeclaration?Id=" + data.Data.declarationId + "&type=6";
                            });

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
        update: function () {
            console.log(this.data);
            var token = $('#hdfToken').val();
            this.data.consigneeNm = this.data.consigneeNm.toUpperCase()
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
                    
                    if (data) {
                        if (data.ResponseCode > 0) {
                            //accounts.Message("Cập nhật tờ khai thành công!");
                            bootbox.alert("Cập nhật tờ khai thành công", function () {
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
                    accounts.Unloading();
                },
                error: function (data) {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        },
        submitMEC: function () {
            var self = this;
            var token = $('#hdfToken').val();
            accounts.ShowLoading();
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
                    
                    if (data) {
                        if (data.ResponseCode > 0) {
                            //accounts.Message("Thành công!");
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/MECDeclarationView?Id=" + data.Data.declarationId + "&type=6&tab=1";
                            });
                            console.log(data.Data);
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
                            }
                            else {
                                accounts.Message("Có lỗi xảy ra khi submit");
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
        submitMEE: function () {
            var self = this;
            var token = $('#hdfToken').val();
            accounts.ShowLoading();
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
                    
                    if (data) {
                        if (data.ResponseCode > 0) {
                            //accounts.Message("Thành công!");
                            bootbox.alert("Thành công!", function () {
                                window.location.href = Config.Url_Root + "ExportDeclaration/MECDeclarationView?Id=" + data.Data.declarationId + "&type=6&tab=3";
                            });
                            console.log(data.Data);
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
                            }
                            else {
                                accounts.Message("Có lỗi xảy ra khi submit");
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
            this.$forceUpdate();
        },
        rename: function () {
            
            var valuecheck = $("#slmeansOfTrsCd").val();
            if (valuecheck !== 4 && valuecheck !== 5) {
                data.loadPortCd = this.data.loadPortCd.replace("VN", "");
            }
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