var appHys = new Vue({
    el: '#list-hys',
    data: {
        data: {},
        listHYS: [], //danh sách tờ khai HYS
        txtappProType: [], //phân loại thủ tục khai báo
        lstCustom: [], 

		showLoading: true,
		fromdate: "",
		todate: "",
		pageSize: 10,
		total: 0,
    },
    methods: {
        init: async function () {
            var data = this.data; 
            data.cstOffice = "";
            data.appProType = "";
            data.fromdate = "";
            data.todate = "";

            this.txtappProType = await Lib.GetApplicationProcedureType();
            this.lstCustom = await Lib.getCustomsOffice();
        },
        getList: async function (page) {
			try {
				if (!page) page = 0;
				var data = this.data;
				data.fromdate = this.formatDate(this.fromdate);
				data.todate = this.formatDate(this.todate);

                var token = $('#hdfToken').val();
				const response = await axios.get(Config.API_Login + "tax/SearchAttachment?cstOffice=" + data.cstOffice + "&appProType=" + data.appProType + "&startDate=" + data.fromdate + "&endDate=" + data.todate + "&page=" + page + "&count=" + this.pageSize,
                    {
                        headers: { "Authorization": "Bearer " + token },
                    });
                this.showLoading = false;
                var res = response.data;
                if (res.ResponseCode >= 0)
                {
					this.listHYS = response.data.Data.ListAttachment;
					this.showPage(page, response.data.Data.Total);
					this.total = response.data.Data.Total;
                } 
            } catch (error) {
                console.error(error);
            }
		},
		showPage: function (page, total) {

			var totalPage = 0;
			if (total % 10 == 0) {
				totalPage = total / 10;
			}
			else {
				var du = total % 10;
				total = total - du;
				totalPage = total / 10 + 1;
			}
			var CurPage = page + 1;

			var htmlP = '';

			if (totalPage > 1) {
				htmlP += '<li><a href="javascript:;" onclick="appHys.getList(0)"><i class="fa fa-angle-double-left"></i></a></li>';
				htmlP += '<li><a href="javascript:;" onclick="appHys.getList(' + (page - 1 <= 0 ? 0 : page - 1) + ')"><i class="fa fa-angle-left"></i></a></li>';

				for (var i = CurPage - 3; i < CurPage + 3; i++) {
					if (i > 0 && i <= totalPage) {
						if (CurPage == i) {
							htmlP += '<li class="active"><a href="javascript:;" onclick="appHys.getList(' + (i - 1) + ')" >' + i + '</a></li>';
						}
						else {
							htmlP += '<li><a href="javascript:;" onclick="appHys.getList(' + (i - 1) + ')" >' + i + '</a></li>';
						}
					}
				}
				htmlP += '<li><a href="javascript:;" onclick="appHys.getList(' + (page + 1 >= totalPage ? page : page + 1) + ')" ><i class="fa fa-angle-right"></i></a></li>';
				htmlP += '<li><a href="javascript:;" onclick="appHys.getList(' + (totalPage - 1) + ')" ><i class="fa fa-angle-double-right"></i></a></li>';

			}

			$(".pagination").html(htmlP);

		},

        formatDate: function(date) {
            if(!date) return "";

            return moment(String(date)).format('DD-MM-YYYY')
        },
        formatDate2: function(date){
            if (date == undefined || date == "" || date == null) {
                return "";
            }
            var d = date.substring(0, 2);
            var m = date.substring(2, 4);
            var y = date.substring(4, date.length);

            var time = d + "/" + m + "/" + y;

            return time;
        },
        view: function (id, attNo) {
            window.location.href = Config.Url_Root + "HYS/InsertHYS?decId=" + id + "&attNo=" + attNo + "&ishight=5&tab=1"; 
		},
		delHys: function (item) {
			var self = this;
			var token = $('#hdfToken').val();
			bootbox.dialog({
				title: "Xác nhận xóa tờ khai",
				message: 'Bạn có chắc muốn xóa tờ khai này',
				buttons: {
					success: {
						label: "Xác nhận",
						className: "btn-danger",
						callback: function () {

							utils.Loading();
							$.ajax({
								type: 'POST',
								url: Config.API_Login + "agency/deleteHYS?id=" + item.id,
								data: {
								},
								headers: {
									"Authorization": "Bearer " + token
								},
								contentType: "application/json; charset=utf-8",
								dataType: "json",
								success: function (data) {
									utils.unLoading();
									if (data.ResponseCode > 0) {
										bootbox.alert("Thành công");
										self.getList(0);
									}
									else {
										bootbox.alert(data.Description);
									}
								},
								error: function (data) {
									utils.unLoading();
									bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
									return;
								}
							});

						}
					}
				}
			})
		},
    },
    mounted() {
        this.init();
        this.getList(0);

    },
    computed: {
    }

});