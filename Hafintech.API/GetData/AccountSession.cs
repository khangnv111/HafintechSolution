using Microsoft.AspNet.Identity;
using System;
using System.Security.Claims;
using System.Web;

namespace App.Utils
{
    public class AccountSession
    {
        public static long AccountID
        {
            get
            {
                long userId = 0;

                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    var identity = HttpContext.Current.User.Identity;
                    userId = Convert.ToInt64(identity.GetUserId());
                }
                return userId;
            }
        }

        public static string AccountName
        {
            get
            {
                string userName = string.Empty;
                if (HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    userName = HttpContext.Current.User.Identity.Name;
                }
                return userName;
            }
        }

        public static string NickName
        {
            get
            {
                string nickName = string.Empty;
                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    ClaimsIdentity claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
                    foreach (var claim in claimsIdentity.Claims)
                    {
                        if (claim.Type == "NickName")
                        {
                            nickName = claim.Value;
                            break;
                        }
                    }
                }

                return nickName;
            }
        }

        public static string AccessToken
        {
            get
            {
                string accessToken = "";
                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    ClaimsIdentity claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
                    foreach (var claim in claimsIdentity.Claims)
                    {
                        if (claim.Type == "AccessToken")
                        {
                            accessToken = claim.Value;
                            break;
                        }
                    }
                }

                return accessToken;
            }
        }

        public static string SourceID
        {
            get
            {
                string sourceId = "";
                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    ClaimsIdentity claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
                    foreach (var claim in claimsIdentity.Claims)
                    {
                        if (claim.Type == "SourceID")
                        {
                            sourceId = claim.Value;
                            break;
                        }
                    }
                }

                return sourceId;
            }
        }
        public static string Info
        {
            get
            {
                string info = "";
                if (HttpContext.Current != null && HttpContext.Current.User.Identity.IsAuthenticated)
                {
                    ClaimsIdentity claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
                    foreach (var claim in claimsIdentity.Claims)
                    {
                        if (claim.Type == "Info")
                        {
                            info = claim.Value;
                            break;
                        }
                    }
                }

                return info;
            }
        }
    }
}