(function () {
    window.funbuttons = {};

    funbuttons.VehicleOnChange = function () {
        var vehicle_select = $("#vehicle_select").val();
        $("#vehicle_input").val(vehicle_select);
    };

    funbuttons.PlaceOnChange = function () {
        var place_select = $("#place_select").val();
        $("#place_input").val(place_select);

        //alert($("#place_select option:selected").attr('data-placeSelectID')); 
    };

    funbuttons.CustomOnChange = function () {
        var custom_select = $("#custom_select").val();
        $("#custom_input").val(custom_select);
    };

    funbuttons.Declaration_Error = function (mes , status) {
        $("#LogError").html(mes);
        $("#LogError").show();

        if (status == 1) {
            $("#LogError").css("color", "green");
        }

    };

    funbuttons.VehicleSelected = function (id) {
        var id_vehicle = '#vehicle' + id;
        $(id_vehicle).attr('selected', 'selected');
        var _value = $('#vehicle' + id).val();
        console.log(_value);
        $("#vehicle_input").val(_value);
    };

    funbuttons.PlaceSelected = function (id) {
        var id_place = '#Place' + id;
        $(id_place).attr('selected', 'selected');
        var _value = $('#Place' + id).val();
        console.log(_value);
        $("#place_input").val(_value);
    };

    funbuttons.CustomSelected = function (id) {
        //var id_place = '#Place' + id;
        $('#' + id).attr('selected', 'selected');
        var _value = $('#' + id).val();
        $("#custom_input").val(_value);
    };

    funbuttons.PlaceUpdateSelectOnChange = function () {
        //var place_update_select = $("#place_update_select").val();
        var data_placement = $("#place_update_select option:selected").attr('data-placement');

        var _html = '';

        if (data_placement == 1) {
            _html =  '<option value= "5" data- vehicleSelectName="name"> Đang làm thủ tục hải quan </option>';
        }
        else if (data_placement == 2) {
            _html = '<option value="6" data-vehicleSelectName="name">Đang làm thủ tục hải quan</option>';
        }
        else if (data_placement == 3) {
            _html = '<option value="7" data-vehicleSelectName="name">Thông quan </option>' +
                '<option value="9" data-vehicleSelectName="name">Giải phóng hàng</option>' +
                '<option value="11" data-vehicleSelectName="name">Mang hàng bảo quản</option>';
        }

        $("#d_status_select").html('');
        $("#d_status_select").html(_html);
        $("#d_status_select").val('first value')
    };

    //  set ngày hiện tại cho thẻ
    funbuttons.SetShortDateForTag = function (element) { 
        var date1 = new Date();
        var mm = date1.getMonth();
        mm = mm + 1;
        if (mm < 10) {
            mm = '0' + mm;
        }
        var dd = date1.getDate();
        var yy = date1.getFullYear();

        $("#" + element).val(mm + '/' + dd + '/' + yy);
    };

    //  show/hidden btn update on tờ khai chi tiết
    funbuttons.ShowHiddenButtonUpdateOnTKDetail = function (status) {
        if (status == 5 || status == 6) {
            $("#d_update_on_detail").show();
        }

        if (status < 7) {
            $("#d_edit_on_detail").show();
        }

        //if (status < 6) {
        //    $("#d_cancel_on_detail").show();
        //}

        //if (status == 1) {
        //    $("#d_remove_on_detail").show();
        //}
    };

    //  show/hidden btn edit on tờ khai chi tiết
    //funbuttons.ShowHiddenButtonEditOnTKDetail = function (status) {
    //    if (status < 7) {
    //        $("#d_edit_on_detail").show();
    //    }
    //};

    funbuttons.test = function () {
        console.log('abc');
    };

    $(document).ready(function () {

    });
})();   