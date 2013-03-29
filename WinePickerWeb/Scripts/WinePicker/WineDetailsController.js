/// <reference path="Models.js" />
/// <reference path="../WinePicker/WinePickerController.js" />
/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

function WineDetailsController($scope, $location, $routeParams) {

    "use strict";

    console.log("WineDetailsController - $location.path(): " + $location.path());

    $scope.wineDetailsModel = new WineDetailsModel();

    $scope.invokeWineApiViaProxy("productCriteria=" + $routeParams.encodedProductCriteria, function (data) {
        if (data.Products.List.length === 1) {
            var product = data.Products.List[0];
            $scope.wineDetailsModel.product = product;
            $scope.wineDetailsModel.productAttributesWithImageUrl = _.filter(product.ProductAttributes, function (pa) {
                return pa && pa.ImageUrl !== "";
            });
        }
    });
}

WineDetailsController.$inject = ["$scope", "$location", "$routeParams"];
