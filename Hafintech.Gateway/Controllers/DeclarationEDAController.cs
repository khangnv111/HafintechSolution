using _2017Utilities.Session;
using System.Web.Mvc;

namespace Hafintech.Gateway.Controllers
{
    [Authorize]
    public class DeclarationEDAController : Controller
    {
        // GET: DeclarationEDA

        #region EDA

        public ActionResult EDAGeneral(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        public ActionResult EDAContainer(long Id = 0)
        {
            ViewBag.IdDe = Id;
            return PartialView();
        }

        public ActionResult EDA01()
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            return View();
        }

        public ActionResult ListProduct(long Id = 0, int isView = 0)
        {
            ViewBag.IdDe = Id;
            ViewBag.isView = isView;
            return PartialView();
        }

        public ActionResult EDADetail(long IdDec = 0, long IdPro = 0)
        {
            ViewBag.IdDe = IdDec;
            ViewBag.IdPro = IdPro;
            return PartialView();
        }

        //Xem chi tiết tờ khai
        public ActionResult DeclEDAContent(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        public ActionResult IEXDeclHight(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        #endregion EDA

        public ActionResult MEC(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        public ActionResult ProductView(long IdDec = 0, long IdPro = 0)
        {
            ViewBag.IdDe = IdDec;
            ViewBag.IdPro = IdPro;
            return PartialView();
        }

        #region EDB - EDC - EDD - EDD

        public ActionResult EDBDeclaration()
        {
            return PartialView();
        }

        public ActionResult EDCDeclaration(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        public ActionResult EDDDeclaration(long Id = 0)
        {
            ViewBag.IdDe = Id;
            return PartialView();
        }

        public ActionResult EDEDeclaration(long Id = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = Id;
            return View();
        }

        #endregion EDB - EDC - EDD - EDD

        public ActionResult TabDirectiveHighValueXK_List(long decID = 0)

        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = decID;
            return View();
        }

        public ActionResult TabDirectiveLowValueXK_List(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = decID;
            return View();
        }

        public ActionResult TabResultXK(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = decID;
            return View();
        }

        public ActionResult TabResultXK_HighValue(long decID = 0)
        {
            if (AccountSession.AccountID <= 0)
            {
                return RedirectToAction("Login", "Home");
            }
            ViewBag.IdDe = decID;
            return View();
        }
    }
}