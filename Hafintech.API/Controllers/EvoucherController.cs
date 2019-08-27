using App.Utils;
using App.Utils.GetData;
using Hafintech.API.Models;
using Hafintech.API.Providers;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("Evoucher")]
    public class EvoucherController : ApiController
    {
        protected string MyString;
        [HttpGet]
        [Route("GetSample")]
        public async Task<IHttpActionResult> GetSample(string type)
        {
            try
            {
                var url = "http://10.1.18.3:6886/voucher/getSample?type=" + type;
                var res = await DataService.GetAsync<dynamic>(url);
                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("Create")]
        public async Task<IHttpActionResult> Create()//Voucher data)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = httpRequest["jsonData"];
                NLogManager.LogMessage("jsonData: " + jsonData);

                //string jsonString = "{\"error\":[{\"id\":\"15006\",\"code\":\"Error CODE\",\"message\":\"Error Message\"}]}";
                //jsonString.Replace("\"", ""); 
                //MyError obj = JsonConvert.DeserializeObject<MyError>(jsonString); 

                Voucher data = JsonConvert.DeserializeObject<Voucher>(jsonData);



                int FileLen;
                System.IO.Stream MyStream;
                System.Web.HttpFileCollection MyFileCollection;
                MyFileCollection = httpRequest.Files;


                int totalFile = MyFileCollection.Count;

                System.Web.HttpPostedFile MyFile;
                


                string[] ArrBase64 = new string[totalFile];
                string[] ArrNameFile = new string[totalFile];
                for (int i = 0; i < totalFile; i++)
                {
                    MyFile = MyFileCollection[i];

                    ArrNameFile[i] = MyFile.FileName;

                    FileLen = MyFile.ContentLength;
                    byte[] input = new byte[FileLen];


                    // Initialize the stream.
                    MyStream = MyFile.InputStream;

                    // Read the file into the byte array.
                    MyStream.Read(input, 0, FileLen);

                    //// Copy the byte array into a string.
                    //for (int Loop1 = 0; Loop1 < FileLen; Loop1++)
                    //    MyString = MyString + input[Loop1].ToString();



                    //BinaryReader br = new BinaryReader(MyFile.InputStream);
                    byte[] bytes = input;//br.ReadBytes((int)MyFile.InputStream.Length);

                    //Convert the Byte Array to Base64 Encoded string.
                    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

                    ////***Save Base64 Encoded string as Image File***// //Convert Base64 Encoded string to Byte Array.
                    //byte[] imageBytes = Convert.FromBase64String(base64String); 
                    //string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Utils/" + Path.GetFileName(MyFile.FileName));
                    //System.IO.File.WriteAllBytes(filePath, imageBytes);
                    ArrBase64[i] = base64String;
                }

                 

                data.createdAccId = (int)AccountSession.AccountID;
                NLogManager.LogMessage("Create   AccountSession.AccountID = " + AccountSession.AccountID);
                data.accountId = data.businessId > 0 ? data.businessId : (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/create";
                Encrypt ec = new Encrypt();

                if (string.IsNullOrEmpty(data.issuer))
                {
                    return Ok(new Response(-22, "không có thông tin input issuer"));
                }
                if (!string.IsNullOrEmpty(data.issue))
                {
                    data.issue = Convert.ToDateTime(data.issue).ToString("yyyy-MM-dd HH:mm:ss");
                }
                data.acceptance = string.IsNullOrEmpty(data.acceptance) ? "" : Convert.ToDateTime(data.acceptance).ToString("yyyy-MM-dd HH:mm:ss");


                data.DeclarationDocument.issue = string.IsNullOrEmpty(data.DeclarationDocument.issue) ? "" : Convert.ToDateTime(data.DeclarationDocument.issue).ToString("yyyy-MM-dd");
                if (data.BillOfLadings != null && data.BillOfLadings.Length > 0)
                {
                    for (int i = 0; i < data.BillOfLadings.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.BillOfLadings[i].issue))  // -> foreach cho nay
                        {
                            data.BillOfLadings[i].issue = Convert.ToDateTime(data.BillOfLadings[i].issue).ToString("yyyy-MM-dd");
                        }
                    } 
                }
                if (data.AdditionalDocuments != null && data.AdditionalDocuments.Length > 0)
                {
                    for (int i = 0; i < data.AdditionalDocuments.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.AdditionalDocuments[i].issue))
                        {
                            data.AdditionalDocuments[i].issue = Convert.ToDateTime(data.AdditionalDocuments[i].issue).ToString("yyyy-MM-dd");
                        }
                        data.AdditionalDocuments[i].issuer = data.issuer;
                    }
                     
                }

                if (data.CertificateOfOrigins != null && data.CertificateOfOrigins.Length > 0)
                {
                    for (int i = 0; i < data.CertificateOfOrigins.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.CertificateOfOrigins[i].issue))
                        {
                            data.CertificateOfOrigins[i].issue = Convert.ToDateTime(data.CertificateOfOrigins[i].issue).ToString("yyyy-MM-dd");
                        }
                    }
                    
                }
                if (data.Licenses != null && data.Licenses.Length > 0)
                {
                    for (int i = 0; i < data.Licenses.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.Licenses[i].issue))
                        {
                            data.Licenses[i].issue = Convert.ToDateTime(data.Licenses[i].issue).ToString("yyyy-MM-dd");
                        }
                        if (!string.IsNullOrEmpty(data.Licenses[i].expire))
                        {
                            data.Licenses[i].expire = Convert.ToDateTime(data.Licenses[i].expire).ToString("yyyy-MM-dd");
                        }
                    }
                    

                }
                if (data.ContractDocuments != null && data.ContractDocuments.Length > 0)
                {
                    for (int i = 0; i < data.ContractDocuments.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.ContractDocuments[i].issue))
                        {
                            data.ContractDocuments[i].issue = Convert.ToDateTime(data.ContractDocuments[i].issue).ToString("yyyy-MM-dd");
                        }
                        if (!string.IsNullOrEmpty(data.ContractDocuments[i].expire))
                        {
                            data.ContractDocuments[i].expire = Convert.ToDateTime(data.ContractDocuments[i].expire).ToString("yyyy-MM-dd");
                        }
                    }
                    
                }
                if (data.CommercialInvoices != null && data.CommercialInvoices.Length > 0)
                {
                    for (int i = 0; i < data.CommercialInvoices.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.CommercialInvoices[i].issue))
                        {
                            data.CommercialInvoices[i].issue = Convert.ToDateTime(data.CommercialInvoices[i].issue).ToString("yyyy-MM-dd");
                        }
                    }
                   
                }
                if(totalFile >0)
                {
                    for (int i = 0; i < totalFile; i++)
                    {
                        switch (data.issuer)
                        {
                            case "308":
                                data.Licenses[i].AttachedFile.content = ArrBase64[i];   //Đăng ký Giấy phép điện tử
                                data.Licenses[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "309":
                                data.ContractDocuments[i].AttachedFile.content = ArrBase64[i];//Đăng ký Hợp đồng điện tử
                                data.ContractDocuments[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "310":
                                data.CommercialInvoices[i].AttachedFile.content = ArrBase64[i];//Đăng ký Hóa đơn điện tử
                                data.CommercialInvoices[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "311":
                                data.CertificateOfOrigins[i].AttachedFile.content = ArrBase64[i];//Đăng ký CO điện tử
                                data.CertificateOfOrigins[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "312":
                                data.BillOfLadings[i].AttachedFile.content = ArrBase64[i]; //Đăng ký Vận đơn điện tử
                                data.BillOfLadings[i].AttachedFile.fileName = ArrNameFile[i];

                                break;  //
                                        //case "313": data.AdditionalDocuments[0].AttachedFile.content = ec.ConvertToBase64(data.AdditionalDocuments[0].AttachedFile.content.ToString()); //container
                                        //    break;  //
                            case "314":
                                data.AdditionalDocuments[i].AttachedFile.content = ArrBase64[i];//Đăng ký danh sách Container đính kèm//Đăng ký Chứng từ khác điện tử
                                data.AdditionalDocuments[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "322":
                                ;//Khai báo Tờ khai vận chuyển độc lập đủ điều kiện qua KVGS
                                break;  //
                            case "320":
                                ;//Đăng ký đăng ký thủ tục HQ ngoài giờ hành chính
                                break;  //
                            case "331":
                                ;//BÁO CÁO QUYẾT TOÁN NGUYÊN LIỆU, VẬT TƯ, THÀNH PHẨM SẢN XUẤT TỪ NGUỒN NHẬP KHẨU (Đăng ký, Sửa)
                                break;  //
                            case "332":
                                ;//BÁO CÁO QUYẾT TOÁN SỬ DỤNG MÁY MÓC, THIẾT BỊ THEO TỪNG HỢP ĐỒNG GIA CÔNG  (Đăng ký, Sửa)
                                break;  //
                            case "334":
                                ;//BÁO CÁO QUYẾT TOÁN NGUYÊN LIỆU, VẬT TƯ, THÀNH PHẨM CỦA LOẠI HÌNH ĐẶT GIA CÔNG TẠI NƯỚC NGOÀI  (Đăng ký, Sửa)
                                break;  //
                            case "333":
                                ;//THÔNG BÁO CƠ SỞ SẢN XUẤT, NƠI LƯU GIỮ NL, VT, MMTB VÀ SP XUẤT KHẨU  (Đăng ký, Sửa)
                                break;  // 
                        }
                    }
                    
                }
                



                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("CreateContainer")]
        public async Task<IHttpActionResult> CreateContainer() //Container data)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = httpRequest["jsonData"];
                NLogManager.LogMessage("jsonData: " + jsonData);

                //string jsonString = "{\"error\":[{\"id\":\"15006\",\"code\":\"Error CODE\",\"message\":\"Error Message\"}]}";
                //jsonString.Replace("\"", ""); 
                //MyError obj = JsonConvert.DeserializeObject<MyError>(jsonString); 

                Container data = JsonConvert.DeserializeObject<Container>(jsonData);



                int FileLen;
                System.IO.Stream MyStream;
                System.Web.HttpFileCollection MyFileCollection;
                MyFileCollection = httpRequest.Files;


                int totalFile = MyFileCollection.Count;

                System.Web.HttpPostedFile MyFile;



                string[] ArrBase64 = new string[totalFile];
                for (int i = 0; i < totalFile; i++)
                {
                    MyFile = MyFileCollection[i];

                    FileLen = MyFile.ContentLength;
                    byte[] input = new byte[FileLen];


                    // Initialize the stream.
                    MyStream = MyFile.InputStream;

                    // Read the file into the byte array.
                    MyStream.Read(input, 0, FileLen);

                    //// Copy the byte array into a string.
                    //for (int Loop1 = 0; Loop1 < FileLen; Loop1++)
                    //    MyString = MyString + input[Loop1].ToString();



                    //BinaryReader br = new BinaryReader(MyFile.InputStream);
                    byte[] bytes = input;//br.ReadBytes((int)MyFile.InputStream.Length);

                    //Convert the Byte Array to Base64 Encoded string.
                    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

                    ////***Save Base64 Encoded string as Image File***// //Convert Base64 Encoded string to Byte Array.
                    //byte[] imageBytes = Convert.FromBase64String(base64String); 
                    //string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Utils/" + Path.GetFileName(MyFile.FileName));
                    //System.IO.File.WriteAllBytes(filePath, imageBytes);
                    ArrBase64[i] = base64String;
                }

                 




                data.accountId = data.accountId??(int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/create";
                Encrypt ec = new Encrypt();

                if (string.IsNullOrEmpty(data.issuer))
                {
                    return Ok(new Response(-22, "không có thông tin input issuer"));
                }
                if (!string.IsNullOrEmpty(data.issue))
                {
                    data.issue = Convert.ToDateTime(data.issue).ToString("yyyy-MM-dd HH:mm:ss");
                }
                data.acceptance = string.IsNullOrEmpty(data.acceptance) ? "" : Convert.ToDateTime(data.acceptance).ToString("yyyy-MM-dd HH:mm:ss");


                data.DeclarationDocument.issue = string.IsNullOrEmpty(data.DeclarationDocument.issue) ? "" : Convert.ToDateTime(data.DeclarationDocument.issue).ToString("yyyy-MM-dd");


                if(totalFile >0)
                {
                    //data.AttachedFile.content = ec.ConvertToBase64(data.AttachedFile.content.ToString());
                    data.AttachedFile.content = ArrBase64[0];
                }
                
                
                 

                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IHttpActionResult> Update()  //(Voucher data)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = httpRequest["jsonData"];
                NLogManager.LogMessage("jsonData: " + jsonData);


                Voucher data = JsonConvert.DeserializeObject<Voucher>(jsonData);



                int FileLen;
                System.IO.Stream MyStream;
                System.Web.HttpFileCollection MyFileCollection;
                MyFileCollection = httpRequest.Files;


                int totalFile = MyFileCollection.Count;

                System.Web.HttpPostedFile MyFile;



                string[] ArrBase64 = new string[totalFile];
                string[] ArrNameFile = new string[totalFile];
                for (int i = 0; i < totalFile; i++)
                {
                    MyFile = MyFileCollection[i];

                    ArrNameFile[i] = MyFile.FileName;

                    FileLen = MyFile.ContentLength;
                    byte[] input = new byte[FileLen];


                    // Initialize the stream.
                    MyStream = MyFile.InputStream;

                    // Read the file into the byte array.
                    MyStream.Read(input, 0, FileLen);

                    //// Copy the byte array into a string.
                    //for (int Loop1 = 0; Loop1 < FileLen; Loop1++)
                    //    MyString = MyString + input[Loop1].ToString();



                    //BinaryReader br = new BinaryReader(MyFile.InputStream);
                    byte[] bytes = input;//br.ReadBytes((int)MyFile.InputStream.Length);

                    //Convert the Byte Array to Base64 Encoded string.
                    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

                    ////***Save Base64 Encoded string as Image File***// //Convert Base64 Encoded string to Byte Array.
                    //byte[] imageBytes = Convert.FromBase64String(base64String); 
                    //string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Utils/" + Path.GetFileName(MyFile.FileName));
                    //System.IO.File.WriteAllBytes(filePath, imageBytes);
                    ArrBase64[i] = base64String;
                }



                //data.createdAccId = (int)AccountSession.AccountID;
                //NLogManager.LogMessage("Create   AccountSession.AccountID = " + AccountSession.AccountID);
                //data.accountId = data.businessId > 0 ? data.businessId : (int)AccountSession.AccountID;
                //var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/create";



                Encrypt ec = new Encrypt();

                if (string.IsNullOrEmpty(data.issuer))
                {
                    return Ok(new Response(-22, "không có thông tin input issuer"));
                }
                if (!string.IsNullOrEmpty(data.issue))
                {
                    data.issue = Convert.ToDateTime(data.issue).ToString("yyyy-MM-dd HH:mm:ss");
                }
                data.acceptance = string.IsNullOrEmpty(data.acceptance) ? "" : Convert.ToDateTime(data.acceptance).ToString("yyyy-MM-dd HH:mm:ss");


                data.DeclarationDocument.issue = string.IsNullOrEmpty(data.DeclarationDocument.issue) ? "" : Convert.ToDateTime(data.DeclarationDocument.issue).ToString("yyyy-MM-dd");
                if (data.BillOfLadings != null && data.BillOfLadings.Length > 0)
                {
                    for (int i = 0; i < data.BillOfLadings.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.BillOfLadings[i].issue))  // -> foreach cho nay
                        {
                            data.BillOfLadings[i].issue = Convert.ToDateTime(data.BillOfLadings[i].issue).ToString("yyyy-MM-dd");
                        }
                    }
                }
                if (data.AdditionalDocuments != null && data.AdditionalDocuments.Length > 0)
                {
                    for (int i = 0; i < data.AdditionalDocuments.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.AdditionalDocuments[i].issue))
                        {
                            data.AdditionalDocuments[i].issue = Convert.ToDateTime(data.AdditionalDocuments[i].issue).ToString("yyyy-MM-dd");
                        }
                        data.AdditionalDocuments[i].issuer = data.issuer;
                    }

                }

                if (data.CertificateOfOrigins != null && data.CertificateOfOrigins.Length > 0)
                {
                    for (int i = 0; i < data.CertificateOfOrigins.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.CertificateOfOrigins[i].issue))
                        {
                            data.CertificateOfOrigins[i].issue = Convert.ToDateTime(data.CertificateOfOrigins[i].issue).ToString("yyyy-MM-dd");
                        }
                    }

                }
                if (data.Licenses != null && data.Licenses.Length > 0)
                {
                    for (int i = 0; i < data.Licenses.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.Licenses[i].issue))
                        {
                            data.Licenses[i].issue = Convert.ToDateTime(data.Licenses[i].issue).ToString("yyyy-MM-dd");
                        }
                        if (!string.IsNullOrEmpty(data.Licenses[i].expire))
                        {
                            data.Licenses[i].expire = Convert.ToDateTime(data.Licenses[i].expire).ToString("yyyy-MM-dd");
                        }
                    }


                }
                if (data.ContractDocuments != null && data.ContractDocuments.Length > 0)
                {
                    for (int i = 0; i < data.ContractDocuments.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.ContractDocuments[i].issue))
                        {
                            data.ContractDocuments[i].issue = Convert.ToDateTime(data.ContractDocuments[i].issue).ToString("yyyy-MM-dd");
                        }
                        if (!string.IsNullOrEmpty(data.ContractDocuments[i].expire))
                        {
                            data.ContractDocuments[i].expire = Convert.ToDateTime(data.ContractDocuments[i].expire).ToString("yyyy-MM-dd");
                        }
                    }

                }
                if (data.CommercialInvoices != null && data.CommercialInvoices.Length > 0)
                {
                    for (int i = 0; i < data.CommercialInvoices.Length; i++)
                    {
                        if (!string.IsNullOrEmpty(data.CommercialInvoices[i].issue))
                        {
                            data.CommercialInvoices[i].issue = Convert.ToDateTime(data.CommercialInvoices[i].issue).ToString("yyyy-MM-dd");
                        }
                    }

                }

                if (totalFile > 0)
                {
                    for (int i = 0; i < totalFile; i++)
                    {
                        if(string.IsNullOrEmpty(ArrBase64[i])) //nếu nội dung file không thay đổi, gán null để ko update
                        {
                            ArrBase64[i] = null;
                        }
                        switch (data.issuer)
                        {
                            case "308":
                                data.Licenses[i].AttachedFile.content = ArrBase64[i];   //Đăng ký Giấy phép điện tử
                                data.Licenses[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "309":
                                data.ContractDocuments[i].AttachedFile.content = ArrBase64[i];//Đăng ký Hợp đồng điện tử
                                data.ContractDocuments[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "310":
                                data.CommercialInvoices[i].AttachedFile.content = ArrBase64[i];//Đăng ký Hóa đơn điện tử
                                data.CommercialInvoices[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "311":
                                data.CertificateOfOrigins[i].AttachedFile.content = ArrBase64[i];//Đăng ký CO điện tử
                                data.CertificateOfOrigins[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "312":
                                data.BillOfLadings[i].AttachedFile.content = ArrBase64[i]; //Đăng ký Vận đơn điện tử
                                data.BillOfLadings[i].AttachedFile.fileName = ArrNameFile[i];

                                break;  //
                                        //case "313": data.AdditionalDocuments[0].AttachedFile.content = ec.ConvertToBase64(data.AdditionalDocuments[0].AttachedFile.content.ToString()); //container
                                        //    break;  //
                            case "314":
                                data.AdditionalDocuments[i].AttachedFile.content = ArrBase64[i];//Đăng ký danh sách Container đính kèm//Đăng ký Chứng từ khác điện tử
                                data.AdditionalDocuments[i].AttachedFile.fileName = ArrNameFile[i];
                                break;  //
                            case "322":
                                ;//Khai báo Tờ khai vận chuyển độc lập đủ điều kiện qua KVGS
                                break;  //
                            case "320":
                                ;//Đăng ký đăng ký thủ tục HQ ngoài giờ hành chính
                                break;  //
                            case "331":
                                ;//BÁO CÁO QUYẾT TOÁN NGUYÊN LIỆU, VẬT TƯ, THÀNH PHẨM SẢN XUẤT TỪ NGUỒN NHẬP KHẨU (Đăng ký, Sửa)
                                break;  //
                            case "332":
                                ;//BÁO CÁO QUYẾT TOÁN SỬ DỤNG MÁY MÓC, THIẾT BỊ THEO TỪNG HỢP ĐỒNG GIA CÔNG  (Đăng ký, Sửa)
                                break;  //
                            case "334":
                                ;//BÁO CÁO QUYẾT TOÁN NGUYÊN LIỆU, VẬT TƯ, THÀNH PHẨM CỦA LOẠI HÌNH ĐẶT GIA CÔNG TẠI NƯỚC NGOÀI  (Đăng ký, Sửa)
                                break;  //
                            case "333":
                                ;//THÔNG BÁO CƠ SỞ SẢN XUẤT, NƠI LƯU GIỮ NL, VT, MMTB VÀ SP XUẤT KHẨU  (Đăng ký, Sửa)
                                break;  // 
                        }
                    }

                }


                data.accountId = AccountSession.AccountID >0 ? (int)AccountSession.AccountID : data.accountId;
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/update"; 
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }



        [HttpPost]
        [Route("UpdateContainer")]
        public async Task<IHttpActionResult> UpdateContainer()  //(Voucher data)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = httpRequest["jsonData"];
                NLogManager.LogMessage("jsonData: " + jsonData);


                Container data = JsonConvert.DeserializeObject<Container>(jsonData);



                int FileLen;
                System.IO.Stream MyStream;
                System.Web.HttpFileCollection MyFileCollection;
                MyFileCollection = httpRequest.Files;


                int totalFile = MyFileCollection.Count;

                System.Web.HttpPostedFile MyFile;



                string[] ArrBase64 = new string[totalFile];
                string[] ArrNameFile = new string[totalFile];
                for (int i = 0; i < totalFile; i++)
                {
                    MyFile = MyFileCollection[i];

                    ArrNameFile[i] = MyFile.FileName;

                    FileLen = MyFile.ContentLength;
                    byte[] input = new byte[FileLen];


                    // Initialize the stream.
                    MyStream = MyFile.InputStream;

                    // Read the file into the byte array.
                    MyStream.Read(input, 0, FileLen);

                    //// Copy the byte array into a string.
                    //for (int Loop1 = 0; Loop1 < FileLen; Loop1++)
                    //    MyString = MyString + input[Loop1].ToString();



                    //BinaryReader br = new BinaryReader(MyFile.InputStream);
                    byte[] bytes = input;//br.ReadBytes((int)MyFile.InputStream.Length);

                    //Convert the Byte Array to Base64 Encoded string.
                    string base64String = Convert.ToBase64String(bytes, 0, bytes.Length);

                    ////***Save Base64 Encoded string as Image File***// //Convert Base64 Encoded string to Byte Array.
                    //byte[] imageBytes = Convert.FromBase64String(base64String); 
                    //string filePath = System.Web.HttpContext.Current.Server.MapPath("~/Utils/" + Path.GetFileName(MyFile.FileName));
                    //System.IO.File.WriteAllBytes(filePath, imageBytes);
                    ArrBase64[i] = base64String;
                }

                if (totalFile > 0)
                {
                    for (int i = 0; i < totalFile; i++)
                    {
                        if (string.IsNullOrEmpty(ArrBase64[i])) //nếu nội dung file không thay đổi, gán null để ko update
                        {
                            ArrBase64[i] = null;
                        }
                        data.AttachedFile.content = ArrBase64[i];//Đăng ký danh sách Container đính kèm//Đăng ký Chứng từ khác điện tử
                        data.AttachedFile.fileName = ArrNameFile[i];
                    }

                }


                data.accountId = AccountSession.AccountID > 0 ? (int)AccountSession.AccountID : data.accountId;
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }




        [HttpPost]
        [Route("Submit")]
        public async Task<IHttpActionResult> Submit(Voucher data)
        {
            try
            {
                data.accountId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/submit";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    voucherId = data.voucherId
                });
                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("GetInfo")]
        public async Task<IHttpActionResult> GetInfo(Voucher data)
        {
            try
            {
                data.accountId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/submit";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    voucherId = data.voucherId,
                    function = 13
                });
                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpGet]
        [Route("View")]
        public async Task<IHttpActionResult> View(int voucherId)
        {
            try
            {
                if(voucherId <= 0)
                    return NotFound();
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    voucherId = voucherId
                });
                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpGet]
        [Route("Search")]
        public async Task<IHttpActionResult> Search(string voucherId, string issuer, string dclId, string dclNo, int AccountID)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/search";
                var res = await Hafintech.API.GetData.GetData.PostAsync<Rootobject<dynamic>>(url, new
                {
                    //accountId = AccountSession.AccountID,
                    voucherId = voucherId,
                    issuer = issuer,
                    //accountId = AccountID,
                    dclId = dclNo//dclId
                });
                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    ListVoucher = res.results.ListVoucher,
                    Total = res.results.Total
                }));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpGet]
        [Route("SearchAll")]
        public async Task<IHttpActionResult> SearchAll(string voucherId, string issuer, string dclId,int page, int? dclKind, int AccountID)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/search";
                var res = await Hafintech.API.GetData.GetData.PostAsync<Rootobject<dynamic>>(url, new
                {
                    //accountId = AccountSession.AccountID,
                    voucherId = voucherId,
                    issuer = issuer,
                    dclKind = dclKind,
                    accountId = AccountID,
                    page = page,
                    count = 10,
                    dclId = dclId//dclId
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    ListVoucher = res.results.ListVoucher,
                    Total = res.results.Total
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpGet]
        [Route("SearchVoucherSign")]
        public async Task<IHttpActionResult> SearchVoucherSign(string startCreatedDate,string endCreatedDate, int page, int count, int accountId,  string voucherId , string issuer, string dclId, string dclNo, string status)
        {
             
            try
            {
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/search";
                NLogManager.LogMessage("SearchVoucherSign AccountID: " + AccountSession.AccountID);
                var res = await Hafintech.API.GetData.GetData.PostAsync<Rootobject<dynamic>>(url, new
                {
                    //accountId = accountId,  //bussiness account id 
                    accountId= accountId,
                    voucherId = voucherId,
                    issuer = issuer,
                    dclId = dclNo,//dclId
                    page = page.ToString(),
                    count = count.ToString(),
                    status = status,  //đang trình ký 21 - dang chờ, duyệt rồi status = 1,
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    ListVoucher = res.results.ListVoucher,
                    Total = res.results.Total
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
         
        [HttpGet]
        [Route("DeleteVoucher")]
        public async Task<IHttpActionResult> DeleteVoucher(int VoucherID)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationVouchers/api/voucher/delete";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    voucherId = VoucherID,
                    //accountId = (int)AccountSession.AccountID
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(1));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        
        [HttpGet]
        [Route("DeleteItem")]
        public async Task<IHttpActionResult> DeleteItem(int VoucherID, int ItemId)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationVouchers/api/voucher/deleteItem";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    itemId = ItemId,
                    voucherId = VoucherID, 
                    //accountId = (int)AccountSession.AccountID
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(1));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("GetDataToSign")]
        public async Task<IHttpActionResult> GetDataToSign(Voucher voucher)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/getDataToSign";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    voucherId = voucher.voucherId,
                    function = voucher.function
                });

                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.code, res.message, res.results.Data));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SendSignedData")]
        public async Task<IHttpActionResult> SendSignedData(SignedDataVoucher voucher)
        {
            try
            { 
                if(voucher==null)
                {
                    return Ok(new Response(-89, "file ký có dung lượng vượt quá mức cho phép, vui lòng chọn file dung lượng bé hơn!"));
                }
                var url = ConfigurationManager.AppSettings["URLVoucher"] + "voucher/sendSignedData";
                
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, voucher);
                if(res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
            }
            catch(Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("getSignatureVoucher")]
        public async Task<IHttpActionResult> getSignatureVoucher(Voucher voucher)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationVouchers/api/voucher/getSignature";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    voucherId = voucher.voucherId, 
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.code, res.message, res.results.Voucher));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }


        [HttpPost]
        [Route("CloneVoucher")]
        public async Task<IHttpActionResult> CloneVoucher(int VoucherID)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationVouchers/api/voucher/clone";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                { 
                    voucherId = VoucherID, 
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Voucher));
                 
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
    }
}