using System.Collections.Generic;

namespace Hafintech.API.Models
{
    public class Rootobject<T>
    {
        public int code { get; set; }
        public string message { get; set; }
        public CResults<T> results { get; set; }
    }

    public class CResults<T>
    {
        public int? Total { get; set; }
        public T Accounts { get; set; }
        public T ListAccounts { get; set; }
        public List<T> ListDeclarations { get; set; }
        public T Declarations { get; set; }
        public T DeclarationsLowValues { get; set; }
        public T DeclarationsHighValues { get; set; }
        public T InvoiceTypes { get; set; }
        public T InvoiceAttachs { get; set; }
        public T InsuranceFeeCodes { get; set; }
        public T ImportLicences { get; set; }
        public T InvoiceValues { get; set; }
        public T MethodPaids { get; set; }
        public T Methods { get; set; }
        public T OrganizationTypes { get; set; }
        public T PlaceLoadings { get; set; }
        public T UnloadingPorts { get; set; }
        public T InvoiceValueConditions { get; set; }
        public T InvoiceValueTypes { get; set; }
        public T AdjustmentCodes { get; set; }
        public T Banks { get; set; }
        public T Countrys { get; set; }
        public T Department { get; set; }
        public T Documments { get; set; }
        public T AbsoluteDutyRateUnits { get; set; }
        public T AdjustmentDemarcationNames { get; set; }
        public T GroupTypes { get; set; }
        public T GuaranteeReasonCodes { get; set; }
        public T TransportMethods { get; set; }
        public T WeightUnits { get; set; }
        public T WaitingPlaces { get; set; }
        public T TransportPlaces { get; set; }
        public T TransportFeeCodes { get; set; }
        public T Transportations { get; set; }
        public T Transactions { get; set; }
        public T TaxApplys { get; set; }
        public T SealUnits { get; set; }
        public T Results { get; set; }
        public T RateConfigs { get; set; }
        public T Directions { get; set; }
        public T ProductClassificationCodes { get; set; }
        public T ProductsLowValues { get; set; }
        public T AdjNames { get; set; }
        public T TaxExpirations { get; set; }
        public T Products { get; set; }
        public T Customs { get; set; }
        public T AccountOtp { get; set; }
        public T CargoClassifications { get; set; }
        public T ClassificationAttachments { get; set; }
        public T Attachment { get; set; }
        public T ClassificationOrganizations { get; set; }
        public T CustomsOffices { get; set; }
        public T CustomsSubSections { get; set; }
        public T DeclarationKinds { get; set; }
        public T ExtendingPaymentDueDates { get; set; }
        public T FreightDemarcations { get; set; }
        public T ImportTaxClassifications { get; set; }
        public T AdjustmentDemarcations { get; set; }

        public T CustomsWarehouses { get; set; }
        public T MeansOfTransportations { get; set; }
        public T PieceUnits { get; set; }
        public T LoadingVessels { get; set; }
        public T LoadingLocations { get; set; }
        public T ResultCodeOfInspections { get; set; }
        public T PermitTypes { get; set; }

        public T InvoiceClassifications { get; set; }
        public T TermOfPayments { get; set; }
        public T InvoicePriceKinds { get; set; }
        public T InvoicePriceConditions { get; set; }
        public T TaxPayers { get; set; }
        public T Reasons { get; set; }
        public T LocationTransports { get; set; }
        public T ReductionImportTaxs { get; set; }
        public T QuantityUnits { get; set; }
        public T ValuationDemarcations { get; set; }
        public T InsuranceDemarcations { get; set; }
        public T Currencys { get; set; }
        public T ListProducts { get; set; }
        public T error { get; set; }
        public T TaxAntiDumpingDuty { get; set; }
        public T TaxSpecialConsumption { get; set; }
        public T TaxEnvironment { get; set; }
        public T TaxValueAdded { get; set; }
        public T TaxAntiDiscrimination { get; set; }
        public T Messages { get; set; }
        public T Business { get; set; }
        public T Personal { get; set; }
        public T Sigture { get; set; }
        public T Personals { get; set; }
        public T ListBusiness { get; set; }
        public T ListPersonal { get; set; }
        public T OutputCommonSegment { get; set; }
        public T AmendedTaxInfomation { get; set; }
        public T ExportDeclaration { get; set; }
        public T ListExportProduct { get; set; }
        public T ExportProduct { get; set; }
        public T ListExportDeclaration { get; set; }
        public T GuideInformations { get; set; }
        public T ApplicationProcedureType { get; set; }
        public T CustomsDepartment { get; set; }
        public T Comment { get; set; }
        public T Security { get; set; }
        public T Signature { get; set; }
        public T ListAttachment { get; set; }
        public T ListOutputCommonSegment { get; set; }
        public T ListAmendedTaxInfomation { get; set; }
        public T Ola { get; set; }
        public T ListOla { get; set; }
        public T Voucher { get; set; }
        public T ListVoucher { get; set; }
        public T EDI_String { get; set; }
        public T ExportDeclarations { get; set; }
        public T Data { get; set; }

        public T Dictionaries { get; set; }
        public T QueryResultModel { get; set; }
        public T Consignments { get; set; }
        public T Transaction { get; set; }
        public T INVOICE_PRICE { get; set; }
        public T WeighInfo { get; set; }
        public T ExportKind { get; set; }
        public T TransactionStatistics { get; set; }

        public T Mic { get; set; }
        public T ListMic { get; set; }
        public T listResult { get; set; }
        public T totalResult { get; set; }
    }
}