using System;

namespace Hafintech.API.Models
{
    public class AccountSearch
    {
        public int AccountID { get; set; }
        public string Username { get; set; }
        public string Mobile { get; set; }
        public string Password { get; set; }
        public string Identity { get; set; }

        public DateTime CreatedDate { get; set; }

        public string Address { get; set; }
        public DateTime UpdatedDate { get; set; }

        public string FullName { get; set; }
    }
}