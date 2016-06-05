/**
 * Created by vjcspy on 3/19/16.
 */
(function (angular) {
    angular.module('iz-facebook-api', []).service('izFacebookApi', ['$http', 'urlManagement', function ($http, urlManagement) {
        "use strict";
        var _self = this;

        this.postLink = function (link, message) {
            return $http.post(urlManagement.getUrl('facebook-api') + '/post-link', {
                link: link,
                message: message
            });
        };

    }]);
})(angular);