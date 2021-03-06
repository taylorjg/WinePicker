﻿/// <reference path="../../angular-scenario.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../../jasmine/jasmine.js" />

(function () {

    "use strict";

    describe("WinePicker End-to-End Tests", function () {

        // This URL is for WinePicker running under the Visual Studio
        // web development server (Cassini). The port number is assigned
        // in the "Web" section of the WinePickerWeb project's properties
        // (see the "Specific port" setting).
        var baseUrl = "http://localhost:51051/WinePicker?mode=e2etest";

        it("can search for 'dom perignon'", function () {
            browser().navigateTo(makeWinePickerUrl());
            input("searchCriteriaModel.searchTerm").enter("dom perignon");
            element("#searchButton").click();
            expect(window.binding("searchResultsModel.products.Total")).toBeGreaterThan(0);
            expect(window.binding("product.Name")).toContain("Dom Perignon");
        });

        it("search with some results shows correct message", function () {
            browser().navigateTo(makeWinePickerUrl());
            input("searchCriteriaModel.searchTerm").enter("dom perignon");
            element("#searchButton").click();
            expect(element("#gotSomeSearchResults:visible", "gotSomeSearchResults div").count()).toBe(1);
            expect(element("#gotNoSearchResults:visible", "gotNoSearchResults div").count()).toBe(0);
        });

        it("search with no results shows correct message", function () {
            browser().navigateTo(makeWinePickerUrl());
            input("searchCriteriaModel.searchTerm").enter("search-term-with-no-results");
            element("#searchButton").click();
            expect(element("#gotSomeSearchResults:visible", "gotSomeSearchResults div").count()).toBe(0);
            expect(element("#gotNoSearchResults:visible", "gotNoSearchResults div").count()).toBe(1);
        });

        it("the reset button resets the search criteria", function () {

            browser().navigateTo(makeWinePickerUrl());

            select("searchCriteriaModel.wineType").option("Red Wine");
            select("searchCriteriaModel.varietal").option("Cabernet Sauvignon");
            select("searchCriteriaModel.region").option("California");
            select("searchCriteriaModel.appellation").option("Napa Valley");
            input("searchCriteriaModel.searchTerm").enter("Cakebread");
            select("searchCriteriaModel.state").option("California");
            input("searchCriteriaModel.instock").select("1");
            input("searchCriteriaModel.priceFrom").enter("100");
            input("searchCriteriaModel.priceTo").enter("200");
            input("searchCriteriaModel.ratingFrom").enter("92");
            input("searchCriteriaModel.ratingTo").enter("96");
            select("searchCriteriaModel.sortOrder").option("Name");
            input("searchCriteriaModel.sortDirection").select("ascending");

            expect(element("#wineTypeMenu").val()).not().toBe("");
            expect(element("#wineTypeMenu").val()).toBe("0");
            expect(element("#varietalMenu").val()).not().toBe("");
            expect(element("#varietalMenu").val()).toBe("0");
            expect(element("#regionMenu").val()).not().toBe("");
            expect(element("#regionMenu").val()).toBe("0");
            expect(element("#appellationMenu").val()).not().toBe("");
            expect(element("#appellationMenu").val()).toBe("0");
            expect(element("#searchTerm").val()).toBe("Cakebread");
            expect(element("#stateMenu").val()).toBe("CA");
            expect(element("input[name='instockRadios']:checked").val()).toBe("1");
            expect(element("#priceFrom").val()).toBe("100");
            expect(element("#priceTo").val()).toBe("200");
            expect(element("#ratingFrom").val()).toBe("92");
            expect(element("#ratingTo").val()).toBe("96");
            expect(element("#sortOrderMenu").val()).toBe("name");
            expect(element("input[name='sortDirectionRadios']:checked").val()).toBe("ascending");

            element("#resetButton").click();

            expect(element("#wineTypeMenu").val()).toBe("");
            expect(element("#varietalMenu").val()).toBe("");
            expect(element("#regionMenu").val()).toBe("");
            expect(element("#appellationMenu").val()).toBe("");
            expect(element("#searchTerm").val()).toBe("");
            expect(element("#stateMenu").val()).toBe("");
            expect(element("input[name='instockRadios']:checked").val()).toBe("");
            expect(element("#priceFrom").val()).toBe("");
            expect(element("#priceTo").val()).toBe("");
            expect(element("#ratingFrom").val()).toBe("");
            expect(element("#ratingTo").val()).toBe("");
            expect(element("#sortOrderMenu").val()).toBe("popularity");
            expect(element("input[name='sortDirectionRadios']:checked").val()).toBe("descending");
        });

        it("if a search fails with a wine.com API error then the error is displayed", function () {
            browser().navigateTo(makeWinePickerUrl());
            input("searchCriteriaModel.searchTerm").enter("api-error");
            element("#searchButton").click();
            expect(element("div.alert-error:visible", "visible error message box").count()).toBe(1);
        });

        it("if a search fails with a HTTP error then the error is displayed", function () {
            browser().navigateTo(makeWinePickerUrl());
            input("searchCriteriaModel.searchTerm").enter("http-error");
            element("#searchButton").click();
            expect(element("div.alert-error:visible", "visible error message box").count()).toBe(1);
        });

        it("the reset button clears any error that is currently being displayed", function () {
            browser().navigateTo(makeWinePickerUrl());
            input("searchCriteriaModel.searchTerm").enter("api-error");
            element("#searchButton").click();
            expect(element("div.alert-error:visible", "visible error message box").count()).toBe(1);
            element("#resetButton").click();
            expect(element("div.alert-error:visible", "visible error message box").count()).toBe(0);
        });

        it("selecting Wine Type 'Red Wine' should filter the Varietals menu", function () {

            browser().navigateTo(makeWinePickerUrl());

            // http://stackoverflow.com/questions/14567018/angularjs-e2e-testing-how-to-get-value-of-repeater-count
            var beforeCountFuture = element("#varietalMenu option").count();
            beforeCountFuture.execute(angular.noop);
            var beforeCount = beforeCountFuture.value;

            select("searchCriteriaModel.wineType").option("Red Wine");

            var afterCountFuture = element("#varietalMenu option").count();
            expect(afterCountFuture).toBeLessThan(beforeCount);
        });

        it("selecting Varietal 'Chardonnay' should select Wine Type 'White Wine'", function () {
            browser().navigateTo(makeWinePickerUrl());
            expect(element("#wineTypeMenu").val()).toBe("");
            select("searchCriteriaModel.varietal").option("Chardonnay");
            expect(element("#wineTypeMenu").val()).not().toBe("");
            expect(element("#wineTypeMenu").val()).toBe("1");
        });

        it("selecting Region 'California' should filter the Appellations menu", function () {

            browser().navigateTo(makeWinePickerUrl());

            // http://stackoverflow.com/questions/14567018/angularjs-e2e-testing-how-to-get-value-of-repeater-count
            var beforeCountFuture = element("#appellationMenu option").count();
            beforeCountFuture.execute(angular.noop);
            var beforeCount = beforeCountFuture.value;

            select("searchCriteriaModel.region").option("California");

            var afterCountFuture = element("#appellationMenu option").count();
            expect(afterCountFuture).toBeLessThan(beforeCount);
        });

        it("selecting Appellation 'Chile' should select Region 'South America'", function () {
            browser().navigateTo(makeWinePickerUrl());
            expect(element("#regionMenu").val()).toBe("");
            select("searchCriteriaModel.appellation").option("Chile");
            expect(element("#regionMenu").val()).not().toBe("");
            expect(element("#regionMenu").val()).toBe("16");
        });

        it("selecting a varietal and then selecting All Wine Types should reset the varietal to All Varietals", function () {
            browser().navigateTo(makeWinePickerUrl());
            expect(element("#wineTypeMenu").val()).toBe("");
            expect(element("#varietalMenu").val()).toBe("");
            select("searchCriteriaModel.varietal").option("Merlot");
            expect(element("#wineTypeMenu").val()).toBe("0");
            select("searchCriteriaModel.wineType").option("");
            expect(element("#wineTypeMenu").val()).toBe("");
            expect(element("#varietalMenu").val()).toBe("");
        });

        it("selecting an appellation and then selecting All Regions should reset the appellation to All Appellations", function () {
            browser().navigateTo(makeWinePickerUrl());
            expect(element("#regionMenu").val()).toBe("");
            expect(element("#appellationMenu").val()).toBe("");
            select("searchCriteriaModel.appellation").option("Chile");
            expect(element("#regionMenu").val()).toBe("16");
            select("searchCriteriaModel.region").option("");
            expect(element("#regionMenu").val()).toBe("");
            expect(element("#appellationMenu").val()).toBe("");
        });

        it("can browse directly to /wineDetails/id:112875", function () {
            browser().navigateTo(makeWineDetailsUrl(112875));
            expect(window.binding("wineDetailsModel.product.Varietal.Name")).toContain("Tempranillo");
        });

        function makeWinePickerUrl() {
            return baseUrl;
        }

        function makeWineDetailsUrl(id) {
            var path = "/wineDetails/id:" + id;
            return baseUrl + "#" + path;
        }
    });
} ());
