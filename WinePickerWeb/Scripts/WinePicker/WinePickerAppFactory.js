angular.module("WinePickerApp")
    .factory("searchResultsModel", [function () {
        console.log(".factory() $get function for searchResultsModel");
        return new SearchResultsModel();
    } ]);
