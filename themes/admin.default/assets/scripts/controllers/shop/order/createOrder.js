/**
 * Created by vjcspy on 3/2/16.
 */
app.service('itemsEditTable', ['$filter', '$http', 'editableOptions', 'editableThemes', '$rootScope', 'lodash', 'urlManagement', '$timeout', 'toastr', '$state', 'currencyData',
    function ($filter, $http, editableOptions, editableThemes, $rootScope, _, urlManagement, $timeout, toastr, $state, currencyData) {
        editableThemes.bs3.inputClass = 'input-sm';
        editableThemes.bs3.buttonsClass = 'btn-sm';
        editableOptions.theme = 'bs3';

        var vm = this;

        vm.items = [];

        vm.currencies = [];
        console.log(currencyData.currency_use());
        _.forEach(currencyData.currency_use(), function (v, k) {
            vm.currencies.push({currency: v.code, rate: v.rate});
        });
        vm.loadCurrency = function () {
            return vm.currencies.length ? null : $http.get('api/currencies').success(function (data) {
                vm.currencies = data;
            });
        };

        vm.showCurrency = function (item) {
            if (item.currency && vm.items.length) {
                var selected = $filter('filter')(vm.currencies, {currency: item.currency});
                return selected.length ? selected[0].currency : 'Chưa chọn';
            } else {
                return item.currency || 'Chưa chọn';
            }
        };

        vm.checkName = function (data, id) {
            if (!data)
                return 'Chưa đặt tên';
        };


        // save items
        vm.saveItem = function (data, item) {
            if (item)
            //Cái hay ở đây là data chỉ bao gồm những thứ thay đổi, và extend id vào data để nhận biết được id của item nào lúc update
                angular.extend(data, {id: item.id});
            //check xem co can phai luu vao data base khong. Boi vi chi co nhung san pham custom moi save vao database
            if (!item || !item.inStore) {
                toastr.info('Đang lưu sản phẩm. Xin hãy đợi...');
                return $http.post(urlManagement.getUrlByKey('restful_admin_shop_product'), data).then(function (reponse) {
                    toastr.success('Lưu sản phẩm thành công!');
                    return reponse;
                }, function (reject) {
                    toastr.error('Lỗi trong khi lưu sản phẩm ', reject.data.mess);
                    return reject;
                });
            }
        };

        // remove item
        vm.removeItem = function (index) {
            if (vm.items[index].inStore)
                vm.items.splice(index, 1);
            else {
                /*Cha hieu sao lai lam nhu the nay. Nhung neu nhu the nay thi lai xoa item trong stock*/
                var productId = vm.items[index].id;
                toastr.info('Đang xóa sản phẩm. Xin hãy đợi...');
                return $http.delete(urlManagement.getUrlByKey('restful_admin_shop_product') + '/' + productId, []).then(function (response) {
                    if (!!response)
                        vm.items.splice(index, 1);
                    else
                        toastr.error('Lỗi trong khi xóa sản phẩm ', 'reject.data.mess!')
                }, function (reject) {
                    toastr.error('Lỗi trong khi xóa sản phẩm ', reject.data.mess)
                });
            }
        };

        // add custom item
        vm.addCustomItem = function () {
            //toastr.info('Đang tạo mới sản phẩm. Xin hãy đợi...');
            return $timeout(function () {
                // random milli second
                var d = new Date();
                var n = d.getMilliseconds();

                vm.inserted = {
                    id: '',
                    name: 'PRODUCT-N-' + (vm.items.length + 1),
                    sku: 'SKU-N-' + n,
                    price: 0,
                    currency: 'USD',
                    link: '',
                    qty: 0,
                    inStore: false
                };
                return vm.saveItem(vm.inserted).then(function (reponse) {
                    // sua lai qty order  =1;
                    reponse.data.qty = 1;
                    vm.items.push(reponse.data);
                    return reponse;
                }, function (reject) {
                    return reject;
                });
            }, 0);
        };

        // validate change qty
        vm.checkChangeQty = function (data) {
            if (data == 0 || !data || isNaN(data))
                return 'Kiểm tra lại';
        };

        // Bắt sự kiện click select để add items
        $rootScope.$on('click_unselected_row', function (even, data) {
            if ($state.current.name !== 'sales.createorder')
                return false;
            //validate data
            if (!validateDataRowTable(data))
                return false;
            vm.items.splice(_.indexOf(vm.items, _.find(vm.items, function (item) {
                return item.id === data.id;
            })), 1);
        });
        $rootScope.$on('click_selected_row', function (even, data) {
            if ($state.current.name !== 'sales.createorder')
                return false;
            // validate data
            if (!validateDataRowTable(data))
                return false;
            // check xem da ton tai trong items chua:
            var index;
            if ((index = _.indexOf(vm.items, _.find(vm.items, function (item) {
                    return item.id === data.id;
                }))) > -1) {
                return vm.items[index].qty++;
            }

            data.qty = 1;
            data.inStore = true;
            data.price = parseFloat(data.price);
            vm.items.push(data);
        });
        function validateDataRowTable(data) {
            return !(typeof data == 'undefined' || !data.hasOwnProperty('id'));
        }

        vm.getItems = function () {
            return vm.items;
        };
        vm.getCurrencies = function () {
            return vm.currencies;
        };
    }]);

