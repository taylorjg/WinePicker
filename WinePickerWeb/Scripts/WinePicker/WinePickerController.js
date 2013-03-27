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

    $scope.invokeWineApiViaProxy = function (queryString, fn) {
        $scope.beginWineApiCall();
        var url = "api/wineapi?" + queryString;
        $http.get(url)
            .success(function (data) {
                if (data && data.Status && data.Status.ReturnCode === 0) {
                    $scope.hideErrorMessages();
                    fn(data);
                } else {
                    $scope.showErrorMessages(data.Status.Messages);
                }
                $scope.endWineApiCall();
            })
            .error(function (data, status) {
                // http://www.asp.net/web-api/overview/web-api-routing-and-actions/exception-handling
                if (data.Message && data.MessageDetail) {
                    $scope.showErrorMessages("Failed to invoke wine.com API via server proxy - HTTP status code: " + status, data.Message, data.MessageDetail);
                } else {
                    $scope.showErrorMessages(data);
                }
                $scope.endWineApiCall();
            });
    };
}

WinePickerController.$inject = ["$scope", "$http", "$location"];
