using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        #region quản lý người dùng
        public ActionResult ListUser()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult CreateUser(int id = 0)
        {
            ViewBag.Id = id;

            return PartialView();
        }
        #endregion

        #region Danh sách phân quyền
        public ActionResult ListManagerRights()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult PopSetupRights()
        {
            return PartialView();
        }

        public ActionResult CreateGroup()
        {
            return PartialView();
        }

        #endregion

        //Pop Mã bảo mật
        public ActionResult SetSecurityKey()
        {
            return PartialView();
        }
    }
}