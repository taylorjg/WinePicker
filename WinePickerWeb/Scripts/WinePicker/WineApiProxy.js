/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

WineApiProxy = function ($http) {

    this._$http = $http;
    this._start = null;
    this._end = null;
    this._error = null;

    this.start = function (fn) {
        this._start = fn;
    };

    this.end = function (fn) {
        this._end = fn;
    };

    this.error = function (fn) {
        this._error = fn;
    };

    this.callWineApi = function (queryString, fn) {

        var self = this;
        var url = "api/wineapi?" + queryString;

        if (_.isFunction(this._start)) {
            this._start();
        }

        this._$http.get(url)
            .success(function (data) {
                if (data && data.Status && data.Status.ReturnCode === 0) {
                    self.reportErrors();
                    if (_.isFunction(fn)) {
                        fn(data);
                    }
                } else {
                    self.reportErrors(data.Status.Messages);
                }
                if (_.isFunction(self._end)) {
                    self._end();
                }
            })
            .error(function (data, status) {
                // Web API failures include Message and MessageDetail values.
                // http://www.asp.net/web-api/overview/web-api-routing-and-actions/exception-handling
                if (data && data.Message && data.MessageDetail) {
                    self.reportErrors(
                        "Failed to invoke wine.com API via server proxy - HTTP status code: " + status,
                        data.Message,
                        data.MessageDetail);
                } else {
                    self.reportErrors(data ? data : status);
                }
                if (_.isFunction(self._end)) {
                    self._end();
                }
            });
    };

    this.reportErrors = function (errorMessages) {

        var errorMessagesArray = [];

        if (arguments.length === 1) {
            if (_.isArray(errorMessages)) {
                errorMessagesArray = errorMessages;
            }
            else {
                errorMessagesArray.push(errorMessages);
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                errorMessagesArray.push(arguments[i]);
            }
        }

        if (_.isFunction(this._error)) {
            this._error(errorMessagesArray);
        }
    };
};

WineApiProxy.$inject = ["$http"];
