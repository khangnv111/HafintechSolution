using System;
using System.ComponentModel.DataAnnotations;

namespace Hafintech.API.Models
{
    public class RegisterViewModel
    {
        [Required(ErrorMessage = "Bạn chưa nhập UserName")]
        [Display(Name = "UserName")]
        [EmailAddress(ErrorMessage = "Email không đúng định dạng")]
        public string UserName { get; set; }

        public string Identity { get; set; }
        public string TaxCode { get; set; }
        public string FullName { get; set; }
        public string ProvinceCode { get; set; }
        public string DistrictCode { get; set; }
        public string CommuneCode { get; set; }
        public string Address { get; set; }
        public string Mobile { get; set; }

        [Required(ErrorMessage = "Bạn chưa nhập mật khẩu")]
        [DataType(DataType.Password)]
        //[StringLength(100, ErrorMessage = "Mật khẩu giới hạn từ 6 đến 18 ký tự.", MinimumLength = 6)]
        [Display(Name = "Mật khẩu")]
        public string Password { get; set; }
    }

    public class UpdateViewModel
    {
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

        public string IdentityImgPath1 { get; set; }
        public string IdentityImgPath2 { get; set; }
        public string PasspostID { get; set; }
        public string PassportImgPath { get; set; }
        public int Gender { get; set; }
        public DateTime BirthDay { get; set; }
        public DateTime DateReleased { get; set; }
        public string PlaceReleased { get; set; }

    }
}