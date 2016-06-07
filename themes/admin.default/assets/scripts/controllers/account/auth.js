/**
 * Created by vjcspy on 2/28/16.
 */
app.controller('accountAuth', ['$scope', 'IzSentinel', '$http', 'toastr', '$state',
    function ($scope, IzSentinel, $http, toastr, $state) {
        if ($state.is('access.lockme')) {
            if (!$scope.user.email) {
                $state.go('access.signin');
            }
            IzSentinel.logout();
        }
        $scope.signUp = function () {
            var data = {
                credentials: {
                    'last_name': $scope.user.name,
                    'email': $scope.user.email,
                    'password': $scope.user.password
                }
            };
            IzSentinel.register(data.credentials).then(function () {
                $state.go('app.dashboard');
            });
        };
        $scope.login = function () {
            var data = {
                credentials: {
                    'last_name': $scope.user.name,
                    'email': $scope.user.email,
                    'password': $scope.user.password
                }
            };
            IzSentinel.login(data.credentials).then(function () {
                $state.go('app.dashboard');
            }, function () {
                toastr.error('Please check user/password!')
            });
        }
    }]);
