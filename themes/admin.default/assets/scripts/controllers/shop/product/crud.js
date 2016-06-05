/**
 * Created by vjcspy on 3/1/16.
 */
app.controller('ProductCrudCtrl', ['$scope', '$timeout', 'urlManagement', 'currencyData', function ($scope, $timeout, urlManagement, currencyData) {
    var dataCurrency = [];

    $.each(currencyData.currency_use(), function (k, v) {
        dataCurrency.push({label: v.code, value: v.code, id: v.code, name: v.code})
    });
    /*Config Data table*/
    $scope.dataTable = {
        article: null,
        crudId: 'product_crud', // dung de biet duoc thang nao muon them moi, boi vi nhieu thang cung dung directive nay
        tableOptions: {
            processing: true,
            serverSide: true,
            //"scrollX": true,
            "paging": true,
            //scrollCollapse: true,
            responsive: true,
            ajax: urlManagement.getUrlByKey('table_admin_shop_products'),
            "columns": [
                {"data": "id"},
                {"data": "name"},
                {"data": "sku"},
                {"data": "price"},
                {"data": "currency"},
                {"data": "cost"},
                {"data": "qty"},
                //{"data": "link"}
            ],
            "columnDefs": [ //FIXME: HAVE TO FILTER BY CLASS, sẽ chuyển cái này thành code
                {className: "id", "targets": [0]},
                {className: "name", "targets": [1]},
                {className: "sku", "targets": [2]},
                {className: "price", "targets": [3]},
                {className: "currency", "targets": [4]},
                {className: "cost", "targets": [5]},
                {className: "qty", "targets": [6]},
                //{className: "link", "targets": [6]}
            ]
        },
        filterConfig: [
            {
                columnId: "id",
                name: "Id",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "name",
                name: "Tên",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "sku",
                name: "Mã",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "price",
                name: "Giá",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "currency",
                name: "Tiền tệ",
                show: true,
                filterType: 'select',
                dataSelect: dataCurrency,
                filterChecked: false
            },
            {
                columnId: "cost",
                name: "Chi phí",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "qty",
                name: "Số lượng",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "link",
                name: "Link",
                show: true,
                filterType: "text",
                filterChecked: false
            }
        ],
        editorOptions: [
            {
                id: "id",
                title: "Id",
                type: 'text',
                editAble: false
            },
            {
                id: "name",
                title: "Tên",
                type: 'text',
                editAble: true
            },
            {
                id: "sku",
                title: "Mã",
                type: 'text',
                editAble: true
            },
            {
                id: "description",
                title: "Mô tả",
                type: 'editor',
                editAble: true
            },
            {
                id: "price",
                title: "Giá",
                type: 'text',
                editAble: true
            }, {
                id: "currency",
                title: "Tiền tệ",
                type: 'select',
                optionsData: dataCurrency,
                editAble: true
            },
            {
                id: "image_url",
                title: "Ảnh",
                type: 'fileUpload',
                editAble: true
            },
            {
                id: "cost",
                title: "Chi phí",
                type: 'text',
                editAble: true
            },
            {
                id: "qty",
                title: "Số lượng",
                type: 'text',
                editAble: true
            },
            {
                id: "link",
                title: "Link",
                type: 'text',
                editAble: true
            },
            {
                id: "comment",
                title: "Chú thích",
                type: 'textarea',
                editAble: true
            }
        ]
    };

    $scope.configDataTable = {};
    $scope.configDataTable.isSupportNewRecord = false;
}
]);
