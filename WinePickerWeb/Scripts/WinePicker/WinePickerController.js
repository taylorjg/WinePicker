/// <reference path="WineApi.js" />
/// <reference path="WineApi.js" />
/// <reference path="WineApiMenuData.js" />
/// <reference path="../underscore.js" />
/// <reference path="../angular.js" />

// ReSharper disable InconsistentNaming

function WinePickerController($scope, $http, $location, urlBuilder) {

    "use strict";

    console.log("WinePickerController - $location.path(): " + $location.path());

    var _urlBuilder = urlBuilder;

    $scope.onSearch = function () {

        var categoryIds = [];
        categoryIds.push($scope.selectedWineType);
        categoryIds.push($scope.selectedVarietal);
        categoryIds.push($scope.selectedRegion);
        categoryIds.push($scope.selectedAppellation);

        var urlBuilderOptions = {
            categories: categoryIds,
            search: $scope.searchTerm
        };
        if ($scope.state != "") {
            urlBuilderOptions.state = $scope.state;
            urlBuilderOptions.instock = $scope.instock;
        }
        if (angular.isNumber($scope.priceFrom)) {
            var priceFilter = [$scope.priceFrom];
            if (angular.isNumber($scope.priceTo) && $scope.priceTo > $scope.priceFrom) {
                priceFilter.push($scope.priceTo);
            }
            urlBuilderOptions.price = priceFilter;
        }
        if (angular.isNumber($scope.ratingFrom)) {
            var ratingFilter = [$scope.ratingFrom];
            if (angular.isNumber($scope.ratingTo) && $scope.ratingTo > $scope.ratingFrom) {
                ratingFilter.push($scope.ratingTo);
            }
            urlBuilderOptions.rating = ratingFilter;
        }
        var url = _urlBuilder.catalogService(urlBuilderOptions);

        $scope.products = null;

        $scope.invokeWineApi(url, function (data) {
            $scope.products = data.Products;
            $location.path("/searchResults");
        });
    };

    $scope.onReset = function () {
        $scope.wineApiCallInProgress = false;
        $scope.errorMessagesVisible = false;
        $scope.errorMessages = null;
        $scope.wineTypes = [];
        $scope.varietals = [];
        $scope.regions = [];
        $scope.appellations = [];
        $scope.selectedWineType = "";
        $scope.selectedVarietal = "";
        $scope.selectedRegion = "";
        $scope.selectedAppellation = "";
        $scope.searchTerm = "";
        $scope.moreSearchCriteriaCollapsed = true;
        $scope.state = "";
        $scope.instock = false;
        $scope.priceFrom = "";
        $scope.priceTo = "";
        $scope.ratingFrom = "";
        $scope.ratingTo = "";
        $scope.products = null;
        _initialiseMenus();
    };

    $scope.getLargeLabelImageUrlForProduct = function (product) {
        if (!product) {
            return "";
        }
        return product.Labels[0].Url.replace("m.jpg", "l.jpg");
    };

    $scope.beginWineApiCall = function() {
        $scope.wineApiCallInProgress = true;
    };

    $scope.endWineApiCall = function () {
        $scope.wineApiCallInProgress = false;
    };

    $scope.showErrorMessages = function (errorMessages) {

        var errorMessagesArray = [];

        if (arguments.length === 1) {
            if (angular.isArray(errorMessages)) {
                errorMessagesArray = errorMessages;
            }
            else {
                errorMessagesArray.push(errorMessages);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                errorMessagesArray.push(arguments[i]);
            }
        }

        if (errorMessagesArray.length === 0) {
            $scope.hideErrorMessages();
            return;
        }

        $scope.errorMessages = errorMessagesArray;
        $scope.errorMessagesVisible = true;
    };

    $scope.hideErrorMessages = function() {
        $scope.errorMessages = null;
        $scope.errorMessagesVisible = false;
    };

    $scope.invokeWineApi = function (url, fn) {
        $scope.beginWineApiCall();
        var originalUrl = url;
        url = url + "&callback=JSON_CALLBACK";
        $http.jsonp(url)
            .success(function (data) {
                if (data && data.Status && data.Status.ReturnCode === 0) {
                    $scope.hideErrorMessages();
                    fn(data);
                } else {
                    $scope.showErrorMessages(data.Status.Messages);
                }
                $scope.endWineApiCall();
            })
            .error(function (/* data, status, headers, config */) {
                // The status parameter seems to always be 0.
                // Is this because we did a jsonp request (as opposed to, say, a get request) ?
                $scope.showErrorMessages("Failed to invoke wine.com API call.", "url: " + originalUrl);
                $scope.endWineApiCall();
            });
    };

    var _getCategoryRefinements = function (data, categoryId) {
        var result = [];
        var filteredCategories = _.filter(data.Categories, function (c) { return c.Id === categoryId; });
        if (filteredCategories.length === 1) {
            result = filteredCategories[0].Refinements;
        }
        return result;
    };

    var _initialiseMenus = function() {
        $scope.wineTypes = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_WINETYPE);
        $scope.varietals = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_VARIETAL);
        $scope.regions = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_REGION);
        $scope.appellations = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_APPELLATION);
    };

    var _getMenuData = function (categoryIdToShow, categoryIdToFilterBy, fn) {

        var urlBuilderOptions = {
            categories: [wineApi.constants.SHOP_WINE_ONLY, categoryIdToFilterBy],
            show: categoryIdToShow
        };
        var url = _urlBuilder.categoryMapService(urlBuilderOptions);

        $scope.invokeWineApi(url, function(data) {
            var refinements = _getCategoryRefinements(data, categoryIdToShow);
            fn(refinements);
        });
    };

    $scope.onWineTypeChanged = function () {
        _getMenuData(wineApi.constants.CATEGORY_ID_VARIETAL, $scope.selectedWineType, function (refinements) {
            $scope.varietals = refinements;
        });
    };

    $scope.onVarietalChanged = function() {
    };
    
    $scope.onRegionChanged = function () {
        _getMenuData(wineApi.constants.CATEGORY_ID_APPELLATION, $scope.selectedRegion, function (refinements) {
            $scope.appellations = refinements;
        });
    };

    $scope.onAppellationChanged = function () {
    };

    $scope.onStateChanged = function() {
    };

    $scope.onReset();
}

WinePickerController.$inject = ["$scope", "$http", "$location", "urlBuilder"];
