'use strict';
module.exports = function(grunt) {

    var config = {
        performancePath: 'resource/frontEnd/dist',
        performanceCssPath: 'resource/frontEnd/style',
        localPerformancePath : 'resource/frontEnd',
        requireConfigPath : 'resource/frontEnd/app.js'
    };

    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),

        path: config,

        //해당 폴더 삭제
        clean: {
            build: ['<%= path.performancePath %>','<%= path.performanceCssPath %>'],
        },
        //파일 병합
        concat: {
            melonlib: {
                src:[
                    'resource/script/web/common/cript.js',
                ],
                dest: '<%= path.performancePath %>/lib.js'
            }
        },
        //css 파일 병합
        cssmin: {
            target: {
                files: {
                    '<%= path.performanceCssPath %>/performanceStyle.css': [
                        'resource/style/web/common/common.css',
                        'resource/style/web/common/detailview.css',
                        'resource/style/web/common/event.css',
                    ]
                }
            }
        },
        //파일 압축
        uglify: {
            my_target: {
                files: {
                    '<%= path.performancePath %>/lib.min.js' :'<%= path.performancePath %>/lib.js',
                    '<%= path.performancePath %>/performanceController.min.js' :'<%= path.performancePath %>/performanceController.js',
                    '<%= path.performancePath %>/headerController.min.js' :'<%= path.performancePath %>/headerController.js'
                }
            }
        },
        //js 파일 캐싱
        cachebreaker: {
            dev: {
                options: {
                    match: [
                        'resource/frontEnd/dist/performanceController.js',
                        'resource/frontEnd/dist/headerController.js',
                        'resource/frontEnd/app.js'
                    ],
                    position: 'append',
                    replacement: function (){
                        return grunt.template.today("yyyymmdd")+new Date().getTime();
                    }

                },
                files: {
                    src: [
                        'WEB-INF/views/performance/index.jsp',
                        'WEB-INF/layouts/performance/include/top.jsp',
                        'WEB-INF/layouts/performance/include/script.jsp'
                    ]
                }
            }
        },
        // requirejs task 설정
        requirejs: {
            testController1: {
                options: {
                    baseUrl : '<%= path.localPerformancePath %>',
                    name : 'js/app/performance/controller/performanceController',
                    mainConfigFile : '<%= path.requireConfigPath %>',
                    optimize : 'none',
                    // exclude : ["jquery","underscore"],
                    out : '<%= path.performancePath %>/performanceController.js'
                }
            },
            testController2: {
                options: {
                    baseUrl : '<%= path.localPerformancePath %>',
                    name : 'js/app/common/controller/headerController',
                    mainConfigFile : '<%= path.requireConfigPath %>',
                    optimize : 'none',
                    // exclude : ["jquery","underscore"],
                    out : '<%= path.performancePath %>/headerController.js'
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
    grunt.registerTask('build', ['clean','concat','cssmin','requirejs','cachebreaker','uglify']);


};