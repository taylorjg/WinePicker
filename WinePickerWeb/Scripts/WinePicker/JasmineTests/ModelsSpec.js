/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../Models.js" />

// ReSharper disable InconsistentNaming

describe("Models", function () {

    describe("WinePickerModel", function () {

        it("can construct instance", function () {
            var model = new WinePickerModel();
            expect(model).not.toBeNull();
        });

        it("constructs object with correct initial values", function () {
            var model = new WinePickerModel();
            expect(model.wineApiCallInProgress).toBe(false);
            expect(model.errorMessages).toBeNull();
            expect(model.errorMessagesVisible).toBe(false);
        });
    });

    describe("SearchCriteriaModel", function () {

        it("can construct instance", function () {
            var model = new SearchCriteriaModel();
            expect(model).not.toBeNull();
        });

        it("constructs object with correct initial values", function () {
            var model = new SearchCriteriaModel();
            expect(model.allWineTypes).toEqual([]);
            expect(model.allVarietals).toEqual([]);
            expect(model.allRegions).toEqual([]);
            expect(model.allAppellations).toEqual([]);
            expect(model.wineTypes).toEqual([]);
            expect(model.varietals).toEqual([]);
            expect(model.regions).toEqual([]);
            expect(model.appellations).toEqual([]);
            expect(model.moreSearchCriteriaCollapsed).toBe(true);
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

        describe("encoding and decoding", function () {

            var _model;

            beforeEach(function () {

                _model = new SearchCriteriaModel();
                
                _model.allWineTypes = [{
                    Id: 123,
                    Name: "Wine Type 1"
                }];
                
                _model.allVarietals = [{
                    Id: 234,
                    Name: "Varietal 1"
                }];
                
                _model.allRegions = [{
                    Id: 345,
                    Name: "Region 1"
                }];
                
                _model.allAppellations = [{
                    Id: 456,
                    Name: "Appellation 1"
                }];
            });
            
            it("can encode string correctly", function () {
                _model.wineType = _model.allWineTypes[0];
                _model.varietal = _model.allVarietals[0];
                _model.region = _model.allRegions[0];
                _model.appellation = _model.allAppellations[0];
                _model.searchTerm = "word1 word2";
                _model.priceFrom = 100;
                _model.priceTo = 200;
                _model.ratingFrom = 92;
                _model.ratingTo = 96;
                _model.state = "CA";
                _model.instock = "1";
                _model.sortOrder = "name";
                _model.sortDirection = "ascending";
                var actual = _model.encode();
                expect(actual).toBe("wt:123|v:234|r:345|a:456|s:word1 word2|pf:100|pt:200|rf:92|rt:96|st:CA|is:1|so:name|sd:ascending");
            });

            it("can decode string correctly", function () {
                _model.decode("wt:123|v:234|r:345|a:456|s:word1 word2|pf:100|pt:200|rf:92|rt:96|st:CA|is:1|so:name|sd:ascending");
                expect(_model.wineType).toBe(_model.allWineTypes[0]);
                expect(_model.varietal).toBe(_model.allVarietals[0]);
                expect(_model.region).toBe(_model.allRegions[0]);
                expect(_model.appellation).toBe(_model.allAppellations[0]);
                expect(_model.searchTerm).toBe("word1 word2");
                expect(_model.priceFrom).toBe("100");
                expect(_model.priceTo).toBe("200");
                expect(_model.ratingFrom).toBe("92");
                expect(_model.ratingTo).toBe("96");
                expect(_model.state).toBe("CA");
                expect(_model.instock).toBe("1");
                expect(_model.sortOrder).toBe("name");
                expect(_model.sortDirection).toBe("ascending");
            });
        });
    });

    describe("SearchResultsModel", function () {

        it("can construct instance", function () {
            var model = new SearchResultsModel();
            expect(model).not.toBeNull();
        });

        it("constructs object with correct initial values", function () {
            var model = new SearchResultsModel();
            expect(model.currentSlideNumber).toBe(0);
            expect(model.size).toBe(10);
            expect(model.pages).toEqual([]);
            expect(model.state).toBe("");
            expect(model.instock).toBe("");
        });

        it("buildWineDetailsPath formats the path correctly with no state and no instock", function () {
            var model = new SearchResultsModel();
            var product = { Id: 123 };
            var actual = model.buildWineDetailsPath(product);
            expect(actual).toBe("#/wineDetails/id:123");
        });

        it("buildWineDetailsPath formats the path correctly with state and instock", function () {
            var model = new SearchResultsModel();
            model.state = "CA";
            model.instock = "1";
            var product = { Id: 123 };
            var actual = model.buildWineDetailsPath(product);
            expect(actual).toBe("#/wineDetails/id:123|st:CA|is:1");
        });
    });

    describe("WineDetailsModel", function () {

        it("can construct instance", function () {
            var model = new WineDetailsModel();
            expect(model).not.toBeNull();
        });

        it("constructs object with correct initial values", function () {
            var model = new WineDetailsModel();
            expect(model.product).toBeNull();
            expect(model.productAttributesWithImageUrl).toEqual([]);
        });
    });
});
