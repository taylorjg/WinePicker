﻿using System.Web.Http;
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

        public object Get(string searchCriteria)
        {
            var catalogService = new CatalogService();
            SearchCriteriaMapper.ConfigureCatalogService(catalogService, searchCriteria);
            return catalogService.Execute();
        }
    }
}