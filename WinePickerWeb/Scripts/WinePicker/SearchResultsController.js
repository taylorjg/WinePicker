/// <reference path="WineApi.js" />

// ReSharper disable InconsistentNaming

function SearchResultsController($scope, $location, searchResultsModel) {

    "use strict";

    console.log("SearchResultsController - $location.path(): " + $location.path());

    $scope.model = searchResultsModel;

    var page = 1;    
    for (var i = 0; i < $scope.products.Total; i = i + $scope.model.size) {
        $scope.model.pages.push(page);
        page = page + 1;
        if (page > 10) {
            break;
        }
    }
}

SearchResultsController.$inject = ["$scope", "$location", "searchResultsModel"];
