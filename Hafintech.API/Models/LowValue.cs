using System;

namespace Hafintech.API.Models
{
    public class LowValue
    {
        public int declarationId { get; set; }
        public string declarCode { get; set; }
        public int accountId { get; set; }
        public int? firstDeclarId { get; set; }
        public int? tempDeclarId { get; set; }
        public string methodCode { get; set; }
        public string customCode { get; set; }
        public string transMethdCode { get; set; }
        public int type { get; set; }
        public int status { get; set; }
        public DateTime? dateEntry { get; set; }
        public DateTime? updatedDate { get; set; }
        public DateTime? createdDate { get; set; }
    }
}