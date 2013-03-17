/// <reference path="WineApi.js" />

// ReSharper disable InconsistentNaming

function SearchResultsController($scope, $location, searchResultsModel) {

    "use strict";

    console.log("SearchResultsController - $location.path(): " + $location.path());

    $scope.model = searchResultsModel;
}

SearchResultsController.$inject = ["$scope", "$location", "searchResultsModel"];
