(function () {
    'use strict';

    angular.module('login', ['login.controller'])
        .config(loginConfig);

    loginConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function loginConfig($stateProvider) {
        $stateProvider
            .state('app.login', {
                url: 'login',
                views: {
                    '@': {
                        templateUrl: 'app/view/login/login.html',
                        controller: 'LoginController',
                        controllerAs: "vm"
                    }
                }
            });
    }

})();
