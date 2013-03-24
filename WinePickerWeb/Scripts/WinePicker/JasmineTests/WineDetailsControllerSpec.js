/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../WinePickerController.js" />
/// <reference path="../WineDetailsController.js" />

// ReSharper disable InconsistentNaming

describe("WineDetailsController", function () {

    var _$httpBackend;
    var _scope;
    var _routeParams;
    var _controller;

    beforeEach(inject(function (_$httpBackend_, $rootScope, $routeParams, $controller) {
        
        _$httpBackend = _$httpBackend_;
        _routeParams = $routeParams;
        $routeParams.id = "91856";
        
        _$httpBackend.expectGET("api/wineapi?productCriteria=id:91856").respond({
            "Status": {
                "Messages": [],
                "ReturnCode": 0
            },
            "Products": {
                "List": [{
                    "Id": 91856,
                    "Name": "RockBare Shiraz 2005",
                    "Url": "http:\/\/www.wine.com\/V6\/RockBare-Shiraz-2005\/wine\/91856\/detail.aspx",
                    "Appellation": {
                        "Id": 9063,
                        "Name": "McLaren Vale",
                        "Url": "http:\/\/www.wine.com\/v6\/McLaren-Vale\/wine\/list.aspx?N=7155+108+9063",
                        "Region": {
                            "Id": 108,
                            "Name": "Australia",
                            "Url": "http:\/\/www.wine.com\/v6\/Australia\/wine\/list.aspx?N=7155+108",
                            "Area": null
                        }
                    },
                    "Labels": [{
                        "Id": "91856m",
                        "Name": "thumbnail",
                        "Url": "http:\/\/cache.wine.com\/labels\/91856m.jpg"
                    }, {
                        "Id": "91856l",
                        "Name": "large",
                        "Url": "http:\/\/cache.wine.com\/labels\/91856l.jpg"
                    }],
                    "Type": "Wine",
                    "Varietal": {
                        "Id": 146,
                        "Name": "Syrah\/Shiraz",
                        "Url": "http:\/\/www.wine.com\/v6\/SyrahShiraz\/wine\/list.aspx?N=7155+124+146",
                        "WineType": {
                            "Id": 124,
                            "Name": "Red Wines",
                            "Url": "http:\/\/www.wine.com\/v6\/Red-Wines\/wine\/list.aspx?N=7155+124"
                        }
                    },
                    "Vineyard": {
                        "Id": 6283,
                        "Name": "RockBare",
                        "Url": "http:\/\/www.wine.com\/v6\/RockBare\/learnabout.aspx?winery=6092",
                        "ImageUrl": "http:\/\/cache.wine.com\/aboutwine\/basics\/images\/winerypics\/6092.jpg",
                        "GeoLocation": {
                            "Latitude": -360,
                            "Longitude": -360,
                            "Url": "http:\/\/www.wine.com\/v6\/aboutwine\/mapof.aspx?winery=6092"
                        }
                    },
                    "Vintage": "",
                    "Community": {
                        "Reviews": {
                            "HighestScore": 5,
                            "List": [],
                            "Url": "http:\/\/www.wine.com\/V6\/RockBare-Shiraz-2005\/wine\/91856\/detail.aspx?pageType=reviews"
                        },
                        "Url": "http:\/\/www.wine.com\/V6\/RockBare-Shiraz-2005\/wine\/91856\/detail.aspx"
                    },
                    "Description": "",
                    "GeoLocation": {
                        "Latitude": -360,
                        "Longitude": -360,
                        "Url": "http:\/\/www.wine.com\/v6\/aboutwine\/mapof.aspx?winery=6092"
                    },
                    "PriceMax": 19.9900,
                    "PriceMin": 9.9900,
                    "PriceRetail": 0,
                    "ProductAttributes": [{
                        "Id": 44,
                        "Name": "Screw Cap Wines",
                        "Url": "http:\/\/www.wine.com\/v6\/Screw-Cap-Wines\/wine\/list.aspx?N=7155+44",
                        "ImageUrl": "http:\/\/cache.wine.com\/images\/glo_icon_screwcap_big.gif"
                    }],
                    "Ratings": {
                        "HighestScore": 94,
                        "List": []
                    },
                    "Retail": null,
                    "Vintages": {
                        "List": []
                    }
                }],
                "Offset": 0,
                "Total": 1,
                "Url": ""
            }
        });

        // Create a parent scope and initialise it by constructing a WinePickerController.
        var parentScope = $rootScope.$new();
        // ReSharper disable UnusedLocals
        var unusedWinePickerController = $controller(WinePickerController, { $scope: parentScope });
        // ReSharper restore UnusedLocals
        
        // Now create a new scope based on parentScope that we can use when constructing a WineDetailsController.
        _scope = parentScope.$new();
        _controller = $controller(WineDetailsController, { $scope: _scope });
    }));

    afterEach(function () {
    });

    it("$scope.id should be correctly initialised from $routeParams.id", function () {
        expect(_scope.id).toBe("91856");
    });
});
