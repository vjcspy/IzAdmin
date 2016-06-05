/**
 * Created by vjcspy on 2/15/16.
 */
app.controller('CrudEditorDialogCtrl', ['$scope', 'dataOptions', '$http', 'toastr', function ($scope, dataOptions, $http, toastr) {
    $scope.data = {
        formElem: dataOptions[0], //data editor options
        formData: dataOptions[2], // data row
        tableData: dataOptions[1], // data dataTable
        dialog: dataOptions[3]
    };
    $scope.saveAction = function () {
        var urlPost = $scope.data.tableData.ajax + '/save';
        $http.post(urlPost, $scope.data.formData, []).then(function (data) {
            // event to redraw table
            $scope.$emit('izDataTable_redraw', []);
            // close dialog
            $scope.closeThisDialog('force');
            return toastr.success('', data.statusText, {closeButton: true});
        }, function (data) {
            return toastr.error('Error', 'Can\'n save!', {closeButton: true});
        });

    };
    $scope.deleteAction = function () {
        var urlPost = $scope.data.tableData.ajax + '/delete';
        $http.post(urlPost, $scope.data.formData, []).then(function (data) {
            // event to redraw table
            $scope.$emit('izDataTable_redraw', []);
            // close dialog
            $scope.closeThisDialog('force');
            return toastr.success('', data.statusText, {closeButton: true});
        }, function (data) {
            return toastr.error('Error', 'Can\'n save!', {closeButton: true});
        });
    };
}]);
