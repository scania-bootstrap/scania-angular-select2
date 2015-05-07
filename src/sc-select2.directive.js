/**
 * scania-angular-select2
 * https://github.com/scania-bootstrap/scania-angular-select2
 * License: MIT
 *
 * @ngdoc directive
 * @name scSelect2
 * @module scania.directives
 *
 * @description AngularJS directive for Select2
 */
(function () {
    'use strict';
    function scSelect2($compile) {
        return {
            restrict: 'A',
            link: function ($scope, element, $attr) {
                var domElem = '<script src="/bower_components/select2/select2_locale_' + $attr.language + '.js" async defer></script>';
                $(element).append($compile(domElem)($scope));

                var options = _.pick($(element).data(), function (value, key) {
                    return !startsWith(key, '$');
                });
                if ($attr.multiple) {
                    $('select.sc-multiselect[id="' + $attr.id + '"]').select2(options);
                    options.placeholderOption = '';
                } else {
                    $('select.sc-select[id="' + $attr.id + '"]').select2(options);
                    options.placeholderOption = 'first';
                }
            }
        };

        function startsWith(str, target) {
            return str.indexOf(target) === 0;
        }
    }

    /**
     * @ngdoc module
     * @name scania.directives
     *
     * @description AngularJS directive for Select2
     */
    angular.module('scania.directives', []).directive('scSelect2', scSelect2);
})();
