namespace Hafintech.API.Models.Agency
{
    public class Agency
    {
        public string taxIdNumber { get; set; }
        public string name { get; set; }
        public string passWord { get; set; }
        public string address { get; set; }
        public string legalRepre { get; set; }
        public string zipCode { get; set; }
        public string fax { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public int isAgency { get; set; }
    }

    public class LoginRequest
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class UpdateRequest
    {
        public int businessId { get; set; }
        public string cusCode { get; set; }
        public string cusCodeImport { get; set; }
        public string cusCodeExport { get; set; }
        public string cusUrl { get; set; }
        public string cusPassword { get; set; }
        public string cusAccessKey { get; set; }
        public string numberCert { get; set; }
        public string authorityCert { get; set; }
        public string subjectAuthen { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public string publicKey { get; set; }
        public string cusUserId { get; set; }
        public string cusTerminalId { get; set; }
    }

    public class Business
    {
        public int businessId { get; set; }
        public string taxIdNumber { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string fax { get; set; }
        public string website { get; set; }
        public int? parentId { get; set; }
        public string cusCode { get; set; }
        public string cusCodeImport { get; set; }
        public string cusCodeExport { get; set; }
        public string legalRepre { get; set; }
        public string zipCode { get; set; }
        public int? signMethod { get; set; }
        public int? status { get; set; }
        
    }

    public class Personal
    {
        public int personalId { get; set; }
        public string name { get; set; }
        public string birthday { get; set; }
        public int gender { get; set; }
        public string passport { get; set; }
        public string passportImage { get; set; }
        public string identity { get; set; }
        public string identityDate { get; set; }
        public string identityPlace { get; set; }
        public string identityImageFront { get; set; }
        public string identityImageBack { get; set; }
        public string province { get; set; }
        public string district { get; set; }
        public string address { get; set; }
        public int parentId { get; set; }
        public string email { get; set; }
        public string phoneNumber { get; set; }
        public string password { get; set; }
        public int? type { get; set; } = null;
        public int? permitGroup { get; set; } = null;
        public int? status { get; set; } = null;

        public string startCreatedDate { get; set; }
        public string endCreatedDate { get; set; }
        
    }
}