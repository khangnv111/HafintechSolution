using _2017Utilities.Log;
using _2017Utilities.Session;
using Hafintech.CustomsInfo.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.CustomsInfo.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            if (AccountSession.AccountID > 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult ListUser()
        {
            if (AccountSession.AccountID > 0)
            {
                return View();
            }
            else
            {
                return RedirectToAction("Login");
            }
        }

        public ActionResult AccountInfo(int uid = 0)
        {
            ViewBag.uid = uid;
            return View();
        }

        public ActionResult Declaration_List(int uid = 0)
        {
            ViewBag.uid = uid;
            return View();
        }

        public ActionResult Declaration_Detail(long decID = 0, int uid = 0)
        {
            ViewBag.uid = uid;
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult DeclarationHV_Detail(long decID = 0, int uid = 0)
        {
            ViewBag.uid = uid;
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabCommodity_List(long decID = 0, int uid = 0)
        {
            ViewBag.uid = uid;
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabDirective_List(long decID = 0, int uid = 0)
        {
            ViewBag.uid = uid;
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabResult(long decID = 0, int uid = 0)
        {
            ViewBag.uid = uid;
            ViewBag.declarationID = decID;
            return View();
        }



        public ActionResult Login()
        {
            AccountLogin model = new AccountLogin();
            return View(model);
        }

        public ActionResult Message(string msg)
        {
            ViewBag.msg = msg;
            return PartialView();
        }

        [HttpPost]
        public int SetAuthen(Accounts accounts)
        {
            CookieManager _cookies = new CookieManager();
            _cookies.SetAuthenCookie(accounts, "");
            return 1;
        }

        [HttpPost]
        public int Logout()
        {
            var accounts = new Accounts();
            CookieManager _cookies = new CookieManager();
            _cookies.SetAuthenCookie(accounts, "");
            return 1;
        }

        public ActionResult Header()
        {
            try
            {
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return PartialView();
        }

        public ActionResult MenuHeader()
        {
            ViewBag.AccountID = AccountSession.AccountID;
            return PartialView();
        }
    }
}