using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class DashboardController : Controller
    {
        // GET: Dashboard

        #region Danh sách chứng từ trình ký
        public ActionResult ListDashboard()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }
        #endregion
    }
}