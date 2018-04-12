(function () {
    'use strict';

    angular.module('cabecalho.directive', [])
        .directive('cabecalho', cabecalho);

    cabecalho.$inject = ['$log' ,'cabecalhoService'];

    /** @ngInject */
    function cabecalho($log,cabecalhoService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/cabecalho/cabecalho.template.html',
            link: cabecalhoDirective
        };

        function cabecalhoDirective(scope) {

            scope.alternarMenu = _alternarMenu;


            function _alternarMenu() {

                cabecalhoService.alternar();

            }
        }
    }
})();
