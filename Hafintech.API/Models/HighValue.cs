using System;
using System.Collections.Generic;

namespace Hafintech.API.Models
{
    public class HighValue
    {
     
        public string houseAwbNo { get; set; }
        public long dclId { get; set; }
        public int accountId { get; set; }
        public int type { get; set; }
        public int status { get; set; }
        public string statusCode { get; set; }
        public string dclNo { get; set; }
        public string firstDclNo { get; set; }
        public string branchNoDivDcl { get; set; }
        public string noDivisDivDcl { get; set; }
        public string tentativeDclNo { get; set; }
        public string dclKindCd { get; set; }
        public string cargoClsCd { get; set; }
        public string meansOfTrsCd { get; set; }
        public string clsOrg { get; set; }
        public string cstOffice { get; set; }
        public string cstSubSection { get; set; }
        public string timeLimReExp { get; set; } = string.Empty;
        public string dclPlannedDate { get; set; } = string.Empty;
        public string imperCd { get; set; }
        public string imperNm { get; set; }
        public string postcode { get; set; }
        public string addressOfImp { get; set; }
        public string phoneNoOfImp { get; set; }
        public string impCtrCd { get; set; }
        public string impCtrNm { get; set; }
        public string consignorCd { get; set; }
        public string consignorNm { get; set; }
        public string postcodeIdt { get; set; }
        public string address1Street { get; set; }
        public string address2Street { get; set; }
        public string address3CityNm { get; set; }
        public string countryNm { get; set; }
        public string countryCd { get; set; }
        public string exportCsgNm { get; set; }
        public string plannedDeclCd { get; set; }
        public dynamic lsCargoNo { get; set; }
        public int cargoPiece { get; set; }
        public string pieceUnitCd { get; set; }
        public string cargoWeigGrs { get; set; }
        public string weigUnitCdGrs { get; set; }
        public string cstWrhCd { get; set; }
        public string marksAndNos { get; set; }
        public string loadVesselCd { get; set; }
        public string loadVesselAcNm { get; set; }
        public string arrDate { get; set; }
        public string unloadPortCd { get; set; }
        public string unloadPortNm { get; set; }
        public string loadLocCd { get; set; }
        public string loadLocNm { get; set; }
        public string noHandledCtn { get; set; }
        public string resultInsCd { get; set; }
        public dynamic lsOtherLawCode { get; set; }
        public dynamic lsPermit { get; set; }
        public string permitLicNo { get; set; }
        public string invClsCd { get; set; }
        public string eleInvRecNo { get; set; }
        public string invNo { get; set; }
        public object invDate { get; set; }
        public string termOfPay { get; set; }
        public string invPrcKindCd { get; set; }
        public string invPrcCdtCd { get; set; }
        public string invCurCd { get; set; }
        public int totalInvPrc { get; set; }
        public string valDemarCd { get; set; }
        public string compDclNo { get; set; }
        public string curCdBasePrc { get; set; }
        public string basePrcValAdj { get; set; }
        public string freightDemarCd { get; set; }
        public string freightCurCd { get; set; }
        public string freight { get; set; }
        public string insDemarCd { get; set; }
        public string insCurCd { get; set; }
        public string insAmt { get; set; }
        public string regNoIns { get; set; }
        public dynamic lsAdjDemar { get; set; }
        public string adjDemarCd { get; set; }
        public string curCdOfEvaAmt { get; set; }
        public int evaluatedAmt { get; set; }
        public int totalDisEva { get; set; }
        public string detailsOfVal { get; set; }
        public string totalDisTaxVal { get; set; }
        public string taxPayer { get; set; }

