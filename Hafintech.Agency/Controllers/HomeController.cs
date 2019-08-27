using _2017Utilities.Log;
using _2017Utilities.Session;
using Hafintech.Agency.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            if (AccountSession.AccountID > 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login", "Home");
            }
            
        }

        #region Login - Logout
        public ActionResult Login()
        {
            AccountLogin model = new AccountLogin();
            return View(model);
        }

        public ActionResult Register()
        {
            return PartialView();
        }

        public ActionResult ForgotPassword()
        {
            return PartialView();
        }

        [HttpPost]
        public int Logout()
        {
            var accounts = new Accounts();
            CookieManager _cookies = new CookieManager();
            _cookies.SetAuthenCookie(accounts, "");
            return 1;
        }

        #endregion

        #region header
        public ActionResult Header()
        {
            
            return PartialView();
        }

        public ActionResult MenuHeader()
        {
            ViewBag.AccountID = AccountSession.AccountID; 

            return PartialView();
        }
        #endregion

        #region thông báo
        public ActionResult Message()
        {
            return PartialView();
        }

        public ActionResult OTP()
        {
            return PartialView();
        }
        #endregion

        [HttpPost]
        public int SetAuthen(Accounts accounts)
        {
            try
            {
                CookieManager _cookies = new CookieManager();
                _cookies.SetAuthenCookie(accounts, "");
                return 1;
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return -69;
            }
        }

        #region reset password
        public ActionResult ResetPassword(string key = "")
        {
            ViewBag.key = key;

            return PartialView();
        }
        #endregion
    }
}