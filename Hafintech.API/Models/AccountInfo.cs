using System;

namespace Hafintech.API.Models
{
    public class AccountInfo
    {
        public int AccountID { get; set; }
        public string UserName { get; set; }
        public string Identity { get; set; }
        public string TaxCode { get; set; }
        public string FullName { get; set; }
        public string ProvinceCode { get; set; }
        public string DistrictCode { get; set; }
        public string CommuneCode { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public int? Gender { get; set; }
        public string Gmail { get; set; }
        public string Zalo { get; set; }
        public string FacebookID { get; set; }
        public int? SourceID { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? VerifyEmailStatus { get; set; }
        public int? VerifyIdentityStatus { get; set; }
        public int? VerifyMobileStatus { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime? Birthday { get; set; }
        public string IdentityImgPath1 { get; set; }
        public string IdentityImgPath2 { get; set; }
        public string PassportID { get; set; }
        public string PassportImgPath { get; set; }

        public DateTime? DateReleased { get; set; }
        public string PlaceReleased { get; set; }
        public int? Type { get; set; }
    }



    public class AccountInfoJava
    {
        public int accountId { get; set; }
        public string userName { get; set; }
        public string mobile { get; set; }
        public string fullName { get; set; }
        public string password { get; set; }
        public string identity { get; set; }
        public DateTime? dateReleased { get; set; }
        public string placeReleased { get; set; }
        public string idenImgPath1 { get; set; }
        public string idenImgPath2 { get; set; }
        public string passportId { get; set; }
        public string passpoImgPath { get; set; }
        public int? status { get; set; }
        public string taxCode { get; set; }
        public string provinceCode { get; set; }
        public string districtCode { get; set; }
        public string communeCode { get; set; }
        public string address { get; set; }
        public DateTime? birthday { get; set; }
        public int? gender { get; set; }
        public string gmail { get; set; }
        public string zalo { get; set; }
        public string facebookId { get; set; }
        public int? sourceId { get; set; }
        public DateTime? createdDate { get; set; }
        public DateTime? updatedDate { get; set; }
        public int? vrfEmailStatus { get; set; }
        public int? vrfMobiStatus { get; set; }
        public int? vrfIdentStatus { get; set; }
    }
}