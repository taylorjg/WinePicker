/// <reference path="../jasmine/jasmine.js" />
/// <reference path="../angular.js" />
/// <reference path="../angular-mocks.js" />
/// <reference path="WinePickerController.js" />
/// <reference path="WineApi.js" />

// ReSharper disable InconsistentNaming

describe("WinePickerController", function () {

    var _scope;
    var _controller;
    var _$httpBackend;
    var _urlBuilder = new wineApi.UrlBuilder("2fd879a5765785c043cc992b550d2bda");

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
        _$httpBackend = _$httpBackend_;
        _$httpBackend.expectJSONP("http://services.wine.com/api/beta2/service.svc/json/categorymap?apikey=2fd879a5765785c043cc992b550d2bda&filter=categories(490)&show=(4+5+1+6)&callback=JSON_CALLBACK").respond({
            "Status": {
                "Messages": [],
                "ReturnCode": 0
            },
            "Categories": [{
                "Id": 4,
                "Name": "Wine Type",
                "Refinements": [{
                    "Id": 1001,
                    "Name": "Wine Type 1",
                    "Url": ""
                }]
            }, {
                "Id": 5,
                "Name": "Varietal",
                "Refinements": [{
                    "Id": 2001,
                    "Name": "Varietal 1",
                    "Url": ""
                }, {
                    "Id": 2002,
                    "Name": "Varietal 2",
                    "Url": ""
                }]
            }, {
                "Id": 1,
                "Name": "Region",
                "Refinements": [{
                    "Id": 3001,
                    "Name": "Region 1",
                    "Url": ""
                }, {
                    "Id": 3002,
                    "Name": "Region 2",
                    "Url": ""
                }, {
                    "Id": 3003,
                    "Name": "Region 3",
                    "Url": ""
                }]
            }, {
                "Id": 6,
                "Name": "Appellation",
                "Refinements": [{
                    "Id": 4001,
                    "Name": "Appellation 1",
                    "Url": ""
                }, {
                    "Id": 4002,
                    "Name": "Appellation 2",
                    "Url": ""
                }, {
                    "Id": 4003,
                    "Name": "Appellation 3",
                    "Url": ""
                }, {
                    "Id": 4004,
                    "Name": "Appellation 4",
                    "Url": ""
                }]
            }]
        });

        _scope = $rootScope.$new();
        _controller = $controller(WinePickerController, { $scope: _scope, urlBuilder: _urlBuilder });
    }));

    afterEach(function () {
    });

    it("initial model values are correct", function () {

        _$httpBackend.flush();
        
        expect(_.isArray(_scope.wineTypes)).toBe(true);
        expect(_scope.wineTypes.length).toBe(1);
        
        expect(_.isArray(_scope.varietals)).toBe(true);
        expect(_scope.varietals.length).toBe(2);
        
        expect(_.isArray(_scope.regions)).toBe(true);
        expect(_scope.regions.length).toBe(3);
        
        expect(_.isArray(_scope.appellations)).toBe(true);
        expect(_scope.appellations.length).toBe(4);
        
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
