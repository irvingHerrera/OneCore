using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace OneCore.Web.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        [IgnoreAntiforgeryToken]
        public IActionResult Index()
        {
            return View();
        }
    }
}