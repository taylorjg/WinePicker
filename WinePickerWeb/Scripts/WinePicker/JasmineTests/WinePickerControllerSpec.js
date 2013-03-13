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

        expect(_scope.wineApiCallInProgress).toBe(false);
        expect(_scope.errorMessagesVisible).toBe(false);
        expect(_scope.errorMessages).toBeNull();
        expect(_scope.selectedWineType).toBe("");
        expect(_scope.selectedVarietal).toBe("");
        expect(_scope.selectedRegion).toBe("");
        expect(_scope.selectedAppellation).toBe("");
        expect(_scope.searchTerm).toBe("");
        expect(_scope.state).toBe("");
        expect(_scope.instock).toBe(false);
        expect(_scope.priceFrom).toBe("");
        expect(_scope.priceTo).toBe("");
        expect(_scope.ratingFrom).toBe("");
        expect(_scope.ratingTo).toBe("");
        expect(_scope.products).toBeNull();
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
