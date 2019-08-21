using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class DeclarationController : Controller
    {
        // GET: Declaration
        public ActionResult Index()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult LeftMenu()
        {
            //var url = Request.Url.ToString();
            //Uri MyUrl = new Uri(url);
            //var ishight = HttpUtility.ParseQueryString(MyUrl.Query).Get("ishight");

            //ViewBag.Hight = ishight; //1: thấp | <> 1: cao

            return PartialView();
        }

        #region Tờ khai GTC
        public ActionResult HightValueDeInsert(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;

            return View();
        }
        public ActionResult MIDForm(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        public ActionResult IDDForm(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        public ActionResult IDBForm(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult IDA01Form(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        public ActionResult HightDeclarationDetail(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;

            return View();
        }

        //Danh sach hàng hóa
        public ActionResult ListProduct(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;

            return View();
        }

        public ActionResult PopInsertHangHoa(long IdDec = 0, int proId = 0)
        {
            ViewBag.IdDec = IdDec;
            ViewBag.proId = proId;
            return PartialView();
        }

        public ActionResult getSearchTax(int? type, int? Page)
        {
            var Type = type != null ? (int)type : 1;

            ViewBag.type = Type;

            var page = Page != null ? (int)Page : 1;

            ViewBag.page = page;

            return PartialView();
        }
        #endregion

        #region Tờ khai GTT
        public ActionResult LowValueDeInsert(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            ViewBag.IdDec = IdDec;

            return View();
        }

        public ActionResult LowValueDeclarationDetail(long IdDec = 0)
        {
            ViewBag.IdDec = IdDec;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        public ActionResult IIDForm(long IdDec = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        #endregion

        public ActionResult PopSearch()
        {
            return PartialView();
        }

        #region Thông điệp nghiệp vụ tờ khai
        public ActionResult DeclarationMess()
        {
            return PartialView();
        }
        #endregion

        #region Chọn đối tượng khai
        public ActionResult SelectObjecDeclared()
        {
            return PartialView();
        }
        #endregion
    }
}