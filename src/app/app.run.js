(function () {
    'use strict';

    angular.module('run-config', [])
        .run(routeManager);

    routeManager.$injector = ['$state', '$log', '$rootScope', 'localStorageService', 'loadingService', 'toastrService', 'autenticacaoService', 'moduloDataService', 'usuarioService']

    /** @ngInject */
    function routeManager($state, $log, $rootScope, localStorageService, loadingService, toastrService, autenticacaoService, moduloDataService, usuarioService) {

        var changeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

            loadingService.show();

            var continuarNavegacao = function (autorizacao, parametros) {
                if (autorizacao.permissao) {
                    $state.go(toState.name, parametros);
                } else {

                    toastrService.atencao("", autorizacao.mensagem, "center");
                    toState.name === 'app.login' ? autenticacaoService.logout() : angular.noop();
                }
            };

            if (toState.name === 'app.login') {
                $rootScope.continuarRota = false;
                return;
            }

            if (!$rootScope.continuarRota) {

                event.preventDefault();

                if (toState.name === 'app') {
                    $state.go(!localStorageService.get('authData') ? 'app.login' : 'app.home', toParams);
                } else {

                    if (!$rootScope.modulos) {

                        //Obtem os módulos de acesso ao sistema de acordo com o perfil do usuário logado
                        var sucesso = function (result) {

                            $rootScope.modulos = result;

                        };

                        var erro = function (result) {

                        };

                        moduloDataService.obterModuloPorPerfil()
                            .then(sucesso)
                            .catch(erro);

                    }

                    var sucessoPermissao = function (result) {

                        $rootScope.continuarRota = true;

                        if (result.tokenExpirado) {

                            autenticacaoService.logout();
                            localStorageService.set("rotaDefinida", toState.name);
                            toState.name = "app.login";
                            toastrService.atencao("", result.mensagem, "center");
                            continuarNavegacao(result, angular.copy(toParams));
                        }

                        if (result.permissao && !result.permiteAnonimo && (!$rootScope.dadosUsuario || $rootScope.dadosUsuario === undefined)) {
                            $rootScope.continuarRota = false;
                            usuarioService.obterDadosUsuario(continuarNavegacao, result, angular.copy(toParams));
                        }
                        else
                            continuarNavegacao(result, angular.copy(toParams));
                    };

                    var erroPermissao = function(){
                        autenticacaoService.logout();
                            localStorageService.set("rotaDefinida", toState.name);
                            toState.name = "app.login";
                            toastrService.atencao("", result.mensagem, "center");
                            continuarNavegacao(result, angular.copy(toParams));
                    } 

                    moduloDataService.checarPermissao({ state: toState.name }).then(sucessoPermissao, erroPermissao);
                }
            }
            else
                $rootScope.continuarRota = false;
        });

        var changeSuccess = $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

            angular.element('[data-toggle="tooltip"]').tooltip();
            angular.element('[data-toggle="tab"]').tab();
            
            loadingService.hide();
            $rootScope.stateName = toState.name;
        });

        var changeChangeError = $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

            loadingService.hide();
        });

    }

})();
