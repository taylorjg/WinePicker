/// <reference path="WineApi.js" />

// ReSharper disable InconsistentNaming

function SearchResultsController($scope, $location, urlBuilder) {

    "use strict";

    console.log("SearchResultsController - $location.path(): " + $location.path());

    var _urlBuilder = urlBuilder;
}

SearchResultsController.$inject = ["$scope", "$location", "urlBuilder"];
