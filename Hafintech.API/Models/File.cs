using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hafintech.API.Models
{
    public class File
    {
        public long FileID { get; set; }
        public string FilePath { get; set; }
        public int Type { get; set; }
        public long DeclarationID { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}