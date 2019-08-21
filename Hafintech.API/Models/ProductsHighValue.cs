namespace Hafintech.API.Models
{
    public class ProductsHighValue
    {
        public int accountId { get; set; }
        public long declarationId { get; set; }
        public string productCode { get; set; }
        public string privateCode { get; set; }
        public string nplcode { get; set; }
        public double taxRate { get; set; }
        public long absoluteTax { get; set; }
        public string description { get; set; }
        public string countryCode { get; set; }
        public string importTaxCode { get; set; }
        public string outOfQoataCode { get; set; }
        public int quantity { get; set; }
        public double weight { get; set; }
        public string weightUnitCode { get; set; }
        public long value { get; set; }
        public long price { get; set; }
        public long taxableValue { get; set; }
        public int adjusmentIndex { get; set; }
        public int tempIREIIndex { get; set; }
        public int frImpTaxCtgNo { get; set; }
        public int corresRowIndex { get; set; }
        public string deductCode { get; set; }
        public long deductTax { get; set; }
        public string otherTax { get; set; }
    }
}