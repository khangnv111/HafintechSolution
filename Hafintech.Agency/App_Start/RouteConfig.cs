using System.Web.Mvc;
using System.Web.Routing;

namespace Hafintech.Agency
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "dang nhap",
                url: "dang-nhap",
                defaults: new { controller = "Home", action = "Login", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "Đổi mật khẩu",
                url: "resetpassword",
                defaults: new { controller = "Home", action = "ResetPassword", id = UrlParameter.Optional }
            );
            routes.MapRoute(
                name: "cài đặt vnaccs",
                url: "setup-vnaccs",
                defaults: new { controller = "System", action = "SetupVNACCS", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "dashboard",
                url: "dashboard",
                defaults: new { controller = "Dashboard", action = "ListDashboard", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}