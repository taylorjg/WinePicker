/// <reference path="WineApi.js" />
/// <reference path="WineApiMenuData.js" />
/// <reference path="Models.js" />
/// <reference path="WineApiConstants.js" />
/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

function SearchCriteriaController($scope, $location) {

    "use strict";

    console.log("SearchCriteriaController - $location.path(): " + $location.path());

    $scope.searchCriteriaModel = new SearchCriteriaModel();
    
    $scope.onSearch = function () {
        var encodedSearchCriteria = $scope.searchCriteriaModel.encode();
        $location.path("/searchResults/" + encodedSearchCriteria);
    };

    $scope.onReset = function (suppressPathChange) {

        $scope.searchCriteriaModel.reset();

        _initialiseMenus();
        
        if (arguments.length === 0 || suppressPathChange === false) {
            $location.path("/search");
        }
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
        $scope.searchCriteriaModel.wineTypes = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_WINETYPE);
        $scope.searchCriteriaModel.varietals = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_VARIETAL);
        $scope.searchCriteriaModel.regions = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_REGION);
        $scope.searchCriteriaModel.appellations = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_APPELLATION);
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

SearchCriteriaController.$inject = ["$scope", "$location"];
