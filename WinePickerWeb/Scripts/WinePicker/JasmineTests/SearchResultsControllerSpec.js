/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../SearchResultsController.js" />
/// <reference path="../WineApiProxy.js" />
/// <reference path="../Models.js" />

// ReSharper disable InconsistentNaming

describe("SearchResultsController", function () {

    var _$httpBackend;
    var _scope;
    var _searchResultsModel;
    var _controller;
    var _successfulWineApiResponse = {
        "Status": {
            "Messages": [],
            "ReturnCode": 0
        },
        "Products": {
            "List": [],
            "Total": 35
        }
    };
    
    beforeEach(angular.mock.inject(function (_$httpBackend_, $http, $rootScope, $routeParams, $controller) {

        _$httpBackend = _$httpBackend_;

        _scope = $rootScope.$new();
        _searchResultsModel = new SearchResultsModel();

        _$httpBackend.whenGET("api/wineapi?searchCriteria=wt:124|s:gamay|st:WA|is:1").respond(_successfulWineApiResponse);
        
        $routeParams.encodedSearchCriteria = "wt:124|s:gamay|st:WA|is:1";
        
        _controller = $controller(SearchResultsController, {
            $scope: _scope,
            wineApiProxy: new WineApiProxy($http),
            searchResultsModel: _searchResultsModel
        });
    }));

    it("scope.searchResultsModel is initialised correctly", function () {
        _$httpBackend.flush();
        expect(_scope.searchResultsModel).toBe(_searchResultsModel);
        expect(_scope.searchResultsModel.products).toBe(_successfulWineApiResponse.Products);
        expect(_scope.searchResultsModel.state).toBe("WA");
        expect(_scope.searchResultsModel.instock).toBe("1");
        _$httpBackend.verifyNoOutstandingRequest();
        _$httpBackend.verifyNoOutstandingExpectation();
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
