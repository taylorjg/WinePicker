/// <reference path="../angular.js" />
/// <reference path="../underscore.js" />
/// <reference path="WineApiProxy.js" />
/// <reference path="Models.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.winePicker = window.winePicker || {};
    window.winePicker.controllers = window.winePicker.controllers || {};

    window.winePicker.controllers.SearchResultsController = function($scope, $location, $routeParams, wineApiProxy, searchResultsModel) {

        console.log("window.winePicker.controllers.SearchResultsController - $location.path(): " + $location.path());

        var searchCriteriaModel = new winePicker.models.SearchCriteriaModel();
        searchCriteriaModel.decode($routeParams.encodedSearchCriteria);

        $scope.searchResultsModel = searchResultsModel;
        $scope.searchResultsModel.resetForNewSearch();
        $scope.searchResultsModel.state = searchCriteriaModel.state;
        $scope.searchResultsModel.instock = searchCriteriaModel.instock;

        $scope.setAbsolutePage = function(pageIndex) {
            _displayPageIndex(pageIndex);
        };

        $scope.setRelativePage = function(relativeChange) {
            _displayPageIndex($scope.searchResultsModel.currentPageIndex + relativeChange);
        };

        $scope.getLargeLabelImageUrlForProduct = function(product) {
            return wineApiProxy.getLargeLabelImageUrlForProduct(product);
        };

        var _displayPageIndex = function(pageIndex) {

            if (pageIndex < 0 || pageIndex > $scope.searchResultsModel.lastPageIndex) {
                return;
            }

            var offset = pageIndex * $scope.searchResultsModel.size;
            var size = $scope.searchResultsModel.size;

            var cacheMatch = _findCachedProducts(offset);
            if (cacheMatch) {
                $scope.searchResultsModel.products = cacheMatch;
                $scope.searchResultsModel.currentPageIndex = pageIndex;
                return;
            }

            var searchCriteria = "searchCriteria=" + $routeParams.encodedSearchCriteria;
            searchCriteria = searchCriteria + "|o:" + offset;
            searchCriteria = searchCriteria + "|sz:" + size;
            console.log(searchCriteria);

            wineApiProxy.callWineApi(searchCriteria, function(data) {

                $scope.searchResultsModel.products = data.Products;

                if ($scope.searchResultsModel.pages.length === 0) {
                    var page = 1;
                    for (var i = 0; i < $scope.searchResultsModel.products.Total; i = i + $scope.searchResultsModel.size) {
                        $scope.searchResultsModel.pages.push(page);
                        page = page + 1;
                        if (page > 10) {
                            break;
                        }
                    }
                    $scope.searchResultsModel.lastPageIndex = Math.floor($scope.searchResultsModel.products.Total / $scope.searchResultsModel.size);
                    $scope.searchResultsModel.currentSlideNumber = 0;
                }

                $scope.searchResultsModel.currentPageIndex = pageIndex;

                _addCachedProducts(offset, $scope.searchResultsModel.products);
            });
        };

        var _findCachedProducts = function(offset) {
            var result = null;
            var cacheMatches = _.filter($scope.searchResultsModel.cachedProducts, function(cp) {
                return cp.offset === offset;
            });
            if (cacheMatches.length === 1) {
                console.log("Cache match for offset " + offset);
                result = cacheMatches[0].products;
            }
            return result;
        };

        var _addCachedProducts = function(offset, products) {
            $scope.searchResultsModel.cachedProducts.push({
                offset: offset,
                products: products
            });
        };

        _displayPageIndex(0);
    };

    window.winePicker.controllers.SearchResultsController.$inject = ["$scope", "$location", "$routeParams", "wineApiProxy", "searchResultsModel"];
} ());
