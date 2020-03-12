require([
    "jquery",
    "underscore",
    "domReady",
    "app/test/testService"
], function( $,underscore,domReady
             ,testService
) {

    'use strict';


    /**
     * 시작 함수
     */
    domReady(function () {
        console.log("domReady ");

        testService.init();
    });

});

