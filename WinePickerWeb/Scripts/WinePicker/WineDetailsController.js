/// <reference path="WineApi.js" />
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

    var _addCriteriaComponent = function (criteria, name, value) {
        if (criteria !== "") {
            criteria = criteria + "|";
        }
        criteria = criteria + name + ":" + value;
        return criteria;
    };

    var _buildProductCriteria = function () {
        var productCriteria = "";
        productCriteria = _addCriteriaComponent(productCriteria, "id", $scope.id);
        if ($scope.state !== "") {
            productCriteria = _addCriteriaComponent(productCriteria, "st", $scope.state);
            if ($scope.instock === "1") {
                productCriteria = _addCriteriaComponent(productCriteria, "is", $scope.instock);
            }
        }
        return "productCriteria=" + productCriteria;
    };

    _populateData();
}

WineDetailsController.$inject = ["$scope", "$http", "$location", "$routeParams"];
