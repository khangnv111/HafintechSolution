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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/ola/createOLA";
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
                        data.lsCargoNo[i].dFstStkBndWrh = !string.IsNullOrWhiteSpace(data.lsCargoNo[i].dFstStkBndWrh) ? DateTime.Parse(data.lsCargoNo[i].dFstStkBndWrh.ToString()).ToString("ddMMyyyy") : null;
                    }
                data.accountId = AccountSession.AccountID.ToString();
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/ola/updateOLA";
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
        public async Task<IHttpActionResult> GetOLADetail(int olaId = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/ola/viewOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { btDclId = olaId });
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
        public async Task<IHttpActionResult> SearchOLA(string meansOfTrsCd = "", int? btDclId = null,
            string cstOffice = "", string transPurposeCd = "", string startCreatedDate = "", string endCreatedDate = "",
           string transCtrctNo = "", string transType = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/ola/searchOLA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = (int)AccountSession.AccountID,
                    meansOfTrsCd = meansOfTrsCd,
                    endCreatedDate = endCreatedDate,
                    btDclId = btDclId,
                    cstOffice = cstOffice,
                    transPurposeCd = transPurposeCd,
                    startCreatedDate = startCreatedDate,
                    transCtrctNo = transCtrctNo,
                    transType = transType,
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ListOla));
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
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/ola/deleteOLA";
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
        [Route("Submit")]
        public async Task<IHttpActionResult> Submit(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationOLA/ola/submitOLA";
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
    }
}