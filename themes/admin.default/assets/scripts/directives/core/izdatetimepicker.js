(function (angular) {
    "use strict";
    angular.module('app')
        .directive('izDateTimePicker', ['$q', function ($q) {
            return {
                restrict: "EAC",
                scope: {
                    datePicker: '=',
                    optionPicker: '='
                },
                template: '<input  type="text" ng-model="datePicker" />',
                controller: ['$scope', function ($scope) {

                }],
                link: function (scope, elem, attr) {
                    var _elem = $(elem).find('input:first');
                    _elem
                        .val(scope.datePicker).daterangepicker(scope.optionPicker);

                    /*not auto update*/
                    _elem.on('cancel.daterangepicker', function (ev, picker) {
                        $(this).val('');
                        scope.datePicker = '';
                    }).on('apply.daterangepicker', function (ev, picker) {
                        var date = picker.startDate.format('MM/D/YYYY');
                        $(this).val(date);
                        scope.datePicker = date;
                    });
                }
            };
        }]);
})(angular);