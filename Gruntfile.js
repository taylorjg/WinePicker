/* global module */

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: grunt.file.readJSON(".jshintrc"),
            files: [
				"Gruntfile.js",
				"WinePickerWeb/Scripts/WineApi/**/*.js",
				"WinePickerWeb/Scripts/WinePicker/**/*.js"
			]
        },
        jasmine: {
            all_targets: {
                src: [
                    "WinePickerWeb/Scripts/angular.js",
                    "WinePickerWeb/Scripts/angular-mocks.js",
                    "WinePickerWeb/Scripts/underscore.js",
                    "WinePickerWeb/Scripts/jquery-1.9.1.js",
                    "WinePickerWeb/Scripts/WineApi/*.js",
                    "WinePickerWeb/Scripts/WinePicker/*.js"
                ],
                options: {
                    specs: [
                        "WinePickerWeb/Scripts/WineApi/JasmineTests/*Spec.js",
                        "WinePickerWeb/Scripts/WinePicker/JasmineTests/*Spec.js"
                    ]
                }
            }
        },
        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint", "jasmine"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jasmine");

    grunt.registerTask("default", ["jshint"]);
};
