(function () {
    angular.module('izNavTree', [''])
        .directive('izConfigElem', function () {
            return {
                restrict: 'E',
                scope: {
                    configSaveUrl: '@',
                    configData: '=',
                    currentBranchData: '=',
                    parentBranchLabel: '='
                },
                controller: ['$scope', '$timeout', 'toastr', 'cfpLoadingBar', 'urlManagement', '$http', function ($scope, $timeout, toastr, cfpLoadingBar, urlManagement, $http) {
                    $scope.config = {
                        syncTaskSaving: false
                    };
                    $scope.saveConfig = function () {
                        toastr.info('', 'Saving...', {closeButton: true});
                        $scope.config.syncTaskSaving = true;
                        cfpLoadingBar.start();
                        return $timeout(function () {
                            cfpLoadingBar.complete();
                            $scope.config.syncTaskSaving = false;
                            $http.patch(urlManagement.getUrlByKey('restful_config') + '/1', $scope.configData, []).then(function (data) {
                                return toastr.success('', data.statusText, {closeButton: true});
                            }, function (data) {
                                return toastr.error('Error', 'Can\'n save!', {closeButton: true});
                            });

                        }, 100);
                    }
                }],
                link: function (scope, elem, attrs) {
                    scope.$watch(attrs.currentBranchData, function (value) {
                        //check xem co phai dang o thang cha khong
                        if (!!value && value.hasOwnProperty('children') && Object.keys(value.children).length === 0) {
                            scope.elemData = {
                                groupName: value['label'],
                                childData: value['data'],
                                show: true
                            };
                            //$('#elemConfig').addClass('animated bounceIn');
                        } else {
                            scope.elemData = {show: false}
                        }
                    });
                },
                templateUrl: './scripts/directives/system/html/configElement.html'
            };
        });
})();


