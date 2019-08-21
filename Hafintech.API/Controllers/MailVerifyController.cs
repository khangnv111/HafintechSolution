using App.Utils;
using App.Utils.GetData;
using App.Utils.Security;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using System;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static App.Utils.Enums.Enums;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("Mail")]
    public class MailVerifyController : ApiController
    {
        private AppDAOImpl _appDAO = new AppDAOImpl();

        [HttpGet]
        [Route("Verify")]
        public IHttpActionResult Verify(string token)
        {
            token = token.Replace(' ', '+');
            var email = DecryptToken(token);
            var password = Utils.Random(0, 999999);
            var encryptPassword = Security.MD5Encrypt(password.ToString());
            var res = _appDAO.ForgotPassword(email, encryptPassword, "");

            //var url = ConfigurationManager.AppSettings["APIURL"] + "account/updateAccount";
            //var res = await DataService.GetAsync<Rootobject<AccountInfoJava>>(url);
            //if (res.code < 0)
            //    return Ok(new Response((int)ErrorCode.Failed, res.message));
            //var info = res.results.Accounts;

            if (!res) return Ok(new Response((int)ErrorCode.Failed, "Xác nhận thất bại"));
            var content = "Mật khẩu mới của bạn là: " + password;
            SendMailCodeToUser(email, content, "Xác thực đổi mật khẩu");
            return Ok(new Response((int)ErrorCode.Success, "Đã mật khẩu mới về email"));
        }

        [HttpGet]
        [Route("Active")]
        public IHttpActionResult Active(string token)
        {
            token = token.Replace(' ', '+');
            var email = DecryptToken(token);
            var res = _appDAO.Verify(email, 1, 0, 0);
            if (!res) return Ok(new Response((int)ErrorCode.Failed, "Xác nhận thất bại"));
            return Ok(new Response((int)ErrorCode.Success, "Xác nhận thành công"));
        }

        public static string GetToken(string plainText, string sign = "f00f5bc508f5fa64")
        {
            try
            {
                var time = DateTime.Now.Ticks;
                return new RijndaelEnhanced("token", "79ff9d453320f337").Encrypt(time.ToString() + '-' + plainText + sign);
            }
            catch
            {
                return string.Empty;
            }
        }

        public static string DecryptToken(string token, string sign = "f00f5bc508f5fa64")
        {
            try
            {
                var plainText = new RijndaelEnhanced("token", "79ff9d453320f337").Decrypt(token);
                plainText = plainText.Replace(sign, "");
                var timeOfCurrentToken = new DateTime(Convert.ToInt64(plainText.Split('-')[0]));
                if (DateTime.Compare(timeOfCurrentToken.AddMinutes(15), DateTime.Now) < 0)
                {
                    return null;
                }
                return plainText.Split('-')[1];
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return string.Empty;
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("ForgotPassword")]
        public IHttpActionResult ForgotPassword(ForgotPasswordViewModel model)
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
                if (!_appDAO.CheckEmail(model.Email))
                {
                    return Ok(new Response("Email chưa có trong hệ thống"));
                }
                var accountInfo = _appDAO.GetAccountInfoByEmail(model.Email);
                if (accountInfo.VerifyEmailStatus < 1) return Ok(new Response((int)ErrorCode.Failed, "Bạn chưa xác thực Email"));

                var content = HttpUtility.HtmlEncode(ConfigurationManager.AppSettings["ROOT"] + "mail/verify?token=" + CreateToken(model.Email));
                SendMailCodeToUser(model.Email, content, "Xác thực đổi mật khẩu");
                return Ok(new Response((int)ErrorCode.Success, "Đã gửi mail về tài khoản"));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetLinkActive")]
        public IHttpActionResult GetLinkActive()
        {
            try
            {
                var content = HttpUtility.HtmlEncode(ConfigurationManager.AppSettings["ROOT"] + "mail/active?token=" + CreateToken(AccountSession.AccountName));
                SendMailCodeToUser(AccountSession.AccountName, content, "Active Email");
                return Ok(new Response((int)ErrorCode.Success, "Đã gửi mail về tài khoản"));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        public bool SendMailCodeToUser(string email, string content, string title)
        {
            try
            {
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                client.Timeout = 10000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["MailAddress"], ConfigurationManager.AppSettings["MailPass"]);

                MailMessage mm = new MailMessage(ConfigurationManager.AppSettings["MailAddress"], email, title, content);
                mm.BodyEncoding = Encoding.UTF8;
                mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;

                client.Send(mm);

                return true;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return false;
        }

        public string CreateToken(string email)
        {
            return GetToken(email);
        }

        public async Task<int> GetOTP(string email, string accountName, int accountID)
        {
            try
            {
                var _rs = await SendMailCodeToUser(email, accountName, accountID);
                return _rs;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        /// <summary>
        /// kiểm tra mã xác thực
        /// </summary>
        /// <param name="OTP"></param>
        /// <param name="accountName">tài khoản cần xác thực</param>
        /// <returns></returns>

        public async Task<int> EmailOTPCheck(string OTP, string accountName)//, long accountId)
        {
            try
            {
                NLogManager.LogMessage("OTP:" + OTP + " accountName: " + accountName);
                // return (OTP.Trim().ToLower() == GetUserCodeVerify(accountName).ToLower());

                var url = ConfigurationManager.AppSettings["APIURL"] + "account/verificationEmail?accountId=" + AccountSession.AccountID + "&otpCode=" + OTP;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return res.code;

                return 1;
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return -99;
            }
        }

        #region PRIVATE

        private string RandomString(int size)
        {
            Random _rng = new Random();
            const string _chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            char[] buffer = new char[size];

            for (int i = 0; i < size; i++)
            {
                buffer[i] = _chars[_rng.Next(_chars.Length)];
            }
            return new string(buffer);
        }

        public static int AddUserCodeVerify(int totalSecond, string codeValue, string accountName)
        {
            try
            {
                System.Runtime.Caching.ObjectCache cache = System.Runtime.Caching.MemoryCache.Default;
                System.Runtime.Caching.CacheItemPolicy policy = new System.Runtime.Caching.CacheItemPolicy()
                {
                    AbsoluteExpiration = DateTime.Now.AddSeconds(totalSecond)
                };
                cache.Set("OTPMail_" + accountName, codeValue, policy);
                return 1;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return -1;
            }
        }

        public static string GetUserCodeVerify(string accountName)
        {
            try
            {
                System.Runtime.Caching.ObjectCache cache = System.Runtime.Caching.MemoryCache.Default;
                object cacheCounter = cache.Get("OTPMail_" + accountName);
                if (cacheCounter == null)
                {
                    return string.Empty;
                }
                return cacheCounter.ToString();
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return string.Empty;
            }
        }

        private async Task<int> SendMailCodeToUser(string email, string accountName, long accountId)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/getOTP?accountId=" + accountId.ToString();
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0) return res.code;
                var code = Convert.ToString(res.results.AccountOtp.OTP);
                NLogManager.LogMessage(code);
                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                client.Timeout = 10000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["MailAddress"], ConfigurationManager.AppSettings["MailPass"]);
                NLogManager.LogMessage(string.Format("accountName: {0}, otp: {1}", accountName, code));
                MailMessage mm = new MailMessage(ConfigurationManager.AppSettings["MailAddress"], email, "Tittle OTP", Convert.ToString(code));
                mm.BodyEncoding = Encoding.UTF8;
                mm.DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure;
                client.Send(mm);
                NLogManager.LogMessage(code);

                return 1;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return -99;
        }

        #endregion PRIVATE
    }
}