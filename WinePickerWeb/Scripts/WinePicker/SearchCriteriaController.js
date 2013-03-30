/// <reference path="WineApi.js" />
/// <reference path="WineApiMenuData.js" />
/// <reference path="Models.js" />
/// <reference path="WineApiConstants.js" />

// ReSharper disable InconsistentNaming

function SearchCriteriaController($scope, $location, $routeParams) {

    "use strict";

    console.log("SearchCriteriaController - $location.path(): " + $location.path());

    $scope.onSearch = function () {
        var encodedSearchCriteria = $scope.searchCriteriaModel.encode();
        $location.path("/searchResults/" + encodedSearchCriteria);
    };

    $scope.onReset = function (suppressPathChange) {
        $scope.wineTypes = [];
        $scope.varietals = [];
        $scope.regions = [];
        $scope.appellations = [];
        $scope.moreSearchCriteriaCollapsed = true;
        $scope.searchCriteriaModel = new SearchCriteriaModel();
        _initialiseMenus();
        if (arguments.length === 0 || suppressPathChange === false) {
            $location.path("/search");
        }
    };

    $scope.getLargeLabelImageUrlForProduct = function (product) {
        if (!product) {
            return "";
        }
        return product.Labels[0].Url.replace("m.jpg", "l.jpg");
    };

    $scope.onWineTypeChanged = function () {
    };

    $scope.onVarietalChanged = function () {
    };

    $scope.onRegionChanged = function () {
    };

    $scope.onAppellationChanged = function () {
    };

    var _initialiseMenus = function () {
        $scope.wineTypes = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_WINETYPE);
        $scope.varietals = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_VARIETAL);
        $scope.regions = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_REGION);
        $scope.appellations = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_APPELLATION);
    };

    var _getCategoryRefinements = function (data, categoryId) {
        var result = [];
        var filteredCategories = _.filter(data.Categories, function (c) { return c.Id === categoryId; });
        if (filteredCategories.length === 1) {
            result = filteredCategories[0].Refinements;
        }
        return result;
    };

    $scope.onReset(true /* suppressPathChange */);
}

SearchCriteriaController.$inject = ["$scope", "$location", "$routeParams"];
