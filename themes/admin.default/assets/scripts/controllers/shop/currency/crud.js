/**
 * Created by vjcspy on 3/9/16.
 */
app.controller('CurrencyCrudCtrl', ['$scope', '$timeout', 'urlManagement', 'currencyDataFromSv', 'lodash', 'editableThemes', 'editableOptions', '$http', 'toastr', '$state',
    function ($scope, $timeout, urlManagement, currencyData, _, editableThemes, editableOptions, $http, toastr, $state) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';
        $scope.items = currencyData.data.currency_use;
        $scope.codes = [];
        _.forEach(currencyData.data.currencies, function (value, key) {
            $scope.codes.push({id: key, text: key});
        });

        $scope.addNewCurrency = function () {
            var data = {
                code: 'VND',
                rate: 1
            };
            $scope.items.push(data);
        };

        $scope.checkRate = function (data, item) {
            if (isNaN(data) || (parseFloat(data) != 1 && item.code == 'VND'))
                return 'Kiểm tra lại';
        };

        $scope.checkCode = function (data, item, $index) {
            var index = _.indexOf($scope.items, _.find($scope.items, function (item) {
                if (data === item.code)
                    return true;
            }));

            if (index > -1 && index != $index)
                return 'Đã tồn tại';
        };

        $scope.saveCurrency = function (data, index) {
            $http.post(urlManagement.getUrl('restful_admin_shop_currency'), $.extend({save: true}, data)).then(function (response) {
                $scope.isUpdating = false;
                $scope.items[index] = response.data;
                toastr.success('Lưu thành công');
            }, function (reject) {
                $scope.isUpdating = false;
                toastr.error(reject.data.mess);
            })
        };

        $scope.removeItem = function (index) {
            if (!$scope.items[index].id)
                return toastr.error('Không tìm thấy Id');
            $http.delete(urlManagement.getUrl('restful_admin_shop_currency') + '/' + $scope.items[index].id).then(function (response) {
                $scope.isUpdating = false;
                $scope.items.splice(index, 1);
                toastr.success('Xóa thành công');
            }, function (reject) {
                $scope.isUpdating = false;
                toastr.error(reject.data.mess);
            })
        };
        $scope.updateCurrency = function () {
            $http.post(urlManagement.getUrl('restful_admin_shop_currency'), {updateRate: true}).then(function (response) {
                $scope.isUpdating = false;
                $scope.items = response.data;
                toastr.success('Cập nhật thành công');
            }, function (reject) {
                $scope.isUpdating = false;
                toastr.error(reject.data.mess);
            })
        }
    }]);
