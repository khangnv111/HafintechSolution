using _2017Utilities.Security;
using System;
using System.Configuration;
using System.Web.Configuration;

namespace _2017Utilities.Config
{
    public sealed class Config
    {
        private static readonly Config instance = new Config();

        private readonly string _SysPartnerKey;

        private readonly string _LogConnectionString;
        private readonly string _HatecoAPIConnectionString;

        private readonly string _UrlRoot = ConfigurationManager.AppSettings["UrlRoot"];

        private readonly string _UrlRootAPI = ConfigurationManager.AppSettings["UrlRootAPI"];

        Config()
        {
            bool encrypted = true;
            bool production = true;

            string encryptedStr = ConfigurationManager.AppSettings["encrypted"];
            if (!string.IsNullOrEmpty(encryptedStr))
            {
                encrypted = Boolean.Parse(encryptedStr);
            }
            string productionStr = ConfigurationManager.AppSettings["production"];
            if (!string.IsNullOrEmpty(productionStr))
            {
                production = Boolean.Parse(productionStr);
            }

            _SysPartnerKey = GetConnStr("SysPartnerKey", encrypted);
            _LogConnectionString = GetConnStr("LogConnectionString", encrypted);
            _HatecoAPIConnectionString = GetConnStr("HatecoAPIConnectionString", encrypted);

            if (!encrypted)
            {
                if (production)
                {
                    Configuration config = WebConfigurationManager.OpenWebConfiguration("~");
                    AppSettingsSection appSettings = (AppSettingsSection)config.GetSection("appSettings");
                    ConnectionStringsSection connectStrings = (ConnectionStringsSection)config.GetSection("connectionStrings");

                    UpdateAppSettings(appSettings, "encrypted", "true");

                    config.Save();
                    ConfigurationManager.RefreshSection("connectionStrings");
                }
            }
        }

        public static string UrlRootAPI
        {
            get { return instance._UrlRootAPI; }
        }

        public static string UrlRoot
        {
            get { return instance._UrlRoot; }
        }

        public static string SysPartnerKey
        {
            get
            {
                return instance._SysPartnerKey;
            }
        }
        public static string HatecoAPIConnectionString
        {
            get
            {
                return instance._HatecoAPIConnectionString;
            }
        }
        public static string LogConnectionString
        {
            get
            {
                return instance._LogConnectionString;
            }
        }
        public static Config Instance
        {
            get
            {
                return instance;
            }
        }

        public static string GetConnStr(string name)
        {
            return GetConnStr(name, true);
        }

        public static string GetConnStr(string name, bool encrypted)
        {
            string connStr = ConfigurationManager.ConnectionStrings[name] == null ? "" : ConfigurationManager.ConnectionStrings[name].ConnectionString;

            if (!encrypted)
            {
                return connStr;
            }

            try
            {
                return connStr == "" ? "" : new RijndaelEnhanced("pay", "@1B2c3D4e5F6g7H8").Decrypt(connStr);
            }
            catch
            {
                return connStr;
            }
        }

        public static void UpdateAppSettings(AppSettingsSection appSettings, string key, string value)
        {
            if (appSettings.Settings[key] == null)
            {
                return;
            }

            appSettings.Settings[key].Value = value;
        }

        public static void UpdateConnectionStrings(ConnectionStringsSection connectStrings, string name, bool encrypt)
        {
            if (connectStrings.ConnectionStrings[name] == null)
            {
                return;
            }

            string connectionString = connectStrings.ConnectionStrings[name].ConnectionString;
            if (encrypt)
            {
                connectionString = new RijndaelEnhanced("pay", "@1B2c3D4e5F6g7H8").Encrypt(connectionString);
            }

            connectStrings.ConnectionStrings[name].ConnectionString = connectionString;
        }

        public static string GetAppSettings(string key, string defaultValue = "")
        {
            string value = defaultValue;

            if (string.IsNullOrEmpty(key))
                return value;

            try
            {
                value = ConfigurationManager.AppSettings[key];
            }
            catch { }

            return value;
        }

        public static int GetIntegerAppSettings(string key, int defaultValue = 0)
        {
            int value = defaultValue;

            if (string.IsNullOrEmpty(key))
                return value;

            try
            {
                value = Int32.Parse(ConfigurationManager.AppSettings[key]);
            }
            catch { }

            return value;
        }
        
        public static string RijndaelEnhanced_Encrypt(string roles)
        {
            string str = "";
            str = new RijndaelEnhanced("hateco", "@1B2c3D4e5F6g7H8").Encrypt(roles);
            return str;
        }

        public static string RijndaelEnhanced_Decrypt(string roles)
        {
            string str = "";
            str = new RijndaelEnhanced("hateco", "@1B2c3D4e5F6g7H8").Decrypt(roles);
            return str;
        }
    }
}