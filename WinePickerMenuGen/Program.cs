using System.Collections.Generic;
using System.Dynamic;
using System.IO;
using System.Linq;
using System.Text;
using Newtonsoft.Json;
using WineApi;

namespace WinePickerMenuGen
{
    class Program
    {
        private const int WineTypeId = 4;
        private const int VarietalId = 5;
        private const int RegionId = 1;
        private const int AppellationId = 6;
        private const int ShopId = 490;
        private const string WineApiKey = "2fd879a5765785c043cc992b550d2bda";
        private const string JavaScriptFileName = "WineApiMenuData.js";

        static void Main()
        {
            Config.ApiKey = WineApiKey;

            var allWineTypes = GetSingleCategory(WineTypeId);
            var allVarietals = GetSingleCategory(VarietalId);
            var allRegions = GetSingleCategory(RegionId);
            var allAppellations = GetSingleCategory(AppellationId);

            var dynamicVarietalsWithWineTypes = CreateDynamicVarietalsWithAssociatedWineTypes(allWineTypes, allVarietals);
            var dynamicAppellationsWithRegions = CreateDynamicAppellationsWithAssociatedRegions(allRegions, allAppellations);

            dynamic dynamicMenuData = new ExpandoObject();
            dynamicMenuData.Categories = new List<dynamic>
                {
                    allWineTypes,
                    dynamicVarietalsWithWineTypes,
                    allRegions,
                    dynamicAppellationsWithRegions
                };

            string jsonString = JsonConvert.SerializeObject(dynamicMenuData, Formatting.Indented);

            WriteJavaScriptFile(jsonString);
        }

        private static void WriteJavaScriptFile(string jsonString)
        {
            var sb = new StringBuilder();
            sb.AppendLine("wineApi = window.wineApi || {};");
            sb.AppendLine();
            sb.Append("wineApi.menuData = ");
            sb.Append(jsonString);
            sb.AppendLine(";");
            var contents = sb.ToString();

            File.WriteAllText(JavaScriptFileName, contents);
        }

        private static Category GetSingleCategory(int categoryId)
        {
            var categoryMapService = new CategoryMapService();
            var categoryMap = categoryMapService
                .CategoriesFilter(ShopId)
                .Show(categoryId)
                .Execute();
            return categoryMap.Categories.Length != 1 ? null : categoryMap.Categories[0];
        }

        private static Category GetVarietalsForWineType(int wineTypeId)
        {
            var categoryMapService = new CategoryMapService();
            var categoryMap = categoryMapService
                .CategoriesFilter(ShopId, wineTypeId)
                .Show(VarietalId)
                .Execute();
            return categoryMap.Categories.FirstOrDefault(c => c.Id == VarietalId);
        }

        private static Category GetAppellationsForRegion(int regionId)
        {
            var categoryMapService = new CategoryMapService();
            var categoryMap = categoryMapService
                .CategoriesFilter(ShopId, regionId)
                .Show(AppellationId)
                .Execute();
            return categoryMap.Categories.FirstOrDefault(c => c.Id == AppellationId);
        }

        private static dynamic CreateDynamicVarietalsWithAssociatedWineTypes(Category allWineTypes, Category allVarietals)
        {
            var dynamicVarietalsWithWineTypes = CopyVarietalsToDynamicObject(allVarietals);
            PopulateAssociatedWineTypes(dynamicVarietalsWithWineTypes, allWineTypes);
            return dynamicVarietalsWithWineTypes;
        }

        private static void PopulateAssociatedWineTypes(dynamic dynamicVarietalsWithWineTypes, Category allWineTypes)
        {
            foreach (var wineType in allWineTypes.Refinements)
            {
                var varietals = GetVarietalsForWineType(wineType.Id);
                if (varietals != null)
                {
                    foreach (var varietal in varietals.Refinements)
                    {
                        AssociateDynamicVarietalWithWineType(dynamicVarietalsWithWineTypes, varietal.Id, wineType.Id);
                    }
                }
            }
        }

        private static void AssociateDynamicVarietalWithWineType(dynamic dynamicVarietalsWithWineTypes, int varietalId, int wineTypeId)
        {
            foreach (var dynamicVarietal in dynamicVarietalsWithWineTypes.Refinements)
            {
                if (dynamicVarietal.Id == varietalId)
                {
                    dynamicVarietal.AssociatedWineTypes.Add(wineTypeId);
                    break;
                }
            }
        }

        private static dynamic CopyVarietalsToDynamicObject(Category allVarietals)
        {
            dynamic dynamicVarietalsWithWineTypes = new ExpandoObject();

            dynamicVarietalsWithWineTypes.Id = allVarietals.Id;
            dynamicVarietalsWithWineTypes.Name = allVarietals.Name;
            dynamicVarietalsWithWineTypes.Refinements = new List<dynamic>();

            foreach (var varietal in allVarietals.Refinements)
            {
                dynamic dynamicVarietal = new ExpandoObject();
                dynamicVarietal.Id = varietal.Id;
                dynamicVarietal.Name = varietal.Name;
                dynamicVarietal.Url = varietal.Url;
                dynamicVarietal.AssociatedWineTypes = new List<int>();
                dynamicVarietalsWithWineTypes.Refinements.Add(dynamicVarietal);
            }

            return dynamicVarietalsWithWineTypes;
        }

        private static dynamic CreateDynamicAppellationsWithAssociatedRegions(Category allRegions, Category allAppellations)
        {
            var dynamicAppellationsWithRegions = CopyAppellationsToDynamicObject(allAppellations);
            PopulateAssociatedRegions(dynamicAppellationsWithRegions, allRegions);
            return dynamicAppellationsWithRegions;
        }

        private static void PopulateAssociatedRegions(dynamic dynamicAppellationsWithRegions, Category allRegions)
        {
            foreach (var region in allRegions.Refinements)
            {
                var appellations = GetAppellationsForRegion(region.Id);
                if (appellations != null)
                {
                    foreach (var appellation in appellations.Refinements)
                    {
                        AssociateDynamicAppellationWithRegion(dynamicAppellationsWithRegions, appellation.Id, region.Id);
                    }
                }
            }
        }

        private static void AssociateDynamicAppellationWithRegion(dynamic dynamicAppellationsWithRegions, int appellationId, int regionId)
        {
            foreach (var dynamicAppellation in dynamicAppellationsWithRegions.Refinements)
            {
                if (dynamicAppellation.Id == appellationId)
                {
                    dynamicAppellation.AssociatedRegions.Add(regionId);
                    break;
                }
            }
        }

        private static dynamic CopyAppellationsToDynamicObject(Category allAppellations)
        {
            dynamic dynamicAppellationsWithRegions = new ExpandoObject();

            dynamicAppellationsWithRegions.Id = allAppellations.Id;
            dynamicAppellationsWithRegions.Name = allAppellations.Name;
            dynamicAppellationsWithRegions.Refinements = new List<dynamic>();

            foreach (var appellation in allAppellations.Refinements)
            {
                dynamic dynamicAppellation = new ExpandoObject();
                dynamicAppellation.Id = appellation.Id;
                dynamicAppellation.Name = appellation.Name;
                dynamicAppellation.Url = appellation.Url;
                dynamicAppellation.AssociatedRegions = new List<int>();
                dynamicAppellationsWithRegions.Refinements.Add(dynamicAppellation);
            }

            return dynamicAppellationsWithRegions;
        }
    }
}
