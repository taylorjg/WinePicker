(function () {

    "use strict";

    window.CriteriaFormatter = function (prefix) {

        this._criteria = "";
        this._prefix = prefix || "";

        this.addComponent = function (name, value) {
            if (name !== "" && value !== "") {
                if (this._criteria !== "") {
                    this._criteria = this._criteria + "|";
                }
                this._criteria = this._criteria + name + ":" + value;
            }
        };

        this.criteria = function () {
            var result = (this._prefix !== "") ? this._prefix + "=" : "";
            return result + this._criteria;
        };
    };

    window.CriteriaParser = function (criteria) {

        this._criteria = criteria || "";
        this._bits = this._criteria.split("|");

        this.getComponent = function (name) {
            var value = "";
            for (var i = 0; i < this._bits.length; i++) {
                var bit = this._bits[i];
                var prefix = name + ":";
                if (bit.substring(0, prefix.length) === prefix) {
                    value = bit.substring(prefix.length);
                }
            }
            return value;
        };
    };
} ());
