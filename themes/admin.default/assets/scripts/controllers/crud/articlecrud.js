/**
 * Created by vjcspy on 2/5/16.
 */
app.controller('ArticleCrudCtrl', ['$scope', '$timeout', 'urlManagement', function ($scope, $timeout, urlManagement) {
    /*Config Data table*/
    $scope.dataTable = {
        article: null,
        tableOptions: {
            processing: true,
            serverSide: true,
            "scrollX": true,
            "paging": true,
            scrollCollapse: true,
            responsive: true,
            ajax: urlManagement.getUrlByKey('table_article'),
            "columns": [
                {"data": "id"},
                {"data": "title"},
                {"data": "short_content"},
                {"data": "article_type"},
                {"data": "image_title_url"}
            ],
            "columnDefs": [ //FIXME: HAVE TO FILTER BY CLASS, sẽ chuyển cái này thành code
                {className: "id", "targets": [0]},
                {className: "title", "targets": [1]},
                {className: "short_content", "targets": [2]},
                {className: "article_type", "targets": [3]},
                {className: "image_title_url", "targets": [4]}
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
                columnId: "title",
                name: "Title",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "short_content",
                name: "Short Content",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "article_type",
                name: "Article Type",
                show: true,
                filterType: "text",
                filterChecked: false
            },
            {
                columnId: "image_title_url",
                name: "Image Url",
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
                id: "title",
                title: "Title",
                type: 'text',
                editAble: true
            },
            {
                id: "short_content",
                title: "Short Content",
                type: 'editor',
                editAble: true
            },
            {
                id: "article_type",
                title: "Article Type",
                type: 'text',
                editAble: true
            },
            {
                id: "image_title_url",
                title: "Url Image",
                type: 'fileUpload',
                editAble: true
            }
        ]
    };
}
]);
