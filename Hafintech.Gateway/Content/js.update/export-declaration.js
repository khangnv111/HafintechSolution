var edaConfig = {
    openListProductEDA: 0, //đặt mặc định đã load list product eda là 0
}

window.Export = {
    ShowTab: function (a) {
        if (a == 1) {
            $("#divTab1").show();
            $("#divTab2").hide();
            $("#divTab3").hide();
            $(".act-save-decEDA").show();
            $('body,html').animate({ scrollTop: 0 }, 800);
        }
        else if (a == 2) {
            $("#divTab1").hide();
            $("#divTab2").show();
            $("#divTab3").hide();
            $(".act-save-decEDA").show();
            $('body,html').animate({ scrollTop: 0 }, 800);
        }
        else if (a == 3) {
            $("#divTab1").hide();
            $("#divTab2").hide();
            $("#divTab3").show();
            $(".act-save-decEDA").hide();
            $('body,html').animate({ scrollTop: 0 }, 800);
            app.getList();
        }
        else {

        }
    },

    LoadListProductEDA: function (id) {
        if (edaConfig.openListProductEDA != 0) {
            return;
        }

        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "DeclarationEDA/ListProduct",
            data: {
                Id: id,
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                $("#divTab3").html(data);

                edaConfig.openListProductEDA = 1; //đã load list product eda

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },

    LoadEDB: function () {
        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "DeclarationEDA/EDBDeclaration",
            data: {
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                $("#contentRight").html(data);

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },

    LoadEDC: function () {
        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "DeclarationEDA/EDCDeclaration",
            data: {
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                $("#contentRight").html(data);

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },

    LoadEDD: function () {
        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "DeclarationEDA/EDDDeclaration",
            data: {
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                $("#contentRight").html(data);

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },

    LoadEDE: function () {
        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "DeclarationEDA/EDEDeclaration",
            data: {
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                $("#contentRight").html(data);

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },

    AddProduct: function () {
        var id = $("#dclId").val();
        if (id == 0) {
            accounts.Message("Bạn cần phải tạo tờ khai trước");
            return;
        }

        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "DeclarationEDA/EDADetail",
            data: {
                IdDec: id
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                accounts.ShowOverLay();
                $("BODY").append('<div id="popupwrap" style="left: 50%;z-index: 111; overflow: hidden; max-height: 90%">' + data + '</div>');

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },

    ViewEditProduct: function (IdPro) {
        accounts.ShowLoading();
        var id = $("#dclId").val();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "DeclarationEDA/EDADetail",
            data: {
                IdDec: id,
                IdPro: IdPro
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                accounts.ShowOverLay();
                $("BODY").append('<div id="popupwrap" style="left: 50%;margin-left: -480px;z-index: 111; overflow: hidden">' + data + '</div>');
                edaDetail.LoadDetail();

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },

    LoadMED: function (callback) {
        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "ExportDeclaration/MEDDeclaration",
            data: {
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                $("#contentRight").html(data);

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },
    //Link to chỉ thị hải quan XK
    LinktoKQ: function (type) {
        var dclNo = $("#txtdclNo").val();
        var id = $("#dclId").val();
        window.location.href = Config.Url_Root + "DeclarationEDA/TabResultXK" + (type == 1 ? "" : "_HighValue") + "?decID=" + id + "&dclNo=" + dclNo + "&type=" + (type == 1 ? "6" : "5");
    },
    LinktoCT: function (type) {
        var dclNo = $("#txtdclNo").val();
        var id = $("#dclId").val();
        window.location.href = Config.Url_Root + "DeclarationEDA/TabDirective" + (type == 1 ? "LowValueXK_List" : "HighValueXK_List") + "?decID=" + id + "&dclNo=" + dclNo + "&type=" + (type == 1 ? "6" : "5");
    },
    LinktoTTTK: function (type) {
        var dclNo = $("#txtdclNo").val();
        var id = $("#dclId").val();
        window.location.href = Config.Url_Root + (type == 1 ? "ExportDeclaration" : "DeclarationEDA") + "/" + (type == 1 ? "MECDeclaration" : "EDAGeneral") + "?Id=" + id + "&type=" + (type == 1 ? "6" : "5");
    },
    //reload page
    Reloadpage: function () {
        window.location.reload;
    },
    LoadIEX: function () {
        accounts.ShowLoading();

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "ExportDeclaration/IEXDeclaration",
            data: {
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                $("#contentRight").html(data);

            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    },
};

window.LibDec = {
    GetIntroMess: function (jobCode, errorCode, isFocus) {

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
                if (isFocus !== undefined && isFocus === 1) {
                    var scrH = $("." + errorCode).offset().top;
                    $('body,html').animate({ scrollTop: scrH }, 800);

                    $("." + errorCode).addClass("error");
                    setTimeout(function () {
                        $("." + errorCode).removeClass("error");
                    }, 3000);
                } 
            },
            error: function (data) {
                console.log(data);
            }
        });
    },
}