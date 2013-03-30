/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../SearchCriteriaController.js" />
/// <reference path="../Models.js" />
/// <reference path="../WineApiConstants.js" />

// ReSharper disable InconsistentNaming

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

        expect(_.isArray(_scope.wineTypes)).toBe(true);
        expect(_scope.wineTypes.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_WINETYPE));

        expect(_.isArray(_scope.varietals)).toBe(true);
        expect(_scope.varietals.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_VARIETAL));

        expect(_.isArray(_scope.regions)).toBe(true);
        expect(_scope.regions.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_REGION));

        expect(_.isArray(_scope.appellations)).toBe(true);
        expect(_scope.appellations.length).toBe(_numRefinements(wineApi.constants.CATEGORY_ID_APPELLATION));

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
        
        expect(_scope.moreSearchCriteriaCollapsed).toBe(true);
    });

    describe("getLargeLabelImageUrlForProduct method", function () {

        it("given a product with an image URL ending with m.jpg returns a URL ending with l.jpg", function () {
            var product = {
                Labels: [{
                    Url: "http://cache.wine.com/12345m.jpg"
                }]
            };
            var url = _scope.getLargeLabelImageUrlForProduct(product);
            expect(url).toBe("http://cache.wine.com/12345l.jpg");
        });

        it("given a product with an image URL not ending with m.jpg returns the image URL unchanged", function () {
            var product = {
                Labels: [{
                    Url: "http://cache.wine.com/12345.jpg"
                }]
            };
            var url = _scope.getLargeLabelImageUrlForProduct(product);
            expect(url).toBe(product.Labels[0].Url);
        });
    });
});
