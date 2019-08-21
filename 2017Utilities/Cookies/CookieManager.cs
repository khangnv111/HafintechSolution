using _2017Utilities.Log;
using _2017Utilities.Session;
using System;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;

namespace _2017Utilities.Cookies
{

    public class CookieController
    {
        // get cookie
        public string GetCookieOfName(string cookie_name)
        {
            string cookie = "";
            try
            {
                cookie = HttpContext.Current.Request.Cookies[cookie_name].Value;
            }
            catch (Exception)
            {
                cookie = "";
            }
            return cookie;
        }

        // active for Menu or view in razor
        public void SetCookieOfName(string cookie_name)
        {
            try
            {
                System.Web.HttpContext.Current.Response.Cookies[cookie_name].Value = "actived";
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        // set cookie for value & variable
        public void SetCookieOfName(string cookie_name, string variable_name)
        {
            try
            {
                System.Web.HttpContext.Current.Response.Cookies[cookie_name].Value = variable_name;
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        // remove cookie 
        public void RemoveCookie(string cookie_name)
        {
            try
            {
                System.Web.HttpContext.Current.Response.Cookies[cookie_name].Expires = DateTime.Now.AddDays(-1);
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }

        public void CheckPermission(string username, string action, string type)
        {
            var URL_ROOT_CMS = Config.Config.UrlRoot;
            if (string.IsNullOrEmpty(username))
            {
                HttpContext.Current.Response.Redirect(URL_ROOT_CMS + "Home/Login");
            }
            if (HttpContext.Current.Request.Cookies["UsernameApp"] != null)
            {
                string nameRole = string.Format("Role_{0}_{1}", action, username);
                var role = HttpContext.Current.Request.Cookies["UsernameApp"].Values[nameRole];
                if (role != null)
                {
                    if (role.ToString().Contains(string.Format("{0}_0", type.Trim())))
                    {
                        HttpContext.Current.Response.Redirect(URL_ROOT_CMS + "Home/MessagePermission");
                    }
                }
                else
                { HttpContext.Current.Response.Redirect(URL_ROOT_CMS + "Home/MessagePermission"); }
            }
            else
            { HttpContext.Current.Response.Redirect(URL_ROOT_CMS + "Home/Login"); }
        }
        public int CkPermission(string username, string action, string type)
        {
            if (string.IsNullOrEmpty(username))
            {
                return 0;
            }
            if (HttpContext.Current.Request.Cookies["UsernameApp"] != null)
            {
                string nameRole = string.Format("Role_{0}_{1}", action, username);
                var role = HttpContext.Current.Request.Cookies["UsernameApp"].Values[nameRole];
                if (role != null)
                {
                    if (role.ToString().Contains(string.Format("{0}_0", type.Trim())))
                    {
                        return 1;
                    }
                }
                else
                { return 0; }
            }
            else
            { return 0; }
            return 2;
        }

    }

    public class CacheCounter
    {
        public static string InsertCacheKey(int totalSecond, string keyName, string value)
        {
            try
            {
                System.Runtime.Caching.ObjectCache cache = System.Runtime.Caching.MemoryCache.Default;
                System.Runtime.Caching.CacheItemPolicy policy = new System.Runtime.Caching.CacheItemPolicy()
                {
                    AbsoluteExpiration = DateTime.Now.AddSeconds(totalSecond)
                };
                cache.Set(keyName, value, policy);
                return value;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }

        public static string GetCacheKey(string keyName)
        {
            try
            {
                System.Runtime.Caching.ObjectCache cache = System.Runtime.Caching.MemoryCache.Default;
                object cacheCounter = cache.Get(keyName);
                if (cacheCounter == null)
                {
                    return string.Empty;
                }
                return cacheCounter.ToString();
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }


    }
}