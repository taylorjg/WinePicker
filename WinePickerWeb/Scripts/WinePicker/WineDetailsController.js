/// <reference path="WineApi.js" />
/// <reference path="Utils.js" />
/// <reference path="../WinePicker/WinePickerController.js" />
/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

function WineDetailsController($scope, $http, $location, $routeParams) {

    "use strict";

    console.log("WineDetailsController - $location.path(): " + $location.path());

    $scope.id = $routeParams.id;
    $scope.hasProductAttributes = false;

    $scope.productAttributeHasImageUrl = function (productAttribute) {
        return productAttribute && productAttribute.ImageUrl !== "";
    };

    var _populateData = function () {

        $scope.product = null;

        var productCriteria = _buildProductCriteria();

        $scope.invokeWineApiViaProxy(productCriteria, function (data) {
            if (data.Products.List.length === 1) {
                $scope.product = data.Products.List[0];
                var filteredProductAttributes = _.filter($scope.product.ProductAttributes, $scope.productAttributeHasImageUrl);
                if (filteredProductAttributes.length > 0) {
                    $scope.hasProductAttributes = true;
                }
            }
        });
    };

    var _buildProductCriteria = function () {
        var criteriaBuilder = new CriteriaBuilder("productCriteria");
        criteriaBuilder.addComponent("id", $scope.id);
        if ($scope.searchCriteriaModel.state !== "") {
            criteriaBuilder.addComponent("st", $scope.searchCriteriaModel.state);
            if ($scope.searchCriteriaModel.instock === "1") {
                criteriaBuilder.addComponent("is", $scope.searchCriteriaModel.instock);
            }
        }
        return criteriaBuilder.criteria();
    };

    _populateData();
}

WineDetailsController.$inject = ["$scope", "$http", "$location", "$routeParams"];
