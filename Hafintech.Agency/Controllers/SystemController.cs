using _2017Utilities.Log;
using _2017Utilities.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Excel = Microsoft.Office.Interop.Excel;
using Microsoft.Office.Core;
using System.IO;
using Hafintech.Agency.Models;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Web.UI.WebControls;
using System.Threading.Tasks;
using System.Net.Http;

namespace Hafintech.Agency.Controllers
{
    public class SystemController : Controller
    {
        // GET: System

        #region Hệ thống báo cáo
        public ActionResult ReportSystem(int tab = 1)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            ViewBag.tab = tab;

            return View();
        }

        //Bảng kê tờ khai MIC/MEC
        public ActionResult ReportMIC_MEC()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return PartialView();
        }
        //Tờ khai chứng từ không có giá trị thương mại
        public ActionResult ReportNoValueBusiness()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return PartialView();
        }

        [HttpPost]
        public JsonResult ExportXLSMIC(List<Declaration> data, int type = 1)
        { 
            var Res = 0;
            var msg = "";
            var linkdown = "";
            try
            {
                Excel.Application application = new Excel.Application();
                Excel.Workbook workbook = application.Workbooks.Add(System.Reflection.Missing.Value);
                Excel.Worksheet worksheet = workbook.ActiveSheet; 

                string foldersave = Server.MapPath("~/files/export/") + AccountSession.AccountID + "/";
                //Tạo thư mục chứa file export nếu không có 
                if (!Directory.Exists(foldersave))
                {
                    Directory.CreateDirectory(foldersave);
                }
                //Xóa hết file trong thư mục trước đó 3 ngày
                System.IO.DirectoryInfo di = new DirectoryInfo(foldersave);
                foreach (FileInfo file in di.GetFiles())
                {
                    if (file.LastAccessTime < DateTime.Now.AddDays(-2))
                        file.Delete(); 
                }

                //Vẽ bảng 
                worksheet.Range["A1"].Value = AccountSession.FullName.ToUpper();
                worksheet.Range["A1"].Font.Bold = true;
                worksheet.Range["G1"].Value = "HQ 02 - BKTKTGT";
                worksheet.Range["G1"].Font.Italic = true;
                worksheet.Range["A1", "G1"].Font.Size = 12;
                worksheet.Range["A2"].Value = data[0].addressAccount;
                worksheet.Range["A3"].Value = "Số:.............../......"; 
                worksheet.Range["A2", "A3"].Font.Size = 11; 

                worksheet.Range["D2"].Value = "BẢN KÊ";
                worksheet.Range["D2"].Font.Size = 16;
                worksheet.Range["D2"].Font.Bold = true;
                worksheet.Range["D2"].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["D2"].VerticalAlignment = VerticalAlign.Middle;
                worksheet.Range["D2"].EntireColumn.ColumnWidth = 63;

                worksheet.Range["A4", "G4"].Merge();   
                if(type == 10)
                    worksheet.Range["A4"].Value = "Tờ khai hàng hóa nhập khẩu trị giá thấp ( MIC ) đã hoàn thành thủ tục hải quan";   
                else
                    worksheet.Range["A4"].Value = "Tờ khai hàng hóa xuất khẩu trị giá thấp ( MEC ) đã hoàn thành thủ tục hải quan";

                worksheet.Range["A4", "A5"].Font.Bold = true;
                worksheet.Range["A4", "A5"].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["A5"].Value = "Master: ";
                worksheet.Range["A5", "G5"].Merge();
                worksheet.Range["A4", "G5"].Font.Size = 12;

                worksheet.Range["A6"].Value = "STT";
                worksheet.Range["A6"].EntireColumn.ColumnWidth = 10;
                worksheet.Range["B6"].Value = "Số tờ khai";
                worksheet.Range["B6"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["C6"].Value = "Số vận đơn";
                worksheet.Range["C6"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["D6"].Value = "Tên hàng";
                worksheet.Range["D6"].EntireColumn.ColumnWidth = 63;
                worksheet.Range["E6"].Value = "Số kiện";
                worksheet.Range["E6"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["F6"].Value = "Trọng lượng (KG)";
                worksheet.Range["F6"].EntireColumn.ColumnWidth = 18;
                worksheet.Range["G6"].Value = "Ghi chú";
                worksheet.Range["G6"].EntireColumn.ColumnWidth = 30;

                worksheet.Range["A6", "G6"].Font.Bold = true;
                worksheet.Range["A6", "G6"].Font.Size = 14;
                worksheet.Range["A6", "G6"].WrapText = true;
                worksheet.Range["A6", "G6"].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["A6", "G6"].VerticalAlignment = VerticalAlign.Middle; 
                //Fill dữ liệu
                var stt = 1;
                var row = 7;
                foreach (var item in data)
                {
                    worksheet.Cells[row, 1] = stt;
                    worksheet.Cells[row, 2] = "'" + item.dclNo;
                    worksheet.Cells[row, 3] = "'" + item.houseAwbNo;
                    worksheet.Cells[row, 4] = item.itemName;
                    worksheet.Cells[row, 5] = "'" + item.cargoPiece;
                    worksheet.Cells[row, 6] = "'" + item.cargoWeigGrs;
                    worksheet.Cells[row, 7] = item.notes;
                    stt++;
                    row++;
                }  

                worksheet.Range["E" + (row + 1)].Value = "HÀ NỘI, NGÀY ……/…../2019";
                worksheet.Range["E" + (row + 1), "G" + (row + 1)].Merge();
                worksheet.Range["E" + (row + 1)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;  
                worksheet.Range["B" + (row + 2)].Value = "DOANH NGHIỆP LẬP BẢN KÊ";
                worksheet.Range["B" + (row + 2), "C" + (row + 2)].Merge();
                worksheet.Range["B" + (row + 2)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter; 
                worksheet.Range["E" + (row + 2)].Value = "CCHQ XÁC NHẬN HÀNG ĐÃ QUA KHU VỰC GIÁM SÁT";
                worksheet.Range["E" + (row + 2), "G" + (row + 2)].Merge();
                worksheet.Range["E" + (row + 2)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["B" + (row + 2), "G" + (row + 2)].Font.Bold = true; 
                worksheet.Range["E" + (row + 3)].Value = "(Ký, đóng dấu công chức )";
                worksheet.Range["E" + (row + 3), "G" + (row + 3)].Merge();
                worksheet.Range["E" + (row + 3)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;

                worksheet.Range["D7", "G" + (row - 1)].WrapText = true;
                worksheet.Range["A7", "C" + (row - 1)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["E7", "F" + (row - 1)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;

                worksheet.Range["A6", "G" + (row - 1)].Cells.Borders.LineStyle = Excel.XlLineStyle.xlContinuous;
                //-----------------End

                string fileName = "BẢN KÊ MIC.xlsx";
                if(type == 20)
                    fileName = "BẢN KÊ MEC.xlsx";

                application.DisplayAlerts = false; 
                workbook.SaveAs(foldersave + fileName);
                workbook.Close();
                Marshal.ReleaseComObject(workbook);
                application.Quit();
                Marshal.FinalReleaseComObject(application);

                Res = 1;
                msg = "Thành công";
                linkdown = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "files/export/" + AccountSession.AccountID + "/" + fileName;

            }
            catch (Exception ex)
            {
                NLogManager.LogError("ExportData Error: " + ex.ToString());
                Res = -1;
                msg = ex.ToString();
                linkdown = "";
            }

            return Json(new { Response = Res, msg = msg, linkDown = linkdown });
        }

        [HttpPost]
        public JsonResult ExportNoValueXLS(List<Declaration> data)
        {
            var Res = 0;
            var msg = "";
            var linkdown = "";
            try
            {
                Excel.Application application = new Excel.Application();
                Excel.Workbook workbook = application.Workbooks.Add(System.Reflection.Missing.Value);
                Excel.Worksheet worksheet = workbook.ActiveSheet; 

                string foldersave = Server.MapPath("~/files/export/") + AccountSession.AccountID + "/";
                //Tạo thư mục chứa file export nếu không có 
                if (!Directory.Exists(foldersave))
                {
                    Directory.CreateDirectory(foldersave);
                }
                //Xóa hết file trong thư mục trước đó 2 ngày
                System.IO.DirectoryInfo di = new DirectoryInfo(foldersave);
                foreach (FileInfo file in di.GetFiles())
                {
                    if (file.LastAccessTime < DateTime.Now.AddDays(-2))
                        file.Delete();
                }

                //==========Vẽ bảng==============
                //Header 
                worksheet.Range["A1"].Value = "CƠ QUAN CHỦ QUẢN";
                worksheet.Range["A1", "C1"].Merge();
                worksheet.Range["A2"].Value = "CƠ QUAN BAN HÀNH VĂN BẢN";
                worksheet.Range["A2"].Font.Bold = true; 
                worksheet.Range["A1", "A2"].Font.Size = 12;
                worksheet.Range["A2", "C2"].Merge(); 
                worksheet.Range["A3"].Value = "--------------";    
                worksheet.Range["A1", "A3"].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["A1", "A3"].VerticalAlignment = VerticalAlign.Middle;
                worksheet.Range["A3", "C3"].Merge(); 
                worksheet.Range["J1"].Value = "Mẫu số HQ 01-TKTLCT";
                worksheet.Range["J1"].Font.Size = 12;
                worksheet.Range["J1"].Font.Bold = true; 
                worksheet.Range["A5"].Value = "Số:.............../TK-CQBHVB";
                worksheet.Range["A5", "C5"].Merge();
                worksheet.Range["A5"].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;

                worksheet.Range["A7"].Value = "TỜ KHAI"; 
                worksheet.Range["A7"].Font.Size = 16;
                worksheet.Range["A7"].Font.Bold = true;
                worksheet.Range["A7", "K7"].Merge();
                worksheet.Range["A8"].Value = "Tài liệu, chứng từ không có giá trị thương mại";
                worksheet.Range["A8"].Font.Size = 12;
                worksheet.Range["A8"].Font.Bold = true;
                worksheet.Range["A8", "K8"].Merge(); 
                worksheet.Range["A9"].Value = "(sử dụng cho hàng hóa nhóm 1)"; 
                worksheet.Range["A9"].Font.Italic = true;  
                worksheet.Range["A7", "K9"].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["A9", "K9"].Merge();

                worksheet.Range["A10"].Value = "STT"; 
                worksheet.Range["A10"].EntireColumn.ColumnWidth = 12;
                worksheet.Range["A10", "A11"].Merge(); 
                worksheet.Range["B10"].Value = "Số vận đơn (Nếu có)"; 
                worksheet.Range["B10"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["B10", "B11"].Merge(); 

                worksheet.Range["C10"].Value = "Họ tên, địa chỉ, số CMND (nếu có)";
                worksheet.Range["C10", "D10"].Merge();
                worksheet.Range["C11"].Value = "Người gửi";
                worksheet.Range["C11"].EntireColumn.ColumnWidth = 25; 
                worksheet.Range["D11"].Value = "Người nhận";
                worksheet.Range["D11"].EntireColumn.ColumnWidth = 25;  

                worksheet.Range["E10"].Value = "Tên hàng"; 
                worksheet.Range["E10"].EntireColumn.ColumnWidth = 25;
                worksheet.Range["E10", "E11"].Merge(); 
                worksheet.Range["F10"].Value = "Mã số hàng"; 
                worksheet.Range["F10"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["F10", "F11"].Merge(); 
                worksheet.Range["G10"].Value = "Xuất xứ"; 
                worksheet.Range["G10"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["G10", "G11"].Merge(); 
                worksheet.Range["H10"].Value = "Số kiện";
                worksheet.Range["H10", "H11"].Merge();
                worksheet.Range["H10"].EntireColumn.ColumnWidth = 20; 
                worksheet.Range["I10"].Value = "Trọng lượng";
                worksheet.Range["I10", "I11"].Merge();
                worksheet.Range["I10"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["J10"].Value = "Lệ phí";
                worksheet.Range["J10", "J11"].Merge();
                worksheet.Range["J10"].EntireColumn.ColumnWidth = 20;
                worksheet.Range["K10"].Value = "Ghi chú";
                worksheet.Range["K10", "K11"].Merge();
                worksheet.Range["K10"].EntireColumn.ColumnWidth = 20;

                worksheet.Range["A10", "K11"].WrapText = true; 
                worksheet.Range["A10", "K11"].Font.Size = 12;
                worksheet.Range["A10", "K11"].Font.Bold = true;
                worksheet.Range["A10", "K11"].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["A10", "K11"].VerticalAlignment = VerticalAlign.Middle;

                ///Body - Fill dữ liệu
                var stt = 1;
                var row = 12;
                foreach (var item in data)
                {
                    worksheet.Cells[row, 1] = stt;
                    worksheet.Cells[row, 2] = "'" + item.houseAwbNo;
                    worksheet.Cells[row, 3] = "'" + item.consignorNm;
                    worksheet.Cells[row, 4] = item.imperNm;
                    worksheet.Cells[row, 5] = "'" + item.itemName;
                    worksheet.Cells[row, 6] = "'" + item.hSCd;
                    worksheet.Cells[row, 7] = item.placeOriginCd;
                    worksheet.Cells[row, 8] = "'" + item.cargoPiece;
                    worksheet.Cells[row, 9] = "'" + item.cargoWeigGrs;
                    worksheet.Cells[row, 10] = "'" + item.cstValue;
                    worksheet.Cells[row, 11] = item.notes;
                    stt++;
                    row++;
                }

                worksheet.Range["A12", "A" + (row - 1)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["A12", "B" + (row - 1)].VerticalAlignment = VerticalAlign.Middle; 
                worksheet.Range["A12", "K" + (row - 1)].WrapText = true;
                worksheet.Range["A10", "K" + (row - 1)].Cells.Borders.LineStyle = Excel.XlLineStyle.xlContinuous;

                worksheet.Range["A" + row].Value = "Xác nhận kết quả kiểm tra:";
                worksheet.Range["A" + row].Font.Bold = true; 
                worksheet.Range["A" + (row + 2)].Value = "...... ngày .... tháng .... năm 20...";
                worksheet.Range["A" + (row + 2)].Font.Italic = true;
                worksheet.Range["A" + (row + 2), "D" + (row + 2)].Merge();
                worksheet.Range["A" + (row + 3)].Value = "CÔNG CHỨC HẢI QUAN";
                worksheet.Range["A" + (row + 3)].Font.Bold = true;
                worksheet.Range["A" + (row + 3), "D" + (row + 3)].Merge();
                worksheet.Range["A" + (row + 4)].Value = "(ký, đóng dấu công chức)";
                worksheet.Range["A" + (row + 4)].Font.Italic = true;
                worksheet.Range["A" + (row + 4), "D" + (row + 4)].Merge();
                worksheet.Range["A" + (row + 5)].Value = "Ghi chú: Nếu hàng hóa xuất khẩu thì gạch bỏ chữ nhập khẩu và ngược lại";
                worksheet.Range["A" + (row + 5), "D" + (row + 5)].Merge();

                worksheet.Range["H" + (row + 2)].Value = "...... ngày .... tháng .... năm 20...";
                worksheet.Range["H" + (row + 2)].Font.Italic = true;
                worksheet.Range["H" + (row + 2), "J" + (row + 2)].Merge();
                worksheet.Range["H" + (row + 3)].Value = "CÔNG TY CHUYỂN PHÁT NHANH";
                worksheet.Range["H" + (row + 3)].Font.Bold = true;
                worksheet.Range["H" + (row + 3), "J" + (row + 3)].Merge();
                worksheet.Range["H" + (row + 4)].Value = "(ký, đóng dấu công chức)";
                worksheet.Range["H" + (row + 4)].Font.Bold = true;
                worksheet.Range["H" + (row + 4), "J" + (row + 4)].Merge();

                worksheet.Range["A" + (row + 2), "D" + (row + 5)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                worksheet.Range["H" + (row + 2), "H" + (row + 5)].Cells.HorizontalAlignment = Excel.XlHAlign.xlHAlignCenter;
                //-----------------

                string fileName = "Report No Value Business_" + DateTime.Now.ToString("yyyyMMdd") + ".xlsx";
                application.DisplayAlerts = false;
                workbook.SaveAs(foldersave + fileName);
                workbook.Close();
                Marshal.ReleaseComObject(workbook);
                application.Quit();
                Marshal.FinalReleaseComObject(application);

                Res = 1;
                msg = "Thành công";
                linkdown = System.Configuration.ConfigurationManager.AppSettings["UrlRoot"] + "files/export/" + AccountSession.AccountID + "/" + fileName;

            }
            catch (Exception ex)
            {
                NLogManager.LogError("ExportData Error: " + ex.ToString());
                Res = -1;
                msg = ex.ToString();
                linkdown = "";
            }

            return Json(new { Response = Res, msg = msg, linkDown = linkdown });
        }
        #endregion

        #region thiết lập thông số mặc định
        public ActionResult SetupVNACCS()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }
        public ActionResult Signature()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        #endregion

        #region 
        public async Task<AccResult> getAccInfo()
        {
            string apiUrl = System.Configuration.ConfigurationManager.AppSettings["Url_API"] + "account/GetInfoByAccountID?accountID=" + AccountSession.AccountID;

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                 
                HttpResponseMessage response = await client.GetAsync(apiUrl);

                var data = await response.Content.ReadAsStringAsync();
                var res = Newtonsoft.Json.JsonConvert.DeserializeObject<AccResult>(data);
                NLogManager.LogMessage(string.Format("getAccInfo Exel: {0}", data));

                return res;
            } 
        }
        #endregion
    }
}