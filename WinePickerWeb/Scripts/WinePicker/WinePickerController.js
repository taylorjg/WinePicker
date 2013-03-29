/// <reference path="WineApiProxy.js" />
/// <reference path="../angular.js" />

// ReSharper disable InconsistentNaming

function WinePickerController($scope, $http, $location, wineApiProxy) {

    "use strict";

    console.log("WinePickerController - $location.path(): " + $location.path());

    $scope.wineApiCallInProgress = false;
    $scope.errorMessages = null;
    $scope.errorMessagesVisible = false;

    wineApiProxy.start(function() {
        $scope.wineApiCallInProgress = true;
    });

    wineApiProxy.end(function() {
        $scope.wineApiCallInProgress = false;
    });

    wineApiProxy.error(function (errorMessages) {
        $scope.errorMessages = errorMessages;
        $scope.errorMessagesVisible = errorMessages.length > 0;
    });
}

WinePickerController.$inject = ["$scope", "$http", "$location", "wineApiProxy"];
