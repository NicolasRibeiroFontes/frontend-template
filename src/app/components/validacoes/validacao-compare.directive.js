(function () {
    'use strict';

    angular.module('validacao-compare.directive', [])
        .directive('validacaoCompare', validacaoCompare);

    /** @ngInject */
    function validacaoCompare( ) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: validacaoCompareDirective
        };

        function validacaoCompareDirective(scope, elem, attrs, ngModel) {

            if (!ngModel) return; // do nothing if no ng-model

            // watch own value and re-validate on change
            scope.$watch(attrs.ngModel, function() {
                valida();
            });

            // observe the other value and re-validate on change
            attrs.$observe('validacaoCompare', function(val) {
                valida();
            });

            var valida = function() {
                // values
                var val1 = ngModel.$viewValue;
                var val2 = attrs.validacaoCompare;

                // set validity
                ngModel.$setValidity('validacaoCompare', val1 === val2);
            };
        }
    }
})();
