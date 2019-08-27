var appHys = new Vue({
    el: '#result-hys',
    data: {
        data: {},
        showLoading: true,
        lstMess: [],
    },
    methods: {
        loadMess: function (attNo) {

            var token = $('#hdfToken').val(); 
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "tax/GetAttachmentMessage",
                data: JSON.stringify({ 
                    attachmentNo: attNo,
                    count: 100,
                    page: 0,
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    appHys.showLoading = false;
                    console.log("loadMess: ", data); 
                    if (data) {
                        appHys.lstMess = data.Data.ListOutputCommonSegment;
                    }
                },
                error: function (data) { 
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        },
        ViewMess: function(item){
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
		viewDecla: function () { 

			var url_string = window.location.href
			var url = new URL(url_string);
			var ishight = url.searchParams.get("ishight"); 
			var id = url.searchParams.get("decId"); 
			var attachmentNo = url.searchParams.get("attNo"); 

			window.location.href = Config.Url_Root + "HYS/InsertHYS?decId=" + id + "&attNo=" + attachmentNo + "&ishight=" + ishight + "&tab=1&IdDec=" + id;
		},
    },
    mounted() { 
        var attNo = $("#attNo").val();
        if (attNo && attNo > 0) {
            this.loadMess(attNo);
        }
        else {
            this.showLoading = false;
        }
    },
    computed: {
    } 
});