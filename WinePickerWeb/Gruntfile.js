module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            files: ['Scripts/WinePicker/**/*.js'],
            // See http://www.jshint.com/docs/
            options: {
                undef: true,
                unused: true,
                bitwise: true,
                curly: true,
                eqnull: true,
                eqeqeq: true,
                quotmark: "double",
                trailing: true,
                maxdepth: 4,
                strict: true,
                globals: {

                    // My stuff
                    wineApi: true,
                    WineApiProxy: true,
                    WinePickerController: true,
                    SearchCriteriaController: true,
                    SearchResultsController: true,
                    WineDetailsController: true,
                    WinePickerModel: true,
                    SearchCriteriaModel: true,
                    SearchResultsModel: true,
                    WineDetailsModel: true,
                    CriteriaFormatter: true,
                    CriteriaParser: true,

                    // underscore
                    _: true,
                    
                    // jQuery
                    $: true,
                    
                    // Web browser bits
                    console: true,
                    window: true,
                    
                    // Jasmine
                    describe: true,
                    it: true,
                    beforeEach: true,
                    afterEach: true,
                    
                    // AngularJS
                    angular: true,
                    browser: true,
                    input: true,
                    element: true,
                    select: true,
                    expect: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['jshint']);
};
