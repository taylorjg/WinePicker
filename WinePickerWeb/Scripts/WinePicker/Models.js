/// <reference path="Utils.js" />

SearchCriteriaModel = function () {

    this.wineType = "";
    this.varietal = "";
    this.region = "";
    this.appellation = "";
    this.searchTerm = "";
    this.priceFrom = "";
    this.priceTo = "";
    this.ratingFrom = "";
    this.ratingTo = "";
    this.state = "";
    this.instock = "";
    this.sortOrder = "popularity";
    this.sortDirection = "descending";

    this.encode = function () {
        var criteriaFormatter = new CriteriaFormatter();
        criteriaFormatter.addComponent("wt", this.wineType);
        criteriaFormatter.addComponent("v", this.varietal);
        criteriaFormatter.addComponent("r", this.region);
        criteriaFormatter.addComponent("a", this.appellation);
        criteriaFormatter.addComponent("s", this.searchTerm);
        criteriaFormatter.addComponent("pf", this.priceFrom);
        criteriaFormatter.addComponent("pt", this.priceTo);
        criteriaFormatter.addComponent("rf", this.ratingFrom);
        criteriaFormatter.addComponent("rt", this.ratingTo);
        criteriaFormatter.addComponent("st", this.state);
        criteriaFormatter.addComponent("is", this.instock);
        criteriaFormatter.addComponent("so", this.sortOrder);
        criteriaFormatter.addComponent("sd", this.sortDirection);
        return criteriaFormatter.criteria();
    };

    this.decode = function (s) {
        var criteriaParser = new CriteriaParser(s);
        this.wineType = criteriaParser.getComponent("wt");
        this.varietal = criteriaParser.getComponent("v");
        this.region = criteriaParser.getComponent("r");
        this.appellation = criteriaParser.getComponent("a");
        this.searchTerm = criteriaParser.getComponent("s");
        this.priceFrom = criteriaParser.getComponent("pf");
        this.priceTo = criteriaParser.getComponent("pt");
        this.ratingFrom = criteriaParser.getComponent("rf");
        this.ratingTo = criteriaParser.getComponent("rt");
        this.state = criteriaParser.getComponent("st");
        this.instock = criteriaParser.getComponent("is");
        this.sortOrder = criteriaParser.getComponent("so");
        this.sortDirection = criteriaParser.getComponent("sd");
    };
};

SearchResultsModel = function () {

    this.currentSlideNumber = 0;
    this.offset = 0;
    this.size = 10;
    this.products = null;
    this.pages = [];
    this.state = "";
    this.instock = "";

    this.buildWineDetailsPath = function (product) {
        var criteriaFormatter = new CriteriaFormatter();
        criteriaFormatter.addComponent("id", product.Id);
        criteriaFormatter.addComponent("st", this.state);
        criteriaFormatter.addComponent("is", this.instock);
        return "#/wineDetails/" + criteriaFormatter.criteria();
    };
};

WineDetailsModel = function () {
    this.product = null;
    this.productAttributesWithImageUrl = [];
};
