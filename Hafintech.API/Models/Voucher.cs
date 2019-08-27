namespace Hafintech.API.Models
{
    public class Voucher
    {
        public int? voucherId { get; set; }
        public string dclId { get; set; }
        public int? accountId { get; set; }
        public Agent Agent { get; set; }
        public Importer Importer { get; set; }
        public Declarationdocument DeclarationDocument { get; set; }
        public Additionaldocument[] AdditionalDocuments { get; set; }
        public Billoflading[] BillOfLadings { get; set; }
        public string issuer { get; set; }
        public string reference { get; set; }
        public string issue { get; set; }
        public int? function { get; set; }
        public string issueLocation { get; set; }
        public string status { get; set; }
        public string customsReference { get; set; }
        public string acceptance { get; set; }
        public string declarationOffice { get; set; }
        public int? finalYear { get; set; }
        public int? type { get; set; }
        public int? unit { get; set; }
        public License[] Licenses { get; set; }
        public ContractDocument[] ContractDocuments { get; set; }
        public CertificateOfOrigin[] CertificateOfOrigins { get; set; }
        public CommercialInvoice[] CommercialInvoices { get; set; }

        public int? createdAccId { get; set; }
        public int? sigAccId { get; set; }
        public int? acceptAccId { get; set; }
        public int? agencyId { get; set; }
        public int? businessId { get; set; }
        public int? initType { get; set; }
    }
    public class Container
    {
        public string issuer { get; set; }
        public string reference { get; set; }
        public string issue { get; set; }
        public int? function { get; set; }
        public string issueLocation { get; set; }
        public string status { get; set; }
        public string customsReference { get; set; }
        public string acceptance { get; set; }
        public string declarationOffice { get; set; }
        public Agent Agent { get; set; }
        public Importer Importer { get; set; }
        public Declarationdocument DeclarationDocument { get; set; }
        public Additionaldocument2 AdditionalDocument { get; set; }
        public Attachedfile AttachedFile { get; set; }


        public int? voucherId { get; set; }
        public string dclId { get; set; }
        public int? accountId { get; set; }

        public int? createdAccId { get; set; }
        public int? sigAccId { get; set; }
        public int? acceptAccId { get; set; }
        public int? agencyId { get; set; }
        public int? businessId { get; set; }
        public int? initType { get; set; }
    }

    public class CertificateOfOrigin
    {
        public int? id { get; set; }
        public int? voucherId { get; set; }
        public Additionaldocument1 AdditionalDocument { get; set; }
        public Attachedfile AttachedFile { get; set; }
        public string reference { get; set; }
        public string type { get; set; }
        public string issuer { get; set; }
        public string issue { get; set; }
        public string issueLocation { get; set; }
        public string representative { get; set; }
    }



    public class ContractDocument
    {
        public int? id { get; set; }
        public int? voucherId { get; set; }
        public Additionalinformation AdditionalInformation { get; set; }
        public Attachedfile AttachedFile { get; set; }
        public string reference { get; set; }
        public string issue { get; set; }
        public string expire { get; set; }
        public string totalValue { get; set; }
    }

    public class CommercialInvoice
    {
        public int? id { get; set; }
        public int? voucherId { get; set; }
        public Additionaldocument1 AdditionalDocument { get; set; }
        public Attachedfile AttachedFile { get; set; }
        public string reference { get; set; }
        public string issue { get; set; }
    }




    public class Agent
    {
        public string identity { get; set; }
        public string name { get; set; }
        public string status { get; set; }
    }

    public class Importer
    {
        public string identity { get; set; }
        public string name { get; set; }
    }

    public class Declarationdocument
    {
        public string reference { get; set; }
        public string issue { get; set; }
        public string natureOfTransaction { get; set; }
        public string declarationOffice { get; set; }
        public string isExportImport { get; set; }
        public string clearance { get; set; }
        public string declarationOfficeControl { get; set; }
        public string transportation { get; set; }
        public string startDateOfTransport { get; set; }
        public string arrivalDateOfTransport { get; set; }
    }

    public class Additionaldocument
    {
        public int? id { get; set; }
        public int? voucherId { get; set; }
        public Attachedfile AttachedFile { get; set; }
        public string reference { get; set; }
        public string description { get; set; }
        public string issue { get; set; }
        public string issuer { get; set; }
        public string issueLocation { get; set; }
        public string content { get; set; }
        public string hour { get; set; }
        public int? type { get; set; }
        public Additionaldocument2 AdditionalDocument { get; set; }
    }
    public class Additionaldocument2
    { 
        public string content { get; set; }
        //public int type { get; set; }
    }

    public class Attachedfile
    {
        public string fileName { get; set; }
        public string content { get; set; }
    }

    public class Additionaldocument1
    {
        public string reference { get; set; }
        public string description { get; set; }
        public string issue { get; set; }
        public string issueLocation { get; set; }
        public string content { get; set; }
        public string hour { get; set; }
    }



    public class Billoflading
    {
        public int? id { get; set; }
        public int? voucherId { get; set; }
        public Additionaldocument1 AdditionalDocument { get; set; }
        public Attachedfile AttachedFile { get; set; }
        public string reference { get; set; }
        public string issue { get; set; }
        public string issueLocation { get; set; }
        public string transitLocation { get; set; }
        public int? category { get; set; }
    }



    public class License
    {
        public int? id { get; set; }
        public int? voucherId { get; set; }
        public Additionalinformation AdditionalInformation { get; set; }
        public Attachedfile AttachedFile { get; set; }
        public string issuer { get; set; }
        public string reference { get; set; }
        public string issue { get; set; }
        public string issueLocation { get; set; }
        public string category { get; set; }
        public string expire { get; set; }
    }

    public class Additionalinformation
    {
        public string content { get; set; }
    }
}