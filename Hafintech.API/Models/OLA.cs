namespace Hafintech.API.Models
{
    public class OLA
    {
        public string confirmOfDcl { get; set; }
        public string processingType { get; set; }
        public int btDclId { get; set; }
        public string accountId { get; set; }
        public string btDclNo { get; set; }
        public string ieIndication { get; set; }
        public string cstOffice { get; set; }
        public string transCd { get; set; }
        public string transNm { get; set; }
        public string transAddress { get; set; }
        public string transCtrctNo { get; set; }
        public string dateOfTrsCtrct { get; set; }
        public string expDateOfTrans { get; set; }
        public string meansOfTrsCd { get; set; }
        public string transPurposeCd { get; set; }
        public string transType { get; set; }
        public string esSdateOfTrans { get; set; }
        public string esStimeOfTrans { get; set; }
        public string esFdateOfTrans { get; set; }
        public string esFtimeOfTrans { get; set; }
        public string deptLocTransA { get; set; }
        public string deptLocTransCd { get; set; }
        public string deptLocTransP { get; set; }
        public string deptLocTransNm { get; set; }
        public string arrLocBdTranBa { get; set; }
        public string arrLocBtransCd { get; set; }
        public string arrLocBtransPd { get; set; }
        public string arrLocNmBtrans { get; set; }
        public string route { get; set; }
        public string typeOfSec { get; set; }
        public string secSupplBankCd { get; set; }
        public string issuedYear { get; set; }
        public string secBankSign { get; set; }
        public string secNo { get; set; }
        public string amountOfSec { get; set; }
        public string remarks1 { get; set; }
        public LsCargoNoOLA[] lsCargoNo { get; set; }
        public Lsexpdcl[] lsExpDcl { get; set; }
        public Lscofrcarpkgno[] lsCoFrCarPkgNo { get; set; }
    }

    public class LsCargoNoOLA
    {
        public int id { get; set; }
        public string cargoNo { get; set; }
        public string issueDateOfBl { get; set; }
        public string goodsDes { get; set; }
        public string hSCd { get; set; }
        public string marksAndNos { get; set; }
        public string dFstStkBndWrh { get; set; }
        public string prodBndFactId { get; set; }
        public string placeOriginMan { get; set; }
        public string deptLocOfCargo { get; set; }
        public string arrLocOfCargo { get; set; }
        public string typeOfMftCargo { get; set; }
        public string transEquipCd { get; set; }
        public string vesselNm { get; set; }
        public string arrDateOfCargo { get; set; }
        public string imperCd { get; set; }
        public string imperNm { get; set; }
        public string addressOfImp { get; set; }
        public string experCd { get; set; }
        public string experNm { get; set; }
        public string addressOfExp { get; set; }
        public string trustorCd { get; set; }
        public string trustorNm { get; set; }
        public string trustorAddr { get; set; }
        public Lsotherlawcode[] lsOtherLawCode { get; set; }
        public string qtt { get; set; }
        public string cdUnitOfM { get; set; }
        public string cargoWeigGrs { get; set; }
        public string weigUnitCdGrs { get; set; }
        public string capacity { get; set; }
        public string capacityUnitCd { get; set; }
        public string price { get; set; }
        public string curTypeCd { get; set; }
        public Lsremarkscode[] lsRemarksCode { get; set; }
        public string permitNo { get; set; }
        public string permitDate { get; set; }
        public string expDatePermit { get; set; }
        public string remarks2 { get; set; }
    }

    public class Lsremarkscode
    {
        public string remarkCdForDmg { get; set; }
    }

    public class Lsexpdcl
    {
        public string expDclNo { get; set; }
    }

    public class Lscofrcarpkgno
    {
        public string CoFrCarPkgNo { get; set; }
        public string lineNoOnDcl { get; set; }
        public Lssealno[] lsSealNo { get; set; }
    }

    public class Lssealno
    {
        public string sealNo { get; set; }
    }
}