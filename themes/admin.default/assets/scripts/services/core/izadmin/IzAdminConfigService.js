/**
 * Created by vjcspy on 06/06/2016.
 */
(function (angular) {
    "use strict";
    angular.module('app')
        .service('IzAdminConfigService', ['$http', function ($http) {
            this.getConfig = function (key, configProviderName) {
                configProviderName = configProviderName || 'global';
                return window.izAdminConfigProvider[configProviderName][key];
            };
        }]);
})(angular);