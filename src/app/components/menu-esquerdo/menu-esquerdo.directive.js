(function () {
    'use strict';

    angular.module('menu-esquerdo.directive', [])
        .directive('menuEsquerdo', menuEsquerdo);

    menuEsquerdo.$injector = [ '$state' , 'autenticacaoService', 'menuEsquerdoService' ];

    /** @ngInject */
    function menuEsquerdo($state, autenticacaoService, menuEsquerdoService) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/components/menu-esquerdo/menu-esquerdo.template.html',
            link: menuEsquerdoDirective
        };

        function menuEsquerdoDirective(scope) {

            scope.verificarModuloAtivo = _verificarModuloAtivo;
            scope.sair = _sair;

            function _verificarModuloAtivo(modulo){

                if(modulo.state !== null && $state.current.name === modulo.state)
                    return true;

                return _.find(modulo.modulosFilho, {'state': $state.current.name});

            }

            function _sair() {
                menuEsquerdoService.alternar();
                localStorage.removeItem('nf_usuarioLogado');
                $state.go('app.login');
            }
        }
    }
})();
