/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../WinePickerController.js" />
/// <reference path="../WineApiProxy.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("WinePickerController", function () {

        var _scope;
        var _controller;

        beforeEach(angular.mock.inject(function ($http, $rootScope, $controller) {
            _scope = $rootScope.$new();
            _controller = $controller(WinePickerController, {
                $scope: _scope,
                wineApiProxy: new WineApiProxy($http)
            });
        }));

        it("initial model values are correct", function () {
            expect(_scope.winePickerModel.wineApiCallInProgress).toBe(false);
            expect(_scope.winePickerModel.errorMessagesVisible).toBe(false);
            expect(_scope.winePickerModel.errorMessages).toBeNull();
        });
    });
} ());
