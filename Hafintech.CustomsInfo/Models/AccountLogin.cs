using System.ComponentModel.DataAnnotations;

namespace Hafintech.CustomsInfo.Models
{
    public class AccountLogin
    {
        [Required]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public bool IsCaptcha { get; set; }
        public string Captcha { get; set; }
        public int ResponseCode { get; set; }
        public string Description { get; set; }
        public string Verify { get; set; }
        public int UserID { get; set; }
    }

    public class Accounts
    {
        public long AccountID { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string AccessToken { get; set; }
    }
}