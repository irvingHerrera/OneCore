using Microsoft.AspNetCore.Mvc;

namespace OneCore.Web.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}