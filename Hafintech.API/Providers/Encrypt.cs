using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace Hafintech.API.Providers
{
    public class Encrypt
    {
        public Encoding BaseEncoding { get; set; }
        /// <summary>
        /// Chuyển đổi string thành Base64Encoding string để gửi đi
        /// </summary>
        /// <param name="sendData"></param>
        /// <returns></returns>
        public string ConvertToBase64(string sendData)
        {
            //byte[] bytesData = this.BaseEncoding.GetBytes(sendData);
            //string base64 = Convert.ToBase64String(bytesData);
            //return base64;
            byte[] byt = System.Text.Encoding.UTF8.GetBytes(sendData);

            // convert the byte array to a Base64 string

            string strModified = Convert.ToBase64String(byt);
            return strModified;
        }
    }
}