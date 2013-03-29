/// <reference path="WineApi.js" />
/// <reference path="Utils.js" />
/// <reference path="WineApiMenuData.js" />
/// <reference path="../underscore.js" />
/// <reference path="../angular.js" />

// ReSharper disable InconsistentNaming

function WinePickerController($scope, $http, $location) {

    "use strict";

    console.log("WinePickerController - $location.path(): " + $location.path());

    $scope.wineApiCallInProgress = false;
    $scope.errorMessages = null;
    $scope.errorMessagesVisible = false;
    
    $scope.beginWineApiCall = function () {
        $scope.wineApiCallInProgress = true;
    };

    $scope.endWineApiCall = function () {
        $scope.wineApiCallInProgress = false;
    };

    $scope.showErrorMessages = function (errorMessages) {

        var errorMessagesArray = [];

        if (arguments.length === 1) {
            if (angular.isArray(errorMessages)) {
                errorMessagesArray = errorMessages;
            }
            else {
                errorMessagesArray.push(errorMessages);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                errorMessagesArray.push(arguments[i]);
            }
        }

        if (errorMessagesArray.length === 0) {
            $scope.hideErrorMessages();
            return;
        }

        $scope.errorMessages = errorMessagesArray;
        $scope.errorMessagesVisible = true;
    };

    $scope.hideErrorMessages = function () {
        $scope.errorMessages = null;
        $scope.errorMessagesVisible = false;
    };
}

WinePickerController.$inject = ["$scope", "$http", "$location"];