        public string bankPayCd { get; set; }
        public string bankPayIssYear { get; set; }
        public string bankPaySign { get; set; }
        public string bankPayNo { get; set; }
        public string extPayDueCd { get; set; }
        public string secSupplBankCd { get; set; }
        public string issuedYear { get; set; }
        public string secBankSign { get; set; }
        public string secNo { get; set; }
        public List<Attachment> clsAttachment { get; set; }
        public int attachmentNo { get; set; }
        public object permitWrhDate { get; set; }
        public object strDateTrs { get; set; }
        public dynamic lsTransInfo { get; set; }
        public string placeOriginCd { get; set; }
        public string arrDateTrnLoc { get; set; }
        public string strDateTrnLoc { get; set; }
        public string destinationTrs { get; set; }
        public string arrDateOfTrs { get; set; }
        public string notes { get; set; }
        public string etpControlNo { get; set; }
        public string cstInsCls { get; set; }
        public object dateCstIns { get; set; }
        public string caseTitCstIns { get; set; }
        public string contentCstIns { get; set; }
        public string clsCorReport { get; set; }
        public string insClsCd { get; set; }
        public string repTaxCd { get; set; }
        public string cstOfficeNm { get; set; }
        public string regDate { get; set; }
        public string regTime { get; set; }
        public string regDateOfCor { get; set; }
        public string regTimeOfCor { get; set; }
        public string timeLimReIE { get; set; }
        public string signTimeOver { get; set; }
        public string agentNm { get; set; }
        public string cstBrokerCd { get; set; }
        public string cstClrWrhNm { get; set; }
        public string totalTaxVal { get; set; }
        public string totalBPClsCd { get; set; }
        public string idtValType { get; set; }
        public string valClsCd { get; set; }
        public string formulaVal { get; set; }
        public string taxSubjectCd { get; set; }
        public string taxSubjectNm { get; set; }
        public string totalTaxAmt { get; set; }
        public string noColTotalTax { get; set; }
        public string totalPayTax { get; set; }
        public string secAmt { get; set; }
        public string curCd { get; set; }
        public string curExcRate { get; set; }
        public string paymentCls { get; set; }
        public string structure { get; set; }
        public string noOfDclColumn { get; set; }
        public string mngNoForUser { get; set; }
        public string dateOfPayDcl { get; set; }
        public string timeOfPayDcl { get; set; }
        public string title { get; set; }
        public string taxCdDefTax { get; set; }
        public string nameOfDefTax { get; set; }
        public string deadlinePayDef { get; set; }
        public string fieldNo { get; set; }
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
        public string oriPlaceNm { get; set; }
        public string tarRdcImpTax { get; set; }
        public string itemNmOTax { get; set; }
        public string cstOTaxAmt { get; set; }
        public string stdOTax { get; set; }
        public string stdOTaxUnitCd { get; set; }
        public string taxRateOfOTax { get; set; }
        public string otherTaxAmt { get; set; }
        public string prvOTaxInLaw { get; set; }
        public string reasonCd { get; set; }
        public object updatedDate { get; set; }
        public object createdDate { get; set; }
        public string cstValueCurCd { get; set; }
        public string itemName { get; set; }
        public string cstValue { get; set; }
        public List<Product> listProducts { get; set; }
        public string masterAwbNo { get; set; }
        public string flightNo { get;  set; }
        public string eiControlNo { get;  set; }
    }
    public class IDAProductRequest
    {
        public long accountId { get; set; }
        public long dclId { get; set; }
        public IDAProduct[] listProducts { get; set; }
    }
    public class IDAProduct
    {
        public long productId { get; set; }
        public long accountId { get; set; }
        public long declarationId { get; set; }

        public string hSCd { get; set; }
        public string materialCd { get; set; }

        public string dutyRate { get; set; }
        public string absTariffRate { get; set; }
        public string absDutyUnitCd { get; set; }
        public string curCdAbsDuty { get; set; }
        public string itemName { get; set; }
        public string placeOriginCd { get; set; }
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
        public string valuationNo { get; set; } 

        public valuaNo[] lsValuationNo { get; set; }

        public string tenDclLineNo { get; set; }
        public string taxExpLsNo { get; set; }
        public string taxExpLsLineNo { get; set; }
        public string rdcImpTaxCd { get; set; }
        public string rdcAmtImpTax { get; set; }
        public string oTaxTypeCd { get; set; }
        public string oTaxRdcCd { get; set; }
        public string oTaxRdcAmt { get; set; }
        public Tax[] lsOtherTax { get; set; }

    }
    public class Tax
    {
        public string oTaxTypeCd { get; set; }
        public string oTaxRdcCd { get; set; }
        public string oTaxRdcAmt { get; set; }
    }

    public class valuaNo
    {
       public string valuationNo { get; set; }
    }
    
}