/**
 * Created by vjcspy on 3/10/16.
 */
angular.module('adminshop.currency', []).factory('currencyData', ['$http', 'urlManagement', function ($http, urlManagement) {
    var currencyData = null;

    var promise = function (q) {
        $http.get(urlManagement.getUrlByKey('restful_admin_shop_currency')).then(function (data) {
            currencyData = data.data;
            return q.resolve();
        });
    };

    var normal = $http.get(urlManagement.getUrlByKey('restful_admin_shop_currency')).then(function (data) {
        currencyData = data.data;
    });

    return {
        defer: promise,
        notDefer: normal,
        currency_use: function () {
            return currencyData.currency_use;
        },
        currency_symbol: function () {
            return currencyData.currencies;
        }
    };
}]);
