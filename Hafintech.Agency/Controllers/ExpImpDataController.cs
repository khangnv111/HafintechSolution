using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;
using Microsoft.Office.Core;
using System.Reflection;
using System.IO;
using System.Data;
using System.Data.OleDb;
using System.Globalization;
using Hafintech.Agency.Models;
using System.Web.Services;
using _2017Utilities.Log; 

namespace Hafintech.Agency.Controllers
{
    public class ExpImpDataController : Controller
    {
        // GET: ExpImpData
        public ActionResult ListImportExport()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        public ActionResult ImpExpPopup()
        {
            return PartialView();
        }

        public ActionResult Loading()
        {
            return PartialView();
        }

        [HttpPost]
        public JsonResult ExportXLSMIC(Declaration data)
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
                string templatePath = Server.MapPath("~/files/Template/ToKhaiHQMIC_Receive.xls"); 
                string OutputPath = Server.MapPath("~/files/export/MIC/");  

                //Tạo thư mục chứa file export nếu không có
                OutputPath = OutputPath + AccountSession.AccountID + "/"; 
                if (!Directory.Exists(OutputPath))
                {
                    Directory.CreateDirectory(OutputPath); 
                }
                //Xóa hết file trong thư mục
                System.IO.DirectoryInfo di = new DirectoryInfo(OutputPath);
                foreach (FileInfo file in di.GetFiles())
                {
                    //if (file.LastAccessTime < DateTime.Now.AddDays(-1))
                     file.Delete(); 
                }
                //End

                //Create file export
                var fileName = "MIC" + DateTime.Now.ToString("yyyyMMdd") + data.dclId + ".xls";
                OutputPath += fileName; 
                //if (System.IO.File.Exists(OutputPath))
                //{
                //    System.IO.File.Delete(OutputPath); //Nếu có rồi thì xóa đi
                //}
                System.IO.File.Copy(templatePath, OutputPath); //copy file
                
                //---------------------
                xlBook = (Excel.Workbook)excelApp.Workbooks.Open(templatePath, Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value, Missing.Value, Missing.Value,  Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value,  Missing.Value, Missing.Value, Missing.Value, Missing.Value);


                //Fill data
                IFormatProvider culture = new CultureInfo("en-US", true); 
                excelApp.Range["F4"].Value = "'" + data.dclNo;
                excelApp.Range["T4"].Value = data.clsOrg;
                excelApp.Range["AE4"].Value = data.insClsCd;
                excelApp.Range["L5"].Value = data.cstOfficeNm;
                excelApp.Range["AE5"].Value = data.cstSubSection;
                excelApp.Range["H6"].Value = data.regDate + " " + data.regTime;
                excelApp.Range["AB6"].Value = data.regDateOfCor + " " + data.regTimeOfCor;

                excelApp.Range["H8"].Value = data.imperCd;
                excelApp.Range["H9"].Value = data.imperNm;
                excelApp.Range["H10"].Value = data.postcode;
                excelApp.Range["H11"].Value = data.addressOfImp;
                excelApp.Range["H12"].Value = data.phoneNoOfImp;

                excelApp.Range["H14"].Value = data.consignorCd;
                excelApp.Range["H15"].Value = data.consignorNm;
                excelApp.Range["H16"].Value = data.postcodeIdt;
                excelApp.Range["H17"].Value = data.address1Street;
                excelApp.Range["V17"].Value = data.address2Street;
                excelApp.Range["H18"].Value = data.address3CityNm;
                excelApp.Range["V18"].Value = data.countryNm;
                excelApp.Range["H19"].Value = data.countryCd;
                //đại lý hải quan
                excelApp.Range["G20"].Value = data.agentCd;
                excelApp.Range["I20"].Value = data.agentNm;  
                excelApp.Range["AF20"].Value = data.cstBrokerCd;
                excelApp.Range["H22"].Value = data.houseAwbNo;
                excelApp.Range["H23"].Value = data.masterAwbNo;
                excelApp.Range["H24"].Value = data.unloadPortCd;
                excelApp.Range["J24"].Value = data.unloadPortNm;
                excelApp.Range["H25"].Value = data.loadLocCd;
                excelApp.Range["J25"].Value = data.loadLocNm;
                excelApp.Range["H26"].Value = data.flightNo;
                 
                excelApp.Range["H27"].Value = !String.IsNullOrEmpty(data.arrDate) ? DateTime.Parse(data.arrDate).ToString("dd-MM-yyyy") : ""; 
                excelApp.Range["U23"].Value = data.cargoPiece;
                excelApp.Range["Z24"].Value = data.cargoWeigGrs;
                excelApp.Range["V25"].Value = data.cstWrhCd;
                excelApp.Range["Y25"].Value = data.cstClrWrhNm;

                if (data.lsCurrency != null && data.lsCurrency.Length > 0)
                {
                    excelApp.Range["G30"].Value = data.lsCurrency[0].curCd;
                    excelApp.Range["J30"].Value = data.lsCurrency[0].curExcRate;
                }
                else
                {
                    excelApp.Range["G30"].Value = "";
                    excelApp.Range["J30"].Value = "";
                }
                if (data.lsCurrency != null && data.lsCurrency.Length > 1)
                {
                    excelApp.Range["G31"].Value = data.lsCurrency[1].curCd;
                    excelApp.Range["J31"].Value = data.lsCurrency[1].curExcRate;
                }
                else
                {
                    excelApp.Range["G31"].Value = "";
                    excelApp.Range["J31"].Value = "";
                }

                if (data.lsCurrency != null && data.lsCurrency.Length > 2)
                {
                    excelApp.Range["G32"].Value = data.lsCurrency[2].curCd;
                    excelApp.Range["J32"].Value = data.lsCurrency[2].curExcRate;
                }
                else
                {
                    excelApp.Range["G32"].Value = "";
                    excelApp.Range["J32"].Value = "";
                }

                excelApp.Range["G33"].Value = data.invPrcKindCd;
                excelApp.Range["I33"].Value = data.invPrcCdtCd;
                excelApp.Range["L33"].Value = data.invCurCd;
                excelApp.Range["N33"].Value = data.totalInvPrc;

                excelApp.Range["G34"].Value = data.freightDemarCd;
                excelApp.Range["I34"].Value = data.freightCurCd;
                excelApp.Range["L34"].Value = data.freight;
                excelApp.Range["N34"].Value = "";

                excelApp.Range["G35"].Value = data.insDemarCd;
                excelApp.Range["I35"].Value = data.insCurCd;
                excelApp.Range["L35"].Value = data.insAmt;
                excelApp.Range["N35"].Value = "";

                excelApp.Range["H38"].Value = data.itemName;
                excelApp.Range["J41"].Value = data.cstValue;
                excelApp.Range["U41"].Value = data.placeOriginCd;
                excelApp.Range["W41"].Value = data.oriPlaceNm;
                excelApp.Range["AC41"].Value = "";

                excelApp.Range["H42"].Value = data.notes;
                excelApp.Range["K44"].Value = data.eiControlNo;  
                //end

                xlSheet = (Excel.Worksheet)xlBook.Worksheets.get_Item(1); 

                object oFilename = OutputPath; 

                excelApp.DisplayAlerts = false;
                xlBook.SaveAs(oFilename);
                xlBook.Close();

                Res = 1;
                msg = "Thành công";
                linkdown = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "files/export/MIC/" + AccountSession.AccountID + "/" + fileName; 
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
    } 
}