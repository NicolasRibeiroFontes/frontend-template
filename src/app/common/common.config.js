(function () {
    'use strict';

    angular.module('common',
        [
            'data-service',
            'perfil.data-service',
            'modulo.data-service',
            'usuario.data-service',
            'login.data-service',

            'interceptor-provider.service',
            'toastr.service',
            'autenticacao.service',
            'usuario.service'
        ]);


})();
