using System.Collections.Generic;

namespace Hafintech.API.Models
{
    public class AMA
    {
        public int? id { get; set; } = null;
        public int accountId { get; set; }
        public string amendDclNo { get; set; }
        public string cstOffice { get; set; }
        public string cstSubSection { get; set; }
        public string ieClsf { get; set; }
        public string dclNo { get; set; }
        public string dclKindCd { get; set; }
        public string ieDclDate { get; set; }
        public string dateOfPermit { get; set; }
        public string timeLimReIE { get; set; }
        public string dclrCode { get; set; }
        public string dclrName { get; set; }
        public string dclrPostCode { get; set; }
        public string addrDclr { get; set; }
        public string dclrPhoneNo { get; set; }
        public string amendDlcReaCd { get; set; }
        public string curCdTaxAmt { get; set; }
        public string bankPayCd { get; set; }
        public string bankPayIssYear { get; set; }
        public string bankPaySign { get; set; }
        public string bankPayNo { get; set; }
        public string extPayDueCd { get; set; }
        public string secSupplBankCd { get; set; }
        public string issuedYear { get; set; }
        public string secBankSign { get; set; }
        public string secNo { get; set; }
        public string curCdBTaxAmend { get; set; }
        public string curExRateBTaxA { get; set; }
        public string curCdATaxAmend { get; set; }
        public string curExRateATaxA { get; set; }
        public string eiControlNo { get; set; }
        public string noteBTaxAmend { get; set; }
        public string noteATaxAmend { get; set; }
        public List<AMAProduct> listProducts { get; set; }
    }

    public class AMAProduct
    {
        public string fieldNoOrgDcl { get; set; }
        public string iNameBTaxAmend { get; set; }
        public string iNameATaxAmend { get; set; }
        public string plcOriCdBTaxAm { get; set; }
        public string plcOriCdATaxAm { get; set; }
        public string stTaxValBTaxAm { get; set; }
        public string stQuanBTaxAm { get; set; }
        public string mUCOQuanBTaxAm { get; set; }
        public string hsCodeBTaxAm { get; set; }
        public string taxRateBTaxAm { get; set; }
        public string taxAmtBTaxAm { get; set; }
        public string stTaxValATaxAm { get; set; }
        public string stQuanATaxAm { get; set; }
        public string mUCOStQATaxAm { get; set; }
        public string hsCodeATaxAm { get; set; }
        public string taxRateATaxAm { get; set; }
        public string taxAmtATaxAm { get; set; }
        public List<Lsproreinfo> lsProREInfo { get; set; }
    }

    public class Lsproreinfo
    {
        public string stTaxValBTaxAm { get; set; }
        public string stQuanBTaxAm { get; set; }
        public string msBOTaxColAm { get; set; }
        public string clsfCdBTaxAm { get; set; }
        public string tRateBTaxColAm { get; set; }
        public string tAmtBOTColAm { get; set; }
        public string stTaxValTCAm { get; set; }
        public string stQuanAOTCAm { get; set; }
        public string msUCSQAOTCAm { get; set; }
        public string clsfCdAOTColAm { get; set; }
        public string tRateAOTColAm { get; set; }
        public string tAmtAOTColAm { get; set; }
    }
}