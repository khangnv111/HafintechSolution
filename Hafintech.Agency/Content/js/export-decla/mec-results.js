var reMec = new Vue({
    el: '#result-mec',
    data: {
        data: {},
        showLoading: true,
        lstMess: [],
    },
    methods: {
		loadMess: function (dclId) {

            var token = $('#hdfToken').val();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "tax/GetAttachmentMessage",
                data: JSON.stringify({
                    //attachmentNo: attNo,
					dclId: dclId,
                    count: 100,
                    page: 0,
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    reMec.showLoading = false;
                    console.log("loadMess: ", data);
                    if (data) {
                        reMec.lstMess = data.Data.ListOutputCommonSegment;
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        },
		viewDec: function (id, tab) {

			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight"); 

			window.location.href = Config.Url_Root + "ExportDeclaration/MEC_InsertUpdate?decId=" + id + "&tab=" + tab + "&ishight=" + ishight;
        },
        ViewMess: function (item) {
            var url = Config.Message + "MediationCustomsMessage/messages/print?messageId=" + item.messageId;
            window.open(url, "_blank");
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
		var dclId = $("#decId").val();
		if (dclId && dclId > 0) {
			this.loadMess(dclId);
        }
        else {
            this.showLoading = false;
        }
    },
    computed: {
    }
});