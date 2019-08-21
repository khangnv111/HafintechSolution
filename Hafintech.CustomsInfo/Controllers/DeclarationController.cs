using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hafintech.CustomsInfo.Controllers
{
    public class DeclarationController : Controller
    {
        // GET: Declaration
        public ActionResult Declaration_List()
        {
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
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult Declaration_Detail(long decID = 0, int uid = 0)
        {
            ViewBag.declarationID = decID;
            ViewBag.uid = uid;
            return View();
        }

        public ActionResult TabCommodity_List(long decID = 0)
        {
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabDirective_List(long decID = 0)
        {
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult TabResult(long decID = 0)
        {
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult Commodity_List(long decID = 0)
        {
            ViewBag.declarationID = decID;
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
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult DeclarationHighValue_Detail(long decID = 0, int uid = 0)
        {
            ViewBag.declarationID = decID;
            ViewBag.uid = uid;
            return View();
        }

        public ActionResult TabCommodityHighValue_List(long decID = 0, int uid = 0)
        {
            ViewBag.declarationID = decID;
            ViewBag.uid = uid;
            return View();
        }

        public ActionResult TabDirectiveHighValue_List(long decID = 0, int uid = 0)
        {
            ViewBag.declarationID = decID;
            ViewBag.uid = uid;
            return View();
        }

        public ActionResult TabResultHighValue(long decID = 0, int uid = 0)
        {
            ViewBag.declarationID = decID;
            ViewBag.uid = uid;
            return View();
        }

        public ActionResult CommodityHighValue_List(long decID = 0)
        {
            ViewBag.declarationID = decID;
            return View();
        }

        public ActionResult CommodityHighValue_Add()
        {
            return PartialView();
        }

        #endregion [ Tờ khai GTT ]

        #region [Popup search]
        //Mã loại hình
        public ActionResult getSeachMethod(string methodId, string methodCode, string name, string mthCodeOld, string nameOld)
        {
            ViewBag.methodId = methodId;
            ViewBag.methodCode = methodCode;
            ViewBag.name = name;
            ViewBag.mthCodeOld = mthCodeOld;
            ViewBag.nameOld = nameOld;
            return PartialView();
        }

        //Trọng lượng hàng 
        public ActionResult getSeachWeightUnit(string weightUnitCode, string weightUnitName)
        {
            ViewBag.weightUnitCode = weightUnitCode;
            ViewBag.weightUnitName = weightUnitName;
            return PartialView();
        }
        //Đơn vị kiện
        public ActionResult getSeachSealUnit(string sealUnitCode, string sealUnitName)
        {
            ViewBag.sealUnitCode = sealUnitCode;
            ViewBag.sealUnitName = sealUnitName;
            return PartialView();
        }
        //Cơ quan hải quan
        //public ActionResult getSeachCustom(string customsId, string province, string customsName, string customsCode, string ctsNameOld, string ctsCodeOld)
        //{
        //    ViewBag.customsId = customsId;
        //    ViewBag.province = province;
        //    ViewBag.customsName = customsName;
        //    ViewBag.customsCode = customsCode;
        //    ViewBag.ctsNameOld = ctsNameOld;
        //    ViewBag.ctsCodeOld = ctsCodeOld;
        //    return PartialView();
        //}
        public ActionResult getSeachCustom(string cstOfficeCd, string cstOfficeNm, string cstOfficeCdOld, string cstOfficeNmOld)
        {
            ViewBag.cstOfficeCd = cstOfficeCd;
            ViewBag.cstOfficeNm = cstOfficeNm;
            ViewBag.cstOfficeCdOld = cstOfficeCdOld;
            ViewBag.cstOfficeNmOld = cstOfficeNmOld;
            return PartialView();
        }
        //Tìm nước
        public ActionResult getSeachCountry(string countryCode, string name)
        {
            ViewBag.countryCode = countryCode;
            ViewBag.name = name;
            return PartialView();
        }
        //Địa điểm xếp hàng
        public ActionResult getSeachPlace(string placeLoadingId, string placeCode, string placeName, string countryCode)
        {
            ViewBag.placeLoadingId = placeLoadingId;
            ViewBag.placeCode = placeCode;
            ViewBag.placeName = placeName;
            ViewBag.countryCode = countryCode;
            return PartialView();
        }

        //Địa điểm dỡ hàng
        public ActionResult getSeachUnPlace(string plcUnloadingID, string placeCode, string placeName, string countryCode)
        {
            ViewBag.plcUnloadingID = plcUnloadingID;
            ViewBag.placeCode = placeCode;
            ViewBag.placeName = placeName;
            ViewBag.countryCode = countryCode;
            return PartialView();
        }

        //Mã địa điểm lưu kho hàng chờ thông quan dự kiến
        public ActionResult getSeachUnwaitStgPlcCode(string waitPlaceCode, string waitPlaceName, string province, string customsCode)
        {
            ViewBag.waitPlaceCode = waitPlaceCode;
            ViewBag.waitPlaceName = waitPlaceName;
            ViewBag.province = province;
            ViewBag.customsCode = customsCode;
            return PartialView();
        }

        public ActionResult getSeachsldocummentData(string n, string docummentId, string docummentCode, string docummentName, string docummentDate, string content)
        {
            ViewBag.n = n;
            ViewBag.docummentId = docummentId;
            ViewBag.docummentCode = docummentCode;
            ViewBag.docummentName = docummentName;
            ViewBag.docummentDate = docummentDate;
            ViewBag.content = content;
            return PartialView();
        }

        public ActionResult getSeachBank(string n, string bankId, string bankCode, string bankName)
        {
            ViewBag.n = n;
            ViewBag.bankId = bankId;
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

        public ActionResult getSearchTransportation(string transCode, string transpName)
        {
            ViewBag.transCode = transCode;
            ViewBag.transpName = transpName;
            return PartialView();
        }

        #endregion

        public ActionResult Declaration_LeftMenu()
        {
            return PartialView();
        }
    }
}