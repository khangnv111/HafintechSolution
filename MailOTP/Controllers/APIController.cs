using _2017Utilities.Constants;
using _2017Utilities.Log;
using MailOTP.Models;
using System;
using System.Configuration;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;

namespace MailOTP.Controllers
{
    [RoutePrefix("API")]
    public class APIController : ApiController
    {
        /// <summary>
        /// nhận mã xác thực
        /// </summary>
        /// <param name="email">email nhận mail</param>
        /// <param name="accountName">tài khoản cần xác thực</param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(bool))]
        [Route("TestEmailOTP")]
        public async Task<IHttpActionResult> TestEmailOTP(string email, string accountName)//, long accountId)
        {
            try
            {
                bool _rs = SendMailCodeToUser(email, accountName, 1);

                return Ok(_rs);
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return BadRequest();
            }
        }

        /// <summary>
        /// kiểm tra mã xác thực
        /// </summary>
        /// <param name="OTP"></param>
        /// <param name="accountName">tài khoản cần xác thực</param>
        /// <returns></returns>
        [HttpGet]
        [ResponseType(typeof(ResponseData))]
        [Route("TestEmailOTPCheck")]
        public async Task<IHttpActionResult> TestEmailOTPCheck(string OTP, string accountName)//, long accountId)
        {
            try
            {
                if (OTP.Trim().ToLower() != GetUserCodeVerify(accountName).ToLower())
                {
                    return Ok(new ResponseData()
                    {
                        Description = Constants.EMAIL_OTP_ERROR_MESSAGE,
                        ResponseCode = Constants.EMAIL_OTP_ERROR_CODE
                    });
                }

                return Ok(new ResponseData()
                {
                    Description = "Mã xác nhận Mail OTP Chính xác !",
                    ResponseCode = 1
                });
            }
            catch (Exception e)
            {
                NLogManager.PublishException(e);
                return BadRequest();
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

        private bool SendMailCodeToUser(string email, string accountName, long accountId)
        {
            try
            {
                var code = RandomString(8);
                AddUserCodeVerify(int.Parse(ConfigurationManager.AppSettings["TimeExpire"]), code, accountName);

                SmtpClient client = new SmtpClient();
                client.Port = 587;
                client.Host = "smtp.gmail.com";
                client.EnableSsl = true;
                client.Timeout = 10000;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(ConfigurationManager.AppSettings["MailAddress"], ConfigurationManager.AppSettings["MailPass"]);

                MailMessage mm = new MailMessage(ConfigurationManager.AppSettings["MailAddress"], email, "Tittle OTP", code);
                mm.BodyEncoding = UTF8Encoding.UTF8;
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

        #endregion PRIVATE
    }
}