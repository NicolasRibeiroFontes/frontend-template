(function () {
    'use strict';

    angular.module('input-data.directive', []).directive('inputData', inputData);

    /** @ngInject */
    function inputData() {

        return {
            restrict: 'E',
            replace: true,
            scope: {
                rangeMin: '=',
                rangeMax: '=',
                modeloInicio: '=',
                modeloFim: '=',
                modelo: '=',
                range: '=',
                exibirIcone: '=',
                saidaString: '='
            },
            controllerAs: 'controller',
            templateUrl: 'app/components/input-data/input-data.tpl.html',
            link: function (scope, element, attrs) {

                scope.eRange = eRange;
                scope.eExibirIcone = eExibirIcone;
                scope.alterarData = alterarData;
                scope.obterRangeMin = obterRangeMin;
                scope.obterRangeMax = obterRangeMax;
                scope.obterDataFormatada = obterDataFormatada;

                var _range_inicio = 1;
                var _range_fim = 2;

                iniciar();

                function eRange() {
                    return scope.range;
                }

                function eExibirIcone() {
                    return angular.isUndefined(scope.exibirIcone) ? true : scope.exibirIcone;
                }

                function eSaidaString() {
                    return scope.saidaString;
                }

                function obterSaida(data) {
                    if (eSaidaString()) {
                        return data.toLocaleDateString();
                    } else {
                        return new Date(data);
                    }
                }

                function obterDataFormatada(data) {
                    if (!data) {
                        return '';
                    } else {
                        return new moment(data).format('YYYY-MM-DD');
                    }
                }

                function obterRangeMin() {
                    return obterDataFormatada(scope.rangeMin);
                }

                function obterRangeMax() {
                    return obterDataFormatada(scope.rangeMax);
                }

                function alterarData(data, range) {
                    if (range && range == _range_fim) {
                        scope.modeloFim = data ? obterSaida(data) : null;
                    }
                    else {
                        scope.modeloInicio = data ? obterSaida(data) : null;
                    }
                }

                function iniciar() {
                    var _dataInicio = null;
                    var _dataFim = null;
                    if (eRange()) {
                        _dataInicio = scope.rangeMin ? scope.rangeMin : moment().subtract(1, 'week').toDate();
                        _dataFim = scope.rangeMax ? scope.rangeMax : moment().add(1, 'week').toDate();
                    }
                    else {
                        _dataInicio = scope.rangeMin ? scope.rangeMin : moment().toDate();
                        _dataFim = scope.rangeMax ? scope.rangeMax : moment().toDate();
                    }
                    scope.html5DataInicio = _dataInicio;
                    scope.html5DataFim = _dataFim;
                    alterarData(_dataInicio, _range_inicio);
                    alterarData(_dataFim, _range_fim);
                }

            }
        }

    }


})
();

