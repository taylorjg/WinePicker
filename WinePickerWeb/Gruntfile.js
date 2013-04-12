/* global module */

module.exports = function (grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        jshint: {
            options: grunt.file.readJSON(".jshintrc"),
            files: [
				"Gruntfile.js",
				"Scripts/WineApi/**/*.js",
				"Scripts/WinePicker/**/*.js"
			]
        },
        watch: {
            files: ["<%= jshint.files %>"],
            tasks: ["jshint"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["jshint"]);
};
