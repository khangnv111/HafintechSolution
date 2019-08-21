using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Gateway.Controllers
{
    public class ElectronicVoucherController : Controller
    {
        // GET: ElectronicVoucher

        #region Danh sách chứng từ điện tử
        public ActionResult ListVoucherCustom(long idDec)
        {
            ViewBag.idDec = idDec;
            return View();
        }
        #endregion

        #region popup Quản lý chứng từ hồ sơ hải quan
        public ActionResult PopupVoucher()
        {
            return PartialView();
        }

        public ActionResult PopupDeclare(int pos = 1)
        {
            ViewBag.pos = pos; // 1: vận tải đơn - 2: C/O - 3: Giấy phép - 4: hợp đồng - 5: Hóa đơn thương mại - 6: Container - 7: Chứng từ khác
            return PartialView();
        }

        //Khai báo vận đơn
        public ActionResult PopupBillDeclare()
        {
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
    }
}