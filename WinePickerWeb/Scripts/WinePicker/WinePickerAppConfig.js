angular.module("WinePickerApp")
    .config(["$routeProvider", function($routeProvider) {
        console.log(".config() function");
        $routeProvider
            .when("/search", {})
            .when("/searchResults", { templateUrl: "AngularJSTemplates/WinePicker/SearchResults.html", controller: SearchResultsController })
            .when("/wines/:id", { templateUrl: "AngularJSTemplates/WinePicker/WineDetails.html", controller: WineDetailsController })
            .otherwise({ redirectTo: "/search" });
    }]);
