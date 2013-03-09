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
    var _$httpBackend;
    var _urlBuilder = new wineApi.UrlBuilder("2fd879a5765785c043cc992b550d2bda");

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        _$httpBackend = _$httpBackend_;
        _scope = $rootScope.$new();
        _controller = $controller(WinePickerController, { $scope: _scope, urlBuilder: _urlBuilder });
    }));

    afterEach(function () {
    });

    var numRefinements = function (categoryId) {
        var filteredCategories = _.filter(wineApi.menuData.Categories, function (c) { return c.Id === categoryId; });
        return filteredCategories[0].Refinements.length;
    };

    it("initial model values are correct", function () {

        expect(_.isArray(_scope.wineTypes)).toBe(true);
        expect(_scope.wineTypes.length).toBe(numRefinements(wineApi.constants.CATEGORY_ID_WINETYPE));

        expect(_.isArray(_scope.varietals)).toBe(true);
        expect(_scope.varietals.length).toBe(numRefinements(wineApi.constants.CATEGORY_ID_VARIETAL));

        expect(_.isArray(_scope.regions)).toBe(true);
        expect(_scope.regions.length).toBe(numRefinements(wineApi.constants.CATEGORY_ID_REGION));

        expect(_.isArray(_scope.appellations)).toBe(true);
        expect(_scope.appellations.length).toBe(numRefinements(wineApi.constants.CATEGORY_ID_APPELLATION));

        expect(_scope.selectedWineType).toBe("");
        expect(_scope.selectedVarietal).toBe("");
        expect(_scope.selectedRegion).toBe("");
        expect(_scope.selectedAppellation).toBe("");
        expect(_scope.searchTerm).toBe("");
        expect(_scope.products).toBeNull();
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
