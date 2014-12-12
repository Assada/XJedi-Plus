module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            files: {
                src: ['left/tracker/src/main/extensions/src/common/app/*.js', '!left/tracker/src/main/extensions/src/common/app/forum.js'],
                dest: 'left/tracker/src/main/extensions/src/common/app/',
                expand: true,
                flatten: true,
                ext: '.js'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'left/tracker/src/main/extensions/src/common/options.html': 'left/tracker/src/main/extensions/src/common/options.html',
                    'left/tracker/src/main/extensions/src/common/popup.html': 'left/tracker/src/main/extensions/src/common/popup.html'
                }
            }
        },
        cssmin: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'left/tracker/src/main/extensions/src/common/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'left/tracker/src/main/extensions/src/common/css/',
                    ext: '.css'
                }]
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'left/tracker/src/main/extensions/src/common/icons/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'left/tracker/src/main/extensions/src/common/icons/'
                }]
            }
        },
        watch: {
            js:  { files: 'left/tracker/src/main/extensions/src/common/app/*.js', tasks: [ 'uglify' ] },
            html:  { files: 'left/tracker/src/main/extensions/src/common/*.html', tasks: [ 'htmlmin' ] },
            css:  { files: 'left/tracker/src/main/extensions/src/common/css/*.css', tasks: [ 'cssmin' ] }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', [ 'uglify', 'htmlmin', 'cssmin', 'imagemin' ]);


};