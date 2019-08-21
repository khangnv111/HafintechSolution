﻿using App.Utils;
using App.Utils.GetData;
using Hafintech.API.Models;
using System;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [Authorize]
    [RoutePrefix("Export")]
    public class ExportController : ApiController
    {
        [HttpPost]
        [Route("CreateEDA")]
        public async Task<IHttpActionResult> CreateDeclaration(EDA data)
        {
            try
            {
                data.arrDateOfTrs = data.arrDateOfTrs != null ? DateTime.Parse(data.arrDateOfTrs).ToString("ddMMyyyy") : null;
                data.arrDateTrnLoc = data.arrDateTrnLoc != null ? DateTime.Parse(data.arrDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                data.dclPlannedDate = data.dclPlannedDate != null ? DateTime.Parse(data.dclPlannedDate).ToString("ddMMyyyy") : null;
                data.deptPlanDate = data.deptPlanDate != null ? DateTime.Parse(data.deptPlanDate).ToString("ddMMyyyy") : null;
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
                var url = ConfigurationManager.AppSettings["APIURL"] + "exDeclaration/create";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ExportDeclaration));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateEDA")]
        public async Task<IHttpActionResult> UpdateEDA(EDA data)
        {
            try
            {
                if (data.type == 4)
                {
                    data.arrDateOfTrs = !string.IsNullOrWhiteSpace(data.arrDateOfTrs) ? DateTime.Parse(data.arrDateOfTrs).ToString("ddMMyyyy") : null;
                    data.arrDateTrnLoc = data.arrDateTrnLoc != null ? DateTime.Parse(data.arrDateTrnLoc.ToString()).ToString("ddMMyyyy") : null;
                    data.dclPlannedDate = !string.IsNullOrWhiteSpace(data.dclPlannedDate) && data.dclPlannedDate.Contains('-') ?
                        DateTime.Parse(data.dclPlannedDate).ToString("ddMMyyyy") : null;
                    data.deptPlanDate = !string.IsNullOrWhiteSpace(data.deptPlanDate) && data.deptPlanDate.Contains('-')
                        ? DateTime.Parse(data.deptPlanDate).ToString("ddMMyyyy") : null;
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
                var url = ConfigurationManager.AppSettings["APIURL"] + "exDeclaration/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ExportDeclaration));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("InsertEDAProduct")]
        public async Task<IHttpActionResult> InsertEDAProduct(EDAProductRequest data)
        {
            try
            {
                data.accountId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exProduct/create";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ListExportProduct));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateEDAProduct")]
        public async Task<IHttpActionResult> UpdateEDAProduct(EDAProductRequest data)
        {
            try
            {
                data.accountId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exProduct/update";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ExportDeclaration));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("SearchEDAProduct")]
        public async Task<IHttpActionResult> SearchEDAProduct(int declarationID = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exProduct/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { declarationId = declarationID });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ExportProduct));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetEDAProductDetail")]
        public async Task<IHttpActionResult> GetEDAProductDetail(int productid = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exProduct/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { productId = productid });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ExportProduct));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetEDADetail")]
        public async Task<IHttpActionResult> GetEDADetail(int? dclId = null)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exDeclaration/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    //accountId = AccountSession.AccountID,
                    //type = type,
                    //endCreatedDate = endCreatedDate,
                    dclId = dclId,
                    //cstOffice = cstOffice,
                    //dclNo = dclNo,
                    //startCreatedDate = startCreatedDate,
                    //dclKindCd = dclKindCd,
                    //insClsCd = insClsCd,
                    //clearanStatus = clearanStatus,
                    //status = status
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ExportDeclaration));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("DeleteEDADeclaration")]
        public async Task<IHttpActionResult> DeleteEDADeclaration(int declarationID = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exDeclaration/delete";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationID });
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
        [Route("DeleteEDAProduct")]
        public async Task<IHttpActionResult> DeleteEDAProduct(int productid = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exProduct/delete";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { productid = productid });
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
        [Route("SearchEDADeclaration")]
        public async Task<IHttpActionResult> SearchEDADeclaration(int type = 0, int? dclId = null,
            string cstOffice = "", string dclNo = "", string startCreatedDate = "", string endCreatedDate = "",
           string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0,
           string statusCode = "", int page = 1, int count = 10)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exDeclaration/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    page = page,
                    count = count,
                    accountId = AccountSession.AccountID,
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
                    statusCode = statusCode
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ListExportDeclaration));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        #region VNACCS

        [HttpPost]
        [Route("SubmitIEX")]
        public async Task<IHttpActionResult> SubmitIEX(Submit data)
        {
            try
            {
                string dclNo = data.dclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitIEX";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclNo = dclNo });
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
        [Route("SubmitMED")]
        public async Task<IHttpActionResult> SubmitMED(Submit data)
        {
            try
            {
                string dclNo = data.dclNo;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitMED";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclNo = dclNo });
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
        [Route("SubmitMEE")]
        public async Task<IHttpActionResult> SubmitMEE(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitMEE";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
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
        [Route("SubmitEDE")]
        public async Task<IHttpActionResult> SubmitEDE(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitEDE";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
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
        [Route("SubmitEDC")]
        public async Task<IHttpActionResult> SubmitEDC(Submit data)
        {
            try
            {
                var dclID = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitEDC";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = dclID });
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
        [Route("SubmitEDD")]
        public async Task<IHttpActionResult> SubmitEDD(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitEDD";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    dclNo = data.dclNo,
                    cargoClsCd = data.cargoClsCd,
                    cargoNo = data.cargoNo,
                    eleInvRecNo = data.eleInvRecNo
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
        [Route("SubmitEDB")]
        public async Task<IHttpActionResult> SubmitEDB(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitEDB";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    dclNo = data.dclNo,
                    cargoClsCd = data.cargoClsCd,
                    cargoNo = data.cargoNo,
                    eleInvRecNo = data.eleInvRecNo
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
        [Route("SubmitEDA")]
        public async Task<IHttpActionResult> SubmitEDA(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitEDA";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
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
        [Route("SubmitEDA01")]
        public async Task<IHttpActionResult> SubmitEDA01(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitEDA01";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
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
        [Route("SubmitMEC")]
        public async Task<IHttpActionResult> SubmitMEC(Submit data)
        {
            try
            {
                long declarationId = data.declarationId;
                var url = ConfigurationManager.AppSettings["APIURL"] + "exVnaccs/submitMEC";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = declarationId });
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

        #endregion VNACCS
    }
}