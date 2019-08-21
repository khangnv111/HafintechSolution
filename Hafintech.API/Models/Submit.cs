namespace Hafintech.API.Models
{
    public class Submit
    {
        public long declarationId { get; set; }
        public string dclNo { get; set; }
        public string attachmentNo { get; set; }
        public string appPhoneNo { get; set; }
        public string eiControlNo { get; set; }
        public string remarks { get; set; }
        public string amendDclNo { get; set; }
        public string cargoClsCd { get; set; }
        public string cargoNo { get; set; }
        public string eleInvRecNo { get; set; }
        public int id { get; set; }
        public int status { get; set; }
        public int sigAccId { get; set; }
        public string endRecvDate { get; set; }
        public string startRecvDate { get; set; }
        public string confirmOfDcl { get; set; }
        public string startCreatedDate { get; set; }
        public string endCreatedDate { get; set; }
        public int count { get; set; } = 100;
        public int page { get; set; }
        public string cstOffice { get; set; }
        public int businessId { get; set; }
        public string btDclId { get; set; }
        public string btDclNo { get; set; }
    }
}