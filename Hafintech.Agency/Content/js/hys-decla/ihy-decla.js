var appHys = new Vue({
    el: '#ihy',
    data: {
        data: {},
        txtappProType: [],
    },
    methods: {
        init: async function(){
            this.txtappProType = await Lib.GetApplicationProcedureType();  
        },
        loadDetail: function (attNo) {
            utils.Loading();
			var token = $('#hdfToken').val();
			var self = this;
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "tax/GetAttachment",
                data: JSON.stringify({
                    "attachmentNo": attNo,
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    utils.unLoading();
                    if (data && data.ResponseCode > 0) {
						self.data = data.Data;

                    }
                    else {
                        bootbox.alert("Số tờ khai không tồn tại hoặc chưa được khai báo!");
                    }
                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
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
		viewResult: function () {
			var id = this.data.id ? this.data.id : 0;
			var attachmentNo = this.data.attachmentNo ? this.data.attachmentNo : 0;

			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight");

			window.location.href = Config.Url_Root + "HYS/ResultsHYE?decId=" + id + "&attNo=" + attachmentNo + "&ishight=" + ishight + "&tab=3";
		},
    },
    mounted() {
        this.init();
        var attNo = $("#attNo").val();
        if (attNo && attNo > 0) {
            this.loadDetail(attNo);
        }
    },
    computed: {
    }
});