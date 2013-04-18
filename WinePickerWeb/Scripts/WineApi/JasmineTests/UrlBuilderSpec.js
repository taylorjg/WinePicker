// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("UrlBuilder", function () {

        it("should provide a constructor", function () {
            var urlBuilder = new wineApi.UrlBuilder2();
            expect(urlBuilder).not.toBeNull();
        });

        it("object created via the constructor should have the correct constructor property", function () {
            var urlBuilder = new wineApi.UrlBuilder2();
            expect(urlBuilder.constructor).toBe(wineApi.UrlBuilder2);
        });

        it("object created via the constructor should have the correct public methods defined", function () {
            var urlBuilder = new wineApi.UrlBuilder2();
            expect(urlBuilder.apiKey).toBeDefined();
            expect(urlBuilder.affiliateId).toBeDefined();
            expect(urlBuilder.catalogService).toBeDefined();
            expect(urlBuilder.categoryMapService).toBeDefined();
            expect(urlBuilder.referenceService).toBeDefined();
        });

        it("object created via the constructor should have private instance variables", function () {
            var urlBuilder = new wineApi.UrlBuilder2();
            expect(urlBuilder._apiKeyValue).toBeUndefined();
            expect(urlBuilder._affiliateIdValue).toBeUndefined();
            expect(urlBuilder._url).toBeUndefined();
        });

        it("should provide a constructor that takes an apikey parameter", function () {
            var urlBuilder = new wineApi.UrlBuilder2("MyApiKeyValue");
            expect(urlBuilder).not.toBeNull();
        });

        it("apiKey method should return the value that was passed to the constructor", function () {
            var valueIn = "MyApiKeyValue";
            var urlBuilder = new wineApi.UrlBuilder2(valueIn);
            var valueOut = urlBuilder.apiKey();
            expect(valueOut).toBe(valueIn);
        });

        it("apiKey method can be used to change the apikey", function () {
            var urlBuilder = new wineApi.UrlBuilder2("MyApiKeyValue1");
            urlBuilder.apiKey("MyApiKeyValue2");
            expect(urlBuilder.apiKey()).toBe("MyApiKeyValue2");
        });

        it("should provide a constructor that takes also takes an affiliateId parameter", function () {
            var urlBuilder = new wineApi.UrlBuilder2("MyApiKeyValue", "MyAffiliateId");
            expect(urlBuilder).not.toBeNull();
        });

        it("affiliateId method should return the value that was passed to the constructor", function () {
            var urlBuilder = new wineApi.UrlBuilder2("MyApiKeyValue", "MyAffiliateId");
            expect(urlBuilder.affiliateId()).toBe("MyAffiliateId");
        });

        it("affiliateId method can be used to change the affiliateId", function () {
            var urlBuilder = new wineApi.UrlBuilder2("MyApiKeyValue", "MyAffiliateId1");
            urlBuilder.affiliateId("MyAffiliateId2");
            expect(urlBuilder.affiliateId()).toBe("MyAffiliateId2");
        });

        it("allows multiple instances to behave independently", function () {
            var urlBuilder1 = new wineApi.UrlBuilder2("MyApiKeyValue1");
            var urlBuilder2 = new wineApi.UrlBuilder2("MyApiKeyValue2");
            expect(urlBuilder1.apiKey()).toBe("MyApiKeyValue1");
            expect(urlBuilder2.apiKey()).toBe("MyApiKeyValue2");
        });

        describe("chaining", function () {

            var _urlBuilder;

            beforeEach(function () {
                _urlBuilder = new wineApi.UrlBuilder2();
            });

            it("main service methods return this", function () {
                expect(_urlBuilder.catalogService()).toBe(_urlBuilder);
                expect(_urlBuilder.categoryMapService()).toBe(_urlBuilder);
                expect(_urlBuilder.referenceService()).toBe(_urlBuilder);
            });

            it("option methods return this", function () {
                expect(_urlBuilder.offset()).toBe(_urlBuilder);
                expect(_urlBuilder.size()).toBe(_urlBuilder);
                expect(_urlBuilder.categoriesFilter()).toBe(_urlBuilder);
            });
        });

        describe("catalogService method", function () {

            describe("when called with no options", function () {

                it("should contain the name of the service before the query string question mark", function () {
                    var urlBuilder = new wineApi.UrlBuilder2();
                    var url = urlBuilder.catalogService()
                        .url();
                    expect(url).toContain("/json/catalog?");
                });

                it("should contain the apikey name/value pair after the query string question mark", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder2(myApiKey);
                    var url = urlBuilder.catalogService()
                        .url();
                    expect(url).toContain("?apikey=" + myApiKey);
                });

                it("should contain the affiliateId name/value pair if affiliateId value was passed to the constructor", function() {
                    var myApiKey = "MyApiKeyValue";
                    var myAffiliateId = "MyAffiliateIdValue";
                    var urlBuilder = new wineApi.UrlBuilder2(myApiKey, myAffiliateId);
                    var url = urlBuilder.catalogService()
                        .url();
                    expect(url).toContain("&affiliateId=" + myAffiliateId);
                });

                it("should not contain the affiliateId name/value pair if no affiliateId value was passed to the constructor", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder2(myApiKey);
                    var url = urlBuilder.catalogService()
                        .url();
                    expect(url).not.toContain("&affiliateId=");
                });
            });

            describe("when called with various options passed as a param", function () {

                describe("offset option", function () {
                    it("offset option is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ offset: 23 })
                        .url();
                        expect(url).toContain("&offset=23");
                    });
                });

                describe("size option", function () {
                    it("size option is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ size: 46 })
                        .url();
                        expect(url).toContain("&size=46");
                    });
                });

                describe("categoriesFilter option", function () {

                    it("categories with a single value is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ categories: 124 })
                        .url();
                        expect(url).toContain("&filter=categories(124)");
                    });

                    it("categories with a single value in an array is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ categories: [124] })
                        .url();
                        expect(url).toContain("&filter=categories(124)");
                    });

                    it("categories with 2 values is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ categories: [124, 125] })
                        .url();
                        expect(url).toContain("&filter=categories(124+125)");
                    });
                });

                describe("ratingFilter option", function () {

                    it("rating with a single value is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ rating: 92 })
                        .url();
                        expect(url).toContain("&filter=rating(92)");
                    });

                    it("rating with a single value in an array is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ rating: [92] })
                        .url();
                        expect(url).toContain("&filter=rating(92)");
                    });

                    it("rating with a 2 values is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ rating: [92, 98] })
                        .url();
                        expect(url).toContain("&filter=rating(92|98)");
                    });
                });

                describe("priceFilter option", function () {

                    it("price with a single value is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ price: 20 })
                        .url();
                        expect(url).toContain("&filter=price(20)");
                    });

                    it("price with a single value in an array is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ price: [20] })
                        .url();
                        expect(url).toContain("&filter=price(20)");
                    });

                    it("price with a 2 values is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService({ price: [20, 50] })
                        .url();
                        expect(url).toContain("&filter=price(20|50)");
                    });
                });
            });

            describe("when called with various options passed via chaining", function () {

                describe("offset option", function () {
                    it("offset option is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .offset(23)
                        .url();
                        expect(url).toContain("&offset=23");
                    });
                });

                describe("size option", function () {
                    it("size option is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .size(46)
                        .url();
                        expect(url).toContain("&size=46");
                    });
                });

                describe("categoriesFilter option", function () {

                    it("categories with a single value is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .categoriesFilter(124)
                        .url();
                        expect(url).toContain("&filter=categories(124)");
                    });

                    it("categories with a single value in an array is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .categoriesFilter([124])
                        .url();
                        expect(url).toContain("&filter=categories(124)");
                    });

                    it("categories with 2 values is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .categoriesFilter([124, 125])
                        .url();
                        expect(url).toContain("&filter=categories(124+125)");
                    });
                });

                describe("ratingFilter option", function () {

                    it("rating with a single value is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .ratingFilter(92)
                        .url();
                        expect(url).toContain("&filter=rating(92)");
                    });

                    it("rating with a single value in an array is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .ratingFilter([92])
                        .url();
                        expect(url).toContain("&filter=rating(92)");
                    });

                    it("rating with a 2 values is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .ratingFilter([92, 98])
                        .url();
                        expect(url).toContain("&filter=rating(92|98)");
                    });
                });

                describe("priceFilter option", function () {

                    it("price with a single value is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .priceFilter(20)
                        .url();
                        expect(url).toContain("&filter=price(20)");
                    });

                    it("price with a single value in an array is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .priceFilter([20])
                        .url();
                        expect(url).toContain("&filter=price(20)");
                    });

                    it("price with a 2 values is handled correctly", function () {
                        var urlBuilder = new wineApi.UrlBuilder2();
                        var url = urlBuilder.catalogService()
                        .priceFilter([20, 50])
                        .url();
                        expect(url).toContain("&filter=price(20|50)");
                    });
                });
            });
        });
    });
} ());
