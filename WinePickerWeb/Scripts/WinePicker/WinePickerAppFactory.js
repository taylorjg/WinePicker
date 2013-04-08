/// <reference path="../angular.js" />
/// <reference path="Models.js" />
/// <reference path="WineApiProxy.js" />

(function () {

    "use strict";

    angular.module("WinePickerApp")
    .factory("searchResultsModel", [function () {
        console.log("searchResultsModelProvider.$get()");
        return new SearchResultsModel();
    } ])
    .factory("wineApiProxy", ["$http", function ($http) {
        console.log("wineApiProxyProvider.$get()");
        return new WineApiProxy($http);
    } ]);
} ());
