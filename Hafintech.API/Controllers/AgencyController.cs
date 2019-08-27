using App.Utils; 
using App.Utils.GetData;
using Hafintech.API.Models;
using Hafintech.API.Models.Agency;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("Agency")]
    public class AgencyController : ApiController
    {
        #region account
        [HttpPost]
        [Route("Create")]
        public async Task<IHttpActionResult> Create(Agency data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/create";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                var mailController = new MailVerifyController();
                var info = res.results.Business;
                await mailController.GetOTP(data.email, data.email, Convert.ToInt32(info.accountId));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IHttpActionResult> Login(LoginRequest data)
        {
            try
            {
                var dataLogin = new
                {
                    userName = data.username,
                    passWord = data.password,
                };
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "auth/login";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, dataLogin);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                else
                {
                    var info = res.results.Accounts;  

                    string audienceId = ConfigurationManager.AppSettings["as:AudienceId"];
                    string symmetricKeyAsBase64 = ConfigurationManager.AppSettings["as:AudienceSecret"];
                    var keyByteArray = Microsoft.Owin.Security.DataHandler.Encoder.TextEncodings.Base64Url.Decode(symmetricKeyAsBase64);
                    var signingKey = new Thinktecture.IdentityModel.Tokens.HmacSigningCredentials(keyByteArray);

                    var _issuer = new Providers.CustomJwtFormat(ConfigurationManager.AppSettings["issuer"].ToString());
                    var issued = DateTime.Now;
                    var expires = DateTime.Now.AddDays(1);
                    var token = new System.IdentityModel.Tokens.JwtSecurityToken(_issuer.ToString(), audienceId, null, issued, expires, signingKey);

                    var handler = new JwtSecurityTokenHandler();
                    var jwt = handler.WriteToken(token);

                    var response = new
                    {
                        AccountID = info.accountId,
                        AccountName = info.userName,
                        FullName = info.fullName,
                        Mobile = info.mobile == null ? "" : info.mobile,
                        VerifyEmailStatus = info.vrfEmailStatus,
                        VerifyIdentityStatus = info.vrfIdentStatus,
                        VerifyMobileStatus = info.vrfMobiStatus,
                        Type = info.type,
                        access_token = jwt,
                    }; 

                    return Ok(new Response(response));
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response(ex));
            }
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IHttpActionResult> Update(UpdateRequest data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    sigture = res.results.Sigture,
                    business = res.results.Business
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region business
        [HttpPost]
        [Route("CreateBusiness")]
        public async Task<IHttpActionResult> CreateBusiness(Business data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/createBusiness";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateBusiness")]
        public async Task<IHttpActionResult> UpdateBusiness(Business data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/updateBusiness";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("updateBusinessVNACCS")]
        public async Task<IHttpActionResult> updateBusinessVNACCS(Business data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/updateBusinessVNACCS";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetBusinessInfoByID")]
        public async Task<IHttpActionResult> GetBusinessInfoByID(int? type = 1)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/getBusinessInfoByID?accountId=" + AccountSession.AccountID.ToString() + "&type=" + type;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListBusinessByAgency")]
        public async Task<IHttpActionResult> GetListBusinessByAgency(int agencyId)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/getListBusiness?AgencyId=" + agencyId;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("DeleteBusiness")]
        public async Task<IHttpActionResult> DeleteBusiness(List<Business> data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/deleteBusiness";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
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
        #endregion

        #region personal
        [HttpPost]
        [Route("CreatePersonal")]
        public async Task<IHttpActionResult> CreatePersonal(Personal data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/createPersonal";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Personal));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("CreateEmployee")]
        public async Task<IHttpActionResult> CreateEmployee(Personal data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/createEmployee";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Personal));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdatePersonal")]
        public async Task<IHttpActionResult> UpdatePersonal(Personal data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/updatePersonal";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Personal));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SearchPersonal")]
        public async Task<IHttpActionResult> SearchPersonal(Personal data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "personal/search";
                if (data != null)
                {
                    var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                    {
                        personalId = data.personalId,
                        name = data.name,
                        identity = data.identity,
                        parentId = data.parentId,
                        type = data.type,
                        status = data.status,
                        permitGroup = data.permitGroup,
                        email = data.email,
                        phoneNumber = data.phoneNumber,
                        startCreatedDate = data.startCreatedDate,
                        endCreatedDate = data.endCreatedDate,
                    });
                    if (res.code < 0)
                        return Ok(new Response(res.code, res.message));
                    return Ok(new Response(res.results.ListPersonal));
                }
                else
                {
                    var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                    {

                        accountId = (int)AccountSession.AccountID
                    });
                    if (res.code < 0)
                        return Ok(new Response(res.code, res.message));
                    return Ok(new Response(res.results.ListPersonal));
                }

            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListPersonalByAgency")]
        public async Task<IHttpActionResult> GetListPersonalByAgency(int agencyId)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/getListPersonal?AgencyId=" + agencyId;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Personals));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("DeletePersonal")]
        public async Task<IHttpActionResult> DeletePersonal(List<Personal> data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/deletePersonal";
                if (data == null || data.Count <= 0)
                    return Ok(new Response("Đầu vào không đúng"));
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
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
        [Route("UpdateEmployee")]
        public async Task<IHttpActionResult> UpdateEmployee(Personal data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/updateEmployee";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Personal));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("DeleteEmployee")]
        public async Task<IHttpActionResult> DeleteEmployee(List<Personal> data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/deleteEmployee";
                if (data == null || data.Count <= 0)
                    return Ok(new Response("Đầu vào không đúng"));
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
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
        #endregion 

        #region declaration
        [HttpPost]
        [Route("CreateDeclaration")]
        public async Task<IHttpActionResult> CreateDeclaration(Declaration data)
        {
            try
            {
                data.dclPlannedDate = data.dclPlannedDate != null ? DateTime.Parse(data.dclPlannedDate).ToString("dd-MM-yyyy HH:mm:ss") : null;
                data.timeLimReExp = data.timeLimReExp != null ? DateTime.Parse(data.timeLimReExp.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : null;
                data.arrDate = !string.IsNullOrWhiteSpace(data.arrDate) ? DateTime.Parse(data.arrDate).ToString("dd-MM-yyyy HH:mm:ss") : null;
                data.invDate = data.invDate != null ? DateTime.Parse(data.invDate).ToString("dd-MM-yyyy HH:mm:ss") : null;
                data.permitWrhDate = !string.IsNullOrWhiteSpace(data.permitWrhDate) ? DateTime.Parse(data.permitWrhDate).ToString("dd-MM-yyyy HH:mm:ss") : null;
                data.strDateTrs = data.strDateTrs != null ? DateTime.Parse(data.strDateTrs.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : null; 
                data.arrDateOfTrs = !string.IsNullOrEmpty(data.arrDateOfTrs) ? DateTime.Parse(data.arrDateOfTrs).ToString("dd-MM-yyyy HH:mm:ss") : null;
                 
                if (data.lsTransInfo != null)
                {
                    for (var i = 0; i < data.lsTransInfo.Length; i++)
                    {
                        data.lsTransInfo[i].arrDateTrnLoc = !string.IsNullOrWhiteSpace(data.lsTransInfo[i].arrDateTrnLoc) ? DateTime.Parse(data.lsTransInfo[i].arrDateTrnLoc.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : null;

                        data.lsTransInfo[i].strDateTrnLoc = data.lsTransInfo[i].strDateTrnLoc != null && data.lsTransInfo[i].strDateTrnLoc != "" ? DateTime.Parse(data.lsTransInfo[i].strDateTrnLoc.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : null; 
                    }
                } 

                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/create";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateDeclaration")]
        public async Task<IHttpActionResult> UpdateDeclaration(Declaration data)
        {
            try
            {
                data.dclPlannedDate = !string.IsNullOrWhiteSpace(data.dclPlannedDate) ? DateTime.Parse(data.dclPlannedDate).ToString("dd-MM-yyyy HH:mm:ss") : "";
                data.timeLimReExp = !string.IsNullOrWhiteSpace(data.timeLimReExp) ? DateTime.Parse(data.timeLimReExp.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : "";
                data.invDate = !string.IsNullOrWhiteSpace(data.invDate) ? DateTime.Parse(data.invDate).ToString("dd-MM-yyyy HH:mm:ss") : "";
                data.strDateTrs = !string.IsNullOrWhiteSpace(data.strDateTrs) ? DateTime.Parse(data.strDateTrs.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : "";
                data.arrDateOfTrs = !string.IsNullOrWhiteSpace(data.arrDateOfTrs) ? DateTime.Parse(data.arrDateOfTrs).ToString("dd-MM-yyyy HH:mm:ss") : "";
                data.arrDate = !string.IsNullOrWhiteSpace(data.arrDate) ? DateTime.Parse(data.arrDate).ToString("dd-MM-yyyy HH:mm:ss") : "";
                data.permitWrhDate = !string.IsNullOrWhiteSpace(data.permitWrhDate) ? DateTime.Parse(data.permitWrhDate).ToString("dd-MM-yyyy HH:mm:ss") : "";

                if (data.lsTransInfo != null)
                {
                    for (var i = 0; i < data.lsTransInfo.Length; i++)
                    {
                        data.lsTransInfo[i].arrDateTrnLoc = !string.IsNullOrWhiteSpace(data.lsTransInfo[i].arrDateTrnLoc) ? DateTime.Parse(data.lsTransInfo[i].arrDateTrnLoc.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : "";
                        data.lsTransInfo[i].strDateTrnLoc = data.lsTransInfo[i].strDateTrnLoc != null && data.lsTransInfo[i].strDateTrnLoc != "" ? DateTime.Parse(data.lsTransInfo[i].strDateTrnLoc.ToString()).ToString("dd-MM-yyyy HH:mm:ss") : "";
                    }
                } 

                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("Submit")]
        public async Task<IHttpActionResult> Submit(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/submitBySigAccId";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url,
                    new { dclId = data.declarationId, status = data.status, dclNo = data.dclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpGet]
        [Route("SetSignMethod")]
        public async Task<IHttpActionResult> SetSignMethod(int businessId = 0, int signMethod = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/setSignMethod?businessId=" + businessId + "&signMethod=" + signMethod;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
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
        [Route("SetSubmitMethod")]
        public async Task<IHttpActionResult> SetSubmitMethod(int businessId = 0, int submitMethod = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/setSubmitMethod?businessId=" + businessId + "&submitMethod=" + submitMethod;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
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
        [Route("CreateSignature")]
        public async Task<IHttpActionResult> CreateSignature()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = JsonConvert.DeserializeObject<Signature>(httpRequest["jsonData"]);
                //jsonData.accountId = (int)AccountSession.AccountID;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "signature/create";
                NLogManager.LogMessage("count file: " + httpRequest.Files.Count.ToString());
                var res = await DataService.PostAsyncWithFile<Rootobject<dynamic>>(url, JsonConvert.SerializeObject(jsonData), httpRequest.Files, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Signature));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("GetSignature")]
        public async Task<IHttpActionResult> GetSignature(string accountId)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "signature/getList?accountId=" + accountId;// AccountSession.AccountID;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Signature));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("SignDecla")]
        public async Task<IHttpActionResult> SignDecla(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/getSignature";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = data.declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("getSignatureAma")]
        public async Task<IHttpActionResult> getSignatureAma(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/getSignatureAma";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = data.declarationId });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateSignature")]
        public async Task<IHttpActionResult> UpdateSignature(Signature data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "signature/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Signature));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SetDefaultSignature")]
        public async Task<IHttpActionResult> SetDefaultSignature(Signature data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "signature/setDefault";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Signature));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchDeclaration")]
        public async Task<IHttpActionResult> SearchDeclaration(int? accountId = null, int type = 0, int? dclId = null,
           string cstOffice = "", string dclNo = "", string startCreatedDate = "", string endCreatedDate = "", int? approvalStatus = null, 
           string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0, string statusCode = null, string clsOrg = null,
           int page = 1, int count = 10, int signatureId = 0, int? createdAccId = null, int? acceptAccId = null, int? sigAccId = null, long? businessId = null, 
           string houseAwbNo = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = accountId,
                    type = type,
                    endCreatedDate = endCreatedDate,
                    dclId = dclId,
                    cstOffice = cstOffice,
                    dclNo = dclNo,
                    startCreatedDate = startCreatedDate,
                    dclKindCd = dclKindCd,
                    insClsCd = insClsCd,
                    clearanStatus = clearanStatus,
                    status = status,
                    page = page,
                    count = count,
                    statusCode = statusCode,
                    signatureId = signatureId,
                    acceptAccId = acceptAccId,
                    sigAccId = sigAccId,
                    clsOrg = clsOrg,
                    approvalStatus = approvalStatus,
                    businessId = businessId,
                    houseAwbNo = houseAwbNo
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListDeclarations = res.results.ListDeclarations

                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchEXDeclaration")]
        public async Task<IHttpActionResult> SearchEXDeclaration(int? accountId = null, int type = 0, int? dclId = null,
            string cstOffice = "", string dclNo = "", string startCreatedDate = "", string endCreatedDate = "",
           string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0,
           string statusCode = "", int page = 1, int count = 10, int? createdAccId = null, int signatureId = 0, int? sigAccId = null, int? approvalStatus = null, long? businessId = null)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exDeclaration/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    page = page,
                    count = count,
                    accountId = accountId,
                    type = type,
                    endCreatedDate = endCreatedDate,
                    dclId = dclId,
                    cstOffice = cstOffice,
                    dclNo = dclNo,
                    startCreatedDate = startCreatedDate,
                    dclKindCd = dclKindCd,
                    insClsCd = insClsCd,
                    clearanStatus = clearanStatus,
                    status = status,
                    statusCode = statusCode, 
                    createdAccId = createdAccId,
                    signatureId = signatureId,
                    sigAccId = sigAccId,
                    approvalStatus = approvalStatus,
                    businessId = businessId,
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListDeclarations = res.results.ListDeclarations

                }));
                //return Ok(
                //    new Response(res.results.ListDeclarations)
                //    );
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        #endregion

        #region
        [HttpPost]
        [Route("Security")]
        public async Task<IHttpActionResult> Security(SecurityCode data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "personal/security";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Security));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("AddSignature")]
        public async Task<IHttpActionResult> AddSignature()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = JsonConvert.DeserializeObject<HYS>(httpRequest["jsonData"]);
                jsonData.accountId = (int)AccountSession.AccountID;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "agency/addsignature";
                var res = await DataService.PostAsyncWithFile<Rootobject<dynamic>>(url, JsonConvert.SerializeObject(jsonData), httpRequest.Files, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.OutputCommonSegment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }


        [HttpPost]
        [Route("GetEdiToSign")]
        public async Task<IHttpActionResult> GetEdiToSign(Declaration declaration)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "signature/getEdiToSign";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, declaration);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.code, res.message, res.results.EDI_String));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("GetSignatureExport")]
        public async Task<IHttpActionResult> GetSignatureExport(Declaration data)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/getSignatureExport";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    dclId = data.dclId
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ExportDeclaration));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("getSignatureAttachment")]
        public async Task<IHttpActionResult> getSignatureAttachment(Declaration data)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/getSignatureAttachment";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    dclId = data.dclId
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Attachment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
         
        [HttpPost]
        [Route("SendSignedData")]
        public async Task<IHttpActionResult> SendSignedData(SignedData2 signedData)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "signature/sendSignedData";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, signedData);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        #endregion

        #region Danh sách tờ khai xuất khẩu
        [HttpGet]
        [Route("SearchEDADeclaration")]
        public async Task<IHttpActionResult> SearchEDADeclaration(long accountId = 0, int type = 0, int? dclId = null,
            string cstOffice = "", string dclNo = "", string startCreatedDate = "", string endCreatedDate = "",
           string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0,
           string statusCode = "", int page = 1, int count = 10, string houseAwbNo = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exDeclaration/search";
                var data = new
                {
                    accountId = accountId,
                    page = page,
                    count = count,
                    type = type,
                    endCreatedDate = endCreatedDate,
                    dclId = dclId,
                    cstOffice = cstOffice,
                    dclNo = dclNo,
                    startCreatedDate = startCreatedDate,
                    dclKindCd = dclKindCd,
                    insClsCd = insClsCd,
                    clearanStatus = clearanStatus,
                    status = status,
                    statusCode = statusCode,
                    houseAwbNo = houseAwbNo
                };
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListDeclarations = res.results.ListDeclarations
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region Duyệt chứng từ trình ký

        [HttpPost]
        [Route("SearchAMA")]
        public async Task<IHttpActionResult> SearchAMA(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "amendedTaxInfomation/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                { 
                    startCreatedDate = data.startCreatedDate,
                    endCreatedDate = data.endCreatedDate, 
                    status = data.status,
                    sigAccId = data.sigAccId,

                    page = data.page,
                    count = data.count,
                    accountId = data.accountId,
                    approvalStatus = data.approvalStatus,
                    businessId = data.businessId

                }, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new
                {
                    ListAmendedTaxInfomation = res.results.ListAmendedTaxInfomation,
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
        [Route("SearchAttachment")]
        public async Task<IHttpActionResult> SearchAttachment(int? status = null, long? sigAccId = null, string startDate = "", string endDate = "", int page = 0, int count = 100)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "attachment/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                { 
                    startCreatedDate = startDate,
                    endCreatedDate = endDate,
                    sigAccId = sigAccId,
                    status = status,

                    page = page,
                    count = count
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new {
                    ListAttachment = res.results.ListAttachment,
                    Total = res.results.Total
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        #endregion

        #region Danh sách tờ khai trình ký
        [HttpPost]
        [Route("getListAMASign")]
        public async Task<IHttpActionResult> getListAMASign(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "amendedTaxInfomation/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    startCreatedDate = data.startCreatedDate,
                    endCreatedDate = data.endCreatedDate,
                    status = data.status,
                    sigAccId = data.sigAccId

                }, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new
                {
                    ListAmendedTaxInfomation = res.results.ListAmendedTaxInfomation,
                    Total = res.results.Total
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region Scanner Center
        [HttpPost]
        [Route("ScannerCreateAcc")]
        public async Task<IHttpActionResult> ScannerCreateAcc(Agency data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "express-company";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                var mailController = new MailVerifyController();
                var info = res.results.Business;
                await mailController.GetOTP(data.email, data.email, Convert.ToInt32(info.accountId));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListDictionary")]
        public async Task<IHttpActionResult> GetListDictionary(string code)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "dictionary?code=" + code;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Dictionaries));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListTransactions")]
        public async Task<IHttpActionResult> GetListTransactions(string businessId, string fromScanDateTime, string toScanDateTime, int? scanStatus, int? payStatus, int? verifyStatus, string verifyCode, string xRayName, string scanName, string lineIn, string lineOut, int firstResult = 0, int maxResult = 10)
        {
            try
            {
                fromScanDateTime = fromScanDateTime != null && fromScanDateTime != "" ? DateTime.Parse(fromScanDateTime).ToString("dd-MM-yyyy HH:mm:ss") : null;
                toScanDateTime = toScanDateTime != null && toScanDateTime != "" ? DateTime.Parse(toScanDateTime).ToString("dd-MM-yyyy HH:mm:ss") : null;

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "transactions?businessId=" + businessId;

                var uriBuilder = new UriBuilder(url);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                if (!String.IsNullOrEmpty(fromScanDateTime)) query["fromScanDateTime"] = fromScanDateTime;
                if (!String.IsNullOrEmpty(toScanDateTime)) query["toScanDateTime"] = toScanDateTime;
                query["scanStatus"] = scanStatus.ToString();
                if (payStatus != null) query["payStatus"] = payStatus.ToString();
                if (verifyStatus != null) query["verifyStatus"] = verifyStatus.ToString();
                if (!String.IsNullOrEmpty(verifyCode)) query["verifyCode"] = verifyCode;
                if (!String.IsNullOrEmpty(xRayName)) query["xRayName"] = xRayName;
                if (!String.IsNullOrEmpty(scanName)) query["scanName"] = scanName;
                if (!String.IsNullOrEmpty(lineIn)) query["lineIn"] = lineIn;
                if (!String.IsNullOrEmpty(lineOut)) query["lineOut"] = lineOut;
                query["firstResult"] = firstResult.ToString();
                query["maxResult"] = maxResult.ToString();

                uriBuilder.Query = query.ToString();
                url = uriBuilder.ToString();

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QueryResultModel));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UploadEDI")]
        public async Task<IHttpActionResult> UploadEDI()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = JsonConvert.DeserializeObject<ScanProduct>(httpRequest["jsonData"]);  
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "declaration/uploadEDI";
                var res = await DataService.PostAsyncWithFile<Rootobject<dynamic>>(url, JsonConvert.SerializeObject(jsonData), "transaction", httpRequest.Files, "fileAttach", true); 
                if (res.code < 0)
                { 
                    return Ok(new Response(res.code, res.message));
                } 
                return Ok(new Response(new
                {
                    Transaction = res.results.Transaction,
                    Consignments = res.results.Consignments
                })); 
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra"));
        }

        [HttpPost]
        [Route("SubmitXLS")]
        public async Task<IHttpActionResult> SubmitXLS()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = JsonConvert.DeserializeObject<ScanProduct>(httpRequest["jsonData"]);
                var fileAttach = httpRequest["fileAttachXLS"]; 

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "declaration/submitXLS";
                var res = await Hafintech.API.GetData.GetData.PostAsyncXLS<Rootobject<dynamic>>(url, fileAttach, JsonConvert.SerializeObject(jsonData));
                if (res.code < 0)
                {
                    return Ok(new Response(res.code, res.message, res.results));
                }
                return Ok(new Response(new
                {
                    Transaction = res.results.Transaction,
                    Consignments = res.results.Consignments
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra"));
        }

        [HttpPost]
        [Route("UploadExcel")]
        public async Task<IHttpActionResult> UploadExcel()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "declaration/uploadXLS";

                var res = await Hafintech.API.GetData.GetData.PostAsyncWithFileAccount<Rootobject<dynamic>>(url, AccountSession.AccountID.ToString(), httpRequest.Files, true);
                if (res.code < 0)
                {
                    return Ok(new Response(res.code, res.message));
                }
                return Ok(new Response(res.results.Transaction));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra"));
        }

        [HttpGet]
        [Route("RemoveScan")]
        public async Task<IHttpActionResult> RemoveScan(string transId)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "transaction/cancel?transId=" + transId;

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Transaction));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("getListExportToScanner")]
        public async Task<IHttpActionResult> getListExportToScanner(ScanDecla data)
        {
            try
            {
                //data.accountId = AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/getListExportToScanner";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ListDeclarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("getListImportToScanner")]
        public async Task<IHttpActionResult> getListImportToScanner(ScanDecla data)
        {
            try
            {
                //data.accountId = AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/getListToScanner";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ListDeclarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("DeclaSendToScanner")]
        public async Task<IHttpActionResult> DeclaSendToScanner(ScanProduct data)
        {
            try
            {  
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/sendToScanner";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetInfoTrans")]
        public async Task<IHttpActionResult> GetInfoTrans(string transId)
        {
            try
            { 

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "transaction?transId=" + transId;

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QueryResultModel));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListPaymentInfo")]
        public async Task<IHttpActionResult> GetListPaymentInfo(string businessId, string verifyCode, string invDetailsCode, string invSummaryCode, string fromScanDateTime, string toScanDateTime, int? payStatus, int firstResult = 0, int maxResult = 10)
        {
            try
            {
                fromScanDateTime = fromScanDateTime != null && fromScanDateTime != "" ? DateTime.Parse(fromScanDateTime).ToString("dd-MM-yyyy HH:mm:ss") : null;
                toScanDateTime = toScanDateTime != null && toScanDateTime != "" ? DateTime.Parse(toScanDateTime).ToString("dd-MM-yyyy HH:mm:ss") : null;

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "payment/invoice-details?businessId=" + businessId;

                var uriBuilder = new UriBuilder(url);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                if (!String.IsNullOrEmpty(verifyCode)) query["verifyCode"] = verifyCode;
                if (!String.IsNullOrEmpty(invDetailsCode)) query["invDetailsCode"] = invDetailsCode;
                if (!String.IsNullOrEmpty(invSummaryCode)) query["invSummaryCode"] = invSummaryCode;
                if (!String.IsNullOrEmpty(fromScanDateTime)) query["fromScanDateTime"] = fromScanDateTime;
                if (!String.IsNullOrEmpty(toScanDateTime)) query["toScanDateTime"] = toScanDateTime; 
                if (payStatus != null) query["payStatus"] = payStatus.ToString(); 
                query["firstResult"] = firstResult.ToString();
                query["maxResult"] = maxResult.ToString();

                uriBuilder.Query = query.ToString();
                url = uriBuilder.ToString();

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QueryResultModel));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetPayDetail")]
        public async Task<IHttpActionResult> GetPayDetail(string invDetailsId)
        {
            try
            {  
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "payment/invoice-price?invDetailsId=" + invDetailsId;

                //var uriBuilder = new UriBuilder(url);
                //var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                //if (!String.IsNullOrEmpty(invDetailsId)) query["invDetailsId"] = invDetailsId; 
                //uriBuilder.Query = query.ToString();
                //url = uriBuilder.ToString();

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.INVOICE_PRICE));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetDetailTransDecla")]
        public async Task<IHttpActionResult> GetDetailTransDecla(string transId, string barCode, long firstResult = 0)
        {
            try
            {

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "transaction-declarations?transId=" + transId + "&firstResult=" + firstResult + "&maxResult=10";

                var uriBuilder = new UriBuilder(url);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query); 
                if (!String.IsNullOrEmpty(barCode)) query["barCode"] = barCode;  
                uriBuilder.Query = query.ToString();
                url = uriBuilder.ToString();

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QueryResultModel));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("ViewDeclaScan")]
        public async Task<IHttpActionResult> ViewDeclaScan(ScanDecla data)
        {
            try
            { 
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "declaration/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new {
                    dclNo = data.dclNo
                });
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetWeighInfoTran")]
        public async Task<IHttpActionResult> GetWeighInfoTran(string transId)
        {
            try
            {

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "weigh-info-by-transaction?transId=" + transId;

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.WeighInfo));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListInvoice")]
        public async Task<IHttpActionResult> GetListInvoice(string fromCreatedDate, string toCreatedDate, int? payStatus, string businessId, string invTransCode, int firstResult = 0, int maxResult = 10)
        {
            try
            {
                fromCreatedDate = fromCreatedDate != null && fromCreatedDate != "" ? DateTime.Parse(fromCreatedDate).ToString("dd-MM-yyyy HH:mm:ss") : null;
                toCreatedDate = toCreatedDate != null && toCreatedDate != "" ? DateTime.Parse(toCreatedDate).ToString("dd-MM-yyyy HH:mm:ss") : null;

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "payment/invoice-summary-agency?businessId=" + businessId;

                var uriBuilder = new UriBuilder(url);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);

                if (!String.IsNullOrEmpty(fromCreatedDate)) query["fromCreatedDate"] = fromCreatedDate;
                if (!String.IsNullOrEmpty(toCreatedDate)) query["toCreatedDate"] = toCreatedDate; 
                if (payStatus != null) query["payStatus"] = payStatus.ToString();
                if (!String.IsNullOrEmpty(invTransCode)) query["invTransCode"] = invTransCode;
                query["firstResult"] = firstResult.ToString();
                query["maxResult"] = maxResult.ToString();

                uriBuilder.Query = query.ToString();
                url = uriBuilder.ToString();

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QueryResultModel));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        [HttpGet]
        [Route("GetInvoiceDetailContent")]
        public async Task<IHttpActionResult> GetInvoiceDetailContent(string invsId)
        {
            try
            {
                 

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "payment/invoice-price-by-sumid?invsId=" + invsId;

                var uriBuilder = new UriBuilder(url);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);
                 
                uriBuilder.Query = query.ToString();
                url = uriBuilder.ToString();

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QueryResultModel));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }


        [HttpPost]
        [Route("UpdateScanNoData")]
        public async Task<IHttpActionResult> UpdateScanNoData()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var consigments = httpRequest["consigments"];
                var transaction = httpRequest["transaction"];
                var title = "consigments|transaction";

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "transaction/update-nodata";
                var res = await Hafintech.API.GetData.GetData.PostAsync<Rootobject<dynamic>>(url, new {
                    consigments = consigments,
                    transaction = transaction
                }, title);

                if (res.code < 0)
                {
                    return Ok(new Response(res.code, res.message));
                }
                return Ok(new Response(new
                {
                    Transaction = res.results.Transaction,
                    Consignments = res.results.Consignments
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra"));
        }

        [HttpPost]
        [Route("UpdateScan")]
        public async Task<IHttpActionResult> UpdateScan()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var verifyCode = httpRequest["verifyCode"];
                var transaction = httpRequest["transaction"];
                var title = "verifyCode|transaction";

                var url = ConfigurationManager.AppSettings["ScannerURL"] + "transaction/update";
                var res = await Hafintech.API.GetData.GetData.PostAsync<Rootobject<dynamic>>(url, new
                {
                    verifyCode = verifyCode,
                    transaction = transaction
                }, title);

                if (res.code < 0)
                {
                    return Ok(new Response(res.code, res.message,res.results));
                }
                return Ok(new Response(new
                {
                    Transaction = res.results.Transaction,
                    Consignments = res.results.Consignments
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra"));
        }

        [HttpGet]
        [Route("GetConsignments")]
        public async Task<IHttpActionResult> GetConsignments(string transId)
        {
            try
            { 
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "consignments?transId=" + transId;

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.QueryResultModel));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetConsignStatistic")]
        public async Task<IHttpActionResult> GetConsignStatistic(string transId, string barCode)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["ScannerURL"] + "transaction/consignment-statistics?transId=" + transId + "&barCode=" + barCode;

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.TransactionStatistics));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region HYS
        [HttpPost]
        [Route("UpdateHYS")]
        public async Task<IHttpActionResult> UpdateHYS()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = JsonConvert.DeserializeObject<HYS>(httpRequest["jsonData"]);
                //jsonData.accountId = (int)AccountSession.AccountID;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["APIURL"] + "attachment/update";
                var res = await DataService.PostAsyncWithFile<Rootobject<dynamic>>(url, JsonConvert.SerializeObject(jsonData), httpRequest.Files, true);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Attachment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("deleteHYS")]
        public async Task<IHttpActionResult> deleteHYS(long id)
        {
            try
            {  
                var url = ConfigurationManager.AppSettings["APIURL"] + "attachment/delete";

                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { id = id});

                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.code));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region Phản hồi duyệt trình ký
        [HttpPost]
        [Route("feedBack")]
        public async Task<IHttpActionResult> feedBack(Comment data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "comment/create";

                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new {
                    dclId = data.dclId,
                    status = data.status,
                    content = data.content,
                    fromAccId = AccountSession.AccountID,
                    toAccId = data.toAccId,
                });
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Comment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("getListFeedBack")]
        public async Task<IHttpActionResult> getListFeedBack(string dclId, string fromAccId = "", string toAccId = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "comment/getList";

                var uriBuilder = new UriBuilder(url);
                var query = HttpUtility.ParseQueryString(uriBuilder.Query);

                if (!String.IsNullOrEmpty(dclId)) query["dclId"] = dclId;
                if (!String.IsNullOrEmpty(fromAccId)) query["fromAccId"] = fromAccId;
                if (!String.IsNullOrEmpty(fromAccId)) query["toAccId"] = toAccId; 

                uriBuilder.Query = query.ToString();
                url = uriBuilder.ToString();

                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Comment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("CreateComment")]
        public async Task<IHttpActionResult> CreateComment(Comment data)
        {
            try
            {
                data.fromAccId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "comment/create";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Comment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }
        [HttpPost]
        [Route("UpdateComment")]
        public async Task<IHttpActionResult> UpdateComment(Comment data)
        {
            try
            {
                data.fromAccId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "comment/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Comment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetListComment")]
        public async Task<IHttpActionResult> GetListComment()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "comment/getList";
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Comment));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region AMA
        [HttpPost]
        [Route("DeleteAMA")]
        public async Task<IHttpActionResult> DeleteAMA(AMA data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "amendedTaxInfomation/delete";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { id = data.id });
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
        [Route("SubmitAMA")]
        public async Task<IHttpActionResult> SubmitAMA(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/submitBySigAccId";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url,
                    new { dclId = data.declarationId, status = data.status, dclNo = data.dclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.AmendedTaxInfomation));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region Import tờ khai
        [HttpGet]
        [Route("SearchImportFile")]
        public async Task<IHttpActionResult> SearchImportFile(string startCreatedDate = "", string endCreatedDate = "", string houseAwbNo = "", int? syncStatus = null, int? status = null, int? page = 0, int? count = 10)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/search";

                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new {
                    status = status,
                    syncStatus = syncStatus,
                    startCreatedDate = startCreatedDate,
                    endCreatedDate = endCreatedDate,
                    houseAwbNo = houseAwbNo, 
                    page = page,
                    count = count,
                    accountId = AccountSession.AccountID
                });

                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new {
                    Total = res.results.Total,
                    ListMic = res.results.ListMic, 
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("ImportExcelDecla")]
        public async Task<IHttpActionResult> ImportExcelDecla()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/uploadXLS";

                var res = await Hafintech.API.GetData.GetData.PostAsyncWithFileAccount<Rootobject<dynamic>>(url, AccountSession.AccountID.ToString(), httpRequest.Files);

                if (res.code < 0)
                {
                    return Ok(new Response(res.code, res.message));
                }
                return Ok(new Response(res.results.Mic));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra"));
        }

        [HttpPost]
        [Route("SubmitImportXLS")]
        public async Task<IHttpActionResult> SubmitImportXLS()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var fileRef = httpRequest["fileRef"];

                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/submitXLS";

                var statusCode = -1;
                string resultContent = "";
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                NLogManager.LogMessage(string.Format("Đầu vào: {0}, accountId: {1}, fileRef: {2}", url, AccountSession.AccountID, fileRef)); 
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        using (var content =
                         new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                        {
                            content.Add(new StringContent(fileRef), "fileRef");
                            content.Add(new StringContent(AccountSession.AccountID.ToString()), "accountId");
                            using (
                               var result = await client.PostAsync(url, content, cts.Token).ConfigureAwait(false))
                            {
                                statusCode = (int)result.StatusCode;
                                resultContent = await result.Content.ReadAsStringAsync();
                            }
                        }
                    }
                }

                var res = JsonConvert.DeserializeObject<ResultImportFile>(resultContent);

                if (res.code >= 0)
                {
                    return Ok(new Response(res.results));
                }

                return Ok(new Response(res.code, res.message, res.results));

                //if (statusCode == 200)
                //{
                //    Newtonsoft.Json.Linq.JObject json = Newtonsoft.Json.Linq.JObject.Parse(resultContent);

                //    return Ok(new Response(json));
                //}
                //return Ok(new Response(-1, "Có lỗi xảy ra, mời bạn thử lại", resultContent));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra"));
        }
         
        [HttpPost]
        [Route("GetEdiToSignImport")]
        public async Task<IHttpActionResult> GetEdiToSignImport(long? Id = null, int? signIdd = 0)
        {
            try
            {  
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/getEdiToSign";
                if(signIdd == 1)
                {
                    url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/getEdiToSignIID";
                }

                var statusCode = -1;
                string mess = "";
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                using (var cts = new System.Threading.CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào: {0}: {1}", url, Id));

                        var content = new StringContent(Id.ToString(), System.Text.Encoding.UTF8, "application/json");
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");

                        var result = await client.PostAsync(url, content, cts.Token).ConfigureAwait(false);

                        mess = await result.Content.ReadAsStringAsync();
                        statusCode = (int)result.StatusCode;

                        NLogManager.LogMessage("Đầu ra: " + statusCode + " mess: " + mess);
                    }
                }

                var res = JsonConvert.DeserializeObject<ResultImportFile>(mess);

                if (res.code >= 0)
                {
                    return Ok(new Response(res.results));
                }

                return Ok(new Response(res.code, res.message, res.results)); 
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response(ex.ToString()));
            } 
        }

        [HttpPost]
        [Route("SendSignedDataImport")]
        public async Task<IHttpActionResult> SendSignedDataImport(SignedData2 signedData, int? signIdd = 0)
        {
            try
            { 
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/sendSignedData";
                if(signIdd == 1)
                    url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/sendSignedDataIID";

                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, signedData);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("deleteImport")]
        public async Task<IHttpActionResult> deleteImport(long Id = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/delete";

                var statusCode = -1;
                string mess = "";
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                using (var cts = new System.Threading.CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào: {0} {1}", url, Id));

                        var content = new StringContent(Id.ToString(), System.Text.Encoding.UTF8, "application/json");
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");

                        var result = await client.PostAsync(url, content, cts.Token).ConfigureAwait(false);

                        mess = await result.Content.ReadAsStringAsync();
                        statusCode = (int)result.StatusCode;

                        NLogManager.LogMessage("Đầu ra: " + statusCode + " mess: " + mess);
                    }
                }

                var res = JsonConvert.DeserializeObject<ResultImportFile>(mess);

                if (res.code >= 0)
                {  
                    return Ok(new Response(res.results));
                }

                return Ok(new Response(res.code, res.message, res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("SyncToNevs")]
        public async Task<IHttpActionResult> SyncToNevs(long Id = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "mic/syncToNevs";

                var statusCode = -1;
                string mess = "";
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                using (var cts = new System.Threading.CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào: {0} {1}", url, Id));

                        var content = new StringContent(Id.ToString(), System.Text.Encoding.UTF8, "application/json");
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");

                        var result = await client.PostAsync(url, content, cts.Token).ConfigureAwait(false);

                        mess = await result.Content.ReadAsStringAsync();
                        statusCode = (int)result.StatusCode;

                        NLogManager.LogMessage("Đầu ra: " + statusCode + " mess: " + mess);
                    }
                }

                var res = JsonConvert.DeserializeObject<ResultImportFile>(mess);

                if (res.code >= 0)
                {
                    return Ok(new Response(res.results));
                }

                return Ok(new Response(res.code, res.message, res.results));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
        #endregion

        #region System Report Hệ thống báo cáo

        [HttpPost]
        [Route("searchMicMecReport")]
        public async Task<IHttpActionResult> searchMicMecReport(ReportSystem data)
        {
            try
            { 
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/searchMicMecReport";

                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new {
                    accountId = AccountSession.AccountID,
                    dclType =  !string.IsNullOrEmpty(data.dclType) ? data.dclType : null,
                    cstDepartment = !string.IsNullOrEmpty(data.cstDepartment) ? data.cstDepartment : null,
                    cstOffice = !string.IsNullOrEmpty(data.cstOffice) ? data.cstOffice : null,
                    dclNo = !string.IsNullOrEmpty(data.dclNo) ? data.dclNo : null,
                    insClsCd = data.insClsCd != null ? data.insClsCd : null,
                    clearanStatus = data.clearanStatus != null ? data.clearanStatus : null,
                    fromDate = !string.IsNullOrEmpty(data.fromDate) ? data.fromDate : null,
                    toDate = !string.IsNullOrEmpty(data.toDate) ? data.toDate : null,
                    houseAwbNo = !string.IsNullOrEmpty(data.houseAwbNo) ? data.houseAwbNo : null,
                    status = data.status != null ? data.status : null,
                    statusCode = !string.IsNullOrEmpty(data.statusCode) ? data.statusCode : null,
                    dclKindCd = !string.IsNullOrEmpty(data.dclKindCd) ? data.dclKindCd : null,
                    customerType = data.customerType != null ? data.customerType : null,
                    page = data.page != null ? data.page : 0,
                    count = data.count != null ? data.count : 10,
                });
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(new {
                    ListResult = res.results.listResult,
                    Total = res.results.totalResult,
                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        #endregion
    }
}
