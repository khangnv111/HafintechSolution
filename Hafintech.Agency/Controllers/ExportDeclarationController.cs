using _2017Utilities.Log;
using _2017Utilities.Session;
using Hafintech.Agency.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;

namespace Hafintech.Agency.Controllers
{
    public class ExportDeclarationController : Controller
    {
        // GET: ExportDeclaration
        public ActionResult ListDeclaration()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        #region Tờ khai xuất khẩu GTT
        public ActionResult MEC_InsertUpdate(long decId = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.tab = tab;

            return View();
        }
        public ActionResult MED_GetInfo(long decId = 0, string dclNo = "")
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.dclNo = dclNo;
            return View();
        }
        public ActionResult IEX_GetInfo(long decId = 0, string dclNo = "")
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.dclNo = dclNo;
            return View();
        }
        public ActionResult ResultMEC(long decId = 0, long dclNo = 0, int tab = 1)
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
        public ActionResult MECDeclarationView(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }
        #endregion

        #region Popup
        public ActionResult PopSearch()
        {
            return PartialView();
        }

        public ActionResult PopSelectObject()
        {
            return PartialView();
        }
        #endregion

        #region Tờ khai xuất khẩu GTC
        public ActionResult EDA_InsertUpdate(long decId = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            ViewBag.tab = tab;

            return View();
        }
        //Thông tin chung
        public ActionResult EDA_Info(long decId = 0)
        { 
            ViewBag.decId = decId;

            return PartialView();
        }
        public ActionResult EDC_Info(long decId = 0)
        {
            ViewBag.decId = decId;

            return PartialView();
        }

        //Thông tin container
        public ActionResult EDA_Container(long decId = 0)
        {
            ViewBag.decId = decId;

            return PartialView();
        }
        public ActionResult IEXDeclaration(long decId = 0)
        {
            ViewBag.decId = decId;
            return View();
        }
        public ActionResult IEX_Info(long decId = 0)
        {
            ViewBag.decId = decId;

            return PartialView();
        }
        public ActionResult IEX_ViewResult(long decId = 0)
        {
            ViewBag.decId = decId;
            return PartialView();
        }
        public ActionResult EDBDeclaration(long decId = 0)
        {
            return PartialView();
        }

        public ActionResult EDCDeclaration(long decId = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            return View();
        }

        public ActionResult EDDDeclaration(long decId = 0)
        {
            ViewBag.decId = decId;
            return PartialView();
        }
        public ActionResult EDA01Declaration(long decId = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            return PartialView();
        }
         
        public ActionResult ListProduct(long Id = 0)
        {
            ViewBag.IdDe = Id;
            return PartialView();
        }
        public ActionResult EDADetail(long IdDec = 0, long IdPro = 0)
        {
            ViewBag.IdDe = IdDec;
            ViewBag.IdPro = IdPro;
            return PartialView();
        }
        public ActionResult EDEDeclaration(long decId = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = decId;
            return View();
        }
        public ActionResult TabResultXLTK(long decId = 0, long dclNo = 0, int tab = 1)
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
        public ActionResult EDCDetail(long IdDec=0,long IdPro = 0)
        {
            ViewBag.IdDe = IdDec;
            ViewBag.IdPro = IdPro;
            return PartialView();
        }
        #endregion

        #region Export Excel
        [HttpPost]
        public JsonResult ExportXLSMEC(Declaration data)
        {
            Excel.Application excelApp = null;
            Excel.Worksheet xlSheet;
            Excel.Workbook xlBook;
            var Res = 0;
            var msg = "";
            var linkdown = "";
            try
            {
                excelApp = new Excel.Application();
                string templatePath = Server.MapPath("~/files/Template/ToKhaiHQMEC_Receipt.xls");
                //Nếu thông quan
                if(!string.IsNullOrEmpty(data.dateOfPermit) && !string.IsNullOrWhiteSpace(data.dateOfPermit))
                {
                    templatePath = Server.MapPath("~/files/Template/ToKhaiHQMEC_Export.xls");
                }

                string OutputPath = Server.MapPath("~/files/export/MEC/");

                //Tạo thư mục chứa file export nếu không có
                OutputPath = OutputPath + AccountSession.AccountID + "/";
                if (!Directory.Exists(OutputPath))
                {
                    Directory.CreateDirectory(OutputPath);
                }
                //Xóa hết file trong thư mục 1 giờ trước đó
                System.IO.DirectoryInfo di = new DirectoryInfo(OutputPath);
                foreach (FileInfo file in di.GetFiles())
                {
                    if (file.LastAccessTime < DateTime.Now.AddHours(-1))
                        file.Delete();
                }
                //End

                //Create file export
                var fileName = "MEC_" + DateTime.Now.ToString("yyyyMMdd") + "_" + data.declarationId + ".xls";
                OutputPath += fileName;  
                System.IO.File.Copy(templatePath, OutputPath, true); //copy file and replace

                //---------------------
                xlBook = (Excel.Workbook)excelApp.Workbooks.Open(templatePath, Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);


                //Fill data
                IFormatProvider culture = new CultureInfo("en-US", true);
                excelApp.Range["H4"].Value = "'" + data.dclNo;
                excelApp.Range["AA4"].Value = data.insClsCd;
                excelApp.Range["L5"].Value = data.cstOffice + " - " + data.cstOfficeNm;
                excelApp.Range["AA5"].Value = data.cstSubSection; 
                excelApp.Range["G6"].Value = ConvertDateInt(data.regDate) + " " + ConvertHoursInt(data.regTime);
                excelApp.Range["AA6"].Value = ConvertDateInt(data.regDateOfCor) + " " + ConvertHoursInt(data.regTimeOfCor);

                excelApp.Range["H8"].Value = data.experCd;
                excelApp.Range["H9"].Value = data.experNm;
                excelApp.Range["H10"].Value = data.postcode;
                excelApp.Range["H11"].Value = data.addressOfExp;
                excelApp.Range["H12"].Value = data.phoneNoOfExp;

                excelApp.Range["H14"].Value = data.consigneeCd;
                excelApp.Range["H15"].Value = data.consigneeNm;
                excelApp.Range["H16"].Value = data.postcodeIdt;
                excelApp.Range["H17"].Value = data.address1Street;
                excelApp.Range["V17"].Value = data.address2Street;
                excelApp.Range["H18"].Value = data.address3CityNm;
                excelApp.Range["V18"].Value = data.countryNm; 
                excelApp.Range["H19"].Value = data.countryCd;

                excelApp.Range["G21"].Value = data.agentCd;
                excelApp.Range["I21"].Value = data.agentNm;
                excelApp.Range["AF21"].Value = data.cstBrokerCd;

                excelApp.Range["H23"].Value = data.houseAwbNo;
                excelApp.Range["H24"].Value = data.finalDesCd;
                excelApp.Range["K24"].Value = data.finalDesNm;
                excelApp.Range["H25"].Value = data.loadPortCd;
                excelApp.Range["J25"].Value = data.loadPortNm;
                excelApp.Range["H26"].Value = data.cargoPiece;
                excelApp.Range["AB26"].Value = data.cargoWeigGrs; 
                excelApp.Range["H27"].Value = data.cstWrhCd;
                excelApp.Range["K27"].Value = data.cstWrhNm;

                excelApp.Range["H29"].Value = data.curCd;
                excelApp.Range["K29"].Value = data.curExRate; 
                excelApp.Range["W29"].Value = data.totalTaxVal;
                excelApp.Range["AA29"].Value = data.curCdTtlTaxVal;
                excelApp.Range["H31"].Value = data.itemName;
                //excelApp.Range["J34"].Value = data.dclPrice;
                excelApp.Range["J34"].Value = data.cstValue;
                excelApp.Range["H35"].Value = data.notes;
                excelApp.Range["K37"].Value = data.eiControlNo;
                //Trường hợp tờ khai thông quan
                if (!string.IsNullOrEmpty(data.dateOfPermit) && !string.IsNullOrWhiteSpace(data.dateOfPermit))
                {
                    excelApp.Range["J40"].Value = data.dateOfPermit + " " + data.timeOfPermit; 
                }
                //end 

                object oFilename = OutputPath;

                excelApp.DisplayAlerts = false;
                xlBook.SaveAs(oFilename);
                xlBook.Close();

                Res = 1;
                msg = "Thành công";
                linkdown = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "files/export/MEC/" + AccountSession.AccountID + "/" + fileName;
            }
            catch (Exception ex)
            {
                NLogManager.LogError("ExportData Error: " + ex.ToString());
                Res = -1;
                msg = ex.ToString();
                linkdown = "";
            }
            finally
            {
                System.Threading.Thread.Sleep(1000);
                excelApp.Quit();
                System.Runtime.InteropServices.Marshal.ReleaseComObject(excelApp);
                GC.Collect();
                GC.WaitForPendingFinalizers();
                System.Threading.Thread.Sleep(1500);
            }
            return Json(new { Response = Res, msg = msg, linkDown = linkdown });
        }

        public string ConvertDateInt(string date)
        {
            try
            {
                if (string.IsNullOrEmpty(date) || string.IsNullOrWhiteSpace(date))
                    return "";

                DateTime dt = DateTime.ParseExact(date, "ddMMyyyy", CultureInfo.InvariantCulture, DateTimeStyles.None);

                string formattedDateTime = dt.ToString("dd/MM/yyyy", CultureInfo.InvariantCulture);

                return formattedDateTime;
            }
            catch(Exception e)
            {
                return date;
            } 
        }

        public string ConvertHoursInt(string hours)
        {
            try
            {
                var h = hours.Substring(0, 2);
                var m = hours.Substring(2, 2);
                var s = hours.Substring(4, 2);

                return h + ":" + m + ":" + s;
            }
            catch(Exception e)
            {
                return hours;
            }
        }
        #endregion
    }
}