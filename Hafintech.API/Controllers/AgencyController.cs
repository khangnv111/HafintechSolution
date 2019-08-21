using App.Utils;
using App.Utils.GetData;
using Hafintech.API.Models;
using Hafintech.API.Models.Agency;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("Agency")]
    public class AgencyController : ApiController
    {
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
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "auth/login";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Accounts));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
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
        [Route("CreateDeclaration")]
        public async Task<IHttpActionResult> CreateDeclaration(Declaration data)
        {
            try
            {
                data.arrDateOfTrs = data.arrDateOfTrs != null ? DateTime.Parse(data.arrDateOfTrs).ToString("ddMMyyyy") : null;
                data.arrDateTrnLoc = data.arrDateTrnLoc != null ? DateTime.Parse(data.arrDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                data.dclPlannedDate = data.dclPlannedDate != null ? DateTime.Parse(data.dclPlannedDate).ToString("ddMMyyyy") : null;
                data.invDate = data.invDate != null ? DateTime.Parse(data.invDate).ToString("ddMMyyyy") : null;
                data.strDateTrnLoc = data.strDateTrnLoc != null ? DateTime.Parse(data.strDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                data.strDateTrs = data.strDateTrs != null ? DateTime.Parse(data.strDateTrs.ToString()).ToString("ddMMyyyy") : null;
                data.timeLimReExp = data.timeLimReExp != null ? DateTime.Parse(data.timeLimReExp.ToString()).ToString("ddMMyyyy") : null;
                if (data.lsTransInfo != null)
                    for (var i = 0; i < data.lsTransInfo.Length; i++)
                    {
                        data.lsTransInfo[i].arrDateOfTrs = data.lsTransInfo[i].arrDateOfTrs != null ? DateTime.Parse(data.lsTransInfo[i].arrDateOfTrs.ToString()).ToString("ddMMyyyy") : null;
                        data.lsTransInfo[i].arrDateTrnLoc = !string.IsNullOrWhiteSpace(data.lsTransInfo[i].arrDateTrnLoc) ? DateTime.Parse(data.lsTransInfo[i].arrDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                    }
                data.accountId = (int)AccountSession.AccountID;
                data.createdAccId = (int)AccountSession.AccountID;
                data.arrDate = !string.IsNullOrWhiteSpace(data.arrDate) ? DateTime.Parse(data.arrDate).ToString("MM/dd/yyyy") : null;
                data.permitWrhDate = !string.IsNullOrWhiteSpace(data.permitWrhDate) ? DateTime.Parse(data.permitWrhDate).ToString("MM/dd/yyyy") : null;
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/declaration/create";
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
                if (data.type == 2)
                {
                    data.arrDateOfTrs = !string.IsNullOrWhiteSpace(data.arrDateOfTrs) ? DateTime.Parse(data.arrDateOfTrs).ToString("ddMMyyyy") : null;
                    data.arrDateTrnLoc = data.arrDateTrnLoc != null ? DateTime.Parse(data.arrDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                    data.dclPlannedDate = !string.IsNullOrWhiteSpace(data.dclPlannedDate) && data.dclPlannedDate.Contains('-') ?
                        DateTime.Parse(data.dclPlannedDate).ToString("ddMMyyyy") : null;

                    data.invDate = !string.IsNullOrWhiteSpace(data.invDate) && data.invDate.Contains('-')
                        ? DateTime.Parse(data.invDate).ToString("ddMMyyyy") : null;
                    data.strDateTrnLoc = data.strDateTrnLoc != null ? DateTime.Parse(data.strDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                    data.strDateTrs = !string.IsNullOrWhiteSpace(data.strDateTrs) && data.strDateTrs.Contains('-')
                        ? DateTime.Parse(data.strDateTrs.ToString()).ToString("ddMMyyyy") : null;
                    data.timeLimReExp = !string.IsNullOrWhiteSpace(data.timeLimReExp) && data.timeLimReExp.Contains('-')
                        ? DateTime.Parse(data.timeLimReExp.ToString()).ToString("ddMMyyyy") : null;
                    if (data.lsTransInfo != null)
                        for (var i = 0; i < data.lsTransInfo.Length; i++)
                        {
                            data.lsTransInfo[i].arrDateOfTrs = data.lsTransInfo[i].arrDateOfTrs != null ? DateTime.Parse(data.lsTransInfo[i].arrDateOfTrs.ToString()).ToString("ddMMyyyy") : null;
                            data.lsTransInfo[i].arrDateTrnLoc = !string.IsNullOrWhiteSpace(data.lsTransInfo[i].arrDateTrnLoc) ? DateTime.Parse(data.lsTransInfo[i].arrDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                        }
                }
                data.accountId = (int)AccountSession.AccountID;
                data.createdAccId = (int)AccountSession.AccountID;
                data.arrDate = !string.IsNullOrWhiteSpace(data.arrDate) ? DateTime.Parse(data.arrDate).ToString("MM/dd/yyyy") : null;
                data.permitWrhDate = !string.IsNullOrWhiteSpace(data.permitWrhDate) ? DateTime.Parse(data.permitWrhDate).ToString("MM/dd/yyyy") : null;
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/declaration/update";
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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/declaration/submitBySigAccId";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url,
                    new { dclId = data.declarationId, status = data.status, sigAccId = (int)AccountSession.AccountID, dclNo = data.dclNo });
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

        [HttpPost]
        [Route("CreateSignature")]
        public async Task<IHttpActionResult> CreateSignature()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var jsonData = JsonConvert.DeserializeObject<Signature>(httpRequest["jsonData"]);
                jsonData.accountId = (int)AccountSession.AccountID;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/signature/create";
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
        public async Task<IHttpActionResult> GetSignature()
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/signature/getList?accountId=" + AccountSession.AccountID;
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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/declaration/getSignature";
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
        [Route("UpdateSignature")]
        public async Task<IHttpActionResult> UpdateSignature(Signature data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/signature/update";
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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/signature/setDefault";
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
           string cstOffice = "", string dclNo = "", string startCreatedDate = "", string endCreatedDate = "",
           string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0,
           int page = 1, int count = 10, int signatureId = 0, int? createdAccId = null, int? acceptAccId = null)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/declaration/search";
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
                    createdAccId = createdAccId,
                    signatureId = signatureId,
                    acceptAccId = acceptAccId
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

        [HttpPost]
        [Route("CreateComment")]
        public async Task<IHttpActionResult> CreateComment(Comment data)
        {
            try
            {
                data.fromAccId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/comment/create";
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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/comment/update";
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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/comment/getList";
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
        [Route("Security")]
        public async Task<IHttpActionResult> Security(SecurityCode data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/personal/security";
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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/agency/addsignature";
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
       
    }
}
