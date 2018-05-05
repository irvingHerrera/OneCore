using Microsoft.AspNetCore.Mvc;

namespace OneCore.Web.Controllers
{
    public class AccountController : Controller
    {
        public IActionResult Login()
        {
            return View();
        }

        public IActionResult SingUp()
        {
            return View();
        }
    }
}