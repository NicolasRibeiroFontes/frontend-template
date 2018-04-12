(function () {
    'use strict';

    angular.module('perfil.data-service', [])
        .service('perfilDataService', perfilDataService);

    perfilDataService.$injector = ['$http', 'API', '$log'];

    /** @ngInject */
    function perfilDataService( $http, API, $log ) {

        var _perfilDataService = {};

        _perfilDataService.obterAtivos = _obterAtivos ;

        return _perfilDataService;


        function _obterAtivos()  {

            return $http.get(API.URL + 'perfil/obterPerfis')
                .then( success )
                .catch( error );

            function success( data ) {
                return data.data;
            }

            function error( error ) {

                var mensagem = 'XHR Failed for obterPerfis';

                if (error.data && ( error.data.message || error.data.description) )
                    mensagem = mensagem + '\n' + error.data.message ? error.data.message : error.data.description;

                $log.error(mensagem);

                throw error;
            }

        }
    }
})();
