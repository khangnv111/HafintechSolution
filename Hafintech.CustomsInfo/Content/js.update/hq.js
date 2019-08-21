var _dataMethodCode = '';
var _dataCustom = '';
var _dataCountry = '';

(function () {

    window.hq = {};

    hq.CheckOnSubmit = function (type) {
        if (type == 1) {
            $('#hdfTypeSubmit').val(1);
        }
        else {
            $('#hdfTypeSubmit').val(2);
        }
        $('#btnSubmitProduct').click();
    };

    hq.CheckSubmitDeclaration = function (type) {
        if (type == 1) {
            $('#hdfStatus').val(1);
        }
        else {
            $('#hdfStatus').val(0);
        }
        $('#btnSaveDeclaration').click();
    };

    hq.SelectedDeclarationID = function (DeclarationID) {
        accounts.ClosePopup();
        $('#txtD_code2').val(DeclarationID);
    };

    hq.getSeachMethod = function () {
        accounts.ShowLoading();
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
                dclKindCdOld: "",
                dclKindCdOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachMethod",
                        data: {
                            dclKindCd: txtCode,
                            dclKindNm: txtName,
                            dclKindCdOld: "",
                            dclKindNmOld: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.dclKindCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.dclKindCd + "</td><td>" + value.dclKindNm + "</td><td><a onclick='hq.SelectedMethod(\"" + value.dclKindCd + "\",\"" + value.dclKindNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedMethod = function (code, name) {
        accounts.ClosePopup();
        $('#hdfdclKindCd,#txtdclKindCd').val(code);
        $('#txtdclKindCd_text').val(name);
    };

    hq.getSeachSealUnit = function () {
        accounts.ShowLoading();
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
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachSealUnit",
                        data: {
                            quanUnitCd: txtCode,
                            quanUnitNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.quanUnitCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.quanUnitCd + "</td><td>" + value.quanUnitNm + "</td><td><a onclick='hq.SelectedSealUnit(\"" + value.quanUnitCd + "\",\"" + value.quanUnitNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedSealUnit = function (code, name) {
        accounts.ClosePopup();
        $('#hdfpieceUnitCd').val(code);
        $('#txtpieceUnitCd_text').val(name);
    };

    hq.getSeachWeightUnit = function () {
        accounts.ShowLoading();
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
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachWeightUnit",
                        data: {
                            weigUnitCd: txtCode,
                            weigUnitNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.weigUnitCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.weigUnitCd + "</td><td>" + value.weigUnitNm + "</td><td><a onclick='hq.SelectedWeightUnit(\"" + value.weigUnitCd + "\",\"" + value.weigUnitNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedWeightUnit = function (code, name) {
        accounts.ClosePopup();
        $('#hdfweigUnitCdGrs').val(code);
        $('#txtweigUnitCdGrs').val(name);
    };

    hq.getSearchTransportation = function () {
        accounts.ShowLoading();
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
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSearchTransportation",
                        data: {
                            loadVesselCd: txtCode,
                            loadVesselNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.loadVesselCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.loadVesselCd + "</td><td>" + value.loadVesselNm + "</td><td><a onclick='hq.SelectedTransportation(\"" + value.loadVesselCd + "\",\"" + value.loadVesselNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedTransportation = function (code, name) {
        accounts.ClosePopup();
        $('#hdfTransport,#txtTransport').val(code);
        $('#txtTransport_text').val(name);
    };

    //Trang Danh tờ khai
    hq.getListDeclaration = function () {
        var token = $('#hdfToken').val();
        var accountID = $('#hdfUID').val();
        var type = $('#slType').val();
        var cstOffice = $('#slCustoms').val();
        var startCreatedDate = $('#datepickerFromD').val();
        var endCreatedDate = $('#datepickerToD').val();
        var insClsCd = $('#slPl').val();
        var clearanStatus = $('#slTq').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchByAccountID", //?accountID=" + $('#hdfUID').val(),
            data: {
                accountID: accountID,
                type: type, 
                cstOffice: cstOffice, 
                startCreatedDate: startCreatedDate,
                endCreatedDate: endCreatedDate,
                insClsCd: insClsCd,
                clearanStatus: clearanStatus
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(data);
                if (data) {
                    var str = "<table id='listContainer' class='table table-bordered data-table table-striped with-check' role='grid' aria-describedby='example1_info'>";
                    str += "<thead><tr><th class='text-center' style='min-width:100px'>STT</th>";
                    str += "<th class='text-center' style='min-width:100px'>Số tờ khai</th>";
                    str += "<th class='text-center'>Ngày đăng ký</th>";
                    str += "<th class='text-center'>Loại hình</th>";
                    str += "<th class='text-center'>Hải quan</th>";
                    //str += "<th class='text-center'>Số tờ khai khác</th>";
                    str += "<th class='text-center'>Loại tờ khai</th>";
                    str += "<th class='text-center'>Phân luồng</th>";
                    str += "<th class='text-center'>Thông quan</th>";
                    str += "<th class='text-center'>Ngày thông quan</th>";
                    str += "<th class='text-center'>Ngày hàng đến</th></tr></thead><tbody>";

                    if (data.ResponseCode > 0) {
                        if (data.Data.length > 0) { 

                            $.each(data.Data, function (index, value) {
                                if (value.dclId) {
                                    str += "<tr><td>" + (index + 1) + "</td>";
                                    str += "<td><a href='" + Config.Url_Root + "Declaration/Declaration" + (value.type == 1 ? "" : "HighValue") + "_Detail?decID=" + value.dclId + "&uid=" + $('#hdfUID').val() + "'>" + (value.dclNo == null ? "" : value.dclNo) + "</a></td>";
                                    str += "<td>" + hq.formDateTime(value.createdDate) + "</td>";
                                    str += "<td>" + hq.selectedMethodCode(value.dclKindCd) + "</td>";
                                    str += "<td>" + hq.selectedCustom(value.cstOffice) + "</td>";
                                    //str += "<td>" + (value.declarCode != null ? value.declarCode : "") + "</td>";
                                    str += "<td>" + hq.TypeToKhai(value.type) + "</td>";
                                    str += "<td>" + hq.PhanLuongToKhai(value.insClsCd) + "</td>";
                                    str += "<td>" + hq.ThongQuan(value.clearanStatus) + "</td>";
                                    str += "<td>" + (value.DatePermit != null ? hq.formDateTime2(value.DatePermit) : "") + "</td>";
                                    str += "<td>" + (value.arrDate != null ? hq.formDateTime2(value.arrDate) : "") + "</td></tr>";
                                }

                            });
                        } 
                    }

                    str += "</tbody></table>";
                    $('#divUpdate').html(str);

                    if(data.Data != null && data.Data != undefined && data.Data.length > 0)
                        formatDataTable();
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.getListDeclaration_More = function () {
        var token = $('#hdfToken').val();
        var customCode = $('#slCustoms').val();
        var type = $('#slType').val();
        var grType = $('#slgrType').val();
        var datepickerFromD = $('#datepickerFromD').val(); 
        var datepickerToD = $('#datepickerToD').val();
        var declarCode = $('#txtDeclaration').val();
        var threadStatus = $('#slPl').val();
        var clearancStatus = $('#slTq').val();
        var status = $('#slTt').val();
        var slorgnzTypeId = $('#slorgnzTypeId').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchDeclaration",
            data: {
                 
                type: type,
                //dclId: declarCode,
                cstOffice: customCode,
                dclNo: declarCode,
                startCreatedDate: datepickerFromD,
                endCreatedDate: datepickerToD,
                dclKindCd: grType,
                insClsCd: threadStatus,
                clearanStatus: clearancStatus,
                status: status,

            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //debugger;
                console.log(data);
                if (data) {
                    var str = "<table id='listContainer' class='table table-bordered data-table table-striped with-check' role='grid' aria-describedby='example1_info'><thead><tr>";
                    str += "<th class='text-center' style='min-width:100px'>STT</th>";
                    str += "<th class='text-center' style='min-width:100px'>Số tờ khai</th>";
                    str += "<th class='text-center'>Ngày đăng ký</th>";
                    str += "<th class='text-center'>Loại hình</th>"; 
                    str += "<th class='text-center'>CQ Hải quan</th>";
                    str += "<th class='text-center'>Ngày hàng đến</th>";
                    str += "<th class='text-center'>Loại tờ khai</th>";
                    str += "<th class='text-center'>Phân luồng</th>";
                    str += "<th class='text-center'>Website</th>";
                    str += "<th class='text-center'>Mã nước</th>";
                    str += "<th class='text-center'>Thông quan</th>";
                    str += "<th class='text-center'>Ngày thông quan</th>";
                    str += "</tr>";
                    str += "</thead><tbody>";
                    if (data.ResponseCode > 0) {
                        if (data.Data != null && data.Data.length > 0) {
                            $.each(data.Data, function (index, value) {
                                if (value.dclId) {
                                    str += "<tr><td>" + (index + 1) + "</td><td>";
                                    str += "<a href='" + Config.Url_Root + "Declaration/Declaration" + (value.type == 1 ? "" : "HighValue") + "_Detail?decID=" + value.dclId + "&uid=0'>" + (value.dclNo == null ? "" : value.dclNo) + "</a></td>";
                                    str += "<td>" + hq.formDateTime(value.createdDate) + "</td>";
                                    str += "<td>" + hq.selectedMethodCode(value.dclKindCd) + "</td>";
                                    str += "<td>" + hq.selectedCustom(value.cstOfficeNm) + "</td>";
                                    //str += "<td>" + (value.declarCode != null ? value.declarCode : "") + "</td>";
                                    str += "<td>" + (value.arrDate != null ? hq.formDateTime2(value.arrDate) : "") + "</td>";
                                    str += "<td>" + hq.TypeToKhai(value.type) + "</td>";
                                    str += "<td>" + hq.PhanLuongToKhai(value.insClsCd) + "</td>";
                                    str += "<td>" + (value.wtbWebsite != null ? value.wtbWebsite : "") + "</td>";
                                    str += "<td>" + (value.wtbCountryCode != null ? value.wtbCountryCode : "") + "</td>";
                                    str += "<td>" + hq.ThongQuan(value.clearanStatus) + "</td>";
                                    str += "<td>" + hq.formDateTime(value.datePermit) + "</td>";
                                    str += "</tr>";
                                }
                                if ((index + 1) == data.Data.length) {
                                    str += "</tbody></table>";
                                    $('#divUpdate').html(str);
                                    formatDataTable();
                                }
                            });
                        }
                        else {
                            str += "</tbody></table>";
                            $('#divUpdate').html(str);
                        }
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.TypeToKhai = function (t) {
        if (t == null || t == "" || t == undefined) {
            return "";
        }

        var str = "Thấp";
        if (t == 2) {
            str = "Cao";
        }
        return str;
    };

    hq.PhanLuongToKhai = function (t) {
        var str = "";
        if (t != null && t != "" && t != undefined) {
            if (t == 1)
                str = "Luồng Xanh";
            else if (t == 3)
                str = "Luồng Đỏ";
            else if(t == 2)
                str = "Luồng Vàng";
        }

        return str;
    };

    hq.ThongQuan = function (t) {
        var str = "";
        if (t != null && t != "" && t != undefined) {
            if (t == -1)
                str = "Chưa thông quan";
            else if (t == 1)
                str = "Thông quan";
            else if (t == 2)
                str = "Đợi thông quan";
        }
        return str;
    };

    //Chi tiết tờ khai
    hq.getDeclarationDetail = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getinfo",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    if (data.ResponseCode > 0) {
                        $('#txtCMND').val(data.Data.Identity);
                        $('#txtFullName').val(data.Data.FullName);
                        $('#txtPhone').val(data.Data.Mobile);
                        $('#txtAddress').val(data.Data.Address);
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
            }
        });

        setTimeout(function () {
            var txtDeclaration = $('#txtDeclaration').text();
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "tax/GetDeclarationDetail",
                data: {
                    DeclarationID: txtDeclaration
                },
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.Data) {
                        console.log(data.Data);
                        var t = data.Data;
                        $("input[name=rdGroupType][value=" + t.groupTypeId + "]").prop('checked', true);
                        $('#txtfirstDclNo').val(t.firstDclNo);
                        $('#txtdclPlannedDate').val(hq.formDateTime2(t.dclPlannedDate));
                        $('#txttimeLimReExp').val(hq.formDateTime2(t.timeLimReExp));
                        $('#txtdclKindCd,#hdfdclKindCd').val(t.dclKindCd);
                        if (t.DeclarationKinds != null && t.DeclarationKinds.length > 0) {
                            $('#txtdclKindCd_text').val(t.DeclarationKinds[0].dclKindNm);
                        }
                        $('#txtinsClsCd').val(t.insClsCd);
                        $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                        $('#txtcstOffice_text').val(t.cstOfficeNm);
                        $('#slmeansOfTrsCd').val(t.meansOfTrsCd);
                        $('#slTransport').val(t.transportCode);
                        $('#txttentativeDclNo').val(t.tentativeDclNo);
                        $('#slcargoClsCd').val(t.cargoClsCd);
                        $('#slclsOrg').val(t.clsOrg);
                        $('#slcstSubSection').val(t.cstSubSection);
                        $('#txtimperCd').val(t.imperCd);
                        $('#txtimperNm').val(t.imperNm);
                        $('#txtpostcode').val(t.postcode);
                        $('#txtphoneNoOfImp').val(t.phoneNoOfImp);
                        $('#txtaddressOfImp').val(t.addressOfImp);
                        $('#txtimpCtrCd').val(t.impCtrCd);
                        $('#txtimpCtrNm').val(t.impCtrNm);
                        $('#txtconsignorCd').val(t.consignorCd);
                        $('#txtconsignorNm').val(t.consignorNm);
                        $('#txtpostcodeIdt').val(t.postcodeIdt);
                        $('#txtcountryCd,#hdfcountryCd').val(t.countryCd);
                        if (t.Countrys != null && t.Countrys.length > 0) {
                            $('#txtcountryCd_text').val(t.Countrys[0].countryName);
                        }

                        $('#hdfpieceUnitCd').val(t.pieceUnitCd);
                        if (t.QuantityUnits != null && t.QuantityUnits.length > 0) {
                            $('#txtpieceUnitCd_text').val(t.QuantityUnits[0].quanUnitNm);
                        }

                        $('#hdfTransport,#txtTransport').val(t.loadVesselCd);
                        $('#txtTransport_text').val(t.loadVesselNm);
                        $('#txtexportCsgNm').val(t.exportCsgNm);
                        $('#txtplannedDeclCd').val(t.plannedDeclCd);
                        $('#txtcargoPiece').val(t.cargoPiece);

                        $('#txtcargoWeigGrs').val(t.cargoWeigGrs);
                        $('#hdfweigUnitCdGrs').val(t.weigUnitCdGrs);
                        if (t.WeightUnits != null && t.WeightUnits.length > 0) {
                            $('#txtweigUnitCdGrs').val(t.WeightUnits[0].weigUnitNm);
                        }
                        $('#txtimperCd').val(t.imperCd);

                        $('#txttotalTaxVal').val(t.totalTaxVal);
                        $('#txtinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txttaxSubjectCd').val(t.taxSubjectCd);
                        $('#txttaxSubjectNm').val(t.taxSubjectNm);
                        $('#txttotalTaxAmt').val(t.totalTaxAmt);
                        $('#txtnoColTotalTax').val(t.noColTotalTax);
                        $('#txttotalPayTax').val(t.totalPayTax);
                        $('#txtsecAmt').val(t.secAmt);
                        $('#txtcurCd').val(t.curCd);
                        $('#txtcurExcRate').val(t.curExcRate);

                        $('#txtstructure').val(t.structure);
                        $('#txtnoOfDclColumn').val(t.noOfDclColumn);
                        $('#txtrepTaxCd').val(t.repTaxCd);


                        $('#txtarrDate').val(hq.formDateTime2(t.arrDate));
                        $('#hdfloadLocCd,#txtloadLocCd').val(t.loadLocCd);
                        $('#txtloadLocNm').val(t.loadLocNm);
                        $('#txtunloadPortNm').val(t.unloadPortNm);
                        $('#hdfunloadPortCd,#txtunloadPortCd').val(t.unloadPortCd);
                        $('#txtmarksAndNos').val(t.marksAndNos);
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtArrDateOfTrs').val(hq.formDateTime2(t.arrDateOfTrs));
                        $('#hdfcstWrhCd,#txtcstWrhCd').val(t.cstWrhCd);
                        if (t.CustomsWarehouses != null && t.CustomsWarehouses.length > 0) {
                            $('#txtcstWrhCd_text').val(t.CustomsWarehouses[0].cstWrhNm);
                        }
                        $('#slresultInsCd,#txtresultInsCd').val(t.resultInsCd);
                        $('#txtnoHandledCtn').val(t.noHandledCtn);
                        $("#txtaddress1Street").val(t.address1Street);
                        $("#txtaddress2Street").val(t.address2Street);
                        $("#txtaddress3CityNm").val(t.address3CityNm);
                        $("#txtcountryNm").val(t.countryNm);

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

                        if (t.permitType != undefined && t.permitType != null) {
                            if (t.permitType.length > 0) {
                                $.each(t.permitType, function (index, value) {
                                    $('#txtpermitType' + (index + 1)).val(value.permitLicNo);
                                    $('#slpermitType' + (index + 1)).val(value.permitLicNo);
                                });
                            }
                        }

                        if (t.adjDemarNm != undefined && t.adjDemarNm != null) {
                            if (t.adjDemarNm.length > 0) {
                                $.each(t.adjDemarNm, function (index, value) {
                                    $('#sladj' + (index + 1)).val(value.adjDemarNm);
                                    $('#slFeeCode' + (index + 1)).val(value.adjDemarCd);
                                    $('#slCurcyType' + (index + 1)).val(value.curCdOfEvaAmt);
                                    $('#txtValue' + (index + 1)).val(value.evaluatedAmt);
                                    $('#txtTotalValue' + (index + 1)).val(value.totalDisEva);
                                });
                            }
                        }
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destTransPlace);
                        $('#txtArrDateOfTrs').val(t.arrDateOfTrs);
                        $('#slinvClsCd').val(t.invClsCd);
                        $('#txtinvNo').val(t.invNo);
                        $('#txteleInvRecNo').val(t.eleInvRecNo);
                        $('#sltermOfPay').val(t.termOfPay);
                        $('#slinvPrcCdtCd').val(t.invPrcCdtCd);
                        $('#slinvCurCd').val(t.invCurCd);
                        $('#slinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txtinvDate').val(hq.formDateTime2(t.invDate));
                        $('#txttotalInvPrc').val(t.totalInvPrc);
                        $('#slvalDemarCd').val(t.valDemarCd);
                        $('#txtcompDclNo').val(t.compDclNo);
                        $('#slcurCdBasePrc').val(t.curCdBasePrc);
                        $('#txtbasePrcValAdj').val(t.basePrcValAdj);
                        $('#slfreightDemarCd').val(t.freightDemarCd);
                        $('#slinsDemarCd').val(t.insDemarCd);
                        $('#slfreightCurCd').val(t.freightCurCd);
                        $('#slinsCurCd').val(t.insCurCd);
                        $('#txtfreight').val(t.freight);
                        $('#txtinsAmt').val(t.insAmt);
                        $('#txtregNoIns').val(t.regNoIns);
                        $('#txtdetailsOfVal').val(t.detailsOfVal);
                        $('#txttotalDisTaxVal').val(t.totalDisTaxVal);
                        $('#txttaxPayer').val(t.taxPayer);
                        $('#slreasonCd,#txtreasonCd').val(t.reasonCd);
                        $('#hdfbankPayCd,#txtbankPayCd').val(t.bankPayCd);
                        if ((t.bankPayCd != null || t.secSupplBankCd != null) && t.Banks != undefined && t.Banks.length > 0) {
                            $.each(t.Banks, function (index, value) {
                                if (value.bankCode == t.bankPayCd) {
                                    $('#txtbankPayCd_text').val(value.bankName);
                                }
                                if (value.bankCode == t.secSupplBankCd) {
                                    $('#txtsecSupplBankCd_text').val(value.bankName);
                                }
                            });
                        }

                        if (t.lsTransInfo != null && t.lsTransInfo.length > 0) {
                            $.each(t.lsTransInfo, function (index, value) {
                                txtTransshipmentPlace1
                                $('#slTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentarrDate' + (index + 1)).val(value.arrDateTrnLoc);
                                $('#txtTransshipmentStartDate' + (index + 1)).val(value.strDateTrnLoc);
                            });
                        }

                        $('#txtbankPayIssYear').val(hq.formDateTime2(t.bankPayIssYear));
                        $('#txtbankPaySign').val(t.bankPaySign);
                        $('#txtbankPayNo').val(t.bankPayNo);
                        $('#slextPayDueCd,#txtextPayDueCd').val(t.extPayDueCd);
                        $('#hdfsecSupplBankCd,#txtsecSupplBankCd').val(t.secSupplBankCd);
                        $('#txtissuedYear').val(hq.formDateTime2(t.issuedYear));
                        $('#txtsecBankSign').val(t.secBankSign);
                        $('#txtsecNo').val(t.secNo);
                        $('#txtpermitWrhDate').val(hq.formDateTime2(t.permitWrhDate));
                        $('#txtstrDateTrs').val(hq.formDateTime2(t.strDateTrs));
                        $('#txtcontractNumber').val(t.contractNumber);
                        $('#txtcontractDate').val(hq.formDateTime2(t.contractDate));
                        $('#txtexpiryDate').val(hq.formDateTime2(t.expiryDate));
                        $('#txtetpControlNo').val(t.etpControlNo);
                        $('#txtnotes').val(t.notes);
                        if (t.cargoNo != undefined && t.cargoNo != null) {
                            if (t.cargoNo.length > 0) {
                                $.each(t.cargoNo, function (index, value) {
                                    $('#txtcargoNo' + (index + 1)).val(value.cargoNo);
                                });
                            }
                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                    return;
                }
            });
        }, 1500);
    };

    //Chi tiết tờ khai GTC
    hq.getDeclarationDetail_HV = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getinfo",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    if (data.ResponseCode > 0) {
                        $('#txtCMND').val(data.Data.Identity);
                        $('#txtFullName').val(data.Data.FullName);
                        $('#txtPhone').val(data.Data.Mobile);
                        $('#txtAddress').val(data.Data.Address);
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
            }
        });

        setTimeout(function () {
            var txtDeclaration = $('#txtDeclaration').text();
            $.ajax({
                type: 'GET',
                url: Config.API_Login + "tax/GetDeclarationDetail",
                data: {
                    DeclarationID: txtDeclaration
                },
                headers: {
                    "Authorization": "Bearer " + token
                },
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    if (data.Data) {
                        console.log("dữ liệu: ", data.Data);
                        var t = data.Data;
                        $("input[name=rdGroupType][value=" + t.groupTypeId + "]").prop('checked', true);
                        $('#txtfirstDclNo').val(t.firstDclNo);
                        $('#txtdclPlannedDate').val(hq.formDateTime2(t.dclPlannedDate));
                        $('#txttimeLimReExp').val(hq.formDateTime2(t.timeLimReExp));
                        $('#txtdclKindCd,#hdfdclKindCd').val(t.dclKindCd);
                        if (t.DeclarationKinds != null && t.DeclarationKinds.length > 0) {
                            $('#txtdclKindCd_text').val(t.DeclarationKinds[0].dclKindNm);
                        }
                        $('#txtinsClsCd').val(t.insClsCd);
                        $('#txtcstOffice,#hdfcstOffice').val(t.cstOffice);
                        $('#txtcstOffice_text').val(t.cstOfficeNm);
                        $('#slmeansOfTrsCd').val(t.meansOfTrsCd);
                        $('#slTransport').val(t.transportCode);
                        $('#txttentativeDclNo').val(t.tentativeDclNo);
                        $('#slcargoClsCd').val(t.cargoClsCd);
                        $('#slclsOrg').val(t.clsOrg);
                        $('#slcstSubSection').val(t.cstSubSection);
                        $('#txtimperCd').val(t.imperCd);
                        $('#txtimperNm').val(t.imperNm);
                        $('#txtpostcode').val(t.postcode);
                        $('#txtphoneNoOfImp').val(t.phoneNoOfImp);
                        $('#txtaddressOfImp').val(t.addressOfImp);
                        $('#txtimpCtrCd').val(t.impCtrCd);
                        $('#txtimpCtrNm').val(t.impCtrNm);
                        $('#txtconsignorCd').val(t.consignorCd);
                        $('#txtconsignorNm').val(t.consignorNm);
                        $('#txtpostcodeIdt').val(t.postcodeIdt);
                        $('#txtcountryCd,#hdfcountryCd').val(t.countryCd);
                        if (t.Countrys != null && t.Countrys.length > 0) {
                            $('#txtcountryCd_text').val(t.Countrys[0].countryName);
                        }

                        $('#hdfpieceUnitCd').val(t.pieceUnitCd);
                        if (t.QuantityUnits != null && t.QuantityUnits.length > 0) {
                            $('#txtpieceUnitCd_text').val(t.QuantityUnits[0].quanUnitNm);
                        }

                        $('#hdfTransport,#txtTransport').val(t.loadVesselCd);
                        $('#txtTransport_text').val(t.loadVesselNm);
                        $('#txtexportCsgNm').val(t.exportCsgNm);
                        $('#txtplannedDeclCd').val(t.plannedDeclCd);
                        $('#txtcargoPiece').val(t.cargoPiece);

                        $('#txtcargoWeigGrs').val(t.cargoWeigGrs);
                        $('#hdfweigUnitCdGrs').val(t.weigUnitCdGrs);
                        if (t.WeightUnits != null && t.WeightUnits.length > 0) {
                            $('#txtweigUnitCdGrs').val(t.WeightUnits[0].weigUnitNm);
                        }
                        $('#txtimperCd').val(t.imperCd);

                        $('#txttotalTaxVal').val(t.totalTaxVal);
                        $('#txtinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txttaxSubjectCd').val(t.taxSubjectCd);
                        $('#txttaxSubjectNm').val(t.taxSubjectNm);
                        $('#txttotalTaxAmt').val(t.totalTaxAmt);
                        $('#txtnoColTotalTax').val(t.noColTotalTax);
                        $('#txttotalPayTax').val(t.totalPayTax);
                        $('#txtsecAmt').val(t.secAmt);
                        $('#txtcurCd').val(t.curCd);
                        $('#txtcurExcRate').val(t.curExcRate);
                        //$('#slpaymentCls').val(t.TermOfPayments[0].termOfPay);
                        $('#txtstructure').val(t.structure);
                        $('#txtnoOfDclColumn').val(t.noOfDclColumn);
                        $('#txtrepTaxCd').val(t.repTaxCd);


                        $('#txtarrDate').val(hq.formDateTime2(t.arrDate));
                        $('#hdfloadLocCd,#txtloadLocCd').val(t.loadLocCd);
                        $('#txtloadLocNm').val(t.loadLocNm);
                        $('#txtunloadPortNm').val(t.unloadPortNm);
                        $('#hdfunloadPortCd,#txtunloadPortCd').val(t.unloadPortCd);
                        $('#txtmarksAndNos').val(t.marksAndNos);
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtArrDateOfTrs').val(hq.formDateTime2(t.arrDateOfTrs));
                        $('#hdfcstWrhCd,#txtcstWrhCd').val(t.cstWrhCd);
                        if (t.CustomsWarehouses != null && t.CustomsWarehouses.length > 0) {
                            $('#txtcstWrhCd_text').val(t.CustomsWarehouses[0].cstWrhNm);
                        }
                        $('#slresultInsCd,#txtresultInsCd').val(t.resultInsCd);
                        $('#txtnoHandledCtn').val(t.noHandledCtn);
                        $("#txtaddress1Street").val(t.address1Street);
                        $("#txtaddress2Street").val(t.address2Street);
                        $("#txtaddress3CityNm").val(t.address3CityNm);
                        $("#txtcountryNm").val(t.countryNm);

                        if (t.Documments != undefined && t.Documments != null) {
                            if (t.Documments.length > 0) {
                                $.each(t.Documments, function (index, value) {
                                    $('#txtotherLawCd' + (index + 1)).val(value.docummentName);
                                    $('#hdfotherLawCd' + (index + 1)).val(value.docummentCode);
                                });
                            }
                        }

                        if (t.PermitTypes != undefined && t.PermitTypes != null) {
                            if (t.PermitTypes.length > 0) {
                                $.each(t.PermitTypes, function (index, value) {
                                    $('#txtpermitType' + (index + 1)).val(value.permitNm);
                                    $('#slpermitType' + (index + 1)).val(value.permitNm);
                                });
                            }
                        }

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
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtdestarrDate').val(t.arrDateOfTrs);
                        $('#slinvClsCd').val(t.invClsCd);
                        $('#txtinvNo').val(t.invNo);
                        $('#txteleInvRecNo').val(t.eleInvRecNo);
                        $('#sltermOfPay').val(t.termOfPay);
                        $('#slinvPrcCdtCd').val(t.invPrcCdtCd);
                        $('#slinvCurCd').val(t.invCurCd);
                        $('#slinvPrcKindCd').val(t.invPrcKindCd);
                        $('#txtinvDate').val(hq.formDateTime2(t.invDate));
                        $('#txttotalInvPrc').val(t.totalInvPrc);
                        $('#slvalDemarCd').val(t.valDemarCd);
                        $('#txtcompDclNo').val(t.compDclNo);
                        $('#slcurCdBasePrc').val(t.curCdBasePrc);
                        $('#txtbasePrcValAdj').val(t.basePrcValAdj);
                        $('#slfreightDemarCd').val(t.freightDemarCd);
                        $('#slinsDemarCd').val(t.insDemarCd);
                        $('#slfreightCurCd').val(t.freightCurCd);
                        $('#slinsCurCd').val(t.insCurCd);
                        $('#txtfreight').val(t.freight);
                        $('#txtinsAmt').val(t.insAmt);
                        $('#txtregNoIns').val(t.regNoIns);
                        $('#txtdetailsOfVal').val(t.detailsOfVal);
                        $('#txttotalDisTaxVal').val(t.totalDisTaxVal);
                        $('#txttaxPayer').val(t.taxPayer);
                        $('#slreasonCd,#txtreasonCd').val(t.reasonCd);
                        $('#hdfbankPayCd,#txtbankPayCd').val(t.bankPayCd);
                        //if ((t.bankPayCd != null || t.secSupplBankCd != null) && t.Banks.length > 0) {
                        //$.each(t.Banks, function (index, value) {
                        //if (value.bankCode == t.bankPayCd) {
                        //$('#txtbankPayCd_text').val(value.bankName);
                        //}
                        //if (value.bankCode == t.secSupplBankCd) {
                        //$('#txtsecSupplBankCd_text').val(value.bankName);
                        //}
                        //});
                        //}

                        if (t.lsTransInfo != null && t.lsTransInfo.length > 0) {
                            $.each(t.lsTransInfo, function (index, value) {
                                txtTransshipmentPlace1
                                $('#slTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentarrDate' + (index + 1)).val(value.arrDateTrnLoc);
                                $('#txtTransshipmentStartDate' + (index + 1)).val(value.strDateTrnLoc);
                            });
                        }

                        $('#txtbankPayIssYear').val(hq.formDateTime2(t.bankPayIssYear));
                        $('#txtbankPaySign').val(t.bankPaySign);
                        $('#txtbankPayNo').val(t.bankPayNo);
                        $('#slextPayDueCd,#txtextPayDueCd').val(t.extPayDueCd);
                        $('#hdfsecSupplBankCd,#txtsecSupplBankCd').val(t.secSupplBankCd);
                        $('#txtissuedYear').val(hq.formDateTime2(t.issuedYear));
                        $('#txtsecBankSign').val(t.secBankSign);
                        $('#txtsecNo').val(t.secNo);
                        $('#txtpermitWrhDate').val(hq.formDateTime2(t.permitWrhDate));
                        $('#txtstrDateTrs').val(hq.formDateTime2(t.strDateTrs));
                        $('#txtcontractNumber').val(t.contractNumber);
                        $('#txtcontractDate').val(hq.formDateTime2(t.contractDate));
                        $('#txtexpiryDate').val(hq.formDateTime2(t.expiryDate));
                        $('#txtetpControlNo').val(t.etpControlNo);
                        $('#txtnotes').val(t.notes);
                        if (t.cargoNo != undefined && t.cargoNo != null) {
                            if (t.cargoNo.length > 0) {
                                $.each(t.cargoNo, function (index, value) {
                                    $('#txtcargoNo' + (index + 1)).val(value.cargoNo);
                                });
                            }
                        }
                    }
                    accounts.Unloading();
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                    return;
                }
            });
        }, 1500);
    };

    hq.getSeachDeclaration = function () {
        var denngay = new Date();
        var dd = denngay.getDate();
        var mm = denngay.getMonth() + 1; //January is 0!
        var yyyy = denngay.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        denngay = mm + '/' + dd + '/' + yyyy;
        tungay = mm + '/' + (dd - 1) + '/' + yyyy;
        var token = $('#hdfToken').val();
        var datepickerFrom = $('#datepickerFrom').val();
        if (datepickerFrom == undefined || datepickerFrom == "undefined" || datepickerFrom == "")
            datepickerFrom = tungay;
        var datepickerTo = $('#datepickerTo').val();
        if (datepickerTo == undefined || datepickerTo == "undefined" || datepickerTo == "")
            datepickerTo = denngay;
        var txtDeclaration = $('#txtDeclaration').val();
        if (txtDeclaration == '' || txtDeclaration == undefined || txtDeclaration == "undefined")
        { txtDeclaration = 0; }
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/Search",
            data: {
                declarationID: txtDeclaration,
                startdate: datepickerFrom,
                endDate: datepickerTo
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/Declaration_Search",
                        data: {},
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data.length > 0) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.DeclarationID) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.DeclarationID + "</td><td>" + hq.formDateTime(value.CreatedDate) + "</td><td>" + hq.selectedMethodCode(value.MethodCode) + "</td><td>" + hq.selectedCustom(value.CustomCode) + "</td><td>" + value.Website + "</td><td><a onclick='hq.SelectedDeclarationID(" + value.DeclarationID + ");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                                $('#datepickerFrom').val(datepickerFrom);
                                $('#datepickerTo').val(datepickerTo);
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Cập nhật tờ khai
    hq.confirmUpdateDeclaration_HV = function () {
        $('#hdfdataFileDocsInput1').val($('#fileinputdocs1').val());
        $('#hdfdataFileDocsInput2').val($('#fileinputdocs2').val());
        $('#hdfdataFileDocsInput3').val($('#fileinputdocs3').val());

        var token = $('#hdfToken').val();
        accounts.ShowLoading();
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
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        window.location.href = Config.Url_Root + "Declaration/CommodityHighValue_List?decID=" + data.Data.Declarations.declarationId;
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //Show box thêm hàng
    hq.ShowCommodity_Add = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Declaration/Commodity_Add",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                    $('#hdf_declarationID').val($('#hdfdeclarationID').val());
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    hq.confirmAddProduct = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertProduct",
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
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        accounts.Message("Thêm hàng vào tờ khai thành công!");
                        hq.getListProduct();
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    hq.confirmReAddProduct = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
        $.ajax({
            url: Config.API_Login + "tax/InsertProduct",
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
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        hq.getListProduct();
                        hq.ShowCommodity_Add();
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {

                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    hq.GetAccountInfo = function () {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "account/getinfo",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    if (data.ResponseCode > 0) {
                        $('#txtCMND').val(data.Data.Identity);
                        $('#txtFullName,#txtimperNm').val(data.Data.FullName);
                        $('#txtPhone,#txtphoneNoOfImp').val(data.Data.Mobile);
                        $('#txtAddress,#txtaddressOfImp').val(data.Data.Address);
                        if (data.Data.VerifyEmailStatus == 0) {
                            bootbox.alert("Bạn chưa xác thực tài khoản nên không thể thực hiện chức năng này!<br>Hệ thống tự chuyển về trang cập nhật thông tin sau 3s...");
                            setTimeout(function () { window.location.href = Config.Url_Root + "home/UpdateInfo"; }, 3000);
                        }
                        if (data.Data.Identity == null || data.Data.FullName == null || data.Data.Mobile == null || data.Data.Address == null) {
                            bootbox.alert("Bạn chưa cập nhật đầy đủ thông tin tài khoản nên không thể thực hiện chức năng này!<br>Hệ thống tự chuyển về trang cập nhật thông tin sau 3s...");
                            setTimeout(function () { window.location.href = Config.Url_Root + "home/UpdateInfo"; }, 3000);
                        }
                    }
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //Tạo tờ khai
    hq.confirmInsertDeclaration = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
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
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        window.location.href = Config.Url_Root + "Declaration/Commodity_List?decID=" + data.Data;
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //Trang Danh sách sản phẩm
    hq.getListProduct = function () {
        var token = $('#hdfToken').val();
        var declarationID = $('#hdfdeclarationID').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProduct",
            data: {
                declarationID: declarationID
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                $('#listContainer tbody').html("");
                if (data) {
                    if (data.length > 0) {
                        $.each(data, function (index, value) {
                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.ProductName + "</td><td>" + value.CountryCode + "</td><td>" + hq.formatMoney(value.Quantity) + "</td><td>" + value.Unit + "</td><td>" + value.TaxRate + "</td><td>" + hq.formatMoney(value.Price) + "</td><td><a onclick='' class='btn btn-warning'>Sửa</a><a onclick='' class='btn btn-danger'>Xóa</a></td></tr>");
                        });
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    /////////////////////////////////////////////////////
    //----------Tờ khai Giá trị cao---------------------

    hq.ShowCommodityHV_Add = function () {
        accounts.ShowLoading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "Declaration/CommodityHighValue_Add",
            data: {},
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                if (data) {
                    accounts.ShowPopup(data, 650, 1000);
                    $('#hdf_declarationID').val($('#hdfdeclarationID').val());
                }
                accounts.Unloading();
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    hq.confirmAddProduct_HV = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
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
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        accounts.Message("Thêm hàng vào tờ khai thành công!");
                        hq.getListProduct_HV();
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    hq.confirmReAddProduct_HV = function () {
        var token = $('#hdfToken').val();
        accounts.ShowLoading();
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
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        hq.getListProduct_HV();
                        hq.ShowCommodityHV_Add();
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //Trang Danh sách sản phẩm
    hq.getListProduct_HV = function () {
        var token = $('#hdfToken').val();
        var declarationID = $('#hdfdeclarationID').val();
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
                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.hSCd + "</td><td>" + value.itemName + "</td><td>" + value.placeOriginCd + "</td><td>" + value.qtt1 + "</td><td>" + value.qtt2 + "</td><td>" + value.qttUnitCd1 + "</td><td>" + value.invUnitPrice + "</td><td>" + value.unitPriceCurCd + "</td><td>" + value.invValue + "</td><td>" + value.cstValue + "</td><td>" + value.importTaxClfCd + "</td><td>" + value.dutyRate + "</td><td>" + value.rdcImpTaxCd + "</td><td>" + value.rdcAmtImpTax + "</td>" + hq.checkUndefined(value.oTaxTypeCd) + "</tr>");
                        });
                    }
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.checkUndefined = function (datacheck) {
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
    }

    //Tạo tờ khai
    hq.confirmInsertDeclaration_HV = function () {
        $('#hdfdataFileDocsInput1').val($('#fileinputdocs1').val());
        $('#hdfdataFileDocsInput2').val($('#fileinputdocs2').val());
        $('#hdfdataFileDocsInput3').val($('#fileinputdocs3').val());

        var token = $('#hdfToken').val();
        accounts.ShowLoading();
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
                if (data != null && data != '' && data != undefined) {
                    if (data.ResponseCode > 0) {
                        window.location.href = Config.Url_Root + "Declaration/CommodityHighValue_List?decID=" + data.Data.Declarations.dclId;
                    }
                    else {
                        accounts.Message(data.Description);
                    }
                }
                else {
                    accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                }
                accounts.Unloading();
            },
            error: function (data) {
                accounts.Message("Hệ thống bận, vui lòng quay lại sau!");
                accounts.Unloading();
            }
        });
    };

    //>>------GET DATA DROPDOWNLIST------

    // Điều kiện giá hóa đơn
    hq.getInvoiceValueCondition = function () {
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
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvPrcCdtCd').append($('<option/>', {
                            value: value.invPrcCdtCd,
                            text: value.invPrcCdtNm

                        }));
                    })
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Phân loại hình thức hóa đơn
    hq.getInvoiceType = function () {
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
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvClsCd').append($('<option/>', {
                            value: value.invClsCd,
                            text: value.invClsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại giá hóa đơn
    hq.getInvoiceValueType = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetInvoiceValueType",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slInvoiceValueType').append($('<option/>', {
                            value: value.invValTypeID,
                            text: value.invValTypeName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại khai trị giá
    //hq.getMethod = function () {
    //    var token = $('#hdfToken').val();
    //    $.ajax({
    //        type: 'GET',
    //        url: Config.API_Login + "tax/GetMethod",
    //        data: {},
    //        headers: {
    //            "Authorization": "Bearer " + token
    //        },
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            //console.log(data);
    //            if (data) {
    //                _dataMethodCode = data;
    //                $.each(data, function (index, value) {
    //                    $('#slinvoiceValueId').append($('<option/>', {
    //                        value: value.MethodCode,
    //                        text: value.Name
    //                    }));
    //                });
    //            }
    //        },
    //        error: function (data) {
    //            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
    //            return;
    //        }
    //    });
    //};

    //Danh sách loại tiền
    hq.getCurrency2 = function () {
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
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvCurCd').append($('<option/>', {
                            value: value.currencyCode,
                            text: value.currencyName
                        }));
                        $('#slcurCdBasePrc,#slfreightCurCd,#slinsCurCd,#slCurcyType1,#slCurcyType2,#slCurcyType3,#slCurcyType4,#slCurcyType5').append($('<option/>', {
                            value: value.currencyCode,
                            text: (value.currencyCode + " (" + value.currencyName + ")")
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Danh sách loại tiền
    hq.getCurrency3 = function () {
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
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slCurrcyCode,#slCurrcyCode2').append($('<option/>', {
                            value: value.CurrencyCode,
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
    };
    hq.Currency3OnChange = function () {
        var txtCurrcyCode = $("#slCurrcyCode").val();
        $("#txtCurrcyCode").val(txtCurrcyCode);
    };

    // Mã ngân hàng trả thuế thay
    //hq.getMethod = function () {
    //    var token = $('#hdfToken').val();
    //    $.ajax({
    //        type: 'GET',
    //        url: Config.API_Login + "tax/GetMethod",
    //        data: {},
    //        headers: {
    //            "Authorization": "Bearer " + token
    //        },
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            if (data) {
    //                $.each(data, function (index, value) {
    //                    $('#slcolltBankId,#slguarBankId').append($('<option/>', {
    //                        value: value.MethodCode,
    //                        text: value.Name
    //                    }));
    //                });
    //            }
    //        },
    //        error: function (data) {
    //            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
    //            return;
    //        }
    //    });
    //};
    hq.countryOnChange = function () {
        var txtcolltBankId = $("#slcolltBankId").val();
        $("#txtcolltBankId").val(txtcolltBankId);
    };
    hq.countryOnChange = function () {
        var txtguarBankId = $("#slguarBankId").val();
        $("#txtguarBankId").val(txtguarBankId);
    };

    // Mã Phân loại đính kèm
    hq.getInvoiceAttach = function () {
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
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slTypefile1,#slTypefile2,#slTypefile3').append($('<option/>', {
                            value: value.clsAttachCd,
                            text: value.clsAttachNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Giấy phép nhập khẩu
    hq.getImportLicence = function () {
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
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slpermitType1,#slpermitType2,#slpermitType3,#slpermitType4,#slpermitType5').append($('<option/>', {
                            value: value.permitType,
                            text: value.permitNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.LicenceData1OnChange = function () {
        var txtimpLicenceData1 = $("#slimpLicenceData1").val();
        $("#txtimpLicenceData1").val(txtimpLicenceData1);
    };
    hq.LicenceData2OnChange = function () {
        var txtimpLicenceData2 = $("#slimpLicenceData2").val();
        $("#txtimpLicenceData2").val(txtimpLicenceData2);
    };
    hq.LicenceData3OnChange = function () {
        var txtimpLicenceData3 = $("#slimpLicenceData3").val();
        $("#txtimpLicenceData3").val(txtimpLicenceData3);
    };
    hq.LicenceData4OnChange = function () {
        var txtimpLicenceData4 = $("#slimpLicenceData4").val();
        $("#txtimpLicenceData4").val(txtimpLicenceData4);
    };
    hq.LicenceData5OnChange = function () {
        var txtimpLicenceData5 = $("#slimpLicenceData5").val();
        $("#txtimpLicenceData5").val(txtimpLicenceData5);
    };

    // Mã loại Phí vận chuyển
    hq.GetTransportFeeCodes = function () {
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
                if (data.Data) {
                    //console.log(data);
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
    };

    // Mã loại Phí bảo hiểm
    hq.getInsuranceFeeCode = function () {
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
                if (data) {
                    //console.log(data);
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
    };

    // Mã ngân hàng
    hq.getBank = function (bankId, p) {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetBank",
            data: {
                bankId: bankId,
                bankCode: "",
                bankName: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data.ResponseCode > 0) {
                    if (data.Data.length > 0) {
                        if (p == 1) {
                            $('#txtcolltBankId_text').val(data.Data[0].customsName);
                        }
                        else {
                            $('#txtguarBankId_text').val(data.Data[0].customsName);
                        }
                    }

                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã văn bản pháp quy khác
    hq.getDocumment = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDocumment",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#sldocummentData1,#sldocummentData2,#sldocummentData3,#sldocummentData4,#sldocummentData5').append($('<option/>', {
                            value: value.docummentId,
                            text: value.docummentName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.DocummentData1OnChange = function () {
        var txtdocummentData1 = $("#sldocummentData1").val();
        $("#txtdocummentData1").val(txtdocummentData1);
    };
    hq.DocummentData2OnChange = function () {
        var txtdocummentData2 = $("#sldocummentData2").val();
        $("#txtdocummentData2").val(txtdocummentData2);
    };
    hq.DocummentData3OnChange = function () {
        var txtdocummentData3 = $("#sldocummentData3").val();
        $("#txtdocummentData3").val(txtdocummentData3);
    };
    hq.DocummentData4OnChange = function () {
        var txtdocummentData4 = $("#sldocummentData4").val();
        $("#txtdocummentData4").val(txtdocummentData4);
    };
    hq.DocummentData5OnChange = function () {
        var txtdocummentData5 = $("#sldocummentData5").val();
        $("#txtdocummentData5").val(txtdocummentData5);
    };

    // Mã lý do đề nghị bảo lãnh
    hq.getGuaranteeReasonCode = function () {
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
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slreasonCd').append($('<option/>', {
                            value: value.reasonCd,
                            text: value.reasonNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã địa điểm lưu kho hàng chờ thông quan dự kiến
    hq.getWaitingPlace = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetWaitingPlace",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slwaitStgPlcCode').append($('<option/>', {
                            value: value.waitPlaceCode,
                            text: value.waitPlaceName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.WaitingPlaceOnChange = function () {
        var txtwaitStgPlcCode = $("#slwaitStgPlcCode").val();
        $("#txtwaitStgPlcCode").val(txtwaitStgPlcCode);
    };

    // Địa điểm trung chuyển
    hq.getTransportPlace = function () {
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
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slTransshipmentPlace1,#slTransshipmentPlace2,#slTransshipmentPlace3,#sldestTransPlace,#slDestinationTrs').append($('<option/>', {
                            value: value.locTrs,
                            text: value.locTrsName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.TransportPlace1OnChange = function () {
        var txtTransshipmentPlace1 = $("#slTransshipmentPlace1").val();
        $("#txtTransshipmentPlace1").val(txtTransshipmentPlace1);
    };
    hq.TransportPlace2OnChange = function () {
        var txtTransshipmentPlace2 = $("#slTransshipmentPlace2").val();
        $("#txtTransshipmentPlace2").val(txtTransshipmentPlace2);
    };
    hq.TransportPlace3OnChange = function () {
        var txtTransshipmentPlace3 = $("#slTransshipmentPlace3").val();
        $("#txtTransshipmentPlace3").val(txtTransshipmentPlace3);
    };
    hq.destTransPlaceOnChange = function () {
        var txtdestTransPlace = $("#sldestTransPlace").val();
        $("#txtdestTransPlace").val(txtdestTransPlace);
    };

    // Mã kết quả kiểm tra nội dung
    hq.getResult = function () {
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
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slresultInsCd').append($('<option/>', {
                            value: value.resultInsCd,
                            text: value.resultInsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.ResultOnChange = function () {
        var txtresultId = $("#slresultId").val();
        $("#txtresultId").val(txtresultId);
    };

    // Mã phân loại hàng hóa
    hq.getcargoClsCdCode = function () {
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
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slcargoClsCd').append($('<option/>', {
                            value: value.cargoClsCd,
                            text: value.cargoClsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Phân loại cá nhân tổ chức
    hq.getOrganizationType = function () {
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
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slorgnzTypeId').append($('<option/>', {
                            value: value.clsOrgCd,
                            text: value.clsOrgNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Nhóm loại hình
    hq.getGroupType = function () {
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
                console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        if (index == 0) {
                            $('div#grType').append("<label style=\"display:inline-block\"><input type=\"radio\" id=\"rdGroupType" + (index + 1) + "\" checked name=\"rdGroupType\" value=\"" + value.groupTypeId + "\" /> " + value.groupTypeName + "</label>");
                        }
                        else {
                            $('div#grType').append("<label style=\"display:inline-block\"><input type=\"radio\" id=\"rdGroupType" + (index + 1) + "\" name=\"rdGroupType\" value=\"" + value.groupTypeId + "\" disabled /> " + value.groupTypeName + "</label>");
                        }
                    });

                    $.each(data.Data, function (index, value) {
                        $('#slgrType').append($('<option/>', {
                            value: value.groupTypeId,
                            text: value.groupTypeName
                        }));
                    });

                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Phương tiện vận chuyển
    hq.getTransportation = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTransportation",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slTransport').append($('<option/>', {
                            value: value.transCode,
                            text: value.transpName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại hàng hóa
    hq.getProductClassificationCode = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetProductClassificationCode",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slProductClassification').append($('<option/>', {
                            value: value.productCCodeID,
                            text: value.prodCCodeName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Đơn vị trọng lượng
    hq.getWeightUnit = function () {
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
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slweightUnitCode,#slweightUnitCode2').append($('<option/>', {
                            value: value.weightUnitId,
                            text: value.weightUnitName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã tên
    hq.getAdjName = function () {
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
                if (data.Data) {
                    //console.log(data);
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
    };

    // Mã phân loại khai trị giá
    hq.getInvoiceValue = function () {
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
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slvalDemarCd').append($('<option/>', {
                            value: value.valDemarCd,
                            text: value.valDemarNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phân loại
    hq.getAdjustmentCode = function () {
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
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slFeeCode1,#slFeeCode2,#slFeeCode3,#slFeeCode4,#slFeeCode5').append($('<option/>', {
                            value: value.adjDemarCd,
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
    };

    // Mã bộ phận xử lý tờ khai
    hq.getDepartment = function () {
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
                if (data.Data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slcstSubSection').append($('<option/>', {
                            value: value.cstSubCd,
                            text: value.cstSubNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Thông tin trung chuyển
    hq.getMethod = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetMethod",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slTransshipmentPlace1,#slTransshipmentPlace2,#slTransshipmentPlace3').append($('<option/>', {
                            value: value.MethodCode,
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
    };
    hq.countryOnChange = function () {
        var txtTransshipmentPlace1 = $("#slTransshipmentPlace1").val();
        $("#txtTransshipmentPlace1").val(txtTransshipmentPlace1);
    };
    hq.countryOnChange = function () {
        var txtTransshipmentPlace2 = $("#slTransshipmentPlace2").val();
        $("#txtTransshipmentPlace2").val(txtTransshipmentPlace2);
    };
    hq.countryOnChange = function () {
        var txtTransshipmentPlace3 = $("#slTransshipmentPlace3").val();
        $("#txtTransshipmentPlace3").val(txtTransshipmentPlace3);
    };

    // Mã xác định thời hạn nộp thuế
    hq.getTaxExpiration = function () {
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
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slextPayDueCd').append($('<option/>', {
                            value: value.extPayDueCd,
                            text: value.extPayDueNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.TaxExpirationOnChange = function () {
        var txttaxExpirId = $("#sltaxExpirId").val();
        $("#txttaxExpirId").val(txttaxExpirId);
    };

    hq.getSeachCustom = function () {
        accounts.ShowLoading();
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
                cstOfficeCdOld: "",
                cstOfficeNmOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachCustom",
                        data: {
                            cstOfficeCd: txtCode,
                            cstOfficeNm: txtName,
                            cstOfficeCdOld: "",
                            cstOfficeNmOld: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.cstOfficeCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.cstOfficeCd + "</td><td>" + value.cstOfficeNm + "</td><td><a onclick='hq.SelectedCustom(\"" + value.cstOfficeCd + "\",\"" + value.cstOfficeNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    // Mã phương thức vận chuyển
    hq.getmeansOfTrsCd = function () {
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
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slmeansOfTrsCd').append($('<option/>', {
                            value: value.meansOfTrsCd,
                            text: value.meansOfTrsNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.getListCustom = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetCustomsOffice",
            data: {
                cstOfficeCd: "",
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
                //console.log(data);
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slCustoms').append($('<option/>', {
                            value: value.cstOfficeCd,
                            text: value.cstOfficeNm

                        }));
                    })
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //// Mã phân loại giá hóa đơn
    hq.getinvPrcKindCd = function () {
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
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#slinvPrcKindCd').append($('<option/>', {
                            value: value.invPrcKindCd,
                            text: value.invPrcKindNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    ///////////////////////////////////////////////////

    //Lấy danh sách nước
    hq.getcountry = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "service/getcountry",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    _dataCountry = data;
                    $.each(data, function (index, value) {
                        $('#slCodeCountry').append($('<option/>', {
                            value: value.CountryCode,
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
    };
    hq.countryOnChange = function () {
        var txtCodeCountry = $("#slCodeCountry").val();
        $("#txtCodeCountry").val(txtCodeCountry);
    };

    hq.getSeachUncstWrhCd = function () {
        accounts.ShowLoading();
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
                province: "",
                cstOfficeCd: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachUnwaitStgPlcCode",
                        data: {
                            cstWrhCd: txtCode,
                            cstWrhNm: txtName,
                            province: "",
                            cstOfficeCd: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.cstWrhCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.cstWrhCd + "</td><td>" + value.cstWrhNm + "</td><td><a onclick='hq.SelectedUncstWrhCd(\"" + value.cstWrhCd + "\",\"" + value.cstWrhNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedUncstWrhCd = function (code, name) {
        accounts.ClosePopup();
        $('#txtcstWrhCd,#hdfcstWrhCd').val(code);
        $('#txtcstWrhCd_text').val(name);
    };

    hq.getSeachPlace = function () {
        accounts.ShowLoading();
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
                console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachPlace",
                        data: {
                            loadLocCd: txtCode,
                            loadLocNm: txtName,
                            countryCd: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.loadLocCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.loadLocCd + "</td><td>" + value.loadLocNm + "</td><td><a onclick='hq.SelectedPlace(\"" + value.loadLocCd + "\",\"" + value.loadLocNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedPlace = function (code, name) {
        accounts.ClosePopup();
        $('#txtloadLocCd,#hdfloadLocCd').val(code);
        $('#txtloadLocNm').val(name);
    };
    //Lấy danh hải quan
    hq.getCustoms = function (customsCode) {
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
                if (data.ResponseCode > 0) {
                    if (data.Data.length > 0)
                        $('#txtcstOffice_text').val(data.Data[0].customsName);
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.CustomsOnChange = function () {
        var txtCodeCustom = $("#slCustom").val();
        $("#txtCodeCustom").val(txtCodeCustom);
    };

    hq.getSeachCountry = function () {
        accounts.ShowLoading();
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
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachCountry",
                        data: {
                            countryCode: txtCode,
                            countryName: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                //bootbox.dialog({
                                //title: "",
                                //message: 'bff'
                                //})
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.countryCode) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.countryCode + "</td><td>" + value.countryName + "</td><td><a onclick='hq.SelectedCountry(\"" + value.countryCode + "\",\"" + value.countryName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedCountry = function (code, name) {
        accounts.ClosePopup();
        $('#txtcountryCd,#hdfcountryCd').val(code);
        $('#txtcountryCd_text').val(name);
    };

    hq.getSeachUnPlace = function () {
        accounts.ShowLoading();
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
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachUnPlace",
                        data: {
                            unloadPortCd: txtCode,
                            unloadPortNm: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.unloadPortCd) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.unloadPortCd + "</td><td>" + value.unloadPortNm + "</td><td><a onclick='hq.SelectedUnPlace(\"" + value.unloadPortCd + "\",\"" + value.unloadPortNm + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedUnPlace = function (code, name) {
        accounts.ClosePopup();
        $('#txtunloadPortCd,#hdfunloadPortCd').val(code);
        $('#txtunloadPortNm').val(name);
    };

    //Lấy danh sách loại hình
    //hq.getMethod = function () {
    //    var token = $('#hdfToken').val();
    //    $.ajax({
    //        type: 'GET',
    //        url: Config.API_Login + "tax/GetMethod",
    //        data: {},
    //        headers: {
    //            "Authorization": "Bearer " + token
    //        },
    //        contentType: "application/json; charset=utf-8",
    //        dataType: "json",
    //        success: function (data) {
    //            //console.log(data);
    //            if (data) {
    //                _dataMethodCode = data;
    //                $.each(data, function (index, value) {
    //                    $('#slType').append($('<option/>', {
    //                        value: value.MethodCode,
    //                        text: value.Name
    //                    }));
    //                });
    //            }
    //        },
    //        error: function (data) {
    //            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
    //            return;
    //        }
    //    });
    //};
    hq.MethodOnChange = function () {
        var txtCodeType = $("#slType").val();
        $("#txtCodeType").val(txtCodeType);
    };

    //Lấy danh sách phương thức vận chuyển
    hq.getVehicleMethod = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetVehicleMethod",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slTransport').append($('<option/>', {
                            value: value.VehicleMethod,
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
    };

    //Phương thức thanh toán
    hq.getMethodPaid = function () {
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
                if (data.Data) {
                    $.each(data.Data, function (index, value) {
                        $('#sltermOfPay,#slpaymentCls').append($('<option/>', {
                            value: value.termOfPay,
                            text: value.termOfPayNm
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    //Lấy danh sách địa điểm xếp hàng
    hq.getPlaceLoading = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetPlaceLoading",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slPlace').append($('<option/>', {
                            value: value.PlaceLoadingID,
                            text: value.PlaceName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.PlaceLoadingOnChange = function () {
        var txtPlace = $("#slPlace").val();
        $("#txtPlace").val(txtPlace);
    };

    //Lấy danh sách địa điểm dỡ hàng
    hq.getPlaceUnLoading = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetPlaceUnLoading",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                //console.log(data);
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slPlace2').append($('<option/>', {
                            value: value.PlaceUnloadingID,
                            text: value.PlaceName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.PlaceUnLoadingOnChange = function () {
        var txtPlace2 = $("#slPlace2").val();
        $("#txtPlace2").val(txtPlace2);
    };

    //chọn số lượng kiện
    hq.TypeNumberOnChange = function () {
        var txtNumber = $("#slTypeNumber").val();
        $("#txtNumber").val(txtNumber);
    };

    //chọn tổng trọng lượng
    hq.GrossOnChange = function () {
        var txtGross = $("#slGross").val();
        $("#txtGross").val(txtGross);
    };

    //danh sách loại sản phẩm
    hq.getProductType = function () {
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
                if (data) {
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
    };
    //Danh sách loại tiền
    hq.getCurrency = function () {
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
                if (data) {
                    $.each(data, function (index, value) {
                        $('#slCoinCode').append($('<option/>', {
                            value: value.CurrencyCode,
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
    };

    // Phương tiện vận chuyển
    hq.getTransportMethod = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetTransportMethod",
            data: {},
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    //console.log(data);
                    $.each(data.Data, function (index, value) {
                        $('#slTransportMethod').append($('<option/>', {
                            value: value.tranMethodID,
                            text: value.tranMethodName
                        }));
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.selectedMethodCode = function (code) {
        var str = code;
        if (code == null || code === "" || code === undefined) {
            return "";
        }

        if (_dataMethodCode.length > 0) {
            $.each(_dataMethodCode, function (index, value) {
                if (value.MethodCode == code) {
                    str = value.Name;
                }
            });
        }
        return str;
    };

    hq.SelectedCustom = function (code, name) {
        accounts.ClosePopup();
        $('#txtcstOffice,#hdfcstOffice').val(code);
        $('#txtcstOffice_text').val(name);
    };

    hq.selectedCustom = function (code) {
        var str = code;
        if (code == null || code == "" || code == undefined) {
            return "";
        }
        if (_dataCustom.length > 0) {
            $.each(_dataCustom, function (index, value) {
                if (value.CustomsCode == code) {
                    str = value.CustomsName;
                }
            });
        }
        return str;
    };

    hq.selectedCountry = function (code) {
        var str = code;
        if (_dataCountry.length > 0) {
            $.each(_dataCountry, function (index, value) {
                if (value.CountryCode == code) {
                    str = value.Name;
                }
            });
        }

        return str;
    };

    hq.formDateTime2 = function (date) {
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        return currMonth + "/" + currDate
            + "/" + currYear;
    };

    hq.formDateTime = function (date) {
        if (date == null || date == "" || date == undefined) {
            return "";
        }

        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        var currHours = d.getHours();
        var currMinutes = d.getMinutes();
        return currMonth + "/" + currDate
            + "/" + currYear + " " + currHours + ":" + currMinutes;
    };

    hq.formatMoney = function (argValue) {
        var comma = (1 / 2 + '').charAt(1);
        var digit = ',';
        if (comma == '.') {
            digit = '.';
        }

        var sSign = "";
        if (argValue < 0) {
            sSign = "-";
            argValue = -argValue;
        }

        var sTemp = "" + argValue;
        var index = sTemp.indexOf(comma);
        var digitExt = "";
        if (index != -1) {
            digitExt = sTemp.substring(index + 1);
            sTemp = sTemp.substring(0, index);
        }

        var sReturn = "";
        while (sTemp.length > 3) {
            sReturn = digit + sTemp.substring(sTemp.length - 3) + sReturn;
            sTemp = sTemp.substring(0, sTemp.length - 3);
        }
        sReturn = sSign + sTemp + sReturn;
        if (digitExt.length > 0) {
            sReturn += comma + digitExt;
        }
        return sReturn;
    };

    hq.KeyPressTextboxBill = function (t) {
        var str = "";
        var stt = $(t).attr("data-stt");
        var txtWaybill = $("#txtWaybill" + stt).val();
        var txtDateWaybill = $("#txtDateWaybill" + stt).val();
        var txtHAWB = $("#txtHAWB" + stt).val();
        var txtMAWB = $("#txtMAWB" + stt).val();
        var flag = 1;
        if (txtWaybill == "") { $("#txtWaybill" + stt).addClass("error"); flag = 0; }
        else { $("#txtWaybill" + stt).removeClass("error"); flag = 1; }

        if (txtDateWaybill == "") { $("#txtDateWaybill" + stt).addClass("error"); flag = 0; }
        else { $("#txtDateWaybill" + stt).removeClass("error"); flag = 1; }

        if (txtHAWB == "") { $("#txtHAWB" + stt).addClass("error"); flag = 0; }
        else { $("#txtHAWB" + stt).removeClass("error"); flag = 1; }

        if (txtMAWB == "") { $("#txtMAWB" + stt).addClass("error"); flag = 0; }
        else { $("#txtMAWB" + stt).removeClass("error"); flag = 1; }
        //if (flag > 0)
        //{
        $("#txtWaybill" + (parseInt(stt) + 1)).removeAttr("disabled");
        $("#txtDateWaybill" + (parseInt(stt) + 1)).removeAttr("disabled");
        $("#txtHAWB" + (parseInt(stt) + 1)).removeAttr("disabled");
        $("#txtMAWB" + (parseInt(stt) + 1)).removeAttr("disabled");
        //}
        for (var i = 0; i < 30; i++) {
            if ($("#txtWaybill" + i).is(":disabled") == false) {
                txtWaybill = $("#txtWaybill" + i).val();
                txtDateWaybill = $("#txtDateWaybill" + i).val();
                txtHAWB = $("#txtHAWB" + i).val();
                txtMAWB = $("#txtMAWB" + i).val();
                if (txtWaybill != "" || txtDateWaybill != "" || txtHAWB != "" || txtMAWB != "")
                    str += txtWaybill + "," + txtDateWaybill + "," + txtHAWB + "," + txtMAWB + ";";
            }
        }
        $('#hdfBillLadingData').val(str);
    };

    hq.getSeachslotherLawCd = function (n) {
        accounts.ShowLoading();
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
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachsldocummentData",
                        data: {
                            n: n,
                            docummentCode: txtCode,
                            docummentName: txtName,
                            docummentDate: "",
                            content: ""
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.docummentCode) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.docummentCode + "</td><td>" + value.docummentName + "</td><td><a onclick='hq.SelectedUncstWrhCd" + n + "(\"" + value.docummentCode + "\",\"" + value.docummentName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };

    hq.SelectedUncstWrhCd1 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd1').val(code);
        $('#txtotherLawCd1').val(name);
    };

    hq.SelectedUncstWrhCd2 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd2').val(code);
        $('#txtotherLawCd2').val(name);
    };
    hq.SelectedUncstWrhCd3 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd3').val(code);
        $('#txtotherLawCd3').val(name);
    };
    hq.SelectedUncstWrhCd4 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd4').val(code);
        $('#txtotherLawCd4').val(name);
    };
    hq.SelectedUncstWrhCd5 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfotherLawCd5').val(code);
        $('#txtotherLawCd5').val(name);
    };

    hq.getSeachBank = function (n) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtIDBank = $('#txtIDBank').val();
        var txtCode = $('#txtCode').val();
        var txtName = $('#txtName').val();
        if (txtIDBank == "" || txtIDBank == undefined) txtIDBank = "";
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
                console.log(data);
                if (data) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "Declaration/getSeachBank",
                        data: {
                            n: n,
                            bankCode: txtCode,
                            bankName: txtName
                        },
                        contentType: "application/json; charset=utf-8",
                        dataType: "html",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (dt) {
                            if (dt) {
                                accounts.ShowPopup(dt, 800, 1000);
                                $('#listContainer tbody').html("");
                                if (data.Data) {
                                    $.each(data.Data, function (index, value) {
                                        if (value.bankCode) {
                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td>" + value.bankCode + "</td><td>" + value.bankName + "</td><td><a onclick='hq.SelectedBank" + n + "(\"" + value.bankCode + "\",\"" + value.bankName + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                        }
                                    });
                                }
                                else {
                                    $('#listContainer tbody').html("");
                                }
                            }
                            accounts.Unloading();
                        },
                        error: function (data) {
                            bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                            accounts.Unloading();
                        }
                    });
                }
            },
            error: function (data) {
                bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                return;
            }
        });
    };
    hq.SelectedBank1 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfbankPayCd,#txtbankPayCd').val(code);
        $('#txtbankPayCd_text').val(name);
    };
    hq.SelectedBank2 = function (code, name) {
        accounts.ClosePopup();
        $('#hdfsecSupplBankCd,#txtsecSupplBankCd').val(code);
        $('#txtsecSupplBankCd_text').val(name);
    };

    hq.getSeachFileAttack = function (n) {
        accounts.ShowLoading();
        var token = $('#hdfToken').val();
        var txtCode = $('#txtCode').val();
        if (txtCode == "" || txtCode == undefined) txtCode = "";
        if (txtCode != "" && txtCode != undefined) {
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
                    if (data) {
                        if (data.ResponseCode > 0) {
                            $.ajax({
                                type: 'GET',
                                url: Config.Url_Root + "Declaration/getSeachFileAttack",
                                data: {
                                    n: n,
                                    DeclarationID: txtCode
                                },
                                contentType: "application/json; charset=utf-8",
                                dataType: "html",
                                processData: true,
                                crossDomain: true,
                                xhrFields: { withCredentials: true },
                                cache: false,
                                success: function (dt) {
                                    if (dt) {
                                        console.log(data);
                                        accounts.ShowPopup(dt, 800, 1000);
                                        $('#listContainer tbody').html("");
                                        debugger;
                                        if (data) {
                                            var t = data.Data.Declarations;
                                            var tt = data.Data.DeclarationsLowValues;
                                            var tc = data.Data.DeclarationsHighValues;
                                            if (t.type == 1) {
                                                if (tt.fileAttachs != "" && tt.fileAttachs != null) {
                                                    var arr = tt.fileAttachs.split(';');
                                                    console.log(arr);
                                                    $.each(arr, function (index, value) {
                                                        console.log(arr);
                                                        if (value) {
                                                            var item = value.split(',');
                                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td><p><a href='" + Config.API_Login + "data/files/" + item[2] + "'>- " + item[2] + "</a></p></td><td><a onclick='hq.SelectedFileAttack" + n + "(\"" + item[2] + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                                        }
                                                    });
                                                }
                                            }
                                            else {
                                                if (tc.fileAttachs != "" && tc.fileAttachs != null) {
                                                    var arr = tc.fileAttachs.split(';');
                                                    console.log(arr);
                                                    $.each(arr, function (index, value) {
                                                        console.log(arr);
                                                        if (value) {
                                                            var item = value.split(',');
                                                            $('#listContainer tbody').append("<tr><td>" + (index + 1) + "</td><td><p><a href='" + Config.API_Login + "data/files/" + item[2] + "'>- " + item[2] + "</a></p></td><td><a onclick='hq.SelectedFileAttack" + n + "(\"" + item[2] + "\");' class='btn btn-warning'>Chọn</a></td></tr>");
                                                        }
                                                    });
                                                }
                                            }
                                        }
                                        else {
                                            $('#listContainer tbody').html("");
                                        }
                                    }
                                    accounts.Unloading();
                                },
                                error: function (data) {
                                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                                    accounts.Unloading();
                                }
                            });
                        }
                        else {
                            bootbox.alert(data.Description);
                            accounts.Unloading();
                        }
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    return;
                }
            });
        }
        else {
            $.ajax({
                type: 'GET',
                url: Config.Url_Root + "Declaration/getSeachFileAttack",
                data: { n: n },
                contentType: "application/json; charset=utf-8",
                dataType: "html",
                processData: true,
                crossDomain: true,
                xhrFields: { withCredentials: true },
                cache: false,
                success: function (dt) {
                    if (dt) {
                        accounts.ShowPopup(dt, 800, 1000);
                        accounts.Unloading();
                    }
                },
                error: function (data) {
                    bootbox.alert("Hệ thống bận, vui lòng quay lại sau!");
                    accounts.Unloading();
                }
            });
        }
    };
    hq.SelectedFileAttack1 = function (name) {
        accounts.ClosePopup();
        $('#hdfNumberFile1,#txtNumberFile1').val(name);
    };
    hq.SelectedFileAttack2 = function (name) {
        accounts.ClosePopup();
        $('#hdfNumberFile2,#txtNumberFile2').val(name);
    };
    hq.SelectedFileAttack3 = function (name) {
        accounts.ClosePopup();
        $('#hdfNumberFile3,#txtNumberFile3').val(name);
    };

    hq.OnClickTabDeclaration = function (t) {
        accounts.ShowLoading();
        setTimeout(function () {
            if (t == 1) {
                $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                $('#btnTab1').removeClass("btn-success").addClass("btn-warning");
                $('#divTab1').removeClass("noneTab");
                $('#divTab2').addClass("noneTab");
            }
            else {
                $('#btnSaveDeclaration').click();
                var count = 0;
                $('#divTab1 label.error').each(function () {
                    if ($(this).is(':visible'))
                    { count += 1; }
                })
                console.log(count);
                if (count == 0) {
                    $('#divBtn a.btn').removeClass("btn-warning").addClass("btn-success");
                    $('#btnTab2').removeClass("btn-success").addClass("btn-warning");
                    $('#divTab2').removeClass("noneTab");
                    $('#divTab1').addClass("noneTab");
                    setTimeout(function () {
                        $('body,html').animate({ scrollTop: 0 }, 800);
                    }, 500);
                }
            }
            accounts.Unloading();
        }, 500);
    };
     
})();
