/**
 * Created by vjcspy on 3/5/16.
 */
app.controller('orderInvoiceCtrl', ['$scope', 'toastr', '$http', 'urlManagement', '$state', function ($scope, toastr, $http, urlManagement, $state) {
    $scope.updateInvoice = function () {
        $scope.status.invoiceSaving = true;
        if (validatePaymentAmount()) {
            $scope.order.total_paid = parseFloat($scope.order.grand_total) - parseFloat($scope.order.refund_amount) - (parseFloat($scope.newPaymentAmount) + parseFloat($scope.order.payment_amount));
            $http.patch(urlManagement.getUrlByKey('restful_admin_shop_order') + '/' + $scope.order.id, {
                updateInvoice: true,
                id: $scope.order.id,
                payment_amount: $scope.newPaymentAmount
            }).then(function (response) {
                $scope.status.invoiceSaving = false;
                toastr.success('Thanh toán thành công!');
                $scope.closeThisDialog('force');
                $state.go('sales.detail', {orderId: $scope.order.id}, {reload: 'sales.detail'});
                return response;
            }, function (reject) {
                $scope.status.invoiceSaving = false;
                $scope.closeThisDialog('force');
                toastr.error(reject.data.mess);
                return reject;
            });
        } else
            $scope.status.invoiceSaving = false;
    };
    var validatePaymentAmount = function () {
        // SO tien khach hang tra khong duoc vuợt quá grand total - refund
        if ((parseFloat($scope.order.grand_total) - parseFloat($scope.order.refund_amount) - (parseFloat($scope.newPaymentAmount) + parseFloat($scope.order.payment_amount))) < 0) {
            toastr.error('Số tiền khách hàng trả vượt quá tổng số tiền phải trả!');
            return false;
        }
        return true;
    }
}]);
