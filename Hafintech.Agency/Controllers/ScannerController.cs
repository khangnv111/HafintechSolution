using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class ScannerController : Controller
    {
        // GET: Scanner

        #region Danh sách soi chiếu
        public ActionResult ListScanner()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            }
            return View();
        }
        //Đăng ký / Sửa soi chiếu / Thêm hàng hóa
        public ActionResult PopRegisScanner(string tranId, int isInsertPro = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            }
            ViewBag.tranId = tranId;
            ViewBag.isInsertPro = isInsertPro;

            return View();
        }
        //Xem files
        public ActionResult ViewFiles()
        {
            return PartialView();
        }

        public ActionResult PopDeclaNEVS()
        {
            return PartialView();
        }
        //Xem cân
        public ActionResult WeighInfo()
        {
            return PartialView();
        }
        #endregion

        #region Thông tin mã soi chiếu
        //Thông tin chung
        public ActionResult VerifyCodeInfo(string tranId)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            }

            ViewBag.tranId = tranId;

            return View();
        }
        //Danh sách tờ khai
        public ActionResult VerifyCodeInfo_ListDecla(string tranId)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            }

            ViewBag.tranId = tranId;

            return View();
        }

        //Thêm hàng không tờ khai
        public ActionResult InsertProduct(string tranId)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            } 
            ViewBag.tranId = tranId;

            return View();
        }

        //Xem thông tin tờ khai
        public ActionResult ViewDecla(string tranId, string dclNo, int tab = 1, string barCode = "", string verifyCode = "")
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            }
            ViewBag.tranId = tranId;
            ViewBag.dclNo = dclNo;
            ViewBag.tab = tab;
            ViewBag.barCode = barCode;
            ViewBag.verifyCode = verifyCode;

            return PartialView();
        }
        #endregion

        #region Thông tin thanh toán
        public ActionResult ListInfoPayment()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            }
            return View();
        }

        public ActionResult PopInfoPayment()
        {
            return PartialView();
        }
        #endregion

        #region Danh sách phiếu thanh toán
        public ActionResult ListBillPayment()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");

            }
            return View();
        }

        public ActionResult BillPaymentDetail(string TransCode)
        {
            ViewBag.TransCode = TransCode;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home"); 
            }
            return View();
        }
        #endregion
    }
}