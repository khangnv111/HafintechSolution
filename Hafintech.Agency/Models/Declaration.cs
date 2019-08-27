using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hafintech.Agency.Models
{
    public class Declaration
    {
        public string dclId { get; set; }
        public string declarationId { get; set; } 
        public string dclNo { get; set; }
        public string firstDclNo { get; set; }
        public string tentativeDclNo { get; set; }
        public string clsOrg { get; set; }
        public object insClsCd { get; set; }
        public string cstOffice { get; set; }
        public string cstOfficeNm { get; set; }
        public string cstSubCd { get; set; }
        public string cstSubSection { get; set; }
        public string regDate { get; set; }
        public string regTime { get; set; }
        public string regDateOfCor { get; set; }
        public string regTimeOfCor { get; set; }
        public string dclKindCd { get; set; }
        public string repTaxCd { get; set; }
        public string timeLimReExp { get; set; }
        //=====Người nhập khẩu - xuất khẩu
        public string imperCd { get; set; }
        public string imperNm { get; set; }
        public string postcode { get; set; }
        public string phoneNoOfImp { get; set; }
        public string phoneNoOfExp { get; set; }
        public string addressOfImp { get; set; }
        public string addressOfExp { get; set; } 
        public string consigneeCd { get; set; }
        public string consignorCd { get; set; }
        public string impCtrCd { get; set; }
        public string impCtrNm { get; set; }
        public string experCd { get; set; }
        public string consignorNm { get; set; }
        public string consigneeNm { get; set; }
        public string experNm { get; set; }
        public string postcodeIdt { get; set; } 
        public string countryCd { get; set; }
        public string address1Street { get; set; }
        public string address2Street { get; set; }
        public string address3CityNm { get; set; }
        public string countryNm { get; set; }
        public string exportCsgNm { get; set; }
        //=====Đại lý hải quan
        public string agencyId { get; set; }
        public string agentCd { get; set; }
        public string agentNm { get; set; }
        public string cstBrokerCd { get; set; }
        public string houseAwbNo { get; set; }
        public string masterAwbNo { get; set; }
        public string finalDesCd { get; set; }
        public string finalDesNm { get; set; }
        public string unloadPortCd { get; set; }
        public string unloadPortNm { get; set; }
        public string loadLocCd { get; set; }
        public string loadPortCd { get; set; }
        public string loadLocNm { get; set; }
        public string loadPortNm { get; set; }
        public string flightNo { get; set; }
        public string arrDate { get; set; }
        //=====Mã nhân viên HQ
        public string cargoPiece { get; set; }
        public string cargoWeigGrs { get; set; }
        public string cstWrhCd { get; set; }
        public object cstClrWrhNm { get; set; }
        //========
        public lsCurrency[] lsCurrency { get; set; }
        public cargoNumer[] lsCargoNo { get; set; }
        public string invPrcKindCd { get; set; }
        public string invPrcCdtCd { get; set; }
        public string pieceUnitCd { get; set; }
        public string invCurCd { get; set; }
        public string totalInvPrc { get; set; } 
        public string freightDemarCd { get; set; }
        public string freightCurCd { get; set; }
        public string freight { get; set; }
        public string insDemarCd { get; set; }
        public string insCurCd { get; set; }
        public string insAmt { get; set; }
        public string itemName { get; set; }
        public string cstValue { get; set; }
        public string placeOriginCd { get; set; }
        public string oriPlaceNm { get; set; }
        public string etpControlNo { get; set; }
        public string eiControlNo { get; set; }
        public string notes { get; set; }
        public string cstWrhNm { get; set; }
        public string curCd { get; set; }
        public string curExRate { get; set; }
        public string totalTaxVal { get; set; }
        public string curCdTtlTaxVal { get; set; }
        public string dclPrice { get; set; }
        public string hSCd { get; set; } //Mã số hàng hóa
        public string statusCode { get; set; } // Mã
        public string addressAccount { get; set; } //Địa chỉ của tk
        public string dateOfPermit { get; set; }
        public string timeOfPermit { get; set; }
        public string weigUnitCdGrs { get; set; }
        public string noHandledCtn { get; set; }
        public string loadVesselCd { get; set; }
        public string loadVesselAcNm { get; set; }
        public string marksAndNos { get; set; }
        public lstLawCode[] lsOtherLawCode { get; set; }
        public string invNo { get; set; }
        public string eleInvRecNo { get; set; }
        public string invDate { get; set; }
        public string termOfPay { get; set; }
        public string totalDisTaxVal { get; set; }
        public string totalBPClsCd { get; set; }
        public string resultInsCd { get; set; }
        public string resultInsNm { get; set; }
        public LstPermit[] lsPermit { get; set; }
        public string valDemarCd { get; set; } 
        public string compDclNo { get; set; }
        public string curCdBasePrc { get; set; }
        public string basePrcValAdj { get; set; }
        public string idtValType { get; set; }
        public string formulaVal { get; set; }
        public string regNoIns { get; set; }
        public AdjDemar[] lsAdjDemar { get; set; }
        public string detailsOfVal { get; set; }
        public TaxInfo[] lsTaxInfo { get; set; }
        public string totalPayTax { get; set; }
        public string secAmt { get; set; }
        public string extPayDueCd { get; set; }
        public string taxPayer { get; set; }
        public string reasonCd { get; set; }
        public string paymentCls { get; set; }
        public string structure { get; set; }
        public string noOfDclColumn { get; set; }
        public Attachment[] clsAttachment { get; set; }
        public string mngNoForUser { get; set; }
        public string strDateTrs { get; set; }
        public TransInfo[] lsTransInfo { get; set; }
        public string destinationTrs { get; set; }
        public Product[] listProducts { get; set; }
        public string dateCmplInsp { get; set; }
        public string timeCmplInsp { get; set; }
        public string clsfOfPostInsp { get; set; }
        public string bpApprovalDate { get; set; }
        public string bpApprovalTime { get; set; }
        public string bpInspCmplDate { get; set; }
        public string bpInspCmplTime { get; set; } 
        public string expNoDayPer { get; set; }
        public string taxCodeGvat { get; set; }
        public string taxNameGvat { get; set; }
        public string dlnPmtGvat { get; set; }
    }

    public class lsCurrency
    {
        public string curCd { get; set; }
        public string curExcRate { get; set; }
    } 
    public class cargoNumer
    {
        public string cargoNo { get; set; }
    }
    public class lstLawCode
    {
        public string otherLawCd { get; set; }
    }
    public class AdjDemar
    {
        public string adjDemarNm { get; set; }
        public string adjDemarCd { get; set; }
        public string curCdOfEvaAmt { get; set; }
        public string evaluatedAmt { get; set; }
        public string totalDisEva { get; set; }
    }
    public class TaxInfo
    {
        public string taxSubjectCd { get; set; }
        public string taxSubjectNm { get; set; }
        public string totalTaxAmt { get; set; }
        public string noColTotalTax { get; set; }
    } 
    public class Attachment
    {
        public string clsAttachment { get; set; }
        public string attachmentNo { get; set; }
    }
    public class LstPermit
    {
        public string permitType { get; set; }
        public string permitLicNo { get; set; }
    }
    public class TransInfo
    {
        public string trnLocTrs { get; set; }
        public string arrDateTrnLoc { get; set; }
        public string strDateTrnLoc { get; set; }
    }
    public class Product
    {
        public string productId { get; set; }
        public string accountId { get; set; }
        public string declarationId { get; set; }
        public string hSCd { get; set; }
        public string materialCd { get; set; }
        public string dutyRate { get; set; }
        public string absTariffRate { get; set; }
        public string absDutyUnitCd { get; set; }
        public string curCdAbsDuty { get; set; }
        public string itemName { get; set; }
        public string placeOriginCd { get; set; }
        public string oriPlaceNm { get; set; }
        public string importTaxClfCd { get; set; }
        public string tariffQuotaClf { get; set; }
        public string perUnitTaxCd { get; set; }
        public string qtt1 { get; set; }
        public string qttUnitCd1 { get; set; }
        public string qtt2 { get; set; }
        public string qttUnitCd2 { get; set; }
        public string invValue { get; set; }
        public string invUnitPrice { get; set; }
        public string unitPriceCurCd { get; set; }
        public string priceQttUnit { get; set; }
        public string cstValueCurCd { get; set; }
        public string cstValue { get; set; }
        public ValuaNo[] lsValuationNo { get; set; }
        public string tenDclLineNo { get; set; }
        public string taxExpLsNo { get; set; }
        public string taxExpLsLineNo { get; set; }
        public string rdcImpTaxCd { get; set; }
        public string rdcAmtImpTax { get; set; }
        public OtherTax[] lsOtherTax { get; set; }
        public string oTaxRdcCd { get; set; }
        public string oTaxRdcAmt { get; set; }
        public string prcReCfClsCd { get; set; }
        public string cstValSystem { get; set; }
        public string taxValCurCd { get; set; }
        public string taxValManual { get; set; }
        public string cstStdQtt { get; set; }
        public string msrUnitCdCst { get; set; }
        public string cstValUnitPrc { get; set; }
        public string unitCstUnitPrc { get; set; }
        public string impTaxRateCd { get; set; }
        public string impTaxRate { get; set; }
        public string impTaxRateInp { get; set; }
        public string impTaxAmt { get; set; }
        public string rdcImpTaxAmt { get; set; }
    }

    public class ValuaNo
    {
        public string valuationNo { get; set; }
    }
    public class OtherTax
    {
        public string itemNmOTax { get; set; }
        public string oTaxTypeCd { get; set; }
        public string cstOTaxAmt { get; set; }
        public string stdOTax { get; set; }
        public string stdOTaxUnitCd { get; set; }
        public string taxRateOfOTax { get; set; }
        public string otherTaxAmt { get; set; }
        public string oTaxRdcCd { get; set; }
        public string prvOTaxInLaw { get; set; }
        public string oTaxCerAmt { get; set; }
    }

    public class ReportSystem
    {
        public long? accountId { get; set; } // Account id đang đăng nhập
        public string dclType { get; set; } // Loại xuất khẩu: "20", nhập khẩu: "10"
        public string cstDepartment { get; set; } // Tên Cục HQ (ví dụ: Hà Nội)
        public string cstOffice { get; set; } // Mã Chi Cục
        public string dclNo { get; set; }
        public int? insClsCd { get; set; } // Phân luồng: null, 1, 2, 3
        public int? clearanStatus { get; set; } // Thông quan
        public string fromDate { get; set; } // Từ ngày
        public string toDate { get; set; } // Đến ngày
        public string houseAwbNo { get; set; } // Vận đơn
        public int? status { get; set; } // Trạng thái
        public string statusCode { get; set; } // Mã
        public string dclKindCd { get; set; } // Mã loại hình
        public int? customerType { get; set; }// Đối tượng 1. Cá nhân, 2. Doanh nghiệp 
        public string itemName { get; set; }
        public string cargoPiece { get; set; }
    }
}