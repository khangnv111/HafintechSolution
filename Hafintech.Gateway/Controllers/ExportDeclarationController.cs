using _2017Utilities.Session;
using System.Web.Mvc;

namespace Hafintech.Gateway.Controllers
{
    [Authorize]
    public class ExportDeclarationController : Controller
    {
        // GET: ExportDeclaration
        public ActionResult ListDeclaration()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        #region MEC

        public ActionResult MECDeclaration(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        public ActionResult MECDeclarationView(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        public ActionResult MEDDeclaration()
        {
            return View();
        }

        public ActionResult IEXDeclaration()
        {
            return View();
        }

        #endregion MEC
    }
}