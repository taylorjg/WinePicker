(function () {

    "use strict";

    window.winePicker = window.winePicker || {};
    window.winePicker.utils = window.winePicker.utils || {};

    // ReSharper disable InconsistentNaming
    var COMPONENT_SEPARATOR = "|";
    var NAME_VALUE_SEPARATOR = ":";
// ReSharper restore InconsistentNaming

    window.winePicker.utils.CriteriaFormatter = function (prefix) {

        this._criteria = "";
        this._prefix = prefix || "";

        this.addComponent = function (name, value) {
            if (name !== "" && value !== "") {
                if (this._criteria !== "") {
                    this._criteria = this._criteria + COMPONENT_SEPARATOR;
                }
                this._criteria = this._criteria + name + NAME_VALUE_SEPARATOR + value;
            }
        };

        this.criteria = function () {
            var result = (this._prefix !== "") ? this._prefix + "=" : "";
            return result + this._criteria;
        };
    };

    window.winePicker.utils.CriteriaParser = function (criteria) {

        this._criteria = criteria || "";
        this._bits = this._criteria.split(COMPONENT_SEPARATOR);

        this.getComponent = function (name) {
            var value = "";
            for (var i = 0; i < this._bits.length; i++) {
                var bit = this._bits[i];
                var prefix = name + NAME_VALUE_SEPARATOR;
                if (bit.substring(0, prefix.length) === prefix) {
                    value = bit.substring(prefix.length);
                }
            }
            return value;
        };
    };
} ());
