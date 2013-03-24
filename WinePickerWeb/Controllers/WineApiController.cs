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
            return catalogService.Execute();
        }

        public object GetProductDetails(string productCriteria)
        {
            var catalogService = new CatalogService();
            CatalogServiceMapper.ConfigureWithProductCriteria(catalogService, productCriteria);
            return catalogService.Execute();
        }
    }
}
