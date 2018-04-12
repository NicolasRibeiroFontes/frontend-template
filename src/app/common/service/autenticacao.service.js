(function () {
    'use strict';

    angular.module('autenticacao.service', [])
        .service('autenticacaoService', autenticacaoService);

    autenticacaoService.$injector = ['$rootScope', 'localStorageService'];

    /** @ngInject */
    function autenticacaoService($rootScope, localStorageService) {

        var _autenticacaoService = {};

        _autenticacaoService.login = _login;
        _autenticacaoService.logout = _logout;

        return _autenticacaoService;

        function _login(authData) {

            localStorageService.set('authData', {
                token: authData.access_token,
                login: authData.login
            });

            if (localStorageService.get("loginAnterior") === authData.login) {
                localStorageService.remove("loginAnterior");
                localStorageService.keys().forEach(
                    function (obj) {
                        obj.indexOf('Anterior') !== -1 ? localStorageService.set(obj.substr(0, obj.indexOf("Anterior")), localStorageService.get(obj)) : angular.noop();
                        obj !== 'rotaDefinida' && obj !== 'authData' ? localStorageService.remove(obj) : angular.noop();
                    });


            }
            else
                localStorageService.keys().forEach(
                    function (obj) {
                        if (obj !== 'rotaDefinida' && obj !== 'authData') {
                            localStorageService.remove(obj);
                        }
                    });

            return localStorageService.get("rotaDefinida") ? localStorageService.get("rotaDefinida") : 'app.home';
        }

        function _logout() {

            if (localStorageService.get('authData'))
                localStorageService.remove('authData');

            delete $rootScope.modulos;
            delete $rootScope.dadosUsuario;
        }

    }
})();
