/// <reference path="../underscore.js" />
/// <reference path="Utils.js" />

(function () {

    "use strict";

    window.winePicker = window.winePicker || {};
    window.winePicker.models = window.winePicker.models || {};

    window.winePicker.models.WinePickerModel = function () {
        this.wineApiCallInProgress = false;
        this.errorMessages = null;
        this.errorMessagesVisible = false;
    };

    window.winePicker.models.SearchCriteriaModel = function () {

        this.allWineTypes = [];
        this.allVarietals = [];
        this.allRegions = [];
        this.allAppellations = [];

        this.reset = function () {
            this.wineTypes = this.allWineTypes;
            this.varietals = this.allVarietals;
            this.regions = this.allRegions;
            this.appellations = this.allAppellations;
            this.moreSearchCriteriaCollapsed = true;
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
        };

        this.encode = function () {
            var criteriaFormatter = new winePicker.utils.CriteriaFormatter();
            criteriaFormatter.addComponent("wt", this.wineType.Id || "");
            criteriaFormatter.addComponent("v", this.varietal.Id || "");
            criteriaFormatter.addComponent("r", this.region.Id || "");
            criteriaFormatter.addComponent("a", this.appellation.Id || "");
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
            var criteriaParser = new winePicker.utils.CriteriaParser(s);
            this.wineType = this.findWineTypeById(criteriaParser.getComponent("wt"));
            this.varietal = this.findVarietalById(criteriaParser.getComponent("v"));
            this.region = this.findRegionById(criteriaParser.getComponent("r"));
            this.appellation = this.findAppellationById(criteriaParser.getComponent("a"));
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

        this.showMoreSearchCriteria = function () {
            this.moreSearchCriteriaCollapsed = false;
        };

        this.hideMoreSearchCriteria = function () {
            this.moreSearchCriteriaCollapsed = true;
        };

        this.findWineTypeById = function (wineTypeId) {
            return this.findRefinementById(this.allWineTypes, wineTypeId);
        };

        this.findVarietalById = function (varietalId) {
            return this.findRefinementById(this.allVarietals, varietalId);
        };

        this.findRegionById = function (regionId) {
            return this.findRefinementById(this.allRegions, regionId);
        };

        this.findAppellationById = function (appellationId) {
            return this.findRefinementById(this.allAppellations, appellationId);
        };

        this.findRefinementById = function (refinements, id) {
            var matchingRefinements = _.filter(refinements, function (r) {
                return r.Id === Number(id);
            });
            if (matchingRefinements.length === 1) {
                return matchingRefinements[0];
            }
            return null;
        };

        this.reset();
    };

    window.winePicker.models.SearchResultsModel = function () {

        this.state = "";
        this.instock = "";
        this.size = 10;
        this.products = null;
        this.pages = [];
        this.cachedProducts = [];
        this.lastPageIndex = 0;
        this.currentPageIndex = 0;
        this.currentSlideNumber = 0;

        this.resetForNewSearch = function () {
            this.products = null;
            this.pages = [];
            this.cachedProducts = [];
            this.lastPageIndex = 0;
            this.currentPageIndex = 0;
            this.currentSlideNumber = 0;
        };

        this.buildWineDetailsPath = function (product) {
            var criteriaFormatter = new winePicker.utils.CriteriaFormatter();
            criteriaFormatter.addComponent("id", product.Id);
            criteriaFormatter.addComponent("st", this.state);
            criteriaFormatter.addComponent("is", this.instock);
            return "#/wineDetails/" + criteriaFormatter.criteria();
        };
    };

    window.winePicker.models.WineDetailsModel = function () {
        this.product = null;
        this.productAttributesWithImageUrl = [];
    };
} ());
