/// <reference path="Models.js" />

// ReSharper disable InconsistentNaming

function SearchResultsController($scope, $location, $routeParams, searchResultsModel) {

    "use strict";

    console.log("SearchResultsController - $location.path(): " + $location.path());

    var searchCriteriaModel = new SearchCriteriaModel();
    searchCriteriaModel.decode($routeParams.encodedSearchCriteria);
    
    $scope.searchResultsModel = searchResultsModel;
    
    $scope.searchResultsModel.products = null;
    $scope.searchResultsModel.pages = [];
    $scope.searchResultsModel.state = searchCriteriaModel.state;
    $scope.searchResultsModel.instock = searchCriteriaModel.instock;

    $scope.invokeWineApiViaProxy("searchCriteria=" + $routeParams.encodedSearchCriteria, function (data) {
        $scope.searchResultsModel.products = data.Products;
        var page = 1;
        for (var i = 0; i < $scope.searchResultsModel.products.Total; i = i + $scope.searchResultsModel.size) {
            $scope.searchResultsModel.pages.push(page);
            page = page + 1;
            if (page > 10) {
                break;
            }
        }
    });
}

SearchResultsController.$inject = ["$scope", "$location", "$routeParams", "searchResultsModel"];
