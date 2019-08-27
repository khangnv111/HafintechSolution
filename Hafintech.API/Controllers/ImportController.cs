using App.Utils;
using App.Utils.GetData;
using Hafintech.API.Models;
using System;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("import")]
    public class ImportController : ApiController
    {
        [HttpPost]
        [Route("CreateDeclaration")]
        public async Task<IHttpActionResult> CreateDeclaration(HighValue data)
        {
            try
            {
                data.accountId = (int)AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/create";
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

        [HttpGet]
        [Route("GetDeclarationDetail")]
        public async Task<IHttpActionResult> GetDeclarationDetail(int dclId = 0, long? dclNo = 0)
        {
            try
            {
                if (dclId > 0) dclNo = 0;
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { dclId = dclId, dclNo = dclNo });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Declarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("InsertIDAProduct")]
        public async Task<IHttpActionResult> InsertIDAProduct(IDAProductRequest data)
        {
            try
            {
                data.accountId = AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/create";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, data);
                if (res == null || res.code < 0)
                    return Ok(new Response(res.code, res.message, res.results.error));
                return Ok(new Response(res.results.ListProducts));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra khi thêm tờ khai, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("UpdateIDAProduct")]
        public async Task<IHttpActionResult> UpdateIDAProduct(IDAProductRequest data)
        {
            try
            {
                data.accountId = AccountSession.AccountID;
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/update";
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

        [HttpGet]
        [Route("SearchIDAProduct")]
        public async Task<IHttpActionResult> SearchIDAProduct(int declarationID = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { declarationId = declarationID });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Products));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetIDAProductDetail")]
        public async Task<IHttpActionResult> GetIDAProductDetail(int productid = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "product/view";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new { productId = productid });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.Products));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
    }
}