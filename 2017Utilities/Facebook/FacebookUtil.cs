using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using _2017Utilities.Log;

namespace _2017Utilities.Facebook
{
    public class FacebookUtil
    {
        public static FBAccount GetFBAccount(string UserInformation)
        {
            try
            {
                var FacebookResponseData = JObject.Parse(UserInformation.ToString());
                if (FacebookResponseData["email"] != null && FacebookResponseData["id"] != null )
                {
                    var FacebookId = (string)FacebookResponseData["id"];
                    var Name = (string)FacebookResponseData["name"];
                    //var FirstName = (string)FacebookResponseData["first_name"];
                    //var LastName = (string)FacebookResponseData["last_name"];
                    //var Link = (string)FacebookResponseData["link"];
                    var Email = (string)FacebookResponseData["email"];
                    //var Gender = (string)FacebookResponseData["gender"] == "male" ? "1" : "0";
                    //CultureInfo culture = new CultureInfo("en-US");
                    //DateTime Birthday = Convert.ToDateTime((string)FacebookResponseData["birthday"], culture);
                    //var Verify = "0";
                    //DateTime updateTime = Convert.ToDateTime((string)FacebookResponseData["update_time"], culture);

                    var FbAccount = new FBAccount(Convert.ToInt64(FacebookId), Name, Email);

                    return FbAccount;
                }

                return new FBAccount();
            }
            catch (Exception exx)
            {
                NLogManager.PublishException(exx);
                return new FBAccount();
            }
        }
    }
}
