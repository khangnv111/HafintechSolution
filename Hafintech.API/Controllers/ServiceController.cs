using App.Utils;
using App.Utils.GetData;
using Hafintech.API.DataAccess;
using Hafintech.API.Models;
using Newtonsoft.Json;
using System;
using System.Configuration;
using System.IO;
using System.Threading.Tasks;
using System.Web.Http;
using static App.Utils.Enums.Enums;

namespace Hafintech.API.Controllers
{
    [RoutePrefix("service")]
    public class ServiceController : ApiController
    {
        private AppDAOImpl _appDAO = new AppDAOImpl();
        private TaxDAOImpl _taxDAO = new TaxDAOImpl();

        [HttpGet]
        [Route("GetListProvince")]
        public IHttpActionResult GetListProvince()
        {
            return Ok(_appDAO.GetProvince());
        }

        [HttpGet]
        [Route("GetListDistrict")]
        public IHttpActionResult GetListDistrict(string provinceCode)
        {
            return Ok(_appDAO.GetDistrict(provinceCode));
        }

        [HttpGet]
        [Route("GetListCommune")]
        public IHttpActionResult GetListCommune(string districtCode)
        {
            return Ok(_appDAO.GetCommune(districtCode));
        }

        [HttpGet]
        [Route("FindUser")]
        public async Task<IHttpActionResult> FindUser(int accountId = 0, string userName = "",
            string fullname = "", string identity = "", string mobile = "", string declarCode = "",
            string startCreatedDate = "", string endCreatedDate = "")
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = accountId,
                    userName = userName,
                    fullname = fullname,
                    identity = identity,
                    mobile = mobile,
                    declarCode = declarCode,
                    startCreatedDate = startCreatedDate,
                    endCreatedDate = endCreatedDate
                });
                if (res.code < 0)
                    return Ok(new Response((int)ErrorCode.Failed, res.message));
                return Ok(new Response(res.results.ListAccounts));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpGet]
        [Route("GetCountry")]
        public IHttpActionResult GetCountry()
        {
            return Ok(_taxDAO.GetCountry());
        }

        [HttpPost]
        [Route("CreateDeclaration")]
        public async Task<IHttpActionResult> CreateDeclaration(HighValue data)
        {
            try
            {
                data.accountId = 67;
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/createForAgency";
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
        [Route("SearchDeclaration")]
        public async Task<IHttpActionResult> SearchDeclaration(int type = 0, int? dclId = null, string cstOffice = "", string dclNo = "", string startCreatedDate = "", string endCreatedDate = "",
            string dclKindCd = "", string insClsCd = "", int? clearanStatus = 0, int? status = 0)
        {
            try
            {
                var url = ConfigurationManager.AppSettings["APIURL"] + "declaration/search";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
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
                    status = status
                });
                if (res.code < 0)
                    return Ok(new Response(res.code, res.message));
                return Ok(new Response(res.results.ListDeclarations));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return Ok(new Response("Có lỗi xảy ra, mời bạn thử lại"));
        }

        [HttpPost]
        [Route("Update")]
        public async Task<IHttpActionResult> Update()
        {
            try
            {
                var httpRequest = System.Web.HttpContext.Current.Request;
                var account = JsonConvert.DeserializeObject<AccountInfo>(httpRequest["account"]);

                string folderPath = AppDomain.CurrentDomain.BaseDirectory + "Data\\upload\\";
                if (!Directory.Exists(folderPath))
                {
                    Directory.CreateDirectory(folderPath);
                }
                for (int i = 0; i < httpRequest.Files.Count; i++)
                {
                    var file = httpRequest.Files[i];
                    var name = file.FileName;
                    file.SaveAs(folderPath + name);
                }
                var url = ConfigurationManager.AppSettings["APIURL"] + "account/updateInfo";
                var res = await DataService.PostAsync<Rootobject<dynamic>>(url, new
                {
                    accountId = account.AccountID,
                    fullname = account.FullName,
                    birthday = account.Birthday.Value.ToString("MM/dd/yyyy"),
                    gender = account.Gender,
                    identity = account.Identity,
                    dateReleased = account.DateReleased.Value.ToString("MM/dd/yyyy"),
                    placeReleased = account.PlaceReleased,
                    idenImgPath1 = account.IdentityImgPath1,
                    idenImgPath2 = account.IdentityImgPath2,
                    provinceCode = account.ProvinceCode,
                    districtCode = account.DistrictCode,
                    communeCode = account.CommuneCode,
                    address = account.Address,
                    passportId = account.PassportID,
                    passpoImgPath = account.PassportImgPath,
                });
                if (res.code < 0)
                    return Ok(new Response((int)ErrorCode.Failed, res.message));

                return Ok(new Response(true));
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return Ok(new Response("Có lỗi xảy ra khi đăng ký, mời bạn thử lại"));
            }
        }
    }
}