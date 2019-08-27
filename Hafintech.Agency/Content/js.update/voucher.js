window.Voucher = {
    PopVoucher: function (idDec, dclNo, type, IsHight, callback) {
        utils.Loading();
        //var dclNo = window.localStorage.getItem("dclNo");
        if (idDec == undefined || idDec == null) {
            idDec = "";
        }
        if (dclNo == undefined || dclNo == null) {
            dclNo = "";
        }
        if (type == undefined || type == null) {
            type = 2;
        }
        if (IsHight == undefined || IsHight == null) {
            IsHight = 2;
        }

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "ElectronicVoucher/PopupVoucher?idDec=" + idDec + "&dclNo=" + dclNo + "&Type=" + type + "&IsHight=" + IsHight,
            data: {
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();
                $('#DeclarationDetail').css({ "display": "none" });
                utils.ShowOverLay();
                $("BODY").append('<div id="popupSearch" style="position:fixed; z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%)">' + data + '</div>');

                setTimeout(function () {
                    $.each(lst.data, function (i, item) {
                        //if (lst.data[i].issuer == "312" && lst.data[i].function == 29) {
                        //    $("vantaidon-checkbox").attr("checked", "checked");
                        //}
                        if (item.issuer == "312" && item.function == 29) {
                            document.getElementById("vantaidoncheck").checked = true;
                        }
                        if (item.function == 29) {
                            switch (item.issuer) {
                                case "312": document.getElementById("vantaidoncheck").checked = true;  //vận tải đơn
                                    break;
                                case "311": document.getElementById("cocheck").checked = true; //co
                                    break;
                                case "310": document.getElementById("hoadoncheck").checked = true; //hóa đơn điện tử
                                    break;
                                case "309": document.getElementById("hopdongcheck").checked = true; //hợp đồng
                                    break;
                                case "308": document.getElementById("giayphepcheck").checked = true; //giấy phép
                                    break;
                                case "313": document.getElementById("containercheck").checked = true; //container
                                    break;
                                case "314": document.getElementById("chungtukhackcheck").checked = true; //chứng từ khác
                                    break;
                            }
                        }
                    });
                }, 200);

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },
    PopSearchVoucher: function (callback) {
        utils.Loading();
       
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "ElectronicVoucher/PopSearchVoucher",
            data: {
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();
                $('#DeclarationDetail').css({ "display": "none" });
                utils.ShowOverLay();
                $("BODY").append('<div id="popupSearch" style="position:fixed; z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%)">' + data + '</div>');

               

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },
    SearchExistDeclaration: async function () { 
        try {
            var token = $('#hdfToken').val();
            var dclNo = $("#dclNoVoucher").val();
            if (dclNo == null || dclNo == undefined) {
                $("#tbSearch").css("display", "block");
                $("#tbSearch").html("bạn chưa nhập số tờ khai");
            }
            var dclId = dclNo;
            if (!dclNo || dclNo <= 0) {

                alert("bạn chưa nhập số tờ khai hải quan");
                return;
            }
            $("#displayLoading").css("display", "block");
            //utils.Loading();
            var link = "";
            var prefixNumber = dclNo.toString().charAt(0) + dclNo.toString().charAt(1);
            if (dclNo.toString().length >= 10) {  //nhập dclNo
                
                if (prefixNumber == "30") {  //EDA
                    IsHight = 4; type = 5;
                    link = Config.API_Login + "export/GetEDADetail?dclId=" + dclId + "&dclNo=" + dclId;
                }
                else if (prefixNumber == "10") {  //IDA
                    IsHight = 2;
                    type = 2;
                    link = Config.API_Login + "import/GetDeclarationDetail?dclId=" + dclId + "&dclNo=" + dclId;
                }
                else {
                    link = Config.API_Login + "export/GetEDADetail?dclId=" + dclId + "&dclNo=" + dclId;
                }
            }
            else { //nhập dclID
                if (prefixNumber == "20") { //EDA
                    IsHight = 4; type = 5;
                    link = Config.API_Login + "export/GetEDADetail?dclId=" + dclId + "&dclNo=" + dclId;
                }
                else if (prefixNumber == "10") { //IDA
                    IsHight = 2;
                    type = 2;
                    link = Config.API_Login + "import/GetDeclarationDetail?dclId=" + dclId + "&dclNo=" + dclId;
                }
                else {
                    link = Config.API_Login + "export/GetEDADetail?dclId=" + dclId + "&dclNo=" + dclId;
                }

            }

            
            
            const response = await axios.get(link,
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            
            //utils.unLoading();
            $("#displayLoading").css("display", "none");
            var res = response.data;
            $("#tbSearch").css("display", "block");
            $("#tbSearch").html(res.Description);
            if (res.ResponseCode >= 0) {
                var data = response.data.Data;

                prefixNumber = data.dclNo.toString().charAt(0) + data.dclNo.toString().charAt(1);

                var IsHight =0;
                var type = 0; 
                var tab = 0;
                if (prefixNumber == "30") {  //EDA
                    IsHight = 4; type = 5; 
                }
                else if (prefixNumber == "10") {  //IDA
                    IsHight = 2;
                    type = 2; 
                }
                switch (data.statusCode) {
                    case "IDA": tab = 1;
                        break;
                    case "IDB": tab = 2;
                        break;
                    case "IDC": tab = 3;
                        break;
                    case "IDD": tab = 4;
                        break;
                    case "EDA": tab = 1;
                        break;
                    case "EDB": tab = 2;
                        break;
                    case "EDC": tab = 3;
                        break;
                    case "EDD": tab = 4;
                        break;
                    default: tab = 1;
                        break;
                }
                 
                window.location.href = Config.Url_Root + "ElectronicVoucher/ListVoucherCustom?idDec=" + dclId + "&type=" + type + "&tab=" + tab + "&ishight=" + IsHight + "&dclNo=" + data.dclNo;
            }
            else {
                console.log("respon api GetDeclarationDetail");
                console.log(res);
            }
            //else return null;
        } catch (error) {
            utils.unLoading();
            console.error(error);
        }
    },
    //Khai báo vận đơn
    PopDeclare: function (pos, callback) {
        utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "ElectronicVoucher/PopupDeclare",
            data: {
                pos: pos
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();
                Voucher.ClosePop();
                utils.ShowOverLay();
                $("BODY").append('<div id="popupSearch" style="position:fixed; z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%)">' + data + '</div>');

                if (pos == 1) {
                    $("#loginbox .normal_text #title-pop").html("Khai báo vận đơn");
                }
                else if (pos == 2) {
                    $("#loginbox .normal_text #title-pop").html("Khai báo C/O");
                }
                else if (pos == 3) {
                    $("#loginbox .normal_text #title-pop").html("Khai báo giấy phép");
                }
                else if (pos == 4) {
                    $("#loginbox .normal_text #title-pop").html("Khai báo hợp đồng");
                }
                else if (pos == 5) {
                    $("#loginbox .normal_text #title-pop").html("Khai báo hóa đơn thương mại");
                }
                else if (pos == 6) {
                    $("#loginbox .normal_text #title-pop").html("Khai báo danh sách container với tờ khai");
                }
                else{
                    $("#loginbox .normal_text #title-pop").html("Khai báo chứng từ khác");
                }

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading()
            }
        });
    },

    ClosePop: function () {
        $("#popupSearch").remove();
        $("#overlayPopup").remove();
        $('#DeclarationDetail').css({ "display": "block" });
        $("#OverLay").remove();
    },
}