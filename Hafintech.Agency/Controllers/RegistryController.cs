using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class RegistryController : Controller
    {
        // GET: Registry
        #region Danh sách tờ khai trình ký
        public ActionResult ListDecleration()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }
        #endregion

        #region thiết lập tài khoản được trình ký
        public ActionResult ListAccRegistry()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        //thiết lập tk pop
        public ActionResult PopApplyAcc(int id = 0)
        {
            return PartialView();
        }
        #endregion

        #region Duyệt trình ký
        public ActionResult ReviewRegistry()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        #endregion

        #region Chữ ký số
        public ActionResult ListRegNumber()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult CreateRegNumber(int id = 0)
        {
            return PartialView();
        }
        #endregion
    }
}