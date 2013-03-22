/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../WinePickerController.js" />
/// <reference path="../SearchResultsController.js" />
/// <reference path="../WineApi.js" />
/// <reference path="../Models.js" />

// ReSharper disable InconsistentNaming

describe("SearchResultsController", function () {

    var _$httpBackend;
    var _scope;
    var _searchResultsModel;
    var _routeParams;
    var _controller;
    var _urlBuilder = new wineApi.UrlBuilder("2fd879a5765785c043cc992b550d2bda");

    beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {

        _$httpBackend = _$httpBackend_;
        _routeParams = $routeParams;
        _searchResultsModel = new SearchResultsModel();

        // Create a parent scope and initialise it by constructing a WinePickerController.
        var parentScope = $rootScope.$new();
        // ReSharper disable UnusedLocals
        var unusedWinePickerController = $controller(WinePickerController, {
            $scope: parentScope,
            urlBuilder: _urlBuilder
        });
        // ReSharper restore UnusedLocals

        // Now create a new scope based on parentScope that we can use when constructing a SearchResultsController.
        _scope = parentScope.$new();

        // Set some dummy results...
        _scope.products = {
            Total: 35
        };

        _controller = $controller(SearchResultsController, {
            $scope: _scope,
            searchResultsModel: _searchResultsModel
        });
    }));

    afterEach(function () {
    });

    it("scope.model is set correctly", function () {
        expect(_scope.model).toBe(_searchResultsModel);
    });

    it("scope.model.pages array is set correctly", function () {
        expect(_scope.model.pages.length).toBe(4);
        expect(_scope.model.pages[0]).toBe(1);
        expect(_scope.model.pages[1]).toBe(2);
        expect(_scope.model.pages[2]).toBe(3);
        expect(_scope.model.pages[3]).toBe(4);
    });
});
