var lstExport = new Vue({
    el: '#lstExport',
    data: {
        data: {},
        showLoading: true,

        //lstOrganizationType: [],
        lstCustomsDepartment: [], //Cục HQ
        lstGroupType: [],
        lstCustoms: [],
        lstDeclaration: [],

		pageSize: 10,
		totalRow: 0,
    },
    methods: {
        init: async function () {
            var data = this.data;
            data.idCustom = "";
            data.cstOffice = "";
            data.type = 0;
            data.groupTypeId = "";
            data.startCreatedDate = "";
            data.endCreatedDate = "";
            data.dclNo = "";
            data.insClsCd = "";
            data.clearanStatus = 0;
            data.status = 0;
			data.statusCode = "";
			data.houseAwbNo = "";

            this.lstGroupType = await Lib.getGroupType();
            this.lstCustomsDepartment = await Lib.GetCustomsDepartment();

        },
        getList: async function (page, callback) {
			try {

				if (!page) page = 0; 
				var data = this.data;
				var startCreatedDate = this.formatDate(data.startCreatedDate);
				var endCreatedDate = this.formatDate(data.endCreatedDate);
				var accountId = $("#accIdLogin").val(); 

				var token = $('#hdfToken').val();
                const response = await axios.get(Config.API_Login + "agency/SearchEDADeclaration?type=" + data.type + "&cstOffice=" + data.cstOffice + "&dclNo=" + data.dclNo +
                    "&startCreatedDate=" + startCreatedDate + "&endCreatedDate=" + endCreatedDate + "&dclKindCd=" + data.groupTypeId + "&insClsCd=" + data.insClsCd
					+ "&clearanStatus=" + data.clearanStatus + "&status=" + data.status + "&statusCode=" + data.statusCode + "&page=" + page + "&count=" + this.pageSize + "&accountId=" + accountId + "&houseAwbNo=" + data.houseAwbNo,
                    {
                        headers: { "Authorization": "Bearer " + token },
					});

                this.showLoading = false;
                var res = response.data;
                if (res.ResponseCode >= 0) {
                    this.lstDeclaration = response.data.Data.ListDeclarations;
                    this.totalRow = response.data.Data.Total;
					this.showPage(page, this.totalRow); 

                    if (typeof callback != 'undefined' && typeof callback == 'function')
                        callback()
                } 
            } catch (error) {
                console.error(error);
            }
        },
        getListCustomSearch: async function () {
            //debugger; 
            this.lstCustoms = await Lib.getCustomsOffice(this.data.idCustom);
            this.$forceUpdate();
        },
        viewEdit: function (id, type) {
            if (type == 4) {
                window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + id + "&tab=1&ishight=4";
            }
            else if (type == 3) {
                window.location.href = Config.Url_Root + "ExportDeclaration/MEC_InsertUpdate?decId=" + id + "&tab=1&ishight=3";
            }
        },
        viewDeclaration: function (id, type, status) {
            if (type == 4) {
                switch (status) {
                    case 1:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + id + "&tab=1&ishight=4";
                        break;
                    case 11:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + id + "&tab=1&ishight=4";
                        break;
                    case 12:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + id + "&tab=1&ishight=4";
                        break;
                    case 14:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDA01Declaration?decId=" + id + "&tab=5&ishight=4";
                        break;
                    case 13:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDCDeclaration?decId=" + id + "&tab=3&ishight=4";
                        break;
                    case 15:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDCDeclaration?decId=" + id + "&tab=3&ishight=4";
                        break;
                    case 16:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDCDeclaration?decId=" + id + "&tab=6&ishight=4";
                        break;
                    case 20:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDCDeclaration?decId=" + id + "&tab=7&ishight=4";
                        break;
                    case 21:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + id + "&tab=1&ishight=4";
                        break;
                    default:
                        window.location.href = Config.Url_Root + "ExportDeclaration/EDA_InsertUpdate?decId=" + id + "&tab=1&ishight=4";
                        break;
                }
            }
			else if (type == 3) {
				var tab = 1;
				if (status == 18) tab = 2;
				else if (status == 19) tab = 3;
				else if (status == 20) tab = 4;

				window.location.href = Config.Url_Root + "ExportDeclaration/MEC_InsertUpdate?decId=" + id + "&tab=" + tab + "&ishight=3";
            }
        },
		formatDate: function (date) {
			if (!date)
				return "";
            return moment(String(date)).format('DD-MM-YYYY')
        },
        formatDate2: function (date) {
            if (date == undefined || date == "" || date == null) {
                return "";
            }
            var d = date.substring(0, 2);
            var m = date.substring(2, 4);
            var y = date.substring(4, date.length);

            var time = d + "/" + m + "/" + y;

            return time;
        },
        removeDe: function (idDe) {
            bootbox.confirm("Bạn có chắc xóa tờ khai này!", function (resultCon) {
                if (resultCon) {
                    utils.Loading();
                    var token = $('#hdfToken').val();
                    $.ajax({
                        type: 'GET',
                        url: Config.API_Login + "export/DeleteEDADeclaration",
                        data: {
                            declarationID: idDe
                        },
                        headers: {
                            "Authorization": "Bearer " + token
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            //console.log(data); 
                            utils.unLoading();
                            if (data && data.ResponseCode > 0) {
                                bootbox.alert("Thành công", function () {
                                    lstExport.getList(0);
                                });
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
            });

        },
        showPage: function (page, total) {

			var totalPage = 0;
			if (total % this.pageSize == 0) {
				totalPage = total / this.pageSize;
            }
            else {
				var du = total % this.pageSize;
                total = total - du;
				totalPage = total / this.pageSize + 1;
            }
            var CurPage = page + 1;

            var htmlP = '';

            if (totalPage > 1) {
                htmlP += '<li><a href="javascript:;" onclick="lstExport.paging(0)"><i class="fa fa-angle-double-left"></i></a></li>';
                htmlP += '<li><a href="javascript:;" onclick="lstExport.paging(' + (page - 1 <= 0 ? 0 : page - 1) + ')"><i class="fa fa-angle-left"></i></a></li>';

                for (var i = CurPage - 3; i < CurPage + 3; i++) {
                    if (i > 0 && i <= totalPage) {
                        if (CurPage == i) {
                            htmlP += '<li class="active"><a href="javascript:;" onclick="lstExport.paging(' + (i - 1) + ')" >' + i + '</a></li>';
                        }
                        else {
                            htmlP += '<li><a href="javascript:;" onclick="lstExport.paging(' + (i - 1) + ')" >' + i + '</a></li>';
                        }
                    }
                }
                htmlP += '<li><a href="javascript:;" onclick="lstExport.paging(' + (page + 1 >= totalPage ? page : page + 1) + ')" ><i class="fa fa-angle-right"></i></a></li>';
                htmlP += '<li><a href="javascript:;" onclick="lstExport.paging(' + (totalPage - 1) + ')" ><i class="fa fa-angle-double-right"></i></a></li>';

            }

            $(".pagination").html(htmlP);

        },
        paging: function (page) {
            this.getList(page);
        },
    },
    mounted() {
        this.init();
        this.getList(0);

    }
});