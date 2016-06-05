/**
 * Created by vjcspy on 3/24/16.
 * mr.vjcspy@gmail.com/khoild@smartosc.com
 */
'use strict';
app.controller('analysisCtrl', ['$scope', 'analysisDataSv', '$http', 'urlManagement', 'toastr', function ($scope, analysisDataSv, $http, urlManagement, toastr) {
    console.log(analysisDataSv.data);
    var _optionForDateRange = {
        locale: {
            applyClass: 'btn-green',
            applyLabel: "Apply",
            fromLabel: "From",
            toLabel: "To",
            cancelLabel: 'Cancel',
            customRangeLabel: 'Custom range',
            //daysOfWeek: ['Ne', 'Po', 'Út', 'St', 'Čt', 'Pá', 'So'],
            firstDay: 1
            //monthNames: ['Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen', 'Červenec', 'Srpen', 'Září',
            //    'Říjen', 'Listopad', 'Prosinec'
            //]
        },
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        eventHandlers: {
            'apply.daterangepicker': function (ev, picker) {
                // lay theo kieu jquery
                //_elem = '#elemDateRange' + _v.columnId;
                //newValue = $(_elem).data('daterangepicker');

                var newValue = $scope.analysisData.range, start, _startMonth, _startDate, end, _endtMonth, _endDate;

                if (typeof newValue == 'undefined')
                    return;
                start = newValue.startDate.get('year') + '-';
                if (parseFloat(newValue.startDate.get('month')) < 9)
                    _startMonth = '0' + (newValue.startDate.get('month') + 1);
                else
                    _startMonth = (newValue.startDate.get('month') + 1);
                if (parseFloat(newValue.startDate.get('date')) < 10)
                    _startDate = '0' + (newValue.startDate.get('date'));
                else
                    _startDate = newValue.startDate.get('date');
                start += _startMonth + '-' + _startDate;

                end = newValue.endDate.get('year') + '-';
                if (parseFloat(newValue.endDate.get('month')) < 9)
                    _endtMonth = '0' + (newValue.endDate.get('month') + 1);
                else
                    _endtMonth = (newValue.endDate.get('month') + 1);
                if (parseFloat(newValue.endDate.get('date')) < 10)
                    _endDate = '0' + (newValue.endDate.get('date'));
                else
                    _endDate = newValue.endDate.get('date');
                end += _endtMonth + '-' + _endDate;
                //console.log(start);
                // filterControlCtrl[1].addDataSeach({
                //     columnId: _v.columnId,
                //     searchValue: start + '/' + end
                // });
                // filterControlCtrl[1].filterColumn();
                console.log(start + '/' + end);
                $http.post(urlManagement.getUrlByKey('dashboard') + '/analysis-data', {range: start + '/' + end}).then(function (response) {
                    $scope.analysisData.data = response.data;
                    updateData();
                    toastr.success('OK');
                }, function (reject) {
                    toastr.error(reject.data.mess, 'Error');
                });
            }
        }
    };
    $scope.formatMoney = function (value, c, d, t) {
        var n = value,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d == undefined ? "." : d,
            t = t == undefined ? "," : t,
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
    $scope.analysisData = {
        range: {
            startDate: moment().subtract(6, 'days'),
            endDate: moment()
        },
        dateRangeOptions: _optionForDateRange,
        data: analysisDataSv.data
    };

    var updateData = function () {
        var chartPercent1 = parseInt(($scope.analysisData.data.revenue - $scope.analysisData.data.cost) * 100 / $scope.analysisData.data.revenue);
        var chartPercent2 = parseInt(($scope.analysisData.data.cost) * 100 / $scope.analysisData.data.revenue);
        $scope.analysisData.data.chartData = [chartPercent1, chartPercent2];
        $scope.analysisData.data.percentCus = parseInt($scope.analysisData.data.newCustomer * 100 / $scope.analysisData.data.totalsCustomer);
    };
    updateData();

}]);