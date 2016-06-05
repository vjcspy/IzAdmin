/**
 * Created by vjcspy on 2/2/16.
 */
(function () {
    var urlManagement = angular.module('urlManagement', []);
    urlManagement.service('urlManagement', function () {
        this.url = {
            /*auth account*/
            'auth_account': 'http://' + window.location.hostname + '/izAdmin/sentinel-auth',

            /*dashboard*/
            'dashboard': 'http://' + window.location.hostname + '/adminshop/dashboard',


            /*facebook*/
            'facebook': 'http://' + window.location.hostname + '/facebook',
            'facebook-api': 'http://' + window.location.hostname + '/facebook-api',

            /*Restful*/
            'restful_config': 'http://' + window.location.hostname + '/api/v1/config',
            'restful_systemControl': 'http://' + window.location.hostname + '/api/v1/control',
            'restful_admin_shop_customer': 'http://' + window.location.hostname + '/api/v1/admin_shop/customer',
            'restful_admin_shop_product': 'http://' + window.location.hostname + '/api/v1/admin_shop/product',
            'restful_admin_shop_order': 'http://' + window.location.hostname + '/api/v1/admin_shop/order',
            'restful_admin_shop_orderItem': 'http://' + window.location.hostname + '/api/v1/admin_shop/order-item',
            'restful_admin_shop_currency': 'http://' + window.location.hostname + '/api/v1/admin_shop/currency',

            /*Ajax data table*/
            'table_article': 'http://' + window.location.hostname + '/table/article',
            'table_admin_shop_products': 'http://' + window.location.hostname + '/adminshop_table/products',
            'table_admin_shop_customers': 'http://' + window.location.hostname + '/adminshop_table/customers',
            'table_admin_shop_orders': 'http://' + window.location.hostname + '/adminshop_table/orders'

        };
        this.getUrlByKey = function (key) {
            return this.url[key];
        }.bind(this);
        this.getUrl = function (key) {
            return this.getUrlByKey(key);
        }.bind(this);
        this.setUrlFromServer = function (url) {
            this.url = url;
        }.bind(this);
    })
})(angular);
