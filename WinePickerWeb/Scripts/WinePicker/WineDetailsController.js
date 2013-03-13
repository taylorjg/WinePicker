/// <reference path="WineApi.js" />
/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

function WineDetailsController($scope, $http, $location, $routeParams, urlBuilder) {

    "use strict";

    console.log("WineDetailsController - $location.path(): " + $location.path());

    var _urlBuilder = urlBuilder;

    $scope.id = $routeParams.id;
    $scope.hasProductAttributes = false;

    $scope.productAttributeHasImageUrl = function (productAttribute) {
        return productAttribute && productAttribute.ImageUrl != "";
    };

    var _populateData = function () {

        console.log("WineDetailsController _populateData()");

        $scope.product = null;

        var urlBuilderOptions = {
            products: $scope.id
        };
        if ($scope.state != "") {
            urlBuilderOptions.state = $scope.state;
            urlBuilderOptions.instock = $scope.instock;
        }
        var url = _urlBuilder.catalogService(urlBuilderOptions);

        $scope.invokeWineApi(url, function (data) {
            if (data.Products.List.length === 1) {
                $scope.product = data.Products.List[0];
                var filteredProductAttributes = _.filter($scope.product.ProductAttributes, $scope.productAttributeHasImageUrl);
                if (filteredProductAttributes.length > 0) {
                    $scope.hasProductAttributes = true;
                }
            }
        });
    };

    _populateData();
}

WineDetailsController.$inject = ["$scope", "$http", "$location", "$routeParams", "urlBuilder"];
