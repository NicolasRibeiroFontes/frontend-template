(function () {
    'use strict';

    angular.module('modulo.data-service', [])
        .service('moduloDataService', moduloDataService);

    moduloDataService.$injector = ['$http', 'API', '$log'];

    /** @ngInject */
    function moduloDataService( $http, API, $log ) {

        var _moduloDataService = {};

        _moduloDataService.obterModuloPorPerfil = _obterModuloPorPerfil ;
        _moduloDataService.checarPermissao = _checarPermissao ;

        return _moduloDataService;


        function _obterModuloPorPerfil()  {

            return $http.get(API.URL + 'modulo/obterModulos')
                .then( success )
                .catch( error );

            function success( data ) {
                return data.data;
            }

            function error( error ) {

                var mensagem = 'XHR Failed for obterModulosPorPerfil';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }

        function _checarPermissao( state )  {

            return $http.post(API.URL + 'modulo/checarPermissao', state)
                .then( success )
                .catch( error );

            function success( data ) {
                return data.data;
            }

            function error( error ) {

                var mensagem = 'XHR Failed for checarPermissao';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }

    }
})();
