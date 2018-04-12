(function () {
    'use strict';

    angular.module('cabecalho.service', [])
        .service('cabecalhoService', cabecalhoService);

    cabecalhoService.$injector = ['menuEsquerdoService'];

    /** @ngInject */
    function cabecalhoService(menuEsquerdoService) {

        var _cabecalhoService = {};

        _cabecalhoService.alternar = _alternar;

        return _cabecalhoService;

        function _alternar ()
        {
            var element = angular.element('#main-menu-shortuck');
            element.hasClass('menu-active') ? element.removeClass('menu-active') : element.addClass('menu-active');
            menuEsquerdoService.alternar();

        }

    }

})();
