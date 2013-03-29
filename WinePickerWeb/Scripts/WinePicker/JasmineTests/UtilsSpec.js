/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../Utils.js" />

// ReSharper disable InconsistentNaming

describe("CriteriaFormatter", function () {

    it("when no components are added returns prefix and equals sign", function () {
        var criteriaFormatter = new CriteriaFormatter("testprefix");
        var actual = criteriaFormatter.criteria();
        expect(actual).toBe("testprefix=");
    });

    it("when one component is added returns the correct format", function () {
        var criteriaFormatter = new CriteriaFormatter("testprefix");
        criteriaFormatter.addComponent("wt", 124);
        var actual = criteriaFormatter.criteria();
        expect(actual).toBe("testprefix=wt:124");
    });

    it("when two components are added returns the correct format", function () {
        var criteriaFormatter = new CriteriaFormatter("testprefix");
        criteriaFormatter.addComponent("wt", 124);
        criteriaFormatter.addComponent("s", "gamay");
        var actual = criteriaFormatter.criteria();
        expect(actual).toBe("testprefix=wt:124|s:gamay");
    });

    it("when constructed with no prefix and no components added returns empty string", function() {
        var criteriaFormatter = new CriteriaFormatter();
        var actual = criteriaFormatter.criteria();
        expect(actual).toBe("");
    });

    it("when constructed with no prefix and one component added returns the correct format", function() {
        var criteriaFormatter = new CriteriaFormatter();
        criteriaFormatter.addComponent("wt", 124);
        var actual = criteriaFormatter.criteria();
        expect(actual).toBe("wt:124");
    });

    it("when constructed with no prefix and two components added returns the correct format", function() {
        var criteriaFormatter = new CriteriaFormatter();
        criteriaFormatter.addComponent("wt", 124);
        criteriaFormatter.addComponent("s", "gamay");
        var actual = criteriaFormatter.criteria();
        expect(actual).toBe("wt:124|s:gamay");
    });
});

describe("CriteriaParser", function () {

    it("getComponent returns empty string when the input string is empty", function () {
        var criteriaParser = new CriteriaParser("");
        var actual = criteriaParser.getComponent("wt");
        expect(actual).toBe("");
    });

    it("getComponent returns empty string when the input string is null", function () {
        var criteriaParser = new CriteriaParser(null);
        var actual = criteriaParser.getComponent("wt");
        expect(actual).toBe("");
    });

    it("getComponent returns empty string when the input string is undefined", function () {
        var criteriaParser = new CriteriaParser();
        var actual = criteriaParser.getComponent("wt");
        expect(actual).toBe("");
    });

    it("getComponent returns empty string when the component is not in the input string", function () {
        var criteriaParser = new CriteriaParser("wt:124|s:gamay");
        var actual = criteriaParser.getComponent("so");
        expect(actual).toBe("");
    });

    it("getComponent returns correct value when there is only one component in the string", function () {
        var criteriaParser = new CriteriaParser("wt:124");
        var actual = criteriaParser.getComponent("wt");
        expect(actual).toBe("124");
    });

    describe("given an input string with 3 components", function () {

        var criteriaParser;

        beforeEach(function() {
            criteriaParser = new CriteriaParser("wt:124|s:gamay|so:name");
        });
        
        it("getComponent can correctly parse out the 1st component", function () {
            var actual = criteriaParser.getComponent("wt");
            expect(actual).toBe("124");
        });
        
        it("getComponent can correctly parse out the 2nd component", function () {
            var actual = criteriaParser.getComponent("s");
            expect(actual).toBe("gamay");
        });
        
        it("getComponent can correctly parse out the 3rd component", function () {
            var actual = criteriaParser.getComponent("so");
            expect(actual).toBe("name");
        });
    });
});
