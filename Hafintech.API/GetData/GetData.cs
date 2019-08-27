using App.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

namespace Hafintech.API.GetData
{
    public class GetData
    {
        /// <summary>
        /// PostAsync with Partner-Key in config
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="uri"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        public static async Task<T> PostAsync<T>(string uri, dynamic data, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                // var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, JsonConvert.SerializeObject(data)));
                        var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        //  client.DefaultRequestHeaders.TryAddWithoutValidation("Partner-Key", partnerCode);
                        var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false);
                        string resultContent = await result.Content.ReadAsStringAsync();
                        if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                        if (isLog)
                            NLogManager.LogMessage("Đầu ra: " + resultContent);
                        return JsonConvert.DeserializeObject<T>(resultContent);
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }



        public static async Task<T> PostAsync<T>(string uri, dynamic jsonData, string keyStr, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                NLogManager.LogMessage(string.Format("1.Đầu vào: {0}, {1}, {2}", uri, jsonData, keyStr));

                string[] keyName = keyStr.Split('|');  
                
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        using (var content =
                         new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                        {
                            for (int i = 0; i < keyName.Length; i++)
                            {
                                var name = keyName[i].ToString();
                                var propertyInfo = jsonData.GetType().GetProperty(name);
                                var value = propertyInfo.GetValue(jsonData, null);

                                NLogManager.LogMessage(string.Format("2.Đầu vào: {0}, {1}", name, value));

                                if(value != null)
                                    content.Add(new StringContent(value), name);
                            } 
                            using (
                               var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false))
                            {
                                string resultContent = await result.Content.ReadAsStringAsync();
                                if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                                if (isLog)
                                    NLogManager.LogMessage("Đầu ra: " + resultContent);
                                return JsonConvert.DeserializeObject<T>(resultContent);
                            }
                        }
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<T> PostAsyncXLS<T>(string uri, string fileAttach, string transaction, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                NLogManager.LogMessage(string.Format("Đầu vào: {0}, {1}, {2}", uri, fileAttach, transaction));
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        using (var content =
                         new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                        {
                            content.Add(new StringContent(fileAttach), "fileAttach");
                            content.Add(new StringContent(transaction), "transaction");
                            using (
                               var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false))
                            {
                                string resultContent = await result.Content.ReadAsStringAsync();
                                if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                                if (isLog)
                                    NLogManager.LogMessage("Đầu ra: " + resultContent);
                                return JsonConvert.DeserializeObject<T>(resultContent);
                            }
                        }
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<T> PostAsyncWithFileAccount<T>(string uri, string accountId, HttpFileCollection fileData, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                NLogManager.LogMessage(string.Format("Đầu vào: {0}, accountId: {1}", uri, accountId)); 
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        using (var content =
                         new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                        {
                            for (var i = 0; i < fileData.Count; i++)
                            {
                                content.Add(new StreamContent(fileData[i].InputStream), "fileAttach", fileData[i].FileName);
                            }
                            content.Add(new StringContent(accountId), "accountId"); 
                            using (
                               var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false))
                            {
                                string resultContent = await result.Content.ReadAsStringAsync();
                                if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                                if (isLog)
                                    NLogManager.LogMessage("Đầu ra: " + resultContent);
                                return JsonConvert.DeserializeObject<T>(resultContent);
                            }
                        }
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<T> PostAsyncWithFile<T>(string uri, string jsonData, string jsonTitle,
            HttpFileCollection fileData, string fileTitle, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, jsonData));
                // var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        using (var content =
                         new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                        {
                            for (var i = 0; i < fileData.Count; i++)
                            {
                                content.Add(new StreamContent(fileData[i].InputStream), fileTitle, fileData[i].FileName);
                            }
                            content.Add(new StringContent(jsonData), jsonTitle);
                            //content.Add(new StringContent(JsonConvert.SerializeObject(jsonData), Encoding.UTF8, "application/json"), "jsonData");
                            using (
                               var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false))
                            {
                                string resultContent = await result.Content.ReadAsStringAsync();
                                if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                                if (isLog)
                                    NLogManager.LogMessage("Đầu ra: " + resultContent);
                                return JsonConvert.DeserializeObject<T>(resultContent);
                            }
                        }
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }
        public static async Task<T> PostAsyncWithFile<T>(string uri, string jsonData, HttpFileCollection fileData, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, jsonData));
                // var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        using (var content =
                         new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                        {
                            for (var i = 0; i < fileData.Count; i++)
                            {
                                content.Add(new StreamContent(fileData[i].InputStream), "fileAttach", fileData[i].FileName);
                            }
                            content.Add(new StringContent(jsonData), "jsonData");
                            //content.Add(new StringContent(JsonConvert.SerializeObject(jsonData), Encoding.UTF8, "application/json"), "jsonData");
                            using (
                               var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false))
                            {
                                string resultContent = await result.Content.ReadAsStringAsync();
                                if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                                if (isLog)
                                    NLogManager.LogMessage("Đầu ra: " + resultContent);
                                return JsonConvert.DeserializeObject<T>(resultContent);
                            }
                        }
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<T> PostAsyncWithFile<T>(string uri, string jsonData, HttpFileCollection fileData, IDictionary<string, string> dictionary, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, jsonData));
                // var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        using (var content =
                         new MultipartFormDataContent("Upload----" + DateTime.Now.ToString(CultureInfo.InvariantCulture)))
                        {
                            for (var i = 0; i < fileData.Count; i++)
                            {
                                content.Add(new StreamContent(fileData[i].InputStream), "fileAttach", fileData[i].FileName);
                            }
                            content.Add(new StringContent(jsonData), "jsonData");
                            //content.Add(new StringContent(JsonConvert.SerializeObject(jsonData), Encoding.UTF8, "application/json"), "jsonData");
                            if (dictionary.Count > 0)
                            {
                                foreach (var dic in dictionary)
                                {
                                    client.DefaultRequestHeaders.TryAddWithoutValidation(dic.Key, dic.Value);
                                }
                            }
                            using (
                               var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false))
                            {
                                string resultContent = await result.Content.ReadAsStringAsync();
                                if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                                if (isLog)
                                    NLogManager.LogMessage("Đầu ra: " + resultContent);
                                return JsonConvert.DeserializeObject<T>(resultContent);
                            }
                        }
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<string> PostAsync(string uri, dynamic data, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                // var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, JsonConvert.SerializeObject(data)));
                        var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        //  client.DefaultRequestHeaders.TryAddWithoutValidation("Partner-Key", partnerCode);
                        var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false);
                        string resultContent = await result.Content.ReadAsStringAsync();
                        if (isLog)
                            NLogManager.LogMessage("Đầu ra: " + resultContent);
                        return resultContent;
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }

        public static async Task<T> PostAsync<T>(string uri, dynamic data, IDictionary<string, string> dictionary, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, JsonConvert.SerializeObject(data)));
                        var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        if (dictionary.Count > 0)
                        {
                            foreach (var dic in dictionary)
                            {
                                client.DefaultRequestHeaders.TryAddWithoutValidation(dic.Key, dic.Value);
                            }
                        }
                        var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false);
                        string resultContent = await result.Content.ReadAsStringAsync();
                        if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                        if (isLog)
                            NLogManager.LogMessage("Đầu ra: " + resultContent);
                        return JsonConvert.DeserializeObject<T>(resultContent);
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<string> PostAsync(string uri, dynamic data, IDictionary<string, string> dictionary, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        if (dictionary.Count > 0)
                        {
                            foreach (var dic in dictionary)
                            {
                                client.DefaultRequestHeaders.TryAddWithoutValidation(dic.Key, dic.Value);
                            }
                        }

                        if (data != null)
                        {
                            NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, JsonConvert.SerializeObject(data)));
                            var content = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json"); var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false);
                            string resultContent = await result.Content.ReadAsStringAsync();
                            if (isLog)
                                NLogManager.LogMessage("Đầu ra: " + resultContent);
                            return resultContent;
                        }
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }

        /// <summary>
        ///  GetAsync with Partner-Key in config
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="uri"></param>
        /// <returns></returns>
        public static async Task<T> GetAsync<T>(string uri, bool isLog = true)
        {
            try
            {
                using (var cts = new CancellationTokenSource())
                {
                    var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                    cts.CancelAfter(timeout);
                    //var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                    using (var httpClient = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: ", uri));
                        httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        // httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Partner-Key", partnerCode);
                        var response = await httpClient.GetAsync(uri, cts.Token).ConfigureAwait(false);
                        var content = await response.Content.ReadAsStringAsync();
                        if (string.IsNullOrWhiteSpace(content)) throw new Exception();
                        if (isLog)
                            NLogManager.LogMessage(content);
                        return JsonConvert.DeserializeObject<T>(content);
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<string> GetAsync(string uri, bool isLog = true)
        {
            try
            {
                using (var cts = new CancellationTokenSource())
                {
                    var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                    cts.CancelAfter(timeout);
                    // var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                    using (var httpClient = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: ", uri));
                        httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        // httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Partner-Key", partnerCode);
                        var response = await httpClient.GetAsync(uri, cts.Token).ConfigureAwait(false);
                        var content = await response.Content.ReadAsStringAsync();
                        if (string.IsNullOrWhiteSpace(content)) throw new Exception();
                        if (isLog)
                            NLogManager.LogMessage(content);
                        return content;
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }

        public static async Task<T> GetAsync<T>(string uri, IDictionary<string, string> dictionary, bool isLog = true)
        {
            try
            {
                using (var cts = new CancellationTokenSource())
                {
                    var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                    cts.CancelAfter(timeout);
                    using (var httpClient = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: ", uri));
                        httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        if (dictionary.Count > 0)
                        {
                            foreach (var dic in dictionary)
                            {
                                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(dic.Key, dic.Value);
                            }
                        }
                        var response = await httpClient.GetAsync(uri, cts.Token).ConfigureAwait(false);
                        var content = await response.Content.ReadAsStringAsync();
                        if (string.IsNullOrWhiteSpace(content)) throw new Exception();
                        if (isLog)
                            NLogManager.LogMessage(content);
                        return JsonConvert.DeserializeObject<T>(content);
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static async Task<string> GetAsync(string uri, IDictionary<string, string> dictionary, bool isLog = true)
        {
            try
            {
                using (var cts = new CancellationTokenSource())
                {
                    var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                    cts.CancelAfter(timeout);
                    using (var httpClient = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: ", uri));
                        httpClient.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json");
                        if (dictionary.Count > 0)
                        {
                            foreach (var dic in dictionary)
                            {
                                httpClient.DefaultRequestHeaders.TryAddWithoutValidation(dic.Key, dic.Value);
                            }
                        }
                        var response = await httpClient.GetAsync(uri, cts.Token).ConfigureAwait(false);
                        var content = await response.Content.ReadAsStringAsync();
                        if (string.IsNullOrWhiteSpace(content)) throw new Exception();
                        if (isLog)
                            NLogManager.LogMessage(content);
                        return content;
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }

        public static T GetHTML<T>(string URL, bool isLog = true)
        {
            string connectionString = URL;
            string pageContent = string.Empty;
            try
            {
                var myRequest = (HttpWebRequest)WebRequest.Create(connectionString);
                myRequest.Credentials = CredentialCache.DefaultCredentials;
                //// Get the response
                WebResponse webResponse = myRequest.GetResponse();
                using (var respStream = webResponse.GetResponseStream())
                {
                    if (respStream != null)
                    {
                        using (var ioStream = new StreamReader(respStream))
                        {
                            pageContent = ioStream.ReadToEnd();
                            if (string.IsNullOrWhiteSpace(pageContent)) return default(T);
                            if (isLog)
                                NLogManager.LogMessage("Đầu ra: " + pageContent);
                            return JsonConvert.DeserializeObject<T>(pageContent);
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return default(T);
        }

        public static string GetHTML(string URL, bool isLog = true)
        {
            string connectionString = URL;
            string pageContent = string.Empty;
            try
            {
                var myRequest = (HttpWebRequest)WebRequest.Create(connectionString);
                myRequest.Credentials = CredentialCache.DefaultCredentials;
                //// Get the response
                WebResponse webResponse = myRequest.GetResponse();
                using (var respStream = webResponse.GetResponseStream())
                {
                    if (respStream != null)
                    {
                        using (var ioStream = new StreamReader(respStream))
                        {
                            pageContent = ioStream.ReadToEnd();
                            if (isLog)
                                NLogManager.LogMessage("Đầu ra: " + pageContent);
                            return pageContent;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }

        public static T PostHTML<T>(string uri, dynamic postData, bool isLog = true)
        {
            try
            {
                var request = (HttpWebRequest)WebRequest.Create(uri);
                var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                string data = string.Empty;
                if (postData != null)
                    data = JsonConvert.SerializeObject(postData);
                NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, data));
                request.Method = "POST";
                request.ContentType = "application/json";
                request.Headers.Add("Partner-Key", partnerCode);
                if (!string.IsNullOrWhiteSpace(data))
                    using (var stream = new StreamWriter(request.GetRequestStream()))
                    {
                        stream.Write(data);
                    }
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    using (var responseStream = response.GetResponseStream())
                    {
                        var responseString = new StreamReader(responseStream).ReadToEnd();
                        if (string.IsNullOrWhiteSpace(responseString)) return default(T);
                        if (isLog)
                            NLogManager.LogMessage("Đầu ra: " + responseString);
                        return JsonConvert.DeserializeObject<T>(responseString);
                    }
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }

        public static string PostHTML(string uri, dynamic postData, bool isLog = true)
        {
            try
            {


                var request = (HttpWebRequest)WebRequest.Create(uri);
                var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                string data = string.Empty;
                if (postData != null)
                    data = JsonConvert.SerializeObject(postData);
                NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, data));
                request.Method = "POST";
                request.ContentType = "application/json";
                request.Headers.Add("Partner-Key", partnerCode);
                if (!string.IsNullOrWhiteSpace(data))
                    using (var stream = new StreamWriter(request.GetRequestStream()))
                    {
                        stream.Write(data);
                    }
                using (var response = (HttpWebResponse)request.GetResponse())
                {
                    using (var responseStream = response.GetResponseStream())
                    {
                        var responseString = new StreamReader(responseStream).ReadToEnd();
                        if (isLog)
                            NLogManager.LogMessage("Đầu ra: " + responseString);
                        return responseString;
                    }
                }
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
            }
            return string.Empty;
        }

        public static async Task<T> PostAsyncId<T>(string uri, dynamic Id, bool isLog = true)
        {
            try
            {
                var timeout = Convert.ToInt32(ConfigurationManager.AppSettings["APITimeout"]);
                // var partnerCode = ConfigurationManager.AppSettings["Partner-Key"].ToString();
                using (var cts = new CancellationTokenSource())
                {
                    cts.CancelAfter(timeout);
                    using (var client = new HttpClient())
                    {
                        NLogManager.LogMessage(string.Format("Đầu vào {0}: {1}", uri, Id));
                        var content = new StringContent(Id, Encoding.UTF8, "application/json");
                        client.DefaultRequestHeaders.TryAddWithoutValidation("Content-Type", "application/json"); 

                        var result = await client.PostAsync(uri, content, cts.Token).ConfigureAwait(false);
                        string resultContent = await result.Content.ReadAsStringAsync();
                        if (string.IsNullOrWhiteSpace(resultContent)) return default(T);
                        if (isLog)
                            NLogManager.LogMessage("Đầu ra: " + resultContent);
                        return JsonConvert.DeserializeObject<T>(resultContent);
                    }
                }
            }
            catch (TaskCanceledException ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                return default(T);
            }
        }
    }
}