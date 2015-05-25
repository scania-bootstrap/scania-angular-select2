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
                if ($attr.language) {
                    var domElem = '<script src="/bower_components/select2/select2_locale_' + $attr.language + '.js" async defer></script>';
                    $(element).append($compile(domElem)($scope));
                }
                var options = _.pick($(element).data(), function (value, key) {
                    return !startsWith(key, '$');
                });
                options.formatSelection = $scope.templateSelection || $.fn.select2.defaults.formatSelection;
                options.formatResult = $scope.templateResult || $.fn.select2.defaults.formatResult;

                if ($attr.multiple) {
                    var multiselect = $('select.sc-multiselect[id="' + $attr.id + '"]');
                    multiselect.select2(options);
                    $timeout(function () {
                        var selectedItems = $scope.ngModel;
                        if (selectedItems) {
                            if(selectedItems.then && typeof selectedItems.then === 'function'){
                                selectedItems.then(function (response) {
                                    multiselect.val(_.pluck(response.data, options.value)).trigger('change');
                                });
                            }
                            if(_.isArray(selectedItems)){
                                multiselect.val(_.pluck(selectedItems, options.value)).trigger('change');
                            }

                        }
                    });
                    options.placeholderOption = '';
                } else {
                    var select = $('select.sc-select[id="' + $attr.id + '"]');
                    select.select2(options);
                    $timeout(function () {
                        var selectedItem = $scope.ngModel;
                        if (selectedItem) {
                            if(selectedItem.then && typeof selectedItem.then === 'function'){
                                selectedItem.then(function (response) {
                                    select.val(response.data[options.value]).trigger('change');
                                });
                            }
                            if(_.isObject(selectedItem)){
                                select.val(selectedItem[options.value]).trigger('change');
                            }
                        }
                    });
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
