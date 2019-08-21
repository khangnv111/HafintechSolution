using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017Utilities.StringUtil
{
    public class StringUtil
    {
        public StringUtil()
        {
        }

        public static string FormatMoney(long totalValue)
        {
            string str = totalValue.ToString("C0", CultureInfo.CurrentCulture).Replace("$", "").Replace(",", ".");
            return str;
        }

        public static string MaskUserName(string username)
        {
            string str;
            if (!string.IsNullOrEmpty(username))
            {
                int length = username.Length;
                if (length > 10)
                {
                    username = string.Format("{0}***", username.Substring(0, 8));
                }
                else if (length > 6)
                {
                    username = string.Format("{0}***", username.Substring(0, length - 3));
                }
                else if (length <= 3)
                {
                    username = string.Format("{0}***", username.Substring(0, 1));
                }
                else
                {
                    username = string.Format("{0}***", username.Substring(0, 3));
                }
                str = username;
            }
            else
            {
                str = "";
            }
            return str;
        }
    }
}
