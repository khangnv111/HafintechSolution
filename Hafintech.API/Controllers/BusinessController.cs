﻿using App.Utils;
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
    [RoutePrefix("Business")]
    public class BusinessController : ApiController
    {
        [HttpPost]
        [Route("Create")]
        public async Task<IHttpActionResult> Create(Agency data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/create";
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
        [Route("Update")]
        public async Task<IHttpActionResult> Update(UpdateRequest data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/update";
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
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/create";
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
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/update";
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
        [Route("UpdatePersonal")]
        public async Task<IHttpActionResult> UpdatePersonal(Personal data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/updatePersonal";
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
        [Route("CreatePersonal")]
        public async Task<IHttpActionResult> CreatePersonal(Personal data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/createPersonal";
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
        [Route("SearchBusiness")]
        public async Task<IHttpActionResult> SearchBusiness(Business data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/search";
                if (data != null)
                {
                    var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                    {
                        businessId = data.businessId,
                        parentId = data.parentId,
                        taxIdNumber = data.taxIdNumber,
                        name = data.name,
                        status = data.status
                    });
                    if (res.code < 0)
                        return Ok(new Response(res.code, res.message));
                    return Ok(new Response(res.results.ListBusiness));
                }
                else
                {
                    var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                    {
                        accountId = (int)AccountSession.AccountID
                    });
                    if (res.code < 0)
                        return Ok(new Response(res.code, res.message));
                    return Ok(new Response(res.results.ListBusiness));
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
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/deleteBusiness";
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
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/deletePersonal";
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
        [Route("SetSignMethod")]
        public async Task<IHttpActionResult> SetSignMethod(int businessId = 0, int signMethod = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["AGENCYURL"] + "business/setSignMethod?businessId=" + businessId + "&signMethod=" + signMethod;
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
        [Route("GetListParent")]
        public async Task<IHttpActionResult> GetListParent(string status = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/business/getListParent?accountId=" + (int)AccountSession.AccountID + "&status=" + status;
                var res = await DataService.GetAsync<Rootobject<dynamic>>(url);
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateBussinessStatus")]
        public async Task<IHttpActionResult> UpdateBussinessStatus(Submit data)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["URL"] + "MediationAgency/business/updateBussinessStatus";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    businessId = data.businessId,
                    status = data.status
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.Business));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
    }
}
