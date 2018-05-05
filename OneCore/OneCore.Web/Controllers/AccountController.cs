using Microsoft.AspNetCore.Mvc;
using OneCore.Core.ViewModel;
using OneCore.Web.Models;
using System.Diagnostics;
using System.Threading.Tasks;

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

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<IActionResult> LoginUser(UserViewModel user)
        {
            //var response = await loginService.Login(new ServiceRequest<LoginViewModel>() { Data = login });

            //if (response.Success)
            //{

            //    //Crear session
            //    var claims = new List<Claim>
            //    {
            //        new Claim(ClaimTypes.Name, response.Data.Name),
            //        new Claim(ClaimTypes.Email, response.Data.Email),
            //    };

            //    var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            //    ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);

            //    await HttpContext.SignInAsync(scheme: CookieAuthenticationDefaults.AuthenticationScheme, principal: principal);
            //}

            //return Json(response);
            return Json(string.Empty);
        }
    }
}