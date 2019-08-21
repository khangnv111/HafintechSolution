(function () {
    window.hateco = {};

    hateco.InsertType = 1;

    //  TÌM KIẾM DS TỜ KHAI THEO BỘ LỌC
    hateco.Declaration_Customs_List = function () {
        var dukien_tu = $("#dukien_tu").val();
        var dukien_den = $("#dukien_den").val();
        var ve_tu = $("#ve_tu").val();
        var ve_den = $("#ve_den").val();
        var to_khai = $("#to_khai").val();
        var to_khai_status = $("#to_khai_status").val();
        var XN_code = $("#XN_code").val();
        var Container_code = $("#Container_code").val();

        utils.loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "danh-sach-to-khai_Part",
            data: {
                GiveUserName: GiveUserName,
                ReceiveUserName: ReceiveUserName,
                Fromdate: Fromdate,
                Todate: Todate,
                StateType: StateType,
                TranferType: TranferType
            },
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                //console.log(JSON.stringify(data));
                utils.unLoading();
                $("#lsgd-part").html(data);

                CommonFunc.CollapseElement('lsgd-part');
                CommonFunc.TablePaging('lsgd-paging');
            },
            error: function (data) {
                return;
            }
        });
    };

    //  nhập mới tờ khai
    hateco.Declaration_Add = function () {
        var dcode_add = $("#dcode_add").val();
        var vehicle_input = $("#vehicle_input").val();
        var place_input = $("#place_input").val();
        var dukien_ngayve_add = $("#dukien_ngayve_add").val();
        //var container_count_add = $("#container_count_add").val();
        var dn_name_add = $("#dn_name_add").val();
        var dn_code_add = $("#dn_code_add").val();
        var custom_input = $("#custom_input").val();
        var Description_Add = $("#Description_Add").val();
        var ngaymo_add = $("#ngaymo_add").val();

        var data_placeSelectID = $("#place_select option:selected").attr('data-placeSelectID');
        var data_placeSelectName = $("#place_select option:selected").attr('data-placeSelectName');
        var data_vehicleSelectName = $("#vehicle_select option:selected").attr('data-vehicleSelectName');
        var data_customSelectName = $("#custom_select option:selected").attr('data-customSelectName');

        if (dcode_add == null || dcode_add == "" || dcode_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập Số tờ khai !', 0);
            $("#dcode_add").focus();
            return;
        }
        if (dcode_add.indexOf(' ') > 0) {
            funbuttons.Declaration_Error('Số tờ khai không có khoảng trống, mời nhập lại !', 0);
            $("#dcode_add").focus();
            return;
        }
        if (dukien_ngayve_add == null || dukien_ngayve_add == "" || dukien_ngayve_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập ngày về !', 0);
            $("#dukien_ngayve_add").focus();
            return;
        }
        //if (container_count_add == null || container_count_add == "" || container_count_add == undefined) {
        //    funbuttons.Declaration_Error('Bạn chưa nhập số lượng Container !');
        //    $("#container_count_add").focus();
        //    return;
        //}
        if (dn_name_add == null || dn_name_add == "" || dn_name_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập tên doanh nghiệp !', 0);
            $("#dn_name_add").focus();
            return;
        }
        if (dn_code_add == null || dn_code_add == "" || dn_code_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập mã doanh nghiệp !', 0);
            $("#dn_code_add").focus();
            return;
        }

        var _lsContainerCode = '', _lsLeadCode = '', txtSealedPackage = '', _containerItem = '', container_data = '';

        for (var i = 0; i <= 39; i++) {
            _lsContainerCode = $("#txtContainer" + i).val();
            _lsLeadCode = $("#txtLeadCode" + i).val();
            txtSealedPackage = $("#txtSealedPackage" + i).val();

            if (_lsContainerCode != null && _lsContainerCode != "" && _lsContainerCode != undefined
                && _lsLeadCode != null && _lsLeadCode != "" && _lsLeadCode != undefined) {

                //_containerItem = $("#txtContainer" + i).val() + ',' + $("#txtLeadCode" + i).val() + ',' + $("#txtSealedPackage" + i).val();
                _containerItem = _lsContainerCode + ',' + _lsLeadCode + ',' + txtSealedPackage;

                container_data += _containerItem + ';';
            }
            //else if ((_lsContainerCode != null && _lsContainerCode != "" && _lsContainerCode != undefined)
            //    && (_lsLeadCode == null || _lsLeadCode == "" || _lsLeadCode == undefined)) {
            //    funbuttons.Declaration_Error('Bạn chưa nhập đủ mã Container / Kiện hoặc Mã Niêm Phong HQ tương ứng !, mời kiểm tra lại .', 0);
            //    return;
            //    break;
            //}
            else if ((_lsContainerCode == null || _lsContainerCode == "" || _lsContainerCode == undefined)
                && (_lsLeadCode != null && _lsLeadCode != "" && _lsLeadCode != undefined)) {
                funbuttons.Declaration_Error('Bạn chưa nhập đủ mã Container / Kiện hoặc Mã Niêm Phong HQ tương ứng !, mời kiểm tra lại .', 0);
                return;
                break;
            }
        }
        container_data = container_data.slice(0, -1);

        var _dateNow = new Date().toLocaleDateString();;

        var dukien_ngayve_add_parse = new Date(dukien_ngayve_add).toLocaleDateString();;
        if (dukien_ngayve_add_parse < _dateNow) {
            funbuttons.Declaration_Error('Ngày dự kiến về phải lớn hơn ngày hiện tại !', 0);
            return;
        }

        if (hateco.InsertType == 1) {
                if (container_data == null || container_data == "" || container_data == undefined) {
                funbuttons.Declaration_Error('Bạn chưa Số Container và Mã Chì !', 0);
                return;
            }
        }
        else if(hateco.InsertType == 2){
            container_data = $("#dataFileExcelInput").val();
            container_data = container_data.slice(0, -1);
        }

        var _dataFileDocsInput = $("#dataFileDocsInput").val();

        var SP_Declaration_Customs_List = {
            "Declaration_Code": dcode_add,
            "Corporation_Code": dn_code_add,
            "Corporation_Name": dn_name_add,
            "Place_Loading_ID": data_placeSelectID,
            "Place_Loading_Code": place_input,
            "Place_Loading_Name": data_placeSelectName,
            "Vehicle_ID": vehicle_input,
            "Vehicle_Name": data_vehicleSelectName,
            "Expect_Date_Return": dukien_ngayve_add,
            "Container_Data": container_data,
            "Customs_Create_Code": custom_input,
            "Customs_Create_Name": data_customSelectName,
            "Date_Register": ngaymo_add,
            "Description": Description_Add,
            "File_Include_Path": _dataFileDocsInput,
            "TypeInsert": hateco.InsertType
        };

        utils.loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "api/Declaration_Func_Insert",
            data: SP_Declaration_Customs_List,
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));
                utils.unLoading();

                if (data >= 1) {
                    funbuttons.Declaration_Error('Tạo tờ khai thành công, hệ thống chuyển về trang danh sách trong giây lát ... ', 1);

                    setTimeout(function () {
                        window.location = Config.Url_Root + 'danh-sach-to-khai';
                    }, 2000);
                }
                else if (data == -2601) {
                    funbuttons.Declaration_Error('Mã Tờ Khai Đã Tồn Tại, Kiểm Tra Lại Thông Tin', 0);
                }
                else {
                    funbuttons.Declaration_Error('Tạo tờ khai thất bại, liên hệ với admin để kiểm tra lại ! ', 0);
                }

                return;
            },
            error: function (data) {
                return;
            }
        });
    };

    //  update tờ khai
    hateco.Declaration_Update = function () {
        var dcode_add = $("#dcode_add").val();
        var vehicle_input = $("#vehicle_input").val();
        var place_input = $("#place_input").val();
        var dukien_ngayve_add = $("#dukien_ngayve_add").val();
        //var container_count_add = $("#container_count_add").val();
        var dn_name_add = $("#dn_name_add").val();
        var dn_code_add = $("#dn_code_add").val();

        var custom_input = $("#custom_input").val();
        var Description_Add = $("#Description_Add").val();
        var ngaymo_add = $("#ngaymo_add").val();

        var data_placeSelectID = $("#place_select option:selected").attr('data-placeSelectID');
        var data_placeSelectName = $("#place_select option:selected").attr('data-placeSelectName');
        var data_vehicleSelectName = $("#vehicle_select option:selected").attr('data-vehicleSelectName');
        var data_customSelectName = $("#custom_select option:selected").attr('data-customSelectName');

        if (dcode_add == null || dcode_add == "" || dcode_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập Số tờ khai !', 0);
            $("#dcode_add").focus();
            return;
        }
        if (dukien_ngayve_add == null || dukien_ngayve_add == "" || dukien_ngayve_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập ngày về !', 0);
            $("#dukien_ngayve_add").focus();
            return;
        }
        //if (container_count_add == null || container_count_add == "" || container_count_add == undefined) {
        //    funbuttons.Declaration_Error('Bạn chưa nhập số lượng Container !');
        //    $("#container_count_add").focus();
        //    return;
        //}
        if (dn_name_add == null || dn_name_add == "" || dn_name_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập tên doanh nghiệp !', 0);
            $("#dn_name_add").focus();
            return;
        }
        if (dn_code_add == null || dn_code_add == "" || dn_code_add == undefined) {
            funbuttons.Declaration_Error('Bạn chưa nhập mã doanh nghiệp !', 0);
            $("#dn_code_add").focus();
            return;
        }

        var _lsContainerCode = '', _lsLeadCode = '', _containerItem = '', container_data = '';

        for (var i = 0; i <= 39; i++) {
            if ($("#txtContainer" + i).val() != null && $("#txtContainer" + i).val() != "" && $("#txtContainer" + i).val() != undefined)
                //&& $("#txtLeadCode" + i).val() != null && $("#txtLeadCode" + i).val() != "" && $("#txtLeadCode" + i).val() != undefined)
            {

                _containerItem = $("#txtContainerID" + i).val() + ',' + $("#txtContainer" + i).val() + ',' + $("#txtLeadCode" + i).val() + ',' + $("#txtSealedPackage" + i).val();;

                container_data += _containerItem + ';';
            }
        }
        container_data = container_data.slice(0, -1);

        console.log('container_data: ' + container_data);

        var _dataFileDocsInput = $("#dataFileDocsInput").val();

        var SP_Declaration_Customs_List = {
            "Declaration_Code": dcode_add,
            "Corporation_Code": dn_code_add,
            "Corporation_Name": dn_name_add,
            "Place_Loading_ID": data_placeSelectID,
            "Place_Loading_Code": place_input,
            "Place_Loading_Name": data_placeSelectName,
            "Vehicle_ID": vehicle_input,
            "Vehicle_Name": data_vehicleSelectName,
            "Expect_Date_Return": dukien_ngayve_add,
            "Container_Data": container_data,
            "Customs_Create_Code": custom_input,
            "Customs_Create_Name": data_customSelectName,
            "Date_Register": ngaymo_add,
            "Description": Description_Add,
            "File_Include_Path": _dataFileDocsInput
        };

        utils.loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "api/Declaration_Func_Update",
            data: SP_Declaration_Customs_List,
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));
                utils.unLoading();

                if (data >= 1) {
                    funbuttons.Declaration_Error('Cập Nhật tờ khai thành công, hệ thống chuyển về trang danh sách trong giây lát ... ', 1);

                    setTimeout(function () {
                        window.location = Config.Url_Root + 'danh-sach-to-khai';
                    }, 2000);
                }
                else {
                    funbuttons.Declaration_Error('Cập Nhật tờ khai thất bại, liên hệ với admin để kiểm tra lại ! ', 0);
                }

                return;
            },
            error: function (data) {
                return;
            }
        });
    };

    //  Tìm kiếm tờ khai
    hateco.DeclarationSearch = function () {
        var dukien_tu = $("#dukien_tu").val();
        var dukien_den = $("#dukien_den").val();
        var ve_tu = $("#ve_tu").val();
        var ve_den = $("#ve_den").val();
        var to_khai = $("#to_khai").val();
        var to_khai_status = $("#to_khai_status").val();
        var XN_code = $("#XN_code").val();
        var Container_code = $("#Container_code").val();
        var to_khai_da_tao = document.querySelector('#to_khai_da_tao').checked;
        

        var Declaration_Customs_Search_Input = {
            "From_Expect_Date_Return": dukien_tu,
            "To_Expect_Date_Return": dukien_den,
            "From_Date_Entry": ve_tu,
            "To_Date_Entry": ve_den,
            "Declaration_Code": to_khai,
            "Corporation_Code": XN_code,
            "Container_Code": Container_code,
            "Status": to_khai_status,
            "Is_In_My_Created": to_khai_da_tao
        };

        utils.loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "hateco/SP_Declaration_Customs_Search",
            data: Declaration_Customs_Search_Input,
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                //console.log(JSON.stringify(data));
                utils.unLoading();

                $("#tbl-de-list").html(data);

                return;
            },
            error: function (data) {
                return;
            }
        });
    };

    //  cập nhật các container và hải quan ra chỉ thị
    hateco.HQCreateUpdateContainer = function () {
        var place_update_select = $("#place_update_select").val();
        var d_status_select = $("#d_status_select").val();
        var dcode_add = $("#dcode_add").val();
        var chithi_tit = $("#chithi_tit").val();
        var chithi_content = $("#chithi_content").val();
        var container_count = $("#container_count").val();

        var Container_Data = $("#ContainerID2Update").val();    //  = '';

        //for (var i = 0; i < container_count; i++) {
        //    if ($('#checkbox-' + i + ':checked').val() != "" && $('#checkbox-' + i + ':checked').val() != null && $('#checkbox-' + i + ':checked').val() != undefined) {
        //        var _idContainer = $("#checkbox-" + i).attr('data-containerid');
        //        Container_Data += _idContainer + ',';
        //    }
        //}

        //console.log('Container_Data : ' + Container_Data);

        //if (Container_Data != "" && Container_Data != null && Container_Data != undefined)
        //{
        //    Container_Data = Container_Data.slice(0, -1);
        //}
        //else {
        //    funbuttons.Declaration_Error('Bạn chưa chọn Container nào để Cập Nhật !', 0);
        //    return;
        //}

        if (chithi_tit == "" || chithi_tit == null || chithi_tit == undefined) {
            funbuttons.Declaration_Error('Bạn chưa Nhập Tiêu Đề cho chỉ thị !', 0);
            return;
        }

        if (chithi_content == "" || chithi_content == null || chithi_content == undefined) {
            funbuttons.Declaration_Error('Bạn chưa Nhập Nội Dung cho chỉ thị !', 0);
            return;
        }

        //console.log(Container_Data);

        var Direction_HQ_Create = {
            "Customs_ID": 1,
            "Warehouse_ID": 1,
            "Declaration_Code": dcode_add,
            //"Area_Code": place_update_select,
            "Status": d_status_select,
            "Container_Data": Container_Data,
            "Title": chithi_tit,
            "Content": chithi_content,
            "Area_ID": place_update_select
        };

        utils.loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "api/Declaration_Func_HQ_Create",
            data: Direction_HQ_Create,
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));
                utils.unLoading();

                if (data >= 1) {
                    funbuttons.Declaration_Error('Cập Nhật Thành Công, hệ thống tải lại trang danh sách trong giây lát ... ', 1);

                    setTimeout(function () {
                        window.location.href = Config.Url_Root + "Hateco/Direction_Detail?dcode=" + dcode_add;
                    }, 2000);
                }
                else {
                    funbuttons.Declaration_Error('Cập Nhật Thất Bại, kiểm tra lại các thông tin hoặc liên hệ với admin để kiểm tra lại ! ', 0);
                }
                return;
            },
            error: function (data) {
                return;
            }
        });
    };

    //  fun thêm container
    hateco.AddContainer = function () {
        var container_code_add = $("#container_code_add").val();
        var lead_code_add = $("#lead_code_add").val();
        var txtSealedPackage_add = $("#txtSealedPackage_add").val();
        var stt = $("#tbl_container_edit").find('tr').length - 1;

        utils.loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "hateco/ContainerAdd",
            data: {
                container_code: container_code_add,
                lead_code: lead_code_add,
                stt: stt,
                txtSealedPackage_add: txtSealedPackage_add
            },
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));
                utils.unLoading();

                $('#tbl_body_container_edit').append(data);

                return;
            },
            error: function (data) {
                return;
            }
        });
    };

    //  button sửa ds container
    hateco.ContainerListUpdateView = function (stt) {
        var container_code_update = $("#txtContainer" + stt).val();
        var lead_code_update = $("#txtLeadCode" + stt).val();
        var txtSealedPackage_update = $("#txtSealedPackage" + stt).val();

        $("#stt_update_hidden").val(stt);
        $("#container_code_button_update").val(container_code_update);
        $("#lead_code_button_update").val(lead_code_update);
        $("#txtSealedPackage_update").val(txtSealedPackage_update);
        utils.Background_cen();
        $("#ViewContainerUpdate").show();
    };

    //  ViewContainerUpdate cancel buttion
    hateco.ViewContainerUpdateCancelButton = function () {
        $("#ViewContainerUpdate").hide();
        utils.unBackground_cen();
    };

    //  ViewContainerUpdate conffirm button
    hateco.ViewContainerUpdateConfirmButton = function () {
        stt = $("#stt_update_hidden").val();
        var container_code_update = $("#container_code_button_update").val();
        var lead_code_update = $("#lead_code_button_update").val();
        var txtSealedPackage_update = $("#txtSealedPackage_update").val();

        $("#txtContainer" + stt).val(container_code_update);
        $("#txtLeadCode" + stt).val(lead_code_update);
        $("#txtSealedPackage" + stt).val(txtSealedPackage_update);

        $("#ViewContainerUpdate").hide();
        utils.unBackground_cen();
    };

    //  button hủy
    hateco.ContainerHideButton = function (stt) {
        $("#tr_rows" + stt).remove();
    };

    //  submit file excel change
    hateco.SubmitFileExcelAdd = function (e) {
        //$("#tbody_container_add").remove();
        $("#tbody_container_add").html('');
        $('#form_excel_file_input').submit();     //  Config.Url_Root + 'hateco/ExcelFileInput',

    };

    //  FILE EXCECL - submit file excel list container
    hateco.ExcelFileContainerSubmit = function () {
        //$("#tbody_container_add").remove();
        $("#tbody_container_add").html('');
        //$('#form_excel_file_input').submit();     //  Config.Url_Root + 'hateco/ExcelFileInput',

        $.ajax({
            url: Config.Url_Root + 'hateco/ExcelFileInput2',
            type: 'POST',
            data: new FormData($('form')[1]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            //$('progress').attr({
                            //    value: e.loaded,
                            //    max: e.total,
                            //});
                            //console.log(e);
                        }
                    }, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log('data: ' + data);

                if (data != null && data != '' && data != undefined) {
                    $("#dataFileExcelInput").val(data);
                    hateco.ResponExcelFileInput('1');
                    hateco.InsertType = 2;
                    //  pre-view giao diện
                    hateco.PreviewDataExcel();

                }
                else {
                    hateco.ResponExcelFileInput('0');
                }
            }
        });
    };

    //  phản hồi khi nhập file excel
    hateco.ResponExcelFileInput = function (res) {
        if (res == "1") {
            $.gritter.add({
                title: 'Nhập Dữ Liệu Từ File Excel',
                text: 'Thành Công',
                sticky: true
            });

            $(".gritter-item").css("background", "#62f506")
            //$("#tbody_container_add").remove();
            $("#tbody_container_add").html('');
        }
        else {
            $.gritter.add({
                title: 'Nhập Dữ Liệu Từ File Excel',
                text: 'Thất Bại ! Mời Kiểm Tra Lại Định Dạng File Và Dữ Liệu Trong File !',
                sticky: true
            });
        }
    };

    //  phản hồi chọn tiếp nhận tờ khai
    hateco.ResponCustoms_Register = function (res) {
        if (res == "1") {
            $.gritter.add({
                title: 'Tiếp Nhận Tờ Khai',
                text: 'Thành Công',
                sticky: true
            });
            $(".gritter-item").css("background", "#62f506")
            setTimeout(function () {
                window.location.reload();
            }, 2000);
        }
        else {
            $.gritter.add({
                title: 'Tiếp Nhận Tờ Khai',
                text: 'Thất Bại ! Liên Hệ Với Admin!',
                sticky: true
            });
        }
    };

    //  phản hồi khi nhập file văn bản liên quan
    hateco.ResponFileInputReference = function (res) {
        if (res == "1") {
            $.gritter.add({
                title: 'Nhập Dữ Liệu File Văn Bản Liên Quan',
                text: 'Thành Công',
                sticky: true
            });

            $(".gritter-item").css("background", "#62f506");
        }
        else {
            $.gritter.add({
                title: 'Nhập Dữ Liệu File Văn Bản Liên Quan',
                text: 'Thất Bại ! Mời Kiểm Tra Lại Định Dạng File Và Dữ Liệu Trong File !',
                sticky: true
            });
        }
    };

    //  XÓA tờ khai popup
    hateco.Declaration_Customs_Delete = function (did) {
        utils.Background_cen();
        //$("#ViewContainerRemove").show();
        //$("#did_remove").val(did);

        bootbox.confirm("Bạn Có Chắc Chắn Muốn Xóa Tờ Khai Này ?", function (result) {
            if (result == true) {
                hateco.Declaration_Customs_Delete_Confirm(did);
            }
            else {
                hateco.Declaration_Customs_Delete_Cancel();
            }
        });

    };

    //  Xác nhận XÓA tờ khai popup
    hateco.Declaration_Customs_Delete_Confirm = function (did_remove) {
        utils.Background_cen();
        console.log(did_remove);
        utils.loading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "hateco/SP_Declaration_Customs_Delete",
            data: {
                _Declaration_ID: did_remove
            },
            contentType: "application/json; charset=utf-8",
            dataType: "html",
            //processData: true,
            //crossDomain: true,
            //xhrFields: { withCredentials: true },
            //cache: false,
            success: function (data) {
                //console.log(JSON.stringify(data));
                //utils.unLoading();
location.reload();
                return;
            },
            error: function (data) {
                utils.unBackground_cen();
                return;
            }
        });

    };

    //  Cancel XÓA tờ khai popup
    hateco.Declaration_Customs_Delete_Cancel = function () {
        utils.unBackground_cen();
        $("#ViewContainerRemove").hide();
    };

    //  HỦY TỜ KHAI -VIEW
    hateco.Declaration_Customs_Cancel = function (did) {
        utils.Background_cen();
        $("#ViewContainerCancel").show();
        $("#did_cancel").val(did);
    };

    //  HỦY TỜ KHAI -FUNC
    hateco.Declaration_Customs_Cancel_Confirm = function () {
        utils.Background_cen();
        //$("#ViewContainerCancel").show();
        var did_cancel = $("#did_cancel").val();
        var did_description = $("#did_description").val();

        utils.loading();
        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "hateco/SP_Declaration_Customs_Cancel",
            data: {
                _Declaration_ID: did_cancel,
                Description: did_description
            },
            dataType: "text",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));
                utils.unLoading();

                $("#d_cancel_confirm_div").hide();

                if (data >= 1) {
                    $("#log_cancel_d").html('Hủy tờ khai Thành Công, Hệ Thống sẽ đóng Cửa sổ nhỏ trong giây lát !');
                    $("#log_cancel_d").css("color", "green");

                    setTimeout(function () {
                        $("#ViewContainerCancel").hide();
                        utils.unBackground_cen();

                        hateco.DeclarationSearch();
                    }, 2000);
                }
                else {
                    $("#log_cancel_d").html('Hủy tờ khai Thất Bại, Liên Hệ với Admin để kiểm tra !');
                    $("#log_cancel_d").css("color", "red");
                    setTimeout(function () {
                        $("#ViewContainerCancel").hide();
                        utils.unBackground_cen();
                    }, 2000);
                }

                return;
            },
            error: function (data) {
                $("#ViewContainerCancel").hide();
                utils.unBackground_cen();
                return;
            }
        });

    };

    //  Cancel HỦY tờ khai popup
    hateco.Declaration_Customs_Cancel_Cancel = function () {
        utils.unBackground_cen();
        $("#ViewContainerCancel").hide();
    };

    //  show luồng trao đổi giữa 2 bên
    hateco.CommunicateDirection = function (Direction_ID) {
        $("#noti-tab1").click();

        $.ajax({
            type: 'POST',
            url: Config.Url_Root + "hateco/Commnunicate_Direction",
            data: {
                Direction_ID: Direction_ID
            },
            dataType: "html",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));

                $("#communicate_direction").html(data);
                $("#communicate_direction").show();

                $("#msg-box").focus();
                return;
            },
            error: function (data) {
                return;
            }
        });

    };

    //  phản hồi của hải quan
    hateco.CommunicateDirectionHQReply = function () {
        var ComDirectionID = $("#ComDirectionID").val();
        var msg_box = $("#msg-box").val();

        utils.loading();
        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "api/SP_Direction_HQ_Reply",
            data: {
                _Direction_ID: ComDirectionID,
                _Message: msg_box
            },
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));
                utils.unLoading();

                if (data >= 1) {
                    $.gritter.add({
                        title: 'Phản Hồi Từ Phía Hải Quan',
                        text: 'Thành Công',
                        sticky: true
                    });

                    $("#msg-box").val('');
                    $(".gritter-item").css("background", "#62f506")
                }
                else {
                    $.gritter.add({
                        title: 'Phản Hồi Từ Phía Hải Quan',
                        text: 'Thất Bại ! Mời Kiểm Tra Lại Nội Dung Hoặc Liên Hệ Với Admin Để Xử Lý !',
                        sticky: true
                    });
                }

                return;
            },
            error: function (data) {
                return;
            }
        });
    };

    //  xuất file excel
    hateco.Declaration_Customs_List_ExportExcel = function () {
        var dukien_tu = $("#dukien_tu").val();
        var dukien_den = $("#dukien_den").val();
        var ve_tu = $("#ve_tu").val();
        var ve_den = $("#ve_den").val();
        var to_khai = $("#to_khai").val();
        var to_khai_status = $("#to_khai_status").val();
        var XN_code = $("#XN_code").val();
        var Container_code = $("#Container_code").val();

        window.location.href = Config.Url_Root + "danh-sach-to-khai_ExportExcel?From_Expect_Date_Return=" + dukien_tu + "&To_Expect_Date_Return=" + dukien_den
            + "&From_Date_Entry=" + ve_tu + "&To_Date_Entry=" + ve_den + "&Declaration_Code=" + to_khai + "&Corporation_Code=" + XN_code
            + "&Container_Code=" + Container_code;

    };

    //  nhập văn bản liên quan  FileReferemceInput
    hateco.FileReferemceInput = function () {
        $('#form_docs_file_input').submit();
    };

    //  FILE DOCS - nhập văn bản liên quan 
    hateco.FileReferenceInput2 = function () { 

        $.ajax({
            url: Config.Url_Root + 'hateco/FileReferenceInput2',
            type: 'POST',
            data: new FormData($('form')[0]),
            cache: false,
            contentType: false,
            processData: false,
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                        if (e.lengthComputable) {
                            //$('progress').attr({
                            //    value: e.loaded,
                            //    max: e.total,
                            //});
                            //console.log(e);
                        }
                    }, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);
                if (data != null && data != '' && data != undefined) {
                    $("#dataFileDocsInput").val(data);
                    hateco.ResponFileInputReference('1');
                }
                else {
                    hateco.ResponFileInputReference('0');
                }
            }
        });
    };

    //  xem lại dữ liệu của người dùng đẩy lên
    hateco.PreviewDataExcel = function () {
        var dataFileExcelInput = $("#dataFileExcelInput").val();
        dataFileExcelInput = dataFileExcelInput.slice(0, -1);

        var _html = '';

        var arrData = dataFileExcelInput.split(';');

        for (var i = 0; i < arrData.length; i++)
        {
            var _stt = parseInt(i) + 1;
            var _arrTmp = arrData[i].split(',');
            var _htmlTmp = '<tr>'+
                                '<td>' + _stt+'</td>'+
                                '<td> <input type= "text" class="form-control" disabled="disabled" value="'+ _arrTmp[0] +'" ></td> '+
                                '<td> <input type="text" class="form-control" disabled="disabled" value="' + _arrTmp[1] + '"></td>' +
                                '<td> <input type="text" class="form-control" disabled="disabled" value="' + _arrTmp[2] + '"></td>' +
                            '</tr>';
            _html += _htmlTmp;
        }
        $("#tbody_container_add").html(_html);
    };

    //  nhận tờ khai - FUNC
    hateco.Customs_Register = function (did) {
        //  

        $.ajax({
            type: 'GET',
            url: Config.Url_Root + "api/FuncSP_Declaration_Customs_Register",
            data: {
                did: did
            },
            dataType: "json",
            processData: true,
            crossDomain: true,
            xhrFields: { withCredentials: true },
            cache: false,
            success: function (data) {
                console.log(JSON.stringify(data));
                utils.unLoading();

                if (data >= 1) {
                    hateco.ResponCustoms_Register('1');
                    setTimeout(function () {
                        window.location = Config.Url_Root + 'danh-sach-to-khai';
                    }, 2000);
                }
                else {
                    hateco.ResponCustoms_Register('0');
                }

                return;
            },
            error: function (data) {
                return;
            }
        });

    };

    hateco.resendDirection = function (dcode) {
        bootbox.confirm({
            message: "Bạn có muốn chuyển lại Tờ Khai này ?? ",
            buttons: {
                confirm: {
                    label: 'Yes',
                    className: 'btn-info'
                },
                cancel: {
                    label: 'No',
                    className: 'btn'
                }
            },
            callback: function (result) {
                console.log('This was logged in the callback: ' + result);
                if (result) {
                    $.ajax({
                        type: 'GET',
                        url: Config.Url_Root + "api/FuncSP_Declaration_Customs_UnRegister",
                        data: {
                            dcode: dcode
                        },
                        dataType: "json",
                        processData: true,
                        crossDomain: true,
                        xhrFields: { withCredentials: true },
                        cache: false,
                        success: function (data) {
                            console.log(JSON.stringify(data));
                            if (data > 0) {
                                bootbox.alert("Chuyển lại tờ khai Thành Công ! Hệ thống sẽ tải lại trong giây lát !");
                                setTimeout(function () {
                                    window.location = Config.Url_Root + 'Customs/Declaration_Customs_Register';
                                }, 2000);
                            }
                            else {
                                bootbox.alert("Chuyển lại tờ khai Thất Bại, liên hệ với Admin hoặc kiểm tra lại quyền của bạn !");
                            }
                            return;
                        },
                        error: function (data) {
                            bootbox.alert("Chuyển lại tờ khai Thất Bại, liên hệ với Admin !");
                            return;
                        }
                    });
                }
            }
        });
    };

    hateco.test = function () {
        console.log('abc');
    };

    $(document).ready(function () {

    });
})();

//var InsertType = 1;
