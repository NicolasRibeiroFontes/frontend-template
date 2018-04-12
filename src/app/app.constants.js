(function () {
    'use strict';

    angular.module('constants-config', [])
        .constant(
            'API', {
                'URL': 'http://localhost:3030/' //dev
                //'URL': 'http://' + window.location.host + '/EscopoFornecedores.WebAPI/api/', //Server
            });

})();

