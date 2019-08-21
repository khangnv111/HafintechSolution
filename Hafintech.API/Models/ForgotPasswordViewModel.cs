using System.ComponentModel.DataAnnotations;

namespace Hafintech.API.Models
{
    public class ForgotPasswordViewModel
    {
        [Required(ErrorMessage = "Bạn chưa nhập Email")]
        [EmailAddress(ErrorMessage = "Chưa đúng định dang Email")]
        [Display(Name = "Email")]
        public string Email { get; set; }
    }
}