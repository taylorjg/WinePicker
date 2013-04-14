/// <reference path="../angular.js" />
/// <reference path="../underscore.js" />
/// <reference path="WineApiMenuData.js" />
/// <reference path="WineApiConstants.js" />
/// <reference path="WineApiProxy.js" />
/// <reference path="Models.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.SearchCriteriaController = function SearchCriteriaController($scope, $location, wineApiProxy) {

        console.log("SearchCriteriaController - $location.path(): " + $location.path());

        $scope.searchCriteriaModel = new winePicker.models.SearchCriteriaModel();

        $scope.onSearch = function () {
            var encodedSearchCriteria = $scope.searchCriteriaModel.encode();
            $location.path("/searchResults/" + encodedSearchCriteria);
        };

        $scope.onReset = function (suppressPathChange) {

            $scope.searchCriteriaModel.reset();
            wineApiProxy.clearErrors();

            if (arguments.length === 0 || suppressPathChange === false) {
                $location.path("/search");
            }
        };

        $scope.onWineTypeChanged = function () {
            console.log("$scope.onWineTypeChanged");
            var selectedWineType = $scope.searchCriteriaModel.wineType;
            if (selectedWineType) {
                console.log("selectedWineType - Name: " + selectedWineType.Name + "; Id: " + selectedWineType.Id);
                var filteredVarietals = _.filter($scope.searchCriteriaModel.allVarietals, function (v) {
                    return _.contains(v.AssociatedWineTypes, selectedWineType.Id);
                });
                $scope.searchCriteriaModel.varietals = filteredVarietals;
            } else {
                $scope.searchCriteriaModel.varietals = $scope.searchCriteriaModel.allVarietals;
            }
        };

        $scope.onVarietalChanged = function () {
            console.log("$scope.onVarietalChanged");
            var selectedVarietal = $scope.searchCriteriaModel.varietal;
            if (selectedVarietal) {
                console.log("selectedVarietal - Name: " + selectedVarietal.Name + "; Id: " + selectedVarietal.Id);
                var matchingVarietals = _.filter($scope.searchCriteriaModel.varietals, function (v) {
                    return v.Id === selectedVarietal.Id;
                });
                if (matchingVarietals.length === 1) {
                    var associatedWineTypeId = matchingVarietals[0].AssociatedWineTypes[0];
                    var associatedWineType = $scope.searchCriteriaModel.findWineTypeById(associatedWineTypeId);
                    $scope.searchCriteriaModel.wineType = associatedWineType;
                }
            }
        };

        $scope.onRegionChanged = function () {
            console.log("$scope.onRegionChanged");
            var selectedRegion = $scope.searchCriteriaModel.region;
            if (selectedRegion) {
                console.log("selectedRegion - Name: " + selectedRegion.Name + "; Id: " + selectedRegion.Id);
                var filteredAppellations = _.filter($scope.searchCriteriaModel.allAppellations, function (a) {
                    return _.contains(a.AssociatedRegions, selectedRegion.Id);
                });
                $scope.searchCriteriaModel.appellations = filteredAppellations;
            } else {
                $scope.searchCriteriaModel.appellations = $scope.searchCriteriaModel.allAppellations;
            }
        };

        $scope.onAppellationChanged = function () {
            console.log("$scope.onAppellationChanged");
            var selectedAppellation = $scope.searchCriteriaModel.appellation;
            if (selectedAppellation) {
                console.log("selectedAppellation - Name: " + selectedAppellation.Name + "; Id: " + selectedAppellation.Id);
                var matchingAppellations = _.filter($scope.searchCriteriaModel.appellations, function (a) {
                    return a.Id === selectedAppellation.Id;
                });
                if (matchingAppellations.length === 1) {
                    var associatedRegionId = matchingAppellations[0].AssociatedRegions[0];
                    var associatedRegion = $scope.searchCriteriaModel.findRegionById(associatedRegionId);
                    $scope.searchCriteriaModel.region = associatedRegion;
                }
            }
        };

        var _initialiseMenus = function () {
            $scope.searchCriteriaModel.allWineTypes = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_WINETYPE);
            $scope.searchCriteriaModel.allVarietals = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_VARIETAL);
            $scope.searchCriteriaModel.allRegions = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_REGION);
            $scope.searchCriteriaModel.allAppellations = _getCategoryRefinements(wineApi.menuData, wineApi.constants.CATEGORY_ID_APPELLATION);
        };

        var _getCategoryRefinements = function (data, categoryId) {
            var result = [];
            var filteredCategories = _.filter(data.Categories, function (c) { return c.Id === categoryId; });
            if (filteredCategories.length === 1) {
                result = filteredCategories[0].Refinements;
            }
            return result;
        };

        _initialiseMenus();

        $scope.onReset(true /* suppressPathChange */);
    };

    SearchCriteriaController.$inject = ["$scope", "$location", "wineApiProxy"];
} ());
