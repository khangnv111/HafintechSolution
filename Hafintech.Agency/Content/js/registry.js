
window.TK = {

    PopApplyAcc: function (id) {
        utils.Loading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Registry/PopApplyAcc",
            data: {
                id: id
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();

                $("BODY").append('<div id="popupwrap" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 113">' + data + '</div>');
                utils.ShowOverLay();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    PopSetRights: function () {
        utils.Loading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "User/PopSetupRights",
            data: {
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();

                $("BODY").append('<div id="popupwrap" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 113">' + data + '</div>');
                utils.ShowOverLay();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    PopCreateGroup: function () {
        utils.Loading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "User/CreateGroup",
            data: {
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();

                $("BODY").append('<div id="popupwrap" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 113">' + data + '</div>');
                utils.ShowOverLay();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    GetListDeclaration: function () {

    },

    //Chữ ký số
    PopCKS: function () {
        utils.Loading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Registry/CreateRegNumber",
            data: {
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();

                $("BODY").append('<div id="popupwrap" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 113">' + data + '</div>');
                utils.ShowOverLay();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    InsertRegNumber: function () {
        var numberCert = $("#numberCert").val();
        if (numberCert == undefined) numberCert = "";

        var accountId = $("#accIdLogin").val();

        var signatureId = $("#signatureIdVnacc").val();
        if (signatureId == undefined) signatureId = null;

        var userId = $("#userId").val();
        var password = $("#passwordTKS").val();
        //password = MD5(password);

        var terminalId = $("#terminalId").val();
        var accessKey = $("#accessKey").val();

        var authorityCert = $("#authorityCert").val();
        if (authorityCert == undefined) authorityCert = "";

        var subjectAuthen = $("#subjectAuthen").val();
        if (subjectAuthen == undefined) subjectAuthen = "";

        var cusUrl = $("#cusUrl").val();
        if (cusUrl == undefined) cusUrl = "";
      
        var signMethod = $("#submitMethod").val();
        if (!signMethod) {
            bootbox.alert("Bạn chưa chọn loại chữ ký số");
            return;
        } 

        var jsonData = { "numberCert": numberCert, "authorityCert": authorityCert, "subjectAuthen": subjectAuthen, "cusUrl": cusUrl, "terminalId": terminalId, "userId": userId, "password": password, "accessKey": accessKey, "signatureId": signatureId, "accountId": accountId, "status": 1};

        var fileUpload = $("#fileAttach").get(0);
        var files = fileUpload.files;
        if (files.length != 0) {
            var size = parseFloat(fileUpload.files[0].size / 1024).toFixed(2);

            if (size > 5000) {
                bootbox.alert("Dung lượng file up lên không được quá 5M");
                return;
            }

            if (files[0].type != "application/x-pkcs12") {
                bootbox.alert("File chữ ký phải có đuôi là .p12");
                return;
            }
        }
        var formData = new FormData();

        for (var i = 0; i < files.length; i++) {
            formData.append(files[i].name, files[i]);
        }
        formData.append("jsonData", JSON.stringify(jsonData));

        var token = $('#hdfToken').val();
        utils.Loading();
        TK.SetSignMethod();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/CreateSignature",
            data: formData,
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                console.log("InsertRegNumber: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data != "") {
                        bootbox.alert("Thành công", function () {
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

    SetSignMethod: function () {
        var token = $('#hdfToken').val();
        var submitMethod = $("#submitMethod").val();
        if (!submitMethod) {
            bootbox.alert("Bạn chưa chọn loại chữ ký số");
            return;
        }
        var businessId = utils.getCookie("businessIdAcc");

        utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "Agency/SetSubmitMethod",
            data: {
                businessId: businessId,
                submitMethod: submitMethod,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("submitMethod: ", data);
                utils.unLoading();
            },
            error: function (data) {
                utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

	GetListSinature: function () {

		var accountId = $('#accIdLogin').val();
        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            type: 'POST',
			url: Config.API_Login + "Agency/GetSignature?accountId=" + accountId,
			data: { 
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("GetListSinature: ", data);
                utils.unLoading();
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>'
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.taxIdNumber + '</td>';
                        html += '<td>' + item.businessName + '</td>';
                        if (item.status == 1) {
                            html += '<td style="text-align: center"><a href="javascript:;" onclick="TK.SetDefaultSig(' + item.signatureId + ')"><i class="fa fa-check-square" aria-hidden="true"></i></a></td>';
                        }
                        else {
                            html += '<td style="text-align: center"><a href="javascript:;" onclick="TK.SetDefaultSig(' + item.signatureId + ')"><i class="fa fa-square-o" aria-hidden="true"></i></a></td>';
                        }
                        html += '</tr>';


                    }

                }

                $(".content-search-table").html(html);


            },
            error: function (data) {
                utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    UpdateSignatur: function (signatureId, status) {
        var accountId = $("#accIdLogin").val();

        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/UpdateSignature",
            data: {
                accountId: accountId,
                signatureId: signatureId,
                status: status
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            //cache: false,
            //contentType: false,
            //processData: false,
            success: function (data) {
                console.log("InsertRegNumber: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data != "") {
                        bootbox.alert("Thành công", function () {
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

    SetDefaultSig: function (signatureId) {
        //var accountId = $("#accIdLogin").val();

        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/SetDefaultSignature",
            data: {
                signatureId: signatureId,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            //cache: false,
            //contentType: false,
            //processData: false,
            success: function (data) {
                //console.log("SetDefaultSignature: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data != "") {
                        bootbox.alert("Thành công", function () {
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
};

window.Vnacc = {
    UpdateVnacc: function () {
        var token = $('#hdfToken').val();

        var businessId = utils.getCookie("businessIdAcc");

        var cusCode = $("#txtcstOffice").val();
        var cusCodeImport = $("#cusCodeImport").val();
        var cusCodeExport = $("#cusCodeExport").val();

        utils.Loading();
        $.ajax({
            type: 'POST',
			url: Config.API_Login + "Agency/updateBusinessVNACCS",
            data: JSON.stringify({
                businessId: businessId,
                cusCode: cusCode,
                cusCodeImport: cusCodeImport,
                cusCodeExport: cusCodeExport
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
                        bootbox.alert("Thành công", function () {
                            location.reload();
                        });
                    }
                }
                else {
                    bootbox.alert(data.Description);
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

	GetInfoSignalture: function () {
		var accountId = utils.getCookie("accountIdBuss");

		var token = $('#hdfToken').val();  
        utils.Loading();
        $.ajax({
            type: 'POST',
			url: Config.API_Login + "Agency/GetSignature?accountId=" + accountId,
			data: { 
            },
            headers: {
                "Authorization": "Bearer " + token
            },
			//contentType: false,//"application/json; charset=utf-8",
			//dataType: false,//"json",
            success: function (data) {
                //console.log("GetListSinature: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0 && data.Data && data.Data.length > 0) {
                    var item = data.Data[0];
                    $("#cusUrl").val(item.cusUrl);
                    $("#userId").val(item.userId);
                    $("#passwordTKS").val(item.password);
                    $("#terminalId").val(item.terminalId);
                    $("#accessKey").val(item.accessKey);
                    $("#signatureIdVnacc").val(item.signatureId);
                    $("#nameFileAttach").html(item.path);
                }

            },
            error: function (data) {
                utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    UpdateSignature: function () {
        var accountId = $("#accIdLogin").val();
        var signatureId = $("#signatureIdVnacc").val();

        var cusUrl = $("#cusUrl").val();
        var userId = $("#userId").val();
        var password = $("#passwordTKS").val();
        var terminalId = $("#terminalId").val();
        var accessKey = $("#accessKey").val();

        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/UpdateSignature",
            data: {
                accountId: accountId,
                signatureId: signatureId,
                status: 1,
                cusUrl: cusUrl,
                userId: userId,
                password: password,
                terminalId: terminalId,
                accessKey: accessKey,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            //cache: false,
            //contentType: false,
            //processData: false,
            success: function (data) {
                console.log("InsertRegNumber: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    if (data.Data != null && data.Data != "") {
                        bootbox.alert("Thành công", function () {
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
};