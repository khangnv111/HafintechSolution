using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using _2017Utilities.Session;
using Microsoft.Office.Interop.Excel;
using Hafintech.Agency.Models;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using System.IO;
using _2017Utilities.Log;

namespace Hafintech.Agency.Controllers
{
    public class TransportDeclarationController : Controller
    {
        // Create COM Objects
        Microsoft.Office.Interop.Excel.Application excelApplication;
        Microsoft.Office.Interop.Excel.Workbook excelWorkbook;
        Microsoft.Office.Interop.Excel.Workbook excelWorkbook1;
        Microsoft.Office.Interop.Excel.Worksheet excelworksheet;
        Microsoft.Office.Interop.Excel.Range excelRange;


        // GET: TransportDeclaration
        public ActionResult OLA(long olaid = 0, int tab = 1)
        {
            ViewBag.decId = olaid;
            ViewBag.tab = tab;
            return View();
        }

        public ActionResult OLA_Info(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return PartialView();
        }

        public ActionResult ListProduct(long olaid = 0)
        {
            ViewBag.IdDe = olaid;
            return PartialView();
        }
        public ActionResult Product()
        {
            return View();
        }

        public ActionResult OLC(long olaid = 0, int tab = 1)
        {
            ViewBag.decId = olaid;
            ViewBag.tab = tab;
            return View();
        }

        public ActionResult OLC_Info(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return PartialView();
        }
        public ActionResult BOA()
        {
            return View();
        }

        public ActionResult BIA()
        {
            return View();
        }

        public ActionResult OLB(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return View();
        }

        public ActionResult COT11(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return View();
        }

