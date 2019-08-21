window.DePop = {
    //Mã loại hình
    PopDecKind: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("Danh mục loại hình");
            $("#actSearchPop").attr("onclick", "DePop.SearchDecKind()");
            DePop.SearchDecKind();
        });
    },

    SearchDecKind: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDeclarationKind",
            data: {
                dclKindCd: txtCode,
                dclKindNm: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                var html = '';
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.dclKindCd + '</td>';
                        html += '<td id="listLH_' + (i + 1) + '">' + item.dclKindNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectDeKind(\'' + item.dclKindCd + '\',\'listLH_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                $(".list-search-pop").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Cơ quan hải quan
    PopCustom: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục chi cục hải quan");
            $("#actSearchPop").attr("onclick", "DePop.SearchCustom()");
            DePop.SearchCustom();
        });
    },

    SearchCustom: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsOffice",
            data: {
                cstOfficeCd: txtCode,
                cstOfficeNm: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);

                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã chi cục</th>';
                html += '<th class="text-center">Tên chi cục</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.cstOfficeCd + '</td>';
                        html += '<td id="listHQ_' + (i + 1) + '">' + item.cstOfficeNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectCustom(\'' + item.cstOfficeCd + '\',\'listHQ_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Mã nước
    PopCountry: function (a) {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục nước");
            $("#actSearchPop").attr("onclick", "DePop.SearchCountry(" + a + ")");
            if (a != undefined && a == 1) {
                $("#loginbox #CloseSearch").attr("onclick", "DePop.ClosePopSearch()");
            }
            DePop.SearchCountry(a);
        });
    },

    SearchCountry: function (a) {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCountry",
            data: {
                countryCode: txtCode,
                countryName: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);

                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã nước</th>';
                html += '<th class="text-center">Tên nước</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.countryCode + '</td>';
                        html += '<td id="listCountry_' + (i + 1) + '">' + item.countryName + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectCuntry(\'' + item.countryCode + '\',\'listCountry_' + (i + 1) + '\', ' + a + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Mã nước ở tờ khai GTT
    PopCountryGTT: function (i) {
        //i == 1 xuất khẩu <> 1: xuất xứ
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục nước xuất khẩu");
            $("#actSearchPop").attr("onclick", "DePop.SearchCountryGTT(" + i + ")");
            DePop.SearchCountryGTT(i);
        });
    },

    SearchCountryGTT: function (a) {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCountry",
            data: {
                countryCode: txtCode,
                countryName: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);

                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã nước</th>';
                html += '<th class="text-center">Tên nước</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.countryCode + '</td>';
                        html += '<td id="listCountry_' + (i + 1) + '">' + item.countryName + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectCuntryGTT(\'' + item.countryCode + '\',\'listCountry_' + (i + 1) + '\',' + a + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Số lượng kiện
    PopSealUnit: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục đơn vị kiện");
            $("#actSearchPop").attr("onclick", "DePop.SearchSealUnit()");
            DePop.SearchSealUnit();
        });
    },

    SearchSealUnit: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetQuantityUnit",
            data: {
                quanUnitCd: txtCode,
                quanUnitNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);

                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã đơn vị</th>';
                html += '<th class="text-center">Tên đơn vị</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.quanUnitCd + '</td>';
                        html += '<td id="listUnit_' + (i + 1) + '">' + item.quanUnitNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectUnit(\'' + item.quanUnitCd + '\',\'listUnit_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //mã địa điểm lưu kho hàng
    PopWareHouse: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục mã địa điểm lưu kho");
            $("#actSearchPop").attr("onclick", "DePop.SearchWareHouse()");
            DePop.SearchWareHouse();
        });
    },

    SearchWareHouse: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsWarehouse",
            data: {
                cstWrhCd: txtCode,
                cstWrhNm: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã </th>';
                html += '<th class="text-center">Tên </th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.cstWrhCd + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.cstWrhNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectWareHouse(\'' + item.cstWrhCd + '\',\'listWH_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Phương tiện vận chuyển
    PopTransport: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục phương tiện vận chuyển");
            $("#actSearchPop").attr("onclick", "DePop.SearchTransport()");
            DePop.SearchTransport();
        });
    },

    SearchTransport: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetLoadingVessel",
            data: {
                loadVesselCd: txtCode,
                loadVesselNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã </th>';
                html += '<th class="text-center">Tên </th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.loadVesselCd + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.loadVesselNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectTransport(\'' + item.loadVesselCd + '\',\'listWH_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Điểm dỡ hàng
    PopUnplace: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục dỡ hàng");
            $("#actSearchPop").attr("onclick", "DePop.SearchUnplace()");
            DePop.SearchUnplace();
        });
    },

    SearchUnplace: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetUnloadingPort",
            data: {
                unloadPortCd: txtCode,
                unloadPortNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã </th>';
                html += '<th class="text-center">Tên </th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.unloadPortCd + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.unloadPortNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectUnplace(\'' + item.unloadPortCd + '\',\'listWH_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Trọng lượng hàng
    PopWeightUnit: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục trọng lượng hàng");
            $("#actSearchPop").attr("onclick", "DePop.SearchWeightUnit()");
            DePop.SearchWeightUnit();
        });
    },

    SearchWeightUnit: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetWeightUnit",
            data: {
                weigUnitCd: txtCode,
                weigUnitNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã đơn vị</th>';
                html += '<th class="text-center">Tên đơn vị</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.weigUnitCd + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.weigUnitNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectWeightUnit(\'' + item.weigUnitCd + '\',\'listWH_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Địa điểm xếp hàng
    PopPlace: function () {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục xếp hàng");
            $("#actSearchPop").attr("onclick", "DePop.SearchPlace()");
            DePop.SearchPlace();
        });
    },

    SearchPlace: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetLoadingLocation",
            data: {
                loadLocCd: txtCode,
                loadLocNm: txtName,
                countryCd: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã địa điểm</th>';
                html += '<th class="text-center">Tên địa điểm</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.loadLocCd + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.loadLocNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectPlace(\'' + item.loadLocCd + '\',\'listWH_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //---
    PopSearch: function (callback) {
        utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Declaration/PopSearch",
            data: {
            },
            dataType: "html",
            success: function (data) {
                utils.unLoading();

                var myElem = document.getElementById('OverLay');
                if (myElem === null) {
                    utils.ShowOverLay();
                }

                $("BODY").append('<div id="popupSearch">' + data + '</div>');

                if (typeof callback != 'undefined' && typeof callback == 'function')
                    callback();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                utils.unLoading();
            }
        });
    },

    ClosePopSearch: function () {
        $("#popupSearch").remove();
    },

    //===============
    //Mã văn bản pháp quy tắc
    PopLaw: function (n) {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục mã văn bản pháp quy tắc");
            $("#actSearchPop").attr("onclick", "DePop.SeachslotherLawCd(" + n + ")");
            DePop.SeachslotherLawCd(n);
        });
    },

    SeachslotherLawCd: function (n) {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDocumment",
            data: {
                docummentCode: txtCode,
                docummentName: txtName,
                docummentDate: "",
                content: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.docummentCode + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.docummentName + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectLaw(\'' + item.docummentCode + '\',\'listWH_' + (i + 1) + '\',' + n + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },
    //Mã ngân hàng trả thuế thay
    PopBank: function (n) {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục mã văn bản pháp quy tắc");
            $("#actSearchPop").attr("onclick", "DePop.SearchBank(" + n + ")");
            DePop.SearchBank(n);
        });
    },

    SearchBank: function (n) {
        var token = $('#hdfToken').val();

        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetBank",
            data: {
                bankCode: txtCode,
                bankName: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.bankCode + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.bankName + '</td>';
                        html += '<td><a href="javascript:;" onclick="Select.SelectBank(\'' + item.bankCode + '\',\'listWH_' + (i + 1) + '\',' + n + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //thông tin đính kèm
    PopAttackFile: function (n) {
        DePop.PopSearch(function () {
            $("#namePop").html("danh mục mã văn bản pháp quy tắc");
            $("#title-code-search-pop").text("Số tờ khai");
            $("#name-search-pop").hide();

            $("#actSearchPop").attr("onclick", "DePop.SearchAttackFile(" + n + ")");
            DePop.SearchAttackFile(n);
        });
    },
    SearchAttackFile: function (n) {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDeclarationDetail",
            data: {
                DeclarationID: txtCode
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log("SearchAttackFile: ", data);

                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                //html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    //for (var i = 0; i < data.Data.length; i++) {
                    //    var item = data.Data[i];
                    //    html += '<tr>';
                    //    html += '<td>' + (i + 1) + '</td>';
                    //    //html += '<td>' + item.bankCode + '</td>';
                    //    html += '<td id="listWH_' + (i + 1) + '">' + item.bankName + '</td>';
                    //    html += '<td><a href="javascript:;" onclick="Select.SelectBank(\'' + item.bankCode + '\',\'listWH_' + (i + 1) + '\',' + n + ')" class="btn btn-warning">Chọn</a></td>';
                    //    html += '</tr>';
                    //}
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },
}

window.Select = {
    SelectDeKind: function (code, idText) {
        $("#txtdclKindCd").val(code);
        $("#hdfdclKindCd").val(code);

        var text = $("#" + idText).text();
        $("#txtdclKindCd_text").val(text);

        utils.closeAll();
        try {
            app.data.dclKindCd = code;
            app.data.dclKindNm = name;
        }
        catch (e) { }
    },

    SelectCustom: function (code, idText) {
        $("#txtcstOffice").val(code);
        $("#hdfcstOffice").val(code);

        var text = $("#" + idText).text();
        $("#txtcstOfficeNm").val(text);
        utils.closeAll();
        try {
            app.data.cstOffice = code;
            app.data.cstOffice = code;
        }
        catch (e) {
        }
    },

    SelectCuntry: function (code, idText, a) {
        if (a != undefined && a == 1) {
            $('#slplaceOriginCd,#txtplaceOriginCd').val(code);
            var name = $("#" + idText).text();
            $('#txtcountryNmOrigin').val(name);
            DePop.ClosePopSearch();
            try {
                idaProduct.data.placeOriginCd = code;
                idaProduct.data.countryNmOrigin = name;
            }
            catch (e) {
            }
            return;
        }
        else {
            $("#hdfcountryCd").val(code);
            $("#txtcountryCd").val(code);
            var text = $("#" + idText).text();
            $("#txtcountryNm").val(text);

            utils.closeAll();
            try {
                app.data.countryCd = code;
            }
            catch (e) {
            }
        }

    },

    SelectCuntryGTT: function (code, idText, i) {
        if (i == 1) { //xuất khẩu
            $("#hdfcountryCd").val(code);
            $("#txtcountryCd").val(code);
            try {
                app.data.countryCd = code;
            }
            catch (e) {
            }
        }
        else {
            //Xuất xứ
            $("#placeOriginCd").val(code);
            $("#txtplaceOriginCd").val(code);

            var text = $("#" + idText).text();
            $("#txtcountryNm").val(text);
            try {
                app.data.placeOriginCd = code;
            }
            catch (e) {
            }
        }
        utils.closeAll();

    },

    SelectUnit: function (code, idText) {
        $("#hdfpieceUnitCd").val(code);
        //$("#txtcargoPiece").val(code);

        var text = $("#" + idText).text();
        $("#txtpieceUnitCd_text").val(text);

        utils.closeAll();
        try {
            app.data.pieceUnitCd = code;
            app.data.pieceUnitNm = text;
        }
        catch (e) {

        }
    },

    SelectWareHouse: function (code, idText) {
        $("#hdfcstWrhCd").val(code);
        $("#txtcstWrhCd").val(code);

        var text = $("#" + idText).text();
        $("#txtcstWrhCd_text").val(text);

        utils.closeAll();
        try {
            app.data.cstWrhCd = code;
            app.data.cstClrWrhNm = text;
        }
        catch (e) {
        }
    },

    SelectTransport: function (code, idText) {
        $("#hdfTransport").val(code);
        $("#txtTransport").val(code);
        var text = $("#" + idText).text();
        $("#txtloadVesselAcNm").val(text);

        utils.closeAll();
        try {
            app.data.lPlanVesselCd = code;
            app.data.loadVesselCd = code;
            app.data.lPlanVesselNm = text;
            app.data.loadVesselAcNm = text;
        }
        catch (e) {
        }
    },

    SelectUnplace: function (code, idText) {
        code = code.replace("VN", "");

        $("#hdfunloadPortCd").val(code);
        $("#txtunloadPortCd").val(code);

        var text = $("#" + idText).text();
        $("#txtunloadPortNm").val(text);

        utils.closeAll();
        try {
            app.data.loadPortCd = code;
            app.data.loadPortNm = text;
            app.data.unloadPortCd = code;
            app.data.unloadPortNm = text;
        }
        catch (e) {
        }
    },

    SelectWeightUnit: function (code, idText) {
        $("#hdfweigUnitCdGrs").val(code);

        var text = $("#" + idText).text();
        $("#txtweigUnitCdGrs").val(text);

        utils.closeAll();
        try {
            app.data.weigUnitCdGrs = code;
        }
        catch (e) {
        }
    },

    SelectPlace: function (code, idText) {
        $("#hdfloadLocCd").val(code);
        $("#txtloadLocCd").val(code);

        var text = $("#" + idText).text();
        $("#txtloadLocNm").val(text);

        utils.closeAll();
        try {


            app.data.finalDesCd = code;
            app.data.loadLocCd = code;
            app.data.finalDesNm = text
            app.data.loadLocNm = text
        }
        catch (e) {

        }
    },

    SelectLaw: function (code, idText, n) {
        $("#hdfotherLawCd" + n).val(code);
        //$("#txtotherLawCd" + n).val(code);

        var text = $("#" + idText).text();
        $("#txtotherLawCd" + n).val(text);

        utils.closeAll();
    },

    SelectBank: function (code, idText, n) {
        var text = $("#" + idText).text();

        if (n == 1) {
            $("#hdfbankPayCd").val(code);
            $("#txtbankPayCd").val(code);
            $("#txtbankPayCd_text").val(text);
            try {
                app.data.bankPayCd = code;
                app.data.bankPayNm = text;
            }
            catch (e) {
            }
        }
        else {
            $("#hdfsecSupplBankCd").val(code);
            $("#txtsecSupplBankCd").val(code);
            $("#txtsecSupplBankCd_text").val(text);
            try {
                app.data.secSupplBankCd = code;
                app.data.secSupplBankCd = name;
            }
            catch (e) { }
        }

        utils.closeAll();
    },

    //Mã phân loại hàng hóa
    getCargoClsCdCode: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCargoClassification",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slcargoClsCd').append($('<option/>', {
                            value: value.cargoClsCd,
                            text: value.cargoClsCd + " || " + value.cargoClsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Phân loại cá nhân tổ chức
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
                console.log(data);

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slclsOrg').append($('<option/>', {
                            value: value.clsOrgCd,
                            text: value.clsOrgCd + " || " + value.clsOrgNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã phương thức vận chuyển
    getMeansOfTrsCd: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetMeansOfTransportation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log("getMeansOfTrsCd: ", data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slmeansOfTrsCd').append($('<option/>', {
                            value: value.meansOfTrsCd,
                            text: value.meansOfTrsCd + " || " + value.meansOfTrsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã bộ phận xử lý tờ khai
    getDepartment: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsSubSection",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slcstSubSection').append($('<option/>', {
                            value: value.cstSubCd,
                            text: value.cstSubCd + " || " + value.cstSubNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã kết quả kiểm tra nội dung
    getResult: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetResultCodeOfInspection",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slresultInsCd').append($('<option/>', {
                            value: value.resultInsCd,
                            text: value.resultInsCd + " || " + value.resultInsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    ResultOnChange: function () {
        var slresultInsCd = $("#slresultInsCd").val();
        $("#txtresultInsCd").val(slresultInsCd);
    },

    // Giấy phép nhập khẩu
    getImportLicence: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetPermitType",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slpermitType1,#slpermitType2,#slpermitType3,#slpermitType4,#slpermitType5').append($('<option/>', {
                            value: value.permitNm,
                            text: value.permitType
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    changeImportLicence: function (n) {
        var txtpermitType = $("#slpermitType" + n).val();
        $("#txtpermitType" + n).val(txtpermitType);
    },

    // Phân loại hình thức hóa đơn
    getInvoiceType: function () {
        var token = $('#hdfToken').val();

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInvoiceClassification",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvClsCd').append($('<option/>', {
                            value: value.invClsCd,
                            text: value.invClsCd + " || " + value.invClsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã phân loại giá hóa đơn
    getinvPrcKindCd: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInvoicePriceKind",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvPrcKindCd').append($('<option/>', {
                            value: value.invPrcKindCd,
                            text: value.invPrcKindCd + " || " + value.invPrcKindNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Phương thức thanh toán
    getMethodPaid: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTermOfPayment",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#sltermOfPay,#slpaymentCls').append($('<option/>', {
                            value: value.termOfPay,
                            text: value.termOfPay + " || " + value.termOfPayNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Điều kiện giá hóa đơn
    getInvoiceValueCondition: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInvoicePriceCondition",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvPrcCdtCd').append($('<option/>', {
                            value: value.invPrcCdtCd,
                            text: value.invPrcCdtCd + " || " + value.invPrcCdtNm
                        }));
                    })
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Danh sách loại tiền
    getCurrency: function (a) {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCurrency",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    if (a == 3) {
                        $.each(data, function (index, value) {
                            $('#slCurrcyCode,#slCurrcyCode2').append($('<option/>', {
                                value: value.CurrencyCode,
                                text: value.Name
                            }));
                        });
                    }
                    else {
                        $.each(data.Data, function (index, value) {
                            $('#slinvCurCd, #slcurCdBasePrc, #slfreightCurCd, #slinsCurCd,#slCurcyType1,#slCurcyType2,#slCurcyType3,#slCurcyType4,#slCurcyType5').append($('<option/>', {
                                value: value.currencyCode,
                                text: value.currencyCode + " || " + value.currencyName
                            }));
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

    // Mã phân loại khai trị giá
    getInvoiceValue: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetValuationDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slvalDemarCd').append($('<option/>', {
                            value: value.valDemarCd,
                            text: value.valDemarCd + " || " + value.valDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã loại Phí vận chuyển
    GetTransportFeeCodes: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetFreightDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slfreightDemarCd').append($('<option/>', {
                            value: value.freightDemarCd,
                            text: value.freightDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã loại Phí bảo hiểm
    getInsuranceFeeCode: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInsuranceDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slinsDemarCd').append($('<option/>', {
                            value: value.insDemarCd,
                            text: value.insDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã tên
    getAdjName: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetAdjustmentDemarcationName",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#sladj1,#sladj2,#sladj3,#sladj4,#sladj5').append($('<option/>', {
                            value: value.adjDemarNmCd,
                            text: value.adjDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã phân loại
    getAdjustmentCode: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetAdjustmentDemarcation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slFeeCode1,#slFeeCode2,#slFeeCode3,#slFeeCode4,#slFeeCode5').append($('<option/>', {
                            value: value.adjDemarCd,
                            text: value.adjDemarCd + " || " + value.adjDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Mã lý do đề nghị bảo lãnh
    getGuaranteeReasonCode: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetReason",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slreasonCd').append($('<option/>', {
                            value: value.reasonCd,
                            text: value.reasonCd + " || " + value.reasonNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },
    GuaranteeReasonOnChange: function () {
        var txtreasonCd = $("#slreasonCd").val();
        $("#txtreasonCd").val(txtreasonCd);
    },

    // Mã xác định thời hạn nộp thuế
    getTaxExpiration: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetExtendingPaymentDueDate",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slextPayDueCd').append($('<option/>', {
                            value: value.extPayDueCd,
                            text: value.extPayDueCd + " || " + value.extPayDueNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    TaxExpirationOnChange: function () {
        var txtextPayDueCd = $("#slextPayDueCd").val();
        $("#txtextPayDueCd").val(txtextPayDueCd);
    },

    // Mã Phân loại đính kèm
    getInvoiceAttach: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetClassificationAttachment",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slTypefile1,#slTypefile2,#slTypefile3').append($('<option/>', {
                            value: value.clsAttachCd,
                            text: value.clsAttachCd + " || " + value.clsAttachNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    // Địa điểm trung chuyển
    getTransportPlace: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetLocationTransport",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    $.each(data.Data, function (index, value) {
                        $('#slTransshipmentPlace1,#slTransshipmentPlace2,#slTransshipmentPlace3,#sldestTransPlace,#slDestinationTrs').append($('<option/>', {
                            value: value.locTrs,
                            text: value.locTrs + " || " + value.locTrsName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    TransportPlaceOnChange: function (i) {
        if (i == 4) {
            var txtdestTransPlace = $("#sldestTransPlace").val();
            $("#txtdestTransPlace").val(txtdestTransPlace);
        }
        else {
            var txtTransshipmentPlace1 = $("#slTransshipmentPlace" + i).val();
            $("#txtTransshipmentPlace" + i).val(txtTransshipmentPlace1);
        }
    },
}

window.Product = {
    getProductType: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProductType",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0) {
                    $.each(data, function (index, value) {
                        $('#slProductType').append($('<option/>', {
                            value: value.ProductType,
                            text: value.Name
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    getWeightUnit: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetWeightUnit",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slqttUnitCd1,#slqttUnitCd2').append($('<option/>', {
                            value: value.weigUnitCd,
                            text: value.weigUnitCd + " || " + value.weigUnitNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    getAbsoluteDutyRateUnit: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetAbsoluteDutyRateUnit",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slperUnitTaxCd,#slabsDutyUnitCd').append($('<option/>', {
                            value: value.absDutyUnitCd,
                            text: value.absDutyUnitCd
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    getCurrencys: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCurrency",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slcurCdAbsDuty, #slcstValueCurCd, #slunitPriceCurCd').append($('<option/>', {
                            value: value.currencyCode,
                            text: value.currencyCode
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    getImportTaxClassification: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetImportTaxClassification",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slimportTaxClfCd').append($('<option/>', {
                            value: value.importTaxClfCd,
                            text: value.importTaxClfCd + " || " + value.importTaxClfNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    getQuantityUnit: function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetQuantityUnit",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slpriceQttUnit').append($('<option/>', {
                            value: value.quanUnitCd,
                            text: value.quanUnitNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    //Miễn giảm thuế nhập khẩu
    PopReductionTax: function () {

        DePop.PopSearch(function () {
            $("#namePop").html("danh mục thuế");
            $("#actSearchPop").attr("onclick", "Product.SearchReduceTax()");

            $("#loginbox #CloseSearch").attr("onclick", "DePop.ClosePopSearch()");

            Product.SearchReduceTax();
        });
    },

    SearchReduceTax: function () {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetReductionImportTax",
            data: {
                rdcImpTaxCd: txtCode,
                rdcImpTaxNm: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.rdcImpTaxCd + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.rdcImpTaxNm + '</td>';
                        html += '<td><a href="javascript:;" onclick="Product.SelectedTax(\'' + item.rdcImpTaxCd + '\',\'listWH_' + (i + 1) + '\')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SelectedTax: function (code, idx) {
        $("#txtrdcImpTaxCd, #slrdcImpTaxCd").val(code);
        DePop.ClosePopSearch();
    },

    //Thuế và thu khác
    //Nhập khẩu bổ xung
    PopTaxAntiDumpingDuty: function (a) {

        DePop.PopSearch(function () {
            $("#namePop").html("danh mục thuế");
            $("#actSearchPop").attr("onclick", "Product.SearchTaxAntiDumpingDuty(" + a + ")");

            $("#loginbox #CloseSearch").attr("onclick", "DePop.ClosePopSearch()");

            Product.SearchTaxAntiDumpingDuty(a);
        });
    },

    SearchTaxAntiDumpingDuty: function (a) {

        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxAntiDumpingDuty",
            data: {
                code: txtCode,
                name: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.code + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.name + '</td>';
                        html += '<td><a href="javascript:;" onclick="Product.SelectedTaxDuty(\'' + item.code + '\',' + a + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SelectedTaxDuty: function (code, a) {
        if (a == 1) {
            $("#txtoTaxTypeCd1, #sloTaxTypeCd1").val(code);
        }
        else if (a == 2) {
            $("#txtoTaxRdcCd1, #sloTaxRdcCd1").val(code);
        }

        DePop.ClosePopSearch();
    },

    //thuế tiêu thụ đặc biệt
    PopTaxSpecialConsumption: function (a) {

        DePop.PopSearch(function () {
            $("#namePop").html("danh mục thuế");
            $("#actSearchPop").attr("onclick", "Product.SearchTaxSpecialConsumption(" + a + ")");

            $("#loginbox #CloseSearch").attr("onclick", "DePop.ClosePopSearch()");

            Product.SearchTaxSpecialConsumption(a);
        });
    },

    SearchTaxSpecialConsumption: function (a) {

        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxSpecialConsumption",
            data: {
                code: txtCode,
                name: txtName
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.code + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.name + '</td>';
                        html += '<td><a href="javascript:;" onclick="Product.SelectedTaxSpecial(\'' + item.code + '\',' + a + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SelectedTaxSpecial: function (code, a) {
        if (a == 1) {
            $("#txtoTaxTypeCd2, #sloTaxTypeCd2").val(code);
        }
        else if (a == 2) {
            $("#sloTaxRdcCd2, #txtoTaxRdcCd2").val(code);
        }

        DePop.ClosePopSearch();
    },

    //thuế môi trường
    PopTaxEnvironment: function (a) {

        DePop.PopSearch(function () {
            $("#namePop").html("danh mục thuế");
            $("#actSearchPop").attr("onclick", "Product.SearchTaxEnvironment(" + a + ")");

            $("#loginbox #CloseSearch").attr("onclick", "DePop.ClosePopSearch()");

            Product.SearchTaxEnvironment(a);
        });
    },

    SearchTaxEnvironment: function (a) {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxEnvironment",
            data: {
                code: txtCode,
                name: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.code + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.name + '</td>';
                        html += '<td><a href="javascript:;" onclick="Product.SelectedTaxEnvi(\'' + item.code + '\',' + a + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SelectedTaxEnvi: function (code, a) {
        if (a == 1) {
            $("#txtoTaxTypeCd3, #sloTaxTypeCd3").val(code);
        }
        else if (a == 2) {
            $("#txtoTaxRdcCd3, #sloTaxRdcCd3").val(code);
        }

        DePop.ClosePopSearch();
    },

    //thuế giá trị gia tăng
    PopTaxValue: function (a) {

        DePop.PopSearch(function () {
            $("#namePop").html("danh mục thuế");
            $("#actSearchPop").attr("onclick", "Product.SearchTaxValue(" + a + ")");

            $("#loginbox #CloseSearch").attr("onclick", "DePop.ClosePopSearch()");

            Product.SearchTaxValue(a);
        });
    },

    SearchTaxValue: function (a) {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxValueAdded",
            data: {
                code: txtCode,
                name: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.code + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.name + '</td>';
                        html += '<td><a href="javascript:;" onclick="Product.SelectedTaxValue(\'' + item.code + '\',' + a + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SelectedTaxValue: function (code, a) {
        if (a == 1) {
            $("#sloTaxTypeCd4, #txtoTaxTypeCd4").val(code);
        }
        else if (a == 2) {
            $("#sloTaxRdcCd4, #txtoTaxRdcCd4").val(code);
        }

        DePop.ClosePopSearch();
    },

    //thuế chống phân biệt đối xử
    PopTaxAntiDiscrimination: function (a) {

        DePop.PopSearch(function () {
            $("#namePop").html("danh mục thuế");
            $("#actSearchPop").attr("onclick", "Product.SearchTaxAntiDiscrimination(" + a + ")");

            $("#loginbox #CloseSearch").attr("onclick", "DePop.ClosePopSearch()");

            Product.SearchTaxAntiDiscrimination(a);
        });
    },

    SearchTaxAntiDiscrimination: function (a) {
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtName == "" || txtName == undefined) txtName = "";
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTaxAntiDiscrimination",
            data: {
                code: txtCode,
                name: txtName,
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var html = '<thead><tr>';
                html += '<th class="text-center">STT</th>';
                html += '<th class="text-center" style="width: 90px">Mã</th>';
                html += '<th class="text-center">Tên</th>';
                html += '<th class="text-center">Thao tác</th>';
                html += '</tr></thead><tbody class="list-search-pop">';

                if (data.ResponseCode > 0 && data.Data != null && data.Data.length > 0) {
                    for (var i = 0; i < data.Data.length; i++) {
                        var item = data.Data[i];
                        html += '<tr>';
                        html += '<td>' + (i + 1) + '</td>';
                        html += '<td>' + item.code + '</td>';
                        html += '<td id="listWH_' + (i + 1) + '">' + item.name + '</td>';
                        html += '<td><a href="javascript:;" onclick="Product.SelectedTaxAnti(\'' + item.code + '\',' + a + ')" class="btn btn-warning">Chọn</a></td>';
                        html += '</tr>';
                    }
                }
                html += '</body>';

                $("#table-pop-search").html(html);
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    SelectedTaxAnti: function (code, a) {
        if (a == 1) {
            $("#sloTaxTypeCd5, #txtoTaxTypeCd5").val(code);
        }
        else if (a == 2) {
            $("#sloTaxRdcCd5, #txtoTaxRdcCd5").val(code);
        }

        DePop.ClosePopSearch();
    },


    CheckOnSubmit: function (type) {
        if (!Product.CheckSTT()) {
            utils.Message("Số thứ tự của dòng hàng trên tờ khai tạm nhập tái xuất tương ứng phải có 2 ký tự. Nếu nhỏ hơn 1 thì phải có 0 đằng trước");

            return;
        }

        if (type == 1) {
            $('#hdfTypeSubmit').val(1);
        }
        else {
            $('#hdfTypeSubmit').val(2);
        }
        $('#btnSubmitProduct').click();
    },

    CheckSTT: function () {
        var stt = $("#txttenDclLineNo").val();
        if (stt.length == 1)
            return false;

        return true;
    },

    linkToUpdateProduct: function () {
        var id = $("#hdf_productID").val();
        utils.closeAll();
        setTimeout(function () {
            Product.getEditProductDetail(id);
        }, 800)
    },

    getEditProductDetail: function (productId) {
        setTimeout(function () {
            $("#typeUpdate").val(1);
        }, 900);
        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProductDetail",
            data: {
                productId: productId
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                utils.unLoading();
                console.log(data)
                if (data) {
                    Decla.ShowPopAddProduct(2);
                    var t = data.Data

                    setTimeout(function () {
                        $("#titleHH").text("SỬA THÔNG TIN HÀNG HÓA CỦA TỜ KHAI");
                        $('#hdf_productID').val(t.productId);
                        $('#txthSCd').val(t.hSCd);
                        $('#txtmaterialCd').val(t.materialCd);
                        $('#txtdutyRate').val(t.dutyRate);
                        $('#txtabsTariffRate').val(t.absTariffRate);
                        $('#slabsDutyUnitCd').val(t.absDutyUnitCd);
                        $('#slcurCdAbsDuty').val(t.curCdAbsDuty);
                        $('#txtitemName').val(t.itemName);
                        $('#slplaceOriginCd').val(t.placeOriginCd);
                        $('#txtplaceOriginCd').val(t.placeOriginCd);
                        $('#txtcountryNmOrigin').val(t.placeOriginNm);
                        $('#slimportTaxClfCd').val(t.importTaxClfCd);
                        $('#txttariffQuotaClf').val(t.tariffQuotaClf);
                        $('#slperUnitTaxCd').val(t.perUnitTaxCd);
                        $('#txtqtt1').val(t.qtt1);
                        $('#slqttUnitCd1').val(t.qttUnitCd1);
                        $('#txtqtt2').val(t.qtt2);
                        $('#slqttUnitCd2').val(t.qttUnitCd2);
                        $('#txtinvValue').val(t.invValue);
                        $('#txtinvUnitPrice').val(t.invUnitPrice);
                        $('#slunitPriceCurCd').val(t.unitPriceCurCd);
                        $('#slpriceQttUnit').val(t.priceQttUnit);
                        $('#txtcstValue').val(t.cstValue);
                        $('#slcstValueCurCd').val(t.cstValueCurCd);
                        $('#txtvaluationNo1').val(t.lsvaluationNo);
                        $('#txttenDclLineNo').val(t.tenDclLineNo);
                        $('#txttaxExpLsNo').val(t.taxExpLsNo);
                        $('#txttaxExpLsLineNo').val(t.taxExpLsLineNo);
                        $('#slrdcImpTaxCd').val(t.rdcImpTaxCd);
                        $('#txtrdcImpTaxCd').val(t.rdcImpTaxCd);
                        if (t.lsOtherTax != undefined && t.lsOtherTax != null) {
                            if (t.lsOtherTax.length > 0) {
                                $.each(t.lsOtherTax, function (index, value) {
                                    $('#txtoTaxTypeCd' + (index + 1)).val(value.oTaxTypeCd);
                                    $('#txtoTaxRdcCd' + (index + 1)).val(value.oTaxRdcCd);
                                    $('#txtoTaxRdcAmt' + (index + 1)).val(value.cstOTaxAmt);
                                    $('#sloTaxTypeCd' + (index + 1)).val(value.oTaxTypeCd);
                                    $('#sloTaxRdcCd' + (index + 1)).val(value.oTaxRdcCd);
                                    $('#sloTaxRdcAmt' + (index + 1)).val(value.cstOTaxAmt);
                                });
                            }
                        }
                    }, 1000);
                }
            },
            error: function (data) {
                console.log(data);
                utils.unLoading();
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    },

    confirmUpDateProduct: function () {
        var token = $('#hdfToken').val();

        utils.Loading();

        $.ajax({
            url: Config.API_Login + "tax/UpdateProduct",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                console.log(data);
                utils.unLoading();
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0 && data.Data != null && data.Data != undefined) {
                        //window.location.href = Config.Url_Root + "Declaration/CommodityHighValue_List?decID=" + data.Data;
                        location.reload();
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

    confirmReAddProduct_HV: function () {
        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            url: Config.API_Login + "tax/InsertHighProduct",
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
                        Decla.getListProduct(data.Data.declarationId);
                        Decla.ShowPopAddProduct();
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

    confirmAddProduct_HV: function () {
        var token = $('#hdfToken').val();
        utils.Loading();
        $.ajax({
            url: Config.API_Login + "tax/InsertHighProduct",
            type: 'POST',
            data: new FormData($('form')[0]),
            headers: {
                "Authorization": "Bearer " + token
            },
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                debugger;
                utils.unLoading();
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        utils.Message("Thêm hàng vào tờ khai thành công!");
                        Decla.getListProduct();
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
}