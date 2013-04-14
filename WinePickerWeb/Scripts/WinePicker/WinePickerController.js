/// <reference path="../angular.js" />
/// <reference path="WineApiProxy.js" />
/// <reference path="Models.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.winePicker = window.winePicker || {};
    window.winePicker.controllers = window.winePicker.controllers || {};

    window.winePicker.controllers.WinePickerController = function($scope, $http, $location, wineApiProxy) {

        console.log("winePicker.controllers.WinePickerController - $location.path(): " + $location.path());

        $scope.winePickerModel = new winePicker.models.WinePickerModel();

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

    window.winePicker.controllers.WinePickerController.$inject = ["$scope", "$http", "$location", "wineApiProxy"];
} ());
