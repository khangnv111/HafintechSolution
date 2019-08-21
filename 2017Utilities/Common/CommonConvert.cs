using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2017Utilities.Common
{
    public class CommonConvert
    {
        public int ConvertDateTimeToInt(string strDateTmp)
        {
            DateTime tmp = DateTime.Parse(strDateTmp);

            string _strYear = tmp.Year.ToString();

            string _strMonth = tmp.Month.ToString();
            if (tmp.Month < 10)
            {
                _strMonth = "0" + _strMonth;
            }

            string _strDay = tmp.Day.ToString();
            if (tmp.Day < 10)
            {
                _strDay = "0" + _strDay;
            }

            string _strTmp = _strYear + _strMonth + _strDay;
            int Dateint = int.Parse(_strTmp);

            return Dateint;
        }

        public string ConvertDateIntToDateString(int tmp)
        {
            string _strTmp = tmp.ToString();

            string _strYear = _strTmp.Substring(0, 4);
            string _strMonth = _strTmp.Substring(4, 2);
            string _strDay = _strTmp.Substring(6, 2);

            return _strYear + "/" + _strMonth + "/" + _strDay;
        }

        public string ConvertDateLongToDateString(long tmp)
        {
            string _strTmp = tmp.ToString();

            string _strYear = _strTmp.Substring(0, 4);
            string _strMonth = _strTmp.Substring(4, 2);
            string _strDay = _strTmp.Substring(6, 2);

            return _strYear + "/" + _strMonth + "/" + _strDay;
        }
    }
}