app.service('orderProcessing', ['$http', 'lodash', 'toastr', function ($http, _, toastr) {
    var sv = this;
    var subtotal = 0;
    var grandTotal = 0;
    var totalPaid = 0;
    sv.updateOrder = function (order) {
        // calculate subtotal
        subtotal = 0;
        _.forEach(order.items, function (value) {
            var currency = value.currency;
            var rate = getRateFromCurrency(currency, order.currencies);
            if (rate === false)
                return false;
            subtotal += rate * value.price;
        });
        grandTotal = subtotal + order.payment.payment_amount_another + order.shipping.shipping_amount;
        totalPaid = grandTotal - order.payment.payment_amount;
        return grandTotal;
    };

    sv.getSubtotal = function () {
        return subtotal;
    };

    sv.getGrandTotal = function () {
        return grandTotal;
    };
    sv.getTotalPaid = function () {
        return totalPaid;
    };

    function getRateFromCurrency(currency, currencies) {
        if (currency == 'VND')
            return 1;
        var index = _.indexOf(currencies, _.find(currencies, function (item) {
            return item.currency === currency;
        }));
        if (index > -1)
            return currencies[index].rate;
        else {
            console.log(currencies);
            toastr.error('Lỗi', 'Không tìm thấy tỷ lệ của tiền tệ: ' + currency, {closeButton: true});
            return false;
        }
    }

}]);


app.controller('OrderCreateCtrl', ['$scope', '$timeout', 'urlManagement', 'customer', 'itemsEditTable', 'orderProcessing', 'toastr', '$http', '$state',
    function ($scope, $timeout, urlManagement, customer, itemsEditTable, orderProcessing, toastr, $http, $state) {
        /*status accordion config*/
        $scope.status = {
            customer: {open: true},
            items: {
                open: true,
                addingCustomProduct: false
            },
            payment: {open: true},
            shipping: {open: true},
            order: {saving: false}
        };
        // data order
        $scope.data = {
            addingItems: false
        };
        // get data customer form resolve:
        $scope.people = customer.data;

        //items:
        $.extend($scope, itemsEditTable);
        $scope.addCustomerItemOrigin = function () {
            // muc dich lam cai nay la de disable button o ngoai
            $scope.status.items.addingCustomProduct = true;
            $scope.addCustomItem().then(function () {
                $scope.status.items.addingCustomProduct = false;
            }, function () {
                $scope.status.items.addingCustomProduct = false;
            });
        };

        // Order process
        $scope.order = {
            create_order: true,//Chi nham muc dich cho server biet la se gui request create order
            items: [],
            shipping: {
                shipping_amount: 0,
                shipping_comment: ''
            },
            payment: {
                payment_amount: 0, // đặt trước
                payment_amount_another: 0 //phụ phí
            },
            comment: 'Không có gì',
            totals: {
                subtotal: 0,
                grandtotal: 0,
                total_paid: 0
            }
        };


        $scope.changeCustomer = function () {
            $scope.updateOrder();
        };

        $scope.updateOrder = function () {
            $scope.order.items = $scope.getItems();
            $scope.order.currencies = $scope.getCurrencies();

            //update totals
            if (!orderProcessing.updateOrder($scope.order))
                return false;
            toastr.info('Cập nhật xong tổng tiền !');
            //get totals from service
            $scope.order.totals.subtotal = orderProcessing.getSubtotal();
            $scope.order.totals.total_paid = orderProcessing.getTotalPaid();
            return $scope.order.totals.grandtotal = orderProcessing.getGrandTotal();
        };

        var validateOrder = function () {
            if (!$scope.order.customer) {
                toastr.warning('Xin hãy chọn khách hàng!');
                return false;
            }
            if (_.size($scope.order.items) == 0) {
                toastr.warning('Xin hãy chọn sản phẩm!');
                return false;
            }
            if ($scope.order.totals.grandtotal == 0) {
                toastr.warning('Tổng tiền bằng 0. Xin hãy kiểm tra lại!');
                return false;
            }
            return true;
        };

        $scope.saveOrder = function () {
            $scope.status.order.saving = true;
            if (validateOrder() === true) {
                if ($scope.updateOrder() === false) {
                    $scope.status.order.saving = !$scope.status.order.saving;
                    toastr.warning('Xin hãy kiểm tra lại đơn hàng!');
                    return false;
                }
                $http.post(urlManagement.getUrlByKey('restful_admin_shop_order'), $scope.order).then(function (response) {
                    if (response.data.order_id) {
                        toastr.success('', 'Lưu đơn hàng thành công !', {closeButton: true});
                        // reInit data fresh order
                        $scope.order = {
                            create_order: true,//Chi nham muc dich cho server biet la se gui request create order
                            items: [],
                            shipping: {
                                shipping_amount: 0,
                                shipping_comment: ''
                            },
                            payment: {
                                payment_amount: 0, // đặt trước
                                payment_amount_another: 0 //phụ phí
                            },
                            comment: 'Không có gì',
                            totals: {
                                subtotal: 0,
                                grandtotal: 0,
                                total_paid: 0
                            }
                        };

                        $state.go('app.analysis');
                        return response;
                    }
                }, function (reject) {
                    toastr.error('Lỗi trong khi tạo mới sản phẩm ', reject.data.mess);
                    $scope.status.order.saving = !$scope.status.order.saving;
                    return reject;
                });
            } else
                $scope.status.order.saving = false;
        };

        $scope.formatMoney = function (number, c, d, t) {
            var n = number,
                c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
            return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        };
    }]);
