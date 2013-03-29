angular.module("WinePickerApp")
    .config(["$routeProvider", function($routeProvider) {
        console.log(".config() function");
        $routeProvider
            .when("/searchCriteria", {})
            .when("/searchResults/:encodedSearchCriteria", { templateUrl: "AngularJSTemplates/WinePicker/SearchResults.html", controller: SearchResultsController })
            .when("/wineDetails/:encodedProductCriteria", { templateUrl: "AngularJSTemplates/WinePicker/WineDetails.html", controller: WineDetailsController })
            .otherwise({ redirectTo: "/searchCriteria" });
    }]);
