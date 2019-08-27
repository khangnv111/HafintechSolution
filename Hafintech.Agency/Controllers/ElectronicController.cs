using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _2017Utilities.Session; 


namespace Hafintech.Agency.Controllers
{
    public class ElectronicController : Controller
    {
        // GET: Electronic
        public ActionResult Other(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult Cargo(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult Container(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult Invoice(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult CO(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult Contract(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        public ActionResult License(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }
    }
}