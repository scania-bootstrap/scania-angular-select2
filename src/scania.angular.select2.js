/**
 * scania-angular-select2
 * https://github.com/scania-bootstrap/scania-angular-select2
 * License: MIT
 *
 * @ngdoc directive
 * @name scSelect2
 * @module scania.angular.select2
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

                var selectorName = $attr.multiple ? 'multiselect' : 'select';
                var select = $('select.sc-' + selectorName + '[id="' + $attr.id + '"]');

                $timeout(function () {
                    select.select2(options);

                    if (!$scope.ngModel) return;

                    //True for both single and multiselect
                    if ($scope.ngModel.then && typeof $scope.ngModel.then === 'function') {
                        $scope.ngModel.then(function (response) {
                            //Multi select can have 1 or several default selected options,use each to initialize the select
                            //Single select has 1 default selected option, no iteration is needed to initialize the select
                            var selectedItems = $attr.multiple ? response.data : new Array(response.data);
                            populatePreselectedOptions(select, selectedItems);
                        });
                    }
                    else {
                        if (!_.isArray($scope.ngModel) && !_.isObject($scope.ngModel)) throw "" + $scope.ngModel + " in " + $attr.id + " is not an object nor an array. Select2 must bind to an object or an array.";
                        var selectedItems = _.isArray($scope.ngModel) ? $scope.ngModel : new Array($scope.ngModel);
                        populatePreselectedOptions(select, selectedItems);
                    }

                });

                options.placeholderOption = $attr.multiple ? '' : 'first';

                function populatePreselectedOptions(scSelect, selectedItems) {
                    var selectedOptions = [];
                    _.each(selectedItems, function (selectedItem) {
                        var selectedId = selectedItem[options.value];
                        var selectedOption = _.find(scSelect[0], function (option) {
                            return selectedId == option.value;
                        });
                        selectedOptions.push({id: selectedId, text: selectedOption.label});
                    });
                    if (selectedItems.length == 1) selectedOptions = selectedOptions.pop();
                    scSelect.select2('data', selectedOptions);
                }
            }
        };

        function startsWith(str, target) {
            return str.indexOf(target) === 0;
        }
    }


    /**
     * @ngdoc module
     * @name scania.angular.select2
     *
     * @description AngularJS directive for Select2
     */
    angular.module('scania.angular.select2', []).directive('scSelect2', scSelect2);
})();
