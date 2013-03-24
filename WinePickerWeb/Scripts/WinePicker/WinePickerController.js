/// <reference path="WineApi.js" />
/// <reference path="WineApiMenuData.js" />
/// <reference path="../underscore.js" />
/// <reference path="../angular.js" />

// ReSharper disable InconsistentNaming

function WinePickerController($scope, $http, $location) {

    "use strict";

    console.log("WinePickerController - $location.path(): " + $location.path());

    $scope.onSearch = function () {
        var searchCriteria = _buildSearchCriteria();
        $scope.invokeWineApiViaProxy(searchCriteria, function (data) {
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
        $scope.sortOrder = "popularity";
        $scope.sortDirection = "descending";
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

    $scope.invokeWineApiViaProxy = function(queryString, fn) {
        $scope.beginWineApiCall();
        var url = "api/wineapi?" + queryString;
        $http.get(url)
            .success(function (data) {
                if (data && data.Status && data.Status.ReturnCode === 0) {
                    $scope.hideErrorMessages();
                    fn(data);
                } else {
                    $scope.showErrorMessages(data.Status.Messages);
                }
                $scope.endWineApiCall();
            })
            .error(function (data, status) {
                // http://www.asp.net/web-api/overview/web-api-routing-and-actions/exception-handling
                if (data.Message && data.MessageDetail) {
                    $scope.showErrorMessages("Failed to invoke wine.com API via server proxy - HTTP status code: " + status, data.Message, data.MessageDetail);
                } else {
                    $scope.showErrorMessages(data);
                }
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

    $scope.onWineTypeChanged = function () {
    };

    $scope.onVarietalChanged = function() {
    };
    
    $scope.onRegionChanged = function () {
    };

    $scope.onAppellationChanged = function () {
    };

    $scope.onStateChanged = function() {
    };

    $scope.onReset();

    var _addCriteriaComponent = function (criteria, name, value) {
        if (criteria !== "") {
            criteria = criteria + "|";
        }
        criteria = criteria + name + ":" + value;
        return criteria;
    };

    var _buildSearchCriteria = function () {

        var searchCriteria = "";

        if ($scope.selectedWineType !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "wt", $scope.selectedWineType);
        }

        if ($scope.selectedVarietal !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "v", $scope.selectedVarietal);
        }

        if ($scope.selectedRegion !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "r", $scope.selectedRegion);
        }

        if ($scope.selectedAppellation !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "a", $scope.selectedAppellation);
        }

        if ($scope.searchTerm !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "s", $scope.searchTerm);
        }

        if ($scope.state !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "st", $scope.state);
            if ($scope.instock === "1") {
                searchCriteria = _addCriteriaComponent(searchCriteria, "is", $scope.instock);
            }
        }

        if ($scope.priceFrom !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "pf", $scope.priceFrom);
            if ($scope.priceTo !== "") {
                searchCriteria = _addCriteriaComponent(searchCriteria, "pt", $scope.priceTo);
            }
        }

        if ($scope.ratingFrom !== "") {
            searchCriteria = _addCriteriaComponent(searchCriteria, "rf", $scope.ratingFrom);
            if ($scope.ratingTo !== "") {
                searchCriteria = _addCriteriaComponent(searchCriteria, "rt", $scope.ratingTo);
            }
        }

        searchCriteria = _addCriteriaComponent(searchCriteria, "so", $scope.sortOrder);
        searchCriteria = _addCriteriaComponent(searchCriteria, "sd", $scope.sortDirection);

        return "searchCriteria=" + searchCriteria;
    };
}

WinePickerController.$inject = ["$scope", "$http", "$location"];
