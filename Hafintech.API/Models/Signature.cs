namespace Hafintech.API.Models
{
    public class Signature
    {
        public int? signatureId { get; set; } = null;
        public int accountId { get; set; }
        public string numberCert { get; set; }
        public string authorityCert { get; set; }
        public string subjectAuthen { get; set; }
        public object fromDate { get; set; }
        public object toDate { get; set; }
        public string publicKey { get; set; }
        public int status { get; set; }
        public string path { get; set; }
        public string terminalId { get; set; }
        public string accessKey { get; set; }
        public string userId { get; set; }
        public string password { get; set; }
        public string cusUrl { get; set; }
        public string encryptKey { get; set; }
    }
}