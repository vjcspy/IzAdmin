/**
 * Created by vjcspy on 3/1/16.
 */
app.controller('CustomerCrudCtrl', ['$scope', '$timeout', 'urlManagement', function ($scope, $timeout, urlManagement) {
    /*Config Data table*/
    $scope.dataTable = {
        article: null,
        crudId: 'customer_crud',
        tableOptions: {
            processing: true,
            serverSide: true,
            //"scrollX": true,
            "paging": true,
            //scrollCollapse: true,
            responsive: true,
            ajax: urlManagement.getUrlByKey('table_admin_shop_customers'),
            "columns": [
                {"data": "id"},
                {"data": "first_name"},
                {"data": "last_name"},
                {"data": "facebook_id"},
                {"data": "address"},
                {"data": "email"},
                {"data": "phone"}
                //{"data": "link"}
            ],
            "columnDefs": [ //FIXME: HAVE TO FILTER BY CLASS, sẽ chuyển cái này thành code
                {className: "id", "targets": [0]},
                {className: "first_name", "targets": [1]},
                {className: "last_name", "targets": [2]},
                {className: "facebook_id", "targets": [3]},
                {className: "address", "targets": [4]},
                {className: "email", "targets": [5]},
                {className: "phone", "targets": [6]}
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
                columnId: "first_name",
                name: "Họ",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "last_name",
                name: "Tên",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "facebook_id",
                name: "Facebook Id",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "address",
                name: "Địa chỉ",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "email",
                name: "Email",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "phone",
                name: "SĐT",
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
                id: "first_name",
                title: "Họ",
                type: 'text',
                editAble: true
            },
            {
                id: "last_name",
                title: "Tên",
                type: 'text',
                editAble: true
            },
            {
                id: "facebook_id",
                title: "Face Id",
                type: 'text',
                editAble: true
            },
            {
                id: "address",
                title: "Địa chỉ",
                type: 'text',
                editAble: true
            },
            {
                id: "email",
                title: "Email",
                type: 'text',
                editAble: true
            },
            {
                id: "phone",
                title: "SĐT",
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
}
]);
