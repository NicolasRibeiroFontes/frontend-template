(function () {
    'use strict';

    angular.module('modal.esqueceu-senha.directive', [])
        .directive('esqueceuSenha', esqueceuSenha);

    esqueceuSenha.$injector = [ 'usuarioDataService', 'toastrService', 'loadingService'];

    /** @ngInject */
    function esqueceuSenha(usuarioDataService, toastrService, loadingService) {
        return {
            restrict: 'E',
            replace: true,
            scope : {},
            templateUrl: 'app/components/modal/esqueceu-senha/esqueceu-senha.template.html',
            link: esqueceuSenhaDirective
        };

        function esqueceuSenhaDirective(scope) {


            scope.recuperarSenha = _recuperarSenha;

            function _recuperarSenha() {
                loadingService.show();

                usuarioDataService.recuperarSenha(scope.esqueceSenha)
                    .then(sucesso)
                    .catch(erro);

                function sucesso(result) {

                    if (result) {
                        loadingService.hide();

                        angular.element('#modalEsqueceuSenha').modal('hide');
                        scope.esqueceSenha = null;
                        toastrService.sucesso("", "Sua nova senha foi enviada ao seu email.");
                    }
                    else
                        toastrService.atencao("", "Não foi possível recuperar sua senha. <br/> Entrar em contato com o Administrador do Sistema");
                }

                function erro(error) {

                    loadingService.hide();
                    toastrService.atencao("", error.data.message !== undefined ? error.data.message : "Erro de acesso." + " <br/> Entrar em contato com o Administrador do Sistema");

                }
            }


        }
    }
})();
