using App.Utils;
using App.Utils.Extensions;
using App.Utils.GetData;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Security.Claims;
using System.Threading.Tasks;
using ZaloCSharpSDK;
using static App.Utils.Enums.Enums;

namespace Hafintech.API.Providers
{
    public class CustomOAuthProvider : OAuthAuthorizationServerProvider
    {
        private AppDAOImpl _appDAO = new AppDAOImpl();

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
            return Task.FromResult<object>(null);
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            var allowedOrigin = "*";
            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { allowedOrigin });
            var signInManager = context.OwinContext.GetUserManager<ApplicationSignInManager>();
            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();
            var applicationUser = new ApplicationUser();
            var type = Convert.ToInt32(await context.Request.GetValue("type"));
            var accountInfo = new AccountInfo();
            //var verifyEmailStatus = 0;
            var description = string.Empty;
            switch (type)
            {
                //login thường
                case 0:
                    if (context.UserName.Contains("@"))
                    {
                        //accountInfo = _appDAO.LoginByUserName(context.UserName, context.Password, "");
                        var url = ConfigurationManager.AppSettings["APIURL"] + "auth/login";
                        var data = new
                        {
                            username = context.UserName,
                            password = context.Password,
                            clientIp = ""
                        };
                        var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                        if (res == null || res.code < 0)
                        {
                            context.SetError("403", "Tên đăng nhập hoặc mật khẩu chưa đúng");
                            return;
                        }
                        if (res != null && res.code >= 0)
                        {
                            var info = res.results.Accounts;
                            accountInfo = new AccountInfo
                            {
                                AccountID = info.accountId,
                                Address = info.address,
                                Birthday = info.birthday,
                                CommuneCode = info.communeCode,
                                CreatedDate = info.createdDate,
                                DateReleased = info.dateReleased,
                                DistrictCode = info.districtCode,
                                FacebookID = info.facebookId,
                                FullName = info.fullName,
                                Gender = info.gender,
                                Gmail = info.gmail,
                                Identity = info.identity,
                                IdentityImgPath1 = info.idenImgPath1,
                                IdentityImgPath2 = info.idenImgPath2,
                                Mobile = info.mobile,
                                PassportID = info.passportId,
                                PassportImgPath = info.passpoImgPath,
                                Password = info.password,
                                PlaceReleased = info.placeReleased,
                                ProvinceCode = info.provinceCode,
                                SourceID = info.sourceId,
                                TaxCode = info.taxCode,
                                UpdatedDate = info.updatedDate,
                                UserName = info.userName,
                                VerifyEmailStatus = info.vrfEmailStatus,
                                VerifyIdentityStatus = info.vrfIdentStatus,
                                VerifyMobileStatus = info.vrfMobiStatus,
                                Type = info.type
                            };
                        }

                    }
                    else
                    {
                        //accountInfo = _appDAO.LoginByMobile(context.UserName, context.Password, "");
                        var url = ConfigurationManager.AppSettings["APIURL"] + "auth/loginByMobile";
                        var data = new
                        {
                            mobile = context.UserName,
                            password = context.Password,
                            clientIp = ""
                        };
                        var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                        if (res == null || res.code < 0)
                        {
                            context.SetError("403", "Tên đăng nhập hoặc mật khẩu chưa đúng");
                            return;
                        }
                        if (res != null && res.code >= 0)
                        {
                            var info = res.results.Accounts;
                            accountInfo = new AccountInfo
                            {
                                AccountID = info.accountId,
                                Address = info.address,
                                Birthday = info.birthday,
                                CommuneCode = info.communeCode,
                                CreatedDate = info.createdDate,
                                DateReleased = info.dateReleased,
                                DistrictCode = info.districtCode,
                                FacebookID = info.facebookId,
                                FullName = info.fullName,
                                Gender = info.gender,
                                Gmail = info.gmail,
                                Identity = info.identity,
                                IdentityImgPath1 = info.idenImgPath1,
                                IdentityImgPath2 = info.idenImgPath2,
                                Mobile = info.mobile,
                                PassportID = info.passportId,
                                PassportImgPath = info.passpoImgPath,
                                Password = info.password,
                                PlaceReleased = info.placeReleased,
                                ProvinceCode = info.provinceCode,
                                SourceID = info.sourceId,
                                TaxCode = info.taxCode,
                                UpdatedDate = info.updatedDate,
                                UserName = info.userName,
                                VerifyEmailStatus = info.vrfEmailStatus,
                                VerifyIdentityStatus = info.vrfIdentStatus,
                                VerifyMobileStatus = info.vrfMobiStatus,
                                Type = info.type
                            };
                        }
                    }

                    if (accountInfo.AccountID <= 0)
                    {
                        context.SetError("403", "Tên đăng nhập hoặc mật khẩu chưa đúng");
                        return;
                    }
                    //verifyEmailStatus = accountInfo.VerifyEmailStatus;
                    break;
                //login facebook
                case 1:
                    var fID = await context.Request.GetValue("ID");
                    var fCode = await context.Request.GetValue("AccessToken");
                    accountInfo = await LoginFacebook(fID, fCode);
                    if (accountInfo.AccountID <= 0)
                    {
                        context.SetError("403", "Tên đăng nhập hoặc mật khẩu chưa đúng");
                        return;
                    }
                    if (accountInfo.AccountID > 0 && accountInfo.VerifyEmailStatus <= 0)
                    {
                        description = "Tài khoản chưa gắn kết với email";
                    }
                    break;

                case 2:
                    var gID = await context.Request.GetValue("ID");
                    var gCode = await context.Request.GetValue("AccessToken");
                    accountInfo = await LoginGmail(gID, gCode);
                    if (accountInfo.AccountID <= 0)
                    {
                        context.SetError("403", "Tên đăng nhập hoặc mật khẩu chưa đúng");
                        return;
                    }
                    if (accountInfo.AccountID > 0 && accountInfo.VerifyEmailStatus <= 0)
                    {
                        description = "Tài khoản chưa gắn kết với email";
                    }
                    break;
                //login zalo
                case 3:
                    var zaloID = await context.Request.GetValue("zaloID");
                    var zaloCode = await context.Request.GetValue("zaloCode");
                    accountInfo = LoginZalo(zaloID, zaloCode);
                    if (accountInfo.AccountID <= 0)
                    {
                        context.SetError("403", "Tên đăng nhập hoặc mật khẩu chưa đúng");
                        return;
                    }
                    if (accountInfo.AccountID > 0 && accountInfo.VerifyEmailStatus <= 0)
                    {
                        description = "Tài khoản chưa gắn kết với email";
                    }
                    break;

                default:
                    break;
            }

