(function () {
    'use strict';

    angular.module('login.controller', [])
        .controller('LoginController', LoginController);

    LoginController.$injector = [ '$state', 'localStorageService', 'toastrService', 'loginDataService' ];

    /** @ngInject */
    function LoginController( $state, localStorageService, toastrService, loginDataService ) {

        var vm = this;
        vm.loading = false;
        vm.autenticar = _autenticar;

        function _autenticar() {

            vm.loading = true;

            loginDataService.autenticar(vm.formLogin)
                .then(sucesso)
                .catch(erro);

            function sucesso(result) {

                if (!result.status)
                    toastrService.erro('Erro', result.mensagem);
                else{
                    localStorage.setItem('nf_usuarioLogado', JSON.stringify(result.objeto));
                    $state.go('app.home');
                }
                vm.loading = false;
            }

            function erro( error ) {

                vm.loading = false;
                toastrService.erro(error.error_description, error.error_uri);

                if (error.error !== undefined && error.error_uri === 'Senha expirada!')
                {
                    angular.element('#modalTrocarSenha').modal('show');
                }

            }
        }
    }
})();
