/// <reference path="../../jasmine/jasmine.js" />
/// <reference path="../Utils.js" />

// ReSharper disable InconsistentNaming

describe("CriteriaBuilder", function () {

    it("when no components are added returns prefix and equals sign", function () {
        var criteriaBuilder = new CriteriaBuilder("testprefix");
        var actual = criteriaBuilder.criteria();
        expect(actual).toBe("testprefix=");
    });

    it("when one component is added returns the correct format", function () {
        var criteriaBuilder = new CriteriaBuilder("testprefix");
        criteriaBuilder.addComponent("wt", 124);
        var actual = criteriaBuilder.criteria();
        expect(actual).toBe("testprefix=wt:124");
    });

    it("when two components are added returns the correct format", function () {
        var criteriaBuilder = new CriteriaBuilder("testprefix");
        criteriaBuilder.addComponent("wt", 124);
        criteriaBuilder.addComponent("s", "gamay");
        var actual = criteriaBuilder.criteria();
        expect(actual).toBe("testprefix=wt:124|s:gamay");
    });

    it("when constructed with no prefix and no components added returns empty string", function() {
        var criteriaBuilder = new CriteriaBuilder();
        var actual = criteriaBuilder.criteria();
        expect(actual).toBe("");
    });

    it("when constructed with no prefix and one component added returns the correct format", function() {
        var criteriaBuilder = new CriteriaBuilder();
        criteriaBuilder.addComponent("wt", 124);
        var actual = criteriaBuilder.criteria();
        expect(actual).toBe("wt:124");
    });

    it("when constructed with no prefix and two components added returns the correct format", function() {
        var criteriaBuilder = new CriteriaBuilder();
        criteriaBuilder.addComponent("wt", 124);
        criteriaBuilder.addComponent("s", "gamay");
        var actual = criteriaBuilder.criteria();
        expect(actual).toBe("wt:124|s:gamay");
    });
});
