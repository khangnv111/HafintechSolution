using App.Utils;
using App.Utils.GetData;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static App.Utils.Enums.Enums;

namespace Hafintech.API.Controllers
{
    //[Authorize]
    [RoutePrefix("account")]
    public class AccountController : ApiController
    {
        private AppDAOImpl _appDAO = new AppDAOImpl();
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        //[HttpPost]
        //[Route("Update")]
        //public async Task<IHttpActionResult> Update(UpdateViewModel model)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        var errorStr = string.Empty;
        //        foreach (var v in ModelState.Values)
        //        {
        //            errorStr += v.Errors.FirstOrDefault().ErrorMessage + ". ";
        //        }
        //        return Ok(new Response(errorStr));
        //    }
        //    NLogManager.LogMessage(JsonConvert.SerializeObject(model));

        //    try
        //    {
        //        var res = _appDAO.Update((int)AccountSession.AccountID, "", "", "", "", model.Identity, model.TaxCode, model.FullName, 0,
        //            model.ProvinceCode, model.DistrictCode, model.CommuneCode, model.Address);
        //        return Ok(new Response(true));
        //    }
        //    catch (Exception ex)
        //    {
        //        NLogManager.PublishException(ex);
        //        return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
        //    }
        //}
        [HttpPost]
        [Route("Update")]
        public async Task<IHttpActionResult> Update()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var identity = httpRequest["txtIdentity"];
                var fullName = httpRequest["txtFullName"];
                var gender = Convert.ToInt32(httpRequest["rdgender"]);
                var dayReleased = DateTime.Parse(httpRequest["txtDateReleased"]);
                var placeReleased = httpRequest["txtPlaceReleased"];
                var provinceCode = httpRequest["slTinhThanh"];
                var districtCode = httpRequest["slQuanHuyen"];
                var passpostID = httpRequest["txtPasspostID"];
                var communeCode = httpRequest["slPhuongXa"];
                var address = httpRequest["txtAddress"];
                var birthDay = Convert.ToInt32(Convert.ToInt32(httpRequest["txtDay"]));
                var birthMonth = Convert.ToInt32(Convert.ToInt32(httpRequest["slMonth"]));
                var birthYear = Convert.ToInt32(Convert.ToInt32(httpRequest["txtYear"]));
                var filePassportImgPath = httpRequest["hdfPassportImgPath"];
                var hdfIdentityImgPath1 = httpRequest["hdfIdentityImgPath1"];
                var hdfIdentityImgPath2 = httpRequest["hdfIdentityImgPath2"];

                var filePassportImgName = string.Empty;
                var hdfIdentityImg1Name = string.Empty;
                var hdfIdentityImg2Name = string.Empty;

