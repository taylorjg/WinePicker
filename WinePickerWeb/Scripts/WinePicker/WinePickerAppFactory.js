angular.module("WinePickerApp")
    .factory("urlBuilder", [function() {
        console.log(".factory() function");
        var apiKey = "2fd879a5765785c043cc992b550d2bda";
        var urlBuilder = new wineApi.UrlBuilder(apiKey);
        return urlBuilder;
    }]);
