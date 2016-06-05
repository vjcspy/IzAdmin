/**
 * Created by vjcspy on 2/13/16.
 */
app.controller('SystemControlCtrl', ['$scope', 'uiGridConstants', 'urlManagement', '$http', 'toastr', 'cfpLoadingBar', '$timeout', '$interval', function ($scope, uiGridConstants, urlManagement, $http, toastr, cfpLoadingBar, $timeout, $interval) {

    $scope.data = {
        dailyTaskOnly: true,
        autoRefresh: true
    };


    /*Log Work*/
    $scope.gridOptionsLogWork = {
        rowHeight: 36,
        data: 'logWorkData',
        columnDefs: [
            {name: 'Time', field: 'created_at', width: 170},
            {name: 'Work', field: 'work'},
            {name: 'Output Data', field: 'data'}
        ]
    };

    /*Control*/
    $scope.gridOptionsControl = {
        rowHeight: 36,
        data: 'dataControl',
        columnDefs: [
            {name: 'Control', field: 'work_name'},
            {
                name: 'Action',
                field: 'is_working',
                cellTemplate: '<div class="ui-grid-cell-contents" title="TOOLTIP"><button md-ink-ripple class="md-btn md-raised m-b btn-fw" ng-class="grid.appScope.getCssButton(row)" ng-click="grid.appScope.runControl(row)">{{grid.appScope.getTextStatus(grid, row)}}</button></div>',
                width: 150
            }
        ]
    };
    $scope.getTextStatus = function (grid, myRow) {
        if (myRow.entity.is_working == 1)
            return 'Running';
        else
            return 'Run';
    };
    $scope.getCssButton = function (myRow) {
        if (myRow.entity.is_working == 1)
            return 'green';
        else
            return 'indigo';
    };
    $scope.runControl = function (myRow) {
        cfpLoadingBar.start();
        return $timeout(function () {
            cfpLoadingBar.complete();
            $http.patch(urlManagement.getUrlByKey('restful_systemControl') + '/' + myRow.entity.work_id, {data: ''}, []).then(function (data) {
                getDataControl();
            }, function (data) {
                return toastr.error('Error', 'Can\'n run!', {closeButton: true});
            });

        }, 100);
    };


    /*get Data Table*/
    var getDataControl = function () {
        $http.get(urlManagement.getUrlByKey('restful_systemControl'))
            .success(function (data) {
                $scope.dataControl = data.working;
                //log work data
                var logWorkData = [];
                console.log('here');
                data.work.forEach(function (row, index) {
                    if ($scope.data.dailyTaskOnly) {
                        if (row.log_type == 1)
                            logWorkData.push(row);
                    } else
                        logWorkData.push(row);
                });
                $scope.logWorkData = logWorkData;
            });
        return true;
    };
    getDataControl();
    var autoRefresh = $interval(getDataControl, 10000);

    $scope.checkAutoRefresh = function () {
        if (!$scope.data.autoRefresh)
            $interval.cancel(autoRefresh); else autoRefresh = $interval(getDataControl, 10000);
    };

    $scope.changeTypeLogWorkShow = function () {
        getDataControl();
    }
}]);
