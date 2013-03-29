/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../../underscore.js" />
/// <reference path="../WinePickerController.js" />
/// <reference path="../WineApi.js" />
/// <reference path="../WineApiMenuData.js" />

// ReSharper disable InconsistentNaming

describe("WinePickerController", function () {

    var _scope;
    var _controller;

    beforeEach(angular.mock.inject(function ($rootScope, $controller) {
        _scope = $rootScope.$new();
        _controller = $controller(WinePickerController, { $scope: _scope });
    }));

    it("initial model values are correct", function () {
        expect(_scope.wineApiCallInProgress).toBe(false);
        expect(_scope.errorMessagesVisible).toBe(false);
        expect(_scope.errorMessages).toBeNull();
    });

    describe("showErrorMessages", function () {

        describe("when called with 1 string argument", function () {

            it("results in errorMessages with 1 element and errorMessagesVisible set to true", function () {
                _scope.showErrorMessages("ErrorMessage1");
                expect(_scope.errorMessages.length).toBe(1);
                expect(_scope.errorMessages[0]).toBe("ErrorMessage1");
                expect(_scope.errorMessagesVisible).toBe(true);
            });
        });

        describe("when called with 2 string arguments", function () {

            it("results in errorMessages with 2 elements and errorMessagesVisible set to true", function () {
                _scope.showErrorMessages("ErrorMessage1", "ErrorMessage2");
                expect(_scope.errorMessages.length).toBe(2);
                expect(_scope.errorMessages[0]).toBe("ErrorMessage1");
                expect(_scope.errorMessages[1]).toBe("ErrorMessage2");
                expect(_scope.errorMessagesVisible).toBe(true);
            });
        });

        describe("when called with no arguments", function () {

            it("results in errorMessages set to null and errorMessagesVisible set to false", function () {
                _scope.showErrorMessages();
                expect(_scope.errorMessages).toBeNull();
                expect(_scope.errorMessagesVisible).toBe(false);
            });
        });

        describe("when called with array containing 1 string argument", function () {

            it("results in errorMessages with 1 element and errorMessagesVisible set to true", function () {
                _scope.showErrorMessages(["ErrorMessage1"]);
                expect(_scope.errorMessages.length).toBe(1);
                expect(_scope.errorMessages[0]).toBe("ErrorMessage1");
                expect(_scope.errorMessagesVisible).toBe(true);
            });
        });

        describe("when called with array containing 3 string arguments", function () {

            it("results in errorMessages with 3 elements and errorMessagesVisible set to true", function () {
                _scope.showErrorMessages(["ErrorMessage1", "ErrorMessage2", "ErrorMessage3"]);
                expect(_scope.errorMessages.length).toBe(3);
                expect(_scope.errorMessages[0]).toBe("ErrorMessage1");
                expect(_scope.errorMessages[1]).toBe("ErrorMessage2");
                expect(_scope.errorMessages[2]).toBe("ErrorMessage3");
                expect(_scope.errorMessagesVisible).toBe(true);
            });
        });

        describe("when called with empty array", function () {

            it("results in errorMessages set to null and errorMessagesVisible set to false", function () {
                _scope.showErrorMessages([]);
                expect(_scope.errorMessages).toBeNull();
                expect(_scope.errorMessagesVisible).toBe(false);
            });
        });
    });
});
