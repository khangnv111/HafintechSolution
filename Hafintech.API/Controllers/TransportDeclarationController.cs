using App.Utils;
using App.Utils.GetData;
using Hafintech.API.Models;
using System;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("TransportDeclaration")]
    public class TransportDeclarationController : ApiController
    {
        [HttpPost]
        [Route("CreateOLA")]
        public async Task<IHttpActionResult> CreateOLA(OLA data)
        {
            try
            {
                data.esSdateOfTrans = !string.IsNullOrWhiteSpace(data.esSdateOfTrans) ? DateTime.Parse(data.esSdateOfTrans).ToString("ddMMyyyy") : null;
                data.esFdateOfTrans = !string.IsNullOrWhiteSpace(data.esFdateOfTrans) ? DateTime.Parse(data.esFdateOfTrans).ToString("ddMMyyyy") : null;
                data.dateOfTrsCtrct = !string.IsNullOrWhiteSpace(data.dateOfTrsCtrct) ? DateTime.Parse(data.dateOfTrsCtrct).ToString("ddMMyyyy") : null;
                data.expDateOfTrans = !string.IsNullOrWhiteSpace(data.expDateOfTrans) ? DateTime.Parse(data.expDateOfTrans.ToString()).ToString("ddMMyyyy") : null;
                if (data.lsCargoNo != null && data.lsCargoNo.Length > 0)
                    for (var i = 0; i < data.lsCargoNo.Length; i++)
                    {
                        if (string.IsNullOrWhiteSpace(data.lsCargoNo[i].cargoNo)) continue;
                        data.lsCargoNo[i].arrDateOfCargo = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].arrDateOfCargo) ? DateTime.Parse(data.lsCargoNo[i].arrDateOfCargo.ToString()).ToString("ddMMyyyy") : null;
                        data.lsCargoNo[i].issueDateOfBl = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].issueDateOfBl) ? DateTime.Parse(data.lsCargoNo[i].issueDateOfBl.ToString()).ToString("ddMMyyyy") : null;
                        data.lsCargoNo[i].expDatePermit = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].expDatePermit) ? DateTime.Parse(data.lsCargoNo[i].expDatePermit.ToString()).ToString("ddMMyyyy") : null;
                        data.lsCargoNo[i].permitDate = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].permitDate) ? DateTime.Parse(data.lsCargoNo[i].permitDate.ToString()).ToString("ddMMyyyy") : null;
                    }
                data.accountId = AccountSession.AccountID.ToString();
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/api/ola/createOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Ola));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateOLA")]
        public async Task<IHttpActionResult> UpdateOLA(OLA data)
        {
            try
            {
                //data.esSdateOfTrans = data.esSdateOfTrans != null ? DateTime.Parse(data.esSdateOfTrans).ToString("ddMMyyyy") : ""; //!string.IsNullOrWhiteSpace(data.esSdateOfTrans) ? DateTime.Parse(data.esSdateOfTrans).ToString("ddMMyyyy") : null;
                //data.esFdateOfTrans = data.esFdateOfTrans != null ? DateTime.Parse(data.esFdateOfTrans).ToString("ddMMyyyy") : "";//!string.IsNullOrWhiteSpace(data.esFdateOfTrans) ? DateTime.Parse(data.esFdateOfTrans).ToString("ddMMyyyy") : null;
                //data.dateOfTrsCtrct = data.dateOfTrsCtrct != null ? DateTime.Parse(data.dateOfTrsCtrct).ToString("ddMMyyyy") : "";//!string.IsNullOrWhiteSpace(data.dateOfTrsCtrct) ? DateTime.Parse(data.dateOfTrsCtrct).ToString("ddMMyyyy") : null;
                //data.expDateOfTrans = data.expDateOfTrans != null ? DateTime.Parse(data.expDateOfTrans).ToString("ddMMyyyy") : "";//!string.IsNullOrWhiteSpace(data.expDateOfTrans) ? DateTime.Parse(data.expDateOfTrans.ToString()).ToString("ddMMyyyy") : null;
                data.esSdateOfTrans = !string.IsNullOrWhiteSpace(data.esSdateOfTrans) ? DateTime.Parse(data.esSdateOfTrans).ToString("ddMMyyyy") : "";
                data.esFdateOfTrans = !string.IsNullOrWhiteSpace(data.esFdateOfTrans) ? DateTime.Parse(data.esFdateOfTrans).ToString("ddMMyyyy") : "";
                data.dateOfTrsCtrct = !string.IsNullOrWhiteSpace(data.dateOfTrsCtrct) ? DateTime.Parse(data.dateOfTrsCtrct).ToString("ddMMyyyy") : "";
                data.expDateOfTrans = !string.IsNullOrWhiteSpace(data.expDateOfTrans) ? DateTime.Parse(data.expDateOfTrans.ToString()).ToString("ddMMyyyy") : "";
                if (data.lsCargoNo != null && data.lsCargoNo.Length > 0)
                    for (var i = 0; i < data.lsCargoNo.Length; i++)
                    {
                        if (string.IsNullOrWhiteSpace(data.lsCargoNo[i].cargoNo)) continue;
                        data.lsCargoNo[i].arrDateOfCargo = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].arrDateOfCargo) ? DateTime.Parse(data.lsCargoNo[i].arrDateOfCargo.ToString()).ToString("ddMMyyyy") : null;
                        data.lsCargoNo[i].issueDateOfBl = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].issueDateOfBl) ? DateTime.Parse(data.lsCargoNo[i].issueDateOfBl.ToString()).ToString("ddMMyyyy") : null;
                        data.lsCargoNo[i].expDatePermit = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].expDatePermit) ? DateTime.Parse(data.lsCargoNo[i].expDatePermit.ToString()).ToString("ddMMyyyy") : null;
                        data.lsCargoNo[i].permitDate = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].permitDate) ? DateTime.Parse(data.lsCargoNo[i].permitDate.ToString()).ToString("ddMMyyyy") : null;
                        data.lsCargoNo[i].dFstStkBndWrh = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].dFstStkBndWrh) ? DateTime.Parse(data.lsCargoNo[i].dFstStkBndWrh.ToString()).ToString("ddMMyyyy") : null;
                    }
                data.accountId = AccountSession.AccountID.ToString();
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/api/ola/updateOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Ola));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetOLADetail")]
        public async Task<IHttpActionResult> GetOLADetail(int olaId = 0, string no = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/api/ola/viewOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    btDclId = olaId,
                    btDclNo = no
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Ola));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchOLA")]
        public async Task<IHttpActionResult> SearchOLA(string meansOfTrsCd = "", int? btDclId = null, string btDclNo = "",
            string cstOffice = "", string transPurposeCd = "", string startCreatedDate = "", string endCreatedDate = "",
           string transCtrctNo = "", string transType = "", int page = 1, int count = 10, int accountId = 0)
        {
            try
            {
                var startDate = !string.IsNullOrWhiteSpace(startCreatedDate) ? DateTime.Parse(startCreatedDate).ToString("dd-MM-yyyy") : "";
                var endDate = !string.IsNullOrWhiteSpace(endCreatedDate) ? DateTime.Parse(endCreatedDate).ToString("dd-MM-yyyy") : "";
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/api/ola/searchOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = accountId,
                    meansOfTrsCd = meansOfTrsCd,
                    endCreatedDate = endDate,
                    btDclId = btDclId,
                    btDclNo = btDclNo,
                    cstOffice = cstOffice,
                    transPurposeCd = transPurposeCd,
                    startCreatedDate = startDate,
                    transCtrctNo = transCtrctNo,
                    transType = transType,
                    page = page,
                    count = count,
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListOla = res.results.ListOla

                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchSignatureOLA")]
        public async Task<IHttpActionResult> SearchSignatureOLA(int? accountId = null, int? btDclId = null,
            string cstOffice = "", string btDclNo = "", string startCreatedDate = "", string endCreatedDate = "",
           int? clearanceStatus = 0, int? status = 0,
           string statusCode = "", int page = 1, int count = 10, int? createdAccId = null, int signatureId = 0, int? sigAccId = null)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/api/ola/searchOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    page = page,
                    count = count,
                    accountId = accountId,
                    endCreatedDate = endCreatedDate,
                    btDclId = btDclId,
                    cstOffice = cstOffice,
                    btDclNo = btDclNo,
                    startCreatedDate = startCreatedDate,
                    clearanceStatus = clearanceStatus,
                    status = status,
                    statusCode = statusCode,
                    createdAccId = createdAccId,
                    signatureId = signatureId,
                    sigAccId = sigAccId,
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                //return Ok(new Response(res.results.ListOla));
                return Ok(new Response(new
                {
                    Total = res.results.Total,
                    ListOla = res.results.ListOla

                }));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }


        [HttpGet]
        [Route("DeleteOLA")]
        public async Task<IHttpActionResult> DeleteOLA(int btDclId = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/api/ola/deleteOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    btDclId = btDclId,
                    accountId = (int)AccountSession.AccountID
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
        [Route("SubmitOLA")]
        public async Task<IHttpActionResult> SubmitOLA(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/api/ola/submitOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url,
                    new { btDclId = data.btDclId, status = data.status, btDclNo = data.btDclNo, confirmOfDcl = data.confirmOfDcl });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Ola));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("CloneOLA")]
        public async Task<IHttpActionResult> CloneOLA(OLA data)
        {
            try
            {
                var url = "http://10.1.17.3:8090/MediationOLA/api/ola/clone";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    btDclId = data.btDclId
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Ola));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }


        [HttpPost]
        [Route("GetSignatureOla")]
        public async Task<IHttpActionResult> GetSignatureOla(string dclId)
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                //var file = httpRequest.Files[0];
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "declaration/getSignatureOla";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    dclId = dclId
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Ola));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

    }
}