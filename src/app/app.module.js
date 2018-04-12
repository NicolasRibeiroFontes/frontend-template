(function() {
    'use strict';

    angular.module('angular-rest-api',
        [
            'ngAnimate',
            'ngTouch',
            'ngSanitize',
            'ngMessages',
            'ui.router',
            'ui.bootstrap',
            'LocalStorageModule',
            'ngMask',

            'config',
            'common',
            'components',

            'softgrid.directive',
            'softselect.directive',
            'softchart.directive',

            'login',
            'home',
            'usuario'
        ]);

})();
