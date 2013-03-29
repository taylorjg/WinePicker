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
        var criteriaBuilder = new CriteriaBuilder();
        criteriaBuilder.addComponent("wt", this.wineType);
        criteriaBuilder.addComponent("v", this.varietal);
        criteriaBuilder.addComponent("r", this.region);
        criteriaBuilder.addComponent("a", this.appellation);
        criteriaBuilder.addComponent("s", this.searchTerm);
        criteriaBuilder.addComponent("pf", this.priceFrom);
        criteriaBuilder.addComponent("pt", this.priceTo);
        criteriaBuilder.addComponent("rf", this.ratingFrom);
        criteriaBuilder.addComponent("rt", this.ratingTo);
        criteriaBuilder.addComponent("st", this.state);
        criteriaBuilder.addComponent("is", this.instock);
        criteriaBuilder.addComponent("so", this.sortOrder);
        criteriaBuilder.addComponent("sd", this.sortDirection);
        return criteriaBuilder.criteria();
    };
    
    this.decode = function (s) {
        var bits = s.split("|");
        this.wineType = findBit(bits, "wt");
        this.varietal = findBit(bits, "v");
        this.region = findBit(bits, "r");
        this.appellation = findBit(bits, "a");
        this.searchTerm = findBit(bits, "s");
        this.priceFrom = findBit(bits, "pf");
        this.priceTo = findBit(bits, "pt");
        this.ratingFrom = findBit(bits, "rf");
        this.ratingTo = findBit(bits, "rt");
        this.state = findBit(bits, "st");
        this.instock = findBit(bits, "is");
        this.sortOrder = findBit(bits, "so");
        this.sortDirection = findBit(bits, "sd");
    };

    var findBit = function (bits, name) {
        var result = "";
        for (var i = 0; i < bits.length; i++) {
            var bit = bits[i];
            var prefix = name + ":";
            var x = bit.substring(0, prefix.length);
            if (x === prefix) {
                result = bit.substring(prefix.length);
            }
        }
        return result;
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
        var criteriaBuilder = new CriteriaBuilder();
        criteriaBuilder.addComponent("id", product.Id);
        criteriaBuilder.addComponent("st", this.state);
        criteriaBuilder.addComponent("is", this.instock);
        return "#/wineDetails/" + criteriaBuilder.criteria();
    };
};

WineDetailsModel = function () {
    this.product = null;
    this.productAttributesWithImageUrl = [];
};
