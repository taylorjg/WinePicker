/// <reference path="../jquery-1.9.1.js" />

angular.module("WinePickerApp")
    .directive("jtExternalLink", [function () {
        console.log(".directive() function for jtExternalLink");
        var directiveDefinitionObject = {
            restrict: "A",
            replace: true,
            template: "<span>&nbsp;<img src='/Content/Images/Icon_External_Link.png' title='External link' alt='External link' /></span>"
        };
        return directiveDefinitionObject;
    } ])
    .directive("jtCarouselCycle", [function () {
        console.log(".directive() function for jtCarouselCycle");
        var directiveDefinitionObject = {
            restrict: "A",
            link: function (scope, element, attrs) {
                var expr = attrs.jtCarouselCycle;
                console.log("jtCarouselCycle postLink() - expr: '" + expr + "'");
                scope.$watch(expr, function (value) {
                    console.log("jtCarouselCycle $watch function for '" + expr + "' - value: " + value);
                    var carouselAction = (value) ? "cycle" : "pause";
                    console.log("calling element.carousel('" + carouselAction + "')");
                    element.carousel(carouselAction);
                });
            }
        };
        return directiveDefinitionObject;
    } ])
    .directive("jtCarouselTracker", [function () {
        console.log(".directive() function for jtCarouselTracker");
        var directiveDefinitionObject = {
            restrict: "A",
            link: function (scope, element, attrs) {
                var expr = attrs.jtCarouselTracker;
                console.log("jtCarouselTracker postLink() - expr: '" + expr + "'");
                element.on("slid", function () {
                    console.log("jtCarouselTracker on slid");
                    var currentSlideNumber = $(".carousel-inner .active", element).index();
                    console.log("currentSlideNumber: " + currentSlideNumber);
                    scope.$apply(function () {
                        scope.$eval(expr + "=" + currentSlideNumber);
                    });
                });
            }
        };
        return directiveDefinitionObject;
    } ]);
