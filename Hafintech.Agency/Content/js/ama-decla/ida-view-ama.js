var app = new Vue({
    el: '#ama-dec',
    data: {
		data: { 
			listProducts: [],
		},
		ListCurrency: [], //Mã tiền tệ của tiền thuế  

		///Hàng hóa
		pageProduct: 1,
		totalPro: 1,
		textPage: "",
		listProducts: [], //danh sách hàng hóa
		//chi tiết hàng hóa
		Product: { 
			lsProREInfo: [], //Ds thuế và thu khác
		}, 

    },
	methods: {
		init: async function () {
			var data = this.data;
			data.curCdTaxAmt = "";
			data.curCdBTaxAmend = "";
			data.cstOfficeNm = "";
			data.extPayDueCd = "";
			data.amendDlcReaCd = "";

			this.textPage = this.pageProduct + "/" + this.totalPro;
			//this.ListCurrency = await Lib.getCurrency();
			 
			for (var i = 0; i < 5; i++) {
				this.Product.lsProREInfo.push(
					{
						stTaxValBTaxAm: "",
						stQuanBTaxAm: "",
						msBOTaxColAm: "",
						"clsfCdBTaxAm": "",
						"tRateBTaxColAm": "",
						"tAmtBOTColAm": "",
						"stTaxValTCAm": "",
						"stQuanAOTCAm": "",
						"msUCSQAOTCAm": "",
						"clsfCdAOTColAm": "",
						"tRateAOTColAm": "",
						"tAmtAOTColAm": ""
					}
				);
			}

		},
		loadDetail: function (decId) {
			var self = this;

			utils.Loading();
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'POST',
				url: Config.API_Login + "tax/GetAMADetail",
				data: JSON.stringify({
					"id": decId,
				}),
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					utils.unLoading();
					console.log("loadDetail - AMA: ", data);
					if (data) {
						self.data = data.Data;
						self.listProducts = data.Data.listProducts;
						self.Product = data.Data.listProducts[0];
						self.totalPro = data.Data.listProducts.length; 
						self.textPage = self.pageProduct + "/" + data.Data.listProducts.length;

						self.data.dateCmplInsp = self.formatDate(self.data.dateCmplInsp).date;
						self.data.timeCmplInsp = self.formatTime(self.data.timeCmplInsp).time;

						self.data.amDclRegDate = self.formatDate(self.data.amDclRegDate).date;
						self.data.amDclRegTime = self.formatTime(self.data.amDclRegTime).time;

						self.data.ieDclDate = self.formatDate(self.data.ieDclDate).date;
						self.data.dateOfPermit = self.formatDate(self.data.dateOfPermit).date;
						//self.$forceUpdate();
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!"); 
					return;
				}
			});
		},
		//Libs 
		resetProduct: function () {
			this.Product = { 
				lsProREInfo: [], //Ds thuế và thu khác
			};

			for (var i = 0; i < 5; i++) {
				this.Product.lsProREInfo.push(
					{
						stTaxValBTaxAm: "",
						stQuanBTaxAm: "",
						msBOTaxColAm: "",
						"clsfCdBTaxAm": "",
						"tRateBTaxColAm": "",
						"tAmtBOTColAm": "",
						"stTaxValTCAm": "",
						"stQuanAOTCAm": "",
						"msUCSQAOTCAm": "",
						"clsfCdAOTColAm": "",
						"tRateAOTColAm": "",
						"tAmtAOTColAm": ""
					}
				);
			}
		},  
		formatDate: function (date) {
			if (!date)
				return "";

			var d = date.substring(0, 2);
			var m = date.substring(2, 4);
			var y = date.substring(4, date.length);
			var dateS = y + "-" + m + "-" + d;
			return {
				"day": d, "month": m, "year": y,
				"date": dateS,
			}
		},
		formatTime: function (time) {
			if (!time)
				return "";

			var h = time.substring(0, 2);
			var m = time.substring(2, 4);
			var s = time.substring(4, time.length);
			var timeS = h + ":" + m + ":" + s;
			return {
				"hour": h, "minute": m, "second": s,
				"time": timeS,
			}
		},
		//actions
		ViewResult: function (id, tab) {
			window.location.href = Config.Url_Root + "AMA/ResultAMA?decId=" + id + "&ishight=6&tab=" + tab;
		},  
		nextPro: function () {
			if (this.pageProduct == this.totalPro)
				return;
			this.pageProduct++;
			this.textPage = this.pageProduct + "/" + this.totalPro;

			this.Product = this.listProducts[this.pageProduct - 1]; 
		},
		prePro: function () {
			if (this.pageProduct == 1)
				return;
			this.pageProduct--;
			this.textPage = this.pageProduct + "/" + this.totalPro;

			this.Product = this.listProducts[this.pageProduct - 1]; 
		}, 
    },
    mounted() {
        var self = this;
		this.init(); 
		var decId = $("#decId").val();
		if (decId && decId > 0) {
			this.loadDetail(decId);
		}
    },
    computed: {
        // a computed getter
        //stream: function () {
        //    // `this` points to the vm instance
        //    if (this.data.insClsCd === '1')
        //        return 'Luồng xanh';
        //    if (this.data.insClsCd === '2')
        //        return 'Luồng vàng';
        //    if (this.data.insClsCd === '3')
        //        return 'Luồng đỏ';
        //    return 'Chưa phân luồng';
        //}
    },
    watch: {
    }
});