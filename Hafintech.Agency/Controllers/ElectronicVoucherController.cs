using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class ElectronicVoucherController : Controller
    {
        #region Danh sách chứng từ điện tử
        public ActionResult ListVoucherCustom(string idDec, string dclNo, int tab = 1)
        {
            ViewBag.idDec = idDec ?? "";
            ViewBag.dclNo = dclNo ?? "";
            ViewBag.tab = tab;
            ViewBag.Type = int.Parse(Request["type"] ?? "2");
            ViewBag.IsHight = int.Parse(Request["ishight"] ?? "4");
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }
        public ActionResult ListVoucherSearch(string idDec, string dclNo, int tab = 1)
        {
            ViewBag.idDec = idDec ?? "";
            ViewBag.dclNo = dclNo ?? "";
            ViewBag.tab = tab;
            ViewBag.Type = int.Parse(Request["type"] ?? "2");
            ViewBag.IsHight = int.Parse(Request["ishight"] ?? "4");
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }
        #endregion

        #region popup Quản lý chứng từ hồ sơ hải quan
        public ActionResult PopupVoucher(string idDec, string dclNo, int? Type, int? IsHight)
        {
            ViewBag.idDec = idDec ?? "";
            ViewBag.dclNo = dclNo ?? "";
            ViewBag.Type = Type ?? 2;
            ViewBag.IsHight = IsHight ?? 2;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return PartialView();
        }
        public ActionResult PopSearchVoucher()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return PartialView();
        }
        public ActionResult GetListVoucherByDecl()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }
        public ActionResult PopupDeclare(int pos = 1)
        {
            ViewBag.pos = pos; // 1: vận tải đơn - 2: C/O - 3: Giấy phép - 4: hợp đồng - 5: Hóa đơn thương mại - 6: Container - 7: Chứng từ khác
            return PartialView();
        }

        //Khai báo vận đơn
        public ActionResult PopupBillDeclare(string idDec, string dclNo)
        {
            ViewBag.idDec = idDec;
            ViewBag.dclNo = dclNo;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return PartialView();
        }

        //Khai báo C/O
        public ActionResult CO_Declare()
        {
            return PartialView();
        }

        //Khai báo giấy phép
        public ActionResult LicenseDeclare()
        {
            return PartialView();
        }

        //Khai báo hợp đồng
        public ActionResult ContractDeclare()
        {
            return PartialView();
        }

        //Khai báo hóa đơn thương mại
        public ActionResult CommerceDeclare()
        {
            return PartialView();
        }

        //Khai báo container
        public ActionResult ContainerDeclare()
        {
            return PartialView();
        }

        //Khai báo chứng từ khác
        public ActionResult OtherDeclare()
        {
            return PartialView();
        }
         
        #endregion
        public ActionResult PopSelectObject()
        {
            return PartialView();
        }
    }
}