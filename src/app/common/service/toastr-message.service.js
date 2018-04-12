(function () {
    'use strict';

    angular.module('toastr.service', [])
        .service('toastrService', toastrService);

    toastrService.$injector = [];

    /** @ngInject */
    function toastrService() {

        var _toastrService = {};

        _toastrService.sucesso = _sucesso;
        _toastrService.erro = _erro;
        _toastrService.atencao = _atencao;
        _toastrService.confirmacao = _confirmacao;

        return _toastrService;

        function _sucesso(titulo, mensagem, posicao) {

            configuracao(posicao);
            toastr.success(mensagem, titulo);
        }

        function _erro(titulo, mensagem, posicao) {

            configuracao(posicao);
            toastr.error(mensagem, titulo);
        }

        function _atencao(titulo, mensagem, posicao) {

            configuracao(posicao);
            toastr.warning(mensagem, titulo);
        }

        function _confirmacao(titulo, mensagem, posicao, callback, textoConfirma, textoCancela) {

            configuracao(posicao, true, callback);

            textoCancela = textoCancela ||"Cancelar";
            textoConfirma = textoConfirma || 'Confirmar';

            var mensagem = mensagem +
                '<br /><br />' +
                '<a class="btn btn-success" onclick="toastr.options.response = true;">' +
                    textoConfirma +
                '</a>' +
                '<a class="btn btn-warning" style="margin-right:10px;" onclick="toastr.options.response = false;">' +
                        textoCancela +
                '</a>';

            toastr.info(mensagem , titulo);
        }

        function configuracao(posicao, existeCallback ,callback) {

            toastr.options = {
                closeButton: false,
                debug: false,
                newestOnTop: false,
                progressBar: false,
                positionClass: posicao === 'center' ? 'toast-top-center' : 'toast-top-right',
                preventDuplicates: true,
                onclick: null,
                showDuration: '300',
                hideDuration: '1000',
                timeOut: '5000',
                extendedTimeOut: '2000',
                showEasing: 'swing',
                hideEasing: 'linear',
                showMethod: 'fadeIn',
                hideMethod: 'fadeOut'
            };

            if (existeCallback)
                toastr.options.onHidden = function () {
                    callback(toastr.options.response);
                    toastr.options = {};
                };
        }
    }

})();
