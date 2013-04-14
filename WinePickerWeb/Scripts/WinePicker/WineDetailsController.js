/// <reference path="../angular.js" />
/// <reference path="../underscore.js" />
/// <reference path="WineApiProxy.js" />
/// <reference path="Models.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.winePicker = window.winePicker || {};
    window.winePicker.controllers = window.winePicker.controllers || {};

    window.winePicker.controllers.WineDetailsController = function($scope, $location, $routeParams, wineApiProxy) {

        console.log("window.winePicker.controllers.WineDetailsController - $location.path(): " + $location.path());

        $scope.wineDetailsModel = new winePicker.models.WineDetailsModel();

        wineApiProxy.callWineApi("productCriteria=" + $routeParams.encodedProductCriteria, function(data) {
            if (data.Products.List.length === 1) {
                var product = data.Products.List[0];
                $scope.wineDetailsModel.product = product;
                $scope.wineDetailsModel.productAttributesWithImageUrl = _.filter(product.ProductAttributes, function(pa) {
                    return pa && pa.ImageUrl !== "";
                });
            }
        });

        $scope.getLargeLabelImageUrlForProduct = function(product) {
            return wineApiProxy.getLargeLabelImageUrlForProduct(product);
        };
    };

    window.winePicker.controllers.WineDetailsController.$inject = ["$scope", "$location", "$routeParams", "wineApiProxy"];
} ());
