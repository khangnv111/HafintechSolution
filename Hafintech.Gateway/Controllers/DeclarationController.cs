using _2017Utilities.Session;
using System.Web.Mvc;

namespace Hafintech.Gateway.Controllers
{
    public class DeclarationController : Controller
    {
        // GET: Declaration
        public ActionResult Declaration_List()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();
        }

        public ActionResult SubmitIDCLowValue(long declarationId)
        {
            ViewBag.declarationId = declarationId;
            return PartialView();
        }

        public ActionResult SubmitIDCHighValue(long declarationId)
        {
            ViewBag.declarationId = declarationId;
            return PartialView();
        }

        public ActionResult Declaration_Search()
        {
            return PartialView();
        }

        #region [ Tờ khai GTT ]

        public ActionResult Declaration_Update(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult Declaration_Detail(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabCommodity_List(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabDirective_List(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabResult(long decID = 0)
        {
            ViewBag.declarationID = decID;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult Commodity_List(long decID = 0)
        {
            ViewBag.declarationID = decID;
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult Commodity_Add()
        {
            return PartialView();
        }

        #endregion [ Tờ khai GTT ]

        #region [ Tờ khai GTC ]

        public ActionResult DeclarationHighValue_Update(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult DeclarationHighValue_Detail(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabCommodityHighValue_List(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabDirectiveHighValue_List(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabResultHighValue(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult CommodityHighValue_List(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult CommodityHighValue_Add(long productID = 0)
        {
            ViewBag.declarationID = productID;
            return PartialView();
        }
        public ActionResult CommodityHighValue_Detail(long productID = 0)
        {
            ViewBag.declarationID = productID;
            return PartialView();
        }

        #endregion [ Tờ khai GTT ]

        #region [Popup search]
        //Mã loại hình
        public ActionResult getSeachMethod(string dclKindCd, string dclKindNm, string dclKindCdOld, string dclKindNmOld)
        {
            ViewBag.dclKindCd = dclKindCd;
            ViewBag.dclKindNm = dclKindNm;
            ViewBag.dclKindCdOld = dclKindCdOld;
            ViewBag.dclKindNmOld = dclKindNmOld;
            return PartialView();
        }

        //Trọng lượng hàng 
        public ActionResult getSeachWeightUnit(string weigUnitCd, string weigUnitNm)
        {
            ViewBag.weigUnitCd = weigUnitCd;
            ViewBag.weigUnitNm = weigUnitNm;
            return PartialView();
        }
        //Đơn vị kiện
        public ActionResult getSeachSealUnit(string quanUnitCd, string quanUnitNm)
        {
            ViewBag.quanUnitCd = quanUnitCd;
            ViewBag.quanUnitNm = quanUnitNm;
            return PartialView();
        }
        //Cơ quan hải quan
        public ActionResult getSeachCustom(string cstOfficeCd, string cstOfficeNm, string cstOfficeCdOld, string cstOfficeNmOld)
        {
            ViewBag.cstOfficeCd = cstOfficeCd;
            ViewBag.cstOfficeNm = cstOfficeNm;
            ViewBag.cstOfficeCdOld = cstOfficeCdOld;
            ViewBag.cstOfficeNmOld = cstOfficeNmOld;
            return PartialView();
        }
        //Tìm nước
        public ActionResult getSeachCountry(string countryCode, string countryName, int? typeFind)
        {
            ViewBag.countryCode = countryCode;
            ViewBag.countryName = countryName;

            int Type = typeFind == null ? 0 : (int)typeFind;
            ViewBag.Type = Type;

            return PartialView();
        }

        public ActionResult getSeachCountryHH(string countryCode, string countryName)
        {
            ViewBag.countryCode = countryCode;
            ViewBag.countryName = countryName;
            return PartialView();
        }

        //Địa điểm xếp hàng
        public ActionResult getSeachPlace(string loadLocCd, string loadLocNm, string countryCd)
        {
            ViewBag.loadLocCd = loadLocCd;
            ViewBag.loadLocNm = loadLocNm;
            ViewBag.countryCd = countryCd;
            return PartialView();
        }

        //Địa điểm dỡ hàng
        public ActionResult getSeachUnPlace(string unloadPortCd, string unloadPortNm)
        {
            ViewBag.unloadPortCd = unloadPortCd;
            ViewBag.unloadPortNm = unloadPortNm;
            return PartialView();
        }

        //Mã địa điểm lưu kho hàng chờ thông quan dự kiến
        public ActionResult getSeachUnwaitStgPlcCode(string cstWrhCd, string cstWrhNm, string province, string cstOfficeCd)
        {
            ViewBag.cstWrhCd = cstWrhCd;
            ViewBag.cstWrhNm = cstWrhNm;
            ViewBag.province = province;
            ViewBag.cstOfficeCd = cstOfficeCd;
            return PartialView();
        }

        public ActionResult getSeachsldocummentData(string n, string docummentCode, string docummentName, string docummentDate, string content)
        {
            ViewBag.n = n;
            ViewBag.docummentCode = docummentCode;
            ViewBag.docummentName = docummentName;
            ViewBag.docummentDate = docummentDate;
            ViewBag.content = content;
            return PartialView();
        }

        public ActionResult getSeachBank(string n, string bankCode, string bankName)
        {
            ViewBag.n = n;
            ViewBag.bankCode = bankCode;
            ViewBag.bankName = bankName;
            return PartialView();
        }

        public ActionResult getSeachFileAttack(string n, string DeclarationID)
        {
            ViewBag.n = n;
            ViewBag.DeclarationID = DeclarationID;
            return PartialView();
        }

        public ActionResult getSearchTransportation(string loadVesselCd, string loadVesselNm)
        {
            ViewBag.loadVesselCd = loadVesselCd;
            ViewBag.loadVesselNm = loadVesselNm;
            return PartialView();
        }

        #endregion

        #region MID - MIE
        public ActionResult DecalrationMID(int? type)
        {
            var Type = type != null ? (int)type : 1;

            ViewBag.type = Type;

            return PartialView();
        }

        public ActionResult DecalrationMIE(long? decID, string dclNo)
        {

            ViewBag.dclNo = dclNo;

            var Id = decID == null ? 0 : (long)decID;
            ViewBag.Id = Id;

            return PartialView();
        }

        public ActionResult DecalrationMIE_view(long? decID, string dclNo)
        {

            ViewBag.dclNo = dclNo;

            var Id = decID == null ? 0 : (long)decID;
            ViewBag.Id = Id;

            return PartialView();
        }

        public ActionResult DeclarationDetailIID(long decID = 0)
        {
            ViewBag.declarationID = decID;
            return PartialView();
        }

        public ActionResult GetInfo_IID(int? type)
        {
            var Type = type != null ? (int)type : 1;

            ViewBag.type = Type;

            return PartialView();
        }

        public ActionResult DecalrationIDD(int? typeGTC)
        {
            var Type = typeGTC != null ? (int)typeGTC : 1;

            ViewBag.typeGTC = Type;
            return PartialView();
        }
        public ActionResult DecalrationKQ()
        {
            return PartialView();
        }
        public ActionResult DeclarationDetailIIDHighValue(long decID = 0)
        {
            ViewBag.declarationID = decID;
            return PartialView();
        }
        #endregion

        public ActionResult Declaration_LeftMenu()
        {
            return PartialView();
        }
        public ActionResult getSearchTax(int? type, int? Page)
        {
            var Type = type != null ? (int)type : 1;

            ViewBag.type = Type;

            var page = Page != null ? (int)Page : 1;

            ViewBag.page = page;

            return PartialView();
        }
        public ActionResult Dashboard_list()
        {
            return PartialView();
        }

        #region AMA
        public ActionResult ListAMA()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();


        }
        public ActionResult Declaration_AMA(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }
        public ActionResult Decalration_AMB(int? typeAMA)
        {
            var Type = typeAMA != null ? (int)typeAMA : 1;

            ViewBag.typeAMA = Type;

            return PartialView();
        }
        public ActionResult TabResult_AMC(long amcID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.amcID = amcID;
            return View();
        }
        public ActionResult Declaration_IAD(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }
        #endregion

        #region HYS
        public ActionResult ListHYS()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }

            return View();

        }
        public ActionResult Declaration_HYS(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.declarationID = decID;
            return View();
        }
        public ActionResult Declaration_HYE(int? typeHYE)
        {
            var Type = typeHYE != null ? (int)typeHYE : 1;

            ViewBag.typeHYE = Type;

            return PartialView();
        }
        public ActionResult Declaration_IHY(int? typeIHY)
        {
            var Type = typeIHY != null ? (int)typeIHY : 1;

            ViewBag.typeIHY = Type;

            return PartialView();
        }
        public ActionResult DecalrationIHYSearch(int? typeIHY)
        {
            var Type = typeIHY != null ? (int)typeIHY : 1;

            ViewBag.typeIHY = Type;
            return PartialView();
        } 

        public ActionResult TabResult_Attach(long attachID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.attachID = attachID;
            return View();
        }
        #endregion

        #region Thông điệp nghiệp vụ
        public ActionResult BusinessMess()
        {
            return PartialView();
        }
        #endregion
    }
}