using System;
using System.Linq;
using System.Web;
using _2017Utilities.IpAddress;

namespace _2017Utilities.Session
{
    public class AccountSession
    {
        public static long AccountID
        {
            get
            {
                int userId = 0;

                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var s = HttpContext.Current.User.Identity.Name.Split('|'); 
                    userId = Convert.ToInt32(s[0]);
                }

                return userId;
            }
        }

        public static string AccountName
        {
            get
            {
                string AccountName = string.Empty;

                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated && !string.IsNullOrEmpty(HttpContext.Current.User.Identity.Name))
                {
                    var s = HttpContext.Current.User.Identity.Name.Split('|');
                    if (s != null && s.Length > 1)
                        AccountName = s[1];
                }

                return AccountName;
            }
        }

        public static string FullName
        {
            get
            {
                string NickName = string.Empty;

                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated && !string.IsNullOrEmpty(HttpContext.Current.User.Identity.Name))
                {
                    var s = HttpContext.Current.User.Identity.Name.Split('|');
                    if (s != null && s.Length > 1)
                        NickName = s[2];
                }

                return NickName;
            }
        }

        public static string Token
        {
            get
            {
                string token = "";

                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var s = HttpContext.Current.User.Identity.Name.Split('|');
                    token = s[3];
                }

                return token;
            }
        }

        public static string Department_Code
        {
            get
            {
                string Department_Code = string.Empty;

                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var s = HttpContext.Current.User.Identity.Name.Split('|');
                    Department_Code = s[4];
                }

                return Department_Code;
            }
        }

        public static string CreateCookie(long AccountId, string AccountName, string NickName,string Token, string Department_Code)
        {
            //string ipAddress = IPAddressHelper.GetClientIP();
            //accountId | username | NickName | TotalCoin
            return string.Format("{0}|{1}|{2}|{3}|{4}", AccountId, AccountName, NickName, Token, Department_Code);
        }
    }
}