/**
 * Created by vjcspy on 3/4/16.
 */
app.controller('OrderShippingCtrl', ['$scope', '$timeout', 'urlManagement', 'toastr', '$http', 'orderDetail', '$state', 'lodash',
    function ($scope, $timeout, urlManagement, toastr, $http, orderDetail, $state, _) {
        // status items OPEN
        if (!$scope.hasOwnProperty('status'))
            $scope.status = {items: {open: true}};
        else {
            $scope.status.items.open = true
        }

        $scope.back = function () {
            $state.go('sales.detail', {orderId: $scope.order.id});
        };
        $scope.checkSaveQtyShipped = function (qtyShipped, data) {
            // số lượng shipped phải <= tổng số qty - số lượng refund - số lượng đã shipped
            if (isNaN(qtyShipped) || qtyShipped > (data.qty - data.refunded - data.shipped))
                return "Kiểm tra lại";
            if ((qtyShipped - data.shipped) > data.product_origin.qty)
                return "Trong kho không đủ!";
        };

        $scope.shipAllRow = function (item) {
            var index = -1;
            _.forEach($scope.order.items, function (value, key) {
                    if (value.id === item.id) {
                        index = key;
                        return false;
                    }
                }
            );
            if (index === -1)
                return toastr.error('Lỗi không xác định!', 'Lỗi');
            $scope.order.items[index].shipped = _.min([item.product_origin.qty, $scope.order.items[index].qty - $scope.order.items[index].refunded - $scope.order.items[index].shipped]);
            if ($scope.order.items[index].shipped == 0)
                toastr.warning('Số lượng trong kho không đủ');
        };
        $scope.saveItem = function () {
            return true;
        };

        $scope.updateShipping = function () {
            toastr.info('Đang cập nhật shipping...', 'Xin hãy đợi!');
            $.extend($scope.order, {updateShipping: true});
            $http.patch(urlManagement.getUrlByKey('restful_admin_shop_order') + '/' + $scope.order.id, $scope.order)
                .then(function (response) {
                    toastr.success('Cập nhật shipping thành công!');
                    $state.go('sales.detail', {orderId: $scope.order.id}, {reload: 'sales.detail'});
                    return response;
                }, function (reject) {
                    toastr.error('Cập nhật thất bại');
                    return reject;
                })
        };
    }]);
