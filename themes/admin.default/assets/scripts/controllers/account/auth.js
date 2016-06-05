/**
 * Created by vjcspy on 2/28/16.
 */
app.controller('accountAuth', ['$scope', 'urlManagement', '$http', 'toastr', '$state', 'checkLogin', function ($scope, urlManagement, $http, toastr, $state, checkLogin) {
    if (checkLogin.data.hasOwnProperty('length') && checkLogin.data.length != 0) {
        $scope.user.name = checkLogin.data.data.last_name;
        $scope.user.email = checkLogin.data.data.last_name;
    }

    //DO: Check nếu vào locked mà chưa từng login trước đó thì nhảy vào signin để login
    if (!$scope.user.email) {
        if ($state.is("access.lockme")) {
            return $state.go("access.signin");
        }
    }
    if ($state.is('access.signin')) {
        $scope.user.name = '';
        $scope.user.email = '';
        $scope.user.password = '';
    }

    if ($state.is('access.lockme')) {
        $scope.user.password = '';
    }


    $scope.signUp = function () {
        var data = {
            credentials: {
                'last_name': $scope.user.name,
                'email': $scope.user.email,
                'password': $scope.user.password
            }
        };
        $http.post(urlManagement.getUrlByKey('auth_account') + '/sign-up', data, [])
            .then(function (response) {
                if (response.status === 304)
                    toastr.error('Email already existed!', 'Error');
                if (response.status === 201) {
                    toastr.success('Created your account!');
                    return $state.go('app.dashboard');
                }
            }, function (reject) {
                //console.log(reject);
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
        $http.post(urlManagement.getUrlByKey('auth_account') + '/login', data, [])
            .then(function (response) {
                if (response.status === 200) {
                    if (response.data.login == true) {
                        $scope.user.name = response.data.data['last_name'];
                        return $state.go('app.dashboard');
                    }
                    else {
                        toastr.error(response.data.mess, 'Error');
                    }

                }
            }, function (reject) {
                //console.log(reject);
            });
    }
}]);
