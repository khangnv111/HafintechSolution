using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class AMAController : Controller
    {
        // GET: AMA
        public ActionResult ListAMA()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        public ActionResult InsertUpdateAMA(long decId = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.tab = tab;

            return View();
        }

        public ActionResult AMBGetInfo(long decId = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.tab = tab;

            return View();
        }

        public ActionResult AMCGetInfo(long decId = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.tab = tab;

            return View();
        }

        public ActionResult IDAGetInfo(long decId = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.tab = tab;

            return View();
        }

        public ActionResult IDAView(long decId = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.tab = tab;

            return View();
        }

        public ActionResult ResultAMA(long decId = 0, long dclNo = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.dclNo = dclNo;
            ViewBag.tab = tab;

            return View();
        }
    }
}