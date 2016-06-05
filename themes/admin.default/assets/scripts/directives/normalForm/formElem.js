/**
 * Created by vjcspy on 2/15/16.
 */
(function () {
    var app = angular.module('normalForm', []);
    app.directive('normalElem', function () {
        return {
            restrict: 'E',
            scope: {
                elemId: '@',
                elemEditable: '@',
                elemTitle: '@',
                elemModel: '=',
                elemValidate: '@',
                elemType: '@',
                elemPlaceholder: '@',
                elemOptionData: '=',
                formData: '='
            },
            controller: function ($scope) {
                //console.log($scope.elemModel);
                //console.log($scope.elemType);

                //TODO: listener for upload Image success
                $scope.uploadImageSuccess = function ($file, $message, $flow) {
                    var dataFromSv = JSON.parse($message);
                    //console.log(dataFromSv.files.file.name);
                    $scope.elemModel[$scope.elemId] = dataFromSv.files.file.name;
                };

                //TODO: listener for upload Image added
                $scope.uploadImageAdded = function ($file, $event, $flow) {
                    $scope.elemModel[$scope.elemId] = $file.name;
                };
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
            templateUrl: './scripts/directives/normalForm/html/formElem.html'
        };
    });
})(angular);
