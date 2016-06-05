/**
 * Created by vjcspy on 3/8/16.
 */
app.controller('WarehouseCtrl', ['$scope', '$timeout', 'urlManagement', '$rootScope', '$state', 'toastr', '$http', function ($scope, $timeout, urlManagement, $rootScope, $state, toastr, $http) {
    $scope.items = [];

    // Bắt sự kiện click select để add items
    $rootScope.$on('click_unselected_row', function (even, data) {
        if ($state.current.name !== 'product.warehouse')
            return false;
        //validate data
        if (!validateDataRowTable(data))
            return false;
        $scope.items.splice(_.indexOf($scope.items, _.find($scope.items, function (item) {
            return item.id === data.id;
        })), 1);
    });

    $rootScope.$on('click_selected_row', function (even, data) {
        if ($state.current.name !== 'product.warehouse')
            return false;
        // validate data
        if (!validateDataRowTable(data))
            return false;
        // check xem da ton tai trong items chua:
        var index;
        if ((index = _.indexOf($scope.items, _.find($scope.items, function (item) {
                return item.id === data.id;
            }))) > -1) {
            return $scope.items[index].qty++;
        }

        data.qty = 0;
        data.inStore = true;
        data.cost = parseFloat(data.cost);
        $scope.items.push(data);
    });

    var validateDataRowTable = function (data) {
        return !(typeof data == 'undefined' || !data.hasOwnProperty('id'));
    };

    $scope.checkChangeQty = function (data) {
        if (isNaN(data) || parseFloat(data) < 0)
            return 'Kiểm tra lại';
    };

    $scope.checkCost = function (data) {
        if (isNaN(data) || parseFloat(data) < 0)
            return 'Kiểm tra lại';
    };

    $scope.saveStock = function () {
        toastr.info('Xin hãy đợi');
        $http.patch(urlManagement.getUrl('restful_admin_shop_product') + '/1', {
            'updateStock': true,
            items: $scope.items
        }, []).then(function (response) {
            toastr.success('Cập nhật thành công');
            $scope.items = [];
            $state.go('app.analysis');
        }, function (reject) {
            toastr.error(reject.data.mess);
        });
    }
}]);
