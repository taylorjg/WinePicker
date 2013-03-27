﻿/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../Models.js" />

// ReSharper disable InconsistentNaming

describe("Models", function () {

    describe("SearchCriteriaModel", function () {

        it("can construct instance", function () {
            var model = new SearchCriteriaModel();
            expect(model).not.toBeNull();
        });

        it("constructs object with correct initial values", function () {
            var model = new SearchCriteriaModel();
            expect(model.wineType).toBe("");
            expect(model.varietal).toBe("");
            expect(model.region).toBe("");
            expect(model.appellation).toBe("");
            expect(model.searchTerm).toBe("");
            expect(model.priceFrom).toBe("");
            expect(model.priceTo).toBe("");
            expect(model.ratingFrom).toBe("");
            expect(model.ratingTo).toBe("");
            expect(model.state).toBe("");
            expect(model.instock).toBe("");
            expect(model.sortOrder).toBe("popularity");
            expect(model.sortDirection).toBe("descending");
        });

        it("can encode string correctly", function () {
            var model = new SearchCriteriaModel();
            model.wineType = 123;
            model.varietal = 234;
            model.region = 345;
            model.appellation = 456;
            model.searchTerm = "word1 word2";
            model.priceFrom = 100;
            model.priceTo = 200;
            model.ratingFrom = 92;
            model.ratingTo = 96;
            model.state = "CA";
            model.instock = "1";
            model.sortOrder = "name";
            model.sortDirection = "ascending";
            var actual = model.encode();
            expect(actual).toBe("wt:123|v:234|r:345|a:456|s:word1 word2|pf:100|pt:200|rf:92|rt:96|st:CA|is:1|so:name|sd:ascending");
        });

        it("can decode string correctly", function () {
            var model = new SearchCriteriaModel();
            model.decode("wt:123|v:234|r:345|a:456|s:word1 word2|pf:100|pt:200|rf:92|rt:96|st:CA|is:1|so:name|sd:ascending");
            expect(model.wineType).toBe("123");
            expect(model.varietal).toBe("234");
            expect(model.region).toBe("345");
            expect(model.appellation).toBe("456");
            expect(model.searchTerm).toBe("word1 word2");
            expect(model.priceFrom).toBe("100");
            expect(model.priceTo).toBe("200");
            expect(model.ratingFrom).toBe("92");
            expect(model.ratingTo).toBe("96");
            expect(model.state).toBe("CA");
            expect(model.instock).toBe("1");
            expect(model.sortOrder).toBe("name");
            expect(model.sortDirection).toBe("ascending");
        });
    });

    describe("SearchResultsModel", function () {

        it("can construct instance", function () {
            var model = new SearchResultsModel();
            expect(model).not.toBeNull();
        });
    });

    describe("WineDetaisModel", function () {

        it("can construct instance", function () {
            var model = new WineDetailsModel();
            expect(model).not.toBeNull();
        });
    });
});
