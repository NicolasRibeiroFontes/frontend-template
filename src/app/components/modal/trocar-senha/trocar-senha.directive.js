(function () {
    'use strict';

    angular.module('modal.trocar-senha.directive', [])
        .directive('trocarSenha', trocarSenha);

    trocarSenha.$injector = [ '$rootScope', 'usuarioDataService', 'toastrService', 'loadingService', 'autenticacaoService' ];

    /** @ngInject */
    function trocarSenha( $rootScope, usuarioDataService, toastrService, loadingService, autenticacaoService) {
        return {
            restrict: 'E',
            replace: true,
            scope : {},
            templateUrl: 'app/components/modal/trocar-senha/trocar-senha.template.html',
            link: trocarSenhaDirective
        };

        function trocarSenhaDirective(scope) {


            scope.trocarSenha = _trocarSenha;

            function _trocarSenha() {
                loadingService.show();

                usuarioDataService.trocarSenha(scope.formTrocarSenha)
                    .then(sucesso)
                    .catch(erro);

                function sucesso(result) {

                    loadingService.hide();
                    if(result.tipo === 'S')
                    {
                        angular.element('#modalTrocarSenha').modal('hide');
                        toastrService.sucesso('Alteração de Senha', result.mensagemInfo);
                        scope.formTrocarSenha = null;
                        autenticacaoService.logout();

                        $rootScope.stateName !== 'app.login' ?
                            $state.go('app.login') : angular.noop();
                    }
                    else
                        toastrService.atencao('Alteração de Senha', result.mensagemInfo);
                }

                function erro(error) {

                    loadingService.hide();
                    toastrService.atencao("", error.data.message !== undefined ? error.data.message : "Erro de acesso." + " <br/> Entrar em contato com o Administrador do Sistema");
                }
            }


        }
    }
})();
