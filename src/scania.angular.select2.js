/**
 * scania-angular-select2
 * https://github.com/scania-bootstrap/scania-angular-select2
 * License: MIT
 *
 * @description AngularJS directive for Select2
 */
(function () {
    'use strict';
    /**
     * @ngdoc module
     * @name scania.angular.select2
     *
     * @description
     * Scania select2 directive module
     */
    angular.module('scania.angular.select2', []);

    /**
     * @ngdoc directive
     * @name scSingleSelect
     * @module scania.angular.select2
     *
     * @description AngularJS directive for single select
     * @param $compile
     * @param $timeout
     * @returns {{restrict: string, scope: {ngModel: string, templateSelection: Function, templateResult: Function, matcher: Function, createSearchChoice: Function}, link: Function}}
     */
    angular.module('scania.angular.select2').directive('scSingleSelect', ['$compile', '$timeout', scSingleSelect]);
    /**
     * @ngdoc directive
     * @name scMultiSelect
     * @module scania.angular.select2
     *
     * @description AngularJS directive for multi select
     * @param $compile
     * @param $timeout
     * @returns {{restrict: string, scope: {ngModel: string, templateSelection: Function, templateResult: Function, matcher: Function, createSearchChoice: Function}, link: Function}}
     */
    angular.module('scania.angular.select2').directive('scMultiSelect', ['$compile', '$timeout', scMultiSelect]);
    /**
     * @ngdoc directive
     * @name scInputSelect
     * @module scania.angular.select2
     *
     * @description AngularJS directive for input select tokenizer
     * @param $compile
     * @param $timeout
     * @returns {{restrict: string, scope: {ngModel: string, templateSelection: Function, templateResult: Function, matcher: Function, createSearchChoice: Function, tokenSeparators: Function}, link: Function}}
     */
    angular.module('scania.angular.select2').directive('scInputSelect', ['$compile', '$timeout', scInputSelect]);

    /**
     * @ngdoc method
     * @name scania.angular.select2#init
     * @methodOf scania.angular.select2
     *
     * @description
     * Initialize a select component
     *
     */
    function init($scope, element, $attr, $compile) {
        if ($attr.language) {
            var domElem = '<script src="/bower_components/select2/select2_locale_' + $attr.language + '.js" async defer></script>';
            $(element).append($compile(domElem)($scope));
        }
        var options = _.pick($(element).data(), function (value, key) {
                return !startsWith(key, '$');
            }),
            minimumResultsForSearch = 10,
            defaultWidth = '100%',
            events = 'input keyup';

        options.formatSelection = $scope.templateSelection || $.fn.select2.defaults.formatSelection;
        options.formatResult = $scope.templateResult || $.fn.select2.defaults.formatResult;
        options.matcher = $scope.matcher || $.fn.select2.defaults.matcher;
        options.minimumResultsForSearch = (options.minimumResultsForSearch > 10) ? options.minimumResultsForSearch : minimumResultsForSearch;
        if ($(element).innerWidth() < 49 || !_.includes($(element).attr('style'), 'width')) {
            $(element).attr('style', 'width: ' + defaultWidth);
        }

        $('.select2-input').bind(events, function (event) {
            var minimumInputLength = (options.minimumInputLength) ? options.minimumInputLength : 3;
            if (event.currentTarget.value.length >= minimumInputLength) {
                $scope.$emit('select.search-input', event.currentTarget.value);
            }
        });
        return options;
    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#updateSelectedItemsOnDisplay
     * @methodOf scania.angular.select2
     *
     * @description
     * Updates selected items
     *
     */
    function updateSelectedItemsOnDisplay($scope, select, options, inputOptionsLabelProperty, input) {
        if (!$scope.ngModel) {
            select.select2("val", "");
            return;
        }

        //True for both single and multiselect
        if ($scope.ngModel.then && typeof $scope.ngModel.then === 'function') {
            $scope.ngModel.then(function (response) {
                //Multi select can have 1 or several default selected options,use each to initialize the select
                //Single select has 1 default selected option, no iteration is needed to initialize the select
                var selectedItems = $attr.multiple ? response.data : new Array(response.data);
                if (input) {
                    populatePreselectedInputOptions(select, selectedItems, options.id, inputOptionsLabelProperty);
                } else {
                    populatePreselectedOptions(select, selectedItems, options.value);
                }
            });
        }
        else {
            if (!_.isArray($scope.ngModel) && !_.isObject($scope.ngModel)) return;
            var selectedItems = _.isArray($scope.ngModel) ? $scope.ngModel : new Array($scope.ngModel);
            if (input) {
                populatePreselectedInputOptions(select, selectedItems, options.id, inputOptionsLabelProperty);
            } else {
                populatePreselectedOptions(select, selectedItems, options.value);
            }
        }
    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#populatePreselectedOptions
     * @methodOf scania.angular.select2
     *
     * @description
     * Prepopulate the select component
     *
     */
    function populatePreselectedOptions(scSelect, selectedItems, key) {
        //throw "Data-value for " + scSelect[0].id +" must have the same value as its track by.";
        var selectedOptions = [];
        _.each(selectedItems, function (selectedItem) {
            var selectedId = selectedItem[key];
            var selectedOption = _.find(scSelect[0], function (option) {
                return selectedId == option.value;
            });
            if (!selectedOption) {
                console.error("Data-value for " + scSelect[0] + " must have the same value as its track by.");
                return;
            }
            selectedOptions.push({id: selectedId, text: selectedOption.label});

        });
        if (selectedItems.length == 1) selectedOptions = selectedOptions.pop();
        scSelect.select2('data', selectedOptions);
    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#populatePreselectedInputOptions
     * @methodOf scania.angular.select2
     *
     * @description
     * Prepopulate the input component
     *
     */
    function populatePreselectedInputOptions(scSelect, selectedItems, key, inputOptionsLabelProperty) {
        var selectedOptions = [];
        _.each(selectedItems, function (selectedItem) {
            var option = {};
            option[key] = selectedItem[key];
            option[inputOptionsLabelProperty] = selectedItem[inputOptionsLabelProperty];
            selectedOptions.push(option);
        });
        if (selectedItems.length == 1) selectedOptions = selectedOptions.pop();
        scSelect.select2('data', selectedOptions);
    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#createSelect
     * @methodOf scania.angular.select2
     *
     * @description
     * Creates the select component
     *
     */
    function createSelect($scope, element, $attr, $compile, $timeout) {
        var options = init($scope, element, $attr, $compile),
            select = {},
            scSelect;

        $timeout(function () {
            select = $('select[id="' + $attr.id + '"]');
            scSelect = select.select2(options);

            updateSelectedItemsOnDisplay($scope, select, options);
            $scope.watchFunction = _.isArray($scope.ngModel) ? $scope.$watchCollection : $scope.$watch;
            $scope.watchFunction('ngModel', function () {
                updateSelectedItemsOnDisplay($scope, select, options);
            });
            registerEvents($scope, scSelect, options);
            if(angular.isDefined($(select)[0])) {
               $($(select)[0].previousSibling).find('div.select2-search').prepend('<i class="scania-icon-search sm"></i>');
           }           
        });

    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#registerEvents
     * @methodOf scania.angular.select2
     *
     * @description
     * Register select2 events
     *
     */
    function registerEvents($scope, scSelect, options) {

        scSelect.on('select2-closing', function(event) {
            if(angular.isDefined(options.preventClose)) {
                event.preventDefault();
            }
            $scope.$emit('select.closing', event);
        });
        scSelect.on('select2-close', function(event) {
            $scope.$emit('select.close', event);
        });
        scSelect.on('select2-opening', function(event) {
            if(angular.isDefined(options.preventOpen)) {
                event.preventDefault();
            }
            $scope.$emit('select.opening', event);
        });
        scSelect.on('select2-open', function(event) {
            $scope.$emit('select.open', event);
        });
        scSelect.on('select2-selecting', function(event) {
            if(angular.isDefined(options.preventSelect)) {
                event.preventDefault();
            }
            $scope.$emit('select.selecting', event);
        });
        scSelect.on('select2-selected', function(event) {
            $scope.$emit('select.selected', event);
        });
        scSelect.on('select2-unselecting', function(event) {
            if(angular.isDefined(options.preventUnselect)) {
                event.preventDefault();
            }
            $scope.$emit('select.unselecting', event);
        });
        scSelect.on('select2-unselect', function(event) {
            $scope.$emit('select.unselect', event);
        });
        scSelect.on('select2-clearing', function(event) {
            $scope.$emit('select.clearing', event);
        });
        scSelect.on('select2-removing', function(event) {
            $scope.$emit('select.removing', event);
        });
        scSelect.on('select2-focus select2-blur', function(event) {
            $scope.$emit('select.focus', event);
        });
        scSelect.on('change', function(event) {
            $scope.$emit('select.change', event);
        });
    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#startsWith
     * @methodOf scania.angular.select2
     *
     * @description
     * Check the leading character in a string agains a predicate
     *
     */
    function startsWith(str, target) {
        return str.indexOf(target) === 0;
    }

    /**
     * @ngdoc method
     * @name scania.angular.select2#scSingleSelect
     * @module scania.angular.select2
     *
     * @description AngularJS directive for single select
     * @param $compile
     * @param $timeout
     * @returns {{restrict: string, scope: {ngModel: string, templateSelection: Function, templateResult: Function, matcher: Function, createSearchChoice: Function}, link: Function}}
     */
    function scSingleSelect($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                templateSelection: '=',
                templateResult: '=',
                matcher: '=',
                createSearchChoice: '='
            },
            link: function ($scope, element, $attr) {
                createSelect($scope, element, $attr, $compile, $timeout);
            }
        };

    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#scMultiSelect
     * @module scania.angular.select2
     *
     * @description AngularJS directive for multi select
     * @param $compile
     * @param $timeout
     * @returns {{restrict: string, scope: {ngModel: string, templateSelection: Function, templateResult: Function, matcher: Function, createSearchChoice: Function}, link: Function}}
     */
    function scMultiSelect($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                templateSelection: '=',
                templateResult: '=',
                matcher: '=',
                createSearchChoice: '='
            },
            link: function ($scope, element, $attr) {
                createSelect($scope, element, $attr, $compile, $timeout);
            }
        };
    }
    /**
     * @ngdoc method
     * @name scania.angular.select2#scInputSelect
     * @module scania.angular.select2
     *
     * @description AngularJS directive for input select
     * @param $compile
     * @param $timeout
     * @returns {{restrict: string, scope: {ngModel: string, templateSelection: Function, templateResult: Function, matcher: Function, createSearchChoice: Function, tokenSeparators: Function}, link: Function}}
     */
    function scInputSelect($compile, $timeout) {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                templateSelection: '=',
                templateResult: '=',
                matcher: '=',
                createSearchChoice: '=',
                tokenSeparators: '='
            },
            link: function ($scope, element, $attr) {
                var options = init($scope, element, $attr, $compile),
                    select = {},
                    tokenSeparators = [",", " "],
                    inputOptionsLabelProperty = '';

                $timeout(function () {

                    options.data = {results: JSON.parse($attr.data), text: $attr.label};
                    options.createSearchChoice = $scope.createSearchChoice;
                    options.tokenSeparators = $scope.tokenSeparators || tokenSeparators;
                    options.id = $attr.itemId;
                    inputOptionsLabelProperty = options.label;

                    select = $('input[id="' + $attr.id + '"]');
                    select.select2(options);
                    
                    if(angular.isDefined($(select)[0])) {
                        $($(select)[0].previousSibling).find('div.select2-search').prepend('<i class="scania-icon-search sm"></i>');
                    }

                    updateSelectedItemsOnDisplay($scope, select, options, inputOptionsLabelProperty, 'input');
                    $scope.$watch('ngModel', function () {
                        updateSelectedItemsOnDisplay($scope, select, options, inputOptionsLabelProperty, 'input');
                    });
                });
            }
        };
    }

})();
