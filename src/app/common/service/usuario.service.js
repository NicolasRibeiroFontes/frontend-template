(function () {
    'use strict';

    angular.module('usuario.service', [])
        .service('usuarioService', usuarioService);

    usuarioService.$injector = [ '$rootScope', 'usuarioDataService' ];

    /** @ngInject */
    function usuarioService( $rootScope, usuarioDataService ) {

        var _usuarioService = {};

        _usuarioService.obterDadosUsuario = _obterDadosUsuario;

        return _usuarioService;

        function _obterDadosUsuario( callback, autorizacao, params ) {
            $rootScope.dadosUsuario = JSON.parse(localStorage.getItem('nf_usuarioLogado'));
            callback(autorizacao, params);
            // usuarioDataService.obterDadosUsuario()
            //     .then(sucessoDadosUsuario);

            // function sucessoDadosUsuario (result) {

            //     $rootScope.dadosUsuario = {
            //         nome: result.nome,
            //         email : result.email
            //     };

            //     callback(autorizacao, params);
            // }
        }

    }
})();
