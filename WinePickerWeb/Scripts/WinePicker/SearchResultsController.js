/// <reference path="WineApiProxy.js" />
/// <reference path="Models.js" />

// ReSharper disable InconsistentNaming

function SearchResultsController($scope, $location, $routeParams, wineApiProxy, searchResultsModel) {

    "use strict";

    console.log("SearchResultsController - $location.path(): " + $location.path());

    var searchCriteriaModel = new SearchCriteriaModel();
    searchCriteriaModel.decode($routeParams.encodedSearchCriteria);

    $scope.searchResultsModel = searchResultsModel;
    $scope.searchResultsModel.resetForNewSearch();
    $scope.searchResultsModel.state = searchCriteriaModel.state;
    $scope.searchResultsModel.instock = searchCriteriaModel.instock;

    $scope.setAbsolutePage = function (pageIndex) {
        _displayPageIndex(pageIndex);
    };

    $scope.setRelativePage = function(relativeChange) {
        _displayPageIndex($scope.searchResultsModel.currentPageIndex + relativeChange);
    };

    $scope.getLargeLabelImageUrlForProduct = function (product) {
        return wineApiProxy.getLargeLabelImageUrlForProduct(product);
    };

    var _displayPageIndex = function (pageIndex) {

        var searchCriteria = "searchCriteria=" + $routeParams.encodedSearchCriteria;
        searchCriteria = searchCriteria + "|o:" + (pageIndex * $scope.searchResultsModel.size);
        searchCriteria = searchCriteria + "|sz:" + $scope.searchResultsModel.size;
        console.log(searchCriteria);

        wineApiProxy.callWineApi(searchCriteria, function (data) {

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
        });
    };

    _displayPageIndex(0);
}

SearchResultsController.$inject = ["$scope", "$location", "$routeParams", "wineApiProxy", "searchResultsModel"];
