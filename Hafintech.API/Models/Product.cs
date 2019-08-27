using System;

namespace Hafintech.API.Models
{
    public class Product
    {
        public int productId { get; set; }
        public int accountId { get; set; }
        public int declarationId { get; set; }
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
        public dynamic lsValuationNo { get; set; }
        public string tenDclLineNo { get; set; }
        public string taxExpLsNo { get; set; }
        public string taxExpLsLineNo { get; set; }
        public string rdcImpTaxCd { get; set; }
        public string rdcAmtImpTax { get; set; }
        public dynamic lsOtherTax { get; set; }
        public string oTaxRdcCd { get; set; }
        public string oTaxRdcAmt { get; set; }

    }

    public class ProductsLowValue
    {
        public long productId { get; set; }
        public int accountId { get; set; }
        public string productName { get; set; }
        public long declarationId { get; set; }
        public int productType { get; set; }
        public string countryCode { get; set; }
        public int? quantity { get; set; }
        public double? weight { get; set; }
        public double? taxRate { get; set; }
        public long? taxMinFee { get; set; }
        public string unit { get; set; }
        public long price { get; set; }
        public DateTime? createdDate { get; set; }
    }
}