                var birth = DateTime.ParseExact((birthDay < 10 ? "0" + birthDay.ToString() : birthDay.ToString()) + "/" +
                    (birthMonth < 10 ? "0" + birthMonth.ToString() : birthMonth.ToString()) + "/" + birthYear, "dd/MM/yyyy", System.Globalization.CultureInfo.InvariantCulture);
                string folderPath = AppDomain.CurrentDomain.BaseDirectory + "Data\\upload\\";
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                var fileNames = new List<string>();
                for (int i = 0; i < httpRequest.Files.Count; i++)
                {
                    var file = httpRequest.Files[i];
                    var name = file.FileName;
                    if (string.IsNullOrWhiteSpace(name)) continue;
                    if (filePassportImgPath.Contains(name)) filePassportImgName = name;
                    if (hdfIdentityImgPath1.Contains(name)) hdfIdentityImg1Name = name;
                    if (hdfIdentityImgPath2.Contains(name)) hdfIdentityImg2Name = name;
                    //var _filename = string.Format("{0:yyyyMMddHHmmss}_{1}", DateTime.Now, AccountSession.AccountName);
                    //_filename += "_" + name;
                    file.SaveAs(folderPath + name);
                    fileNames.Add(name);
                }
                // if (fileNames.Count < 3) return Ok(new Response("Thiếu file"));
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/updateInfo";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = (int)AccountSession.AccountID,
                    fullname = fullName,
                    birthday = birth.ToString("MM/dd/yyyy"),
                    gender = gender,
                    identity = identity,
                    dateReleased = dayReleased.ToString("MM/dd/yyyy"),
                    placeReleased = placeReleased,
                    idenImgPath1 = hdfIdentityImg1Name,
                    idenImgPath2 = hdfIdentityImg2Name,
                    provinceCode = provinceCode,
                    districtCode = districtCode,
                    communeCode = communeCode,
                    address = address,
                    passportId = passpostID,
                    passpoImgPath = filePassportImgName,
                });
                if (res.code < 0)
                    return Ok(new Response((int)ErrorCode.Failed, res.message));

                //var res = _appDAO.Update((int)AccountSession.AccountID, hdfIdentityImg1Name,
                //    hdfIdentityImg2Name, passpostID, filePassportImgName, identity, "", fullName, 0,
                //   provinceCode, districtCode, communeCode, address, birth, dayReleased, placeReleased, gender);

                ////    if (!ModelState.IsValid)
                ////    {
                ////        var errorStr = string.Empty;
                ////        foreach (var v in ModelState.Values)
                ////        {
                ////            errorStr += v.Errors.FirstOrDefault().ErrorMessage + ". ";
                ////        }
                ////        return Ok(new Response(errorStr));
                ////    }

                ////    if (!UploadFileExCell(fileUpload)) return Ok(new Response("Upload file thất bại"));
                ////    var res = _appDAO.Update((int)AccountSession.AccountID, "", "", "", "", model.Identity, model.TaxCode, model.FullName, 0,
                ////         model.ProvinceCode, model.DistrictCode, model.CommuneCode, model.Address);
                //if (res < 0)
                //{
                //    switch (res)
                //    {
                //        case -106:
                //            return Ok(new Response("Đã tồn tại SĐT, mời bạn thử lại"));

                //        case -108:
                //            return Ok(new Response("Đã tồn tại CMT, mời bạn thử lại"));

                //        case -1108:
                //            return Ok(new Response("Đã tồn tại Hộ chiếu, mời bạn thử lại"));

                //        case -102:
                //            return Ok(new Response("Lỗi đầu vào, mời bạn thử lại"));

                //        case -105:
                //            return Ok(new Response("Đã tồn tại tài khoản, mời bạn thử lại"));

                //        default:
                //            return Ok(new Response("Đăng ký không thành công, mời bạn thử lại"));
                //    }
                //}
                return Ok(new Response(true));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
            }
        }

        private bool UploadFileExCell(HttpPostedFileBase fileUpload)
        {
            try
            {
                if (fileUpload != null)
                {
                    string FileName = Path.GetFileName(fileUpload.FileName);
                    string Extension = Path.GetExtension(fileUpload.FileName);
                    string FolderPath = AppDomain.CurrentDomain.BaseDirectory + "Data\\upload\\";
                    var _filename = string.Format("{0:yyyyMMddHHmmss}_{1}", DateTime.Now, AccountSession.AccountName);
                    _filename += "_" + FileName;
                    if (!Directory.Exists(FolderPath))
                    {
                        Directory.CreateDirectory(FolderPath);
                    }
                    fileUpload.SaveAs(FolderPath + _filename);
                    //if (ImportExcelData(FolderPath + _filename, Extension, fileUpload))
                    //{
                    //    FileNameUp = _filename;
                    //    TempData["alert"] = "Upload file thành công!";
                    //    return true;
                    //}
                    //TempData["alert"] = "Upload file thất bại!";
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return false;
            }
        }

        [HttpPost]
        [Route("UpdateEmail")]
        public async Task<IHttpActionResult> UpdateEmail(UpdateViewModel model)
        {
            if (!ModelState.IsValid)
            {
                var errorStr = string.Empty;
                foreach (var v in ModelState.Values)
                {
                    errorStr += v.Errors.FirstOrDefault().ErrorMessage + ". ";
                }
                return Ok(new Response(errorStr));
            }
            NLogManager.LogMessage(JsonConvert.SerializeObject(model));
            try
            {
                var res = _appDAO.UpdateEmail((int)AccountSession.AccountID, model.Password, model.Mobile, model.UserName);

                if (res > 0 && !string.IsNullOrWhiteSpace(model.UserName))
                {
                    var user = new ApplicationUser { UserName = model.UserName };
                    user.Id = res.ToString();
                    user.UserID = res;
                    await SignInManager.SignInAsync(user, false, false);
                    return Ok(new Response(true));
                }
                switch (res)
                {
                    case -99:
                        return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));

                    case -102:
                        return Ok(new Response("Đầu vào lỗi"));

                    case -108:
                        return Ok(new Response("Tồn tại Email"));

                    case -106:
                        return Ok(new Response("Tồn tại số điện thoại"));
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("Verify")]
        public async Task<IHttpActionResult> Verify(VerifyOTP model)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(model.OTP))
                    return Ok(new Response("Chưa nhập OTP"));
                var accountName = AccountSession.AccountName;
                if (!string.IsNullOrWhiteSpace(accountName))
                {
                    var mailController = new MailVerifyController();
                    var res = await mailController.EmailOTPCheck(model.OTP, AccountSession.AccountName);
                    if (res >= 0)
                        //  if (_appDAO.Verify(accountName, 1, 0, 0))
                        return Ok(new Response((int)ErrorCode.Success, "Xác thực thành công"));
                    return Ok(new Response("Xác thực không thành công"));
                }
                return Ok(new Response("Tài khoản chưa có email"));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
            }
        }

        [HttpGet]
        [Route("GetOTP")]
        public async Task<IHttpActionResult> GetOTP(int type)
        {
            try
            {
                var mailController = new MailVerifyController();
                var res = await mailController.GetOTP(AccountSession.AccountName, AccountSession.AccountName, (int)AccountSession.AccountID);
                if (res >= 0)
                    return Ok(new Response((int)ErrorCode.Success, "Đã gửi OTP đến email của bạn"));
                else
                {
                    switch (res)
                    {
                        case -10030:
                            return Ok(new Response((int)ErrorCode.Failed, "OTP đã gửi đến email của bạn"));
                    }
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("GetInfoByAccountID")]
        public async Task<IHttpActionResult> GetInfo(int accountID)
        {
            try
            {
                if (accountID <= 0) return NotFound();
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/getAccountInfoByID?accountID=" + accountID;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response((int)ErrorCode.Failed, res.message));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
            }
        }

        [HttpGet]
        [Route("GetInfo")]
        public async Task<IHttpActionResult> GetInfo()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/getAccountInfoByID?accountID=" + AccountSession.AccountID;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response((int)ErrorCode.Failed, res.message));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
            }
        }

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IHttpActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errorStr = string.Empty;
                    foreach (var v in ModelState.Values)
                    {
                        errorStr += v.Errors.FirstOrDefault().ErrorMessage + ". ";
                    }
                    return Ok(new Response(errorStr));
                }
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/getAccountInfoByID?accountID=" + (int)AccountSession.AccountID;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code >= 0)
                {
                    var accountInfo = res.results.Accounts;
                    if (Convert.ToInt32(accountInfo.vrfEmailStatus) < 1) return Ok(new Response((int)ErrorCode.Failed, "Bạn chưa xác thực Email"));
                    var url1 = ConfigurationManager.AppSettings["APIURL"] + "account/updatePassword";
                    var res1 = await DataService.PostAsync<Rootobject<dynamic>>(url1,
                        new
                        {
                            oldPassWord = model.OldPassword,
                            newPassWord = model.Password,
                            userName = accountInfo.userName
                        });
                    if (res1.code >= 0)
                        return Ok(new Response((int)ErrorCode.Success, "Đổi mật khẩu thành công"));
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Đổi mật khẩu thất bại"));
        }

        [HttpGet]
        [Route("Search")]
        public async Task<IHttpActionResult> Search(int accountId = 0, string userName = "",
            string fullname = "", string identity = "", string mobile = "", string declarCode = "",
            string startCreatedDate = "", string endCreatedDate = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = accountId,
                    userName = userName,
                    fullname = fullname,
                    identity = identity,
                    mobile = mobile,
                    declarCode = declarCode,
                    startCreatedDate = startCreatedDate,
                    endCreatedDate = endCreatedDate
                });
                if (res.code < 0)
                    return Ok(new Response((int)ErrorCode.Failed, res.message));
                return Ok(new Response(res.results.ListAccounts));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
    }
}