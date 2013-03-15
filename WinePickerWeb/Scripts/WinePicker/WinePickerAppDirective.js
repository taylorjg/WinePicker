angular.module("WinePickerApp")
    .directive("jtExternalLink", [function() {
        console.log(".directive() function for jtExternalLink");
        var directiveDefinitionObject = {
            restrict: "A",
            replace: true,
            template: "<span>&nbsp;<img src='/Content/Images/Icon_External_Link.png' title='External link' alt='External link' /></span>"
        };
        return directiveDefinitionObject;
    }])
    .directive("jtCarouselCycle", [function() {
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
    }]);
