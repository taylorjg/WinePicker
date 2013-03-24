CriteriaBuilder = function (prefix) {

    this._criteria = "";
    this._prefix = prefix;

    this.addComponent = function (name, value) {
        if (this._criteria !== "") {
            this._criteria = this._criteria + "|";
        }
        this._criteria = this._criteria + name + ":" + value;
    };

    this.criteria = function () {
        return this._prefix + "=" + this._criteria;
    };
};
