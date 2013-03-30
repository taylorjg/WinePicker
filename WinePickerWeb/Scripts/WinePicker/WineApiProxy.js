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
                try {
                    if (data && data.Status && data.Status.ReturnCode === 0) {
                        self.clearErrors();
                        if (_.isFunction(fn)) {
                            fn(data);
                        }
                    } else {
                        if (data && data.Status && data.Status.Messages) {
                            self.reportErrors(data.Status.Messages);
                        } else {
                            if (data) {
                                self.reportErrors(data);
                            } else {
                                self.reportErrors("Some stange sort of empty response received!");
                            }
                        }
                    }
                } finally {
                    if (_.isFunction(self._end)) {
                        self._end();
                    }
                }
            })
            .error(function (data, status) {
                try {
                    // Web API failures include Message and MessageDetail values.
                    // http://www.asp.net/web-api/overview/web-api-routing-and-actions/exception-handling
                    // http://blogs.msdn.com/b/youssefm/archive/2012/06/28/error-handling-in-asp-net-webapi.aspx
                    var mainErrorMessage = "Failed to invoke a wine.com API service.";
                    if (data && data.Message && data.MessageDetail) {
                        self.reportErrors(mainErrorMessage, data.Message, data.MessageDetail);
                    } else {
                        if (data && data.Message) {
                            self.reportErrors(mainErrorMessage, data.Message);
                        } else {
                            self.reportErrors(data ? data : status);
                        }
                    }
                } finally {
                    if (_.isFunction(self._end)) {
                        self._end();
                    }
                }
            });
    };

    this.clearErrors = function () {
        this.reportErrors();
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
