using System.Web.Optimization;

namespace WinePickerWeb.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/WinePicker").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/underscore.js",
                "~/Scripts/angular.js",
                "~/Content/bootstrap/js/bootstrap.js",
                "~/Scripts/WinePicker/*.js"));
        }
    }
}
