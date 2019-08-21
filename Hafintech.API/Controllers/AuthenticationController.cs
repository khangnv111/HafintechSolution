using App.Utils;
using App.Utils.GetData;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using Microsoft.AspNet.Identity.Owin;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static App.Utils.Enums.Enums;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("auth")]
    public class AuthenticationController : ApiController
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

        [HttpPost]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(RegisterViewModel model)
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
            var user = new ApplicationUser { UserName = model.UserName };
            //  var result = await UserManager.CreateAsync(user, model.Password);
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/createAccount";
                var data = new
                {
                    username = model.UserName,
                    password = model.Password,
                    mobile = model.Mobile,
                    identity = model.Identity,
                    fullname = model.FullName,
                    provincecode = model.ProvinceCode,
                    districtcode = model.DistrictCode,
                    communecode = model.CommuneCode,
                    address = model.Address,
                    taxcode = model.TaxCode
                };
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);

                if (res == null)
                {
                    throw new Exception();
                }
                if (res.code < 0)
                {
                    return Ok(new Response(res.message));
                }

                var account = res.results.Accounts;
                user.Id = account.accountId.ToString();
                user.UserID = account.accountId;
                user.UserName = model.UserName;
                await SignInManager.SignInAsync(user, false, false);
                //gui ma otp den email
                //var uri = ConfigurationManager.AppSettings["APIOTP"].ToString() + "API/TestEmailOTP?email=" + model.UserName + "&accountname=" + model.UserName;
                //NLogManager.LogMessage(uri);
                //if (Convert.ToBoolean(await DataService.GetAsync(uri)))
                //    return Ok(new Response(ErrorCode.Success, "Đăng ký thành công đã gửi mã xác thực về email"));
                //var emailController = new MailVerifyController();
                //var content = HttpUtility.HtmlEncode("http://localhost:55619/mail/active?token=" + emailController.CreateToken(model.UserName));
                //emailController.SendMailCodeToUser(model.UserName, content, "Xác thực đổi mật khẩu");
                return Ok(new Response((int)ErrorCode.Success, "Đăng ký thành công"));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
        }
    }
}