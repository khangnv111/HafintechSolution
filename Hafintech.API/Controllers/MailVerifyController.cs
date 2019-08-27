using App.Utils;
using App.Utils.GetData;
using App.Utils.Security;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using Hafintech.API.Models.Agency;
using System;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
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
        public async Task<IHttpActionResult> ForgotPassword(ForgotPasswordViewModel model)
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
                //if (!_appDAO.CheckEmail(model.Email))
                //{
                //    return Ok(new Response("Email chưa có trong hệ thống"));
                //}
                //var url = ConfigurationManager.AppSettings["APIURL"] + "account/getAccountInfoByID?accountID=" + AccountSession.AccountID;
                //var res = await DataService.GetAsync<Rootobject<dynamic>>(url);

                //var accountController = new AccountController();
                //var accountInfo =await accountController.GetInfo(model.Email);
                //if (accountInfo.VerifyEmailStatus < 1) return Ok(new Response((int)ErrorCode.Failed, "Bạn chưa xác thực Email"));

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

        #region forgot password
        [AllowAnonymous]
        [HttpPost]
        [Route("SendMailForgotPassword")]
        public async Task<IHttpActionResult> SendMailForgotPassword(ForgotPasswordViewModel model)
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

                var content = HttpUtility.HtmlEncode(ConfigurationManager.AppSettings["UrlRoot_Agency"] + "resetpassword?key=" + EncryptString(model.Email));
                SendMailCodeToUser(model.Email, content, "Xác thực đổi mật khẩu");
                return Ok(new Response((int)ErrorCode.Success, "Đã gửi mail về tài khoản"));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("resetPassword")]
        public async Task<IHttpActionResult> resetPassword(LoginRequest data)
        {
            try
            {
                if(string.IsNullOrEmpty(data.username))
                    return Ok(new Response("Đường dẫn không hợp lệ"));
                if (string.IsNullOrEmpty(data.password))
                    return Ok(new Response("Thiếu mật khẩu"));

                var username = DecryptString(data.username);
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/forgotPassword";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new {
                    userName = username,
                    passWord = data.password
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.code));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        public static string EncryptString(string encryptString)
        {
            string EncryptionKey = "hafintech_key123";
            byte[] clearBytes = Encoding.Unicode.GetBytes(encryptString);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
        });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(clearBytes, 0, clearBytes.Length);
                        cs.Close();
                    }
                    encryptString = Convert.ToBase64String(ms.ToArray());
                }
            }
            return encryptString;
        }

        public string DecryptString(string cipherText)
        {
            string EncryptionKey = "hafintech_key123";
            cipherText = cipherText.Replace(" ", "+");
            byte[] cipherBytes = Convert.FromBase64String(cipherText);
            using (Aes encryptor = Aes.Create())
            {
                Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] {
            0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76
        });
                encryptor.Key = pdb.GetBytes(32);
                encryptor.IV = pdb.GetBytes(16);
                using (MemoryStream ms = new MemoryStream())
                {
                    using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                    {
                        cs.Write(cipherBytes, 0, cipherBytes.Length);
                        cs.Close();
                    }
                    cipherText = Encoding.Unicode.GetString(ms.ToArray());
                }
            }
            return cipherText;
        }


        #endregion
    }
}