/// <reference path="../angular-scenario.js" />
/// <reference path="../angular-mocks.js" />
/// <reference path="../../lib/jasmine-1.3.1/jasmine.js" />

describe("WinePicker End-to-End Tests", function () {

    var url = "http://localhost:63451/WinePicker";

    it("can enter text into the search box and retrieve it", function () {
        browser().navigateTo(url);
        input("searchTerm").enter("gamay");
        expect(input("searchTerm").val()).toBe("gamay");
    });

    it("can search for gamay", function () {
        browser().navigateTo(url);
        input("searchTerm").enter("gamay");
        element("#searchButton").click();
        window.sleep(2);
        expect(window.binding("products.Total")).toBeGreaterThan(0);
        expect(window.binding("product.Name")).toContain("Gamay");
    });
    
    it("can search for retsina", function () {
        browser().navigateTo(url);
        input("searchTerm").enter("retsina");
        element("#searchButton").click();
        window.sleep(2);
        expect(window.binding("products.Total")).toBeGreaterThan(0);
        expect(window.binding("product.Name")).toContain("Retsina");
    });
});
