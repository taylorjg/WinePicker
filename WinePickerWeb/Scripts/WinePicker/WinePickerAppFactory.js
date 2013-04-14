/// <reference path="../angular.js" />
/// <reference path="Models.js" />
/// <reference path="WineApiProxy.js" />

(function () {

    "use strict";

    angular.module("WinePickerApp")
    .factory("searchResultsModel", [function () {
        console.log("searchResultsModelProvider.$get()");
        return new winePicker.models.SearchResultsModel();
    } ])
    .factory("wineApiProxy", ["$http", function ($http) {
        console.log("wineApiProxyProvider.$get()");
        return new winePicker.services.WineApiProxy($http);
    } ]);
} ());
