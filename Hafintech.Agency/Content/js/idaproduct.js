var idaProduct = new Vue({
    el: '#form-inputx',
    data: {
        data: {},
        currency: [],
        lstAbsDutyUnit: [],
        lstPerUnitTax: [],
        lstImportTaxClf: [],
    },
    methods: {
        init: async function () {
            this.data.lsOtherTax = [];
            this.data.lsOtherLawCode = [];
            for (var i = 0; i < 5; i++) {
                this.data.lsOtherLawCode.push({ otherLawCd: "" });
            };
            this.data.lsOtherTax.push({ itemNmOTax: "Thuế nhập khẩu bổ sung", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
            this.data.lsOtherTax.push({ itemNmOTax: "Thuế tiêu thụ đặc biệt", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
            this.data.lsOtherTax.push({ itemNmOTax: "Thuế bảo vệ môi trường", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
            this.data.lsOtherTax.push({ itemNmOTax: "Thuế giá trị gia tăng", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
            this.data.lsOtherTax.push({ itemNmOTax: "Thuế chống phân biệt đối xử", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });

            this.currency = await Lib.getCurrency();
            this.lstPerUnitTax = this.lstAbsDutyUnit = await Lib.getAbsoluteDutyRateUnit();
            this.lstImportTaxClf = await Lib.getImportTaxClassification();
            this.loadDetail();
        },
        save: function (isContinue) {
            console.log(this.data);
            var token = $('#hdfToken').val();
            var self = this;
            var listProducts = [];
            listProducts.push(this.data)
            var dataRequest = { listProducts: listProducts, dclId: $('#dclId').val()};
            $.ajax({
                url: Config.API_Login + "import/InsertIDAProduct",
                type: 'POST',
                data: JSON.stringify(dataRequest),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    console.log("edaDetail: ", data);

                    if (data) {
                        if (data.ResponseCode > 0) {
                            utils.closeAll();
                            bootbox.alert("Cập nhật sản phẩm thành công!", function () {
                                if (app)
                                    app.getList();

                                if (isContinue == 1) {
                                    Export.AddProduct();
                                }
                            })
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
                }
            });

        },
        saveAndContinue: function () {

        },
        update: function () {
            var token = $('#hdfToken').val();
            var self = this;
            var listProducts = [];
            listProducts.push(this.data)
            var dataRequest = { listProducts: listProducts, dclId: $('#dclId').val() };
            $.ajax({
                url: Config.API_Login + "import/UpdateIDAProduct",
                type: 'POST',
                data: JSON.stringify(dataRequest),
                headers: {
                    "Authorization": "Bearer " + token
                },
                cache: false,
                contentType: "application/json; charset=utf-8",
                processData: false,
                success: function (data) {
                    console.log("edaDetail: ", data);

                    if (data) {
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Cập nhật thành công!")
                        }
                        else {
                            utils.Message(data.Description);
                        }
                    }
                    else {
                        utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    }
                    //accounts.Unloading();
                },
                error: function (data) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    //accounts.Unloading();
                }
            });
        },
        getList: async function () {
            try {
                var token = $('#hdfToken').val();
                const response = await axios.get(Config.API_Login + "export/SearchEDAProduct",
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0)
                    response.data.Data;
                else return null;
            } catch (error) {
                console.error(error);
            }
        },

        loadDetail: async function () {
            try {

                var token = $('#hdfToken').val();
                var id = $('#hdf_productID').val();
                const response = await axios.get(Config.API_Login + "import/GetIDAProductDetail?productid=" + id,
                    {
                        headers: { "Authorization": "Bearer " + token }
                    });
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.data = response.data.Data;
                    if (!this.data.lsOtherTax || this.data.lsOtherTax.length === 0) {
                        this.data.lsOtherTax.push({ itemNmOTax: "Thuế nhập khẩu bổ sung", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
                        this.data.lsOtherTax.push({ itemNmOTax: "Thuế tiêu thụ đặc biệt", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
                        this.data.lsOtherTax.push({ itemNmOTax: "Thuế bảo vệ môi trường", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
                        this.data.lsOtherTax.push({ itemNmOTax: "Thuế giá trị gia tăng", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
                        this.data.lsOtherTax.push({ itemNmOTax: "Thuế chống phân biệt đối xử", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
                    }
                }
                else return null;
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.init();
    }

});

function CheckOnlyNumber(obj, e) {
    var whichCode = (window.Event && e.which) ? e.which : e.keyCode; /*if (whichCode == 13) { this.onPlaceOrder(); return false; }*/
    if (whichCode == 9) return true;
    if ((whichCode >= 48 && whichCode <= 57) || whichCode == 8) {
        var n = obj.value.replace(/,/g, ""); if (whichCode == 8) {
            if (n.length != 0)
                n = n.substr(0, n.length - 1);
        }
        if (parseFloat(n) == 0) {
            n = '';
        }
        return true;
    }
    e.returnValue = false; return false;
}