using System.Web;
using System.Web.Mvc;

namespace WinePickerWeb.Filters
{
    public class EndToEndTestDetectionFilter : ActionFilterAttribute
    {
        public override void  OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);
            filterContext.HttpContext.Items["isEndToEndTest"] = IsEndToEndTest(filterContext.HttpContext.Request);
        }

        private static bool IsEndToEndTest(HttpRequestBase request)
        {
            var mode = request.QueryString["mode"];

            if (!string.IsNullOrEmpty(mode))
            {
                if (mode == "e2etest")
                {
                    return true;
                }
            }

            return false;
        }
    }
}
