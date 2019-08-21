using App.Utils;
using Hafintech.API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Hafintech.API.DataAccess
{
    public class AppDAOImpl
    {
        private string connectionString = string.Empty;
        private bool encrypted = false;

        public AppDAOImpl()
        {
            connectionString = Utils.GetConnStr("ConnectionString", encrypted);
        }

        public AccountInfo LoginByUserName(string accountName, string password, string clientIP)
        {
            try
            {
                int accountID = 0;
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_Username", accountName);
                pars[1] = new SqlParameter("@_Password", password);
                pars[2] = new SqlParameter("@_ClientIP", clientIP);
                pars[3] = new SqlParameter("@_AccountID", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[4] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                var res = db.GetListSP<AccountInfo>("spAccount_Authenticate_ByUsername", pars);
                var response = Convert.ToInt32(pars[4].Value);
                if (response > 0)
                    accountID = Convert.ToInt32(pars[3].Value);
                return res.FirstOrDefault();
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public AccountInfo LoginByMobile(string mobile, string password, string clientIP)
        {
            try
            {
                int accountID = 0;
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_Mobile", mobile);
                pars[1] = new SqlParameter("@_Password", password);
                pars[2] = new SqlParameter("@_ClientIP", clientIP);
                pars[3] = new SqlParameter("@_AccountID", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[4] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                var res = db.GetListSP<AccountInfo>("spAccount_Authenticate_ByMobile", pars);
                var response = Convert.ToInt32(pars[4].Value);
                if (response > 0)
                    accountID = Convert.ToInt32(pars[3].Value);
                return res.FirstOrDefault();
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public AccountInfo LoginByGmail(string gmail, string clientIP)
        {
            try
            {
                int accountID = 0;
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_Gmail", gmail);
                pars[1] = new SqlParameter("@_ClientIP", clientIP);
                pars[2] = new SqlParameter("@_AccountID", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                var res = db.GetListSP<AccountInfo>("spAccount_Authenticate_ByGmail", pars);
                var response = Convert.ToInt32(pars[3].Value);
                if (response > 0)
                    accountID = Convert.ToInt32(pars[2].Value);
                return res.FirstOrDefault(); ;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public AccountInfo LoginByZalo(string zalo, string clientIP)
        {
            try
            {
                int accountID = 0;
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_ZaloID", zalo);
                pars[1] = new SqlParameter("@_ClientIP", clientIP);
                pars[2] = new SqlParameter("@_AccountID", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                var res = db.GetListSP<AccountInfo>("spAccount_Authenticate_ByZalo", pars);
                var response = Convert.ToInt32(pars[3].Value);
                if (response > 0)
                    accountID = Convert.ToInt32(pars[2].Value);
                return res.FirstOrDefault();
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public AccountInfo LoginByFacebook(string facebook, string clientIP)
        {
            try
            {
                int accountID = 0;
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_FacebookID", facebook);
                pars[1] = new SqlParameter("@_ClientIP", clientIP);
                pars[2] = new SqlParameter("@_AccountID", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                var res = db.GetListSP<AccountInfo>("spAccount_Authenticate_ByFacebook", pars);
                var response = Convert.ToInt32(pars[3].Value);
                if (response > 0)
                    accountID = Convert.ToInt32(pars[2].Value);
                return res.FirstOrDefault();
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public int CreateByFacebook(string accountID, string facebook, string clientIP)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_FacebookID", facebook);
                pars[2] = new SqlParameter("@_ClientIP", clientIP);
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_Facebook_Create", pars);
                var response = Convert.ToInt32(pars[3].Value);
                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public AccountInfo CreateByZalo(int accountID, string zalo, string clientIP)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_ZaloID", zalo);
                pars[2] = new SqlParameter("@_ClientIP", clientIP);
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                var res = db.GetListSP<AccountInfo>("spAccount_Zalo_Create", pars);
                var response = Convert.ToInt32(pars[3].Value);
                return res.FirstOrDefault();
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public int CreateByGoogle(string accountID, string gmail, string clientIP)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_Gmail", gmail);
                pars[2] = new SqlParameter("@_ClientIP", clientIP);
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_Zalo_Create", pars);
                var response = Convert.ToInt32(pars[3].Value);
                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public int CheckByFacebook(string accountID, string facebook, string clientIP)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_FacebookID", facebook);
                pars[2] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_Facebook_Check", pars);
                var response = Convert.ToInt32(pars[3].Value);
                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public int CheckByZalo(string accountID, string zalo, string clientIP)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_ZaloID", zalo);
                pars[2] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_Zalo_Check", pars);
                var response = Convert.ToInt32(pars[2].Value);
                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public int CheckByGmail(string accountID, string gmail, string clientIP)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[3];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_Gmail", gmail);
                pars[2] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_Zalo_Check", pars);
                var response = Convert.ToInt32(pars[2].Value);
                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public int Register(string accountName, string mobile, string password, string identity, string taxCode,
            string fullName, int sourceID, string provinceCode, string districtCode, string communeCode,
            string address)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[6];
                pars[0] = new SqlParameter("@_UserName", accountName);
                pars[1] = new SqlParameter("@_Mobile", mobile);
                pars[2] = new SqlParameter("@_Password", password);
                // pars[3] = new SqlParameter("@_Identity", identity);
                // pars[4] = new SqlParameter("@_TaxCode", taxCode);
                pars[3] = new SqlParameter("@_FullName", fullName);
                //pars[6] = new SqlParameter("@_SourceID", sourceID);
                //pars[7] = new SqlParameter("@_ProvinceCode", provinceCode);
                //pars[8] = new SqlParameter("@_DistrictCode", districtCode);
                //pars[9] = new SqlParameter("@_CommuneCode", communeCode);
                //pars[10] = new SqlParameter("@_Address", address);
                pars[4] = new SqlParameter("@_AccountID", SqlDbType.Int) { Direction = ParameterDirection.Output };
                pars[5] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_CreateAccounts", pars);
                var response = Convert.ToInt64(pars[5].Value);
                return Convert.ToInt32(pars[5].Value);
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public long Update(int accountID, string identityImgPath1, string identityImgPath2, string passportID, string passportImgPath, string identity, string taxCode,
           string fullName, int sourceID, string provinceCode, string districtCode, string communeCode,
           string address, DateTime birday, DateTime dayReleased, string placeReleased, int gender)
        {
            try
            {
                NLogManager.LogMessage(string.Format("AccountID: {0}, identityImgPath1: {1}, identityImgPath2: {2}, passportID: {3}, identity: {4}, taxCode: {5}," +
                    "fullName: {6}, address: {7}", accountID, identityImgPath1, identityImgPath2, passportID, identity, taxCode, fullName, address));

                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[17];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_Identity", identity);
                pars[2] = new SqlParameter("@_IdentityImgPath1", identityImgPath1);
                pars[3] = new SqlParameter("@_IdentityImgPath2", identityImgPath2);
                pars[4] = new SqlParameter("@_PassportID", passportID);
                pars[5] = new SqlParameter("@_PassportImgPath", passportImgPath);
                pars[6] = new SqlParameter("@_TaxCode", taxCode);
                pars[7] = new SqlParameter("@_FullName", fullName);
                pars[8] = new SqlParameter("@_ProvinceCode", provinceCode);
                pars[9] = new SqlParameter("@_DistrictCode", districtCode);
                pars[10] = new SqlParameter("@_CommuneCode", communeCode);
                pars[11] = new SqlParameter("@_Address", address);
                pars[12] = new SqlParameter("@_DateReleased", dayReleased);
                pars[13] = new SqlParameter("@_PlaceReleased", placeReleased);
                pars[14] = new SqlParameter("@_Birthday", birday);
                pars[15] = new SqlParameter("@_Gender", gender);
                pars[16] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_UpdateAccountsInfo", pars);
                var response = Convert.ToInt64(pars[16].Value);
                NLogManager.LogMessage("response: " + response);
                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public long UpdateEmail(int accountID, string password, string mobile, string accountName)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_UserName", accountName);
                pars[2] = new SqlParameter("@_Mobile", mobile);
                pars[3] = new SqlParameter("@_Password", password);
                pars[4] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_UpdateAccountsMail", pars);
                var response = Convert.ToInt64(pars[4].Value);
                return response;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        public bool Verify(string accountName, int verifyEmailStatus, int verifyIdentityStatus, int verifyMobileStatus)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_UserName", accountName);
                pars[1] = new SqlParameter("@_VerifyEmailStatus", verifyEmailStatus);
                pars[2] = new SqlParameter("@_VerifyMobileStatus", verifyMobileStatus);
                pars[3] = new SqlParameter("@_VerifyIdentityStatus", verifyIdentityStatus);
                pars[4] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_VerifyAccounts", pars);
                var response = Convert.ToInt64(pars[4].Value);
                return response >= 0;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return false;
            }
        }

        public List<Province> GetProvince()
        {
            try
            {
                var db = new DBHelper(connectionString);
                var res = db.GetListSP<Province>("spProvince_GetList");
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Province>();
            }
        }

        public List<District> GetDistrict(string provinceCode)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_ProvinceCode", provinceCode);
                var res = db.GetListSP<District>("spDistrict_GetList", pars);
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<District>();
            }
        }

        public List<Commune> GetCommune(string districtCode)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_DistrictCode", districtCode);
                var res = db.GetListSP<Commune>("spCommune_GetList", pars);
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<Commune>();
            }
        }

        public AccountInfo GetAccountInfo(int accountID)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                var res = db.GetListSP<AccountInfo>("spAccount_GetInfo", pars);
                return res.FirstOrDefault();
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public AccountInfo GetAccountInfoByEmail(string email)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[1];
                pars[0] = new SqlParameter("@_Gmail", email);
                var res = db.GetListSP<AccountInfo>("spAccount_GetInfo_ByGmail", pars);
                return res.FirstOrDefault();
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new AccountInfo();
            }
        }

        public bool ChangePassword(int accountID, string oldPassword, string password, string clientIP)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_AccountID", accountID);
                pars[1] = new SqlParameter("@_PasswordOld", oldPassword);
                pars[2] = new SqlParameter("@_Password", password);
                pars[3] = new SqlParameter("@_ClientIP", clientIP);
                pars[4] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_ChangePassword", pars);
                var response = Convert.ToInt64(pars[4].Value);
                return response >= 0;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return false;
            }
        }

        public bool ForgotPassword(string userName, string password, string clientIp)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[4];
                pars[0] = new SqlParameter("@_UserName", userName);
                pars[1] = new SqlParameter("@_Password", password);
                pars[2] = new SqlParameter("@_ClientIP", clientIp);
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_ForgotPassword", pars);
                var res = Convert.ToInt64(pars[3].Value);
                return res >= 0;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return false;
            }
        }

        public bool CheckEmail(string email)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[2];
                pars[0] = new SqlParameter("@_Email", email);
                pars[1] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                db.ExecuteNonQuerySP("spAccount_Email_Check", pars);
                var res = Convert.ToInt64(pars[1].Value);
                return res >= 0;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return false;
            }
        }

        public List<AccountSearch> FindUser(string email = "", string mobile = "", string identity = "", int accountID = 0)
        {
            try
            {
                var db = new DBHelper(connectionString);
                var pars = new SqlParameter[5];
                pars[0] = new SqlParameter("@_Mobile", string.IsNullOrEmpty(mobile) ? "" : mobile);
                pars[1] = new SqlParameter("@_Email", string.IsNullOrEmpty(email) ? "" : email);
                pars[2] = new SqlParameter("@_Identity", string.IsNullOrEmpty(identity) ? "" : identity);
                pars[3] = new SqlParameter("@_ResponseStatus", SqlDbType.BigInt) { Direction = ParameterDirection.Output };
                pars[4] = new SqlParameter("@_AccountID", accountID);

                var res = db.GetListSP<AccountSearch>("cms.spAccount_Search", pars);
                return res;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return new List<AccountSearch>();
            }
        }
    }
}