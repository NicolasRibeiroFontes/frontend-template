(function () {
    'use strict';

    angular.module('loading.service', [])
        .service('loadingService', loadingService);

    /** @ngInject */
    function loadingService() {



        var _loadService = {};

        _loadService.show = _show;
        _loadService.hide = _hide;

        return _loadService;


        function _show()  {

            var element = angular.element('.loadingScreen');

            element.removeClass('hide');
            element.addClass('show');

            element.animate({
                'opacity': 1.0
            }, 200);

        }

        function _hide  () {

            var element = angular.element('.loadingScreen');

            element.removeClass('show');
            element.addClass('hide');
            element.animate({
                'opacity': 1.0
            }, 200);

        }
    }

})();
