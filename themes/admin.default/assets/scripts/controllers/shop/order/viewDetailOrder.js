/**
 * Created by vjcspy on 3/3/16.
 */
app.controller('OrderViewDetailCtrl', ['$scope', '$timeout', 'urlManagement', 'toastr', '$http', 'orderDetail', '$state', 'ngDialog', 'MODULE_CONFIG',
    function ($scope, $timeout, urlManagement, toastr, $http, orderDetail, $state, ngDialog, MODULE_CONFIG) {
        var orderDetailData = orderDetail.data;

        // to call $state in view
        $scope.$state = $state;

        $scope.isUpdateComment = false;
        /*get data form service*/
        $scope.order = {
            customer: orderDetailData.customer,
            items: {}
        };
        $.extend($scope.order, orderDetailData.order);
        $.extend($scope.order.items, orderDetailData.order_item);

        $scope.status = {
            invoiceSaving: false
        };

        $scope.updateComment = function () {
            toastr.info('Đang cập nhật ghi chú');
            $scope.isUpdateComment = true;
            return $http.patch(urlManagement.getUrlByKey('restful_admin_shop_order') + '/' + $scope.order.id, {
                update_comment: true,
                comment: $scope.order.comment
            }).then(function (response) {
                toastr.success('Cập nhật thành công');
                $scope.isUpdateComment = false;
                return response;
            }, function (reject) {
                if (reject.data.hasOwnProperty('mess'))
                    toastr.error(reject.data.mess, 'Lỗi');
                $scope.isUpdateComment = false;
                return reject;
            });
        };

        $scope.cancelOrder = function () {
            console.log('HUY');
        };

        $scope.shipOrder = function () {
            $state.go('sales.detail.shipping');
        };

        $scope.invoiceOrder = function () {
            var dialog = ngDialog.open({
                template: './views/shop/order/invoice.html',
                controller: 'orderInvoiceCtrl',
                scope: $scope,
                //plain: true,
                preCloseCallback: function (value) {
                    if (value != 'force')
                        return ngDialog.openConfirm({
                            template: './scripts/directives/crud/html/dialogCloseConfirm.html',
                            className: 'ngdialog-theme-default custom-width-confirm'
                        });

                    // NOTE: return the promise from openConfirm
                    //return nestedConfirmDialog;
                },
                closeByDocument: true,
                closeByEscape: true,
                resolve: {
                    deps: load('scripts/controllers/shop/order/invoice.js').deps,
                    dataOptions: function uiEditorOption() {
                        return [];
                    }
                }
                //className: 'custom-width'
            });
        };

        $scope.refundOrder = function () {
            $state.go('sales.detail.refund');
        };
        function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                    function ($ocLazyLoad, $q) {
                        var deferred = $q.defer();
                        var promise = false;
                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                        if (!promise) {
                            promise = deferred.promise;
                        }
                        angular.forEach(srcs, function (src) {
                            promise = promise.then(function () {
                                angular.forEach(MODULE_CONFIG, function (module) {
                                    if (module.name == src) {
                                        if (!module.module) {
                                            name = module.files;
                                        } else {
                                            name = module.name;
                                        }
                                    } else {
                                        name = src;
                                    }
                                });
                                return $ocLazyLoad.load(name);
                            });
                        });
                        deferred.resolve();
                        return callback ? promise.then(function () {
                            return callback();
                        }) : promise;
                    }]
            }
        }
    }]);
