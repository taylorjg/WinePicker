/// <reference path="WineApi.js" />
/// <reference path="WinePickerController.js" />
/// <reference path="SearchResultsController.js" />
/// <reference path="WineDetailsController.js" />

angular.module("WinePickerApp", [/* requires */])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/search", {})
            .when("/searchResults", { templateUrl: "AngularJSTemplates/WinePicker/SearchResults.html", controller: SearchResultsController })
            .when("/wines/:id", { templateUrl: "AngularJSTemplates/WinePicker/WineDetails.html", controller: WineDetailsController })
            .otherwise({ redirectTo: "/search" });
    } ])
    .factory("urlBuilder", function () {
        var apiKey = "2fd879a5765785c043cc992b550d2bda";
        var urlBuilder = new wineApi.UrlBuilder(apiKey);
        return urlBuilder;
    });
