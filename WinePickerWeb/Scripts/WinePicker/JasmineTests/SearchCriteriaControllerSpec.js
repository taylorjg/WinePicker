/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../SearchCriteriaController.js" />
/// <reference path="../Models.js" />
/// <reference path="../WineApiConstants.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("SearchCriteriaController", function () {

        var _scope;
        var _controller;

        beforeEach(angular.mock.inject(function ($rootScope, $controller) {
            _scope = $rootScope.$new();
            _controller = $controller(SearchCriteriaController, { $scope: _scope });
        }));

        var _numRefinements = function (categoryId) {
            var filteredCategories = _.filter(wineApi.menuData.Categories, function (c) { return c.Id === categoryId; });
            return filteredCategories[0].Refinements.length;
        };

        it("initial model values are correct", function () {

            expect(_.isArray(_scope.searchCriteriaModel.wineTypes)).toBe(true);
            expect(_scope.searchCriteriaModel.wineTypes.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_WINETYPE));

            expect(_.isArray(_scope.searchCriteriaModel.varietals)).toBe(true);
            expect(_scope.searchCriteriaModel.varietals.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_VARIETAL));

            expect(_.isArray(_scope.searchCriteriaModel.regions)).toBe(true);
            expect(_scope.searchCriteriaModel.regions.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_REGION));

            expect(_.isArray(_scope.searchCriteriaModel.appellations)).toBe(true);
            expect(_scope.searchCriteriaModel.appellations.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_APPELLATION));

            expect(_scope.searchCriteriaModel.moreSearchCriteriaCollapsed).toBe(true);

            expect(_scope.searchCriteriaModel.wineType).toBe("");
            expect(_scope.searchCriteriaModel.varietal).toBe("");
            expect(_scope.searchCriteriaModel.region).toBe("");
            expect(_scope.searchCriteriaModel.appellation).toBe("");
            expect(_scope.searchCriteriaModel.searchTerm).toBe("");
            expect(_scope.searchCriteriaModel.state).toBe("");
            expect(_scope.searchCriteriaModel.instock).toBe("");
            expect(_scope.searchCriteriaModel.priceFrom).toBe("");
            expect(_scope.searchCriteriaModel.priceTo).toBe("");
            expect(_scope.searchCriteriaModel.ratingFrom).toBe("");
            expect(_scope.searchCriteriaModel.ratingTo).toBe("");
            expect(_scope.searchCriteriaModel.sortOrder).toBe("popularity");
            expect(_scope.searchCriteriaModel.sortDirection).toBe("descending");
        });
    });
} ());
