using App.Utils;
using Hafintech.API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace Hafintech.API.DataAccess
{
    public class TaxDAOImpl
    {
        private string connectionString = string.Empty;
        private bool encrypted = false;

        public TaxDAOImpl()
        {
            connectionString = Utils.GetConnStr("TaxConnectionString", encrypted);
        }

        public int InsertDeclaration(int accountID, string clientIp, long referenceDeclarationID,
            string methodCode, string customCode, int vehicleMethod, string trusteeCode, string trusteeName,
            string website, string address, string countryCode, string billLadingFiles, string vehicleCode,
            int numberSeal, double totalWeight, int placeLoadingID, DateTime dateEntry, int placeUnloadingID,
            string billCode, int methodPaid, DateTime dateReleased, long totalBillAmount, string fileIncludePath, string currencyCode,
            string unitWeight, string unitSeal, int status)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[28];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_ClientIP", clientIp);
                pars[2] = new SqlParameter("@_ReferenceDeclarationID", referenceDeclarationID);
                pars[3] = new SqlParameter("@_MethodCode", methodCode);
                pars[4] = new SqlParameter("@_CustomCode", customCode);
                pars[5] = new SqlParameter("@_VehicleMethod", vehicleMethod);
                pars[6] = new SqlParameter("@_TrusteeCode", trusteeCode);
                pars[7] = new SqlParameter("@_TrusteeName", trusteeName);
                pars[8] = new SqlParameter("@_Website", website);
                pars[9] = new SqlParameter("@_Address", address);
                pars[10] = new SqlParameter("@_CountryCode", countryCode);
                pars[11] = new SqlParameter("@_BillLadingFiles", billLadingFiles);
                pars[12] = new SqlParameter("@_VehicleCode", vehicleCode);
                pars[13] = new SqlParameter("@_NumberSeal", numberSeal);

                pars[14] = new SqlParameter("@_PlaceLoadingID", placeLoadingID);
                pars[15] = new SqlParameter("@_DateEntry", dateEntry);
                pars[16] = new SqlParameter("@_PlaceUnloadingID", placeUnloadingID);
                pars[17] = new SqlParameter("@_BillCode", billCode);
                pars[18] = new SqlParameter("@_MethodPaid", methodPaid);
                pars[19] = new SqlParameter("@_DateReleased", dateReleased);
                pars[20] = new SqlParameter("@_TotalBillAmount", totalBillAmount);
                pars[21] = new SqlParameter("@_FileIncludePath", fileIncludePath);
                pars[22] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[23] = new SqlParameter("@_CurrencyCode", currencyCode);
                pars[24] = new SqlParameter("@_UnitWeight", unitWeight);
                pars[25] = new SqlParameter("@_UnitSeal", unitSeal);
                pars[26] = new SqlParameter("@_TotalWeight", totalWeight);
                pars[27] = new SqlParameter("@_Status", status);

                var res = db.ExecuteNonQuerySP("spDeclaration_Insert", pars);
                var response = Convert.ToInt32(pars[22].Value);

                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public bool InsertProduct(int accountID, string clientIp, long declarationID,
           int productType, string countryCode, int quantity, double weight, double taxRate, double taxMinFee,
           string unit, long price, string productName)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[13];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_ProductName", productName);
                pars[2] = new SqlParameter("@_ClientIP", clientIp);
                pars[3] = new SqlParameter("@_DeclarationID", declarationID);
                pars[4] = new SqlParameter("@_ProductType", productType);
                pars[5] = new SqlParameter("@_CountryCode", countryCode);
                pars[6] = new SqlParameter("@_Quantity", quantity);
                pars[7] = new SqlParameter("@_Weight", weight);
                pars[8] = new SqlParameter("@_TaxRate", taxRate);
                pars[9] = new SqlParameter("@_TaxMinFee", taxMinFee);
                pars[10] = new SqlParameter("@_Unit", unit);
                pars[11] = new SqlParameter("@_Price", price);
                pars[12] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                var res = db.ExecuteNonQuerySP("spProduct_Insert", pars);
                var response = Convert.ToInt32(pars[11].Value);

                return response >= 0;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return false;
            }
        }

        public List<Declaration> DeclarationDetail(int declarationID, int accountID)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_DeclarationID", declarationID);
                pars[1] = new SqlParameter("@_AccountID", accountID);
                var res = db.GetListSP<Declaration>("spDeclaration_Detail", pars);

                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Declaration>();
            }
        }

        public List<Declaration> Search(int declarationID, DateTime fromdate, DateTime toDate, int accountID)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_DeclarationID", declarationID);
                pars[1] = new SqlParameter("@_FromDate", fromdate);
                pars[2] = new SqlParameter("@_ToDate", toDate);
                pars[3] = new SqlParameter("@_AccountID", accountID);
                var res = db.GetListSP<Declaration>("spDeclaration_Search", pars);

                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Declaration>();
            }
        }

        public List<File> GetFileAttach(int declarationID)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_DeclarationID", declarationID);
                var res = db.GetListSP<File>("spFileAttachs_Get", pars);

                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<File>();
            }
        }

        public List<Product> GetProduct(int declarationID)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_DeclarationID", declarationID);
                var res = db.GetListSP<Product>("spProducts_Get", pars);

                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Product>();
            }
        }

        public List<ProductT> GetProductType()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<ProductT>("spProducts_Type_Get");

                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<ProductT>();
            }
        }

        public List<Country> GetCountry()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<Country>("spCountrys_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Country>();
            }
        }

        public List<PlaceUnLoading> GetPlaceUnLoading()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<PlaceUnLoading>("spPlaceUnloadings_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<PlaceUnLoading>();
            }
        }

        public List<PlaceLoading> GetPlaceLoading()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<PlaceLoading>("spPlaceLoadings_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<PlaceLoading>();
            }
        }

        public List<MethodP> GetMethodPaid()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<MethodP>("spMethodPaids_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<MethodP>();
            }
        }

        public List<Method> GetMethod()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<Method>("spMethods_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Method>();
            }
        }

        public List<Customs> GetCustoms()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<Customs>("spCustoms_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Customs>();
            }
        }

        public List<Currency> GetCurrency()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<Currency>("spCurrencys_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Currency>();
            }
        }

        public List<VehicleM> GetVehicleMethod()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<VehicleM>("spVehicleMethods_Get");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<VehicleM>();
            }
        }
    }
}