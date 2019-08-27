var CusInfo = {
    businessId: 0,
    personalId: 0,
}

window.Customer = {
    //========================
    GetListBusiness: function () {
        var token = $('#hdfToken').val();
        var agencyid = utils.getCookie("businessIdAcc");


        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Business/SearchBusiness",
            data: {
                agencyid: agencyid
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("GetListBusiness: ", data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td><a href="' + Config.Url_Root + 'Customer/CustomerBusinessInfo?businessId=' + item.businessId + '">' + item.taxIdNumber + '</a></td>';
                        html += '<td>' + item.name + '</td>';
                        html += '<td>' + item.phoneNumber + '</td>';
                        html += '<td>' + item.address + '</td>';
                        html += '<td><a href="javascript:;" onclick="Customer.ViewEditBusiness(' + item.businessId + ')" class="btn btn-warning">Sửa</a>';
                        html += '<a href="javascript:;" onclick="Customer.DeleteBusiness(' + item.businessId + ')" class="btn btn-danger">Xóa</a></td>';
                        html += '</tr>';

                        if (i == data.Data.length - 1)
                            setTimeout(function () {
                                Customer.formatDataTable();
                            }, 500);
                    }

                }

                $(".list-content-table").html(html);


            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SearchListBusiness: function () {

        var parentId;
        if (utils.getCookie("Type") == "1") {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        var taxIdNumber = $("#codeBusinessSearch").val();
        var name = $("#nameBusinessSearch").val();

        var token = $('#hdfToken').val();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Business/SearchBusiness",
            data: JSON.stringify({
                parentId: parentId,
				businessId: null,
				taxIdNumber: taxIdNumber.trim(),
                name: name,
                status: 1,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchListBusiness: ", data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td><a href="' + Config.Url_Root + 'Customer/CustomerBusinessInfo?businessId=' + item.businessId + '">' + item.taxIdNumber + '</td>';
                        html += '<td>' + item.name + '</td>';
						html += '<td>' + item.phoneNumber + '</td>';
						html += '<td>' + (item.address == null ? "" : item.address) + '</td>';
                        html += '<td><a href="javascript:;" onclick="Customer.ViewEditBusiness(' + item.businessId + ')" class="btn btn-warning">Sửa</a>';
                        html += '<a href="javascript:;" onclick="Customer.DeleteBusiness(' + item.businessId + ')" class="btn btn-danger">Xóa</a></td>';
                        html += '</tr>';

                        if (i == data.Data.length - 1 && data.Data.length >= 10)
                            setTimeout(function () {
                                Customer.formatDataTable();
                            }, 500);
                    }

                }

                $(".list-content-table").html(html);


            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    ViewEditBusiness: function (businessId) {

        CusInfo.businessId = businessId;

        Customer.GetPopInsertBusiness(function () {
            $("#loginbox #title_pop").text('THÔNG TIN KHÁCH HÀNG DOANH NGHIỆP');
        });

        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }
        var token = $('#hdfToken').val();
        utils.Loading();

        setTimeout(function () { 

            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Business/SearchBusiness",
                data: JSON.stringify({
                    //parentId: parentId,
                    businessId: businessId,
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("ViewEditBusiness: ", data);
                    utils.unLoading();
                    if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0 && data.Data[0] != undefined && data.Data[0] != "" && data.Data[0] != null) {
                        var item = data.Data[0];
						$("#codeBusiness").val(item.taxIdNumber);
						document.getElementById("codeBusiness").disabled = true;
                        $("#nameBusiness").val(item.name);
                        $("#adressBusiness").val(item.address);
                        $("#phoneBusiness").val(item.phoneNumber);
                        $("#faxBusiness").val(item.fax);
                        $("#emailBusiness").val(item.email);
                        $("#webBusiness").val(item.website);

                        $("#urlBusinessVnaccs").val(item.cusUrl);
                        $("#idUserVnaccs").val(item.cusUserId);
                        $("#passVnaccs").val(item.cusPassword);
                        $("#codeTerminalVnaccs").val(item.cusTerminalId);
                        $("#terminalKeyVnaccs").val(item.cusAccessKey);

                        if (item.signMethod == 3) {
                            document.getElementById("signMethod_1").checked = true;
                        }
						else if (item.signMethod == 21){
                            document.getElementById("signMethod_2").checked = true;
                        }
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }, 500);
    },

    LoadDetailBusiness: function (businessId) {

        CusInfo.businessId = businessId;

        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        var token = $('#hdfToken').val();

        utils.Loading();
        setTimeout(function () {
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Business/SearchBusiness",
                data: JSON.stringify({
                    //parentId: parentId,
                    businessId: businessId,
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("LoadDetailBusiness: ", data);
                    utils.unLoading();
                    if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0 && data.Data[0] != undefined && data.Data[0] != "" && data.Data[0] != null) {
                        var item = data.Data[0];
                        $("#nameCompany").html(item.name);
                        $("#codeBusiness").val(item.taxIdNumber);
                        $("#nameBusiness").val(item.name);
                        $("#adressBusiness").val(item.address);
                        $("#phoneBusiness").val(item.phoneNumber);
                        $("#faxBusiness").val(item.fax);
                        $("#emailBusiness").val(item.email);
                        $("#webBusiness").val(item.website);

                        $("#urlBusinessVnaccs").val(item.cusUrl);
                        $("#idUserVnaccs").val(item.cusUserId);
                        $("#passVnaccs").val(item.cusPassword);
                        $("#codeTerminalVnaccs").val(item.cusTerminalId);
                        $("#terminalKeyVnaccs").val(item.cusAccessKey);

                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }, 500);
    },

    ShowPopupBusiness: function () {
        CusInfo.businessId = 0;
        Customer.GetPopInsertBusiness();
    },

    GetPopInsertBusiness: function (callback) {
        utils.Loading();

        $.ajax({
            type: "POST",
            url: Config.Url_Root + "Customer/CustomerBusinessInsert",
            data: {
            },
            success: function (data) {
                utils.unLoading();
                utils.ShowOverLay();

                var html = "<div id=\"PopupInsert\">" + data + "</div>";
                $("BODY").append(html);

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            }
        });

    },

    ConfirmInUpBusiness: function () {

        if (CusInfo.businessId == 0)//Insert
        {
            Customer.InsertBusiness();
        }
        else {
            Customer.UpdateBusiness(CusInfo.businessId);
        }
    },

    InsertBusiness: function () {

        var token = $('#hdfToken').val();

        //var businessId = utils.getCookie("businessIdAcc");

        var taxIdNumber = $("#codeBusiness").val();
        if (taxIdNumber == undefined || taxIdNumber == "") {
            $("#LogError").html("Bạn chưa điền mã doanh nghiệp");
			$("#LogError").show();

			$("#codeBusiness").focus();
			$("#codeBusiness").addClass("error");
			setTimeout(function () {
				$("#codeBusiness").removeClass("error");
			}, 5000);

            return;
		}
		taxIdNumber = taxIdNumber.trim();

        var name = $("#nameBusiness").val();
        if (name == undefined || name == "") {
            $("#LogError").html("Bạn chưa điền tên doanh nghiệp");
			$("#LogError").show();

			$("#nameBusiness").focus();
			$("#nameBusiness").addClass("error");
			setTimeout(function () {
				$("#nameBusiness").removeClass("error");
			}, 5000);
            return;
        }

        var address = $("#adressBusiness").val();
        var phoneNumber = $("#phoneBusiness").val();
        if (phoneNumber == undefined || phoneNumber == "") {
            $("#LogError").html("Bạn chưa điền số điện thoại doanh nghiệp");
			$("#LogError").show();

			$("#phoneBusiness").focus();
			$("#phoneBusiness").addClass("error");
			setTimeout(function () {
				$("#phoneBusiness").removeClass("error");
			}, 5000);
            return;
		}
		if (!Vali.CheckPhone(phoneNumber)) {
			$("#LogError").html("Số điện thoại không đúng");
			$("#LogError").show();

			$("#phoneBusiness").focus();
			$("#phoneBusiness").addClass("error");
			setTimeout(function () {
				$("#phoneBusiness").removeClass("error");
			}, 5000);

			return;
		}

        var fax = $("#faxBusiness").val();
        var website = $("#webBusiness").val();
        var cusUrl = $("#urlBusinessVnaccs").val();
        var cusUserId = $("#idUserVnaccs").val();
        var cusPassword = $("#passVnaccs").val();
        var cusTerminalId = $("#codeTerminalVnaccs").val();
        var cusAccessKey = $("#terminalKeyVnaccs").val();
        var email = $("#emailBusiness").val();
		if (email == null || email == "") {
            $("#LogError").html("Bạn chưa nhập Email doanh nghiệp");
			$("#LogError").show();
			$("#emailBusiness").focus();
			$("#emailBusiness").addClass("error");

			$("#emailBusiness").focus();
			$("#emailBusiness").addClass("error");
			setTimeout(function () {
				$("#emailBusiness").removeClass("error");
			}, 5000);
            return;
		}
		if (!Vali.validateEmail(email)) {
			$("#LogError").html("Email không đúng");
			$("#LogError").show();

			$("#emailBusiness").focus();
			$("#emailBusiness").addClass("error");
			setTimeout(function () {
				$("#emailBusiness").removeClass("error");
			}, 5000);
			return;
		}

		var signMethod = $('input[name=setSignature]:checked').val();
		if (!signMethod) {
			$("#LogError").html("Bạn chưa chọn thiết lập chữ ký số");
			$("#LogError").show();
			return;
		}

        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/CreateBusiness",
            data: JSON.stringify({
                //businessId: businessId,
                taxIdNumber: taxIdNumber,
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                fax: fax,
                website: website,
                //cusUrl: cusUrl,
                //cusUserId: cusUserId,
                //cusPassword: cusPassword,
                //cusTerminalId: cusTerminalId,
                //cusAccessKey: cusAccessKey,
                parentId: parentId,
                email: email,
                signMethod: signMethod
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("InsertBusiness: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data != "") {
                        //utils.Message("Thành công");
                        bootbox.alert("Thành công", function () {
                            location.reload();
                        });

                    }
                }
                else {
                    $("#LogError").html(data.Description);
                    $("#LogError").show();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    UpdateBusiness: function (businessId) {

        var token = $('#hdfToken').val();

		var taxIdNumber = $("#codeBusiness").val(); 
		if (taxIdNumber == undefined || taxIdNumber == "") {
			$("#LogError").html("Bạn chưa điền mã doanh nghiệp");
			$("#LogError").show();

			$("#codeBusiness").focus();
			$("#codeBusiness").addClass("error");
			setTimeout(function () {
				$("#codeBusiness").removeClass("error");
			}, 5000);
			return;
		}
		taxIdNumber = taxIdNumber.trim();

		var name = $("#nameBusiness").val();
		if (name == undefined || name == "") {
			$("#LogError").html("Bạn chưa điền tên doanh nghiệp");
			$("#LogError").show(); 

			$("#nameBusiness").focus();
			$("#nameBusiness").addClass("error");
			setTimeout(function () {
				$("#nameBusiness").removeClass("error");
			}, 5000);
			return;
		}

        var address = $("#adressBusiness").val();
		var phoneNumber = $("#phoneBusiness").val();
		if (phoneNumber == undefined || phoneNumber == "") {
			$("#LogError").html("Bạn chưa điền số điện thoại doanh nghiệp");
			$("#LogError").show();

			$("#phoneBusiness").focus();
			$("#phoneBusiness").addClass("error");
			setTimeout(function () {
				$("#phoneBusiness").removeClass("error");
			}, 5000);
			return;
		}
		if (!Vali.CheckPhone(phoneNumber)) {
			$("#LogError").html("Số điện thoại không đúng");
			$("#LogError").show();

			$("#phoneBusiness").focus();
			$("#phoneBusiness").addClass("error");
			setTimeout(function () {
				$("#phoneBusiness").removeClass("error");
			}, 5000);
			return;
		}
        var fax = $("#faxBusiness").val();
        var website = $("#webBusiness").val();
        var cusUrl = $("#urlBusinessVnaccs").val();
        var cusUserId = $("#idUserVnaccs").val();
        var cusPassword = $("#passVnaccs").val();
        var cusTerminalId = $("#codeTerminalVnaccs").val();
        var cusAccessKey = $("#terminalKeyVnaccs").val();
		var email = $("#emailBusiness").val();
		if (email == null || email == "") {
			$("#LogError").html("Bạn chưa nhập Email doanh nghiệp");
			$("#LogError").show();

			$("#emailBusiness").focus();
			$("#emailBusiness").addClass("error");
			setTimeout(function () {
				$("#emailBusiness").removeClass("error");
			}, 5000);
			return;
		}
		if (!Vali.validateEmail(email)) {
			$("#LogError").html("Email không đúng");
			$("#LogError").show();

			$("#emailBusiness").focus();
			$("#emailBusiness").addClass("error");
			setTimeout(function () {
				$("#emailBusiness").removeClass("error");
			}, 5000);
			return;
		}

		var signMethod = $('input[name=setSignature]:checked').val();
		if (!signMethod) {
			$("#LogError").html("Bạn chưa chọn thiết lập chữ ký số");
			$("#LogError").show();
			return;
		}

        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/UpdateBusiness",
            data: JSON.stringify({
                businessId: businessId,
                taxIdNumber: taxIdNumber,
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                fax: fax,
                website: website,
                cusUrl: cusUrl,
                cusUserId: cusUserId,
                cusPassword: cusPassword,
                cusTerminalId: cusTerminalId,
                cusAccessKey: cusAccessKey,
                parentId: parentId,
				email: email,
				signMethod: signMethod,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("UpdateBusiness: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data != "") {
                        //utils.Message("Thành công");
                        bootbox.alert("Thành công", function () {
                            location.reload();
                        });
                    }
                }
                else {
                    $("#LogError").html(data.Description);
                    $("#LogError").show();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    DeleteBusiness: function (businessId) {

        var token = $('#hdfToken').val();

        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        bootbox.confirm("Bạn có chắc xóa không?", function (res) {
            if (res) {
                utils.Loading();
                $.ajax({
                    type: 'POST',
                    url: Config.API_Login + "Agency/DeleteBusiness",
                    data: JSON.stringify([{
                        businessId: businessId,
                        parentId: parentId,
                    }]),
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        console.log("DeleteBusiness: ", data);
                        utils.unLoading();
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Thành công", function () {
                                location.reload();
                            });
                        }
                        else {
                            bootbox.alert("Có lỗi xảy ra. Xóa không thành công");
                        }
                    },
                    error: function (data) {
                        bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                        return;
                    }
                });
            }
        });

    },

    ListDeclarationBusiness: function (accountID) {
        var token = $('#hdfToken').val();

        var dclNo = $("#dclNo").val();
        var startCreatedDate = $('#datepickerFromD').val();
        var endCreatedDate = $('#datepickerToD').val();

        var dclKindCd = $('#grTypeSearch').val();

        var insClsCd = $('#slinsClsCd').val();
        var clearanStatus = $('#slclearanStatus').val();
        var status = $("#slstatus").val();
        //utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchByAccountID", //?accountID=" + $('#hdfUID').val(),
            data: {
                accountID: accountID,
                type: 0,
                cstOffice: "",
                dclNo: dclNo,
                startCreatedDate: startCreatedDate,
                endCreatedDate: endCreatedDate,
                dclKindCd: dclKindCd,
                insClsCd: insClsCd,
                clearanStatus: clearanStatus,
                status: status
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //utils.unLoading();
                console.log("ListDeclarationBusiness: ", data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td class="text-center">' + (i + 1) + '</td>';
                        if (item.type == 1) {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/LowValueDeInsert?IdDec=' + item.dclId + '&ishight=1">' + item.dclId + '</a></td>';
                        }
                        else {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/LowValueDeInsert?IdDec=' + item.dclId + '&ishight=2">' + item.dclId + '</a></td>';
                        }

                        html += '<td>' + Decla.getNameStatusCode(item.statusCode) + '</td>';
                        html += '<td>' + (item.dclNo == null ? "" : item.dclNo) + '</td>';
                        html += '<td>' + (item.regDate == null ? "" : item.regDate) + '</td>';
                        html += '<td>' + (item.impCtrCd == null ? "" : item.impCtrCd) + '</td>';
                        //html += '<td>' + (item.impCtrNm == null ? "" : item.impCtrNm) + '</td>';
                        html += '<td>' + Decla.getMaLH(item.dclKindCd) + '</td>';
                        html += '<td>' + Decla.getPhanLuong(item.insClsCd) + '</td>';
                        html += '<td>' + Decla.getThongQuan(item.clearanStatus) + '</td>';
                        html += '<td>' + (item.cstOffice == null ? "" : item.cstOffice) + '</td>';
                        html += '<td>' + (item.dateOfPermit == null ? "" : item.dateOfPermit) + '</td>';

                        if (item.type == 1) {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/LowValueDeInsert?IdDec=' + item.dclId + '&ishight=1" class="btn btn-warning">Sửa</a>';
                        }
                        else {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/HightValueDeInsert?IdDec=' + item.dclId + '&ishight=2" class="btn btn-warning">Sửa</a>';
                        }

                        html += '<a href="#" onclick="Decla.DeleteDecla(' + item.dclId + ')" class="btn btn-danger">Xóa</a></td>';
                        html += '</tr>';
                    }

                    setTimeout(function () {

                        Customer.formatDataTable();
                    }, 1500);

                }

                $(".content-table").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
                return;
            }
        });
    },

    //========================== 

    //Personal
    GetPopInsertPersonal: function () {
        utils.Loading();

        $.ajax({
            type: "POST",
            url: Config.Url_Root + "Customer/CustomerPersonalInsert",
            data: {
            },
            success: function (data) {
                utils.unLoading();
                utils.ShowOverLay();

                var html = "<div id=\"PopupInsert\">" + data + "</div>";
                $("BODY").append(html);
            }
        });
    },

    GetListPersonal: function () {
        var token = $('#hdfToken').val();
        var agencyid = utils.getCookie("businessIdAcc");


        $.ajax({
            type: 'GET',
            url: Config.API_Login + "Agency/GetListPersonalByAgency",
            data: {
                agencyid: agencyid
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("GetListPersonal: ", data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>'
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td><a href="' + Config.Url_Root + 'Customer/CustomerPersonalInfo?personalId=' + item.personalId + '">' + item.identity + '</a></td>';
                        html += '<td>' + item.name + '</td>';
                        html += '<td>' + (item.phoneNumber == undefined ? "" : item.phoneNumber) + '</td>';
                        html += '<td>' + item.address + '</td>';
                        html += '<td><a href="javascript:;" onclick="Customer.ViewEditPersonal(' + item.personalId + ')" class="btn btn-warning">Sửa</a>';
                        html += '<a href="javascript:;" onclick="Customer.DeletePersonal(' + item.personalId + ')" class="btn btn-danger">Xóa</a></td>';
                        html += '</tr>';

                        if (i == data.Data.length - 1)
                            setTimeout(function () {
                                Customer.formatDataTable();
                            }, 500);
                    }

                }

                $(".list-content-table").html(html);


            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SearchListPersonal: function () {
        var token = $('#hdfToken').val();
        var name = $("#fullnameSearch").val();
		var identity = $("#identitySerch").val();
		if (identity) identity = identity.trim();

        //var parentId = $("#accIdLogin").val();
        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/SearchPersonal",
            data: JSON.stringify({
                personalId: 0,
                name: name,
                identity: identity,
                parentId: parentId,
                type: 0
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchListPersonal: ", data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>'
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td><a href="' + Config.Url_Root + 'Customer/CustomerPersonalInfo?personalId=' + item.personalId + '">' + (item.identity == null ? "" : item.identity) + '</a></td>';
                        html += '<td>' + item.name + '</td>';
                        html += '<td>' + (item.phoneNumber == undefined ? "" : item.phoneNumber) + '</td>';
                        html += '<td>' + (item.address == null ? "" : item.address) + '</td>';
                        html += '<td><a href="javascript:;" onclick="Customer.ViewEditPersonal(' + item.personalId + ')" class="btn btn-warning">Sửa</a>';
                        html += '<a href="javascript:;" onclick="Customer.DeletePersonal(' + item.personalId + ')" class="btn btn-danger">Xóa</a></td>';
                        html += '</tr>';

                        //if (i == data.Data.length - 1 && data.Data.length >= 10)
                        //    setTimeout(function () {
                        //        Customer.formatDataTable();
                        //    }, 500);
                    }

                }

                $(".list-content-table").html(html);


            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    ViewEditPersonal: function (personalId) {
        var token = $('#hdfToken').val();

        Customer.GetPopInsertPersonal();
        CusInfo.personalId = personalId;

        utils.Loading();

        setTimeout(function () {

            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Agency/SearchPersonal",
                data: JSON.stringify({
                    personalId: personalId,
                    name: "",
                    identity: "",
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("ViewEditPersonal: ", data);
                    utils.unLoading();
                    if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {
                        if (data.Data[0] != undefined && data.Data[0] != "") {
                            var item = data.Data[0];

							$("#fullnamePersonal").val(item.name);
							var birthday = item.birthday.split(' ')[0];
							birthday = birthday.split('-')
							$("#dateOfBirth").val(birthday[0]);
							$("#monthOfBirth").val(birthday[1]);
							$("#yearOfBirth").val(birthday[2]);

                            if (item.gender == 1) {
                                $("#sex-male").prop("checked", true);
                                //document.getElementById("sex-male").checked = true;
                            }
                            else {
                                $("#sex-female").prop("checked", true);
                                //document.getElementById("sex-female").checked = true;
                            }
                            //Hộ chiếu
                            $("#passportNumber").val(item.passport);
                            $("#urlImgPass").val(item.passportImage);
                            $("#imgPassShow").attr("src", item.passportImage);

                            //CMND
							$("#identityNumber").val(item.identity);
							var dateIden = Ctrl.convertDate(item.identityDate).date;
							$("#identityDateCreate").val(Ctrl.formatDateTime(dateIden, 4));
                            $("#identityPlace").val(item.identityPlace);

                            $("#urlImgId1").val(item.idImgFront);
                            $("#imgIdShow1").attr("src", item.idImgFront);

                            $("#urlImgId2").val(item.idImgBack);
                            $("#imgIdShow2").attr("src", item.idImgBack);

                            //Email
                            $("#emailPersonal").val(item.email);
                            $("#phonePersonal").val(item.phoneNumber);
                            //Address
                            $("#cityAdress").val(item.province);
                            Ctrl.GetDistrict('cityAdress', 'districtAddress');
                            setTimeout(function () {
                                $("#districtAddress").val(item.district);
                            }, 500);

                            $("#detailAdress").val(item.address);
                        }
                    }

                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }, 1000);
    },

    LoadDetailPersonal: function (personalId) {
        var token = $('#hdfToken').val();

        CusInfo.personalId = personalId;

        utils.Loading();

        setTimeout(function () {

            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Agency/SearchPersonal",
                data: JSON.stringify({
                    personalId: personalId,
                    name: "",
                    identity: "",
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("LoadDetailPersonal: ", data);
                    utils.unLoading();
                    if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {
                        if (data.Data[0] != undefined && data.Data[0] != "") {
                            var item = data.Data[0];

                            $("#fullname").html(item.name);
							$("#fullnamePersonal").html(item.name);
							$("#birthDay").html(item.birthday.split(' ')[0]);

                            if (item.gender == 1) {
                                $("#gender").html("Nam");
                            }
                            else {
                                $("#gender").html("Nữ");
                            }
                            //Hộ chiếu
                            //$("#passportNumber").val(item.passport);
                            //$("#urlImgPass").val(item.passportImage);
                            //$("#imgPassShow").attr("src", item.passportImage);

							//CMND 
							$("#identityCard").html(item.identity + " - Ngày " + item.identityDate.split(' ')[0]);
                            $("#identityPlace").html(item.identityPlace);
                            $("#idImgFront").html('<img src="' + item.idImgFront + '" style="max-width: 150px;" />');
                            $("#idImgBack").html('<img src="' + item.idImgBack + '" style="max-width: 150px;" />');

                            $("#email").html(item.email);
                            $("#phone").html(item.phoneNumber);

                            //Address
                            //$("#cityAdress").val(item.province);
                            //Ctrl.GetDistrict('cityAdress', 'districtAddress');
                            //setTimeout(function () {
                            //    $("#districtAddress").val(item.district);
                            //}, 500);

							$("#detailAdress").html(item.address);
                        }
                    }

                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }, 1000);
    },

    ShowPopupPersonal: function () {
        CusInfo.personalId = 0;
        Customer.GetPopInsertPersonal();
    },

    ConfirmInUpPersonal: function () {

        if (CusInfo.personalId == 0)//Insert
        {
            Customer.InsertPersonal();
        }
        else {
            Customer.UpdatePersonal(CusInfo.personalId);
        }
    },

    InsertPersonal: function () {
        var token = $('#hdfToken').val(); 

        //var parentId = $("#accIdLogin").val();
        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

		var name = $("#fullnamePersonal").val();
		if (!name) {
			bootbox.alert("Bạn chưa nhập Họ và tên");
			return;
		}

        var dateOfBirth = $("#dateOfBirth").val();
        var monthOfBirth = $("#monthOfBirth").val();
		var yearOfBirth = $("#yearOfBirth").val();
		if (!dateOfBirth || !monthOfBirth || !yearOfBirth) {
			bootbox.alert("Bạn chưa nhập đủ thông tin ngày sinh");
			return;
		}
		var birthday = monthOfBirth + "/" + dateOfBirth + "/" + yearOfBirth;
		if (!Vali.CheckDate(birthday)) {
			bootbox.alert("Ngày sinh/ Năm sinh không hợp lệ");
			return;
		}

		var dateBir = new Date(birthday);
		var curDate = new Date();
		if (dateBir > curDate) {
			bootbox.alert("Ngày sinh không được lớn hơn ngày hiện tại");
			return;
		}

        var gender = 1;
        if (document.getElementById('sex-female').checked) gender = 2;

        var passport = $("#passportNumber").val();

		var identity = $("#identityNumber").val();
		if (!identity) {
			bootbox.alert("Bạn chưa nhập Số CMND");
			return;
		} 
		var identityDate = $("#identityDateCreate").val();
		if (!identityDate) {
			bootbox.alert("Bạn chưa nhập Ngày đăng ký CMND");
			return;
		}
		var curDate = new Date();
		var idenDate = new Date(identityDate);
		if (idenDate > curDate) {
			bootbox.alert("Ngày đăng ký CMND không thể lớn hơn ngày hiện tại");
			return;
		}
		identityDate = Ctrl.formatDateTime(identityDate, 2);

		var email = $("#emailPersonal").val();
		if (!email) {
			bootbox.alert("Bạn chưa nhập email");
			return;
		}
		if (!Vali.validateEmail(email)) {
			bootbox.alert("Email bạn nhập không đúng");
			return;
		}

		var phoneNumber = $("#phonePersonal").val();
		if (!phoneNumber) {
			bootbox.alert("Bạn chưa nhập SĐT");
			return;
		}
		if (!Vali.CheckPhone(phoneNumber)) {
			bootbox.alert("SĐT bạn nhập không đúng");
			return;
		}

		var identityPlace = $("#identityPlace").val();
		if (!identityPlace) {
			bootbox.alert("Bạn chưa nhập Nơi cấp CMND");
			return;
		}

        var province = $("#cityAdress").val();
        var district = $("#districtAddress").val();
        var address = $("#detailAdress").val();

        setTimeout(function () {
            var passportImage = $("#urlImgPass").val();
            var identityImageFront = $("#urlImgId1").val();
            if (!identityImageFront) {
                $("#LogError").html("Bạn chưa chọn ảnh mặt trước CMND");
                $("#LogError").show();
                utils.unLoading();
                return;
            }
            var identityImageBack = $("#urlImgId2").val();
            if (!identityImageBack) {
                $("#LogError").html("Bạn chưa chọn ảnh mặt sau CMND");
                $("#LogError").show();
                utils.unLoading();
                return;
            }
			utils.Loading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Agency/CreatePersonal",
                data: JSON.stringify({
                    name: name,
                    birthday: birthday,
                    gender: gender,
                    passport: passport,
                    passportImage: passportImage,
                    identity: identity,
                    identityDate: identityDate,
                    identityPlace: identityPlace,
                    identityImageFront: identityImageFront,
                    identityImageBack: identityImageBack,
                    province: province,
                    district: district,
                    address: address,
                    parentId: parentId,
                    email: email,
                    phoneNumber: phoneNumber
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("InsertPersonal: ", data);
                    utils.unLoading();
                    if (data.ResponseCode > 0) {
                        if (data.Data != null && data.Data != "") {
                            //utils.Message("Thành công");
                            bootbox.alert("Thành công", function () {
                                location.reload();
                            });
                        }
                    }
                    else {
                        $("#LogError").html(data.Description);
                        $("#LogError").show();
                    }
                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }, 1000);
    },

    UpdatePersonal: function (personalId) {
        var token = $('#hdfToken').val();

        //var parentId = utils.getCookie("businessIdAcc");
        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

		var name = $("#fullnamePersonal").val();
		if (!name) {
			bootbox.alert("Bạn chưa nhập Họ và tên");
			return;
		}

        var dateOfBirth = $("#dateOfBirth").val();
        var monthOfBirth = $("#monthOfBirth").val();
		var yearOfBirth = $("#yearOfBirth").val();
		if (!dateOfBirth || !monthOfBirth || !yearOfBirth) {
			bootbox.alert("Bạn chưa nhập đủ thông tin ngày sinh");
			return;
		}
		var birthday = monthOfBirth + "/" + dateOfBirth + "/" + yearOfBirth;
		if (!Vali.CheckDate(birthday)) {
			bootbox.alert("Ngày sinh/ Năm sinh không hợp lệ");
			return;
		}
		var dateBir = new Date(birthday);
		var curDate = new Date();
		if (dateBir > curDate) {
			bootbox.alert("Ngày sinh không được lớn hơn ngày hiện tại");
			return;
		}

        var gender = 1;
        if (document.getElementById('sex-female').checked) gender = 2;

        var passport = $("#passportNumber").val();

		var identity = $("#identityNumber").val();
		if (!identity) {
			bootbox.alert("Bạn chưa nhập Số CMND");
			return;
		} 
		var identityDate = $("#identityDateCreate").val();
		if (!identityDate) {
			bootbox.alert("Bạn chưa nhập Ngày đăng ký CMND");
			return;
		}
		var curDate = new Date();
		var idenDate = new Date(identityDate);
		if (idenDate > curDate) {
			bootbox.alert("Ngày đăng ký CMND không thể lớn hơn ngày hiện tại");
			return;
		}
		identityDate = Ctrl.formatDateTime(identityDate, 2);

		var email = $("#emailPersonal").val();
		if (!email) {
			bootbox.alert("Bạn chưa nhập email");
			return;
		}
		if (!Vali.validateEmail(email)) {
			bootbox.alert("Email bạn nhập không đúng");
			return;
		}
		var phoneNumber = $("#phonePersonal").val();
		if (!phoneNumber) {
			bootbox.alert("Bạn chưa nhập SĐT");
			return;
		}
		if (!Vali.CheckPhone(phoneNumber)) {
			bootbox.alert("SĐT bạn nhập không đúng");
			return;
		}

		var identityPlace = $("#identityPlace").val();
		if (!identityPlace) {
			bootbox.alert("Bạn chưa nhập Nơi cấp CMND");
			return;
		}
        var province = $("#cityAdress").val();
        var district = $("#districtAddress").val();
        var address = $("#detailAdress").val();

        utils.Loading();
        setTimeout(function () {
            var passportImage = $("#urlImgPass").val();
            var identityImageFront = $("#urlImgId1").val();
            var identityImageBack = $("#urlImgId2").val();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "Agency/updatepersonal",
                data: JSON.stringify({
                    personalId: personalId,
                    name: name,
                    birthday: birthday,
                    gender: gender,
                    passport: passport,
                    passportImage: passportImage,
                    identity: identity,
                    identityDate: identityDate,
                    identityPlace: identityPlace,
                    identityImageFront: identityImageFront,
                    identityImageBack: identityImageBack,
                    province: province,
                    district: district,
                    address: address,
                    parentId: parentId,
                    email: email,
                    phoneNumber: phoneNumber
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("UpdatePersonal: ", data);
                    utils.unLoading();
                    if (data.ResponseCode > 0) {
                        if (data.Data != null && data.Data != "") {
                            bootbox.alert("Thành công", function () {
                                location.reload();
                            });

                        }
                    }
                    else {
                        $("#LogError").html(data.Description);
                        $("#LogError").show();
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }, 1000);

    },

    DeletePersonal: function (personalId) {
        var token = $('#hdfToken').val();
        //var parentId = $("#accIdLogin").val();
        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        bootbox.confirm("Bạn có chắc xóa không?", function (res) {
            if (res) {
                utils.Loading();
                $.ajax({
                    type: 'POST',
                    url: Config.API_Login + "Agency/DeletePersonal",
                    data: JSON.stringify([{
                        personalId: personalId,
                        parentId: parentId,
                    }]),
                    headers: {
                        "Authorization": "Bearer " + token
                    },
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        //console.log("DeletePersonal: ", data);
                        utils.unLoading();
                        if (data.ResponseCode > 0) {
                            bootbox.alert("Xóa thành công", function () {
                                location.reload();
                            });
                        }
                        else {
                            bootbox.alert("Có lỗi xảy ra. Xóa không thành công");
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

    ///Lưu ảnh
    SaveImg: function (imgId, idBase, idurl, callback) {

        var fileImg = document.querySelector('#' + imgId).files[0];

        if (Img.CheckSizeImg(imgId)) {
            $("#LogError").html("File ảnh tải lên không được quá 3MB");
            $("#LogError").show();
            utils.unLoading();
            return;
        }

        var imageData = $("#" + idBase).val();
        // Create FormData object
        if (fileImg != undefined && fileImg != null) {
            var fileData = new FormData();
            fileData.append("nameImg", fileImg.name);
            fileData.append("imgBase64", imageData);

            $.ajax({
                type: "POST",
                url: Config.Url_Root + "Customer/SaveImg",
                contentType: false, // Not to set any content header
                processData: false, // Not to process data
                data: fileData,
                success: function (data) {

                    console.log("SaveImg: ", data);
                    if (data.ress > 0)
                        $("#" + idurl).val(data.imgUrl);

                    if (typeof callback != 'undefined' && typeof callback == 'function')
                        callback();
                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Có lỗi xảy ra khi lưu ảnh");
                    return;
                }
            });
        }

    },

    //Lấy businessId từ accid
    GetBusinessId: function () {
        var token = $('#hdfToken').val();
        var type = utils.getCookie("Type");
        //utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "Agency/GetBusinessInfoByID",
            data: {
                type: type,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("GetBusinessId: ", data);
                //utils.unLoading();
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "") {
                    $("#businessIdAcc").val(data.Data[0].businessId);
                    $("#taxIdNumberAcc").val(data.Data[0].taxIdNumber);

                    $("#nameBusiness").val(data.Data[0].name);
                    $("#address").val(data.Data[0].address);
                    $("#legalRepre").val(data.Data[0].legalRepre);
                    $("#codeBc").val(data.Data[0].zipCode);

                    $("#phoneBusiness").val(data.Data[0].phoneNumber);
                    $("#fax").val(data.Data[0].fax);
                    $("#emailBusiness").val(data.Data[0].email);
                    $("#website").val(data.Data[0].website);

                    $("#txtcstOffice").val(data.Data[0].cusCode);
                    $("#cusCodeImport").val(data.Data[0].cusCodeImport);
                    $("#cusCodeExport").val(data.Data[0].cusCodeExport);
                }

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //===========================
    formatDataTable: function () {
        $('.data-table').dataTable({
            "bJQueryUI": true,
            "sPaginationType": "full_numbers",
            "sDom": '<""l>t<"F"fp>',
        });
    },
};

window.Act = {
    Logout: function () {

        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var name_ck = cookies[i].split("=")[0].trim();
            utils.del_cookie("" + name_ck + "");
        }

        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "Home/Logout",
            data: {},
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                location.href = Config.Url_Root;
            },
            error: function (data) {
                return;
            }
        });
    },

    CheckActiveAcc: function () { 
		var verifyEmail = utils.getCookie("vrfEmailStatus");

        if (verifyEmail === "0") {
			Act.ShowOTP();
            //bootbox.confirm({
            //    title: "Thông báo",
            //    message: "Tài khoản của bạn chưa được kích hoạt. Bạn vui lòng vào email đăng ký lấy mã OTP để kích hoạt tài khoản",
            //    buttons: {
            //        cancel: {
            //            label: '<i class="fa fa-times"></i> Cancel'
            //        },
            //        confirm: {
            //            label: '<i class="fa fa-check"></i> Confirm'
            //        }
            //    },
            //    callback: function (result) {
            //        if (result) {
            //            Act.ShowOTP();
            //            //window.location.href = Config.Url_Root + "Account/AccInfo";
            //        }
            //    }
            //});
        }
    },

    ShowOTP: function () {
        utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Account/VerifyOTP",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                utils.unLoading();

                $("BODY").append('<div id="popOTP">' + data + '</div>');
                utils.ShowOverLay();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    GetCodeOTP: function (type) {
        utils.Loading();
        var token = $('#hdfToken').val();

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getotp",
            data: {
                type: type
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //processData: true,
            //crossDomain: true,
            //xhrFields: { withCredentials: true },
            //cache: false,
            success: function (data) {
                utils.unLoading();

                if (data.ResponseCode > 0) {
					Act.ShowOTP();
                }
                else
                    utils.Message(data.Description);;
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    ConfirmOTP: function () {
        var token = $('#hdfToken').val();
        var txtOTP = $('#txtOTP').val();
        if (txtOTP == '') {
            $('#OTPError').html("Yêu cầu nhập đủ thông tin OTP!").show();
        }
        else {
            utils.Loading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "account/verify",
                data: JSON.stringify({
                    "otp": txtOTP
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    utils.unLoading();

                    if (data.ResponseCode > 0) {
                        utils.closeAll();
                        utils.Message("Xác thực tài khoản thành công!");
						 
						utils.setCookie("vrfEmailStatus", 1, 0.5);

                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                    else {
                        $('#OTPError').html(data.Description).show();
                    }

                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        }
    },
};

window.Account = {
    GetAccountInfo: function (isDe) {
        //utils.Loading();
        var id = $("#accIdLogin").val();
        var token = $('#hdfToken').val();
        var type = utils.getCookie("Type");

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/GetInfoByAccountID",
            data: {
                accountID: id,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("GetAccountInfo: ", data);
                //utils.unLoading();
                if (data.ResponseCode > 0 && data.Data.Accounts) {
                    var item = data.Data.Accounts;
                    var bu = data.Data.Business;
                    
                    //-------------------
                    if (type == 1) {
                        var per = data.Data.Personal;
                        utils.setCookie("permitGroup", data.Data.Personal.permitGroup, 1);
                        utils.setCookie("parentId", per.parentId, 1);
                    } 

                    utils.setCookie("businessIdAcc", bu.businessId, 1);
                    utils.setCookie("accountIdBuss", bu.accountId, 1);
                    utils.setCookie("taxIdNumberAcc", bu.taxIdNumber, 1); 
                    utils.setCookie("isAgency", bu.isAgency, 1); //1: doanh nghiệp - 2: đại lý 
					utils.setCookie("signMethod", bu.signMethod, 1); 
					utils.setCookie("submitMethod", bu.submitMethod, 1); //0: submit Usb 1: TT null: all

					var isExpress = bu.isExpress == null ? "" : bu.isExpress;
					utils.setCookie("isExpress", isExpress, 1);
					if (bu.isExpress == 1)
						$("#isExpress").show();

					var cusCode = bu.cusCode == null ? "" : bu.cusCode;
					utils.setCookie("cusCode", cusCode, 1);
					var cusCodeExport = bu.cusCodeExport == null ? "" : bu.cusCodeExport;
					utils.setCookie("cusCodeExport", cusCodeExport, 1);
					var cusCodeImport = bu.cusCodeImport == null ? "" : bu.cusCodeImport;
					utils.setCookie("cusCodeImport", cusCodeImport, 1);

                    $("#nameBusiness").val(bu.name);
                    $("#address").val(bu.address);
                    $("#legalRepre").val(bu.legalRepre);
                    $("#codeBc").val(bu.zipCode);

                    $("#phoneBusiness").val(bu.phoneNumber);
                    $("#fax").val(bu.fax);
                    $("#emailBusiness").val(bu.email);
                    $("#website").val(bu.website);

					if (type == 2) {
						$("#txtcstOffice").val(bu.cusCode);
						$("#cusCodeImport").val(bu.cusCodeImport);
						$("#cusCodeExport").val(bu.cusCodeExport);

                        var signMethod = bu.submitMethod;
						if (signMethod >= 0) {
                            $("#signMethod").val(signMethod);
                            if (signMethod == 0 || signMethod == null) {
								$("#uniform-useSigComputer span").addClass("checked");
							}
							else if (signMethod == 1) {
								$("#uniform-sendFileSig span").addClass("checked");
							}
							//else if (signMethod == 20) {
							//	$("#uniform-useOptionSig span").addClass("checked");
							//	$("#uniform-option1 span").addClass("checked");
							//}
							//else if (signMethod == 21) {
							//	$("#uniform-useOptionSig span").addClass("checked");
							//	$("#uniform-option2 span").addClass("checked");
							//}
						}
					}  

					$("#dateReg").html(item.createdDate);  

                    //-------------------
					$("#emailInfo").html(item.userName);
					$("#phoneInfo").val(item.mobile);

                    if (data.Data.Business && data.Data.Personal && data.Data.Business.isAgency == 2) {
                        utils.setCookie("agency", 1, 1);
                    }

                    if (item.vrfEmailStatus == 0) {
                        $(".verifyEmail").show();
                    }

                    if (item.vrfMobiStatus == 0) {
                        $(".verifyPhone").show();
                    }

                    //Tờ khai
                    if (isDe != undefined && isDe != null && isDe == 1) {
                        if (data.Data.Accounts.vrfEmailStatus == 0) {

                            bootbox.alert("Bạn chưa xác thực tài khoản nên không thể thực hiện chức năng này.<br> Mời bạn xác thực tài khoản", function () {
                                window.location.href = Config.Url_Root + "Account/AccInfo";
                            });
                        }

                    }
                }

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    ShowChangePassWord: function () {
        utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Account/ChangePassword",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                utils.unLoading();
                utils.ShowOverLay();
                $("BODY").append('<div id="popupwrap">' + data + '</div>')
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    SaveChangePassWord: function () {
        var token = $('#hdfToken').val();
        var txtPasswordOld = $('#txtPasswordOld').val();
        var txtPasswordNew = $('#txtPasswordNew').val();
        var txtRePasswordNew = $('#txtRePasswordNew').val();
        if (txtPasswordOld == '' || txtPasswordNew == '' || txtRePasswordNew == '') {
            $('#ChangeError').html("Yêu cầu nhập đủ thông tin!").show();
        }
        else if (txtPasswordNew != txtRePasswordNew) {
            $('#ChangeError').html("Nhập lại mật khẩu mới không khớp!").show();
        }
        else {
            utils.Loading();
            $.ajax({
                type: 'POST',
                url: Config.API_Login + "account/changepassword",
                data: JSON.stringify({
                    "OldPassword": MD5(txtPasswordOld),
                    "Password": MD5(txtPasswordNew)
                }),
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    utils.unLoading();
                    if (data.ResponseCode > 0) {
                        utils.closeAll();
                        utils.Message("Đổi mật khẩu thành công!");
                    }
                    else {
                        $('#ChangeError').html(data.Description).show();
                    }
                },
                error: function (err) {
                    utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                }
            });
        }
    },

    UpdateInfoBusiness: function () {
        var token = $('#hdfToken').val();
        var businessId = utils.getCookie("businessIdAcc");

        var taxIdNumber = utils.getCookie("taxIdNumberAcc");

        var name = $("#nameBusiness").val();
        if (!name) {
            bootbox.alert("Bạn chưa nhập tên doanh nghiệp");
            return;
        }

        var address = $("#address").val();
        var legalRepre = $("#legalRepre").val();
        var zipCode = $("#codeBc").val();
        var phoneNumber = $("#phoneBusiness").val();
        if (!phoneNumber) {
            bootbox.alert("Bạn chưa nhập số điện thoại doanh nghiệp");
            return;
        }
        var fax = $("#fax").val();
        var website = $("#website").val();
        var email = $("#emailBusiness").val();
        if (!email) {
            bootbox.alert("Bạn chưa nhập email doanh nghiệp");
            return;
        }

        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/UpdateBusiness",
            data: JSON.stringify({
                businessId: businessId,
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                fax: fax,
                website: website,
                legalRepre: legalRepre,
                email: email,
                taxIdNumber: taxIdNumber,
                zipCode: zipCode
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("UpdateBusiness: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data != "") {
                        bootbox.alert("Thành công!!!", function () {
                            location.reload();
                        });
                    }
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
    },

    InfoAccLogin: function () {
        var token = $('#hdfToken').val();
        var type = utils.getCookie("Type");
        var url = Config.API_Login + "Business/SearchBusiness"
        if (type == "1") {
            url = Config.API_Login + "Agency/SearchPersonal"
        }
        //utils.Loading(); 
        $.ajax({
            type: 'POST',
            url: url,
            data: {
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("InfoAccLogin: ", data);
                //utils.unLoading();
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    utils.setCookie("businessIdAcc", data.Data[0].businessId, 1);
                    utils.setCookie("taxIdNumberAcc", data.Data[0].taxIdNumber, 1);
                    utils.setCookie("permitGroup", data.Data[0].permitGroup, 1);
                    utils.setCookie("isAgency", data.Data[0].isAgency, 1); //1: doanh nghiệp - 2: đại lý
                    utils.setCookie("parentId", data.Data[0].parentId, 1);
                    utils.setCookie("signMethod", data.Data[0].signMethod, 1);

                    $("#nameBusiness").val(data.Data[0].name);
                    $("#address").val(data.Data[0].address);
                    $("#legalRepre").val(data.Data[0].legalRepre);
                    $("#codeBc").val(data.Data[0].zipCode);

                    $("#phoneBusiness").val(data.Data[0].phoneNumber);
                    $("#fax").val(data.Data[0].fax);
                    $("#emailBusiness").val(data.Data[0].email);
                    $("#website").val(data.Data[0].website);

                    $("#txtcstOffice").val(data.Data[0].cusCode);
                    $("#cusCodeImport").val(data.Data[0].cusCodeImport);
                    $("#cusCodeExport").val(data.Data[0].cusCodeExport);

                    $("#dateReg").html(Ctrl.formatDateTime(data.Data[0].createdDate, 1));
                    //$("#emailInfo").html(data.Data[0].email);
                    //$("#phoneInfo").html(data.Data[0].phoneNumber);
                    var signMethod = data.Data[0].signMethod;
                    if (signMethod) {
                        $("#signMethod").val(signMethod);
                        if (signMethod == 0) { 
                            $("#uniform-useSigComputer span").addClass("checked");
                        }
                        else if (signMethod == 1) { 
                            $("#uniform-sendFileSig span").addClass("checked");
                        }
                        else if (signMethod == 20) {
                            $("#uniform-useOptionSig span").addClass("checked");
                            $("#uniform-option1 span").addClass("checked");
                        }
                        else if (signMethod == 21) {
                            $("#uniform-useOptionSig span").addClass("checked");
                            $("#uniform-option2 span").addClass("checked");
                        }
                    }
                }

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
	},

	GetInfoAgency: function () {
		//utils.Loading();
		var id = utils.getCookie("accountIdBuss");
		var token = $('#hdfToken').val(); 

		$.ajax({
			type: 'GET',
			url: Config.API_Login + "account/GetInfoByAccountID",
			data: {
				accountID: id,
			},
			headers: {
				"Authorization": "Bearer " + token
			},
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (data) {
				console.log("GetInfoAgency: ", data);
				//utils.unLoading();
				if (data.ResponseCode > 0 && data.Data.Accounts) {
					var item = data.Data.Accounts;
					var bu = data.Data.Business; 

					$("#txtcstOffice").val(bu.cusCode);
					$("#cusCodeImport").val(bu.cusCodeImport);
					$("#cusCodeExport").val(bu.cusCodeExport);
					  
					var signMethod = bu.signMethod;
					if (signMethod >= 0) {
						$("#signMethod").val(signMethod);
						if (signMethod == 0) {
							$("#uniform-useSigComputer span").addClass("checked");
						}
						else if (signMethod == 1) {
							$("#uniform-sendFileSig span").addClass("checked");
						}
						else if (signMethod == 20) {
							$("#uniform-useOptionSig span").addClass("checked");
							$("#uniform-option1 span").addClass("checked");
						}
						else if (signMethod == 21) {
							$("#uniform-useOptionSig span").addClass("checked");
							$("#uniform-option2 span").addClass("checked");
						}
					} 
 
				}

			},
			error: function (data) {
				bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
				utils.unLoading();
			}
		});
	},
};

window.Decla = {

    //Danh sách
    getListDeclaration: function () {
        var token = $('#hdfToken').val();
        var slstatus = $('#slstatus').val();
        var slclearanStatus = $('#slclearanStatus').val();
        var slinsClsCd = $('#slinsClsCd').val();
        var sldclKindCd = $('#grTypeSearch').val();
        var slType = $('#slType').val();
        var slCustoms = $('#customChild').val();
        var datepickerFrom = $('#datepickerFromD').val();
        var datepickerTo = $('#datepickerToD').val();
        var txtDeclaration = $('#txtDeclaration').val();
        //if (txtDeclaration == '') { txtDeclaration = 0; }
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchDeclaration",
            data: {
                type: slType,
                dclId: "",
                cstOffice: slCustoms,
                dclNo: txtDeclaration,
                startCreatedDate: datepickerFrom,
                endCreatedDate: datepickerTo,
                dclKindCd: sldclKindCd,
                insClsCd: slinsClsCd,
                clearanStatus: slclearanStatus,
                status: slstatus,

            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("getListDeclaration: ", data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td class="text-center">' + (i + 1) + '</td>';
                        if (item.type == 1) {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/LowValueDeclarationDetail?IdDec=' + item.dclId + '&ishight=1">' + item.dclId + '</a></td>';
                        }
                        else {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/HightDeclarationDetail?IdDec=' + item.dclId + '&ishight=2">' + item.dclId + '</a></td>';
                        }

                        html += '<td>' + Decla.getNameStatusCode(item.statusCode) + '</td>';
                        html += '<td>' + (item.dclNo == null ? "" : item.dclNo) + '</td>';
                        html += '<td>' + (item.regDate == null ? "" : item.regDate) + '</td>';
                        html += '<td>' + (item.impCtrCd == null ? "" : item.impCtrCd) + '</td>';
                        html += '<td>' + (item.impCtrNm == null ? "" : item.impCtrNm) + '</td>';
                        html += '<td>' + Decla.getMaLH(item.dclKindCd) + '</td>';
                        html += '<td>' + Decla.getPhanLuong(item.insClsCd) + '</td>';
                        html += '<td>' + Decla.getThongQuan(item.clearanStatus) + '</td>';
                        html += '<td>' + (item.cstOffice == null ? "" : item.cstOffice) + '</td>';
                        html += '<td>' + (item.dateOfPermit == null ? "" : item.dateOfPermit) + '</td>';

                        if (item.type == 1) {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/LowValueDeInsert?IdDec=' + item.dclId + '&ishight=1" class="btn btn-warning">Sửa</a>';
                        }
                        else {
                            html += '<td class="text-center"><a href="' + Config.Url_Root + 'Declaration/HightValueDeInsert?IdDec=' + item.dclId + '&ishight=2" class="btn btn-warning">Sửa</a>';
                        }

                        html += '<a href="#" onclick="Decla.DeleteDecla(' + item.dclId + ')" class="btn btn-danger">Xóa</a></td>';
                        html += '</tr>';
                    }
                    setTimeout(function () {

                        Customer.formatDataTable();
                    }, 1500);
                }

                $(".content-search-table").html(html);

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Xóa tờ khai
    DeleteDecla: function (declarationId, callback) {
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
                            type: 'GET',
                            url: Config.API_Login + "tax/DeleteDeclaration",
                            data: {
                                declarationId: declarationId
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
                                }
                                else {
                                    utils.Message(data.Description);
                                }

                                if (typeof callback != 'undefined' && typeof callback == 'function') {
                                    callback();
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

    //Tờ khai giá trị cao
    SubmitDeclaration: function (type) {
        if (type == 1) {
            $('#hdfStatus').val(1);
        }
        else {
            $('#hdfStatus').val(0);
        }
        $('#btnSaveDeclaration').click();
    },

    InsertDeclarationHightValue: function () {
        //$('#hdfdataFileDocsInput1').val($('#fileinputdocs1').val());
        //$('#hdfdataFileDocsInput2').val($('#fileinputdocs2').val());
        //$('#hdfdataFileDocsInput3').val($('#fileinputdocs3').val());

        if ($('#slfreightDemarCd').val() != "" && $('#slfreightCurCd').val() != "" && $('#txtfreight').val() == "") {
            utils.Message("Bạn chưa nhập phí vận chuyển!");
            location.href = "#txtfreight";
            return;
        }

        if ($('#slinsDemarCd').val() != "" && $('#slinsCurCd').val() != "" && $('#txtinsAmt').val() == "") {
            utils.Message("Bạn chưa nhập phí bảo hiểm!");
            location.href = "#txtinsAmt";
            return;
        }

        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            url: Config.API_Login + "tax/InsertHighDeclaration",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                //debugger;
                utils.unLoading();
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        utils.Message("Khai báo tờ khai thành công");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/ListProduct?IdDec=" + data.Data.Declarations.dclId + "&ishight=2";
                        }, 1000);
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
                utils.unLoading();
                utils.Message("Hệ thống bận, vui lòng quay lại sau!");
            }
        });
    },

    UpdateDeclarationHightValue: function () {
        //$('#hdfdataFileDocsInput1').val($('#fileinputdocs1').val());
        //$('#hdfdataFileDocsInput2').val($('#fileinputdocs2').val());
        //$('#hdfdataFileDocsInput3').val($('#fileinputdocs3').val());
        if ($('#slfreightDemarCd').val() != "" && $('#slfreightCurCd').val() != "" && $('#txtfreight').val() == "") {
            utils.Message("Bạn chưa nhập phí vận chuyển!");
            location.href = "#txtfreight";
            return;
        }

        if ($('#slinsDemarCd').val() != "" && $('#slinsCurCd').val() != "" && $('#txtinsAmt').val() == "") {
            utils.Message("Bạn chưa nhập phí bảo hiểm!");
            location.href = "#txtinsAmt";
            return;
        }

        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            url: Config.API_Login + "tax/UpdateHighDeclaration",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                utils.unLoading();

                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        window.location.href = Config.Url_Root + "Declaration/ListProduct?IdDec=" + data.Data.Declarations.dclId + "&ishight=2&tab=1";
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
                utils.unLoading();
            }
        });
    },

    GetDetailHigthDeclaration: function (id) {
        utils.Loading();

        var token = $('#hdfToken').val();

        setTimeout(function () {

            $.ajax({
                type: 'GET',
                url: Config.API_Login + "tax/GetDeclarationDetail",
                data: {
                    DeclarationID: id
                },
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    utils.unLoading();
                    console.log("GetDetailHigthDeclaration: ", data);
                    if (data.ResponseCode > 0 && data.Data != null && data.Data != "") {
                        var t = data.Data;

                        if (t.status != 1) {
                            $("#divTablehide").css("display", "");
                        }
                        $("input[name=rdGroupType][value=" + t.groupTypeId + "]").prop('checked', true);

                        //thông tin chung
                        $("#dclNoHQ").val(t.dclNo);
                        $("#txttentativeDclNo").val(t.tentativeDclNo);
                        $("#txtfirstDclNo").val(t.firstDclNo);
                        $("#slcargoClsCd").val(t.cargoClsCd);
                        $('#txtdclKindCd,#hdfdclKindCd').val(t.dclKindCd);
                        if (t.DeclarationKinds != null && t.DeclarationKinds.length > 0) {
                            $('#txtdclKindCd_text').val(t.DeclarationKinds[0].dclKindNm);
                        }
                        $('#slclsOrg').val(t.clsOrg);
                        $('#slmeansOfTrsCd').val(t.meansOfTrsCd);
                        $('#slcstSubSection').val(t.cstSubSection);
                        if (t.CustomsOffices != undefined && t.CustomsOffices != null && t.CustomsOffices.length > 0) {
                            var c = t.CustomsOffices[0];
                            $('#txtcstOffice,#hdfcstOffice').val(c.cstOfficeCd);
                            $('#txtcstOfficeNm').val(c.cstOfficeNm);
                        }
                        else {
                            $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                            $('#txtcstOfficeNm').val(t.cstOfficeNm);
                        }

                        $('#txtdclPlannedDate').val(Ctrl.formatDateTime(t.dclPlannedDate, 2));
                        $('#txttimeLimReExp').val(Ctrl.formatDateTime(t.timeLimReExp, 2));

                        //Người nhập khẩu
                        $('#txtimperCd').val(t.imperCd);
                        $('#txtimperNm').val(t.imperNm);
                        $('#txtpostcode').val(t.postcode);
                        $('#txtphoneNoOfImp').val(t.phoneNoOfImp);
                        $('#txtaddressOfImp').val(t.addressOfImp);

                        //Người ủy thác nhập khẩu
                        $('#txtimpCtrCd').val(t.impCtrCd);
                        $('#txtimpCtrNm').val(t.impCtrNm);
                        //Người xuất khẩu
                        $('#txtconsignorCd').val(t.consignorCd);
                        $('#txtconsignorNm').val(t.consignorNm);
                        $('#txtpostcodeIdt').val(t.postcodeIdt);
                        $("#txtaddress1Street").val(t.address1Street);
                        $("#txtaddress2Street").val(t.address2Street);
                        $("#txtaddress3CityNm").val(t.address3CityNm);
                        $("#txtcountryNmAddress").val(t.countryNm);
                        $('#txtcountryCd,#hdfcountryCd').val(t.countryCd);
                        if (t.Countrys != null && t.Countrys.length > 0) {
                            for (var i = 0; i < t.Countrys.length; i++) {
                                if (t.Countrys[i].countryCode == t.placeOriginCd) {
                                    $('#txtcountryNm').val(t.Countrys[i].countryName);
                                    break;
                                }
                            }
                        }
                        $('#txtexportCsgNm').val(t.exportCsgNm);
                        $('#txtplannedDeclCd').val(t.plannedDeclCd);

                        //Vận đơn
                        if (t.cargoNo != undefined && t.cargoNo != null) {
                            if (t.cargoNo.length > 0) {
                                $.each(t.cargoNo, function (index, value) {
                                    $('#txtcargoNo' + (index + 1)).val(value.cargoNo);
                                });
                            }
                        }
                        $('#hdfpieceUnitCd').val(t.pieceUnitCd);
                        $('#txtcargoPiece').val(t.cargoPiece);
                        if (t.QuantityUnits != null && t.QuantityUnits.length > 0) {
                            $('#txtpieceUnitCd_text').val(t.QuantityUnits[0].quanUnitNm);
                        }
                        $('#txtcargoWeigGrs').val(t.cargoWeigGrs);
                        $('#hdfweigUnitCdGrs').val(t.weigUnitCdGrs);
                        if (t.WeightUnits != null && t.WeightUnits.length > 0) {
                            $('#txtweigUnitCdGrs').val(t.WeightUnits[0].weigUnitNm);
                        }
                        $('#hdfcstWrhCd,#txtcstWrhCd').val(t.cstWrhCd);
                        if (t.CustomsWarehouses != null && t.CustomsWarehouses.length > 0) {
                            $('#txtcstWrhCd_text').val(t.CustomsWarehouses[0].cstWrhNm);
                        }
                        $('#txtmarksAndNos').val(t.marksAndNos);
                        $('#hdfTransport,#txtTransport').val(t.loadVesselCd);
                        $('#txtloadVesselAcNm').val(t.loadVesselAcNm);
                        $('#txtarrDate').val(t.arrDate);

                        if (t.UnloadingPorts != undefined && t.UnloadingPorts != "" && t.UnloadingPorts != null && t.UnloadingPorts.length > 0) {
                            var unloadPordCd = t.UnloadingPorts[0].unloadPortCd;
                            if (unloadPordCd.length > 3) unloadPordCd = unloadPordCd.substring(unloadPordCd.length - 3, unloadPordCd.length);

                            $('#hdfunloadPortCd,#txtunloadPortCd').val(unloadPordCd);
                            $("#txtunloadPortNm").val(t.UnloadingPorts[0].unloadPortNm);
                        }
                        else {
                            var unloadPordCd = t.unloadPortCd;
                            if (unloadPordCd && unloadPordCd.length > 3) unloadPordCd = unloadPordCd.substring(unloadPordCd.length - 3, unloadPordCd.length);
                            $('#hdfunloadPortCd,#txtunloadPortCd').val(t.unloadPortCd);
                            $("#txtunloadPortNm").val(t.unloadPortNm);
                        }

                        if (t.LoadingLocations != undefined && t.LoadingLocations != "" && t.LoadingLocations != null && t.LoadingLocations.length > 0) {
                            $('#hdfloadLocCd,#txtloadLocCd').val(t.LoadingLocations[0].loadLocCd);
                            $('#txtloadLocNm').val(t.LoadingLocations[0].loadLocNm);
                        }
                        else {
                            $('#hdfloadLocCd,#txtloadLocCd').val(t.loadLocCd);
                            $('#txtloadLocNm').val(t.loadLocNm);
                        }
                        $('#txtnoHandledCtn').val(t.noHandledCtn);
                        $('#slresultInsCd,#txtresultInsCd').val(t.resultInsCd);

                        //thông tin chung 2
                        if (t.otherLawCd != "" && t.otherLawCd != null) {
                            var item = t.otherLawCd.split(';');
                            $("#hdfotherLawCd1").val(item[0]);
                            $("#hdfotherLawCd2").val(item[1]);
                            $("#hdfotherLawCd3").val(item[2]);
                            $("#hdfotherLawCd4").val(item[3]);
                            $("#hdfotherLawCd5").val(item[4]);
                            $.each(t.Documments, function (index, value) {
                                if (value.docummentId == item[0]) {
                                    $('#txtotherLawCd1').val(value.docummentName);
                                }
                                if (value.docummentId == item[1]) {
                                    $('#txtotherLawCd2').val(value.docummentName);
                                }
                                if (value.docummentId == item[2]) {
                                    $('#txtotherLawCd3').val(value.docummentName);
                                }
                                if (value.docummentId == item[3]) {
                                    $('#txtotherLawCd4').val(value.docummentName);
                                }
                                if (value.docummentId == item[4]) {
                                    $('#txtotherLawCd5').val(value.docummentName);
                                }
                            });
                        }
                        if (t.PermitTypes != undefined && t.PermitTypes != null) {
                            if (t.PermitTypes.length > 0) {
                                $.each(t.PermitTypes, function (index, value) {
                                    $('#txtpermitType' + (index + 1)).val(value.permitNm);
                                    $('#slpermitType' + (index + 1)).val(value.permitType);
                                });
                            }
                        }

                        //Hóa đơn thương mại
                        $('#slinvClsCd').val(t.invClsCd);
                        $('#txtinvNo').val(t.invNo);
                        $('#txteleInvRecNo').val(t.eleInvRecNo);
                        $('#sltermOfPay').val(t.termOfPay);
                        $('#txtinvDate').val(t.invDate);
                        $('#slinvPrcCdtCd').val(t.invPrcCdtCd);
                        $('#slinvPrcKindCd').val(t.invPrcKindCd);
                        $('#slinvCurCd').val(t.invCurCd);
                        $('#txttotalInvPrc').val(t.totalInvPrc);

                        //Tờ khai trị giá
                        $('#slvalDemarCd').val(t.valDemarCd);
                        $('#txtcompDclNo').val(t.compDclNo);
                        $('#slcurCdBasePrc').val(t.curCdBasePrc);
                        $('#txtbasePrcValAdj').val(t.basePrcValAdj);
                        $('#slfreightDemarCd').val(t.freightDemarCd);
                        $('#slfreightCurCd').val(t.freightCurCd);
                        $('#txtfreight').val(t.freight);
                        $('#slinsDemarCd').val(t.insDemarCd);
                        $('#slinsCurCd').val(t.insCurCd);
                        $('#txtinsAmt').val(t.insAmt);
                        $('#txtregNoIns').val(t.regNoIns);
                        if (t.lsAdjDemar != undefined && t.lsAdjDemar != null) {
                            if (t.lsAdjDemar.length > 0) {
                                $.each(t.lsAdjDemar, function (index, value) {
                                    $('#sladj' + (index + 1)).val(value.adjDemarNm);
                                    $('#slFeeCode' + (index + 1)).val(value.adjDemarCd);
                                    $('#slCurcyType' + (index + 1)).val(value.curCdOfEvaAmt);
                                    $('#txtValue' + (index + 1)).val(value.evaluatedAmt);
                                    $('#txtTotalValue' + (index + 1)).val(value.totalDisEva);
                                });
                            }
                        }
                        $('#txtdetailsOfVal').val(t.detailsOfVal);
                        $('#txttotalDisTaxVal').val(t.totalDisTaxVal);
                        $('#txttaxPayer').val(t.taxPayer);

                        //thuế và bảo lãnh
                        $('#txttotalTaxAmt').val(t.totalTaxAmt);
                        $('#txtsecAmt').val(t.secAmt);
                        if (t.lsTaxInfo != undefined && t.lsTaxInfo != null) {
                            if (t.lsTaxInfo.length > 0) {
                                $.each(t.lsTaxInfo, function (index, value) {
                                    $('#txttaxSubjectCd' + (index + 1)).val(value.taxSubjectCd);
                                    $('#txttaxSubjectNm' + (index + 1)).val(value.taxSubjectNm);
                                    $('#txtnoColTotalTax' + (index + 1)).val(value.noColTotalTax);
                                    $('#txtoTaxRdcAmt' + (index + 1)).val(value.totalTaxAmt);
                                });
                            }
                        }
                        if (t.lsCurrency != undefined && t.lsCurrency != null) {
                            if (t.lsCurrency.length > 0) {
                                $.each(t.lsCurrency, function (index, value) {
                                    $('#txtcurCd' + (index + 1)).val(value.curCd);
                                    $('#txtcurExcRate' + (index + 1)).val(value.curExcRate);
                                });
                            }
                        }

                        $('#slreasonCd,#txtreasonCd').val(t.reasonCd);
                        $('#hdfbankPayCd,#txtbankPayCd').val(t.bankPayCd);
                        if ((t.bankPayCd != null || t.secSupplBankCd != null) && t.Banks != undefined && t.Banks != null) {
                            $.each(t.Banks, function (index, value) {
                                if (value.bankCode == t.bankPayCd) {
                                    $('#txtbankPayCd_text').val(value.bankName);
                                }
                                if (value.bankCode == t.secSupplBankCd) {
                                    $('#txtsecSupplBankCd_text').val(value.bankName);
                                }
                            });
                        }
                        $('#txtissuedYear').val(t.issuedYear);
                        $('#txtsecBankSign').val(t.secBankSign);
                        $('#txtsecNo').val(t.secNo);

                        //thông tin đính kèm

                        //thông tin vận chuyển
                        $('#txtpermitWrhDate').val(t.permitWrhDate);
                        $('#txtstrDateTrs').val(t.strDateTrs);

                        if (t.lsTransInfo != null && t.lsTransInfo.length > 0) {
                            $.each(t.lsTransInfo, function (index, value) {

                                $('#slTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentarrDate' + (index + 1)).val(value.arrDateTrnLoc);
                                $('#txtTransshipmentStartDate' + (index + 1)).val(value.strDateTrnLoc);
                            });
                        }
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtdestarrDate').val(t.arrDateOfTrs);
                        $('#txtnotes').val(t.notes);
                        $('#txtetpControlNo').val(t.etpControlNo);
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                    return;
                }
            });

        }, 1000);
    },

    getListProduct: function (declarationID) {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchHighProduct",
            data: {
                declarationID: declarationID
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                $('#listContainer tbody').html("");
                if (data) {
                    if (data.Data) {
                        $.each(data.Data, function (index, value) {
                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.hSCd + "</td><td>" + value.itemName + "</td><td>" + value.placeOriginCd + "</td><td>" + value.qtt1 + "</td><td>" + value.qtt2 + "</td><td>" + value.qttUnitCd1 + "</td><td>" + value.invUnitPrice + "</td><td>" + value.unitPriceCurCd + "</td><td>" + value.invValue + "</td><td>" + value.cstValue + "</td><td>" + value.importTaxClfCd + "</td><td>" + value.dutyRate + "</td><td>" + value.rdcImpTaxCd + "</td><td>" + value.rdcAmtImpTax + "</td>" + Decla.checkUndefined(value.oTaxTypeCd) + "</tr>");
                        });
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    checkUndefined: function (datacheck) {
        var html = "";
        if (datacheck == undefined) {
            return html = "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
        }
        else {
            if (datacheck.length == 0 || datacheck.length == 1) {
                return html = "<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>";
            }
            if (datacheck.length == 2) {
                return html = "<td>" + datacheck[1].oTaxTypeCd + "</td> <td></td> <td>" + datacheck[1].oTaxRdcCd + "</td> <td>" + datacheck[1].oTaxRdcAmt + "</td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td>";
            }
            if (datacheck.length == 3) {
                return html = "<td>" + datacheck[1].oTaxTypeCd + "</td> <td></td> <td>" + datacheck[1].oTaxRdcCd + "</td> <td>" + datacheck[1].oTaxRdcAmt + "</td><td>" + datacheck[2].oTaxTypeCd + "</td><td></td><td>" + datacheck[2].oTaxRdcCd + "</td><td>" + datacheck[2].oTaxRdcAmt + "</td><td></td><td></td><td></td><td></td>";
            }
            if (datacheck.length == 4 || datacheck.length == 5) {
                return html = "<td>" + datacheck[1].oTaxTypeCd + "</td> <td></td> <td>" + datacheck[1].oTaxRdcCd + "</td> <td>" + datacheck[1].oTaxRdcAmt + "</td><td>" + datacheck[2].oTaxTypeCd + "</td><td></td><td>" + datacheck[2].oTaxRdcCd + "</td><td>" + datacheck[2].oTaxRdcAmt + "</td><td>" + datacheck[3].oTaxTypeCd + "</td><td></td><td>" + datacheck[3].oTaxRdcCd + "</td><td>" + datacheck[3].oTaxRdcAmt + "</td>";
            }
        }
    },

    ShowPopAddProduct: function (IdDec) {
        utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Declaration/PopInsertHangHoa",
            data: {
                IdDec: IdDec
            },
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                utils.unLoading();
                utils.ShowOverLay();
				$("BODY").append('<div id="popupwrap" style="z-index: 111;left: 50%;top: 50%; position: fixed; transform: translate(-50%, -50%);overflow-y: auto;     max-height: 90%; width: 85%"></div>');
                $("#popupwrap").html(data);

            },
            error: function (data) {
                utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");

            }
        });
    },

    //Tờ khai giá trị thấp
    InsertLowDeclarationLow: function () {
        var token = $('#hdfToken').val();

        var dc1 = $("#txtaddress1Street").val();
        var dc2 = $("#txtaddress2Street").val();
        var dc3 = $("#txtaddress3CityNm").val();
        var dc4 = $("#txtcountryNmAddress").val();

        if (dc1 == "" && dc2 == "" && dc3 == "" && dc4 == "") {
            utils.Message("Địa chỉ bắt buộc phải nhập ít nhất 1 ô");
            return;
        }

        if ($("#slfreightDemarCd").val() != "" && $("#slfreightCurCd").val() != "" && $("#txtfreight").val() == "") {
            utils.Message("Bạn chưa điền phí vận chuyển");
            return;
        }

        if ($("#slinsDemarCd").val() != "" && $("#slinsCurCd").val() != "" && $("#txtinsAmt").val() == "") {
            utils.Message("Bạn chưa điền phí bảo hiểm");
            return;
        }

        utils.Loading();

        $.ajax({
            url: Config.API_Login + "tax/InsertDeclaration",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("InsertLowDeclarationLow: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data.Declarations != undefined && data.Data.Declarations != null) {
                        utils.Message("Tạo tờ khai thành công");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/LowValueDeInsert?IdDec=" + data.Data.Declarations.dclId + "&ishight=1";
                        }, 1500);

                    }
                }
                else {
                    utils.Message(data.Description);
                }
            },
            error: function (data) {
                utils.Message("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    UpdateLowDeclaration: function (isMIE) {
        var token = $('#hdfToken').val();

        var dc1 = $("#txtaddress1Street").val();
        var dc2 = $("#txtaddress2Street").val();
        var dc3 = $("#txtaddress3CityNm").val();
        var dc4 = $("#txtcountryNmAddress").val();

        if (dc1 == "" && dc2 == "" && dc3 == "" && dc4 == "") {
            utils.Message("Địa chỉ bắt buộc phải nhập ít nhất 1 ô");
            return;
        }

        if ($("#slfreightDemarCd").val() != "" && $("#slfreightCurCd").val() != "" && $("#txtfreight").val() == "") {
            utils.Message("Bạn chưa điền phí vận chuyển");
            return;
        }

        if ($("#slinsDemarCd").val() != "" && $("#slinsCurCd").val() != "" && $("#txtinsAmt").val() == "") {
            utils.Message("Bạn chưa điền phí bảo hiểm");
            return;
        }

        utils.Loading();

        $.ajax({
            url: Config.API_Login + "tax/UpdateDeclaration",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                utils.unLoading();
                console.log("UpdateLowDeclaration: ", data);

                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data.Declarations != undefined && data.Data.Declarations != null) {
                        utils.Message("Tạo tờ khai thành công");
                        setTimeout(function () {
                            window.location.href = Config.Url_Root + "Declaration/LowValueDeInsert?IdDec=" + data.Data.Declarations.dclId + "&ishight=1";
                        }, 1500);
                    }
                }
                else {
                    utils.Message(data.Description);
                }

            },
            error: function (data) {
                utils.unLoading();
                utils.Message("Hệ thống bận, vui lòng quay lại sau!");
            }
        });
    },

    GetDetailLowDeclartion: function (IdDe) {
        utils.Loading();
        var token = $('#hdfToken').val();

        setTimeout(function () {

            $.ajax({
                type: 'GET',
                url: Config.API_Login + "tax/GetDeclarationDetail",
                data: {
                    DeclarationID: IdDe
                },
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    console.log("detail: ", data);
                    utils.unLoading();
                    if (data.ResponseCode > 0 && data.Data != null) {
                        var t = data.Data;
                        //thông tin chung
                        $('#slclsOrg').val(t.clsOrg);
                        if (t.CustomsOffices != undefined && t.CustomsOffices != null && t.CustomsOffices.length > 0) {
                            $('#txtcstOfficeNm').val(t.CustomsOffices[0].cstOfficeNm);
                            $('#txtcstOffice,#hdfcstOffice').val(t.CustomsOffices[0].cstOfficeCd);
                        }
                        $('#slcstSubSection').val(t.cstSubSection);

                        //người nhập khẩu
                        $('#txtimperCd').val(t.imperCd);
                        $('#txtimperNm').val(t.imperNm);
                        $('#txtpostcode').val(t.postcode);
                        $('#txtphoneNoOfImp').val(t.phoneNoOfImp);
                        $('#txtaddressOfImp').val(t.addressOfImp);

                        //người xuất khẩu
                        $('#txtconsignorCd').val(t.consignorCd);
                        $('#txtconsignorNm').val(t.consignorNm);
                        $('#txtpostcodeIdt').val(t.postcodeIdt);
                        $("#txthdfcountryCd, #hdfcountryCd").val(t.countryCd);
                        $("#txtaddress1Street").val(t.address1Street);
                        $("#txtaddress2Street").val(t.address2Street);
                        $("#txtaddress3CityNm").val(t.address3CityNm);
                        $("#txtcountryNmAddress").val(t.countryNm);

                        $('#txthouseAwbNo').val(t.houseAwbNo);
                        $('#txtmasterAwbNo').val(t.masterAwbNo);
                        $('#txtcargoPiece').val(t.cargoPiece);
                        $('#txtcargoWeigGrs').val(t.cargoWeigGrs);
                        $('#hdfweigUnitCdGrs').val(t.weigUnitCdGrs);
                        $('#hdfcstWrhCd,#txtcstWrhCd').val(t.cstWrhCd);
                        if (t.CustomsWarehouses != null && t.CustomsWarehouses.length > 0) {
                            $('#txtcstWrhCd_text').val(t.CustomsWarehouses[0].cstWrhNm);
                        }
                        $('#txtarrDate').val(t.arrDate);
                        $('#txtflightNo').val(t.flightNo);
                        if (t.LoadingLocations != undefined && t.LoadingLocations != "" && t.LoadingLocations != null && t.LoadingLocations.length > 0) {
                            $('#hdfloadLocCd,#txtloadLocCd').val(t.LoadingLocations[0].loadLocCd);
                            $('#txtloadLocNm').val(t.LoadingLocations[0].loadLocNm);
                        }

                        if (t.UnloadingPorts != undefined && t.UnloadingPorts != "" && t.UnloadingPorts != null && t.UnloadingPorts.length > 0) {
                            var unloadPordCd = t.UnloadingPorts[0].unloadPortCd;
                            if (unloadPordCd.length > 3) unloadPordCd = unloadPordCd.substring(unloadPordCd.length - 3, unloadPordCd.length);

                            $('#hdfunloadPortCd,#txtunloadPortCd').val(unloadPordCd);
                            $("#txtunloadPortNm").val(t.UnloadingPorts[0].unloadPortNm);
                        }
                        else {
                            var unloadPordCd = t.unloadPortCd;
                            if (unloadPordCd.length > 3) unloadPordCd = unloadPordCd.substring(unloadPordCd.length - 3, unloadPordCd.length);
                            $('#hdfunloadPortCd,#txtunloadPortCd').val(t.unloadPortCd);
                            $("#txtunloadPortNm").val(t.unloadPortNm);
                        }

                        $('#slinvPrcCdtCd').val(t.invPrcCdtCd);
                        $('#slinvCurCd').val(t.invCurCd);
                        $('#slinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txttotalInvPrc').val(t.totalInvPrc);

                        $('#slfreightDemarCd').val(t.freightDemarCd);
                        $('#slfreightCurCd').val(t.freightCurCd);
                        $('#txtfreight').val(t.freight);
                        $('#slinsDemarCd').val(t.insDemarCd);
                        $('#slinsCurCd').val(t.insCurCd);
                        $('#txtinsAmt').val(t.insAmt);
                        $('#txtitemName').val(t.itemName);

                        if (t.Countrys != null && t.Countrys.length > 0) {
                            for (var i = 0; i < t.Countrys.length; i++) {
                                if (t.Countrys[i].countryCode == t.placeOriginCd) {
                                    $('#txtcountryNm').val(t.Countrys[i].countryName);
                                    break;
                                }
                            }
                        }
                        $('#txtplaceOriginCd, #placeOriginCd').val(t.placeOriginCd);

                        if (t.listProducts != undefined && t.listProducts.length > 0) {
                            $('#txtcstValue').val(t.listProducts[0].cstValue);
                        }
                        else {
                            $('#txtcstValue').val(t.cstValue);
                        }
                        $('#txtnotes').val(t.notes);
                        $('#txteiControlNo').val(t.eiControlNo);
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    utils.unLoading();
                    return;
                }
            });

        }, 1500);
    },

    //======================

    //chi cục hải quan
    getListCustom: function (cstOfficeCd) {
        var token = $('#hdfToken').val();
        if (cstOfficeCd == undefined || cstOfficeCd == null) cstOfficeCd = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsOffice",
            data: {
                cstOfficeCd: cstOfficeCd,
                cstOfficeNm: "",
                cstOfficeCdOld: "",
                cstOfficeNmOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("getListCustom: ", data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<option value="' + item.cstOfficeCd + '">' + item.cstOfficeNm + '</option>';
                    }
                }
                if (cstOfficeCd == undefined || cstOfficeCd == null || cstOfficeCd == "") {
                    //$("#customSearch").append(html);
                    $("#customChild").append(html);
                }

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    getCustomBranch: function (customsCode) {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustoms",
            data: {
                customsId: "",
                province: "",
                customsName: "",
                customsCode: customsCode,
                ctsNameOld: "",
                ctsCodeOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                //if (data.ResponseCode > 0) {
                //    if (data.Data.length > 0)
                //        $('#txtcstOfficeNm').val(data.Data[0].customsName);
                //}
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Nhóm loại hình
    getGroupType: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetGroupType",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("getGroupType: ", data);
                //grTypeSearch
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<option value="' + item.groupTypeCode + '">' + item.groupTypeName + '</option>';
                    }
                }
                $("#grTypeSearch").append(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Đối tượng
    getOrganizationType: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetClassificationOrganization",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("getOrganizationType: ", data);

                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<option value="' + item.clsOrgCd + '">' + item.clsOrgCd + ' || ' + item.clsOrgNm + '</option>';
                    }
                }
                $("#slclsOrgSearch").append(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    NextTabDecla: function (t) {
        utils.Loading();

        setTimeout(function () {
            if (t == 1) {
                $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                $('#btnTab1').removeClass("btn-success").addClass("btn-warning");
                $('#divTab1').removeClass("noneTab");
                $('#divTab2').addClass("noneTab");

                $('body,html').animate({ scrollTop: 0 }, 800);
            }
            else {
                // $('#btnSaveDeclaration').click();
                var count = 0;
                $('#divTab1 label.error').each(function () {
                    if ($(this).is(':visible')) { count += 1; }
                })

                console.log(count);
                if (count == 0) {

                    var tenXuatKhau = $("#txtconsignorNm").val();
                    if (utils.CheckVietNamese(tenXuatKhau)) {
                        utils.Message("Tên người xuất khẩu phải là kí tự hoa không dấu");
                        utils.unLoading();
                        $('body,html').animate({ scrollTop: 1200 }, 800);
                        return;
                    }

                    if (!Decla.checkAdress()) {
                        utils.Message("Địa chỉ người xuất khẩu phải nhập ít nhất 1 ô và là ký tự hoa không dấu");
                        utils.unLoading();
                        $('body,html').animate({ scrollTop: 1300 }, 800);
                        return;
                    }


                    $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                    $('#btnTab2').removeClass("btn-success").addClass("btn-warning");
                    $('#divTab2').removeClass("noneTab");
                    $('#divTab1').addClass("noneTab");
                    setTimeout(function () {
                        $('body,html').animate({ scrollTop: 0 }, 800);
                    }, 500);
                }
            }
            utils.unLoading();
        }, 200);
    },

    nextPage: function () {
        utils.Loading();
        setTimeout(function () {
            $('#btnNextPage').click();
            var count = 0;
            $('#divTab1 label.error').each(function () {
                if ($(this).is(':visible')) { count += 1; }
            })
            if (count == 0) {

                var tenXuatKhau = $("#txtconsignorNm").val();
                if (utils.CheckVietNamese(tenXuatKhau)) {
                    utils.Message("Tên người xuất khẩu phải là kí tự hoa không dấu");
                    utils.unLoading();
                    $('body,html').animate({ scrollTop: 1200 }, 800);
                    return;
                }

                if (!Decla.checkAdress()) {
                    utils.Message("Địa chỉ người xuất khẩu phải nhập ít nhất 1 ô và là ký tự hoa không dấu");
                    utils.unLoading();
                    $('body,html').animate({ scrollTop: 1300 }, 800);
                    return;
                }

                $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                $('#btnTab2').removeClass("btn-success").addClass("btn-warning");
                $('#divTab2').removeClass("noneTab");
                $('#divTab1').addClass("noneTab");
                setTimeout(function () {
                    $('body,html').animate({ scrollTop: 0 }, 800);
                }, 500);
            }
            utils.unLoading();
        }, 500);
    },

    //=======================
    checkAdress: function () {
        var dc_1 = $("#txtaddress1Street").val();
        var dc_2 = $("#txtaddress2Street").val();
        var dc_3 = $("#txtaddress3CityNm").val();
        var dc_4 = $("#txtcountryNmAddress").val();
        if (dc_1 == "" && dc_2 == "" && dc_3 == "" && dc_4 == "") {
            return false;
        }

        if (dc_1 != "" && dc_1 != null) {
            if (utils.CheckVietNamese(dc_1)) {
                return false;
            }
        }

        if (dc_2 != "" && dc_2 != null) {
            if (utils.CheckVietNamese(dc_2)) {
                return false;
            }
        }

        if (dc_3 != "" && dc_3 != null) {
            if (utils.CheckVietNamese(dc_3)) {
                return false;
            }
        }

        if (dc_4 != "" && dc_4 != null) {
            if (utils.CheckVietNamese(dc_4)) {
                return false;
            }
        }

        return true;
    },

    //mã nghiệp vụ
    getNameStatusCode: function (code) {
        if (code == undefined || code == null)
            return "";
        var str = '';
        switch (code) {
            case -1:
                str = "Đã hủy";
                break;
            case 1:
                str = "Đang thêm mới";
                break;
            case 2:
                str = "Đã gửi IDA";
                break;
            case 3:
                str = "Đã gửi IDB";
                break;
            case 4:
                str = "Đã gửi IDC";
                break;
            case 5:
                str = "Đã gửi IDA01";
                break;
            case 6:
                str = "Đã gửi IDD";
                break;
            case 7:
                str = "Đã gửi IDE";
                break;
            case 8:
                str = "Đã gửi MIC";
                break;
            case 9:
                str = "Đã gửi MID";
                break;
            case 10:
                str = "Đã gửi MIE";
                break;
            case 11:
                str = "Đã gửi EDA";
                break;
            case 12:
                str = "Đã gửi EDB";
                break;
            case 13:
                str = "Đã gửi EDC";
                break;
            case 14:
                str = "Đã gửi EDA01";
                break;
            case 15:
                str = "Đã gửi EDD";
                break;
            case 16:
                str = "Đã gửi EDE";
                break;
            case 17:
                str = "Đã gửi MEC";
                break;
            case 18:
                str = "Đã gửi MED";
                break;
            case 19:
                str = "Đã gửi MEE";
                break;
            case 20:
                str = "Đã gửi IEX";
                break;
            case 21:
                str = "Đã gửi GET_SIGNATURE	";
                break;
            case 22:
                str = "Đã gửi IID";
                break;
            default:
                str = "";
                break;
        }
        return str;

    },
    //loại hình
    getMaLH: function (code) {
        if (code == undefined || code == null)
            return "";
        var str = '';
        switch (code) {
            case 1:
                str = "Kinh doanh đầu tư";
                break;
            case 2:
                str = "Sản xuất, xuất khẩu";
                break;
            case 3:
                str = "Gia công";
                break;
            case 4:
                str = "Chế xuất";
                break;
            default:
                str = "";
                break;
        }
        return str;
    },
    //phân luồng
    getPhanLuong: function (code) {
        if (code == undefined || code == null)
            return "";
        var str = '';
        switch (code) {
            case 1:
                str = "Luồng Xanh";
                break;
            case 2:
                str = "Luồng Đỏ";
                break;
            case 3:
                str = "Luồng Vàng";
                break;
            default:
                str = "";
                break;
        }
        return str;
    },

    //thông quan
    getThongQuan: function (code) {
        if (code == undefined || code == null)
            return "";
        var str = '';
        switch (code) {
            case -1:
                str = "Chưa thông quan";
                break;
            case 1:
                str = "Thông quan";
                break;
            case 2:
                str = "Đợi thông quan";
                break;
            default:
                str = "";
                break;
        }
        return str;
    },

    ConvertVietNamese: function (str) {
        if (str == undefined || str == null || str == "") {
            return "";
        }

        str = str.toUpperCase();

        str = str.replace('Á', 'A');
        str = str.replace('À', 'A');
        str = str.replace('Ạ', 'A');
        str = str.replace('Ả', 'A');
        str = str.replace('Ã', 'A');

        str = str.replace('Â', 'A');
        str = str.replace('Ấ', 'A');
        str = str.replace('Ầ', 'A');
        str = str.replace('Ẫ', 'A');
        str = str.replace('Ẩ', 'A');
        str = str.replace('Ậ', 'A');

        str = str.replace('Ă', 'A');
        str = str.replace('Ắ', 'A');
        str = str.replace('Ằ', 'A');
        str = str.replace('Ẵ', 'A');
        str = str.replace('Ẳ', 'A');
        str = str.replace('Ặ', 'A');

        str = str.replace('Đ', 'D');

        str = str.replace('È', 'E');
        str = str.replace('È', 'E');
        str = str.replace('Ẻ', 'E');
        str = str.replace('Ẹ', 'E');
        str = str.replace('Ẽ', 'E');

        str = str.replace('Ê', 'E');
        str = str.replace('Ề', 'E');
        str = str.replace('Ế', 'E');
        str = str.replace('Ể', 'E');
        str = str.replace('Ệ', 'E');
        str = str.replace('Ễ', 'E');

        str = str.replace('Í', 'I');
        str = str.replace('Ì', 'I');
        str = str.replace('Ị', 'I');
        str = str.replace('Ỉ', 'I');
        str = str.replace('Ĩ', 'I');

        str = str.replace('Ó', 'O');
        str = str.replace('Ò', 'O');
        str = str.replace('Ọ', 'O');
        str = str.replace('Ỏ', 'O');
        str = str.replace('Õ', 'O');

        str = str.replace('Ô', 'O');
        str = str.replace('Ố', 'O');
        str = str.replace('Ồ', 'O');
        str = str.replace('Ộ', 'O');
        str = str.replace('Ỗ', 'O');
        str = str.replace('Ổ', 'O');

        str = str.replace('Ơ', 'O');
        str = str.replace('Ớ', 'O');
        str = str.replace('Ờ', 'O');
        str = str.replace('Ợ', 'O');
        str = str.replace('Ỡ', 'O');
        str = str.replace('Ỏ', 'O');

        str = str.replace('Ù', 'U');
        str = str.replace('Ù', 'U');
        str = str.replace('Ụ', 'U');
        str = str.replace('Ủ', 'U');
        str = str.replace('Ũ', 'U');

        str = str.replace('Ư', 'U');
        str = str.replace('Ứ', 'U');
        str = str.replace('Ừ', 'U');
        str = str.replace('Ự', 'U');
        str = str.replace('Ủ', 'U');
        str = str.replace('Ữ', 'U');

        str = str.replace('Ý', 'Y');
        str = str.replace('Ỳ', 'Y');
        str = str.replace('Ỵ', 'Y');
        str = str.replace('Ỷ', 'Y');
        str = str.replace('Ỹ', 'Y');

        return str;
    }
};

window.Img = {
    getBase64: function (idImg, idBase, idUrlImg) {
        var file = document.querySelector('#' + idImg).files[0];

        if (file == undefined) {
            $("#" + idBase).val("");
            return;
		}
		if (file.type != 'image/jpeg' && file.type != 'image/png' && file.type != 'image/gif') {
			bootbox.alert("File bạn tải lên không phải là file ảnh");
			$("#" + idImg).val("");
			return;
		}

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            //console.log(reader.result);
            $("#" + idBase).val(reader.result);

            Customer.SaveImg(idImg, idBase, idUrlImg);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            return "";
        };
    },

    //check file anh > 1M
    CheckSizeImg: function (imgId) {
        var fileImg = document.querySelector('#' + imgId).files[0];

        if (fileImg != undefined) {
            var sizeFile = fileImg.size / 1024 / 1024;
            if (sizeFile > 3) {
                return true;
            }
        }
        return false;
    },
};

window.Err = {

    showError: function (jobCode, errorCode, isFocus) {
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
				if (isFocus !== undefined && isFocus == 1 && $("." + errorCode)[0]) {
                    var scrH = $("." + errorCode).offset().top;
                    $('body,html').animate({ scrollTop: scrH }, 800);

                    $("." + errorCode).addClass("error");
                    setTimeout(function () {
                        $("." + errorCode).removeClass("error");
                    }, 5000);
                }
            },
            error: function (data) {
                console.log(data);
            }
        });
    },
};

window.IHY = {
    ViewIHY: function (id, attNo) {
        bootbox.prompt("Mời bạn nhập số tờ khai đính kèm điện tử", function (res) {
            if (res) {
                window.location.href = Config.Url_Root + "HYS/ViewIHY?attNo=" + attNo + "&ishight=5&tab=3";
            }
        });
    },
}