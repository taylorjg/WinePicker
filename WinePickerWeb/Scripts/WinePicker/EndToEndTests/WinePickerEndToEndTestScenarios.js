/// <reference path="../../angular-scenario.js" />
/// <reference path="../../angular-mocks.js" />
/// <reference path="../../../lib/jasmine-1.3.1/jasmine.js" />

describe("WinePicker End-to-End Tests", function () {

    // This URL is for WinePicker running under the Visual Studio
    // web development server (Cassini). The port number is assigned
    // in the "Web" section of the WinePickerWeb project's properties
    // (see the "Specific port" setting).
    var url = "http://localhost:51051/WinePicker";

    it("can search for 'dom perignon'", function () {
        browser().navigateTo(url);
        input("searchCriteriaModel.searchTerm").enter("dom perignon");
        element("#searchButton").click();
        expect(window.binding("searchResultsModel.products.Total")).toBeGreaterThan(0);
        expect(window.binding("product.Name")).toContain("Dom Perignon");
    });

    it("the reset button resets the search criteria", function () {

        browser().navigateTo(url);

        select("searchCriteriaModel.wineType").option("Red Wine");
        select("searchCriteriaModel.varietal").option("Merlot");
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

        expect(element("#wineTypeMenu").val()).toBe("124");
        expect(element("#varietalMenu").val()).toBe("138");
        expect(element("#regionMenu").val()).toBe("101");
        expect(element("#appellationMenu").val()).toBe("2398");
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

    it("can browse directly to /wineDetails/id:112875", function () {
        var path = "/wineDetails/id:112875";
        browser().navigateTo(url + "#" + path);
        expect(window.binding("wineDetailsModel.product.Varietal.Name")).toContain("Tempranillo");
    });
});
