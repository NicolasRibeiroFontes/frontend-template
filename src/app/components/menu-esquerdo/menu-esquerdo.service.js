(function () {
    'use strict';

    angular.module('menu-esquerdo.service', [])
        .service('menuEsquerdoService', menuEsquerdoService);

    /** @ngInject */
    function menuEsquerdoService() {

        var _menuEsquerdoService = {};

        _menuEsquerdoService.alternar = _alternar;

        return _menuEsquerdoService;


        function _alternar() {

            var element = angular.element('#left-panel');
            element.hasClass('visible') ? element.removeClass('visible') : element.addClass('visible');

        }
    }

})();
