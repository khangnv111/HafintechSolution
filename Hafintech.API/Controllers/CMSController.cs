using App.Utils;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using System;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("CMS")]
    public class CMSController : ApiController
    {
        private AppDAOImpl _appDAO = new AppDAOImpl();

        [HttpGet]
        [Route("GetInfo")]
        public IHttpActionResult GetInfo(int accountID)
        {
            try
            {
                var res = _appDAO.GetAccountInfo(accountID);
                return Ok(new Response(res));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
            }
        }

        //[HttpGet]
        //[Route("Search")]
        //public IHttpActionResult Search(int accountID)
        //{
        //    try
        //    {
        //        var res = _appDAO.GetAccountInfo(accountID);
        //        return Ok(new Response(res));
        //    }
        //    catch (Exception ex)
        //    {
        //        NLogManager.PublishException(ex);
        //        return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
        //    }

        //}
    }
}