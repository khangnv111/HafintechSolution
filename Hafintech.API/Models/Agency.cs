using System.Collections.Generic;

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
        public int? accountId { get; set; }
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

    public class Scan
    {
        public string fromScanDateTime { get; set; }
        public string toScanDateTime { get; set; }
        public int? scanStatus { get; set; }
        public int? payStatus { get; set; }
        public int? verifyStatus { get; set; }
        public int? orderStatus { get; set; }
        public string verifyCode { get; set; }
        public string xRayName { get; set; }
        public string scanName { get; set; }
        public string lineIn { get; set; } 
        public string lineOut { get; set; }
        public int firstResult { get; set; }
        public int maxResult { get; set; } 

    }

    public class ScanProduct
    {
        public long? id { get; set; }
        public long businessId { get; set; }
        public int isConsignment { get; set; } 
        public string regisScanDt { get; set; }
        public int atCenter { get; set; }
        public int dclType { get; set; }
        public int connectNevs { get; set; }

        //public string fileAttach { get; set; }
        //public int status { get; set; }
        //public long[] lsDclId { get; set; }
    } 

    public class ScanDecla
    {
        public long accountId { get; set; }  
        public int status { get; set; }
        public string startCreatedDate { get; set; }
        public string endCreatedDate { get; set; }

        public string dclNo { get; set; }
    }

    public class ResultImportFile
    {
        public int code { get; set; }
        public string message { get; set; }
        public object results { get; set; }
    }
}