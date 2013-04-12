/// <reference path="../underscore.js" />

// ReSharper disable InconsistentNaming

(function () {

    "use strict";

    window.WineApiProxy = function ($http) {

        var _$http = $http;
        var _start = null;
        var _end = null;
        var _error = null;

        this.start = function (fn) {
            _start = fn;
        };

        this.end = function (fn) {
            _end = fn;
        };

        this.error = function (fn) {
            _error = fn;
        };

        this.callWineApi = function (queryString, fn) {

            var self = this;

            var url = "api/wineapi?" + queryString;

            if (_.isFunction(_start)) {
                _start();
            }

            _$http.get(url)
            .success(function (data) {
                try {
                    if (data && data.Status && data.Status.ReturnCode === 0) {
                        self.clearErrors();
                        if (_.isFunction(fn)) {
                            fn(data);
                        }
                    } else {
                        if (data && data.Status && data.Status.Messages) {
                            _reportErrors(data.Status.Messages);
                        } else {
                            if (data) {
                                _reportErrors(data);
                            } else {
                                _reportErrors("Some stange sort of empty response received!");
                            }
                        }
                    }
                } finally {
                    if (_.isFunction(_end)) {
                        _end();
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
                        _reportErrors(mainErrorMessage, data.Message, data.MessageDetail);
                    } else {
                        if (data && data.Message) {
                            _reportErrors(mainErrorMessage, data.Message);
                        } else {
                            _reportErrors(data ? data : status);
                        }
                    }
                } finally {
                    if (_.isFunction(_end)) {
                        _end();
                    }
                }
            });
        };

        this.getLargeLabelImageUrlForProduct = function (product) {

            var result = "";

            if (product && product.Labels && _.isArray(product.Labels) && product.Labels.length > 0) {
                var largeLabels = _.filter(product.Labels, function (label) {
                    return label && label.Name && label.Name === "large";
                });
                if (largeLabels.length > 0) {
                    result = largeLabels[0].Url;
                } else {
                    result = product.Labels[0].Url.replace(/m.jpg$/, "l.jpg");
                }
            }

            return result;
        };

        this.clearErrors = function () {
            _reportErrors();
        };

        function _reportErrors(errorMessages) {

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

            if (_.isFunction(_error)) {
                _error(errorMessagesArray);
            }
        }
    };

    window.WineApiProxy.$inject = ["$http"];
} ());
