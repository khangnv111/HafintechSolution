namespace Hafintech.API.Models
{
    public class HYS
    {
        public long? id { get; set; }
        public string cstSubSection { get; set; }
        public string appProType { get; set; }
        public string appPhoneNo { get; set; }
        public string eiControlNo { get; set; }
        public string remarks { get; set; }
        public int accountId { get; set; }
        public string cstOffice { get; set; }

        public object sigAccId { get; set; }
        public string initType { get; set; }
        public int agencyId { get; set; }
        public int businessId { get; set; }
        public int createdAccId { get; set; }
    }
}