using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;
using Microsoft.Office.Core;
using Hafintech.Agency.Models;
using System.IO;
using System.Reflection;
using System.Globalization;
using _2017Utilities.Log;

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

        #region Menu Left
        public ActionResult LeftMenu()
        {
            var url = Request.Url.ToString();
            Uri MyUrl = new Uri(url);
            var registry = HttpUtility.ParseQueryString(MyUrl.Query).Get("registry"); 
            ViewBag.registry = registry;

            return PartialView();
        }

        public ActionResult LeftDirection()
        {
            return PartialView();
        }
        #endregion

        #region Tờ khai GTC
        public ActionResult HightValueDeInsert(long IdDec = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;
            ViewBag.tab = tab;

            return View();
        }

        public ActionResult InfoIDA1()
        {
            return PartialView();
        }

        public ActionResult InfoIDA2(int tab = 1)
        {
            ViewBag.tab = tab;

            return PartialView();
        }

        public ActionResult MIDForm(long IdDec = 0, string dclNo = "")
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;
            ViewBag.dclNo = dclNo;

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
        public ActionResult ListProduct(long IdDec = 0, int tab = 1, long dclNo = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;
            ViewBag.tab = tab;
            ViewBag.dclNo = dclNo;
            return View();
        }

        public ActionResult PopInsertHangHoa(long IdDec = 0, int proId = 0)
        {
            ViewBag.IdDec = IdDec;
            ViewBag.proId = proId;
            return PartialView();
        }

        public ActionResult ViewProductIID(long IdDec = 0, int proId = 0)
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

        public ActionResult IDA_Result(long IdDec = 0, long dclNo = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = IdDec;
            ViewBag.dclNo = dclNo;
            ViewBag.tab = tab;
            return View();
        }
        #endregion

        #region Tờ khai GTT
        public ActionResult LowValueDeInsert(long IdDec = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            ViewBag.IdDec = IdDec;
            ViewBag.tab = tab;

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

        public ActionResult IIDForm(long IdDec = 0, string dclNo = "")
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;
            ViewBag.dclNo = dclNo;

            return View();
        }

        public ActionResult MIC_Result(long IdDec = 0, long dclNo = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.decId = IdDec;
            ViewBag.dclNo = dclNo;
            ViewBag.tab = tab;
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

        #region [Quản lý tờ khai điện tử]
        public ActionResult VoucherElectronic(long IdDec = 0, int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDec = IdDec;
            ViewBag.tab = tab;

            return View();
        }
        #endregion

        #region Export Excel
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
                    if (file.LastAccessTime < DateTime.Now.AddHours(-1))
                        file.Delete();
                }
                //End

                //Create file export
                var fileName = "MIC_" + DateTime.Now.ToString("yyyyMMdd") + "_" + data.dclId + ".xls";
                OutputPath += fileName; 
                System.IO.File.Copy(templatePath, OutputPath, true); //copy file

                //---------------------
                xlBook = (Excel.Workbook)excelApp.Workbooks.Open(templatePath, Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);


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
                System.Threading.Thread.Sleep(500);
                excelApp.Quit();
                System.Runtime.InteropServices.Marshal.ReleaseComObject(excelApp);
                GC.Collect();
                GC.WaitForPendingFinalizers();
                System.Threading.Thread.Sleep(500);
            }
            return Json(new { Response = Res, msg = msg, linkDown = linkdown });
        }

        [HttpPost]
        public JsonResult ExportXLSIDA(Declaration data)
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
                string templatePath = Server.MapPath("~/files/Template/ToKhaiHQ_IDA_PL.xls");
                //Nếu thông quan
                if(!string.IsNullOrEmpty(data.dateOfPermit) && !string.IsNullOrWhiteSpace(data.dateOfPermit))
                {
                    templatePath = Server.MapPath("~/files/Template/ToKhaiHQ_IDA_TQ.xls");
                }

                string OutputPath = Server.MapPath("~/files/export/IDA/");

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
                    if (file.LastAccessTime < DateTime.Now.AddHours(-1))
                        file.Delete();
                }
                //End

                //Create file export
                var fileName = "IDA_" + DateTime.Now.ToString("yyyyMMdd") + "_" + data.dclId + ".xls";
                OutputPath += fileName;
                System.IO.File.Copy(templatePath, OutputPath, true); //copy file

                //---------------------
                xlBook = (Excel.Workbook)excelApp.Workbooks.Open(templatePath, Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value,
                    Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value, Missing.Value);

                ///==============================Fill data============================== 

                #region Thông tin chung 1
                excelApp.Range["E4"].Value = "'" + data.dclNo;
                excelApp.Range["R4"].Value = "'" + data.firstDclNo;
                excelApp.Range["L5"].Value = "'" + data.tentativeDclNo;
                excelApp.Range["I6"].Value = "'" + data.insClsCd;
                excelApp.Range["P6"].Value = "'" + data.dclKindCd;
                excelApp.Range["AE6"].Value = "'" + data.repTaxCd;
                excelApp.Range["L7"].Value = "'" + data.cstOffice;
                excelApp.Range["AE7"].Value = "'" + data.cstSubSection;
                excelApp.Range["G8"].Value = data.regDate + " " + data.regTime;
                excelApp.Range["R8"].Value = data.regDateOfCor + " " + data.regTimeOfCor;
                excelApp.Range["AE8"].Value = data.timeLimReExp;
                #endregion

                #region Người nhập khẩu
                excelApp.Range["H10"].Value = data.imperCd;
                excelApp.Range["H11"].Value = data.imperNm;
                excelApp.Range["H13"].Value = data.postcode;
                excelApp.Range["H14"].Value = data.addressOfImp;
                excelApp.Range["H16"].Value = data.phoneNoOfImp;
                excelApp.Range["H18"].Value = data.impCtrCd;
                excelApp.Range["H19"].Value = data.impCtrNm;
                #endregion 

                #region Người xuất khẩu
                excelApp.Range["H22"].Value = data.consignorCd;
                excelApp.Range["H23"].Value = data.consignorNm;
                excelApp.Range["H24"].Value = data.postcodeIdt;
                excelApp.Range["H25"].Value = data.address1Street;
                excelApp.Range["U25"].Value = data.address2Street;
                excelApp.Range["H26"].Value = data.address3CityNm;
                excelApp.Range["U26"].Value = data.countryNm;
                excelApp.Range["H27"].Value = data.countryCd;
                excelApp.Range["I28"].Value = data.exportCsgNm;
                #endregion

                //Đại lý HQ - Nhân viên HQ
                excelApp.Range["G29"].Value = data.agentCd + " " + data.agentNm;
                excelApp.Range["AF29"].Value = data.exportCsgNm;

                #region Vận đơn
                
                if(data.lsCargoNo != null)
                {
                    var rowCargo = 31;
                    for (int i = 0; i < data.lsCargoNo.Length; i++)
                    {
                        excelApp.Range["D" + rowCargo].Value = data.lsCargoNo[i].cargoNo;
                        rowCargo++;
                    }
                }
                
                excelApp.Range["K36"].Value = "'" + data.cargoPiece;
                excelApp.Range["P36"].Value = "'" + data.pieceUnitCd;
                excelApp.Range["K37"].Value = "'" + data.cargoWeigGrs;
                excelApp.Range["P37"].Value = "'" + data.weigUnitCdGrs;
                excelApp.Range["K38"].Value = "'" + data.noHandledCtn;
                excelApp.Range["U30"].Value = "'" + data.cstWrhCd;
                excelApp.Range["Z30"].Value = "'" + data.cstWrhNm;
                excelApp.Range["U31"].Value = "'" + data.unloadPortCd;
                excelApp.Range["Z31"].Value = "'" + data.unloadPortNm;
                excelApp.Range["U32"].Value = "'" + data.loadLocCd;
                excelApp.Range["Z32"].Value = "'" + data.loadLocNm; 
                excelApp.Range["T34"].Value = "'" + data.loadVesselCd;
                excelApp.Range["Z34"].Value = "'" + data.loadVesselAcNm;
                excelApp.Range["U35"].Value = !string.IsNullOrWhiteSpace(data.arrDate) ? DateTime.Parse(data.arrDate).ToString("dd-MM-yyyy") : "";
                excelApp.Range["U36"].Value = data.marksAndNos;
                excelApp.Range["Y39"].Value = data.dateOfPermit; 

                if(data.lsOtherLawCode != null)
                {
                    var otherLawCode = "";
                    for (int i = 0; i < data.lsOtherLawCode.Length; i++)
                    {
                        if(!string.IsNullOrWhiteSpace(data.lsOtherLawCode[i].otherLawCd))
                            otherLawCode += data.lsOtherLawCode[i].otherLawCd + " - ";
                    } 
                    excelApp.Range["Y40"].Value = otherLawCode;
                } 
                #endregion

                #region Số hóa đơn
                excelApp.Range["J41"].Value = data.invNo;
                excelApp.Range["J42"].Value = data.eleInvRecNo;
                excelApp.Range["J43"].Value = data.invDate;
                excelApp.Range["J44"].Value = data.termOfPay;
                excelApp.Range["J45"].Value = data.totalInvPrc;
                excelApp.Range["J46"].Value = data.totalTaxVal;
                excelApp.Range["J47"].Value = data.totalDisTaxVal;
                excelApp.Range["X47"].Value = data.totalBPClsCd;
                excelApp.Range["J48"].Value = data.resultInsNm;
                excelApp.Range["S48"].Value = data.resultInsCd;
                #endregion

                #region Giấy phép nhập khẩu
                excelApp.Range["D50"].Value = data.lsPermit.Length > 0 ? "'" + data.lsPermit[0].permitType : "";
                excelApp.Range["F50"].Value = data.lsPermit.Length > 0 ? "'" + data.lsPermit[0].permitLicNo : ""; 
                excelApp.Range["P50"].Value = data.lsPermit.Length > 1 ? "'" + data.lsPermit[1].permitType : "";
                excelApp.Range["R50"].Value = data.lsPermit.Length > 1 ? "'" + data.lsPermit[1].permitLicNo : ""; 
                excelApp.Range["AA50"].Value = data.lsPermit.Length > 2 ? "'" + data.lsPermit[2].permitType : "";
                excelApp.Range["AC50"].Value = data.lsPermit.Length > 2 ? "'" + data.lsPermit[2].permitLicNo : ""; 
                excelApp.Range["D51"].Value = data.lsPermit.Length > 3 ? "'" + data.lsPermit[3].permitType : "";
                excelApp.Range["F51"].Value = data.lsPermit.Length > 3 ? "'" + data.lsPermit[3].permitLicNo : ""; 
                excelApp.Range["P51"].Value = data.lsPermit.Length > 4 ? "'" + data.lsPermit[4].permitType : "";
                excelApp.Range["R51"].Value = data.lsPermit.Length > 4 ? "'" + data.lsPermit[4].permitLicNo : "";
                #endregion

                #region Mã phân loại khai giá trị
                excelApp.Range["I52"].Value = data.valDemarCd;
                excelApp.Range["I53"].Value = data.compDclNo;
                excelApp.Range["O53"].Value = data.curCdBasePrc;
                excelApp.Range["R53"].Value = data.basePrcValAdj;
                excelApp.Range["Y53"].Value = data.idtValType;
                excelApp.Range["AC53"].Value = data.formulaVal;
                #endregion

                #region Các khoản điều chỉnh
                excelApp.Range["I55"].Value = data.freightDemarCd;
                excelApp.Range["L55"].Value = data.freightCurCd;
                excelApp.Range["V55"].Value = data.freight;
                excelApp.Range["I56"].Value = data.insDemarCd;
                excelApp.Range["L56"].Value = data.insCurCd;
                excelApp.Range["V56"].Value = data.insAmt;
                excelApp.Range["AA56"].Value = data.regNoIns; 

                if(data.lsAdjDemar != null)
                {
                    var AdjRow = 58;
                    for (int i = 0; i < data.lsAdjDemar.Length; i++)
                    {
                        excelApp.Range["D" + AdjRow].Value = data.lsAdjDemar[i].adjDemarNm;
                        excelApp.Range["G" + AdjRow].Value = data.lsAdjDemar[i].adjDemarCd;
                        excelApp.Range["K" + AdjRow].Value = data.lsAdjDemar[i].curCdOfEvaAmt;
                        excelApp.Range["N" + AdjRow].Value = data.lsAdjDemar[i].evaluatedAmt;
                        excelApp.Range["U" + AdjRow].Value = data.lsAdjDemar[i].totalDisEva;
                        AdjRow++;
                    } 
                } 
                excelApp.Range["D64"].Value = data.detailsOfVal;
                #endregion

                #region Thuế
                if(data.lsTaxInfo != null)
                {
                    var taxRow = 68;
                    for (int i = 0; i < data.lsTaxInfo.Length; i++)
                    {
                        excelApp.Range["D" + taxRow].Value = data.lsTaxInfo[i].taxSubjectNm;
                        excelApp.Range["H" + taxRow].Value = data.lsTaxInfo[i].totalTaxAmt;
                        excelApp.Range["N" + taxRow].Value = data.lsTaxInfo[i].noColTotalTax;
                        taxRow++;
                    }
                } 
                excelApp.Range["X68"].Value = data.totalPayTax;
                excelApp.Range["X69"].Value = data.secAmt; 
                if(data.lsCurrency != null)
                {
                    var curRow = 70;
                    for (int i = 0; i < data.lsCurrency.Length; i++)
                    {
                        excelApp.Range["X" + curRow].Value = data.lsCurrency[i].curCd;
                        excelApp.Range["AB" + curRow].Value = data.lsCurrency[i].curExcRate;
                        curRow++;
                    }
                }
                
                excelApp.Range["X73"].Value = data.extPayDueCd;
                excelApp.Range["AF73"].Value = data.taxPayer;
                excelApp.Range["X74"].Value = data.reasonCd;
                excelApp.Range["AF74"].Value = data.paymentCls;
                excelApp.Range["U75"].Value = data.structure;
                excelApp.Range["AF75"].Value = data.noOfDclColumn;
                #endregion

                #region Thông tin chung 2
                excelApp.Range["E79"].Value = "'" + data.dclNo;
                excelApp.Range["R79"].Value = "'" + data.firstDclNo;
                excelApp.Range["L80"].Value = "'" + data.tentativeDclNo;
                excelApp.Range["I81"].Value = "'" + data.insClsCd;
                excelApp.Range["P81"].Value = "'" + data.dclKindCd;
                excelApp.Range["AE81"].Value = "'" + data.repTaxCd;
                excelApp.Range["L82"].Value = "'" + data.cstOffice;
                excelApp.Range["AE82"].Value = "'" + data.cstSubSection;
                excelApp.Range["G83"].Value = data.regDate + " " + data.regTime;
                excelApp.Range["R83"].Value = data.regDateOfCor + " " + data.regTimeOfCor;
                excelApp.Range["AE83"].Value = data.timeLimReExp;
                #endregion

                #region Số đính kèm
                excelApp.Range["K84"].Value = data.clsAttachment.Length > 0 ? data.clsAttachment[0].clsAttachment + " - " + data.clsAttachment[0].attachmentNo : "";
                excelApp.Range["S84"].Value = data.clsAttachment.Length > 1 ? data.clsAttachment[1].clsAttachment + " - " + data.clsAttachment[1].attachmentNo : "";
                excelApp.Range["Z84"].Value = data.clsAttachment.Length > 2 ? data.clsAttachment[2].clsAttachment + " - " + data.clsAttachment[2].attachmentNo : "";
                excelApp.Range["G85"].Value = data.notes;
                excelApp.Range["K87"].Value = data.etpControlNo;
                excelApp.Range["AC87"].Value = data.mngNoForUser;
                #endregion

                #region Thông báo của HQ
                if (!string.IsNullOrEmpty(data.dateOfPermit) && !string.IsNullOrWhiteSpace(data.dateOfPermit))
                {
                    excelApp.Range["N122"].Value = data.dateOfPermit + " " + data.timeOfPermit;
                    excelApp.Range["N123"].Value = data.dateCmplInsp + " " + data.timeCmplInsp;
                    excelApp.Range["N124"].Value = data.clsfOfPostInsp;
                    excelApp.Range["N125"].Value = data.bpApprovalDate + " " + data.bpApprovalTime;
                    excelApp.Range["N126"].Value = data.bpInspCmplDate + " " + data.bpInspCmplTime;
                    excelApp.Range["N127"].Value = "'" + data.expNoDayPer;
                    excelApp.Range["U130"].Value = "'" + data.taxCodeGvat;
                    excelApp.Range["AA130"].Value = "'" + data.taxNameGvat;
                    excelApp.Range["AE130"].Value = "'" + data.dlnPmtGvat;

                    excelApp.Range["R133"].Value = data.strDateTrs; 
                    if (data.lsTransInfo != null)
                    {
                        var TranRow = 135;
                        for (int i = 0; i < data.lsTransInfo.Length; i++)
                        {
                            excelApp.Range["L" + TranRow].Value = data.lsTransInfo[i].trnLocTrs;
                            excelApp.Range["P" + TranRow].Value = data.lsTransInfo[i].arrDateTrnLoc;
                            excelApp.Range["U" + TranRow].Value = data.lsTransInfo[i].strDateTrnLoc;
                            TranRow++;
                        }
                    }
                    excelApp.Range["L138"].Value = data.destinationTrs;
                }
                else
                {
                    excelApp.Range["R127"].Value = data.strDateTrs;
                    if (data.lsTransInfo != null)
                    {
                        var TranRow = 129;
                        for (int i = 0; i < data.lsTransInfo.Length; i++)
                        {
                            excelApp.Range["L" + TranRow].Value = data.lsTransInfo[i].trnLocTrs;
                            excelApp.Range["P" + TranRow].Value = data.lsTransInfo[i].arrDateTrnLoc;
                            excelApp.Range["U" + TranRow].Value = data.lsTransInfo[i].strDateTrnLoc;
                            TranRow++;
                        }
                    }
                    excelApp.Range["P132"].Value = data.destinationTrs;
                }
                
                #endregion

                //----------------Hàng hóa---------------
                ((Excel.Worksheet)excelApp.ActiveWorkbook.Sheets[2]).Select();
                xlSheet = xlBook.Sheets[2];

                #region Thông tin chung Sheet hàng hóa
                excelApp.Range["E4"].Value = "'" + data.dclNo;
                excelApp.Range["R4"].Value = "'" + data.firstDclNo;
                excelApp.Range["L5"].Value = "'" + data.tentativeDclNo;
                excelApp.Range["I6"].Value = "'" + data.insClsCd;
                excelApp.Range["P6"].Value = "'" + data.dclKindCd;
                excelApp.Range["AE6"].Value = "'" + data.repTaxCd;
                excelApp.Range["L7"].Value = "'" + data.cstOffice;
                excelApp.Range["AE7"].Value = "'" + data.cstSubSection;
                excelApp.Range["G8"].Value = data.regDate + " " + data.regTime;
                excelApp.Range["R8"].Value = data.regDateOfCor + " " + data.regTimeOfCor;
                excelApp.Range["AE8"].Value = data.timeLimReExp;
                #endregion

                #region in thông tin hàng hóa
                if (data.listProducts != null)
                {
                    for (int i = 0; i < data.listProducts.Length; i++)
                    {
                        var item = data.listProducts[i];
                        //Tạo sheet mới
                        if(i > 0)
                        { 
                            xlSheet.Copy(Type.Missing, xlBook.Sheets[2]);
                            xlBook.Sheets[2 + i].Name = "Hang_NK_" + (i + 1);
                        } 
                        ((Excel.Worksheet)excelApp.ActiveWorkbook.Sheets[2 + i]).Select();

                        excelApp.Range["G11"].Value = "'" + item.hSCd;
                        excelApp.Range["Q11"].Value = "'" + item.materialCd;
                        excelApp.Range["AC11"].Value = "'" + item.prcReCfClsCd;
                        excelApp.Range["G12"].Value = "'" + item.itemName;
                        excelApp.Range["V15"].Value = "'" + item.qtt1;
                        excelApp.Range["AC15"].Value = item.qttUnitCd1;
                        excelApp.Range["V16"].Value = "'" + item.qtt2;
                        excelApp.Range["AC16"].Value = item.qttUnitCd2; 
                        if (item.lsValuationNo != null)
                        {
                            var valuaNo = "";
                            for (int vNo = 0; vNo < item.lsValuationNo.Length; vNo++)
                            {
                                if(!string.IsNullOrWhiteSpace(item.lsValuationNo[vNo].valuationNo))
                                    valuaNo += item.lsValuationNo[vNo].valuationNo + " - ";
                            }
                            excelApp.Range["K16"].Value = valuaNo;
                        }
                        excelApp.Range["I17"].Value = "'" + item.invValue;
                        excelApp.Range["V17"].Value = item.invUnitPrice;
                        excelApp.Range["AC17"].Value = item.unitPriceCurCd;
                        excelApp.Range["AE17"].Value = "'" + item.priceQttUnit;
                        //Thuế nhập khẩu
                        excelApp.Range["I19"].Value = "'" + item.cstValSystem;
                        excelApp.Range["W19"].Value = "'" + item.taxValCurCd;
                        excelApp.Range["Z19"].Value = "'" + item.taxValManual;
                        excelApp.Range["I20"].Value = "'" + item.cstStdQtt;
                        excelApp.Range["P20"].Value = "'" + item.msrUnitCdCst;
                        excelApp.Range["V20"].Value = "'" + item.cstValUnitPrc;
                        excelApp.Range["AE20"].Value = "'" + item.unitCstUnitPrc; 
                        excelApp.Range["G21"].Value = "'" + item.impTaxRateCd;
                        excelApp.Range["I21"].Value = "'" + item.impTaxRate;
                        excelApp.Range["P21"].Value = "'" + item.impTaxRateInp; 
                        excelApp.Range["X21"].Value = "'" + item.absTariffRate;
                        excelApp.Range["AE21"].Value = "'" + item.absDutyUnitCd;
                        excelApp.Range["AF21"].Value = "'" + item.curCdAbsDuty; 
                        excelApp.Range["I22"].Value = "'" + item.impTaxAmt; 
                        excelApp.Range["X22"].Value = "'" + item.placeOriginCd;
                        excelApp.Range["Z22"].Value = "'" + item.oriPlaceNm;
                        excelApp.Range["AC22"].Value = "'" + item.importTaxClfCd; 
                        excelApp.Range["I23"].Value = "'" + item.rdcImpTaxAmt;
                        excelApp.Range["W23"].Value = "'" + item.tariffQuotaClf;
                        excelApp.Range["T24"].Value = "'" + item.tenDclLineNo; 
                        excelApp.Range["K25"].Value = "'" + item.taxExpLsNo;
                        excelApp.Range["P25"].Value = "'" + item.taxExpLsLineNo; 
                        excelApp.Range["M26"].Value = "'" + item.rdcImpTaxCd;
                        excelApp.Range["P26"].Value = "'" + item.rdcAmtImpTax;
                        //Thuế và thu khác
                        if(item.lsOtherTax != null)
                        {
                            var rowOTax1 = 29; var rowOTax2 = 30; var rowOTax3 = 31;
                            var rowOTax4 = 32; var rowOTax5 = 33;
                            for (int k = 0; k < item.lsOtherTax.Length; k++)
                            {
                                excelApp.Range["H" + rowOTax1].Value = "'" + item.lsOtherTax[k].itemNmOTax;
                                excelApp.Range["W" + rowOTax1].Value = "'" + item.lsOtherTax[k].oTaxTypeCd;

                                excelApp.Range["I" + rowOTax2].Value = "'" + item.lsOtherTax[k].cstOTaxAmt;
                                excelApp.Range["W" + rowOTax2].Value = "'" + item.lsOtherTax[k].stdOTax;
                                excelApp.Range["AE" + rowOTax2].Value = "'" + item.lsOtherTax[k].stdOTax;

                                excelApp.Range["I" + rowOTax3].Value = "'" + item.lsOtherTax[k].taxRateOfOTax;

                                excelApp.Range["I" + rowOTax4].Value = "'" + item.lsOtherTax[k].otherTaxAmt;
                                excelApp.Range["U" + rowOTax4].Value = "'" + item.lsOtherTax[k].prvOTaxInLaw;

                                excelApp.Range["I" + rowOTax5].Value = "'" + item.lsOtherTax[k].oTaxCerAmt;

                                rowOTax1 = rowOTax1 + 5; rowOTax2 = rowOTax2 + 5; rowOTax3 = rowOTax3 + 5;
                                rowOTax4 = rowOTax4 + 5; rowOTax5 = rowOTax5 + 5;
                            }
                        }
                    }
                }
                #endregion

                //===============================end=====================================

                //Active lại sheet 1
                ((Excel.Worksheet)excelApp.ActiveWorkbook.Sheets[1]).Select(); 

                object oFilename = OutputPath; 
                excelApp.DisplayAlerts = false;
                xlBook.SaveAs(oFilename);
                xlBook.Close();

                Res = 1;
                msg = "Thành công";
                linkdown = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "files/export/IDA/" + AccountSession.AccountID + "/" + fileName;
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
                System.Threading.Thread.Sleep(1000);
            }
            return Json(new { Response = Res, msg = msg, linkDown = linkdown });
        }
        #endregion
    }
}