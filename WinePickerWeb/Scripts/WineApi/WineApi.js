/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

// Add support for chaining ?
//
// var url = urlBuilder.catalogService()
//    .offset(20)
//    .size(10)
//    .search("red gamay")
//    .categories([490, 124])
//    .state(CA")
//    .instock()
//    .url();

wineApi = window.wineApi || {};

wineApi.UrlBuilder = (function () {

    "use strict";

    var _apiKeyValue = null;
    var _affiliateIdValue = null;

    var _apiKey = function (apiKey) {
        if (arguments.length === 1) {
            _apiKeyValue = apiKey;
        }
        return _apiKeyValue;
    };

    var _affiliateId = function (affiliateId) {
        if (arguments.length === 1) {
            _affiliateIdValue = affiliateId;
        }
        return _affiliateIdValue;
    };

    var _buildBaseUrl = function (serviceName) {
        var url = "http://services.wine.com/api/beta2/service.svc/json/" + serviceName + "?apikey=" + _apiKeyValue;
        if (_affiliateIdValue !== null) {
            url = url + "&affiliateId=" + _affiliateIdValue;
        }
        return url;
    };

    var _filterIds = function (ids) {
        var filteredIds = [];
        if (_.isArray(ids)) {
            filteredIds = _.filter(ids, function (id) { return id !== ""; });
        } else {
            if (ids !== "") {
                filteredIds.push(ids);
            }
        }
        return filteredIds;
    };

    var _buildMultiValueQueryStringParam = function (prefix, ids) {
        var filteredCategoryIds = _filterIds(ids);
        if (filteredCategoryIds.length === 0) {
            return "";
        }
        return "&" + prefix + "(" + filteredCategoryIds.join("+") + ")";
    };

    var _buildFromToQueryStringParam = function (prefix, values) {
        if (_.isArray(values)) {
            if (values.length === 1) {
                return "&" + prefix + "(" + values[0] + ")";
            }
            if (values.length === 2) {
                return "&" + prefix + "(" + values.join("|") + ")";
            }
            return "";
        }
        return "&" + prefix + "(" + values + ")";
    };

    var _buildFilterCategoriesQueryStringParam = function (ids) {
        return _buildMultiValueQueryStringParam("filter=categories", ids);
    };

    var _buildFilterProductQueryStringParam = function (ids) {
        return _buildMultiValueQueryStringParam("filter=product", ids);
    };

    var _buildFilterRatingQueryStringParam = function (values) {
        return _buildFromToQueryStringParam("filter=rating", values);
    };

    var _buildFilterPriceQueryStringParam = function (values) {
        return _buildFromToQueryStringParam("filter=price", values);
    };

    var _buildShowQueryStringParam = function (ids) {
        return _buildMultiValueQueryStringParam("show=", ids);
    };

    var _buildOffsetQueryParam = function (offset) {
        return "&offset=" + offset;
    };

    var _buildSizeQueryParam = function (size) {
        return "&size=" + size;
    };

    var _buildStateQueryParam = function (state) {
        if (_.isString(state) && state.length === 2) {
            return "&state=" + state.toUpperCase();
        }
        return "";
    };

    var _buildInstockQueryStringParam = function (instock) {
        if (instock) {
            return "&instock=true";
        }
        return "";
    };

    var _buildSearchQueryStringParam = function (searchTerm) {
        if (searchTerm === "") {
            return "";
        }
        var singleSpaceChar = " ";
        var searchTermWithCollapsedWhitespace = $.trim(searchTerm.replace(/\s+/g, singleSpaceChar));
        var words = $.map(searchTermWithCollapsedWhitespace.split(singleSpaceChar), $.trim);
        return "&search=" + words.join("+");
    };

    var _validSortOptions = [
        "popularity",
        "rating",
        "vintage",
        "winery",
        "name",
        "price",
        "saving",
        "justin"];

    var _validSortDirections = [
        "ascending",
        "descending"];

    var _buildSortQueryStringParamHelper = function (sortOption, sortDirection) {

        var sortOptionIsValid = false;
        var sortDirectionIsValid = false;
        var i;

        sortOption = sortOption.toLowerCase();
        sortDirection = sortDirection.toLowerCase();

        for (i = 0; i < _validSortOptions.length; i++) {
            if (sortOption === _validSortOptions[i]) {
                sortOptionIsValid = true;
                break;
            }
        }

        for (i = 0; i < _validSortDirections.length; i++) {
            if (sortDirection === _validSortDirections[i]) {
                sortDirectionIsValid = true;
                break;
            }
        }

        if (sortOptionIsValid && sortDirectionIsValid) {
            return "&sort=" + sortOption + "|" + sortDirection;
        }

        return "";
    };

    var _buildSortQueryStringParam = function (values) {
        if (_.isArray(values)) {
            if (values.length === 1) {
                return _buildSortQueryStringParamHelper(values[0], "descending");
            }
            if (values.length === 2) {
                return _buildSortQueryStringParamHelper(values[0], values[1]);
            }
            return "";
        }
        return _buildSortQueryStringParamHelper(values, "descending");
    };

    var _catalogService = function (options) {

        var url = _buildBaseUrl("catalog");
        options = options || {};

        var offset = options.offset || null;
        if (offset !== null) {
            url = url + _buildOffsetQueryParam(offset);
        }

        var size = options.size || null;
        if (size !== null) {
            url = url + _buildSizeQueryParam(size);
        }

        var categoryIds = options.categories || null;
        if (categoryIds !== null) {
            url = url + _buildFilterCategoriesQueryStringParam(categoryIds);
        }

        var rating = options.rating || null;
        if (rating !== null) {
            url = url + _buildFilterRatingQueryStringParam(rating);
        }

        var price = options.price || null;
        if (price !== null) {
            url = url + _buildFilterPriceQueryStringParam(price);
        }

        var search = options.search || null;
        if (search !== null) {
            url = url + _buildSearchQueryStringParam(search);
        }

        var productIds = options.products || null;
        if (productIds !== null) {
            url = url + _buildFilterProductQueryStringParam(productIds);
        }

        var state = options.state || null;
        if (state !== null) {
            url = url + _buildStateQueryParam(state);
        }

        var instock = options.instock || null;
        if (instock !== null && state !== null) {
            url = url + _buildInstockQueryStringParam(instock);
        }

        var sort = options.sort || null;
        if (sort !== null) {
            url = url + _buildSortQueryStringParam(sort);
        }

        return url;
    };

    var _categoryMapService = function (options) {

        var url = _buildBaseUrl("categorymap");
        options = options || {};

        var categoryIds = options.categories || null;
        if (categoryIds !== null) {
            url = url + _buildFilterCategoriesQueryStringParam(categoryIds);
        }

        var search = options.search || null;
        if (search !== null) {
            url = url + _buildSearchQueryStringParam(search);
        }

        var rating = options.rating || null;
        if (rating !== null) {
            url = url + _buildFilterRatingQueryStringParam(rating);
        }

        var showIds = options.show || null;
        if (showIds !== null) {
            url = url + _buildShowQueryStringParam(showIds);
        }

        return url;
    };

    var _referenceService = function (options) {

        var url = _buildBaseUrl("reference");
        options = options || {};

        var categoryIds = options.categories || null;
        if (categoryIds !== null) {
            url = url + _buildFilterCategoriesQueryStringParam(categoryIds);
        }

        return url;
    };

    var Constructor = function (apiKey, affiliateId) {
        if (arguments.length >= 1) {
            _apiKey(apiKey);
        }
        if (arguments.length === 2) {
            _affiliateId(affiliateId);
        }
    };

    Constructor.prototype = {
        constructor: wineApi.UrlBuilder,
        apiKey: _apiKey,
        affiliateId: _affiliateId,
        catalogService: _catalogService,
        categoryMapService: _categoryMapService,
        referenceService: _referenceService
    };

    return Constructor;

} ());
