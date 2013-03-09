/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
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
        _scope = $rootScope.$new();
        _routeParams = $routeParams;
        //$routeParams.id = "54321";
        _controller = $controller(SearchResultsController, { $scope: _scope, urlBuilder: _urlBuilder });
    }));

    afterEach(function () {
    });

    it("placeholder test", function () {
        expect(2 + 2).toBe(4);
    });
});
