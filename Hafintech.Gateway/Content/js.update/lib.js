var Lib = new function () {
    this.wait = function (ms) {
        return new Promise(r => setTimeout(r, ms));
    }
    this.getProductType = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetProductType",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
    this.getCurrency = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetCurrency",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    this.getQuantityUnit = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetQuantityUnit",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    this.getWeightUnit = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetWeightUnit",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    this.getCountry = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetCountry",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    this.getWeightUnit = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/getWeightUnit",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    this.getAbsoluteDutyRateUnit = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/getAbsoluteDutyRateUnit",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    this.getImportTaxClassification = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/getImportTaxClassification",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    this.getQuantityUnit = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/getQuantityUnit",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Phân loại cá nhân tổ chức
    this.getOrganizationType = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetClassificationOrganization",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Địa điểm trung chuyển
    this.getTransportPlace = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetLocationTransport",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Phương thức vận chuyển
    this.getmeansOfTrsCd = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetMeansOfTransportation",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Mã loại Phí bảo hiểm
    this.getInsuranceFeeCode = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetInsuranceDemarcation",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Mã phân loại
    this.getAdjustmentCode = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetAdjustmentDemarcation",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // cuc hai quan
    this.getCustomsOffice = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetCustomsOffice",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // loai hinh hang hoa
    this.getGroupType = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetGroupType",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã bộ phận xử lý tờ khai
    this.getCustomsSubSection = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetCustomsSubSection",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã kết quả kiểm tra nội dung
    this.getResult = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetResultCodeOfInspection",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Mã phân loại hàng hóa
    this.getcargoClsCdCode = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetCargoClassification",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    this.GetAccountInfo = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "account/getinfo",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Giấy phép nhập khẩu
    this.getPermitType = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetPermitType",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Phân loại hình thức hóa đơn
    this.getInvoiceClassification = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetInvoiceClassification",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã phân loại giá hóa đơn
    this.getinvPrcKindCd = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetInvoicePriceKind",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    // Mã phân loại điều kiện hóa đơn
    this.getInvoicePriceConditions = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetInvoicePriceConditions",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }

    //Phương thức thanh toán
    this.getTermOfPayment = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetTermOfPayment",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Điều kiện giá hóa đơn
    this.getInvoiceValueCondition = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetInvoicePriceCondition",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã phân loại khai trị giá
    this.getInvoiceValue = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetValuationDemarcation",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã loại Phí vận chuyển
    this.GetTransportFeeCodes = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetFreightDemarcation",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã tên
    this.getAdjName = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetAdjustmentDemarcationName",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã lý do đề nghị bảo lãnh
    this.getGuaranteeReasonCode = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetReason",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã xác định thời hạn nộp thuế
    this.getTaxExpiration = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetExtendingPaymentDueDate",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    // Mã Phân loại đính kèm
    this.getClassificationAttachment = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.get(Config.API_Login + "tax/GetClassificationAttachment",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
    //Phân loại thủ tục khai báo ở HYS
    this.GetApplicationProcedureType = async function () {
        try {
            var token = $('#hdfToken').val();
            const response = await axios.post(Config.API_Login + "tax/GetApplicationProcedureType",
                {
                    headers: { "Authorization": "Bearer " + token }
                });
            var res = response.data;
            if (res.ResponseCode >= 0)
                return response.data.Data;
            else return null;
        } catch (error) {
            console.error(error);
        }
    }
};