﻿/// <reference path="WineApi.js" />
/// <reference path="WineApiMenuData.js" />
/// <reference path="../underscore.js" />

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
            search: $scope.searchTerm,
            state: $scope.state,
            instock: $scope.instock
        };
        var url = _urlBuilder.catalogService(urlBuilderOptions);
        url = url + "&callback=JSON_CALLBACK";

        $scope.showProgressBar();
        $http.jsonp(url)
            .success(function (data) {
                if (data.Status.ReturnCode === 0) {
                    $scope.products = data.Products;
                    if (!$scope.$$phase) {
                        $scope.$apply();
                    }
                }
                $scope.hideProgressBar();
                $location.path("/searchResults");
            })
            .error(function () {
                $scope.hideProgressBar();
            });
    };

    $scope.onReset = function () {
        $scope.progressBarVisible = false;
        $scope.wineTypes = [];
        $scope.varietals = [];
        $scope.regions = [];
        $scope.appellations = [];
        $scope.selectedWineType = "";
        $scope.selectedVarietal = "";
        $scope.selectedRegion = "";
        $scope.selectedAppellation = "";
        $scope.searchTerm = "";
        $scope.state = "CA";
        $scope.instock = true;
        $scope.products = null;
        _initialiseMenus();
    };

    $scope.getLargeLabelImageUrlForProduct = function (product) {
        if (!product) {
            return "";
        }
        return product.Labels[0].Url.replace("m.jpg", "l.jpg");
    };

    $scope.showProgressBar = function() {
        $scope.progressBarVisible = true;
    };

    $scope.hideProgressBar = function () {
        $scope.progressBarVisible = false;
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

    var _getMenuData = function(categoryIdToShow, categoryIdToFilterBy, fn) {

        var urlBuilderOptions = {
            categories: [wineApi.constants.SHOP_WINE_ONLY, categoryIdToFilterBy],
            show: categoryIdToShow
        };
        var url = _urlBuilder.categoryMapService(urlBuilderOptions);
        url = url + "&callback=JSON_CALLBACK";

        $scope.showProgressBar();
        $http.jsonp(url)
            .success(function(data) {
                if (data.Status.ReturnCode === 0) {
                    var result = _getCategoryRefinements(data, categoryIdToShow);
                    fn(result);
                }
                $scope.hideProgressBar();
            })
            .error(function() {
                $scope.hideProgressBar();
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
