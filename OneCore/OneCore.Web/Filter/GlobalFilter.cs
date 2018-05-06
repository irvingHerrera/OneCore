using Microsoft.AspNetCore.Mvc.Filters;
using System.Globalization;
using System.Threading;

namespace OneCore.Web.Filter
{
    public class GlobalFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (context.HttpContext.Request.Headers["x-requested-with"].Equals("XMLHttpRequest"))
            {
                base.OnActionExecuting(context);
                return;
            }

            var culture = new CultureInfo("es-MX");

            Thread.CurrentThread.CurrentCulture = culture;
            Thread.CurrentThread.CurrentUICulture = culture;
            CultureInfo.DefaultThreadCurrentCulture = culture;
            CultureInfo.DefaultThreadCurrentUICulture = culture;

            base.OnActionExecuting(context);
        }
    }
}
