(function () {
    'use strict';

    angular.module('home', ['home.controller'])
        .config(homeConfig);

    homeConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function homeConfig($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: 'home',
                views: {
                    '@': {
                        templateUrl: 'app/view/home/home.html',
                        controller: 'HomeController',
                        controllerAs: "vm"
                    }
                }
            });
    }
})();
