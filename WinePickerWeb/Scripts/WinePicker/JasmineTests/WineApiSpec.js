/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../WineApi.js" />

describe("wineApi.UrlBuilder", function () {

    beforeEach(function () {
    });

    afterEach(function () {
    });

    it("should provide a constructor", function () {
        var urlBuilder = new wineApi.UrlBuilder();
        expect(urlBuilder).not.toBeNull();
    });

    it("should provide a constructor that takes an apikey parameter", function () {
        var urlBuilder = new wineApi.UrlBuilder("MyApiKeyValue");
        expect(urlBuilder).not.toBeNull();
    });

    it("apiKey method should return the value that was passed to the constructor", function () {
        var valueIn = "MyApiKeyValue";
        var urlBuilder = new wineApi.UrlBuilder(valueIn);
        var valueOut = urlBuilder.apiKey();
        expect(valueOut).toBe(valueIn);
    });

    it("apiKey method can be used to change the apikey", function () {
        var urlBuilder = new wineApi.UrlBuilder("MyApiKeyValue1");
        urlBuilder.apiKey("MyApiKeyValue2");
        expect(urlBuilder.apiKey()).toBe("MyApiKeyValue2");
    });

    it("should provide a constructor that takes also takes an affiliateId parameter", function () {
        var urlBuilder = new wineApi.UrlBuilder("MyApiKeyValue", "MyAffiliateId");
        expect(urlBuilder).not.toBeNull();
    });

    it("affiliateId method should return the value that was passed to the constructor", function () {
        var urlBuilder = new wineApi.UrlBuilder("MyApiKeyValue", "MyAffiliateId");
        expect(urlBuilder.affiliateId()).toBe("MyAffiliateId");
    });

    it("affiliateId method can be used to change the affiliateId", function () {
        var urlBuilder = new wineApi.UrlBuilder("MyApiKeyValue", "MyAffiliateId1");
        urlBuilder.affiliateId("MyAffiliateId2");
        expect(urlBuilder.affiliateId()).toBe("MyAffiliateId2");
    });

    describe("catalogService method", function () {

        describe("when called with no options", function () {

            it("should contain the apikey", function () {
                var myApiKey = "MyApiKeyValue";
                var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                var url = urlBuilder.catalogService();
                expect(url).toContain(myApiKey);
            });

            it("should contain the apikey name/value pair after the query string question mark", function () {
                var myApiKey = "MyApiKeyValue";
                var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                var url = urlBuilder.catalogService();
                expect(url).toContain("?apikey=" + myApiKey);
            });
        });

        describe("when called with options containing a categories array", function () {

            describe("with 1 category id", function () {

                it("should contain the correct categories filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        categories: [1]
                    });
                    expect(url).toContain("&filter=categories(1)");
                });
            });

            describe("with 3 category ids", function () {

                it("should contain the correct categories filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        categories: [1, 2, 3]
                    });
                    expect(url).toContain("&filter=categories(1+2+3)");
                });
            });

            describe("with 3 category ids but one of them is an empty string", function () {

                it("should contain the correct categories filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        categories: [1, "", 3]
                    });
                    expect(url).toContain("&filter=categories(1+3)");
                });
            });

            describe("with 0 category ids", function () {

                it("should not contain the categories filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        categories: []
                    });
                    expect(url).not.toContain("&filter=categories");
                });
            });
        });

        describe("when called with options containing categories as a single value", function () {

            describe("and the single value is a valid category id", function () {

                it("should contain the correct categories filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        categories: 1
                    });
                    expect(url).toContain("&filter=categories(1)");
                });
            });

            describe("and the single value is an empty string", function () {

                it("should not contain the categories filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        categories: ""
                    });
                    expect(url).not.toContain("&filter=categories");
                });
            });
        });

        describe("when called with options containing a search string", function () {

            describe("with 1 word", function () {

                it("should contain the correct search name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        search: "gamay"
                    });
                    expect(url).toContain("&search=gamay");
                });
            });

            describe("with 2 words", function () {

                it("should contain the correct search name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        search: "red gamay"
                    });
                    expect(url).toContain("&search=red+gamay");
                });
            });

            describe("with 2 words and extraneous whitespace", function () {

                it("should contain the correct search name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        search: "  red   \t gamay    "
                    });
                    expect(url).toContain("&search=red+gamay");
                });
            });

            describe("with empty string", function () {

                it("should not contain the search name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        search: ""
                    });
                    expect(url).not.toContain("&search=");
                });
            });
        });

        describe("when called with options containing instock", function () {

            describe("and instock value is true", function () {

                it("should contain the correct instock name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        state: "CA",
                        instock: true
                    });
                    expect(url).toContain("&instock=true");
                });
            });

            describe("and instock value is truthy", function () {

                it("should contain the correct instock name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        state: "CA",
                        instock: 1
                    });
                    expect(url).toContain("&instock=true");
                });
            });

            describe("and instock value is false", function () {

                it("should not contain the instock name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        state: "CA",
                        instock: false
                    });
                    expect(url).not.toContain("&instock=");
                });
            });

            describe("and instock value is falsy", function () {

                it("should not contain the instock name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        state: "CA",
                        instock: 0
                    });
                    expect(url).not.toContain("&instock=");
                });
            });
        });

        describe("when called with options containing rating", function () {

            describe("and rating contains from and to values", function () {

                it("should contain the correct rating filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        rating: [92, 98]
                    });
                    expect(url).toContain("&filter=rating(92|98)");
                });
            });

            describe("and rating contains from value only (in an array)", function () {

                it("should contain the correct rating filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        rating: [92]
                    });
                    expect(url).toContain("&filter=rating(92)");
                });
            });

            describe("and rating contains from value only (not in an array)", function () {

                it("should contain the correct rating filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        rating: 92
                    });
                    expect(url).toContain("&filter=rating(92)");
                });
            });
        });

        describe("when called with options containing price", function () {

            describe("and price contains from and to values", function () {

                it("should contain the correct price filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        price: [50, 199]
                    });
                    expect(url).toContain("&filter=price(50|199)");
                });
            });

            describe("and price contains from value only (in an array)", function () {

                it("should contain the correct price filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        price: [50]
                    });
                    expect(url).toContain("&filter=price(50)");
                });
            });

            describe("and price contains from value only (not in an array)", function () {

                it("should contain the correct price filter name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        price: 50
                    });
                    expect(url).toContain("&filter=price(50)");
                });
            });
        });

        describe("when called with options containing sort", function () {

            describe("and sort contains valid option and direction", function () {

                it("should contain the correct sort name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        sort: ["price", "descending"]
                    });
                    expect(url).toContain("&sort=price|descending");
                });
            });

            describe("and sort contains valid option and direction in uppercase", function () {

                it("should contain the correct sort name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        sort: ["PRICE", "DESCENDING"]
                    });
                    expect(url).toContain("&sort=price|descending");
                });
            });

            describe("and sort contains valid option only (in an array)", function () {

                it("should contain the correct sort name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        sort: ["rating"]
                    });
                    expect(url).toContain("&sort=rating|ascending");
                });
            });

            describe("and sort contains valid option only (not in an array)", function () {

                it("should contain the correct sort name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        sort: "rating"
                    });
                    expect(url).toContain("&sort=rating|ascending");
                });
            });

            describe("and sort contains invalid option", function () {

                it("should not contain the sort name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        sort: "bogus"
                    });
                    expect(url).not.toContain("&sort=");
                });
            });

            describe("and sort contains valid option but invalid direction", function () {

                it("should not contain the sort name/value pair in the query string", function () {
                    var myApiKey = "MyApiKeyValue";
                    var urlBuilder = new wineApi.UrlBuilder(myApiKey);
                    var url = urlBuilder.catalogService({
                        sort: ["price", "bogus"]
                    });
                    expect(url).not.toContain("&sort=");
                });
            });
        });
    });
});
