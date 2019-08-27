using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hafintech.API.Models
{
    public class EDA
    {
        public object sigAccId { get; set; }
        public string initType { get; set; }
        public int agencyId { get; set; }
        public int businessId { get; set; }
        public int declarationId { get; set; }
        public int createdAccId { get; set; }
        public int accountId { get; set; }
        public int type { get; set; }
        public int status { get; set; }
        public object clearanStatus { get; set; }
        public string statusCode { get; set; }
        public object dclNo { get; set; }
        public string firstDclNo { get; set; }
        public string branchNoDivDcl { get; set; }
        public string noDivisDivDcl { get; set; }
        public string tentativeDclNo { get; set; }
        public string dclKindCd { get; set; }
        public string dclKindNm { get; set; }
        public string cargoClsCd { get; set; }
        public string meansOfTrsCd { get; set; }
        public string timeLimReExp { get; set; }
        public string cstOffice { get; set; }
        public string cstSubSection { get; set; }
        public string dclPlannedDate { get; set; }
        public string experCd { get; set; }
        public string experNm { get; set; }
        public string postcode { get; set; }
        public string addressOfExp { get; set; }
        public string phoneNoOfExp { get; set; }
        public string expCtrCd { get; set; }
        public string expCtrNm { get; set; }
        public object consigneeCd { get; set; }
        public object consigneeNm { get; set; }
        public string postcodeIdt { get; set; }
        public string address1street { get; set; }
        public string address2street { get; set; }
        public string address3cityNm { get; set; }
        public string countryNm { get; set; }
        public string countryCd { get; set; }
        public string plannedDeclCd { get; set; }
        public object cargoNo { get; set; }
        public string cargoPiece { get; set; }
        public string pieceUnitCd { get; set; }
        public string cargoWeigGrs { get; set; }
        public string weigUnitCdGrs { get; set; }
        public string cstWrhCd { get; set; }
        public string finalDesCd { get; set; }
        public string finalDesNm { get; set; }
        public string loadPortCd { get; set; }
        public string loadPortNm { get; set; }
        public string lPlanVesselCd { get; set; }
        public string lPlanVesselNm { get; set; }
        public string deptPlanDate { get; set; }
        public string marksAndNos { get; set; }
        public object permitType { get; set; }
        public object permitLicNo { get; set; }
        public string invClsCd { get; set; }
        public string eleInvRecNo { get; set; }
        public string invNo { get; set; }
        public string invDate { get; set; }
        public string termOfPay { get; set; }
        public string invPrcCdtCd { get; set; }
        public string invCurCd { get; set; }
        public string totalInvPrc { get; set; }
        public string invPrcKindCd { get; set; }
        public string curCdTtlTaxVal { get; set; }
        public string totalTaxVal { get; set; }
        public string clsfNonCvInVnd { get; set; }
        public string ttlPrDisTaxVal { get; set; }
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
        public object clsAttachment { get; set; }
        public object attachmentNo { get; set; }
        public string strDateTrs { get; set; }
        public object trnLocTrs { get; set; }
        public string arrDateTrnLoc { get; set; } // update
        public string strDateTrnLoc { get; set; } // update
        public string destinationTrs { get; set; }
        public string arrDateOfTrs { get; set; }
        public string notes { get; set; }
        public string etpControlNo { get; set; }
        public object vanPlcCd { get; set; }
        public string vanPlcNm { get; set; }
        public string vanPlcAddress { get; set; }
        public object containerNo { get; set; }
        public string cstInsCls { get; set; }
        public object dateCstIns { get; set; }
        public object caseTitCstIns { get; set; }
        public object contentCstIns { get; set; }
        public object coocReport { get; set; }
        public object houseAwbNo { get; set; }
        public object eiControlNo { get; set; }
        public object dclPrice { get; set; }
        public object cofSelectivity { get; set; }
        public object personName { get; set; }
        public object codpInspection { get; set; }
        public object coAlertWarning { get; set; }
        public object cocoPriceInspection { get; set; }
        public object ioiOutputRequest { get; set; }
        public object tpicnoPysicalInspection { get; set; }
        public object noPhysicalInspection { get; set; }
        public object noInspectedContainer { get; set; }
        public object ioTotalInspection { get; set; }
        public object classificationCode { get; set; }
        public object reasonCode { get; set; }
        public object ttlExpTax { get; set; }
        public object ttlExpTaxCurCd { get; set; }
        public object ttlCommission { get; set; }
        public object secAmtCurCd { get; set; }
        public object timeLimReImp { get; set; }
        public object ttlFeeShBePaid { get; set; }
        public object lsFeeInfo { get; set; }
        public string createdDate { get; set; }
        public object updatedDate { get; set; }
        public Lscargono[] lsCargoNo { get; set; }
        public Lspermit[] lsPermit { get; set; }
        public Lsdosattc[] lsDosAttc { get; set; }
        public Lstransinfo[] lsTransInfo { get; set; }
        public Lsvanplccd[] lsVanPlcCd { get; set; }
        public Lscontainerno[] lsContainerNo { get; set; }
        public Lscstin[] lsCstIns { get; set; }
        public EDAProduct[] listProducts { get; set; }
        public string cstValueCurCd { get; set; }
        public string cstValue { get; set; }
        public string itemName { get; set; }
    }
    public class EDAProductRequest
    {
        public int accountId { get; set; }
        public int declarationId { get; set; }
        public EDAProduct[] listProducts { get; set; }
    }
    public class Lscargono
    {
        public string cargoNo { get; set; }
    }

    public class Lspermit
    {
        public string permitType { get; set; }
        public string permitLicNo { get; set; }
    }

    public class Lsdosattc
    {
        public string clsAttachment { get; set; }
        public string attachmentNo { get; set; }
    }

    public class Lstransinfo
    {
        public string trnLocTrs { get; set; }
        public string arrDateTrnLoc { get; set; }
        public string strDateTrnLoc { get; set; }
        public object destinationTrs { get; set; }
        public object arrDateOfTrs { get; set; }
    }

    public class Lsvanplccd
    {
        public string vanPlcCd { get; set; }
        public object vanPlcNm { get; set; }
        public object vanPlcAddress { get; set; }
    }

    public class Lscontainerno
    {
        public string containerNo { get; set; }
    }

    public class Lscstin
    {
        public string dateCstIns { get; set; }
        public string caseTitCstIns { get; set; }
        public string contentCstIns { get; set; }
    }

    public class EDAProduct
    {
        public int productId { get; set; }
        public int accountId { get; set; }
        public int declarationId { get; set; }
        public string hscd { get; set; }
        public string cdOcom { get; set; }
        public string dutyRate { get; set; }
        public string absTariffRate { get; set; }
        public string absDutyUnitCd { get; set; }
        public string curCdAbsDuty { get; set; }
        public string itemName { get; set; }
        public string rdcExpTaxCd { get; set; }
        public string rdcAmtExpTax { get; set; }
        public string qtt1 { get; set; }
        public string qttUnitCd1 { get; set; }
        public string qtt2 { get; set; }
        public string qttUnitCd2 { get; set; }
        public string invValue { get; set; }
        public string cstValueCurCd { get; set; }
        public string cstValue { get; set; }
        public string invUnitPrice { get; set; }
        public string unitPriceCurCd { get; set; }
        public string priceQttUnit { get; set; }
        public string tenDclLineNo { get; set; }
        public string taxExpLsNo { get; set; }
        public string taxExpLsLineNo { get; set; }
        public object lsOtherLawCode { get; set; }
        public object otherLawCd { get; set; }
        public object cvalUprcCurCd { get; set; }
        public object expTaxRate { get; set; }
        public object expTaxRateInp { get; set; }
        public object expTaxAmt { get; set; }
        public object expTaxAmtCurCd { get; set; }
        public object rdcAexpTaxCuCd { get; set; }
        public object commissionUprc { get; set; }
        public object insuranceUprc { get; set; }
        public object commissionQuan { get; set; }
        public object comQuanUnitCd { get; set; }
        public object insuranceQuan { get; set; }
        public object insQuanUnitCd { get; set; }
        public object commissionAmt { get; set; }
        public object insuranceAmt { get; set; }
        public object tarRdcExpTax { get; set; }
        public object noTaxExemList { get; set; }
        public Lsotherlawcd[] lsOtherLawCd { get; set; }

    }

    public class Lsotherlawcd
    {
        public object itemNmOTax { get; set; }
        public object oTaxTypeCd { get; set; }
        public object cstOTaxAmt { get; set; }
        public object stdOTax { get; set; }
        public object stdOTaxUnitCd { get; set; }
        public object taxRateOfOTax { get; set; }
        public object otherTaxAmt { get; set; }
        public object oTaxRdcCd { get; set; }
        public object prvOTaxInLaw { get; set; }
        public object oTaxCerAmt { get; set; }
    }

}