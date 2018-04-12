(function () {
    'use strict';

    angular.module('login.data-service', [])
        .service('loginDataService', loginDataService);

    loginDataService.$injector = ['$http', 'API', '$q'];

    /** @ngInject */
    function loginDataService($http, API, $q) {

        var _loginFactory = {};

        _loginFactory.autenticar = _autenticar;

        return _loginFactory;

        function _autenticar(model) {
            var deferred = $q.defer();
            $http.post(API.URL + 'usuario/login', model)
                .success(sucesso)
                .error(erro);

            function sucesso(response) {
                deferred.resolve(response);
            }

            function erro(err) {
                deferred.reject(err);
            }

            return deferred.promise;
        }
    }
})();
