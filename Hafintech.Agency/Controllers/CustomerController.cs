using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.Agency.Controllers
{
    public class CustomerController : Controller
    {
        // GET: Customer

        #region khách hàng doanh nghiệp
        public ActionResult CustomerBusiness()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        //insert - update
        public ActionResult CustomerBusinessInsert()
        {
            return PartialView();
        }

        //Thông tin chi tiết khách hàng doanh nghiệp
        public ActionResult CustomerBusinessInfo(int businessId = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            ViewBag.businesId = businessId;

            return View();
        }

        //Danh sách tờ khai thông tin chi tiết doanh nghiệp
        public ActionResult CustomerBusinessDeclaration(int businessId = 0, string nameBusiness = "")
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.businesId = businessId;
            ViewBag.nameBusiness = nameBusiness;

            return View();
        }
        #endregion

        #region khách hàng cá nhân
        public ActionResult CustomerPersonal()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        public ActionResult CustomerPersonalInsert()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult SaveImg(FormCollection fc)
        {
            try
            {
                var accId = AccountSession.AccountID;

                string base64Img = fc["imgBase64"];
                string nameImg = fc["nameImg"];

                //tao thu muc neu k ton tai
                var today = DateTime.Now.ToString("yyyyMMdd", CultureInfo.InvariantCulture); //System.Configuration.ConfigurationManager.AppSettings["AvatarBaseDir"] 

                String pathImg = Server.MapPath("~/images/") + today + "/" + accId + "/"; //thu muc luu anh
                if (!Directory.Exists(pathImg))
                {
                    Directory.CreateDirectory(pathImg);
                }

                var ImgPath = pathImg + nameImg;

                byte[] bytes = Convert.FromBase64String(base64Img.Split(',')[1]);
                using (FileStream stream = new FileStream(ImgPath, FileMode.Create))
                {
                    stream.Write(bytes, 0, bytes.Length);
                    stream.Flush();
                }

                var UrlImg = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "images/" + today + "/" + accId + "/" + nameImg;

                // Returns message that successfully uploaded  
                return Json(new { ress = 1, mess = "File Uploaded Successfully!", imgUrl = UrlImg });
            }
            catch
            {
                return Json(new { ress = -99, mess = "Hệ thống bận!", imgUrl = "" });
            }
        }

        public ActionResult CustomerPersonalInfo(int personalId = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            ViewBag.personalId = personalId;

            return View();
        }

        public ActionResult CustomerPersonalDeclaration()
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