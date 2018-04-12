(function () {
    'use strict';

    angular.module('interceptor-provider.service', [])
        .service('interceptorProviderService', interceptorProviderService);

    interceptorProviderService.$injector = [ '$q', '$rootScope', '$location', 'localStorageService', 'autenticacaoService' ];

    /** @ngInject */
    function interceptorProviderService( $q, $rootScope, $location, localStorageService,autenticacaoService ) {

        var interceptorService = {};

        interceptorService.request = _request;
        interceptorService.responseError = _responseError;

        return interceptorService;

        function _request(config) {

            config.headers = config.headers || {};

            if (localStorageService.get('authData'))
                config.headers.Authorization = 'Bearer ' + localStorageService.get('authData').token;

            return config;
        }

        function _responseError(rejection) {

            if (rejection.status === 401) {

                localStorageService.set("rotaDefinida", $rootScope.stateName);
                autenticacaoService.logout();
                $location.path('/login');

                return $q.defer().resolve(rejection);
            }

            return $q.reject(rejection);
        }

    }
})();
