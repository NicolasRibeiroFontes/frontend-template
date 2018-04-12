(function () {
    'use strict';

    angular.module('usuario', ['usuario.controller'])
        .config(usuarioConfig);

    usuarioConfig.$inject = ['$stateProvider'];

    /** @ngInject */
    function usuarioConfig($stateProvider) {
        $stateProvider
            .state('app.usuario', {
                url: 'usuario',
                views: {
                    '@': {
                        templateUrl: 'app/view/usuario/usuario.html',
                        controller: 'UsuarioController',
                        controllerAs: "vm",
                        resolve: {                            
                            listaUsuarios: obterUsuarios
                        }
                    }
                }
            });

            

        function obterUsuarios(usuarioDataService) {
            return usuarioDataService.obterUsuarios();
        }

    }
})();
