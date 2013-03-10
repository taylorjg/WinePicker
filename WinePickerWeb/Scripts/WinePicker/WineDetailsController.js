﻿/// <reference path="WineApi.js" />
/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

function WineDetailsController($scope, $http, $location, $routeParams, urlBuilder) {

    "use strict";

    console.log("WineDetailsController - $location.path(): " + $location.path());

    var _urlBuilder = urlBuilder;

    $scope.id = $routeParams.id;

    $scope.productAttributeWithImageUrl = function (productAttribute) {
        return productAttribute.ImageUrl != "";
    };

    var _populateData = function() {

        console.log("WineDetailsController _populateData()");
        
        $scope.product = null;

        var urlBuilderOptions = {
            products: $scope.id,
            state: $scope.state,
            instock: $scope.instock
        };
        var url = _urlBuilder.catalogService(urlBuilderOptions);
        url = url + "&callback=JSON_CALLBACK";

        $scope.showProgressBar();
        $http.jsonp(url)
            .success(function(data) {
                if (data.Status.ReturnCode === 0) {
                    if (data.Products.List.length === 1) {
                        $scope.product = data.Products.List[0];
                    }
                }
                $scope.hideProgressBar();
            })
            .error(function() {
                $scope.hideProgressBar();
            });
    };

    _populateData();
}

WineDetailsController.$inject = ["$scope", "$http", "$location", "$routeParams", "urlBuilder"];