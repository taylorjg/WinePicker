/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.wineApi = window.wineApi || {};

    window.wineApi.UrlBuilder2 = function (apiKeyValue, affiliateIdValue) {

        var _apiKeyValue = "SET-ME!";
        var _affiliateIdValue = null;
        var _url = "";

        this.apiKey = function (newValue) {
            if (arguments.length === 1) {
                _apiKeyValue = newValue;
            }
            return _apiKeyValue;
        };

        this.affiliateId = function (newValue) {
            if (arguments.length === 1) {
                _affiliateIdValue = newValue;
            }
            return _affiliateIdValue;
        };

        this.url = function () {
            return _url;
        };

        this.catalogService = function (options) {

            _buildBaseUrl("catalog");

            options = options || {};

            this.offset(options.offset || null);
            this.size(options.size || null);
            this.categoriesFilter(options.categories || null);
            this.ratingFilter(options.rating || null);
            this.priceFilter(options.price || null);

            return this;
        };

        this.categoryMapService = function (options) {
            _buildBaseUrl("categoryMap");
            options = options || {};
            return this;
        };

        this.referenceService = function (options) {
            _buildBaseUrl("reference");
            options = options || {};
            return this;
        };

        this.offset = function (value) {
            _addQueryParamNameValue("offset", value);
            return this;
        };

        this.size = function (value) {
            _addQueryParamNameValue("size", value);
            return this;
        };

        this.categoriesFilter = function (value) {
            _addCategoriesFilterQueryStringParam(value);
            return this;
        };

        this.ratingFilter = function (value) {
            _addFromToQueryStringParam("filter=rating", value);
            return this;
        };

        this.priceFilter = function (value) {
            _addFromToQueryStringParam("filter=price", value);
            return this;
        };

        function _buildBaseUrl(serviceName) {
            _url = "http://services.wine.com/api/beta2/service.svc/json/" + serviceName + "?apikey=" + _apiKeyValue;
            if (_affiliateIdValue !== null) {
                _url = _url + "&affiliateId=" + _affiliateIdValue;
            }
        }

        function _addQueryParamNameValue(name, value) {
            if (_.isUndefined(value) || _.isNull(value)) {
                return;
            }
            _url = _url + "&" + name + "=" + value;
        }

        function _addCategoriesFilterQueryStringParam(value) {
            if (_.isUndefined(value) || _.isNull(value)) {
                return;
            }
            _addMultiValueQueryStringParam("filter=categories", value);
        }

        function _addMultiValueQueryStringParam(prefix, ids) {
            if (_.isUndefined(ids) || _.isNull(ids)) {
                return;
            }
            var filteredIds = _filterIds(ids);
            if (filteredIds.length > 0) {
                _url = _url + "&" + prefix + "(" + filteredIds.join("+") + ")";
            }
        }

        function _addFromToQueryStringParam(prefix, value) {
            if (_.isUndefined(value) || _.isNull(value)) {
                return;
            }
            if (_.isArray(value)) {
                if (value.length === 1 || value.length === 2) {
                    _url = _url + "&" + prefix + "(" + value.join("|") + ")";
                }
            } else {
                _url = _url + "&" + prefix + "(" + value + ")";
            }
        }

        function _filterIds(ids) {
            var filteredIds = [];
            if (_.isArray(ids)) {
                filteredIds = _.filter(ids, function (id) { return id !== ""; });
            } else {
                if (ids !== "") {
                    filteredIds.push(ids);
                }
            }
            return filteredIds;
        }

        if (arguments.length >= 1) {
            this.apiKey(apiKeyValue);
        }

        if (arguments.length === 2) {
            this.affiliateId(affiliateIdValue);
        }
    };
} ());
