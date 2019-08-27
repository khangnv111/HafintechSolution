var idaProduct = new Vue({
	el: '#form-inputx',
	data: {
		data: {},
		currency: [],
		lstAbsDutyUnit: [],
		lstPerUnitTax: [],
		lstImportTaxClf: [],
		lstWeightUnit: [],
	},
	methods: {
		init: async function () {
			this.data.lsOtherTax = [];
			this.data.lsOtherLawCode = [];
			this.data.lsValuationNo = [];

			this.data.absDutyUnitCd = "";
			this.data.curCdAbsDuty = "";
			this.data.importTaxClfCd = "";
			this.data.perUnitTaxCd = "";
			this.data.unitPriceCurCd = "";
			this.data.cstValueCurCd = "";
			this.data.rdcImpTaxCd = "";
			this.data.qttUnitCd1 = "";
			this.data.qttUnitCd2 = "";
			this.data.priceQttUnit = "";

			for (var i = 0; i < 5; i++) {
				this.data.lsOtherLawCode.push({ otherLawCd: "" });
				this.data.lsValuationNo.push({ valuationNo: "" });
			};

			this.data.lsOtherTax.push({ itemNmOTax: "Thuế nhập khẩu bổ sung", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
			this.data.lsOtherTax.push({ itemNmOTax: "Thuế tiêu thụ đặc biệt", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
			this.data.lsOtherTax.push({ itemNmOTax: "Thuế bảo vệ môi trường", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
			this.data.lsOtherTax.push({ itemNmOTax: "Thuế giá trị gia tăng", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
			this.data.lsOtherTax.push({ itemNmOTax: "Thuế chống phân biệt đối xử", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });

			this.currency = await Lib.getCurrency();
			this.lstPerUnitTax = this.lstAbsDutyUnit = await Lib.getAbsoluteDutyRateUnit();
			this.lstImportTaxClf = await Lib.getImportTaxClassification();
			this.lstWeightUnit = await Lib.getWeightUnit();
			this.loadDetail();
		},
		save: function (isContinue) { 
			var self = this;
			var dclId = $('#dclId').val();  

			if (!this.data.hSCd) {
				bootbox.alert("Bạn chưa nhập Mã số hàng hóa");
				return;
			}
			if (Vali.CheckSpecial(this.data.hSCd)) {
				bootbox.alert("Mã số hàng hóa không hợp lệ");
				return;
			}
			if (Vali.CheckHaveText(this.data.hSCd)) {
				bootbox.alert("Mã số hàng hóa không hợp lệ");
				return;
			}
			if (this.data.materialCd) this.data.materialCd = this.data.materialCd.toUpperCase();
			if (!this.data.itemName) {
				bootbox.alert("Bạn chưa nhập Mô tả hàng hóa");
				return;
			}
			this.data.itemName = this.data.itemName.replace(/\r?\n/g, ", ");

			if (!this.data.placeOriginCd) {
				bootbox.alert("Bạn chưa nhập Mã nước xuất xứ");
				return;
			}
			this.data.placeOriginCd = this.data.placeOriginCd.toUpperCase();
			if (!this.data.qtt1) {
				bootbox.alert("Bạn chưa nhập số lượng 1");
				return;
			}
			if (!this.data.qttUnitCd1) {
				bootbox.alert("Bạn chưa nhập Mã đơn vị số lượng 1");
				return;
			}
			this.data.qttUnitCd1 = this.data.qttUnitCd1.toUpperCase();
			if (this.data.taxExpLsNo) this.data.taxExpLsNo = this.data.taxExpLsNo.toUpperCase();
			if (this.data.priceQttUnit) this.data.priceQttUnit = this.data.priceQttUnit.toUpperCase();

			var listProducts = [];
			listProducts.push(this.data)
			var dataRequest = { accountId: 0, dclId: dclId, listProducts: listProducts };  

			utils.Loading();
			var token = $('#hdfToken').val();
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
					utils.unLoading();
					if (data) {
						if (data.ResponseCode > 0) {
							utils.closeAll();
							bootbox.alert("Thêm sản phẩm thành công!", function () {
								app.getList(dclId);

								if (isContinue == 1) {
									Decla.ShowPopAddProduct(dclId);
								}
							})
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
		update: function () {
			
			var self = this;
			
			if (!this.data.hSCd) {
				bootbox.alert("Bạn chưa nhập Mã số hàng hóa");
				return;
			}
			if (Vali.CheckSpecial(this.data.hSCd)) {
				bootbox.alert("Mã số hàng hóa không hợp lệ");
				return;
			}
			if (Vali.CheckHaveText(this.data.hSCd)) {
				bootbox.alert("Mã số hàng hóa không hợp lệ");
				return;
			}
			if (this.data.materialCd) this.data.materialCd = this.data.materialCd.toUpperCase();
			if (!this.data.itemName) {
				bootbox.alert("Bạn chưa nhập Mô tả hàng hóa");
				return;
			}
			this.data.itemName = this.data.itemName.replace(/\r?\n/g, ", ");
			if (!this.data.placeOriginCd) {
				bootbox.alert("Bạn chưa nhập Mã nước xuất xứ");
				return;
			}
			this.data.placeOriginCd = this.data.placeOriginCd.toUpperCase();
			if (!this.data.qtt1) {
				bootbox.alert("Bạn chưa nhập số lượng 1");
				return;
			}
			if (!this.data.qttUnitCd1) {
				bootbox.alert("Bạn chưa nhập Mã đơn vị số lượng 1");
				return;
			}
			this.data.qttUnitCd1 = this.data.qttUnitCd1.toUpperCase();
			if (this.data.taxExpLsNo) this.data.taxExpLsNo = this.data.taxExpLsNo.toUpperCase();

			var listProducts = [];
			listProducts.push(this.data)
			var dataRequest = { listProducts: listProducts, dclId: $('#dclId').val() };
			 
			utils.Loading();
			var token = $('#hdfToken').val();
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
					utils.unLoading();
					console.log("edaDetail: ", data);
					utils.closeAll();
					if (data) {
						if (data.ResponseCode > 0) {
							bootbox.alert("Cập nhật thành công!", function () {
								app.getList(data.Data.dclId);
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
				var id = $('#hdf_productID').val();
				if (!id)
					return;

				var token = $('#hdfToken').val();
				const response = await axios.get(Config.API_Login + "import/GetIDAProductDetail?productid=" + id,
					{
						headers: { "Authorization": "Bearer " + token }
					});
				var res = response.data;
				if (res.ResponseCode >= 0) {
					this.data = response.data.Data;
					if (!this.data.lsOtherTax || this.data.lsOtherTax.length == 0) {
						this.data.lsOtherTax.push({ itemNmOTax: "Thuế nhập khẩu bổ sung", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
						this.data.lsOtherTax.push({ itemNmOTax: "Thuế tiêu thụ đặc biệt", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
						this.data.lsOtherTax.push({ itemNmOTax: "Thuế bảo vệ môi trường", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
						this.data.lsOtherTax.push({ itemNmOTax: "Thuế giá trị gia tăng", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
						this.data.lsOtherTax.push({ itemNmOTax: "Thuế chống phân biệt đối xử", oTaxTypeCd: "", cstOTaxAmt: "", oTaxRdcCd: "" });
					}
					else {
						this.data.lsOtherTax[0].itemNmOTax = "Thuế nhập khẩu bổ sung";
						this.data.lsOtherTax[1].itemNmOTax = "Thuế tiêu thụ đặc biệt";
						this.data.lsOtherTax[2].itemNmOTax = "Thuế bảo vệ môi trường";
						this.data.lsOtherTax[3].itemNmOTax = "Thuế giá trị gia tăng";
						this.data.lsOtherTax[4].itemNmOTax = "Thuế chống phân biệt đối xử";
					}
				} 

			} catch (error) {
				console.error(error);
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
		}
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