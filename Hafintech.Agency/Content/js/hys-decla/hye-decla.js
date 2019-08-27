var appHys = new Vue({
    el: '#hye-form',
    data: {
        data: {},  
    },
    methods: {
		loadDetail: function (id) {
			var self = this;
			utils.Loading();
			var token = $('#hdfToken').val();
			$.ajax({
				type: 'POST',
				url: Config.API_Login + "tax/GetDetailHYS",
				data: JSON.stringify({
					"id": id,
				}),
				headers: {
					"Authorization": "Bearer " + token
				},
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function (data) {
					console.log("loadDetail: ", data);
					utils.unLoading();
					if (data) {
						self.data = data.Data;

						//if (data.Data.initType == 1 || data.Data.initType == 2 || data.Data.initType == 4 || data.Data.initType == 6) {
						//	self.showSubmit = true;
						//}
						//else if ((data.Data.initType == 3 || data.Data.initType == 5 || data.Data.initType == 7) && utils.getCookie("permitGroup") == 2) {
						//	self.showTK = true;
						//}
						//else if ((data.Data.initType == 3 || data.Data.initType == 5 || data.Data.initType == 7) && (utils.getCookie("permitGroup") == 3 || utils.getCookie("Type") == 2)) {
						//	self.showSubmit = true;
						//}
						//else if (data.Data.initType == 8 && utils.getCookie("isAgency") == 2) {
						//	self.showTK = true;
						//}
						//else if (data.Data.initType == 8 && utils.getCookie("isAgency") == 1) {
						//	self.showSubmit = true;
						//}
					}
				},
				error: function (data) {
					utils.unLoading();
					bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				}
			});
        }, 
        DateFormat: function (date) {
            if (!date)
                return "";
            var year = date.substring(0, 4);
            var month = date.substring(4, 6);
            var day = date.substring(6, 8);
            var h = date.substring(8, 10);
            var m = date.substring(10, date.length);
            var dateS = year + "-" + month + "-" + day + " " + h + ":" + m;
            return {
                year: year,
                month: month,
                day: day,
                h: h,
                m: m,
                dateS: dateS
            }
        },
    },
    mounted() {
		var decId = $("#decId").val();
		if (decId && decId > 0) {
			this.loadDetail(decId);
        }
    },
    computed: {
    }
});