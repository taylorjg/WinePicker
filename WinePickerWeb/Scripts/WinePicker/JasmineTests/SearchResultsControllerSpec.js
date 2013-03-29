/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../WinePickerController.js" />
/// <reference path="../SearchResultsController.js" />
/// <reference path="../WineApiProxy.js" />
/// <reference path="../Models.js" />

// ReSharper disable InconsistentNaming

describe("SearchResultsController", function () {

    var _$httpBackend;
    var _scope;
    var _searchResultsModel;
    var _controller;

    beforeEach(angular.mock.inject(function (_$httpBackend_, $http, $rootScope, $routeParams, $controller) {

        _$httpBackend = _$httpBackend_;
        $routeParams.encodedSearchCriteria = "wt:124|s:gamay";

        _searchResultsModel = new SearchResultsModel();

        _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond({
            "Status": {
                "Messages": [],
                "ReturnCode": 0
            },
            "Products": {
                "List": [],
                "Total": 35
            }
        });

        // Create a parent scope and initialise it by constructing a WinePickerController.
        var parentScope = $rootScope.$new();
        // ReSharper disable UnusedLocals
        var unusedWinePickerController = $controller(WinePickerController, { $scope: parentScope });
        // ReSharper restore UnusedLocals

        // Now create a new scope based on parentScope that we can use when constructing a SearchResultsController.
        _scope = parentScope.$new();

        _controller = $controller(SearchResultsController, {
            $scope: _scope,
            wineApiProxy: new WineApiProxy($http),
            searchResultsModel: _searchResultsModel
        });
    }));

    it("scope.searchResultsModel is initialised correctly", function () {
        expect(_scope.searchResultsModel).toBe(_searchResultsModel);
    });

    it("scope.searchResultsModel.pages array is set correctly", function () {
        _$httpBackend.flush();
        expect(_scope.searchResultsModel.pages.length).toBe(4);
        expect(_scope.searchResultsModel.pages[0]).toBe(1);
        expect(_scope.searchResultsModel.pages[1]).toBe(2);
        expect(_scope.searchResultsModel.pages[2]).toBe(3);
        expect(_scope.searchResultsModel.pages[3]).toBe(4);
    });
});
