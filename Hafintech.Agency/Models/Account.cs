using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hafintech.Agency.Models
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
        public int Gender { get; set; }
        public string Gmail { get; set; }
        public string Zalo { get; set; }
        public string FacebookID { get; set; }
        public int SourceID { get; set; }
        public DateTime CreatedDate { get; set; }
        public int VerifyEmailStatus { get; set; }
        public int VerifyIdentityStatus { get; set; }
        public int VerifyMobileStatus { get; set; }
        public DateTime UpdatedDate { get; set; }

        public DateTime Birthday { get; set; }
        public string IdentityImgPath1 { get; set; }
        public string IdentityImgPath2 { get; set; }
        public string PassportID { get; set; }
        public string PassportImgPath { get; set; }

        public DateTime DateReleased { get; set; }
        public string PlaceReleased { get; set; }
    }
}