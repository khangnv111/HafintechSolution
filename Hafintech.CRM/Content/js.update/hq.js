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

    //Trang Danh tờ khai
    hq.getListDeclaration = function () {
        var token = $('#hdfToken').val();
        var accountID = $("#hdfUID").val();

        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/SearchByAccountID",
            data: {
                accountID: accountID,
                type: 0,
                cstOffice: "",
                startCreatedDate: "",
                endCreatedDate: "",
                insClsCd: "",
                clearanStatus: "",
                status: 0
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
                    str += "<th class='text-center'>Số tờ khai khác</th>";
                    str += "<th class='text-center'>Ngày hàng đến</th></tr></thead><tbody>";
                    if (data.ResponseCode > 0) {
                        if (data.Data.length > 0) {
                            $.each(data.Data, function (index, value) {
                                if (value.dclId) {
                                    str += ("<tr><td>" + (index + 1) + "</td><td><a href='" + Config.Url_Root + "Declaration/Declaration" + (value.type == 1 ? "" : "HighValue") + "_Detail?decID=" + value.dclId + "&uid=" + $('#hdfUID').val() + "'>" + value.dclId + "</a></td><td>" + hq.formDateTime(value.createdDate) + "</td><td>" + hq.selectedMethodCode(value.dclKindCd) + "</td><td>" + hq.selectedCustom(value.cstOffice) + "</td><td>" + (value.declarCode != null ? value.declarCode : "") + "</td><td>" + (value.arrDate != null ? hq.formDateTime2(value.arrDate) : "") + "</td></tr>");
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
                        console.log("getDeclarationDetail: ", data.Data);
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
                        if (t.CustomsOffices != undefined && t.CustomsOffices != null && t.CustomsOffices.length > 0) {
                            $('#txtcstOfficeNm').val(t.CustomsOffices[0].cstOfficeNm);
                            $('#txtcstOffice,#hdfcstOffice').val(t.CustomsOffices[0].cstOfficeCd);
                        }
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

                        $("#dclNoHQ").val(t.dclNo);

                        $('#txthouseAwbNo').val(t.houseAwbNo);
                        $('#txtmasterAwbNo').val(t.masterAwbNo);
                        $('#txtflightNo').val(t.flightNo);
                        $('#txtitemName').val(t.itemName);
                        //trị giá tính thuế
                        if (t.listProducts != undefined && t.listProducts.length > 0) {
                            $('#txtcstValue').val(t.listProducts[0].cstValue);
                        }
                        else {
                            $('#txtcstValue').val(t.cstValue);
                        }


                        $('#txteiControlNo').val(t.eiControlNo);

                        $('#txtplaceOriginCd, #placeOriginCd').val(t.placeOriginCd);

                        if (t.Countrys != null && t.Countrys.length > 0) {
                            for (var i = 0; i < t.Countrys.length; i++) {
                                if (t.Countrys[i].countryCode == t.placeOriginCd) {
                                    $('#txtcountryNm').val(t.Countrys[i].countryName);
                                    break;
                                }
                            }
                        }

                        $('#hdfpieceUnitCd').val(t.pieceUnitCd);
                        if (t.QuantityUnits != null && t.QuantityUnits.length > 0) {
                            $('#txtpieceUnitCd_text').val(t.QuantityUnits[0].quanUnitNm);
                        }

                        $('#hdfTransport,#txtTransport').val(t.loadVesselCd);
                        $('#txtloadVesselAcNm').val(t.loadVesselAcNm);
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
                        //$('#txtcurExcRate').val(t.curExcRate);
                        $('#txtloadVesselAcNm').val(t.loadVesselAcNm);

                        $('#txtstructure').val(t.structure);
                        $('#txtnoOfDclColumn').val(t.noOfDclColumn);
                        $('#txtrepTaxCd').val(t.repTaxCd);
                        //Số tờ khai giá trị thấp
                        if (t.dclNo != undefined && t.dclNo != null)
                            $("#dclNoHQ").val(t.dclNo);

                        //Ngày đăng ký
                        var dateReg = hq.formDateTime3(t.regDate);
                        var timeReg = hq.formDateHour(t.regTime)
                        $("#regDate").val(dateReg + " " + timeReg);

                        //ngày thay đổi đăng ký regTimeOfCor 
                        var dateRegOfCor = hq.formDateTime3(t.regDateOfCor);
                        var timeRegOfCor = hq.formDateHour(t.regTimeOfCor)
                        $("#regDateOfCor").val(dateRegOfCor + " " + timeRegOfCor);

                        //phân loại kiểm tra tài liệu
                        $("#insClsCd").val(t.insClsCd);

                        //ngày cấp phép nhập khẩu
                        var datePermit = hq.formDateTime3(t.dateOfPermit);
                        var timePermit = hq.formDateHour(t.timeOfPermit)
                        $("#dateOfPermit").val(datePermit + " " + timePermit);

                        //ngày hoàn thành kiểm tra
                        var dateComplete = hq.formDateTime3(t.dateCmplInsp);
                        var timeComplete = hq.formDateHour(t.timeCmplInsp)
                        $("#dateCmplInsp").val(dateComplete + " " + timeComplete);

                        //phân loại kiểm tra sau thông quan
                        $("#clsfOfPostInsp").val(t.clsfOfPostInsp);

                        //ngày hủy khai báo hải quan
                        var dateCancel = hq.formDateTime3(t.dateImpDclCan);
                        var timeCancel = hq.formDateHour(t.timeImpDclCan)
                        $("#dateImpDclCan").val(dateCancel + " " + timeCancel);

                        //ngày chuyển xử lý khai báo bằng tay
                        var dateTran = hq.formDateTime3(t.dTrfManPrImDcl);
                        var timeTran = hq.formDateHour(t.tTrfManPrImDcl)
                        $("#dTrfManPrImDcl").val(dateTran + " " + timeTran);

                        $('#txtarrDate').val(hq.formDateTime2(t.arrDate));

                        //Địa điểm xếp hàng
                        if (t.LoadingLocations != undefined && t.LoadingLocations != "" && t.LoadingLocations != null && t.LoadingLocations.length > 0) {
                            $('#hdfloadLocCd,#txtloadLocCd').val(t.LoadingLocations[0].loadLocCd);
                            $('#txtloadLocNm').val(t.LoadingLocations[0].loadLocNm);
                        }


                        //Địa điểm dỡ hàng
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


                        $('#txtmarksAndNos').val(t.marksAndNos);
                        $('#sldestTransPlace,#txtdestTransPlace').val(t.destinationTrs);
                        $('#txtArrDateOfTrs').val(hq.formDateTime2(t.arrDateOfTrs));
                        $('#hdfcstWrhCd,#txtcstWrhCd').val(t.cstWrhCd);
                        if (t.CustomsWarehouses != null && t.CustomsWarehouses.length > 0) {
                            $('#txtcstWrhCd_text').val(t.CustomsWarehouses[0].cstWrhNm);
                        }
                        $('#slresultInsCd,#txtresultInsCd').val(t.resultInsCd);
                        $('#txtnoHandledCtn').val(t.noHandledCtn);

                        $("#txthdfcountryCd, #hdfcountryCd").val(t.countryCd);
                        $("#txtaddress1Street").val(t.address1Street);
                        $("#txtaddress2Street").val(t.address2Street);
                        $("#txtaddress3CityNm").val(t.address3CityNm);
                        $("#txtcountryNmAddress").val(t.countryNm);

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

                        //Trị giá hóa đơn
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

                        if (t.lsTransInfo != null && t.lsTransInfo.length > 0) {
                            $.each(t.lsTransInfo, function (index, value) {
                                txtTransshipmentPlace1
                                $('#slTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentPlace' + (index + 1)).val(value.trnLocTrs);
                                $('#txtTransshipmentarrDate' + (index + 1)).val(value.arrDateTrnLoc);
                                $('#txtTransshipmentStartDate' + (index + 1)).val(value.strDateTrnLoc);
                            });
                        }

                        $('#txtbankPayIssYear').val(t.bankPayIssYear);
                        $('#txtbankPaySign').val(t.bankPaySign);
                        $('#txtbankPayNo').val(t.bankPayNo);
                        $('#slextPayDueCd,#txtextPayDueCd').val(t.extPayDueCd);
                        $('#hdfsecSupplBankCd,#txtsecSupplBankCd').val(t.secSupplBankCd);
                        $('#txtissuedYear').val(t.issuedYear);
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
                        //$('#slpaymentCls').val(t.TermOfPayments[0].termOfPay);
                        $('#txtstructure').val(t.structure);
                        $('#txtnoOfDclColumn').val(t.noOfDclColumn);
                        $('#txtrepTaxCd').val(t.repTaxCd);
                        $('#slDestinationTrs').val(t.destinationTrs);
                        $('#slresultInsCd').val(t.resultInsCd);


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
                        if (t.lsCargoNo != undefined && t.lsCargoNo != null) {
                            if (t.lsCargoNo.length > 0) {
                                $.each(t.lsCargoNo, function (index, value) {
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
                debugger;
                if (data) {
                    console.log(data);
                    if (data.ResponseCode > 0) {
                        $('#txtCMND').val(data.Data.Identity);
                        $('#txtFullName').val(data.Data.FullName);
                        $('#txtPhone').val(data.Data.Mobile);
                        $('#txtAddress').val(data.Data.Address);
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
                console.log(data);
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
    hq.permitType1OnChange = function () {
        var txtpermitType1 = $("#slpermitType1").val();
        $("#txtpermitType1").val(txtpermitType1);
    };
    hq.permitType2OnChange = function () {
        var txtpermitType2 = $("#slpermitType2").val();
        $("#txtpermitType2").val(txtpermitType2);
    };
    hq.permitType3OnChange = function () {
        var txtpermitType3 = $("#slpermitType3").val();
        $("#txtpermitType3").val(txtpermitType3);
    };
    hq.permitType4OnChange = function () {
        var txtpermitType4 = $("#slpermitType4").val();
        $("#txtpermitType4").val(txtpermitType4);
    };
    hq.permitType5OnChange = function () {
        var txtpermitType5 = $("#slpermitType5").val();
        $("#txtpermitType5").val(txtpermitType5);
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
                            $('#txtbankPayCd_text').val(data.Data[0].customsName);
                        }
                        else {
                            $('#txtsecSupplBankCd_text').val(data.Data[0].customsName);
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
    hq.GuaranteeReasonOnChange = function () {
        var txtreasonCd = $("#slreasonCd").val();
        $("#txtreasonCd").val(txtreasonCd);
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
                        $('#slresultCdOfIns').append($('<option/>', {
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
        var txtresultCdOfIns = $("#slresultCdOfIns").val();
        $("#txtresultCdOfIns").val(txtresultCdOfIns);
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
                        $('#slclsOrg').append($('<option/>', {
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
    hq.getMethod_TC = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetDeclarationKind",
            data: {
                dclKindCd: "",
                dclKindNm: "",
                dclKindCdOld: "",
                dclKindCdOld: ""
            },
            headers: {
                "Authorization": "Bearer " + token
            },
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data) {
                    $.each(data.Data, function (index, value) {
                        $('#slTransshipmentPlace1,#slTransshipmentPlace2,#slTransshipmentPlace3').append($('<option/>', {
                            value: value.dclKindCd,
                            text: value.dclKindNm
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
        var txtextPayDueCd = $("#slextPayDueCd").val();
        $("#txtextPayDueCd").val(txtextPayDueCd);
    };

    ///////////////////////////////////////////////////


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
        var txtcstOffice = $("#slCustom").val();
        $("#txtcstOffice").val(txtcstOffice);
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
                //console.log(data);
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

    hq.selectedMethodCode = function (code) {
        var str = code;
        if (code == null || code == "" || code == undefined) {
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

    hq.selectedCustom = function (code) {
        var str = code;
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
        if (date == null || date == undefined)
            return "";
        var d = new Date(date);
        var currDate = d.getDate();
        var currMonth = d.getMonth() + 1;
        var currYear = d.getFullYear();
        return currMonth + "/" + currDate
            + "/" + currYear;
    };

    hq.formDateTime = function (date) {
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
                    if ($(this).is(':visible')) { count += 1; }
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

    hq.CheckUrl = function (str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return pattern.test(str);
    };

    hq.caseStatusDeclaration = function (str) {
        var _des = "";
        switch (str) {
            case 0:
                _des = "Đang thêm mới";
                break;
            case 1:
                _des = "Đã đăng ký";
                break;
            case 2:
                _des = "Sửa";
                break;
            case 3:
                _des = "Đã hủy";
                break;
            default:
                _des = "--(" + str + ")--";
                break;
        }
        return _des;
    };
    //Get mã đơn vị tính
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
    };

    //Miễn giảm thuế không chịu nhập thuế
    hq.getReductionImportTax = function () {
        var token = $('#hdfToken').val();
        $.ajax({
            type: 'GET',
            url: Config.API_Login + "tax/GetReductionImportTax",
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
                        $('#slrdcImpTaxCd,#sloTaxTypeCd1,#sloTaxRdcCd1,#sloTaxTypeCd2,#sloTaxRdcCd2,#sloTaxTypeCd3,#sloTaxRdcCd3,#sloTaxTypeCd4,#sloTaxRdcCd4,#sloTaxTypeCd5,#sloTaxRdcCd5').append($('<option/>', {
                            value: value.rdcImpTaxCd,
                            text: value.rdcImpTaxNm
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
    //get mã đồng tiền 
    hq.getCurrencys = function () {
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
    };

    //Mã biểu thuế nhập khẩu
    hq.getImportTaxClassification = function () {
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
    };

    //Đơn vị của đơn giá hóa đơn và số lượng
    hq.getQuantityUnit = function () {
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
    };

    //Mã đồng tiền trị giá tính thuế
    hq.getAbsoluteDutyRateUnit = function () {
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
                            value: value.absDutyCurCd,
                            text: value.absDutyCurCd
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


})();
