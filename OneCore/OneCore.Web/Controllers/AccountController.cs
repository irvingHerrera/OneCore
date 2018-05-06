using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using OneCore.Business.ContractBusiness;
using OneCore.Core.ViewModel;
using OneCore.Web.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Security.Claims;
using System.Threading.Tasks;

namespace OneCore.Web.Controllers
{
    public class AccountController : Controller
    {
        private readonly IUserBusiness userBusiness;

        public AccountController(IUserBusiness userBusiness)
        {
            this.userBusiness = userBusiness;
        }

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
            var result = await userBusiness.Login(user);

            if (result.Success)
            {

                //Crear session
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, result.Objeto.User),
                    new Claim(ClaimTypes.Email, result.Objeto.Email),
                };

                var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                ClaimsPrincipal principal = new ClaimsPrincipal(userIdentity);

                await HttpContext.SignInAsync(scheme: CookieAuthenticationDefaults.AuthenticationScheme, principal: principal);

                return Json(result);
            }

            return Json(result);
        }

        public async Task<IActionResult> Registry(UserViewModel model)
        {
            try
            {
                model.Status = Core.Enum.Status.Active;
                var response = await userBusiness.Add(model);
                return Json(response);

            }
            catch (Exception ex)
            {
                return RedirectToAction("Error", "Account");
            }
        }

        public async Task<IActionResult> Logout(UserViewModel user)
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login", "Account");
        }
    }
}