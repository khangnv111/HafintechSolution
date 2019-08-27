using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hafintech.API.Models
{
    public class SignedData2
    {
        public long? dclId { get; set; }
        public string dclNo { get; set; }
        public int status { get; set; }
        public string data { get; set; }
        public string signature { get; set; }
        public string publicKey { get; set; }
        public bool isSendFile  { get; set; }
        public bool isSign  { get; set; }
    }

    public class SignedDataVoucher
    {
        public long voucherId { get; set; }
        public string data { get; set; }
        public string signature { get; set; }
        public string certInfo { get; set; }
        public string reference  { get; set; }
        public string issuer  { get; set; }
        public string function  { get; set; }
    }
}