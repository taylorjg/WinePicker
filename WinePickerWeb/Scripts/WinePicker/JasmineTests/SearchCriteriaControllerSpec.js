/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../WinePickerController.js" />
/// <reference path="../SearchCriteriaController.js" />
/// <reference path="../Models.js" />

// ReSharper disable InconsistentNaming

describe("SearchCriteriaController", function () {

    var _$httpBackend;
    var _scope;
    var _routeParams;
    var _controller;

    beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {

        _$httpBackend = _$httpBackend_;
        _routeParams = $routeParams;

        // Create a parent scope and initialise it by constructing a WinePickerController.
        var parentScope = $rootScope.$new();
        // ReSharper disable UnusedLocals
        var unusedWinePickerController = $controller(WinePickerController, { $scope: parentScope });
        // ReSharper restore UnusedLocals

        // Now create a new scope based on parentScope that we can use when constructing a SearchCriteriaController.
        _scope = parentScope.$new();

        _controller = $controller(SearchCriteriaController, {
            $scope: _scope
        });
    }));

    afterEach(function () {
    });

    it("placeholder test", function () {
        expect(1).toBe(1);
    });
});
