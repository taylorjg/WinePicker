﻿/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../../angular.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../WineApiProxy.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    describe("WineApiProxy", function () {

        var _$httpBackend;
        var _wineApiProxy;
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
        var _failureWineApiResponse = {
            "Status": {
                "Messages": ["This is an error message."],
                "ReturnCode": 100
            }
        };

        beforeEach(angular.mock.inject(function ($injector) {
            _$httpBackend = $injector.get("$httpBackend");
            _wineApiProxy = $injector.instantiate(winePicker.services.WineApiProxy);
        }));

        it("callWineApi invokes $http.get()", function () {
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_successfulWineApiResponse);
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.verifyNoOutstandingExpectation();
        });

        it("callWineApi invokes given success callback when successful WineApi response is received", function () {
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_successfulWineApiResponse);
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay", function (data) {
                expect(data.Status.ReturnCode).toBe(0);
                expect(data.Products.Total).toBe(35);
            });
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
        });

        it("callWineApi does not invoke given success callback when failure WineApi response is received", function () {
            var givenSuccessCallbackInvoked = false;
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_failureWineApiResponse);
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay", function () {
                givenSuccessCallbackInvoked = true;
            });
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(givenSuccessCallbackInvoked).toBe(false);
        });

        it("callWineApi invokes start callback", function () {
            var startCallbackInvoked = false;
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_successfulWineApiResponse);
            _wineApiProxy.start(function () {
                startCallbackInvoked = true;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(startCallbackInvoked).toBe(true);
        });

        it("callWineApi invokes end callback on successful WineApi response", function () {
            var endCallbackInvoked = false;
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_successfulWineApiResponse);
            _wineApiProxy.end(function () {
                endCallbackInvoked = true;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(endCallbackInvoked).toBe(true);
        });

        it("callWineApi invokes end callback on failure WineApi response", function () {
            var endCallbackInvoked = false;
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_failureWineApiResponse);
            _wineApiProxy.end(function () {
                endCallbackInvoked = true;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(endCallbackInvoked).toBe(true);
        });

        it("callWineApi invokes error callback with empty array of error messages (i.e. clears the errors down) on successful WineApi response", function () {
            var reportedErrorMessages = [];
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_successfulWineApiResponse);
            _wineApiProxy.error(function (errorMessages) {
                reportedErrorMessages = errorMessages;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(reportedErrorMessages.length).toBe(0);
        });

        it("callWineApi invokes error callback on failure WineApi response", function () {
            var reportedErrorMessages = [];
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(_failureWineApiResponse);
            _wineApiProxy.error(function (errorMessages) {
                reportedErrorMessages = errorMessages;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(reportedErrorMessages.length).toBe(1);
            expect(reportedErrorMessages[0]).toBe("This is an error message.");
        });

        it("callWineApi invokes error callback with HTTP status code on HTTP error", function () {
            var reportedErrorMessages = [];
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(400);
            _wineApiProxy.error(function (errorMessages) {
                reportedErrorMessages = errorMessages;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(reportedErrorMessages.length).toBe(1);
            expect(reportedErrorMessages[0]).toBe(400);
        });

        it("callWineApi invokes error callback with body of response on HTTP error that includes a body", function () {
            var reportedErrorMessages = [];
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(400, "Body of response");
            _wineApiProxy.error(function (errorMessages) {
                reportedErrorMessages = errorMessages;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(reportedErrorMessages.length).toBe(1);
            expect(reportedErrorMessages[0]).toBe("Body of response");
        });

        it("callWineApi invokes error callback with 3 error messages on Web API error", function () {
            var reportedErrorMessages = [];
            _$httpBackend.expectGET("api/wineapi?searchCriteria=wt:124|s:gamay").respond(400, { Message: "my-message", MessageDetail: "my-message-detail" });
            _wineApiProxy.error(function (errorMessages) {
                reportedErrorMessages = errorMessages;
            });
            _wineApiProxy.callWineApi("searchCriteria=wt:124|s:gamay");
            _$httpBackend.flush();
            _$httpBackend.verifyNoOutstandingExpectation();
            expect(reportedErrorMessages.length).toBe(3);
            expect(reportedErrorMessages[1]).toBe("my-message");
            expect(reportedErrorMessages[2]).toBe("my-message-detail");
        });

        it("private variables are not public", function () {
            var actual1 = _wineApiProxy._$http;
            var actual2 = _wineApiProxy._start;
            var actual3 = _wineApiProxy._end;
            var actual4 = _wineApiProxy._error;
            expect(actual1).toBeUndefined();
            expect(actual2).toBeUndefined();
            expect(actual3).toBeUndefined();
            expect(actual4).toBeUndefined();
        });

        it("private methods are not public", function () {
            var actual1 = _wineApiProxy._clearErrors;
            var actual2 = _wineApiProxy._reportErrors;
            expect(actual1).toBeUndefined();
            expect(actual2).toBeUndefined();
        });

        describe("getLargeLabelImageUrlForProduct method", function () {

            it("given a product with an image URL ending with m.jpg returns a URL ending with l.jpg", function () {
                var product = {
                    Labels: [{
                        Url: "http://cache.wine.com/12345m.jpg"
                    }]
                };
                var url = _wineApiProxy.getLargeLabelImageUrlForProduct(product);
                expect(url).toBe("http://cache.wine.com/12345l.jpg");
            });

            it("given a product with an image URL not ending with m.jpg returns the image URL unchanged", function () {
                var product = {
                    Labels: [{
                        Url: "http://cache.wine.com/12345.jpg"
                    }]
                };
                var url = _wineApiProxy.getLargeLabelImageUrlForProduct(product);
                expect(url).toBe(product.Labels[0].Url);
            });

            it("given a product with thumbnail and large labels returns the image URL of the large label", function () {
                var product = {
                    "Labels": [{
                        "Name": "thumbnail",
                        "Url": "http://cache.wine.com/thumbnail.jpg"
                    }, {
                        "Name": "large",
                        "Url": "http://cache.wine.com/large.jpg"
                    }]
                };
                var url = _wineApiProxy.getLargeLabelImageUrlForProduct(product);
                expect(url).toBe("http://cache.wine.com/large.jpg");
            });
        });
    });
} ());
