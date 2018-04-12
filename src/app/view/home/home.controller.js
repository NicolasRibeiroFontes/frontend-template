(function () {
    'use strict';

    angular.module('home.controller', [])
        .controller('HomeController', HomeController);

    HomeController.$injector = ['$state'];

    /** @ngInject */
    function HomeController($state) {

        var vm = this;
    }
})();
