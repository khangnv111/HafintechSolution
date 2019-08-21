using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace Hafintech.Gateway.Models
{
    public class CookieManager
    {
        public void SetAuthenCookie(Accounts data, string Department_Code)
        {
            string cookieUsername = AccountSession.CreateCookie(data.AccountID, data.UserName, data.FullName, data.AccessToken, Department_Code);
            string cookieDomain = FormsAuthentication.CookieDomain;
            cookieDomain = HttpContext.Current.Request.Url.Host;
            FormsAuthentication.SetAuthCookie(cookieUsername, false, FormsAuthentication.FormsCookiePath);
            HttpCookie cookie = FormsAuthentication.GetAuthCookie(cookieUsername, false, FormsAuthentication.FormsCookiePath);
            cookie.Domain = cookieDomain;
            HttpContext.Current.Response.Cookies.Add(cookie);
        }
    }
}