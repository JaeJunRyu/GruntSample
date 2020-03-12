define([
    "jquery",
    "underscore"
], function ( $,underscore ) {

    'use strict';

    var exports = {};

    function init() {
        console.log("init testService");
    }

    exports.testService = function() {
        console.log("test Service");

    };


    return {
        init:init,
        service:exports
    };
});