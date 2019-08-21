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
};

