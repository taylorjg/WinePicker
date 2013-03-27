CriteriaBuilder = function (prefix) {

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
