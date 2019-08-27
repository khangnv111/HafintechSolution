using App.Utils;
using App.Utils.GetData;
using Hafintech.API.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("Permission")]
    public class PermissionController : ApiController
    {
        [HttpGet]
        [Route("Get")]
        public IHttpActionResult GetSample(string application)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                JwtSecurityToken jsonToken = handler.ReadToken(Convert.ToString(AccountSession.Info)) as JwtSecurityToken;
                var strAuthorities = jsonToken.Claims.Where(claim => claim.Type == "authorities").Select(auth=>auth.Value);
                if (strAuthorities == null)
                {
                    return Ok(new Response(0));
                }
                else
                {
                    var authorities = strAuthorities.ToList();
                    Regex regex = new Regex(@"^(" + application + ")");
                    var appAuthorities = authorities.Where(auth => regex.IsMatch(auth)).ToList();
                    return Ok(new Response(appAuthorities));

                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }
    }
}
