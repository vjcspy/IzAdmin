/**
 * Created by vjcspy on 3/18/16.
 */
angular.module('izFacebook', []).service('facebookAuth', ['$http', '$q', 'urlManagement', function ($http, $q, urlManagement) {
    var _self = this;
    this.checkStatus = function () {
        var deferred = $q.defer();
        FB.getLoginStatus(function (response) {
            if (!response || response.error) {
                deferred.reject('Error occured');
            } else {
                deferred.resolve(response);
            }
        });
        return deferred.promise;
    };

    /*
     *  Kiểm tra token của người dùng hiện tại
     */
    this.checkLoggedFacebook = function () {
        return $http.get(urlManagement.getUrl('facebook') + '/check-token');
    };

    /*
     * Login và extend token
     */
    this.login = function () {
        var deferred = $q.defer();
        FB.login(function (response) {
            if (response.status === 'connected') {
                // Logged into your app and Facebook.
                $http.post(urlManagement.getUrl('facebook') + '/extend-token').then(function (response) {
                    return deferred.resolve(response);
                });
            } else if (response.status === 'not_authorized') {
                return deferred.reject('not_authorized');
            } else {
                return deferred.reject('un_know');
            }
        }, {scope: 'public_profile,email,user_posts,publish_actions,read_page_mailboxes,manage_pages,publish_pages'});
        return deferred.promise;
    }

}]);
