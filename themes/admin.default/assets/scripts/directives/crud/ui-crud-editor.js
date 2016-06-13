/**
 * Created by vjcspy on 2/5/16.
 */
'use strict';
window.fistInitDateRage = true;
(function (angular) {
    var izCrudModule = angular.module('ui.crud.editor', ['oc.lazyLoad', 'ui.load'])
        .value('uiCrudEditortable', {});
    izCrudModule.directive('uiCrudEditor', ['uiCrudEditortable', 'MODULE_CONFIG', 'uiLoad', '$timeout', 'toastr', '$rootScope',
        function uiEditorTableInjectingFunction(uiCrudEditortable, MODULE_CONFIG, uiLoad, $timeout, toastr, $rootScope) {
            return {
                restrict: 'A',
                scope: {
                    uiOptions: '=',
                    uiEditorOptions: '=',
                    uiEditorDisable: '@',
                    crudId: '@'
                },
                compile: function uiCrudCompilingFunction(tElm, tAttrs) {
                    var options = uiCrudEditortable && uiCrudEditortable[tAttrs.uiCrudEditor];

                    return function uiJpLinkingFunction(scope, elm, attrs) {
                        //elem: ui-crud-editor
                        //option: ui-options

                        var isBind = true;
                        var izOption = 'uiOptions';

                        function izGoped() {
                            var uiOptions = [];
                            if (attrs[izOption]) {
                                if (!isBind)
                                    uiOptions = scope.$eval('[' + attrs.uiOptions + ']');
                                else
                                    uiOptions.push(scope.uiOptions);
                                if (angular.isObject(options) && angular.isObject(uiOptions[0])) {
                                    uiOptions[0] = angular.extend({}, options, uiOptions);
                                } else if (options) {
                                    uiOptions = [options];
                                }
                                return uiOptions;
                            }
                        }

                        // If change compatibility is enabled, the form input's "change" event will trigger an "input" event
                        if (attrs.ngModel && elm.is('select,input,textarea')) {
                            elm.bind('change', function () {
                                elm.trigger('input');
                            });
                        }
                        function izCpged() {
                            $timeout(function () {
                                //     call function and pass all argument as array to function
                                //var izDataTable = $(elm)[attrs.uiCrudEditor].apply($(elm), izGoped());
                                var izDataTable = $(elm).DataTable(izGoped()[0]);
                                scope.$emit('izDataTable_init', izDataTable);

                                /*add event listener for click tr*/
                                $(elm).on('click', 'tr', function () {
                                    var data = izDataTable.row(this).data();
                                    if (typeof data == 'undefined')
                                        return false;

                                    // add css
                                    if ($(this).hasClass('selected')) {
                                        // $emit event
                                        scope.$emit('click_unselected_row_' + scope.crudId, data);
                                        $(this).removeClass('selected');
                                    }
                                    else {
                                        // $emit event
                                        scope.$emit('click_selected_row_' + scope.crudId, data);
                                        $(this).addClass('selected');
                                    }
                                });
                                // Bắt sự kiện để remove hết class css selected
                                $rootScope.$on('remove_all_selected_datatable', function (even, data) {
                                    izDataTable.$('tr.selected').removeClass('selected');
                                })
                            }, 0);
                        }

                        function refresh() {
                            // If ui-refresh is used, re-fire the the method upon every change
                            if (attrs.uiRefresh) {
                                scope.$watch(attrs.uiRefresh, function () {
                                    izCpged();
                                });
                            }
                        }

                        var iayz = false;
                        angular.forEach(MODULE_CONFIG, function (module) {
                            if (module.name == attrs.uiCrudEditor) {
                                iayz = module.files;
                            }
                        });

                        if (iayz) {
                            uiLoad.load(iayz).then(function () {
                                izCpged();
                                refresh();
                            }).catch(function () {
                                toastr.error('Some error occur when load', 'Error');
                            });
                        } else {
                            izCpged();
                            refresh();
                        }

                        // check de unregister listener, mot diem hay ho cua angular la khi goi lai listener thi no tu unregister
                        scope.$on('$destroy', function () {
                            // TODO: event $destroy of directive
                            //console.log('unregister');
                            listener();
                        });

                        function load(srcs, callback) {
                            return {
                                deps: ['$ocLazyLoad', '$q',
                                    function ($ocLazyLoad, $q) {
                                        var deferred = $q.defer();
                                        var promise = false;
                                        srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                        if (!promise) {
                                            promise = deferred.promise;
                                        }
                                        angular.forEach(srcs, function (src) {
                                            promise = promise.then(function () {
                                                var name;
                                                angular.forEach(MODULE_CONFIG, function (module) {
                                                    if (module.name == src) {
                                                        if (!module.module) {
                                                            name = module.files;
                                                        } else {
                                                            name = module.name;
                                                        }
                                                    } else {
                                                        name = src;
                                                    }
                                                });
                                                return $ocLazyLoad.load(name);
                                            });
                                        });
                                        deferred.resolve();
                                        return callback ? promise.then(function () {
                                            return callback();
                                        }) : promise;
                                    }]
                            }
                        }
                    }
                }
            };
        }]);
    izCrudModule.directive('izFilterContainer', function () {
        var _s = '';
        _s += '<div class="row filter-controls">';
        _s += '<div class="panel panel-default">';
        _s += '<div class="panel-body body-iz-filter">';
        _s += '<iz-filter-control><iz-filter-controller-filter-type></iz-filter-controller-filter-type><iz-filter-controller-elem></iz-filter-controller-elem></iz-filter-control><iz-filter-action></iz-filter-action>';
        _s += '</div>';
        _s += '</div>';
        _s += '</div>';
        _s += '</div>';
        return {
            restrict: 'E',
            //transclude: true,
            scope: {
                izDataColumnIndex: '&',
                izSupportNewRecord: '@',
                crudId: '@'
            },
            controller: ['$scope', '$rootScope', function ($scope, $rootScope) {
                var dataSearch = [];
                var dataItemsSelectedInControl = {};
                $scope.currentCriterial = null; // current criterial: mac dinh =null;

                /*TODO: FILTER*/
                this.removeAllFilter = function () {
                    $.each(dataSearch, function (_k, _v) {
                        var _classColumn = '.' + _v.columnId;
                        $scope.izDatatable.column(_classColumn)
                            .search('');
                    });
                    $scope.izDatatable.draw();
                    dataSearch = [];
                };

                this.filterColumn = function () {
                    if ($scope.izDatatable == null) {
                        iLog("can't filter", null, 5);
                        return;
                    }

                    // Trong trường hợp có criterial thì sẽ thêm vào global search
                    if ($scope.currentCriterial != null) {
                        $scope.izDatatable.search($scope.currentCriterial);
                    }

                    $.each(dataSearch, function (_k, _v) {

                        var _classColumn = '.' + _v.columnId;
                        var _dataColumn = _v.columnId + ':data';

                        /*
                         * Kiem tra xem control cua column ay co duoc checked khong. Neu khong duoc check thi khong filter theo column day.
                         * */
                        if (dataItemsSelectedInControl[_v.columnId] == false) {
                            $scope.izDatatable.column(_classColumn)
                                .search('');
                            return true;
                        }

                        $scope.izDatatable.column(_classColumn)
                            .search(_v.searchValue);
                    });
                    $scope.izDatatable.draw();
                };

                this.addDataSeach = function (dataObj) {
                    var _isExisted = false;
                    $.each(dataSearch, function (_k, _v) {
                        if (_v.columnId == dataObj.columnId) {
                            _isExisted = true;
                            dataSearch[_k].searchValue = dataObj.searchValue;
                        }
                    });
                    if (!_isExisted) {
                        dataSearch.push(dataObj);
                    }
                };

                /*TODO: Thao tac voi control*/
                //set data nhung item duoc select cho container
                this.setDataItemsSelectedInControl = function (data) {
                    dataItemsSelectedInControl = data;
                };

                /*TODO: CRITERIAL*/
                //group by criterial:
                this.groupByCriterial = function (_columnId) {

                    /*code below to remove filter but interface not reset. */
                    /*FIXME: will check again*/
                    if (false) {
                        this.setCurrentCriterial(_columnId);
                        $.each(dataSearch, function (_k, _v) {
                            var _classColumn = '.' + _v.columnId;
                            $scope.izDatatable.column(_classColumn)
                                .search('');
                        });
                        dataSearch = [];
                    }

                    $scope.izDatatable.search(_columnId).draw();
                };
                this.setCurrentCriterial = function (_columnId) {
                    $scope.currentCriterial = _columnId;
                };

                /*TODO: show/hiden column*/
                $scope.izDataColumnIndex = $scope.izDataColumnIndex();

                //cominicate with child controller
                this.getSupportNewRecord = function () {
                    return $scope.izSupportNewRecord;
                };
                this.getCrudId = function () {
                    return $scope.crudId;
                };

                this.getDataColumnDisplay = function () {
                    return $scope.izDataColumnIndex;
                };
                this.setDataColumnDisplay = function (_arrayColumnData) {
                    $scope.izDataColumnIndex = _arrayColumnData;
                };

                var _classColumn, _column;
                this.displayColumn = function (arrayDatacolumn) {
                    // arrayDatacolumn: truyen len id nhung column duoc show
                    $.each($scope.izDataColumnIndex, function (_k, _v) {
                        _classColumn = '.' + _v.columnId;
                        _column = $scope.izDatatable.column(_classColumn);

                        if (arrayDatacolumn == null) {
                            /*init column - hoac sua trong criteria*/
                            if (_v.show == true || _v.defaultCriteria == true)
                                _column.visible(true);
                            else
                                _column.visible(false);
                        } else {
                            //Neu la criteria thi se khong lam gi
                            if (_v.defaultCriteria == true || _v.isCriteria == true)
                                return true;

                            var show = false;
                            $.each(arrayDatacolumn, function (k, v) {
                                if (_v.columnId == v) {
                                    show = true;
                                    $scope.izDataColumnIndex[_k].show = true;
                                }
                            });
                            //console.log(_column);
                            if (show)
                                _column.visible(true);
                            else
                                _column.visible(false);

                            // Toggle the visibility
                            //column.visible(!column.visible());
                        }
                    });
                };

                /*TODO: listener event to init Data Table*/
                $rootScope.$on('izDataTable_init', function (event, args) {
                    $scope.izDatatable = args;
                    this.displayColumn(null);
                }.bind(this));

                /*TODO: listener event to redraw table*/
                $rootScope.$on('izDataTable_redraw', function (event, args) {
                    console.log('Redraw dataTable');
                    $scope.izDatatable.draw();
                });
            }],
            template: _s
        };
    });

    izCrudModule.directive('izFilterControl', function () {
        var _s = '';
        _s += '<div class="col-lg-10">';
        _s += '<div class="report-filter-control" style="float: left">';
        _s += '<form class="form-inline">';
        _s += '<div class="btn-group btn-group-filter-main form-group" data-toggle="tooltip" title="Add/Remove Filter">';
        _s += '<button type="button" class="btn btn-default dropdown-toggle btn-filter form-control" data-toggle="dropdown"><i class="fa fa-filter' +
            ' fa-fw"></i>Lọc</button>';
        _s += '<ul class="dropdown-menu" role="menu">';
        _s += '<li class="remove-filters"><a href="javascript:void(0)" ng-click="removeAllFilter()"><span class="glyphicon glyphicon-remove"></span>Xóa hết bộ lọc</a></li>';
        _s += '<li class="divider"></li>';
        _s += '<li data-filter-field="id" ng-repeat="item in items"><a href="javascript:void(0)" style="display: block" ng-click="changeState(item.id)"> <input type="checkbox" ng-model="selection.ids[item.id]" name="filter_select_group" id="{{item.id}}" ng-change="stateChanged(item.id)"/> {{item.name}}</a></li>';
        _s += '</ul>';
        _s += '</div>&nbsp;';
        _s += '<div class="form-group" ng-transclude>';
        _s += '</div>';
        _s += '</form>';
        _s += '</div>';
        _s += '</div>';
        return {
            require: '^izFilterContainer',
            restrict: 'E',
            transclude: true,
            scope: {
                title: '@'
            },
            controller: ['$scope', function ($scope) {
                $scope.filterContainer = {};
                var items = $scope.items = [];

                $scope.selection = {ids: {}};

                $scope.removeAllFilter = function () {
                    // Change state select to false
                    $.each($scope.selection.ids, function (_k, _v) {
                        $scope.selection.ids[_k] = false;

                        // thay doi trang thai element theo select
                        stateChanged(_k);
                    });
                    $scope.filterContainer.removeAllFilter();
                };

                var stateChanged = function (_id) {
                    var elemId = '#elem' + _id, textId = '#elemText' + _id;
                    var _elem = $(elemId);
                    var _textElem = $(textId);
                    // hide or show element input form
                    if ($scope.selection.ids[_id] == true) {
                        _elem.show();
                    } else {
                        _textElem.val('');
                        _elem.hide();
                    }

                    //set data selected to container
                    $scope.setDataSelectedToContainer();
                };

                $scope.changeState = function (_id) {
                    // Change state by click in a tag
                    $scope.selection.ids[_id] = $scope.selection.ids[_id] != true;
                    stateChanged(_id);
                };

                //communicate with child directive
                this.addItem = function (item) { //Phai la this, neu sử dụng $scope thì không share được
                    // Moi khi add vao thi nhung thang nao co thuoc tinh la checked=true thi se duoc hien thi va checked
                    if (item.checked == true) {
                        $scope.selection.ids[item.id] = true;
                    }
                    items.push(item);
                };
            }
            ],
            link: function (scope, element, attrs, tabsCtrl) {
                scope.filterContainer.removeAllFilter = tabsCtrl.removeAllFilter;

                // init function to set data selected items to container
                scope.setDataSelectedToContainer = function () {
                    tabsCtrl.setDataItemsSelectedInControl(scope.selection.ids);
                };
                //set data selected to container. (Chỉ những cái nào được select thì mới được filter)
                scope.setDataSelectedToContainer();
            },
            template: _s
        };
    });

    izCrudModule.directive('izFilterControllerFilterType', function () {
        var _s = '';
        _s += '<div class="form-group animated fadeIn" ng-if="!notFilterByType">';
        _s += '<div class="input-group" data-toggle="tooltip" title="Change Type Report"> ';

        _s += '<span class="input-group-addon"><i class="fa fa-at"></i></span>';
        _s += '<select name="selectFilterByType" class="selectpicker form-control" data-live-search="true" ng-options="option.label for option in dataSelectFilterByType track by option.value" ng-model="data.typeSelectFilterByType" ng-change="filterByTypeChange()" aria-describedby="inputGroupSuccess3Status"></select>';
        _s += '</div>';
        _s += '</div>';
        return {
            restrict: 'E',
            require: ['^izFilterControl', '^izFilterContainer'],
            transclude: true,
            scope: {},
            controller: ['$scope', function ($scope) {
            }],
            link: function (scope, element, attrs, filterCtrl) {
                var arrayColumnIndex = filterCtrl[1].getDataColumnDisplay();

                scope.notFilterByType = true;
                scope.dataSelectFilterByType = [];


                //init dataSelectFilterByType and show default type report
                $.each(arrayColumnIndex, function (_k, _v) {
                    if (_v.isCriteria == true) {
                        scope.notFilterByType = false;
                        scope.dataSelectFilterByType.push({
                            label: _v.name,
                            value: _v.columnId
                        });
                    }
                    if (_v.defaultCriteria == true) {
                        scope.data = {
                            typeSelectFilterByType: {
                                label: _v.name,
                                value: _v.columnId
                            }
                        };
                    }
                });

                //filter by type function
                scope.filterByTypeChange = function () {


                    //check xem co filterByType:
                    if (scope.notFilterByType === true) {
                        iLog('Not Sort by Criteria');
                        return;
                    }

                    var _columnId = scope.data.typeSelectFilterByType.value;

                    /*Code below to check type=country. Current version not support this type*/
                    if (_columnId == 'country') {
                        $.notify({
                            // options
                            message: 'Current version does not support filter by type "' + _columnId + '"'
                        }, {
                            // settings
                            type: 'danger'
                        });
                        return;
                    }

                    //change data column:
                    var _arrayDataColumn = filterCtrl[1].getDataColumnDisplay();
                    var _newArrayDataColumn = [];
                    $.each(_arrayDataColumn, function (_k, _v) {
                        if (_v.hasOwnProperty('isCriteria')) {
                            _v.show = false;
                            _v.isCriteria = true;
                            _v.defaultCriteria = false;
                        }
                        if (_v.columnId == _columnId) {
                            _v.show = true;
                            _v.isCriteria = true;
                        }
                        _newArrayDataColumn.push(_v);
                    });
                    filterCtrl[1].setDataColumnDisplay(_newArrayDataColumn);

                    //show cot day len: OK
                    filterCtrl[1].displayColumn();

                    //Show input filter:
                    $('.criteriaElem').hide();
                    var _elem = '#elem' + _columnId;
                    $(_elem).fadeIn('slow');

                    //Xoa tat ca cac filter criteria:
                    $('.textElem').val('');

                    //Set current Criteria:

                    //renderer lai table
                    filterCtrl[1].groupByCriterial(_columnId);
                }

            },
            template: _s
        };
    });

    izCrudModule.directive('izFilterControllerElem', function () {
        var _s = '';
        _s += '<div ng-repeat="filterElem in data.filterArray" class="{{\'form-group animated fadeIn \' + filterElem.class}}" id="{{\'elem\' + filterElem.columnId }}" ng-style="{display:filterElem.dataDisplay}" style="padding-left: 4px">';
        _s += '<input id="{{\'elemText\' +filterElem.columnId }}" type="{{filterElem.filterType}}" class="form-control textElem" placeholder="{{filterElem.name}}" style="font-size: 11px;" ng-if="!filterElem.dataHide.text" ng-model="data.typeText[filterElem.columnId]" ng-keyup="filterData($event,filterElem.columnId,\'text\')" data-toggle="tooltip" data-placement="bottom" title="" tooltipFilter="izTooltipFilter" isCriterial="filterElem.isCriterial"> ';
        _s += '<select name="selectFilter" class="form-control" ng-options="option.label for option in filterElem.dataSelect track by option.value" ng-model="data.typeSelect[filterElem.columnId]" ng-if="!filterElem.dataHide.select" ng-change="filterData(\'null\',filterElem.columnId,\'select\')"></select> ';
        _s += '<input date-range-picker class="form-control date-picker" type="text" id="{{\'elemDateRange\' +filterElem.columnId }}" ng-model="data.typeDateRange[filterElem.columnId]" ng-if="!filterElem.dataHide.dateRange" options="filterElem.opt"/> ';
        _s += '</div>';
        return {
            require: ['^izFilterControl', '^izFilterContainer'],
            restrict: 'E',
            scope: {},
            controller: ['$scope', function ($scope) {
                $scope.filterChecked = {};
                $scope.notText = {};
                $scope.searchValue = {};
            }],
            link: function (scope, element, attrs, filterControlCtrl) {
                //init model element:
                scope.data = {
                    typeText: {},
                    typeDateRange: {},
                    typeSelect: {},
                    filterArray: []
                };


                scope.initFilterArrayElement = function () {
                    //get Filter array element:
                    var allFilterArray = filterControlCtrl[1].getDataColumnDisplay();
                    scope.data.filterArray.length = 0;
                    var isHasCriterial = false;

                    $.each(allFilterArray, function (_k, _v) {
                        var _dataDisplay, _isSelect, _isText, _isDataRange, _optionForDateRange, _filterType;
                        // check elem xem co duoc show default hay khong
                        if (_v.filterChecked == false && !(_v.defaultCriteria == true))
                            _dataDisplay = 'none';
                        else
                            _dataDisplay = 'inline';


                        // check xem kieu gi
                        _isText = false;
                        _isSelect = false;
                        _isDataRange = false;

                        _optionForDateRange = null;

                        if (_v.filterType == 'text' || _v.filterType == '') {
                            _filterType = 'text';
                            _isText = true;
                        } else if (_v.filterType == 'select') {
                            _filterType = 'select';
                            _isSelect = true;
                            scope.data.typeSelect[_v.columnId] = {
                                label: 'Please Select..',
                                value: ''
                            };
                        } else if (_v.filterType == 'dateRange') {
                            _filterType = 'dateRange';
                            _isDataRange = true;
                            scope.data.typeDateRange[_v.columnId] = {
                                startDate: moment().subtract(6, 'days'),
                                endDate: moment()
                            };
                            _optionForDateRange = {
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

                                        var newValue = scope.data.typeDateRange[_v.columnId], start, _startMonth, _startDate, end, _endtMonth, _endDate;

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
                                        filterControlCtrl[1].addDataSeach({
                                            columnId: _v.columnId,
                                            searchValue: start + '/' + end
                                        });
                                        filterControlCtrl[1].filterColumn();
                                    }
                                }
                            };
                        }

                        var _className = 'normalElem';
                        if (_v.isCriteria === true) {
                            _className = 'criteriaElem';
                            isHasCriterial = true;
                        }
                        // init data element
                        var _currentDataElem = {
                            columnId: _v.columnId,
                            dataDisplay: _dataDisplay,
                            filterType: _filterType,
                            name: _v.name,
                            dataHide: {
                                text: !_isText,
                                select: !_isSelect,
                                dateRange: !_isDataRange
                            },
                            dataSelect: (_v.dataSelect),
                            opt: _optionForDateRange,
                            class: _className,
                            isCriterial: isHasCriterial
                        };

                        scope.data.filterArray.push(_currentDataElem);

                        if (_v.isCriteria === true)
                            return true;

                        /*Add element for filter button*/
                        var ele = {name: _v.name, checked: _v.filterChecked, id: _v.columnId};
                        filterControlCtrl[0].addItem(ele);


                    });
                };
                scope.initFilterArrayElement();

                //active tooltip text:
                //$(document).ready(function () {
                //    var tooltipFilter = $('[tooltipFilter="izTooltipFilter"]');
                //    var _text = 'Exactly: "data" </br>First: ^data </br>More/Less: >data </br>Equal: =data';
                //    //_text = _text.replace("\\", "");
                //    tooltipFilter.qtip({ // Grab some elements to apply the tooltip to
                //        content: {
                //            text: _text
                //        },
                //        style: {classes: 'qtip-bootstrap myCustomClass'}
                //    });
                //});

                /*Function to filter data*/
                scope.filterData = function (event, columnId, type) {
                    if (type == 'select') {
                        //console.log(scope.data.typeSelect[columnId]);
                        if (scope.data.typeSelect[columnId].value == -1)
                            return;
                        filterControlCtrl[1].addDataSeach({
                            columnId: columnId,
                            searchValue: scope.data.typeSelect[columnId].value
                        });
                        filterControlCtrl[1].filterColumn();
                    } else if (type == 'text') {
                        if (event.keyCode == 13) {
                            filterControlCtrl[1].filterColumn();
                        } else {
                            filterControlCtrl[1].addDataSeach({
                                columnId: columnId,
                                searchValue: scope.data.typeText[columnId]
                            });
                        }
                    }
                };


            },
            template: _s
        };
    });

    izCrudModule.directive('izFilterAction', function () {
        var _s = '';
        _s += '<div style="top: 10%;" id="myModal" class="modal fade" role="dialog">';
        _s += '<div class="modal-dialog">';
        _s += '<div class="modal-content">';
        _s += '<div class="modal-header">';
        _s += '<button type="button" class="close" data-dismiss="modal" ng-click="dislayColumn()">&times;</button>';
        _s += ' <h4 class="modal-title">Cột hiển thị</h4>';
        _s += '</div>';
        _s += ' <div class="modal-body">';
        _s += '<form role="form">';
        _s += '<div class="form-group">';
        //_s += '<label>Select Column Display</label>';

        _s += '<select style="height: 169px;" class="form-control" name="repeatSelect" id="repeatSelect" ng-model="modal.columnSelect" multiple>';
        _s += ' <option ng-repeat="option in data.availableOptions" value="{{option.columnId}}">{{option.name}}</option>';
        _s += '</select>';
        _s += '</br><strong>Cột được chọn:</strong>';
        _s += '<button ng-repeat="column in modal.columnSelect" type="button" class="btn btn-outline btn-primary btn-xs" style="margin: 3px" ng-click="removeColumn(column)">{{column}}</button> ';
        _s += '</div>';
        _s += '</form>';
        _s += '</div>';
        _s += '<div class="modal-footer">';
        _s += '<button type="button" class="btn btn-default" data-dismiss="modal" ng-click="dislayColumn()">Close</button>';
        _s += '</div>';
        _s += '</div>';
        _s += '</div>';
        _s += '</div>';
        _s += '<div class="col-lg-2">';
        _s += ' <div ng-class="{div200px : supportNewRecord}" class="report-filter-action" style="float: right" data-toggle="tooltip" title="Add/Remove Column">';
        _s += '<a class="btn btn-outline btn-primary" ng-if="supportNewRecord" ng-click="emitEvent()">Tạo Mới <i class="fa fa-pencil-square-o"></i>' +
            ' </a>&nbsp;';
        _s += '<a class="btn btn-outline btn-default" data-toggle="modal" data-target="#myModal">Tùy chọn <i class="fa fa-list"></i></a>';
        _s += '</div>';
        _s += '</div>';
        return {
            require: '^izFilterContainer',
            restrict: 'E',
            controller: ['$scope', function ($scope) {
                $scope.removeColumn = function (col) {
                    var index = $scope.modal.columnSelect.indexOf(col);
                    if (index > -1) {
                        $scope.modal.columnSelect.splice(index, 1);
                    }
                }
            }],
            link: function (scope, element, attrs, izFilterContainerCtrl) {
                //check support new record:
                scope.supportNewRecord = izFilterContainerCtrl.getSupportNewRecord() === 'true';
                scope.crudId = izFilterContainerCtrl.getCrudId();
                scope.emitEvent = function () {
                    console.log('add_new_record_izdatatable' + scope.crudId);
                    scope.$emit('add_new_record_izdatatable' + scope.crudId);
                };
                scope.getDataColumnDisplay = function () {
                    var _parentData = izFilterContainerCtrl.getDataColumnDisplay();
                    var _childData = [];
                    $.each(_parentData, function (_k, _v) {
                        if (_v.show != 'alwayFalse' && !(_v.isCriteria === true))
                            _childData.push(_parentData[_k]);
                    });
                    return _childData;
                };
                scope.data = {
                    availableOptions: scope.getDataColumnDisplay()
                };

                //init selected in modal
                scope.modal = {columnSelect: []};
                $.each(scope.data.availableOptions, function (_k, _v) {
                    if (_v.show == true)
                        scope.modal.columnSelect.push(_v.columnId)
                });

                scope.dislayColumn = function () {
                    izFilterContainerCtrl.displayColumn(scope.modal.columnSelect);
                }

            },
            template: _s
        };
    });

})(angular);
