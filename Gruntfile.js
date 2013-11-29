module.exports = function(grunt) {

    grunt.initConfig({

        // Import package manifest
        pkg: grunt.file.readJSON("boilerplate.jquery.json"),

        // Banner definitions
        meta: {
            banner: "/*\n" +
                " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                " *  <%= pkg.description %>\n" +
                " *  <%= pkg.homepage %>\n" +
                " *\n" +
                " *  Made by <%= pkg.author.name %>\n" +
                " *  Under <%= pkg.licenses[0].type %> License\n" +
                " */\n"
        },

        // Concat definitions
        concat: {
            dist: {
                src: ["src/jquery.nilsleter.js"],
                dest: "dist/jquery.nilsleter.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },

        // Server
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: "src",
                    hostname: "localhost",
                    livereload: true,
                    open: true
                }
            }
        },

        // Watch files
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ["src/jquery.nilsleter.js"],
                tasks: ["jshint"]
            },
            html: {
                files: ["src/index.html"]
            },
            css: {
                files: ["src/less/**/*.less"],
                tasks: ["less"]
            }
        },

        // Less CSS
        less: {
            development: {
                options: {
                    paths: ["src/less"]
                },
                files: {
                    "src/css/default.css": "src/less/app.less"
                }
            }
        },

        // Lint definitions
        jshint: {
            files: ["src/jquery.nilsleter.js"],
            options: {
                jshintrc: ".jshintrc"
            }
        },

        // Minify definitions
        uglify: {
            my_target: {
                src: ["dist/jquery.nilsleter.js"],
                dest: "dist/jquery.nilsleter.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        }

    });
    
    ///////==== Load tasks
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-less');

    ///////==== Define tasks
    grunt.registerTask("default", ["connect", "watch"]);
    grunt.registerTask("travis",  ["jshint"]);

};