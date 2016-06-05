/**
 * Created by vjcspy on 2/2/16.
 */
(function () {
    angular.module('izFormValidateElem', [''])
        .directive('izFormValidateElement', ['lodash', function (_) {
            return {
                restrict: 'E',
                scope: {
                    elemModel: '=',
                    elemValidate: '@',
                    elemType: '@',
                    elemPlaceholder: '@',
                    elemOptionData: '=',
                    elemKey: '=',
                    elemParentbranch: '='
                },
                controller: function ($scope) {
                    console.log($scope.elemModel);
                },
                compile: function compile(elem, attrs) {
                    var validation = attrs.elemValidate;
                    var currentElem = $(elem);

                    // add validation to element
                    $.each(_.split(validation, ' '), function (k, validate) {
                        if (validate.indexOf("=") !== -1) {
                            var _valid = _.split(validate, '=');
                            currentElem.children(".form-control").attr(_valid[0], _.replace(_valid[1], '"', ''));
                        } else {
                            currentElem.children(".form-control").attr(validate, '');
                        }
                    })
                },
                templateUrl: './scripts/directives/form/html/formElemnt.html'
            };
        }]);

})(angular);
