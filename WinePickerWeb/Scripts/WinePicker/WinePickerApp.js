﻿/// <reference path="WineApi.js" />
/// <reference path="WinePickerController.js" />
/// <reference path="SearchResultsController.js" />
/// <reference path="WineDetailsController.js" />

angular.module("WinePickerApp", [/* requires */])
    .config(["$routeProvider", function($routeProvider) {
        console.log(".config() function");
        $routeProvider
            .when("/search", {})
            .when("/searchResults", { templateUrl: "AngularJSTemplates/WinePicker/SearchResults.html", controller: SearchResultsController })
            .when("/wines/:id", { templateUrl: "AngularJSTemplates/WinePicker/WineDetails.html", controller: WineDetailsController })
            .otherwise({ redirectTo: "/search" });
    }])
    .factory("urlBuilder", function() {
        console.log(".factory() function");
        var apiKey = "2fd879a5765785c043cc992b550d2bda";
        var urlBuilder = new wineApi.UrlBuilder(apiKey);
        return urlBuilder;
    })
    .directive("jtExternalLink", function() {
        console.log(".directive() function for jtExternalLink");
        var directiveDefinitionObject = {
            restrict: "A",
            replace: true,
            template: "<span>&nbsp;(at wine.com&nbsp;<img src='/Content/Images/Icon_External_Link.png' title='External link' alt='External link' />)</span>",
            link: function(scope, element, attrs) {
                console.log("jtExternalLink postLink()");
                console.dir(arguments);
            }
        };
        return directiveDefinitionObject;
    })
    .directive("jtCarouselCycle", function() {
        console.log(".directive() function for jtCarouselCycle");
        var directiveDefinitionObject = {
            restrict: "A",
            link: function(scope, element, attrs) {
                var expr = attrs.jtCarouselCycle;
                console.log("jtCarouselCycle postLink() - expr: '" + expr + "'");
                scope.$watch(expr, function(value) {
                    console.log("jtCarouselCycle $watch function for '" + expr + "' - value: " + value);
                    var carouselAction = (value) ? "cycle" : "pause";
                    console.log("calling $element.carousel('" + carouselAction + "')");
                    var $element = $(element);
                    $element.carousel(carouselAction);
                });
            }
        };
        return directiveDefinitionObject;
    });