            //login with normal account
            applicationUser.UserID = accountInfo.AccountID;
            applicationUser.UserName = string.IsNullOrWhiteSpace(accountInfo.UserName) ? "" : accountInfo.UserName;
            applicationUser.Id = accountInfo.AccountID.ToString();
            applicationUser.Identity = string.IsNullOrWhiteSpace(accountInfo.Identity) ? "" : accountInfo.Identity;
            applicationUser.FullName = accountInfo.FullName;
            var response = new
            {
                AccountID = accountInfo.AccountID,
                VerifyEmailStatus = accountInfo.VerifyEmailStatus,
                VerifyIdentityStatus = accountInfo.VerifyIdentityStatus,
                Description = description,
                AccountName = accountInfo.UserName,
                FullName = accountInfo.FullName,
                UpdateStatus = !string.IsNullOrWhiteSpace(applicationUser.Identity),
                Mobile = string.IsNullOrWhiteSpace(accountInfo.Mobile) ? "" : accountInfo.Mobile,
                VerifyMobileStatus = accountInfo.VerifyMobileStatus,
                Type = accountInfo.Type
            };
            NLogManager.LogMessage(response.ConvertToString());
            var props = new AuthenticationProperties(response.ConvertToDictionary());
            ClaimsIdentity oAuthIdentity = await applicationUser.GenerateUserIdentityAsync(userManager, "JWT");
            var ticket = new AuthenticationTicket(oAuthIdentity, props);
            context.Validated(ticket);
        }

        private AccountInfo LoginZalo(string zaloID, string zaloCode)
        {
            try
            {
                Zalo3rdAppInfo appInfo = new Zalo3rdAppInfo(2454419546038788449, "Hngg9ZI1OrKXrXXM9SBm", "http://localhost:63056/home/callback");
                Zalo3rdAppClient appClient = new Zalo3rdAppClient(appInfo);
                JObject token = appClient.getAccessToken(zaloCode);
                var accesstoken = token.SelectToken("access_token").ToString();
                JObject profile = appClient.getProfile(accesstoken, "id,name");
                var id = profile.SelectToken("id").ToString();
                var name = profile.SelectToken("name").ToString();
                if (zaloID != id)
                    return new AccountInfo();
                var accountInfo = _appDAO.LoginByZalo(zaloID, "");
                return accountInfo;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return new AccountInfo();
            }
        }

        private async Task<AccountInfo> LoginGmail(string gID, string gCode)
        {
            var data = await DataService.GetAsync(string.Format("https://www.googleapis.com/oauth2/v2/userinfo?access_token={0}", gCode));
            if (data == null)
            {
                return new AccountInfo();
            }
            var GoogleResponseData = JObject.Parse(data);
            if (GoogleResponseData["email"] != null || GoogleResponseData["id"] != null)
            {
                var GoogleId = (string)GoogleResponseData["id"];
                var Name = (string)GoogleResponseData["name"];
                var Email = (string)GoogleResponseData["email"];

                if (GoogleId != gID)
                    return new AccountInfo();
                var accountInfo = _appDAO.LoginByGmail(Email, "");
                if (accountInfo != null && accountInfo.AccountID > 0 && string.IsNullOrWhiteSpace(accountInfo.FullName))
                {
                    _appDAO.Update(accountInfo.AccountID, "", "", "", "", "", "", Name, 0, "", "", "", "", DateTime.Now, DateTime.Now, "", 0);
                    accountInfo.FullName = Name;
                }
                return accountInfo;
            }
            return new AccountInfo();
        }

        private async Task<AccountInfo> LoginFacebook(string fbID, string fbToken)
        {
            try
            {
                string graphApi = string.Format("https://graph.facebook.com/me?access_token={0}", fbToken);
                var data = await DataService.GetAsync(graphApi);
                if (data == null)
                {
                    NLogManager.LogError(string.Format("Facebook_error: facebookId = {0}, accessToken = {1}", fbID, fbToken));
                    return new AccountInfo();
                }

                var FacebookResponseData = JObject.Parse(data);
                if (FacebookResponseData["id"] != null)
                {
                    var FacebookId = (string)FacebookResponseData["id"];
                    string fbName = Utils.ConvertUnicodeToString((string)FacebookResponseData["name"]);

                    NLogManager.LogMessage(string.Format("facebookName={0}, facebookId={1}, accessToken={2}", fbName, fbID, fbToken));

                    //var partnerIDS = FacebookUtil.GetIDsForBusiness(accesstoken);
                    if (FacebookId != fbID)
                    {
                        NLogManager.LogError("Không tìm thấy thông tin tài khoản Facebook: id = " + fbID + "; name = " + fbName);
                        return new AccountInfo();
                    }

                    //string listPartnerIDs = "";
                    //foreach (var item in partnerIDS)
                    //    listPartnerIDs += ";" + item.id;

                    //if (listPartnerIDs.IndexOf(";") == 0)
                    //    listPartnerIDs = listPartnerIDs.Substring(1);
                    var accountInfo = _appDAO.LoginByFacebook(fbID, "");
                    if (accountInfo != null && accountInfo.AccountID > 0 && string.IsNullOrWhiteSpace(accountInfo.FullName))
                    {
                        _appDAO.Update(accountInfo.AccountID, "", "", "", "", "", "", fbName, 0, "", "", "", "", DateTime.Now, DateTime.Now, "", 0);
                        accountInfo.FullName = fbName;
                    }
                    return accountInfo;
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return new AccountInfo();
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return Task.FromResult<object>(null);
        }
    }
}