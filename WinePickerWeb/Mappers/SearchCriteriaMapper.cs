using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using WineApi;

namespace WinePickerWeb.Mappers
{
    public static class SearchCriteriaMapper
    {
        public static void ConfigureCatalogServiceWithSearchCriteria(CatalogService catalogService, string searchCriteria)
        {
            var bits = searchCriteria.Split('|');
            var offset = ExtractIntValue(bits, "o");
            var size = ExtractIntValue(bits, "sz");
            var wineType = ExtractIntValue(bits, "wt");
            var varietal = ExtractIntValue(bits, "v");
            var appellation = ExtractIntValue(bits, "a");
            var region = ExtractIntValue(bits, "r");
            var search = ExtractStringValue(bits, "s");
            var priceFrom = ExtractDecimalValue(bits, "pf");
            var priceTo = ExtractDecimalValue(bits, "pt");
            var ratingFrom = ExtractIntValue(bits, "rf");
            var ratingTo = ExtractIntValue(bits, "rt");
            var state = ExtractStringValue(bits, "st");
            var instock = ExtractBoolValue(bits, "is");
            var sortOrder = ExtractStringValue(bits, "so");
            var sortDirection = ExtractStringValue(bits, "sd");

            if (offset.HasValue)
            {
                catalogService.Offset(offset.Value);
            }

            if (size.HasValue)
            {
                catalogService.Size(size.Value);
            }

            var categoryIds = new List<int>();
            if (wineType.HasValue)
            {
                categoryIds.Add(wineType.Value);
            }
            if (varietal.HasValue)
            {
                categoryIds.Add(varietal.Value);
            }
            if (appellation.HasValue)
            {
                categoryIds.Add(appellation.Value);
            }
            if (region.HasValue)
            {
                categoryIds.Add(region.Value);
            }
            catalogService.CategoriesFilter(categoryIds.ToArray());

            if (!string.IsNullOrEmpty(search))
            {
                catalogService.Search(Words(search));
            }

            if (priceFrom.HasValue)
            {
                if (priceTo.HasValue)
                {
                    catalogService.PriceFilter(priceFrom.Value, priceTo.Value);
                }
                else
                {
                    catalogService.PriceFilter(priceFrom.Value);
                }
            }

            if (ratingFrom.HasValue)
            {
                if (ratingTo.HasValue)
                {
                    catalogService.RatingFilter(ratingFrom.Value, ratingTo.Value);
                }
                else
                {
                    catalogService.RatingFilter(ratingFrom.Value);
                }
            }

            if (!string.IsNullOrEmpty(state))
            {
                catalogService.State(state);

                if (instock.HasValue && instock.Value)
                {
                    catalogService.InStock(true);
                }
            }

            if (!string.IsNullOrEmpty(sortOrder))
            {
                SortOptions eSortOption;
                if (Enum.TryParse(sortOrder, true /* ignoreCase */, out eSortOption))
                {
                    var eSortDirection = SortDirection.Descending;

                    if (!string.IsNullOrEmpty(sortDirection))
                    {
                        if (!Enum.TryParse(sortDirection, true /* ignoreCase */, out eSortDirection))
                        {
                            eSortDirection = SortDirection.Descending;
                        }
                    }

                    catalogService.SortBy(eSortOption, eSortDirection);
                }
            }
        }

        public static void ConfigureCatalogServiceWithProductCriteria(CatalogService catalogService, string productCriteria)
        {
            var bits = productCriteria.Split('|');
            var productId = ExtractIntValue(bits, "id");
            var state = ExtractStringValue(bits, "st");
            var instock = ExtractBoolValue(bits, "is");

            if (productId.HasValue)
            {
                catalogService.ProductFilter(productId.Value);
            }

            if (!string.IsNullOrEmpty(state))
            {
                catalogService.State(state);

                if (instock.HasValue && instock.Value)
                {
                    catalogService.InStock(true);
                }
            }
        }

        private static string ExtractStringValue(IEnumerable<string> bits, string name)
        {
            var prefix = name.ToLower() + ":";
            var bit = bits.FirstOrDefault(b => b.ToLower().StartsWith(prefix));
            if (!string.IsNullOrEmpty(bit) && bit.Length > prefix.Length)
            {
                return bit.Substring(prefix.Length);
            }
            return null;
        }

        private static int? ExtractIntValue(IEnumerable<string> bits, string name)
        {
            var value = ExtractStringValue(bits, name);
            if (!string.IsNullOrEmpty(value))
            {
                int i;
                if (int.TryParse(value, out i))
                {
                    return i;
                }
            }
            return null;
        }

        private static decimal? ExtractDecimalValue(IEnumerable<string> bits, string name)
        {
            var value = ExtractStringValue(bits, name);
            if (!string.IsNullOrEmpty(value))
            {
                decimal d;
                if (decimal.TryParse(value, out d))
                {
                    return d;
                }
            }
            return null;
        }

        private static bool? ExtractBoolValue(IEnumerable<string> bits, string name)
        {
            var value = ExtractStringValue(bits, name);
            if (!string.IsNullOrEmpty(value))
            {
                value = value.ToLower();
                if (value == "1" || value == "true")
                {
                    return true;
                }
                if (value == "0" || value == "false")
                {
                    return false;
                }
            }
            return null;
        }

        private static string[] Words(string inputString)
        {
            const char spaceCharacter = ' ';
            var spaceString = new string(spaceCharacter, 1);
            var inputStringWithCollapsedWhitespace = Regex.Replace(inputString.Trim(), @"\s+", spaceString);
            var words = inputStringWithCollapsedWhitespace.Split(spaceCharacter);
            var trimmedWords = from w in words select w.Trim();
            return trimmedWords.ToArray();
        }
    }
}
