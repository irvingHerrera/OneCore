using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OneCore.Business.ContractBusiness;
using OneCore.Core.ViewModel;
using System.Threading.Tasks;

namespace OneCore.Web.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        private readonly IUserBusiness userBusiness;

        public UserController(IUserBusiness userBusiness)
        {
            this.userBusiness = userBusiness;
        }

        [IgnoreAntiforgeryToken]
        public IActionResult Index()
        {
            return View();
        }


        public IActionResult GetAll()
        {
            var response = userBusiness.GetAll();

            return Json(response);
        }

        [HttpPost]
        public async Task<JsonResult> GetUser(int id)
        {
            var response = await userBusiness.Get(id);

            return Json(response);
        }

        [HttpPost]
        public async Task<JsonResult> Update(UserViewModel model)
        {
            var response = await userBusiness.Update(model);

            return Json(response);
        }

        [HttpPost]
        public async Task<JsonResult> Delete(int id)
        {
            var response = await userBusiness.Delete(id);

            return Json(response);
        }

    }
}