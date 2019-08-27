using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class HYSController : Controller
    {
        // GET: HYS
        public ActionResult ListHYS()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        #region HYS
        public ActionResult InsertHYS(long decId = 0, long attNo = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.attNo = attNo;
            ViewBag.tab = tab;

            return View();
        }

        public ActionResult ResultsHYS(long decId = 0, long attNo = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.attNo = attNo;
            ViewBag.tab = tab;

            return View();
        }
        #endregion

        #region HYE
        public ActionResult HYE_Declaration(long decId = 0, long attNo = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.attNo = attNo;

            return View();
        }
        public ActionResult ResultsHYE(long decId = 0, long attNo = 0, int tab = 2)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.attNo = attNo;
            ViewBag.tab = tab;

            return View();
        }
        #endregion

        #region IHY
        public ActionResult SearchIHY(long decId = 0, long attNo = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.attNo = attNo; 

            return View();
        }
        public ActionResult ViewIHY(long decId = 0, long attNo = 0, int tab = 3)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.attNo = attNo;
            ViewBag.tab = tab;

            return View();
        }
        #endregion
    }
}