        public ActionResult COT(long olaid = 0, int tab = 1)
        {
            ViewBag.decId = olaid;
            ViewBag.tab = tab;
            return View();
        }
        public ActionResult BIA11()
        {
            return View();
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ITF(long olaid = 0, int tab = 1)
        {
            ViewBag.decId = olaid;
            ViewBag.tab = tab;
            return View();
        }

        public ActionResult ITF_Info(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return PartialView();
        }

        public ActionResult ITF_GetInfo(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return View();
        }
        public ActionResult ITF_Change(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return PartialView();
        }
        public ActionResult ITF_Product(long olaid = 0)
        {
            ViewBag.IdDe = olaid;
            return PartialView();
        }
        public ActionResult ListTransport()
        {
            return View();
        }
        public ActionResult ResultXLTK_OLA(long olaid = 0, long dclNo = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = olaid;
            ViewBag.dclNo = dclNo;
            ViewBag.tab = tab;
            return View();
        }
        public ActionResult RegisterTKOnly(long olaid = 0)
        {
            ViewBag.decId = olaid;
            return View();
        }

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

        #region EXPORT EXCEL
        [HttpPost]
        public JsonResult ExportExcelOLA(OLADetails data)
        {
            var Res = 0;
            var msg = "";
            //var workbookPath = "";
            var result = "";
            string filePath = string.Format("{0}\\ToKhaiOLA_BanSao.xls", Server.MapPath("~/files"));
            string OutputPath = Server.MapPath("~/files/ExportOLA/");
            string OutputPathPDF = Server.MapPath("~/files/ExportPdfOLA/");

            //Tạo thư mục chứa file export nếu không có
            OutputPath = OutputPath + AccountSession.AccountID + "/";
            if (!Directory.Exists(OutputPath))
            {
                Directory.CreateDirectory(OutputPath);
            }
            //Create file export
            var fileName = "ToKhaiOLA_" + DateTime.Now.ToString("yyyyMMdd") + "_" + data.btDclId + ".xls";
            OutputPath += fileName;
            if (System.IO.File.Exists(OutputPath))
            {
                System.IO.File.Delete(OutputPath); //Nếu có rồi thì xóa đi
            }
            System.IO.File.Copy(filePath, OutputPath); //copy file
            ReadExcel(filePath, data, OutputPath);
            result = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "files/ExportOLA/" + AccountSession.AccountID + "/" + fileName;
            //var result = ExportWorkbookToPdf(workbookPath, OutputPathPDF, data);
            Res = 1;
            msg = "Thành công";
            return Json(new { ResponseStatus = Res, msg = msg, linkDown = result });
        }
        public string InsertDataToExcel(OLADetails data, string filePath)
        {
            excelApplication = new Microsoft.Office.Interop.Excel.Application();
            excelApplication.DisplayAlerts = true;
            excelApplication.Visible = true;
            excelWorkbook = excelApplication.Workbooks.Open(filePath, Missing.Value, ReadOnly: false);
            excelworksheet = (Microsoft.Office.Interop.Excel.Worksheet)excelWorkbook.Sheets.get_Item("OLACHUAN");
            excelRange = excelworksheet.UsedRange;
            if (excelWorkbook == null)
            {
                excelApplication.Quit();

                excelApplication = null;
                excelWorkbook = null;

                return "";
            }
            int rCnt1 = 0;
            int cCnt1 = 0;
            for (rCnt1 = 1; rCnt1 <= excelRange.Rows.Count; rCnt1++)
            {
                for (cCnt1 = 1; cCnt1 <= excelRange.Columns.Count; cCnt1++)
                {
                    if (Convert.ToString(excelworksheet.Cells[rCnt1, cCnt1].Value2) == "cfirmReqSlIn")
                    {
                        data.cfirmReqSlIn = excelworksheet.Cells[rCnt1, cCnt1].Value2;
                    }
                }
            }
            excelWorkbook.Save();
            excelWorkbook.Close(true, Missing.Value, Missing.Value);
            excelApplication.Quit();

            return "";
        }

        /// <summary>
        /// Read excel file
        /// </summary>
        /// <param name="filepath"></param>
        /// <param name="data"></param>
        /// <param name="OutputPath"></param>
        public void ReadExcel(string filepath, OLADetails data, string OutputPath)
        {
            try
            {
                excelApplication = new Microsoft.Office.Interop.Excel.Application();
                if (excelApplication != null)
                {
                    excelWorkbook = excelApplication.Workbooks.Open(filepath, 0, true, 5, "", "", true, Microsoft.Office.Interop.Excel.XlPlatform.xlWindows, "\t", false, false, 0, true, 1, 0);
                    var excelworksheet1 = (Microsoft.Office.Interop.Excel.Worksheet)excelWorkbook.Sheets[1];
                    var excelworksheet2 = (Microsoft.Office.Interop.Excel.Worksheet)excelWorkbook.Sheets[2];
                    var excelworksheet3 = (Microsoft.Office.Interop.Excel.Worksheet)excelWorkbook.Sheets[3];
                    var excelworksheet4 = (Microsoft.Office.Interop.Excel.Worksheet)excelWorkbook.Sheets[4];
                    var excelworksheet5 = (Microsoft.Office.Interop.Excel.Worksheet)excelWorkbook.Sheets[5];
                    var excelworksheet6 = (Microsoft.Office.Interop.Excel.Worksheet)excelWorkbook.Sheets[6];
                    // Kiểm tra số vận đơn
                    // ẩn hiện sheets
                    if (data.lsCargoNo != null && data.lsCargoNo.Length > 0)
                    {
                        switch (data.lsCargoNo.Length)
                        {
                            case 1:
                                // Khai báo và fill data vào sheet 1
                                WriteExcelSheet1(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 4 
                                WriteExcelSheet4(data, excelWorkbook, 0);
                                // Khởi tạo và fill data vào sheet 6
                                WriteExcelSheet6(data, excelWorkbook);
                                excelworksheet2.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                excelworksheet3.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                excelworksheet5.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                break;
                            case 2:
                                // Khai báo và fill data vào sheet 1
                                WriteExcelSheet1(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 2
                                WriteExcelSheet2(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 5
                                WriteExcelSheet5(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 6
                                WriteExcelSheet6(data, excelWorkbook);
                                excelworksheet3.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                excelworksheet4.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                break;
                            case 3:
                                // Khai báo và fill data vào sheet 1
                                WriteExcelSheet1(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 2
                                WriteExcelSheet2(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 4
                                WriteExcelSheet4(data, excelWorkbook, 2);
                                // Khởi tạo và fill data vào sheet 6
                                WriteExcelSheet6(data, excelWorkbook);
                                excelworksheet3.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                excelworksheet5.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                break;
                            case 4:
                                // Khai báo và fill data vào sheet 1
                                WriteExcelSheet1(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 2
                                WriteExcelSheet2(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 2
                                WriteExcelSheet3(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 5
                                WriteExcelSheet5(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 6
                                WriteExcelSheet6(data, excelWorkbook);
                                excelworksheet4.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                break;
                            case 5:
                                // Khai báo và fill data vào sheet 1
                                WriteExcelSheet1(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 2
                                WriteExcelSheet2(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 3
                                WriteExcelSheet3(data, excelWorkbook);
                                // Khởi tạo và fill data vào sheet 4
                                WriteExcelSheet4(data, excelWorkbook, 4);
                                // Khởi tạo và fill data vào sheet 6
                                WriteExcelSheet6(data, excelWorkbook);
                                excelworksheet5.Visible = Microsoft.Office.Interop.Excel.XlSheetVisibility.xlSheetHidden;
                                break;
                        }
                    }

                    //Fill data
                    object oFilename = OutputPath;
                    excelApplication.DisplayAlerts = false;
                    excelWorkbook.SaveAs(oFilename);
                    excelWorkbook.Close();
                }
            }
            catch (Exception ex)
            {
                NLogManager.LogError("ExportData Error: " + ex.ToString());
            }
            finally
            {
                System.Threading.Thread.Sleep(1000);
                excelApplication.Quit();
                System.Runtime.InteropServices.Marshal.ReleaseComObject(excelApplication);
                GC.Collect();
                GC.WaitForPendingFinalizers();
                System.Threading.Thread.Sleep(1500);
            }
        }

        /// <summary>
        /// Write data to excel sheet 1
        /// </summary>
        /// <param name="data"></param>
        public void WriteExcelSheet1(OLADetails data, Workbook workbook)
        {
            var excelworksheet1 = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Sheets[1];

            excelworksheet1.Range["K4"].Value = "'" + data.selectScrCrit;
            excelworksheet1.Range["W4"].Value = data.cstOfficeNm;
            excelworksheet1.Range["H6"].Value = data.btDclNo;
            excelworksheet1.Range["U6"].Value = data.ieIndication;
            if (data.dateOfDcl != null && data.dateOfDcl.Length > 0)
            {
                excelworksheet1.Range["AB6"].Value = FormatDate(data.dateOfDcl);
            }
            else
            {
                excelworksheet1.Range["AB6"].Value = data.dateOfDcl;
            }

            excelworksheet1.Range["H8"].Value = data.dclrCode;
            excelworksheet1.Range["L8"].Value = data.dclrName;
            excelworksheet1.Range["H10"].Value = data.addrDclr;
            excelworksheet1.Range["H13"].Value = data.transCd;
            excelworksheet1.Range["M13"].Value = data.transNm;
            excelworksheet1.Range["H16"].Value = data.transAddress;
            excelworksheet1.Range["M19"].Value = data.transCtrctNo;
            if (data.dateOfTrsCtrct != null && data.dateOfTrsCtrct.Length > 0)
            {
                excelworksheet1.Range["L21"].Value = FormatDate(data.dateOfTrsCtrct);
            }
            else
            {
                excelworksheet1.Range["L21"].Value = data.dateOfTrsCtrct;
            }
            if (data.expDateOfTrans != null && data.expDateOfTrans.Length > 0)
            {
                excelworksheet1.Range["AC21"].Value = FormatDate(data.expDateOfTrans);
            }
            else
            {
                excelworksheet1.Range["AC21"].Value = data.expDateOfTrans;
            }

            excelworksheet1.Range["H23"].Value = data.meansOfTrsCd;
            excelworksheet1.Range["J23"].Value = data.meansOfTrsNm;
            excelworksheet1.Range["H25"].Value = data.transPurposeCd;
            excelworksheet1.Range["J25"].Value = data.transPurposeNm;
            excelworksheet1.Range["H27"].Value = data.transType;
            excelworksheet1.Range["J27"].Value = data.transTypeNm;
            excelworksheet1.Range["N31"].Value = data.deptLocTransA;
            excelworksheet1.Range["V31"].Value = data.deptLocTransCd;
            excelworksheet1.Range["AD31"].Value = data.deptLocTransP;
            excelworksheet1.Range["F33"].Value = data.deptLocTransNm;

            excelworksheet1.Range["N37"].Value = data.arrLocBdTranBa;
            excelworksheet1.Range["V37"].Value = data.arrLocBtransCd;
            excelworksheet1.Range["AD37"].Value = data.arrLocBtransPd;
            excelworksheet1.Range["F39"].Value = data.arrLocBtransNm;
            excelworksheet1.Range["F41"].Value = data.route;


            excelworksheet1.Range["F43"].Value = data.typeOfSec;
            excelworksheet1.Range["L43"].Value = data.amountOfSec;
            excelworksheet1.Range["F47"].Value = data.remarks1;
        }

        /// <summary>
        /// Write data to excel sheet 2
        /// </summary>
        /// <param name="data"></param>
        public void WriteExcelSheet2(OLADetails data, Workbook workbook)
        {
            var excelworksheet2 = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Sheets[2];

            excelworksheet2.Range["K4"].Value = "'" + data.selectScrCrit;
            excelworksheet2.Range["S4"].Value = data.cstOfficeNm;
            excelworksheet2.Range["H5"].Value = data.btDclNo;
            excelworksheet2.Range["U5"].Value = data.ieIndication;
            if (data.dateOfDcl != null && data.dateOfDcl.Length > 0)
            {
                excelworksheet2.Range["AB5"].Value = FormatDate(data.dateOfDcl);
            }
            else
            {
                excelworksheet2.Range["AB5"].Value = data.dateOfDcl;
            }
            if (data.lsCargoNo != null && data.lsCargoNo.Length > 0)
            {
                if (data.lsCargoNo.Length > 1)
                {
                    excelworksheet2.Range["I8"].Value = data.lsCargoNo[0].cargoNo;
                    excelworksheet2.Range["I40"].Value = data.lsCargoNo[1].cargoNo;
                    if (data.lsCargoNo[0].issueDateOfBl != null && data.lsCargoNo[0].issueDateOfBl.Length > 0)
                    {
                        excelworksheet2.Range["AC8"].Value = FormatDate(data.lsCargoNo[0].issueDateOfBl);
                    }
                    else
                    {
                        excelworksheet2.Range["AC8"].Value = data.lsCargoNo[0].issueDateOfBl;
                    }
                    if (data.lsCargoNo[1].issueDateOfBl != null && data.lsCargoNo[1].issueDateOfBl.Length > 0)
                    {
                        excelworksheet2.Range["AC40"].Value = FormatDate(data.lsCargoNo[1].issueDateOfBl);
                    }
                    else
                    {
                        excelworksheet2.Range["AC40"].Value = data.lsCargoNo[1].issueDateOfBl;
                    }
                    
                    excelworksheet2.Range["I9"].Value = data.lsCargoNo[0].goodsDes;
                    excelworksheet2.Range["I41"].Value = data.lsCargoNo[1].goodsDes;
                    excelworksheet2.Range["I10"].Value = data.lsCargoNo[0].hSCd;
                    excelworksheet2.Range["I42"].Value = data.lsCargoNo[1].hSCd;
                    excelworksheet2.Range["I11"].Value = data.lsCargoNo[0].marksAndNos;
                    excelworksheet2.Range["I43"].Value = data.lsCargoNo[1].marksAndNos;
                    if (data.lsCargoNo[0].dFstStkBndWrh != null && data.lsCargoNo[0].dFstStkBndWrh.Length > 0)
                    {
                        excelworksheet2.Range["J13"].Value = FormatDate(data.lsCargoNo[0].dFstStkBndWrh);
                    }
                    else
                    {
                        excelworksheet2.Range["J13"].Value = data.lsCargoNo[0].dFstStkBndWrh;
                    }
                    if (data.lsCargoNo[1].dFstStkBndWrh != null && data.lsCargoNo[1].dFstStkBndWrh.Length > 0)
                    {
                        excelworksheet2.Range["J45"].Value = FormatDate(data.lsCargoNo[1].dFstStkBndWrh);
                    }
                    else
                    {
                        excelworksheet2.Range["J45"].Value = data.lsCargoNo[1].dFstStkBndWrh;
                    }
                    excelworksheet2.Range["M14"].Value = data.lsCargoNo[0].prodBndFactId;
                    excelworksheet2.Range["N46"].Value = data.lsCargoNo[1].prodBndFactId;

                    excelworksheet2.Range["x14"].Value = data.lsCargoNo[0].placeOriginMan;
                    excelworksheet2.Range["x46"].Value = data.lsCargoNo[1].placeOriginMan;
                    excelworksheet2.Range["AA14"].Value = data.lsCargoNo[0].placeOrigManNm;
                    excelworksheet2.Range["AA46"].Value = data.lsCargoNo[1].placeOrigManNm;

                    excelworksheet2.Range["I15"].Value = data.lsCargoNo[0].deptLocOfCargo;
                    excelworksheet2.Range["H47"].Value = data.lsCargoNo[1].deptLocOfCargo;
                    excelworksheet2.Range["L15"].Value = data.lsCargoNo[0].deptLocTransNm;
                    excelworksheet2.Range["L47"].Value = data.lsCargoNo[1].deptLocTransNm;
                    excelworksheet2.Range["T15"].Value = data.lsCargoNo[0].arrLocOfCargo;
                    excelworksheet2.Range["T47"].Value = data.lsCargoNo[1].arrLocOfCargo;
                    excelworksheet2.Range["W15"].Value = data.lsCargoNo[0].arrLocNmOfCar;
                    excelworksheet2.Range["W47"].Value = data.lsCargoNo[1].arrLocNmOfCar;

                    excelworksheet2.Range["AE15"].Value = data.lsCargoNo[0].typeOfMftCargo;
                    excelworksheet2.Range["AE47"].Value = data.lsCargoNo[1].typeOfMftCargo;
                    excelworksheet2.Range["H16"].Value = data.lsCargoNo[0].transEquipCd;
                    excelworksheet2.Range["H48"].Value = data.lsCargoNo[1].transEquipCd;
                    excelworksheet2.Range["S16"].Value = data.lsCargoNo[0].vesselNm;
                    excelworksheet2.Range["S48"].Value = data.lsCargoNo[1].vesselNm;
                    if (data.lsCargoNo[0].arrDateOfCargo != null && data.lsCargoNo[0].arrDateOfCargo.Length > 0)
                    {
                        excelworksheet2.Range["H17"].Value = FormatDate(data.lsCargoNo[0].arrDateOfCargo);
                    }
                    else
                    {
                        excelworksheet2.Range["H17"].Value = data.lsCargoNo[0].arrDateOfCargo;
                    }

                    if (data.lsCargoNo[1].arrDateOfCargo != null && data.lsCargoNo[1].arrDateOfCargo.Length > 0)
                    {
                        excelworksheet2.Range["H49"].Value = FormatDate(data.lsCargoNo[1].arrDateOfCargo);
                    }
                    else
                    {
                        excelworksheet2.Range["H49"].Value = data.lsCargoNo[1].arrDateOfCargo;
                    }
                    excelworksheet2.Range["H18"].Value = data.lsCargoNo[0].imperCd;
                    excelworksheet2.Range["H50"].Value = data.lsCargoNo[1].imperCd;
                    excelworksheet2.Range["N18"].Value = data.lsCargoNo[0].imperNm;
                    excelworksheet2.Range["N50"].Value = data.lsCargoNo[1].imperNm;
                    excelworksheet2.Range["N20"].Value = data.lsCargoNo[0].addressOfImp;
                    excelworksheet2.Range["N52"].Value = data.lsCargoNo[1].addressOfImp;
                    excelworksheet2.Range["H22"].Value = data.lsCargoNo[0].experCd;
                    excelworksheet2.Range["H54"].Value = data.lsCargoNo[1].experCd;
                    excelworksheet2.Range["N22"].Value = data.lsCargoNo[0].experNm;
                    excelworksheet2.Range["N54"].Value = data.lsCargoNo[1].experNm;
                    excelworksheet2.Range["N24"].Value = data.lsCargoNo[0].addressOfExp;
                    excelworksheet2.Range["N56"].Value = data.lsCargoNo[1].addressOfExp;
                    excelworksheet2.Range["H26"].Value = data.lsCargoNo[0].trustorCd;
                    excelworksheet2.Range["H58"].Value = data.lsCargoNo[1].trustorCd;
                    excelworksheet2.Range["N26"].Value = data.lsCargoNo[0].trustorNm;
                    excelworksheet2.Range["N58"].Value = data.lsCargoNo[1].trustorNm;
                    excelworksheet2.Range["N28"].Value = data.lsCargoNo[0].trustorAddr;
                    excelworksheet2.Range["N60"].Value = data.lsCargoNo[1].trustorAddr;
                    if (data.lsCargoNo[0].lsOtherLawCode != null && data.lsCargoNo[0].lsOtherLawCode.Length > 0)
                    {
                        var otherLawCd = "";
                        for (var i = 0; i < data.lsCargoNo[0].lsOtherLawCode.Length; i++)
                        {
                            if (data.lsCargoNo[0].lsOtherLawCode[i].otherLawCd != null && data.lsCargoNo[0].lsOtherLawCode[i].otherLawCd.Length > 0)
                            {
                                otherLawCd += data.lsCargoNo[0].lsOtherLawCode[i].otherLawCd + ",";
                            }
                        }
                        if (otherLawCd.Length > 0)
                        {
                            excelworksheet2.Range["G30"].Value = otherLawCd.Substring(0, otherLawCd.Length - 1);
                        }
                        else
                        {
                            excelworksheet2.Range["G30"].Value = otherLawCd;
                        }

                    }
                    else
                    {
                        excelworksheet2.Range["G30"].Value = "";
                    }


                    if (data.lsCargoNo[1].lsOtherLawCode != null && data.lsCargoNo[1].lsOtherLawCode.Length > 0)
                    {
                        var otherLawCd = "";
                        for (var i = 0; i < data.lsCargoNo[1].lsOtherLawCode.Length; i++)
                        {
                            if (data.lsCargoNo[1].lsOtherLawCode[i].otherLawCd != null && data.lsCargoNo[1].lsOtherLawCode[i].otherLawCd.Length > 0)
                            {
                                otherLawCd += data.lsCargoNo[1].lsOtherLawCode[i].otherLawCd + ",";
                            }
                        }
                        if (otherLawCd.Length > 0)
                        {
                            excelworksheet2.Range["G62"].Value = otherLawCd.Substring(0, otherLawCd.Length - 1);
                        }
                        else
                        {
                            excelworksheet2.Range["G62"].Value = otherLawCd;
                        }

                    }
                    else
                    {
                        excelworksheet2.Range["G62"].Value = "";
                    }
                    excelworksheet2.Range["R30"].Value = data.lsCargoNo[0].price;
                    excelworksheet2.Range["R62"].Value = data.lsCargoNo[1].price;
                    excelworksheet2.Range["U30"].Value = data.lsCargoNo[0].curTypeCd;
                    excelworksheet2.Range["U62"].Value = data.lsCargoNo[1].curTypeCd;

                    excelworksheet2.Range["E31"].Value = data.lsCargoNo[0].qtt;
                    excelworksheet2.Range["E63"].Value = data.lsCargoNo[1].qtt;
                    excelworksheet2.Range["I31"].Value = data.lsCargoNo[0].cdUnitOfM;
                    excelworksheet2.Range["I63"].Value = data.lsCargoNo[1].cdUnitOfM;
                    excelworksheet2.Range["T31"].Value = data.lsCargoNo[0].cargoWeigGrs;
                    excelworksheet2.Range["T63"].Value = data.lsCargoNo[1].cargoWeigGrs;
                    excelworksheet2.Range["X31"].Value = data.lsCargoNo[0].weigUnitCdGrs;
                    excelworksheet2.Range["X63"].Value = data.lsCargoNo[1].weigUnitCdGrs;
                    excelworksheet2.Range["AB31"].Value = data.lsCargoNo[0].capacity;
                    excelworksheet2.Range["AB63"].Value = data.lsCargoNo[1].capacity;
                    excelworksheet2.Range["AE31"].Value = data.lsCargoNo[0].capacityUnitCd;
                    excelworksheet2.Range["AE63"].Value = data.lsCargoNo[1].capacityUnitCd;
                    if (data.lsCargoNo[0].lsRemarksCode != null && data.lsCargoNo[0].lsRemarksCode.Length > 0)
                    {
                        var remarkCdForDmg = "";
                        for (var i = 0; i < data.lsCargoNo[0].lsRemarksCode.Length; i++)
                        {
                            if (data.lsCargoNo[0].lsRemarksCode[i].remarkCdForDmg != null && data.lsCargoNo[0].lsRemarksCode[i].remarkCdForDmg.Length > 0)
                            {
                                remarkCdForDmg += data.lsCargoNo[0].lsRemarksCode[i].remarkCdForDmg + ",";
                            }
                        }
                        if (remarkCdForDmg.Length > 0)
                        {
                            excelworksheet2.Range["M32"].Value = remarkCdForDmg.Substring(0, remarkCdForDmg.Length - 1);
                        }
                        else
                        {
                            excelworksheet2.Range["M32"].Value = remarkCdForDmg;
                        }

                    }
                    else
                    {
                        excelworksheet2.Range["M32"].Value = "";
                    }

                    if (data.lsCargoNo[1].lsRemarksCode != null && data.lsCargoNo[1].lsRemarksCode.Length > 0)
                    {
                        var remarkCdForDmg = "";
                        for (var i = 0; i < data.lsCargoNo[1].lsRemarksCode.Length; i++)
                        {
                            if (data.lsCargoNo[1].lsRemarksCode[i].remarkCdForDmg != null && data.lsCargoNo[1].lsRemarksCode[i].remarkCdForDmg.Length > 0)
                            {
                                remarkCdForDmg += data.lsCargoNo[1].lsRemarksCode[i].remarkCdForDmg + ",";
                            }
                        }
                        if (remarkCdForDmg.Length > 0)
                        {
                            excelworksheet2.Range["M64"].Value = remarkCdForDmg.Substring(0, remarkCdForDmg.Length - 1);
                        }
                        else
                        {
                            excelworksheet2.Range["M64"].Value = remarkCdForDmg;
                        }

                    }
                    else
                    {
                        excelworksheet2.Range["M64"].Value = "";
                    }
                    excelworksheet2.Range["G33"].Value = data.lsCargoNo[0].permitNo;
                    excelworksheet2.Range["G65"].Value = data.lsCargoNo[1].permitNo;
                    if (data.lsCargoNo[0].permitDate != null && data.lsCargoNo[0].permitDate.Length > 0)
                    {
                        excelworksheet2.Range["R33"].Value = FormatDate(data.lsCargoNo[0].permitDate);
                    }
                    else
                    {
                        excelworksheet2.Range["R33"].Value = data.lsCargoNo[0].permitDate;
                    }
                    if (data.lsCargoNo[1].permitDate != null && data.lsCargoNo[1].permitDate.Length > 0)
                    {
                        excelworksheet2.Range["R65"].Value = FormatDate(data.lsCargoNo[1].permitDate);
                    }
                    else
                    {
                        excelworksheet2.Range["R65"].Value = data.lsCargoNo[1].permitDate;
                    }
                    if (data.lsCargoNo[0].expDatePermit != null && data.lsCargoNo[0].expDatePermit.Length > 0)
                    {
                        excelworksheet2.Range["AA33"].Value = FormatDate(data.lsCargoNo[0].expDatePermit);
                    }
                    else
                    {
                        excelworksheet2.Range["AA33"].Value = data.lsCargoNo[0].expDatePermit;
                    }
                    if (data.lsCargoNo[1].expDatePermit != null && data.lsCargoNo[1].expDatePermit.Length > 0)
                    {
                        excelworksheet2.Range["AA65"].Value = FormatDate(data.lsCargoNo[1].expDatePermit);
                    }
                    else
                    {
                        excelworksheet2.Range["AA65"].Value = data.lsCargoNo[1].expDatePermit;
                    }
                    excelworksheet2.Range["E34"].Value = data.lsCargoNo[0].remarks2;
                    excelworksheet2.Range["E66"].Value = data.lsCargoNo[1].remarks2;
                }
            }
        }

        /// <summary>
        /// Write data to excel sheet 3
        /// </summary>
        /// <param name="data"></param>
        public void WriteExcelSheet3(OLADetails data, Workbook workbook)
        {
            var excelworksheet3 = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Sheets[3];
            excelworksheet3.Range["K4"].Value = "'" + data.selectScrCrit;
            excelworksheet3.Range["S4"].Value = data.cstOfficeNm;
            excelworksheet3.Range["H5"].Value = data.btDclNo;
            excelworksheet3.Range["U5"].Value = data.ieIndication;
            if (data.dateOfDcl != null && data.dateOfDcl.Length > 0)
            {
                excelworksheet3.Range["AB5"].Value = FormatDate(data.dateOfDcl);
            }
            else
            {
                excelworksheet3.Range["AB5"].Value = data.dateOfDcl;
            }
            if (data.lsCargoNo != null && data.lsCargoNo.Length > 0)
            {
                if (data.lsCargoNo.Length > 1)
                {
                    excelworksheet3.Range["I8"].Value = data.lsCargoNo[2].cargoNo;
                    excelworksheet3.Range["I39"].Value = data.lsCargoNo[3].cargoNo;
                    if (data.lsCargoNo[2].issueDateOfBl != null && data.lsCargoNo[2].issueDateOfBl.Length > 0)
                    {
                        excelworksheet3.Range["AC8"].Value = FormatDate(data.lsCargoNo[2].issueDateOfBl);
                    }
                    else
                    {
                        excelworksheet3.Range["AC8"].Value = data.lsCargoNo[2].issueDateOfBl;
                    }
                    if (data.lsCargoNo[3].issueDateOfBl != null && data.lsCargoNo[3].issueDateOfBl.Length > 0)
                    {
                        excelworksheet3.Range["AC39"].Value = FormatDate(data.lsCargoNo[3].issueDateOfBl);
                    }
                    else
                    {
                        excelworksheet3.Range["AC39"].Value = data.lsCargoNo[3].issueDateOfBl;
                    }

                    excelworksheet3.Range["I9"].Value = data.lsCargoNo[2].goodsDes;
                    excelworksheet3.Range["I41"].Value = data.lsCargoNo[3].goodsDes;
                    excelworksheet3.Range["I10"].Value = data.lsCargoNo[2].hSCd;
                    excelworksheet3.Range["I42"].Value = data.lsCargoNo[3].hSCd;
                    excelworksheet3.Range["I11"].Value = data.lsCargoNo[2].marksAndNos;
                    excelworksheet3.Range["I43"].Value = data.lsCargoNo[3].marksAndNos;
                    if (data.lsCargoNo[2].dFstStkBndWrh != null && data.lsCargoNo[2].dFstStkBndWrh.Length > 0)
                    {
                        excelworksheet3.Range["J13"].Value = FormatDate(data.lsCargoNo[2].dFstStkBndWrh);
                    }
                    else
                    {
                        excelworksheet3.Range["J13"].Value = data.lsCargoNo[2].dFstStkBndWrh;
                    }
                    if (data.lsCargoNo[3].dFstStkBndWrh != null && data.lsCargoNo[3].dFstStkBndWrh.Length > 0)
                    {
                        excelworksheet3.Range["J45"].Value = FormatDate(data.lsCargoNo[3].dFstStkBndWrh);
                    }
                    else
                    {
                        excelworksheet3.Range["J45"].Value = data.lsCargoNo[3].dFstStkBndWrh;
                    }
                    excelworksheet3.Range["M14"].Value = data.lsCargoNo[2].prodBndFactId;
                    excelworksheet3.Range["N46"].Value = data.lsCargoNo[3].prodBndFactId;

                    excelworksheet3.Range["x14"].Value = data.lsCargoNo[2].placeOriginMan;
                    excelworksheet3.Range["x46"].Value = data.lsCargoNo[3].placeOriginMan;
                    excelworksheet3.Range["AA14"].Value = data.lsCargoNo[2].placeOrigManNm;
                    excelworksheet3.Range["AA46"].Value = data.lsCargoNo[3].placeOrigManNm;

                    excelworksheet3.Range["I15"].Value = data.lsCargoNo[2].deptLocOfCargo;
                    excelworksheet3.Range["H47"].Value = data.lsCargoNo[3].deptLocOfCargo;
                    excelworksheet3.Range["L15"].Value = data.lsCargoNo[2].deptLocTransNm;
                    excelworksheet3.Range["L47"].Value = data.lsCargoNo[3].deptLocTransNm;
                    excelworksheet3.Range["T15"].Value = data.lsCargoNo[2].arrLocOfCargo;
                    excelworksheet3.Range["T47"].Value = data.lsCargoNo[3].arrLocOfCargo;
                    excelworksheet3.Range["W15"].Value = data.lsCargoNo[2].arrLocNmOfCar;
                    excelworksheet3.Range["W47"].Value = data.lsCargoNo[3].arrLocNmOfCar;

                    excelworksheet3.Range["AE15"].Value = data.lsCargoNo[2].typeOfMftCargo;
                    excelworksheet3.Range["AE47"].Value = data.lsCargoNo[3].typeOfMftCargo;
                    excelworksheet3.Range["H16"].Value = data.lsCargoNo[2].transEquipCd;
                    excelworksheet3.Range["H48"].Value = data.lsCargoNo[3].transEquipCd;
                    excelworksheet3.Range["S16"].Value = data.lsCargoNo[2].vesselNm;
                    excelworksheet3.Range["S48"].Value = data.lsCargoNo[3].vesselNm;
                    if (data.lsCargoNo[2].arrDateOfCargo != null && data.lsCargoNo[2].arrDateOfCargo.Length > 0)
                    {
                        excelworksheet3.Range["H17"].Value = FormatDate(data.lsCargoNo[2].arrDateOfCargo);
                    }
                    else
                    {
                        excelworksheet3.Range["H17"].Value = data.lsCargoNo[2].arrDateOfCargo;
                    }

                    if (data.lsCargoNo[3].arrDateOfCargo != null && data.lsCargoNo[3].arrDateOfCargo.Length > 0)
                    {
                        excelworksheet3.Range["H49"].Value = FormatDate(data.lsCargoNo[3].arrDateOfCargo);
                    }
                    else
                    {
                        excelworksheet3.Range["H49"].Value = data.lsCargoNo[3].arrDateOfCargo;
                    }
                    excelworksheet3.Range["H18"].Value = data.lsCargoNo[2].imperCd;
                    excelworksheet3.Range["H50"].Value = data.lsCargoNo[3].imperCd;
                    excelworksheet3.Range["N18"].Value = data.lsCargoNo[2].imperNm;
                    excelworksheet3.Range["N50"].Value = data.lsCargoNo[3].imperNm;
                    excelworksheet3.Range["N20"].Value = data.lsCargoNo[2].addressOfImp;
                    excelworksheet3.Range["N52"].Value = data.lsCargoNo[3].addressOfImp;
                    excelworksheet3.Range["H22"].Value = data.lsCargoNo[2].experCd;
                    excelworksheet3.Range["H54"].Value = data.lsCargoNo[3].experCd;
                    excelworksheet3.Range["N22"].Value = data.lsCargoNo[2].experNm;
                    excelworksheet3.Range["N54"].Value = data.lsCargoNo[3].experNm;
                    excelworksheet3.Range["N24"].Value = data.lsCargoNo[2].addressOfExp;
                    excelworksheet3.Range["N56"].Value = data.lsCargoNo[3].addressOfExp;
                    excelworksheet3.Range["H26"].Value = data.lsCargoNo[2].trustorCd;
                    excelworksheet3.Range["H58"].Value = data.lsCargoNo[3].trustorCd;
                    excelworksheet3.Range["N26"].Value = data.lsCargoNo[2].trustorNm;
                    excelworksheet3.Range["N58"].Value = data.lsCargoNo[3].trustorNm;
                    excelworksheet3.Range["N28"].Value = data.lsCargoNo[2].trustorAddr;
                    excelworksheet3.Range["N60"].Value = data.lsCargoNo[3].trustorAddr;
                    if (data.lsCargoNo[2].lsOtherLawCode != null && data.lsCargoNo[2].lsOtherLawCode.Length > 0)
                    {
                        var otherLawCd = "";
                        for (var i = 0; i < data.lsCargoNo[2].lsOtherLawCode.Length; i++)
                        {
                            if (data.lsCargoNo[2].lsOtherLawCode[i].otherLawCd != null && data.lsCargoNo[2].lsOtherLawCode[i].otherLawCd.Length > 0)
                            {
                                otherLawCd += data.lsCargoNo[2].lsOtherLawCode[i].otherLawCd + ",";
                            }
                        }
                        if (otherLawCd.Length > 0)
                        {
                            excelworksheet3.Range["G30"].Value = otherLawCd.Substring(0, otherLawCd.Length - 1);
                        }
                        else
                        {
                            excelworksheet3.Range["G30"].Value = otherLawCd;
                        }

                    }
                    else
                    {
                        excelworksheet3.Range["G30"].Value = "";
                    }


                    if (data.lsCargoNo[3].lsOtherLawCode != null && data.lsCargoNo[3].lsOtherLawCode.Length > 0)
                    {
                        var otherLawCd = "";
                        for (var i = 0; i < data.lsCargoNo[3].lsOtherLawCode.Length; i++)
                        {
                            if (data.lsCargoNo[3].lsOtherLawCode[i].otherLawCd != null && data.lsCargoNo[3].lsOtherLawCode[i].otherLawCd.Length > 0)
                            {
                                otherLawCd += data.lsCargoNo[3].lsOtherLawCode[i].otherLawCd + ",";
                            }
                        }
                        if (otherLawCd.Length > 0)
                        {
                            excelworksheet3.Range["G62"].Value = otherLawCd.Substring(0, otherLawCd.Length - 1);
                        }
                        else
                        {
                            excelworksheet3.Range["G62"].Value = otherLawCd;
                        }

                    }
                    else
                    {
                        excelworksheet3.Range["G62"].Value = "";
                    }
                    excelworksheet3.Range["R30"].Value = data.lsCargoNo[2].price;
                    excelworksheet3.Range["R62"].Value = data.lsCargoNo[3].price;
                    excelworksheet3.Range["U30"].Value = data.lsCargoNo[2].curTypeCd;
                    excelworksheet3.Range["U62"].Value = data.lsCargoNo[3].curTypeCd;

                    excelworksheet3.Range["E31"].Value = data.lsCargoNo[2].qtt;
                    excelworksheet3.Range["E63"].Value = data.lsCargoNo[3].qtt;
                    excelworksheet3.Range["I31"].Value = data.lsCargoNo[2].cdUnitOfM;
                    excelworksheet3.Range["I63"].Value = data.lsCargoNo[3].cdUnitOfM;
                    excelworksheet3.Range["T31"].Value = data.lsCargoNo[2].cargoWeigGrs;
                    excelworksheet3.Range["T63"].Value = data.lsCargoNo[3].cargoWeigGrs;
                    excelworksheet3.Range["X31"].Value = data.lsCargoNo[2].weigUnitCdGrs;
                    excelworksheet3.Range["X63"].Value = data.lsCargoNo[3].weigUnitCdGrs;
                    excelworksheet3.Range["AB31"].Value = data.lsCargoNo[2].capacity;
                    excelworksheet3.Range["AB63"].Value = data.lsCargoNo[3].capacity;
                    excelworksheet3.Range["AE31"].Value = data.lsCargoNo[2].capacityUnitCd;
                    excelworksheet3.Range["AE63"].Value = data.lsCargoNo[3].capacityUnitCd;
                    if (data.lsCargoNo[0].lsRemarksCode != null && data.lsCargoNo[0].lsRemarksCode.Length > 0)
                    {
                        var remarkCdForDmg = "";
                        for (var i = 0; i < data.lsCargoNo[2].lsRemarksCode.Length; i++)
                        {
                            if (data.lsCargoNo[2].lsRemarksCode[i].remarkCdForDmg != null && data.lsCargoNo[2].lsRemarksCode[i].remarkCdForDmg.Length > 0)
                            {
                                remarkCdForDmg += data.lsCargoNo[2].lsRemarksCode[i].remarkCdForDmg + ",";
                            }
                        }
                        if (remarkCdForDmg.Length > 0)
                        {
                            excelworksheet3.Range["M32"].Value = remarkCdForDmg.Substring(0, remarkCdForDmg.Length - 1);
                        }
                        else
                        {
                            excelworksheet3.Range["M32"].Value = remarkCdForDmg;
                        }

                    }
                    else
                    {
                        excelworksheet3.Range["M32"].Value = "";
                    }

                    if (data.lsCargoNo[3].lsRemarksCode != null && data.lsCargoNo[3].lsRemarksCode.Length > 0)
                    {
                        var remarkCdForDmg = "";
                        for (var i = 0; i < data.lsCargoNo[1].lsRemarksCode.Length; i++)
                        {
                            if (data.lsCargoNo[3].lsRemarksCode[i].remarkCdForDmg != null && data.lsCargoNo[3].lsRemarksCode[i].remarkCdForDmg.Length > 0)
                            {
                                remarkCdForDmg += data.lsCargoNo[3].lsRemarksCode[i].remarkCdForDmg + ",";
                            }
                        }
                        if (remarkCdForDmg.Length > 0)
                        {
                            excelworksheet3.Range["M64"].Value = remarkCdForDmg.Substring(0, remarkCdForDmg.Length - 1);
                        }
                        else
                        {
                            excelworksheet3.Range["M64"].Value = remarkCdForDmg;
                        }

                    }
                    else
                    {
                        excelworksheet3.Range["M64"].Value = "";
                    }
                    excelworksheet3.Range["G33"].Value = data.lsCargoNo[2].permitNo;
                    excelworksheet3.Range["G65"].Value = data.lsCargoNo[3].permitNo;
                    if (data.lsCargoNo[2].permitDate != null && data.lsCargoNo[2].permitDate.Length > 0)
                    {
                        excelworksheet3.Range["R33"].Value = FormatDate(data.lsCargoNo[2].permitDate);
                    }
                    else
                    {
                        excelworksheet3.Range["R33"].Value = data.lsCargoNo[2].permitDate;
                    }
                    if (data.lsCargoNo[3].permitDate != null && data.lsCargoNo[3].permitDate.Length > 0)
                    {
                        excelworksheet3.Range["R65"].Value = FormatDate(data.lsCargoNo[3].permitDate);
                    }
                    else
                    {
                        excelworksheet3.Range["R65"].Value = data.lsCargoNo[3].permitDate;
                    }
                    if (data.lsCargoNo[2].expDatePermit != null && data.lsCargoNo[2].expDatePermit.Length > 0)
                    {
                        excelworksheet3.Range["AA33"].Value = FormatDate(data.lsCargoNo[2].expDatePermit);
                    }
                    else
                    {
                        excelworksheet3.Range["AA33"].Value = data.lsCargoNo[2].expDatePermit;
                    }
                    if (data.lsCargoNo[3].expDatePermit != null && data.lsCargoNo[3].expDatePermit.Length > 0)
                    {
                        excelworksheet3.Range["AA65"].Value = FormatDate(data.lsCargoNo[3].expDatePermit);
                    }
                    else
                    {
                        excelworksheet3.Range["AA65"].Value = data.lsCargoNo[3].expDatePermit;
                    }
                    excelworksheet3.Range["E34"].Value = data.lsCargoNo[2].remarks2;
                    excelworksheet3.Range["E66"].Value = data.lsCargoNo[3].remarks2;
                }
            }

        }

        /// <summary>
        /// Write data to excel sheet 4
        /// </summary>
        /// <param name="data"></param>
        public void WriteExcelSheet4(OLADetails data, Workbook workbook, int index)
        {
            var excelworksheet4 = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Sheets[4];
            excelworksheet4.Range["K4"].Value = "'" + data.selectScrCrit;
            excelworksheet4.Range["S4"].Value = data.cstOfficeNm;
            excelworksheet4.Range["H5"].Value = data.btDclNo;
            excelworksheet4.Range["U5"].Value = data.ieIndication;
            if (data.dateOfDcl != null && data.dateOfDcl.Length > 0)
            {
                excelworksheet4.Range["AB5"].Value = FormatDate(data.dateOfDcl);
            }
            else
            {
                excelworksheet4.Range["AB5"].Value = data.dateOfDcl;
            }
            if (data.lsCargoNo != null && data.lsCargoNo.Length > 0)
            {
                if (data.lsCargoNo.Length > 1)
                {
                    excelworksheet4.Range["I8"].Value = data.lsCargoNo[index].cargoNo;
                    if (data.lsCargoNo[index].issueDateOfBl != null && data.lsCargoNo[index].issueDateOfBl.Length > 0)
                    {
                        excelworksheet4.Range["AC8"].Value = FormatDate(data.lsCargoNo[index].issueDateOfBl);
                    }
                    else
                    {
                        excelworksheet4.Range["AC8"].Value = data.lsCargoNo[index].issueDateOfBl;
                    }
                    excelworksheet4.Range["I9"].Value = data.lsCargoNo[index].goodsDes;
                    excelworksheet4.Range["I10"].Value = data.lsCargoNo[index].hSCd;
                    excelworksheet4.Range["I11"].Value = data.lsCargoNo[index].marksAndNos;
                    if (data.lsCargoNo[index].dFstStkBndWrh != null && data.lsCargoNo[index].dFstStkBndWrh.Length > 0)
                    {
                        excelworksheet4.Range["J13"].Value = FormatDate(data.lsCargoNo[index].dFstStkBndWrh);
                    }
                    else
                    {
                        excelworksheet4.Range["J13"].Value = data.lsCargoNo[index].dFstStkBndWrh;
                    }
                    excelworksheet4.Range["M14"].Value = data.lsCargoNo[index].prodBndFactId;
                    excelworksheet4.Range["x14"].Value = data.lsCargoNo[index].placeOriginMan;
                    excelworksheet4.Range["AA14"].Value = data.lsCargoNo[index].placeOrigManNm;
                    excelworksheet4.Range["H15"].Value = data.lsCargoNo[index].deptLocOfCargo;
                    excelworksheet4.Range["L15"].Value = data.lsCargoNo[index].deptLocTransNm;
                    excelworksheet4.Range["T15"].Value = data.lsCargoNo[index].arrLocOfCargo;
                    excelworksheet4.Range["W15"].Value = data.lsCargoNo[index].arrLocNmOfCar;
                    excelworksheet4.Range["AE15"].Value = data.lsCargoNo[index].typeOfMftCargo;
                    excelworksheet4.Range["H16"].Value = data.lsCargoNo[index].transEquipCd;
                    excelworksheet4.Range["S16"].Value = data.lsCargoNo[index].vesselNm;
                    if (data.lsCargoNo[index].arrDateOfCargo != null && data.lsCargoNo[index].arrDateOfCargo.Length > 0)
                    {
                        excelworksheet4.Range["H17"].Value = FormatDate(data.lsCargoNo[index].arrDateOfCargo);
                    }
                    else
                    {
                        excelworksheet4.Range["H17"].Value = data.lsCargoNo[index].arrDateOfCargo;
                    }
                    excelworksheet4.Range["H18"].Value = data.lsCargoNo[index].imperCd;
                    excelworksheet4.Range["N18"].Value = data.lsCargoNo[index].imperNm;
                    excelworksheet4.Range["N20"].Value = data.lsCargoNo[index].addressOfImp;
                    excelworksheet4.Range["H22"].Value = data.lsCargoNo[index].experCd;
                    excelworksheet4.Range["N22"].Value = data.lsCargoNo[index].experNm;
                    excelworksheet4.Range["N24"].Value = data.lsCargoNo[index].addressOfExp;
                    excelworksheet4.Range["H26"].Value = data.lsCargoNo[index].trustorCd;
                    excelworksheet4.Range["N26"].Value = data.lsCargoNo[index].trustorNm;
                    excelworksheet4.Range["N28"].Value = data.lsCargoNo[index].trustorAddr;
                    if (data.lsCargoNo[index].lsOtherLawCode != null && data.lsCargoNo[index].lsOtherLawCode.Length > 0)
                    {
                        var otherLawCd = "";
                        for (var i = 0; i < data.lsCargoNo[index].lsOtherLawCode.Length; i++)
                        {
                            if (data.lsCargoNo[index].lsOtherLawCode[i].otherLawCd != null && data.lsCargoNo[index].lsOtherLawCode[i].otherLawCd.Length > 0)
                            {
                                otherLawCd += data.lsCargoNo[index].lsOtherLawCode[i].otherLawCd + ",";
                            }
                        }
                        if (otherLawCd.Length > 0)
                        {
                            excelworksheet4.Range["G30"].Value = otherLawCd.Substring(0, otherLawCd.Length - 1);
                        }
                        else
                        {
                            excelworksheet4.Range["G30"].Value = otherLawCd;
                        }

                    }
                    else
                    {
                        excelworksheet4.Range["G30"].Value = "";
                    }
                    excelworksheet4.Range["R30"].Value = data.lsCargoNo[index].price;
                    excelworksheet4.Range["U30"].Value = data.lsCargoNo[index].curTypeCd;
                    excelworksheet4.Range["E31"].Value = data.lsCargoNo[index].qtt;
                    excelworksheet4.Range["I31"].Value = data.lsCargoNo[index].cdUnitOfM;
                    excelworksheet4.Range["T31"].Value = data.lsCargoNo[index].cargoWeigGrs;
                    excelworksheet4.Range["X31"].Value = data.lsCargoNo[index].weigUnitCdGrs;
                    excelworksheet4.Range["AB31"].Value = data.lsCargoNo[index].capacity;
                    excelworksheet4.Range["AE31"].Value = data.lsCargoNo[index].capacityUnitCd;
                    if (data.lsCargoNo[index].lsRemarksCode != null && data.lsCargoNo[index].lsRemarksCode.Length > 0)
                    {
                        var remarkCdForDmg = "";
                        for (var i = 0; i < data.lsCargoNo[index].lsRemarksCode.Length; i++)
                        {
                            if (data.lsCargoNo[index].lsRemarksCode[i].remarkCdForDmg != null && data.lsCargoNo[index].lsRemarksCode[i].remarkCdForDmg.Length > 0)
                            {
                                remarkCdForDmg += data.lsCargoNo[index].lsRemarksCode[i].remarkCdForDmg + ",";
                            }
                        }
                        if (remarkCdForDmg.Length > 0)
                        {
                            excelworksheet4.Range["M32"].Value = remarkCdForDmg.Substring(0, remarkCdForDmg.Length - 1);
                        }
                        else
                        {
                            excelworksheet4.Range["M32"].Value = remarkCdForDmg;
                        }

                    }
                    else
                    {
                        excelworksheet4.Range["M32"].Value = "";
                    }
                    excelworksheet4.Range["G33"].Value = data.lsCargoNo[index].permitNo;
                    if (data.lsCargoNo[index].permitDate != null && data.lsCargoNo[index].permitDate.Length > 0)
                    {
                        excelworksheet4.Range["R33"].Value = FormatDate(data.lsCargoNo[index].permitDate);
                    }
                    else
                    {
                        excelworksheet4.Range["R33"].Value = data.lsCargoNo[index].permitDate;
                    }
                    if (data.lsCargoNo[index].expDatePermit != null && data.lsCargoNo[index].expDatePermit.Length > 0)
                    {
                        excelworksheet4.Range["AA33"].Value = FormatDate(data.lsCargoNo[index].expDatePermit);
                    }
                    else
                    {
                        excelworksheet4.Range["AA33"].Value = data.lsCargoNo[index].expDatePermit;
                    }
                    excelworksheet4.Range["E34"].Value = data.lsCargoNo[index].remarks2;
                }
            }

            if (data.esSdateOfTrans != null && data.esSdateOfTrans.Length > 0)
            {
                excelworksheet4.Range["K40"].Value = FormatDate(data.esSdateOfTrans);
            }
            else
            {
                excelworksheet4.Range["K40"].Value = data.esSdateOfTrans;
            }

            if (data.esStimeOfTrans != null && data.esStimeOfTrans.Length > 0)
            {
                excelworksheet4.Range["Q40"].Value = FormatTime(data.esStimeOfTrans);
            }
            else
            {
                excelworksheet4.Range["Q40"].Value = data.esStimeOfTrans;
            }

            if (data.esFdateOfTrans != null && data.esFdateOfTrans.Length > 0)
            {
                excelworksheet4.Range["K41"].Value = FormatDate(data.esFdateOfTrans);
            }
            else
            {
                excelworksheet4.Range["K41"].Value = data.esFdateOfTrans;
            }
            if (data.esFtimeOfTrans != null && data.esFtimeOfTrans.Length > 0)
            {
                excelworksheet4.Range["Q41"].Value = FormatTime(data.esFtimeOfTrans);
            }
            else
            {
                excelworksheet4.Range["Q41"].Value = data.esFtimeOfTrans;
            }
            if (data.lsExpDcl != null && data.lsExpDcl.Length > 0)
            {
                for (int i = 0; i < data.lsExpDcl.Length; i++)
                {
                    excelworksheet4.Range["K43"].Value = data.lsExpDcl[i].expDclNo;
                }
            }
            else
            {
                excelworksheet4.Range["K43"].Value = "";
            }

        }

        /// <summary>
        /// Write data to excel sheet 5
        /// </summary>
        /// <param name="data"></param>
        public void WriteExcelSheet5(OLADetails data, Workbook workbook)
        {
            var excelworksheet5 = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Sheets[5];
            excelworksheet5.Range["K4"].Value = "'" + data.selectScrCrit;
            excelworksheet5.Range["S4"].Value = data.cstOfficeNm;
            excelworksheet5.Range["H5"].Value = data.btDclNo;
            excelworksheet5.Range["U5"].Value = data.ieIndication;
            if (data.dateOfDcl != null && data.dateOfDcl.Length > 0)
            {
                excelworksheet5.Range["AB5"].Value = FormatDate(data.dateOfDcl);
            }
            else
            {
                excelworksheet5.Range["AB5"].Value = data.dateOfDcl;
            }

            if (data.esSdateOfTrans != null && data.esSdateOfTrans.Length > 0)
            {
                excelworksheet5.Range["K8"].Value = FormatDate(data.esSdateOfTrans);
            }
            else
            {
                excelworksheet5.Range["K8"].Value = data.esSdateOfTrans;
            }

            if (data.esStimeOfTrans != null && data.esStimeOfTrans.Length > 0)
            {
                excelworksheet5.Range["Q8"].Value = FormatTime(data.esStimeOfTrans);
            }
            else
            {
                excelworksheet5.Range["Q8"].Value = data.esStimeOfTrans;
            }

            if (data.esFdateOfTrans != null && data.esFdateOfTrans.Length > 0)
            {
                excelworksheet5.Range["K9"].Value = FormatDate(data.esFdateOfTrans);
            }
            else
            {
                excelworksheet5.Range["K9"].Value = data.esFdateOfTrans;
            }
            if (data.esFtimeOfTrans != null && data.esFtimeOfTrans.Length > 0)
            {
                excelworksheet5.Range["Q9"].Value = FormatTime(data.esFtimeOfTrans);
            }
            else
            {
                excelworksheet5.Range["Q9"].Value = data.esFtimeOfTrans;
            }
            if (data.lsExpDcl != null && data.lsExpDcl.Length > 0)
            {
                var expDclNo = "";
                for (int i = 0; i < data.lsExpDcl.Length; i++)
                {
                    if (data.lsExpDcl[i].expDclNo != null && data.lsExpDcl[i].expDclNo.Length > 0)
                    {
                        expDclNo += data.lsExpDcl[i].expDclNo + ",";
                    }
                }
                if (expDclNo.Length > 0)
                {
                    excelworksheet5.Range["K11"].Value = expDclNo.Substring(0, expDclNo.Length - 1);
                }
                else
                {
                    excelworksheet5.Range["K11"].Value = expDclNo;
                }
            }
            else
            {
                excelworksheet5.Range["K11"].Value = "";
            }

        }

        /// <summary>
        /// Write data to excel sheet 6
        /// </summary>
        /// <param name="data"></param>
        public void WriteExcelSheet6(OLADetails data, Workbook workbook)
        {
            var excelworksheet6 = (Microsoft.Office.Interop.Excel.Worksheet)workbook.Sheets[6];
            excelworksheet6.Range["K5"].Value = "'" + data.selectScrCrit;
            excelworksheet6.Range["S5"].Value = data.cstOfficeNm;
            excelworksheet6.Range["H6"].Value = data.btDclNo;
            excelworksheet6.Range["U6"].Value = data.ieIndication;
            if (data.dateOfDcl != null && data.dateOfDcl.Length > 0)
            {
                excelworksheet6.Range["AB6"].Value = FormatDate(data.dateOfDcl);
            }
            else
            {
                excelworksheet6.Range["AB6"].Value = data.dateOfDcl;
            }

            if (data.lsCoFrCarPkgNo != null && data.lsCoFrCarPkgNo.Length > 0)
            {
                var index = 0;
                var indexOf = "";
                for (int i = 0; i < data.lsCoFrCarPkgNo.Length; i++)
                {
                    index++;
                    var clCoFrCarPkgNo = "F" + (10 + (3 * i));
                    var clLineNoOnDcl = "L" + (10 + (3 * i));
                    var clSealNo = "P" + (10 + (3 * i));
                    var clIndex = "B" + (10 + (3 * i));
                    if (i == 0)
                    {
                        excelworksheet6.Range["B10"].NumberFormat = "@";
                        excelworksheet6.Range["B10"].Value = "001";
                        excelworksheet6.Range["F10"].Value = data.lsCoFrCarPkgNo[0].coFrCarPkgNo;
                        excelworksheet6.Range["L10"].Value = data.lsCoFrCarPkgNo[0].lineNoOnDcl;
                        if (data.lsCoFrCarPkgNo[0].lsSealNo != null && data.lsCoFrCarPkgNo[0].lsSealNo.Length > 0)
                        {
                            var sealNo = "";
                            for (int j = 0; j < data.lsCoFrCarPkgNo[0].lsSealNo.Length; j++)
                            {
                                if (data.lsCoFrCarPkgNo[0].lsSealNo[j].sealNo != null && data.lsCoFrCarPkgNo[0].lsSealNo[j].sealNo.Length > 0)
                                {
                                    sealNo += data.lsCoFrCarPkgNo[0].lsSealNo[j].sealNo + ",";
                                }
                            }
                            if (sealNo.Length > 0)
                            {
                                excelworksheet6.Range["P10"].Value = sealNo.Substring(0, sealNo.Length - 1);
                            }
                            else
                            {
                                excelworksheet6.Range["P10"].Value = sealNo;
                            }
                        }
                        else
                        {
                            excelworksheet6.Range["P10"].Value = "";
                        }
                    }
                    else
                    {
                        if (index < 10)
                        {
                            indexOf = "00" + index.ToString();
                        }
                        else if (index >= 10 && index < 100)
                        {
                            indexOf = "0" + index.ToString();
                        }
                        else
                        {
                            indexOf = index.ToString();
                        }
                        if (data.lsCoFrCarPkgNo[i] != null)
                        {
                            if (data.lsCoFrCarPkgNo[i].coFrCarPkgNo != null && data.lsCoFrCarPkgNo[i].coFrCarPkgNo.Length > 0)
                            {
                                excelworksheet6.Range[clIndex].NumberFormat = "@";
                                excelworksheet6.Range[clIndex].Value = indexOf;
                                excelworksheet6.Range[clCoFrCarPkgNo].Value = data.lsCoFrCarPkgNo[i].coFrCarPkgNo;
                                excelworksheet6.Range[clLineNoOnDcl].Value = data.lsCoFrCarPkgNo[i].lineNoOnDcl;
                                if (data.lsCoFrCarPkgNo[i].lsSealNo != null && data.lsCoFrCarPkgNo[i].lsSealNo.Length > 0)
                                {
                                    var sealNo1 = "";
                                    for (int j = 0; j < data.lsCoFrCarPkgNo[i].lsSealNo.Length; j++)
                                    {
                                        if (data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo != null && data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo.Length > 0)
                                        {
                                            sealNo1 += data.lsCoFrCarPkgNo[i].lsSealNo[j].sealNo + ",";
                                        }
                                    }
                                    if (sealNo1.Length > 0)
                                    {
                                        excelworksheet6.Range[clSealNo].Value = sealNo1.Substring(0, sealNo1.Length - 1);
                                    }
                                    else
                                    {
                                        excelworksheet6.Range[clSealNo].Value = sealNo1;
                                    }
                                }
                                else
                                {
                                    excelworksheet6.Range[clSealNo].Value = "";
                                }
                            }
                        }
                    }
                }
            }
            else
            {
                excelworksheet6.Range["F10"].Value = "";
                excelworksheet6.Range["L10"].Value = "";
                excelworksheet6.Range["P10"].Value = "";
                excelworksheet6.Range["B10"].Value = "";
            }

        }

        /// <summary>
        /// Export excel file to Pdf
        /// </summary>
        /// <param name="workbookPath"></param>
        /// <param name="outputPath"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public string ExportWorkbookToPdf(string workbookPath, string outputPath, OLADetails data)
        {
            // If either required string is null or empty, stop and bail out
            if (string.IsNullOrEmpty(workbookPath) || string.IsNullOrEmpty(outputPath))
            {
                return "";
            }
            //Tạo thư mục chứa file export nếu không có
            outputPath = outputPath + AccountSession.AccountID + "/";
            if (!Directory.Exists(outputPath))
            {
                Directory.CreateDirectory(outputPath);
            }
            var filePdf = "ToKhaiOLA_" + DateTime.Now.ToString("yyyyMMdd") + "_" + data.btDclId + ".pdf";
            outputPath += filePdf;
            if (System.IO.File.Exists(outputPath))
            {
                System.IO.File.Delete(outputPath); //Nếu có rồi thì xóa đi
            }
            //System.IO.File.Copy(filePdf, outputPath); //copy file

            // Create new instance of Excel
            excelApplication = new Microsoft.Office.Interop.Excel.Application();

            // Make the process invisible to the user
            excelApplication.ScreenUpdating = false;

            // Make the process silent
            excelApplication.DisplayAlerts = false;

            // Open the workbook that you wish to export to PDF
            excelWorkbook = excelApplication.Workbooks.Open(workbookPath);
            string result = "";
            // If the workbook failed to open, stop, clean up, and bail out
            if (excelWorkbook == null)
            {
                excelApplication.Quit();
                excelApplication = null;
                excelWorkbook = null;

                return string.Empty;
            }

            try
            {
                // Call Excel's native export function (valid in Office 2007 and Office 2010, AFAIK)
                excelWorkbook.ExportAsFixedFormat(Microsoft.Office.Interop.Excel.XlFixedFormatType.xlTypePDF, outputPath);
                result = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "files/ExportPdfOLA/" + AccountSession.AccountID + "/" + filePdf;
            }
            catch (System.Exception ex)
            {
                // Mark the export as failed for the return value...
                return "";
                // Do something with any exceptions here, if you wish...
                // MessageBox.Show...        
            }
            finally
            {
                // Close the workbook, quit the Excel, and clean up regardless of the results...
                excelWorkbook.Close();
                excelApplication.Quit();

                excelApplication = null;
                excelWorkbook = null;
            }

            // You can use the following method to automatically open the PDF after export if you wish
            // Make sure that the file actually exists first...
            if (System.IO.File.Exists(outputPath))
            {
                System.Diagnostics.Process.Start(outputPath);
            }

            return result;
        }

        public string FormatDate(string date)
        {
            if (string.IsNullOrEmpty(date))
                return "";
            var d = date.Substring(0, 2);
            var m = date.Substring(2, 2);
            var y = date.Substring(4, 4);
            var datetime = d + "/" + m + "/" + y;
            return datetime;
        }
        public string FormatTime(string time)
        {
            if (string.IsNullOrEmpty(time))
                return "";
            var h = "";
            var m = "";
            var s = "";
            var result = "";
            if (time.Length == 2)
            {
                h = time.Substring(0, 2);
                result = h;
            }
            else if (time.Length >= 3)
            {
                h = time.Substring(0, 2);
                m = time.Substring(2, 2);
                result = h + ":" + m;
            }
            else if (time.Length >= 5)
            {
                h = time.Substring(0, 2);
                m = time.Substring(2, 2);
                s = time.Substring(4, 2);
                result = h + ":" + m + ":" + s;
            }
            return result;
        }
        #endregion
    }
}