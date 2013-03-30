using System.Net;
using System.Net.Http;
using System.Web.Http;
using WineApi;
using WinePickerWeb.Mappers;

namespace WinePickerWeb.Controllers
{
    public class WineApiController : ApiController
    {
        static WineApiController()
        {
            Config.ApiKey = "2fd879a5765785c043cc992b550d2bda";
        }

        public object GetProductsThatMatchSearchCriteria(string searchCriteria)
        {
            var catalogService = new CatalogService();
            CatalogServiceMapper.ConfigureWithSearchCriteria(catalogService, searchCriteria);

            try
            {
                return catalogService.Execute();
            }
            catch (WineApiStatusException ex)
            {
                // http://blogs.msdn.com/b/youssefm/archive/2012/06/28/error-handling-in-asp-net-webapi.aspx
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
        }

        public object GetProductDetails(string productCriteria)
        {
            var catalogService = new CatalogService();
            CatalogServiceMapper.ConfigureWithProductCriteria(catalogService, productCriteria);

            try
            {
                return catalogService.Execute();
            }
            catch (WineApiStatusException ex)
            {
                // http://blogs.msdn.com/b/youssefm/archive/2012/06/28/error-handling-in-asp-net-webapi.aspx
                throw new HttpResponseException(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message));
            }
        }
    }
}
