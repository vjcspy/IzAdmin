/**
 * Created by vjcspy on 3/4/16.
 */
app.controller('OrderRefundCtrl', ['$scope', '$timeout', 'urlManagement', 'toastr', '$http', 'orderDetail', '$state', 'lodash', 'editableOptions', 'editableThemes',
    function ($scope, $timeout, urlManagement, toastr, $http, orderDetail, $state, _, editableOptions, editableThemes) {
        $scope.order.refund_amount_new = 0;
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
        // status items OPEN
        if (!$scope.hasOwnProperty('status'))
            $scope.status = {items: {open: true}};
        else {
            $scope.status.items.open = true
        }

        $scope.back = function () {
            $state.go('sales.detail', {orderId: $scope.order.id});
        };
        $scope.checkQtyRefund = function (qtyRefund, data) {
            // số lượng shipped phải <= tổng số qty - số lượng refund - số lượng đã shipped
            if (isNaN(qtyRefund) || qtyRefund > data.qty || qtyRefund < data.refunded)
                return "Kiểm tra lại";

            // update refund_amount_new
            $scope.order.refund_amount_new += (qtyRefund - data.refunded) * data.price;
            updateTotal()
        };

        $scope.refundAllRow = function (item) {
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

            // update refund_amount_new
            $scope.order.refund_amount_new += ($scope.order.items[index].qty - $scope.order.items[index].refunded) * parseFloat($scope.order.items[index].price);
            $scope.order.items[index].refunded = $scope.order.items[index].qty;
            updateTotal();
        };

        $scope.checkRefundAmount = function (data, item) {
            if (isNaN(data))
                return 'Nhập số';
            $scope.order.refund_amount_new = parseFloat(data);
            updateTotal();
        };

        var updateTotal = function () {
            // Khi update refund thì sẽ tính total lại bằng công thức sau:
            $scope.order.grand_total = parseFloat($scope.order.subtotal) + parseFloat($scope.order.shipping_amount) + parseFloat($scope.order.payment_amount_another) - parseFloat($scope.order.refund_amount) - parseFloat($scope.order.refund_amount_new);
            $scope.order.total_paid = $scope.order.grand_total - parseFloat($scope.order.payment_amount);
        };

        $scope.saveItem = function () {
            return true;
        };

        $scope.updateRefund = function () {
            toastr.info('Đang cập nhật refund...', 'Xin hãy đợi!');
            $.extend($scope.order, {updateRefund: true});
            $http.patch(urlManagement.getUrlByKey('restful_admin_shop_order') + '/' + $scope.order.id, $scope.order)
                .then(function (response) {
                    toastr.success('Cập nhật refund thành công!');
                    $state.go('sales.detail', {orderId: $scope.order.id}, {reload: 'sales.detail'});
                    return response;
                }, function (reject) {
                    toastr.error(reject.data.mess);
                    return reject;
                })
        };
    }]);
