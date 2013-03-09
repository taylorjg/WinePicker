/// <reference path="WineApi.js" />
/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

function WineDetailsController($scope, $http, $routeParams, urlBuilder) {

    "use strict";

    var _urlBuilder = urlBuilder;

    $scope.id = $routeParams.id;

    var _populateData = function () {

        $scope.product = null;

        var urlBuilderOptions = {
            products: $scope.id
        };
        var url = _urlBuilder.catalogService(urlBuilderOptions);
        url = url + "&callback=JSON_CALLBACK";

        $http.jsonp(url).success(function (data) {
            if (data.Status.ReturnCode === 0) {
                if (data.Products.List.length === 1) {
                    $scope.product = data.Products.List[0];
                }
            }
        });
    };

    _populateData();
}

WineDetailsController.$inject = ["$scope", "$http", "$routeParams", "urlBuilder"];
