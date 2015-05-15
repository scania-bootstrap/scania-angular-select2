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
    function scSelect2($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                templateSelection: '=',
                templateResult: '='
            },
            link: function ($scope, element, $attr) {
                if($attr.language){
                    var domElem = '<script src="/bower_components/select2/select2_locale_' + $attr.language + '.js" async defer></script>';
                    $(element).append($compile(domElem)($scope));
                }
                var options = _.pick($(element).data(), function (value, key) {
                    return !startsWith(key, '$');
                });
                options.formatSelection = $scope.templateSelection || $.fn.select2.defaults.formatSelection;
                options.formatResult = $scope.templateResult || $.fn.select2.defaults.formatResult;

                if ($attr.multiple) {
                    var multiselect =  $('select.sc-multiselect[id="' + $attr.id + '"]');
                    multiselect.select2(options);
                    if($scope.ngModel) {
                        $timeout(function(){
                            multiselect.val(_.pluck($scope.ngModel,  options.value)).trigger('change');
                        });
                    }
                    options.placeholderOption = '';
                } else {
                    var select =  $('select.sc-select[id="' + $attr.id + '"]');
                    select.select2(options);
                    if($scope.ngModel) {
                        $timeout(function(){
                            select.val($scope.ngModel[options.value]).trigger('change');
                        });
                    }
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
