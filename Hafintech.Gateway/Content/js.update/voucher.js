window.Voucher = {
    PopVoucher: function (callback) {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "ElectronicVoucher/PopupVoucher",
            data: {
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();

                accounts.ShowOverLay();
                $("BODY").append('<div id="popupSearch" style="position:fixed; z-index: 100; top: 50%; left: 50%; transform: translate(-50%, -50%)">' + data + '</div>');

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading()
            }
        });
    },

    //Khai báo vận đơn
    PopDeclare: function (pos, callback) {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "ElectronicVoucher/PopupDeclare",
            data: {
                pos: pos
            },
            dataType: "html",
            success: function (data) {
                accounts.Unloading();
                Voucher.ClosePop();
                accounts.ShowOverLay();
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
                accounts.Unloading()
            }
        });
    },

    ClosePop: function () {
        $("#popupSearch").remove();
        $("#overlayPopup").remove();
    },
}