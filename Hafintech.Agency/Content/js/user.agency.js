
window.UserAgen = {
    GetListUser: function (select) {

        var phoneNumber = $("#phone").val();
        var permitGroup = $("#roleUser").val();
        var email = $("#email").val();
        var status = $("#status").val();
        var datepickerFromD = $("#datepickerFromD").val();
        var datepickerToD = $("#datepickerToD").val();

        //var parentId = $("#accIdLogin").val();
        var parentId;
        if (utils.getCookie("Type") == 1) {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }

        var token = $('#hdfToken').val();

        //utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/SearchPersonal",
            data: JSON.stringify({
                personalId: 0,
                type: 1,
                phoneNumber: phoneNumber,
                permitGroup: permitGroup,
                email: email,
                status: status,
                startCreatedDate: datepickerFromD,
                endCreatedDate: datepickerToD,

                parentId: parentId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchListPersonal: ", data);
                //utils.unLoading();
                if (select) {
                    if (data.ResponseCode > 0 && data.Data) {
                        var html = '';
                        for (var i = 0; i < data.Data.length; i++) {
                            var item = data.Data[i];
                            html += '<option value="' + item.personalId + '">' + item.name + '</option>';
                        }
                        $("#createdAccId").append(html);
                    }
                }
                else
                {
                    var html = '';
                    if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                        for (var i = 0; i < data.Data.length; i++) {
                            var item = data.Data[i];
                            html += '<tr>'
                            html += '<td>' + (i + 1) + '</td>';
                            html += '<td>' + item.personalId + '</td>';
                            html += '<td>' + item.name + '</td>';
                            html += '<td>' + item.email + '</td>';
                            html += '<td>' + (item.phoneNumber == undefined ? "" : item.phoneNumber) + '</td>';
                            html += '<td>' + item.permitGroup + '</td>';
                            html += '<td></td>';
                            html += '<td>' + item.status + '</td>';

                            html += '<td><a href="javascript:;" onclick="UserAgen.ViewUpdate(' + item.personalId + ')" class="btn btn-warning">Sửa</a>';
                            html += '<a href="javascript:;" onclick="UserAgen.DeleteUser(' + item.personalId + ')" class="btn btn-danger">Xóa</a></td>';
                            html += '</tr>';


                        }

                    }

                    $(".list-content-table").html(html);
                }

            },
            error: function (data) {
                //utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    PopCreateUser: function (id) {
        utils.Loading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "User/CreateUser",
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

    InsertUser: function () {
        var name = $("#fullname").val();
        if (!name) { 
            $("#LogError").html("Bạn chưa nhập họ tên người dùng");
            $("#LogError").show();
            return;
        }

        var email = $("#emailuser").val();
        if (!email) { 
            $("#LogError").html("Bạn chưa nhập email người dùng");
            $("#LogError").show();
            return;
        }

        var phoneNumber = $("#phoneuser").val();

        var password = $("#passworduser").val();
        if (!password) {
            
            $("#LogError").html("Bạn chưa nhập mật khẩu người dùng");
            $("#LogError").show();
            return;
        }

        var RePassword = $("#rePassUser").val();
        if (!RePassword) { 
            $("#LogError").html("Bạn chưa nhập lại mật khẩu người dùng");
            $("#LogError").show();
            return;
        }

        if (password != RePassword) {
            
            $("#LogError").html("Mật khẩu nhập lại không đúng");
            $("#LogError").show();
            return;
        }
        password = MD5(password);

        var role1 = $("#roleId1:checked").val();
        var role2 = $("#roleId2:checked").val();
        var role3 = $("#roleId3:checked").val();
        if (!role1 && !role2 && !role3) { 
            $("#LogError").html("Bạn chưa chọn nhóm quyền");
            $("#LogError").show();
            return;
        }
        var permitGroup = 0;
        if (role1) {
            permitGroup = 1;
        }
        else if (role2 && !role3) {
            permitGroup = 2;
        }
        else if (!role2 && role3) {
            permitGroup = 3;
        }
        else if (role2 && role3) {
            permitGroup = 4;
        }

        var type = 1;

        var token = $('#hdfToken').val();
        var parentId = $("#accIdLogin").val();
        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/CreateEmployee",
            data: JSON.stringify({
                name: name,
                email: email,
                phoneNumber: phoneNumber, 
                password: password,
                type: type,
                permitGroup: permitGroup,

                parentId: parentId, 
                
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
    },

    ViewUpdate: function (personalId) {

        UserAgen.PopCreateUser(personalId);

        var token = $('#hdfToken').val();

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
                            $("#fullname").val(item.name);
                            $("#emailuser").val(item.email);
                            $("#phoneuser").val(item.phoneNumber);
                            //$("#password").val(item.phoneNumber);
                            if (item.permitGroup == 4) {
                                $("#roleId3").prop("checked", true);
                                $("#roleId2").prop("checked", true);
                            }
                            else {
                                $("#roleId" + item.permitGroup).prop("checked", true);
                            }
                        }
                    }

                },
                error: function (data) {
                    utils.unLoading();
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }, 500);
    },

    UpdateUser: function (personalId) {

        var name = $("#fullname").val();
        if (!name) {
            $("#LogError").html("Bạn chưa nhập họ tên người dùng");
            $("#LogError").show();
            return;
        }

        var email = $("#emailuser").val();
        if (!email) {
            $("#LogError").html("Bạn chưa nhập email người dùng");
            $("#LogError").show();
            return;
        }

        var phoneNumber = $("#phoneuser").val();

        var password = $("#passworduser").val();
        if (!password) {

            $("#LogError").html("Bạn chưa nhập mật khẩu người dùng");
            $("#LogError").show();
            return;
        }

        var RePassword = $("#rePassUser").val();
        if (!RePassword) {
            $("#LogError").html("Bạn chưa nhập lại mật khẩu người dùng");
            $("#LogError").show();
            return;
        }

        if (password != RePassword) {

            $("#LogError").html("Mật khẩu nhập lại không đúng");
            $("#LogError").show();
            return;
        }

        var role1 = $("#roleId1:checked").val();
        var role2 = $("#roleId2:checked").val();
        var role3 = $("#roleId3:checked").val();
        if (!role1 && !role2 && !role3) {
            $("#LogError").html("Bạn chưa chọn nhóm quyền");
            $("#LogError").show();
            return;
        }
        var permitGroup = 0;
        if (role1) {
            permitGroup = 1;
        }
        else if (role2 && !role3) {
            permitGroup = 2;
        }
        else if (!role2 && role3) {
            permitGroup = 3;
        }
        else if (role2 && role3) {
            permitGroup = 4;
        }

        var type = 1;

        var token = $('#hdfToken').val();
        var parentId = $("#accIdLogin").val();
       
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/UpdateEmployee",
            data: JSON.stringify({
                personalId: personalId,
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                type: type,
                permitGroup: permitGroup,

                parentId: parentId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("UpdatePersonal: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0) {
                    bootbox.alert("Thành công", function () {
                        location.reload();
                    });
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

    },

    //Mã bảo mật
    PopSecurity: function () {
        utils.Loading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "User/SetSecurityKey",
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

    SetSecurityCode: function () {
        var accIdLogin = $("#accIdLogin").val();
        var securityCode = $("#securityCode").val();
        if (!securityCode) {
            bootbox.alert("Bạn chưa nhập mã bảo mật");
            return;
        }

        var token = $('#hdfToken').val(); 
        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/Security",
            data: JSON.stringify({
                personalId: accIdLogin,
                securityCode: securityCode,

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
    },

    DeleteUser: function (personalId) {
        utils.Loading();
        var token = $('#hdfToken').val();
        var parentId = $("#accIdLogin").val();

        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/DeleteEmployee",
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
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //danh sách tk đc trình ký
    GetListAccTK: function () {

        var acc = $("#acc").val();
        var status = $("#statusReg").val();

        var parentId = $("#accIdLogin").val();
        var token = $('#hdfToken').val();

        //utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/SearchPersonal",
            data: JSON.stringify({
                personalId: 0,
                type: 1,
                email: acc,
                permitGroup: 2,
                status: status,

                parentId: parentId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchListPersonal: ", data);
                //utils.unLoading();
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>'
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.email + '</td>';
                        html += '<td></td>';
                        html += '<td>' + item.status + '</td>';
                        html += '<td></td>';

                        html += '<td><a href="javascript:;" onclick="UserAgen.ViewUpdate(' + item.personalId + ')" class="btn btn-warning">Sửa</a>';
                        html += '<a href="javascript:;" onclick="UserAgen.DeleteUser(' + item.personalId + ')" class="btn btn-danger">Xóa</a></td>';
                        html += '</tr>';


                    }

                }

                $(".content-search-table").html(html);


            },
            error: function (data) {
                //utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    CheckAccTK: function () {

        var acc = $("#accName").val();

        var parentId = $("#accIdLogin").val();
        var token = $('#hdfToken').val();

        utils.Loading();
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Agency/SearchPersonal",
            data: JSON.stringify({
                email: acc,

                parentId: parentId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchListPersonal: ", data);
                utils.unLoading();
                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {
                    var item = data.Data[0];
                    $("#fullname").val(item.name);
                    //$("#company").val(item.name);
                    $("#statusAcc").val(item.status);

                }


            },
            error: function (data) {
                utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },
}

window.Obj = {
    ShowPop: function (hight, callback) {
        utils.Loading();

        $.ajax({
            type: "GET",
            url: Config.Url_Root + "Declaration/SelectObjecDeclared",
            data: {
            },
            success: function (data) {
                utils.unLoading();
                utils.ShowOverLay();

                var html = '<div id=\"PopupInsert\" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 15">' + data + '</div>';
                $("BODY").append(html);

                $("#isHightDe").val(hight);

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            }
        });
    },

    SelectTab: function(){
        var tab = $("input[name=selectObject]:checked").val();
        if (tab == "1") {
            //$("#title-code-search-pop").html("Số CMT");
            //$("#actSearchObject").attr("onclick", "Obj.SearchPersonal()");
            Obj.SearchPersonal();
        }
        else {
            $("#title-code-search-pop").html("Mã số thuế");
            $("#actSearchObject").attr("onclick", "Obj.SearchBusiness()");
            Obj.SearchBusiness();
        }
    },

    SearchPersonal: function () {
        $("#title-code-search-pop").html("Số CMT");
        $("#actSearchObject").attr("onclick", "Obj.SearchPersonal()");

        var identity = $("#txtSearchPop").val();

        var token = $('#hdfToken').val();
        //var parentId = $("#accIdLogin").val();
        var parentId;
        if (utils.getCookie("Type") == "1") {
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
                identity: identity,
                parentId: parentId,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchListPersonal: ", data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Số CMND</th>';
                html += '<th class="text-center">Họ và tên</th>';
                html += '<th class="text-center">Điện thoại</th>';
                html += '<th class="text-center">Địa chỉ</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead>';
                html += '<tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td id="Col_1' + (i + 1) + '">' + (item.identity == null ? "" : item.identity) + '</td>';
                        html += '<td id="Col_2' + (i + 1) + '">' + item.name + '</td>';
                        html += '<td id="Col_3' + (i + 1) + '">' + (item.phoneNumber == undefined ? "" : item.phoneNumber) + '</td>';
                        html += '<td id="Col_4' + (i + 1) + '">' + (item.address == null ? "" : item.address) + '</td>';
                        html += '<td><a href="javascript:;" onclick="Obj.PickDefault(' + (i + 1) + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';

                    }

                }
                html += '</tbody>';

                $("#table-pop-search").html(html);


            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SearchBusiness: function () {

        var taxIdNumber = $("#txtSearchPop").val();

        var token = $('#hdfToken').val();
        //var parentId = $("#accIdLogin").val(); 
        var parentId;
        if (utils.getCookie("Type") == "1") {
            parentId = utils.getCookie("parentId");
        }
        else {
            parentId = $("#accIdLogin").val();
        }
        $.ajax({
            type: 'POST',
            url: Config.API_Login + "Business/SearchBusiness",
            data: JSON.stringify({
                parentId: parentId,
                businessId: null,
                taxIdNumber: taxIdNumber,
                status: 1,
            }),
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchListBusiness: ", data);
                
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã doanh nghiệp</th>';
                html += '<th class="text-center">Tên doanh nghiệp</th>';
                html += '<th class="text-center">Điện thoại</th>';
                html += '<th class="text-center">Địa chỉ</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead>';
                html += '<tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data != "" && data.Data.length > 0) {

                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td id="Col_1' + (i + 1) + '">' + item.taxIdNumber + '</td>';
                        html += '<td id="Col_2' + (i + 1) + '">' + item.name + '</td>';
                        html += '<td id="Col_3' + (i + 1) + '">' + item.phoneNumber + '</td>';
                        html += '<td id="Col_4' + (i + 1) + '">' + item.address + '</td>';
                        html += '<td><a href="javascript:;" onclick="Obj.PickDefault(' + ( i + 1) + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                       
                    }

                }

                html += '</tbody>'; 
                $("#table-pop-search").html(html); 

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    PickDefault: function (a, callback) {
        var ele_1 = $("#Col_1" + a + "").text();
        var ele_2 = $("#Col_2" + a + "").text();
        var ele_3 = $("#Col_3" + a + "").text();
        var ele_4 = $("#Col_4" + a + "").text();

        $("#txtimperNm").val(ele_2);
        $("#txtphoneNoOfImp").val(ele_3);
        $("#txtaddressOfImp").val(ele_4);

        setTimeout(function () {
            utils.closeAll();
        }, 100);

        if (typeof callback != 'undefined' && typeof callback == 'function')
            callback();
    },
};