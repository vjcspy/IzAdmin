/**
 * Created by vjcspy on 3/18/16.
 */
app.controller('FacebookControlCtrl', ['$scope', 'uiGridConstants', 'urlManagement', '$http', 'toastr', 'cfpLoadingBar', '$timeout', '$interval', 'facebookAuth', 'izFacebookApi',
    function ($scope, uiGridConstants, urlManagement, $http, toastr, cfpLoadingBar, $timeout, $interval, facebookAuth, izFacebookApi) {
        /*Init data*/
        $scope.facebook = {
            config: {
                checkingLoggedFacebook: true,
                notAuthorized: false
            },
            data: {
                name: '',
                link: '',
                message: ''
            }
        };

        /*Check login*/
        facebookAuth.checkLoggedFacebook()
            .then(function (response) {
                $timeout(function () {
                    if (!response.data.hasOwnProperty('status'))
                        return toastr.error('Some thing went wrong!');
                    $scope.facebook.config.checkingLoggedFacebook = false;
                    if (response.data.status == 'not_authorized') {
                        return $scope.facebook.config.notAuthorized = true;
                    } else if (response.data.status == 'connected') {
                        $scope.facebook.data.name = response.data.user.name;
                        return $scope.facebook.config.notAuthorized = false;
                    }
                }, 1500);

            }, function (reject) {
                toastr.error(reject.data.mess);
            });

        /*Function*/
        $scope.loginFacebook = function () {
            facebookAuth.login().then(function (response) {
                $scope.facebook.data.name = response.data.user.name;
                $scope.facebook.config.notAuthorized = false;
                toastr.success('Đăng nhập thành công!');
            }, function (reject) {
                toastr.error('Đăng nhập thất bại!');
            });
        }

        $scope.sendPostLink = function () {
            izFacebookApi.postLink($scope.facebook.data.link, $scope.facebook.data.message).then(function (response) {
                if (response.data.hasOwnProperty('posted_id'))
                    return toastr.success('Đăng Post thành công');
            }, function (reject) {
                return toastr.error(reject.data.mess);
            });
        }
    }]);
