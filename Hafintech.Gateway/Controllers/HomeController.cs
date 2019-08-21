using _2017Utilities.Log;
using _2017Utilities.Session;
using Hafintech.Gateway.Models;
using System;
using System.Web.Mvc;

namespace Hafintech.Gateway.Controllers
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

        public ActionResult Login()
        {
            AccountLogin model = new AccountLogin();
            return View(model);
        }

        public ActionResult Register()
        {
            return PartialView();
        }

        public ActionResult UpdateInfo()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login");
            }
            return View();
        }

        public ActionResult UpdateInfo_Part(AccountInfo info)
        {
            ViewBag.AccountID = info.AccountID;
            ViewBag.CreatedDate = info.CreatedDate;
            ViewBag.UserName = info.UserName;
            ViewBag.Identity = info.Identity;
            ViewBag.TaxCode = info.TaxCode;
            ViewBag.FullName = info.FullName;
            ViewBag.ProvinceCode = info.ProvinceCode;
            ViewBag.DistrictCode = info.DistrictCode;
            ViewBag.CommuneCode = info.CommuneCode;
            ViewBag.Address = info.Address;
            ViewBag.Mobile = info.Mobile;
            ViewBag.Password = info.Password;
            ViewBag.Gender = info.Gender;
            ViewBag.Gmail = info.Gmail;
            ViewBag.Zalo = info.Zalo;
            ViewBag.FacebookID = info.FacebookID;
            ViewBag.SourceID = info.SourceID;
            ViewBag.VerifyEmailStatus = info.VerifyEmailStatus;
            ViewBag.VerifyIdentityStatus = info.VerifyIdentityStatus;
            ViewBag.UpdatedDate = info.UpdatedDate;
            ViewBag.Bd_Day = (info.Birthday.ToShortDateString() == "1/1/0001" || info.Birthday.ToShortDateString() == "1/1/0000") ? "" : info.Birthday.Day.ToString();
            ViewBag.Bd_Month = (info.Birthday.ToShortDateString() == "1/1/0001" || info.Birthday.ToShortDateString() == "1/1/0000") ? "" : info.Birthday.Month.ToString();
            ViewBag.Bd_Year = (info.Birthday.ToShortDateString() == "1/1/0001" || info.Birthday.ToShortDateString() == "1/1/0000") ? "" : info.Birthday.Year.ToString();
            ViewBag.IdentityImgPath1 = info.IdentityImgPath1;
            ViewBag.IdentityImgPath2 = info.IdentityImgPath2;
            ViewBag.PasspostID = info.PassportID;
            ViewBag.PasspostImgPath = info.PassportImgPath; 
            ViewBag.DateReleased = (info.DateReleased.ToShortDateString() == "1/1/0001" || info.DateReleased.ToShortDateString() == "1/1/0000") ? "" : info.DateReleased.ToString();
            ViewBag.PlaceReleased = info.PlaceReleased;
            return PartialView();
        }

        public ActionResult ChangePassword()
        {
            return PartialView();
        }

        public ActionResult ForgotPassword()
        {
            return PartialView();
        }

        public ActionResult OTP()
        {
            return PartialView();
        }

        public ActionResult Message(string msg)
        {
            ViewBag.msg = msg;
            return PartialView();
        }

        public ActionResult AccuracyGuide()
        {
            if(Session["isShow"] == null)
            {
                ViewBag.Show = 1;
                Session["isShow"] = 1;
            }
            else
            {
                ViewBag.Show = 0;
            }
            return PartialView();
        }

        [HttpPost]
        public int SetAuthen(Accounts accounts)
        {
            try
            {
                NLogManager.LogMessage("SetAuthen");
                CookieManager _cookies = new CookieManager();
                _cookies.SetAuthenCookie(accounts, "");
                return 1;
            }
           catch(Exception ex)
            {
                NLogManager.PublishException(ex);
                return -69;
            }
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