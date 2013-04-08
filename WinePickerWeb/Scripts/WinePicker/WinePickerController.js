/// <reference path="../angular.js" />
/// <reference path="WineApiProxy.js" />
/// <reference path="Models.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.WinePickerController = function WinePickerController($scope, $http, $location, wineApiProxy) {

        console.log("WinePickerController - $location.path(): " + $location.path());

        $scope.winePickerModel = new WinePickerModel();

        wineApiProxy.start(function() {
            $scope.winePickerModel.wineApiCallInProgress = true;
        });

        wineApiProxy.end(function() {
            $scope.winePickerModel.wineApiCallInProgress = false;
        });

        wineApiProxy.error(function(errorMessages) {
            $scope.winePickerModel.errorMessages = errorMessages;
            $scope.winePickerModel.errorMessagesVisible = errorMessages.length > 0;
        });
    };

    WinePickerController.$inject = ["$scope", "$http", "$location", "wineApiProxy"];
} ());
