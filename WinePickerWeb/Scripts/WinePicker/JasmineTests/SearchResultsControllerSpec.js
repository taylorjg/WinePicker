/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../WinePickerController.js" />
/// <reference path="../SearchResultsController.js" />
/// <reference path="../WineApi.js" />

// ReSharper disable InconsistentNaming

describe("SearchResultsController", function () {

    var _$httpBackend;
    var _scope;
    var _routeParams;
    var _controller;
    var _urlBuilder = new wineApi.UrlBuilder("2fd879a5765785c043cc992b550d2bda");

    beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
        
        _$httpBackend = _$httpBackend_;
        _routeParams = $routeParams;

        // Create a parent scope and initialise it by constructing a WinePickerController.
        var parentScope = $rootScope.$new();
        // ReSharper disable UnusedLocals
        var unusedWinePickerController = $controller(WinePickerController, { $scope: parentScope, urlBuilder: _urlBuilder });
        // ReSharper restore UnusedLocals

        // Now create a new scope based on parentScope that we can use when constructing a SearchResultsController.
        _scope = $rootScope.$new();
        _controller = $controller(SearchResultsController, { $scope: _scope, urlBuilder: _urlBuilder });
    }));

    afterEach(function () {
    });

    it("placeholder test", function () {
        expect(2 + 2).toBe(4);
    });
});
