'use strict';
module.exports = function(grunt) {

    var config = {
        distPath: 'resource/frontEnd/dist',
        // performanceCssPath: 'resource/frontEnd/style',
        localPath : 'resource/frontEnd',
        requireConfigPath : 'resource/frontEnd/app.js'
    };

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        path: config,

        //해당 폴더 삭제
        clean: {
            // build: ['<%= path.distPath %>','<%= path.performanceCssPath %>'],
            build: ['<%= path.distPath %>'],
        },
        //파일 병합
        // concat: {
        //     lib: {
        //         src:[
        //             'resource/script/web/common/script.js',
        //         ],
        //         dest: '<%= path.distPath %>/lib.js'
        //     }
        // },
        //css 파일 병합
        // cssmin: {
        //     target: {
        //         files: {
        //             '<%= path.performanceCssPath %>/test1.css': [
        //                 'resource/style/web/common/test2.css',
        //             ]
        //         }
        //     }
        // },
        //파일 압축
        uglify: {
            my_target: {
                files: {
                    // '<%= path.distPath %>/lib.min.js' :'<%= path.distPath %>/lib.js',
                    '<%= path.distPath %>/testController.min.js' :'<%= path.distPath %>/testController.js'
                }
            }
        },
        //js 파일 캐싱
        cachebreaker: {
            dev: {
                options: {
                    match: [
                        'resource/frontEnd/app/test/testController.js',
                        'resource/frontEnd/app.js'
                    ],
                    position: 'append',
                    replacement: function (){
                        return grunt.template.today("yyyymmdd")+new Date().getTime();
                    }

                },
                files: {
                    src: [
                        'WEB-INF/views/main/index.jsp',
                    ]
                }
            }
        },
        // requirejs task 설정
        requirejs: {
            testController1: {
                options: {
                    baseUrl : '<%= path.localPath %>',
                    name : 'app/test/testController',
                    mainConfigFile : '<%= path.requireConfigPath %>',
                    optimize : 'none',
                    // exclude : ["jquery","underscore"],
                    out : '<%= path.distPath %>/testController.js'
                }
            }
        }

    });

    // 플러그인 load
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-cache-breaker');
    grunt.loadNpmTasks('grunt-contrib-requirejs');


    // Default task(s) : 즉, grunt 명령어로 실행할 작업
    // grunt.registerTask('build', ['clean','concat','cssmin','requirejs','cachebreaker','uglify']);
    grunt.registerTask('build', ['clean','requirejs','cachebreaker','uglify']);


};