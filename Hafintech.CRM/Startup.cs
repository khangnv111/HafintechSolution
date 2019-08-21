using _2017Utilities.Log;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Newtonsoft.Json.Serialization;
using Owin;
using System;
using System.Configuration;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

[assembly: OwinStartup(typeof(Hafintech.Gateway.Startup))]

namespace Hafintech.Gateway
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            try
            {
                //app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
                HttpConfiguration config = new HttpConfiguration();
                ConfigureBundles();
                ConfigureWebAPI(config);
                ConfigureAuth(app);
                //  ConfigureOAuthTokenConsumption(app);

                app.UseWebApi(config);
                ConfigureMVC();
            }
            catch (Exception ex)
            {
                NLogManager.PublishException(ex);
                throw;
            }
        }

        public void ConfigureWebAPI(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }

        public void ConfigureMVC()
        {
            MvcHandler.DisableMvcResponseHeader = true;
            var filters = GlobalFilters.Filters;
            filters.Add(new HandleErrorAttribute());
            //FilterConfig.RegisterGlobalFilters(filters);
            var routes = RouteTable.Routes;
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }

        public void ConfigureAuth(IAppBuilder app)
        {
            var cookieName = ConfigurationManager.AppSettings["CookieName"].ToString();
            var cookieDomain = ConfigurationManager.AppSettings["CookieDomain"].ToString();
            // Enable the application to use a cookie to store information for the signed in user
            // and to use a cookie to temporarily store information about a user logging in with a third party login provider
            // Configure the sign in cookie
            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
                CookieName = cookieName,
                AuthenticationMode = AuthenticationMode.Active,
                LoginPath = new PathString("/Home/Login"),
                ExpireTimeSpan = TimeSpan.FromHours(24),
                SlidingExpiration = true,
                CookieDomain = cookieDomain,
                CookieSecure = CookieSecureOption.Never
            });
        }

        private void ConfigureBundles()
        {
            var bundles = BundleTable.Bundles;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                      "~/Scripts/libs/jquery.pager.js ",
                      "~/Scripts/libs/jquery-1.12.4.js",
                      "~/Scripts/libs/jquery-ui.min.js",
                      "~/Scripts/libs/jquery.mCustomScrollbar.concat.min.js",
                      "~/Scripts/libs/jquery.signalR-2.2.1.min.js"
                      ));

            //  css login
            bundles.Add(new StyleBundle("~/Content/csslogin").Include(
                      "~/Content/css/bootstrap.min.css",
                      "~/Content/css/bootstrap-responsive.min.css",
                      "~/Content/css/maruti-login.css"
                ));

            ////  css update
            //bundles.Add(new StyleBundle("~/Content/cssupdate").Include(
            //    "~/Content/css.update/HatecoDemo.WareHouse.css"
            //));

            //  js login
            bundles.Add(new ScriptBundle("~/bundles/jslogin").Include(
                        "~/Content/js/jquery.min.js",
                        "~/Content/js/maruti.login.js"
                ));

            //  css web
            bundles.Add(new StyleBundle("~/Content/csswebpage").Include(
                "~/Content/css/bootstrap.min.css",
                "~/Content/css/bootstrap.min2.css",
                "~/Content/css/bootstrap-responsive.min.css",
                "~/Content/css/maruti-style.css",
                "~/Content/css/maruti-media.css",
                "~/Content/css/bootstrap-datetimepicker.css",
                "~/Content/css/jquery.gritter.css",
                "~/Content/css/datepicker.css",
                "~/Content/css/uniform.css"
            ));

            //  js web libs
            bundles.Add(new ScriptBundle("~/bundles/jsweblib").Include(
                "~/Content/js/jquery.min.js",
                "~/Content/js/jquery.ui.custom.js",
                "~/Content/js/jquery.flot.min.js",
                "~/Content/js/jquery.flot.resize.min.js",
                "~/Content/js/jquery.peity.min.js",
                "~/Content/js/jquery-2.1.1.min.js",
                "~/Content/js/bootstrap.min2.js",
                "~/Content/js/jquery.signalR-2.2.3.min.js.js",
                "~/Content/js/moment-with-locales.js",
                "~/Content/js/hubmanager.js",
                "~/Content/js/jquery.gritter.min.js",
                "~/Content/js/bootstrap-datetimepicker.js",
                "~/Content/js/bootstrap-datepicker.js",
                "~/Content/js/jquery.ui.custom.js"
            ));

            //  js web
            bundles.Add(new ScriptBundle("~/bundles/jswebpage").Include(
                "~/Content/js.update/config.js",
                "~/Content/js.update/utils.js",
                "~/Content/js.update/captcha.js",
                "~/Content/js.update/accounts.js",
                "~/Content/js.update/funbuttons.js",
                "~/Content/js.update/hateco.js"
            ));

            BundleTable.EnableOptimizations = true;
        }
    }
}