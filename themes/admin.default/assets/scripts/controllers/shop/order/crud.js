/**
 * Created by vjcspy on 3/4/16.
 */
app.controller('OrderCrudCtrl', ['$scope', '$timeout', 'urlManagement', '$rootScope', '$state',
    function ($scope, $timeout, urlManagement, $rootScope, $state) {
        /*Config Data table*/
        $scope.dataTable = {
            article: null,
            tableOptions: {
                processing: true,
                serverSide: true,
                //"scrollX": true,
                "paging": true,
                //scrollCollapse: true,
                responsive: true,
                ajax: urlManagement.getUrlByKey('table_admin_shop_orders'),
                "columns": [
                    {"data": "id"},
                    {"data": "created_at"},
                    {"data": "last_name"},
                    {"data": "subtotal"},
                    {"data": "shipping_amount"},
                    {"data": "payment_amount_another"},
                    {"data": "payment_amount"},
                    {"data": "refund_amount"},
                    {"data": "state"},
                    {"data": "user_id"}
                ],
                "columnDefs": [ //FIXME: HAVE TO FILTER BY CLASS, sẽ chuyển cái này thành code
                    {className: "id", "targets": [0]},
                    {className: "created_at", "targets": [1]},
                    {className: "last_name", "targets": [2]},
                    {className: "subtotal", "targets": [3]},
                    {className: "shipping_amount", "targets": [4]},
                    {className: "payment_amount_another", "targets": [5]},
                    {className: "payment_amount", "targets": [6]},
                    {className: "refund_amount", "targets": [7]},
                    {
                        className: "state",
                        "render": function (data, type, row) {
                            switch (data) {
                                case '0':
                                    return 'OPEN';
                                case '1':
                                    return 'ĐÃ CHUYỂN';
                                case '2':
                                    return 'ĐÃ TRẢ TIỀN';
                                case '3':
                                    return 'HOÀN THÀNH';
                                case '5':
                                    return 'HỦY';
                            }
                            return '';
                        },
                        "targets": [8]
                    },
                    {className: "user_id", "targets": [9]}
                ]
            },
            filterConfig: [
                {
                    columnId: "id",
                    name: "#",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                },
                {
                    columnId: "created_at",
                    name: "Ngày tạo",
                    show: true,
                    filterType: "dateRange",
                    filterChecked: true
                },
                {
                    columnId: "last_name",
                    name: "Tên",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                },
                {
                    columnId: "subtotal",
                    name: "Tiền sản phẩm",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                },
                {
                    columnId: "shipping_amount",
                    name: "Phí vận chuyển",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                },
                {
                    columnId: "payment_amount_another",
                    name: "Phụ phí",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                },
                {
                    columnId: "payment_amount",
                    name: "Trả trước",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                }, {
                    columnId: "refund_amount",
                    name: "Tiền refund",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                }, {
                    columnId: "state",
                    name: "Trạng thái",
                    show: true,
                    filterType: "select",
                    filterChecked: false,
                    dataSelect: [
                        {
                            'label': 'OPEN',
                            'value': '0'
                        }, {
                            'label': 'ĐÃ CHUYỂN',
                            'value': '1'
                        }, {
                            'label': 'ĐÃ TRẢ TIỀN',
                            'value': '2'
                        }, {
                            'label': 'HOÀN THÀNH',
                            'value': '3'
                        }, {
                            'label': 'HỦY',
                            'value': '5'
                        }
                    ]
                }, {
                    columnId: "user",
                    name: "Người tạo",
                    show: true,
                    filterType: "text",
                    filterChecked: false
                }
            ],
            editorOptions: []
        };
        $scope.configDataTable = {};
        $scope.configDataTable.isSupportNewRecord = false;

        $rootScope.$on('click_selected_row', function (even, data) {
            if ($state.current.name !== 'sales.vieworder')
                return;
            if (typeof data != 'undefined') {
                $state.go('sales.detail', {orderId: data.id});
                $scope.$emit('remove_all_selected_datatable', []);
            }
        });

    }
]);
