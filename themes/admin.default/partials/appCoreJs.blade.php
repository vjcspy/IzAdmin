{{--App dependency--}}
<script>
    'use strict';
    var app = angular
            .module('app', [
                @foreach($appDependencies as $depen)
                        '{{$depen['name']}}',
                @endforeach
            ]);
</script>

{{--App Config--}}
<script>
    angular.module('app')
            .constant('_', window._)
            .config(
                    ['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
                        function ($controllerProvider, $compileProvider, $filterProvider, $provide) {

                            // lazy controller, directive and service
                            app.controller = $controllerProvider.register;
                            app.directive = $compileProvider.directive;
                            app.filter = $filterProvider.register;
                            app.factory = $provide.factory;
                            app.service = $provide.service;
                            app.constant = $provide.constant;
                            app.value = $provide.value;
                        }
                    ])
            // .config(['$translateProvider', function ($translateProvider) {
            //     // Register a loader for the static files
            //     // So, the module will search missing translation tables under the specified urls.
            //     // Those urls are [prefix][langKey][suffix].
            //     $translateProvider.useStaticFilesLoader({
            //         prefix: 'i18n/',
            //         suffix: '.js'
            //     });
            //     // Tell the module what language to use by default
            //     $translateProvider.preferredLanguage('en');
            //     // Tell the module to store the language in the local storage
            //     $translateProvider.useLocalStorage();
            // }])
            .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
            }])
            // .config(['flowFactoryProvider', function (flowFactoryProvider) {
            //     flowFactoryProvider.defaults = {
            //         target: 'http://' + window.location.hostname + '/table/article/upload',
            //         permanentErrors: [404, 500, 501],
            //         maxChunkRetries: 0,
            //         chunkRetryInterval: 5000,
            //         simultaneousUploads: 4,
            //         singleFile: true
            //     };
            //     //flowFactoryProvider.on('catchAll', function (event) {
            //     //    console.log('catchAll', arguments);
            //     //});
            //     // Can be used with different implementations of Flow.js
            //     // flowFactoryProvider.factory = fustyFlowFactory;
            // }])
            .config(['$httpProvider', function ($httpProvider) {
                $httpProvider.interceptors.push(function ($q, $injector) {
                    return {
                        'responseError': function (rejection) {
                            // do something on error
                            if (rejection.hasOwnProperty('status') && rejection.status === 401) {
                                $injector.get('toastr').error('Please login !', '');
                                $injector.get('$state').go('access.signin');
                            }
                            /*show error 400*/
                            if (rejection.hasOwnProperty('status') && rejection.status === 400 && rejection.data.mess) {
                                $injector.get('toastr').error(rejection.data.mess, '');
                            }

                            /*server error*/
                            if (rejection.hasOwnProperty('status') && rejection.status === 500) {
                                $injector.get('toastr').error('Server Error!');
                            }
                            /*Listen none valid data*/
                            if (rejection.hasOwnProperty('status') && rejection.status == 422) {
                                $.each(rejection.data, function (k, v) {
                                    $.each(v, function (_k, _v) {
                                        $injector.get('toastr').error(_v);
                                    });
                                });
                            }

                            return $q.reject(rejection);

                        }
                    };
                });
            }])
            .config(function (toastrConfig) {
                angular.extend(toastrConfig, {
                    autoDismiss: false,
                    containerId: 'toast-container',
                    maxOpened: 0,
                    newestOnTop: true,
                    positionClass: 'toast-top-right',
                    preventDuplicates: false,
                    preventOpenDuplicates: false,
                    target: 'body',
                    allowHtml: true,
                    closeButton: false
                    // closeHtml: '<button>&times;</button>',
                    // extendedTimeOut: 1000,
                    // iconClasses: {
                    //   error: 'toast-error',
                    //   info: 'toast-info',
                    //   success: 'toast-success',
                    //   warning: 'toast-warning'
                    // },
                    // messageClass: 'toast-message',
                    // onHidden: null,
                    // onShown: null,
                    // onTap: null,
                    // progressBar: false,
                    // tapToDismiss: true,
                    // templates: {
                    //   toast: 'directives/toast/toast.html',
                    //   progressbar: 'directives/progressbar/progressbar.html'
                    // },
                    // timeOut: 5000,
                    // titleClass: 'toast-title',
                    // toastClass: 'toast'
                });
            });

</script>

{{--App Config lazyload--}}
<script>
    angular.module('app')
            .constant('MODULE_CONFIG', [
                        {
                            name: 'angular-ui-tree',
                            module: true,
                            files: [
                                'modules/themes/admin.default/assets/bower_components/angular-ui-tree/dist/angular-ui-tree.min.js',
                                'modules/themes/admin.default/assets/bower_components/angular-ui-tree/dist/angular-ui-tree.min.css'
                            ]
                        },
                        {
                            name: 'tinymce',
                            module: true,
                            files: [
                                'modules/themes/admin.default/assets/bower_components/tinymce-dist/tinymce.min.js',
                                'modules/themes/admin.default/assets/bower_components/angular-ui-tinymce/src/tinymce.js'
                            ]
                        },
                        {
                            name: 'flow',
                            module: true,
                            files: [
                                '../iz/bower_components/ng-flow/dist/ng-flow-standalone.min.js'
                            ]
                        },
                        {
                            name: 'ui.select',
                            module: true,
                            files: [
                                '../libs/angular/angular-ui-select/dist/select.min.js',
                                '../libs/angular/angular-ui-select/dist/select.min.css'
                            ]
                        }, {
                            name: 'ui.crud.editor',
                            module: true,
                            files: [
                                'modules/themes/admin.default/assets/scripts/directives/crud/ui-crud-editor.js'
                            ]
                        }, {
                            name: 'angular-material-data-table',
                            module: true,
                            files: [
                                'modules/themes/admin.default/assets/bower_components/angular-material-data-table/dist/md-data-table.min.js',
                                'modules/themes/admin.default/assets/bower_components/angular-material-data-table/dist/md-data-table.min.css'
                            ]
                        }, {
                            name: 'daterangepicker',
                            module: true,
                            files: [
                                '../iz/bower_components/bootstrap-daterangepicker/daterangepicker.js',
                                '../iz/bower_components/bootstrap-daterangepicker/daterangepicker.css',
                                '../iz/bower_components/angular-daterangepicker/js/angular-daterangepicker.min.js'
                            ]
                        },
                        {
                            name: 'textAngular',
                            module: true,
                            files: [
                                'modules/themes/admin.default/assets/libs/angular/textAngular/dist/textAngular-sanitize.min.js',
                                'modules/themes/admin.default/assets/libs/angular/textAngular/dist/textAngular.min.js'
                            ]
                        },
                        {
                            name: 'vr.directives.slider',
                            module: true,
                            files: [
                                '../libs/angular/venturocket-angular-slider/build/angular-slider.min.js',
                                '../libs/angular/venturocket-angular-slider/angular-slider.css'
                            ]
                        },
                        {
                            name: 'angularBootstrapNavTree',
                            module: true,
                            files: [
                                'modules/themes/admin.default/assets/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                                'modules/themes/admin.default/assets/libs/angular/angular-bootstrap-nav-tree/dist/abn_tree.css'
                            ]
                        },
                        {
                            name: 'izNavTree',
                            module: true,
                            files: [
                                './scripts/directives/system/configElement.js'
                            ]
                        }, {
                            name: 'adminshop.currency',
                            module: true,
                            files: [
                                './scripts/services/shop/currency.js'
                            ]
                        },
                        {
                            name: 'izFormValidateElem',
                            module: true,
                            files: [
                                './scripts/directives/form/formElement.js'
                            ]
                        },
                        {
                            name: 'angularFileUpload',
                            module: true,
                            files: [
                                '../libs/angular/angular-file-upload/angular-file-upload.js'
                            ]
                        },
                        {
                            name: 'ngImgCrop',
                            module: true,
                            files: [
                                '../libs/angular/ngImgCrop/compile/minified/ng-img-crop.js',
                                '../libs/angular/ngImgCrop/compile/minified/ng-img-crop.css'
                            ]
                        },
                        {
                            name: 'smart-table',
                            module: true,
                            files: [
                                '../libs/angular/angular-smart-table/dist/smart-table.min.js'
                            ]
                        },
                        {
                            name: 'ui.map',
                            module: true,
                            files: [
                                '../libs/angular/angular-ui-map/ui-map.js'
                            ]
                        },
                        {
                            name: 'ngGrid',
                            module: true,
                            files: [
                                '../libs/angular/ng-grid/build/ng-grid.min.js',
                                '../libs/angular/ng-grid/ng-grid.min.css',
                                '../libs/angular/ng-grid/ng-grid.bootstrap.css'
                            ]
                        },
                        {
                            name: 'ui.grid',
                            module: true,
                            files: [
                                '../libs/angular/angular-ui-grid/ui-grid.min.js',
                                '../libs/angular/angular-ui-grid/ui-grid.min.css',
                                '../libs/angular/angular-ui-grid/ui-grid.bootstrap.css'
                            ]
                        },
                        {
                            name: 'xeditable',
                            module: true,
                            files: [
                                'modules/themes/admin.default/assets/libs/angular/angular-xeditable/dist/js/xeditable.min.js',
                                'modules/themes/admin.default/assets/libs/angular/angular-xeditable/dist/css/xeditable.css'
                            ]
                        },
                        {
                            name: 'smart-table',
                            module: true,
                            files: [
                                '../libs/angular/angular-smart-table/dist/smart-table.min.js'
                            ]
                        }, {
                            name: 'ladda',
                            module: true,
                            files: [
                                '../iz/bower_components/ladda/dist/ladda.min.js',
                                '../iz/bower_components/ladda/dist/spin.min.js',
                                '../iz/bower_components/ladda/dist/ladda.min.css',
                                '../iz/bower_components/ladda-angular/dist/ladda-angular.min.js'
                            ]
                        }, {
                            name: 'izFacebook',
                            module: true,
                            files: [
                                './scripts/services/facebook/authentication.js'
                            ]
                        }, {
                            name: 'iz-facebook-api',
                            module: true,
                            files: [
                                './scripts/services/facebook/api.js'
                            ]
                        },
                        {
                            name: 'dataTable',
                            module: false,
                            files: [
                                'modules/themes/admin.default/assets/libs/jquery/datatables/media/js/jquery.dataTables.min.js',
                                'modules/themes/admin.default/assets/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                                //'../iz/bower_components/editorDataTable/dataTables.buttons.min.js',
                                //'../iz/bower_components/editorDataTable/dataTables.select.min.js',
                                //'../iz/bower_components/editorDataTable/dataTables.editor.min.js',
                                //'../iz/bower_components/editorDataTable/dataTables.buttons.min.js',
                                //'../iz/bower_components/editorDataTable/buttons.dataTables.min.css',
                                //'../iz/bower_components/editorDataTable/select.dataTables.min.css',
                                //'../iz/bower_components/editorDataTable/editor.dataTables.min.css',
                                'modules/themes/admin.default/assets/libs/jquery/plugins/integration/bootstrap/3/dataTables.bootstrap.css'
                            ]
                        },
                        {
                            name: 'footable',
                            module: false,
                            files: [
                                '../libs/jquery/footable/dist/footable.all.min.js',
                                '../libs/jquery/footable/css/footable.core.css'
                            ]
                        },
                        {
                            name: 'easyPieChart',
                            module: false,
                            files: [
                                '../libs/jquery/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'
                            ]
                        },
                        {
                            name: 'sparkline',
                            module: false,
                            files: [
                                '../libs/jquery/jquery.sparkline/dist/jquery.sparkline.retina.js'
                            ]
                        },
                        {
                            name: 'plot',
                            module: false,
                            files: [
                                'modules/themes/admin.default/assets/libs/jquery/flot/jquery.flot.js',
                                'modules/themes/admin.default/assets/libs/jquery/flot/jquery.flot.resize.js',
                                'modules/themes/admin.default/assets/libs/jquery/flot/jquery.flot.pie.js',
                                'modules/themes/admin.default/assets/libs/jquery/flot.tooltip/js/jquery.flot.tooltip.min.js',
                                'modules/themes/admin.default/assets/libs/jquery/flot-spline/js/jquery.flot.spline.min.js',
                                'modules/themes/admin.default/assets/libs/jquery/flot.orderbars/js/jquery.flot.orderBars.js'
                            ]
                        },
                        {
                            name: 'vectorMap',
                            module: false,
                            files: [
                                'modules/themes/admin.default/assets/libs/jquery/bower-jvectormap/jquery-jvectormap-1.2.2.min.js',
                                'modules/themes/admin.default/assets/libs/jquery/bower-jvectormap/jquery-jvectormap.css',
                                'modules/themes/admin.default/assets/libs/jquery/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                                'modules/themes/admin.default/assets/libs/jquery/bower-jvectormap/jquery-jvectormap-us-aea-en.js'
                            ]
                        },
                        {
                            name: 'moment',
                            module: false,
                            files: [
                                '../libs/jquery/moment/moment.js'
                            ]
                        }
                    ]
            )
            .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function ($ocLazyLoadProvider, MODULE_CONFIG) {
                $ocLazyLoadProvider.config({
                    debug: false,
                    events: false,
                    modules: MODULE_CONFIG
                });
            }]);
</script>

{{--App Config Router--}}
<script>
    angular.module('app')
            .run(
                    ['$rootScope', '$state', '$stateParams',
                        function ($rootScope, $state, $stateParams) {
                            $rootScope.$state = $state;
                            $rootScope.$stateParams = $stateParams;
                        }
                    ]
            )
            .config(
                    ['$stateProvider', '$urlRouterProvider', 'MODULE_CONFIG',
                        function ($stateProvider, $urlRouterProvider, MODULE_CONFIG) {
                            $urlRouterProvider
                                    .otherwise('/app/dashboard');
                            $stateProvider
                                    .state('app', {
                                        abstract: true,
                                        url: '/app',
                                        views: {
                                            '': {
                                                templateUrl: 'modules/themes/admin.default/assets/views/layout.html'
                                            },
                                            'aside': {
                                                templateUrl: 'modules/themes/admin.default/assets/views/aside.html'
                                            },
                                            'content': {
                                                templateUrl: 'modules/themes/admin.default/assets/views/content.html'
                                            }
                                        },
                                        resolve: {
                                            authenticate: function ($q, IzSentinel, $state) {
                                                var defer = $q.defer();
                                                IzSentinel.authenticate().then(function (isLogged) {
                                                    if (!isLogged)
                                                        return $state.go('access.signin');
                                                    else
                                                        return defer.resolve(true);
                                                });
                                                return defer.promise;
                                            }
                                        }
                                    })
                                    .state('app.test', {
                                        url: '/test',
                                        template: "<div>Hello</div>"
                                    })
                                    .state('app.dashboard', {
                                        url: '/dashboard',
                                        templateUrl: 'modules/themes/admin.default/assets/views/pages/dashboard.html',
                                        data: {title: 'Dashboard', folded: true},
                                        resolve: {
                                            deps: load([
                                                'modules/themes/admin.default/assets/scripts/controllers/chart.js',
                                                'modules/themes/admin.default/assets/scripts/controllers/vectormap.js'
                                            ]).deps
                                        }
                                    })
                                    .state('app.analysis', {
                                        url: '/analysis',
                                        templateUrl: 'views/pages/dashboard.analysis.html',
                                        data: {title: 'Analysis'},
                                        controller: 'analysisCtrl',
                                        resolve: {
                                            analysisDataSv: function ($http, urlManagement) {
                                                return $http({
                                                    method: 'POST',
                                                    url: urlManagement.getUrlByKey('dashboard') + '/analysis-data'
                                                }).then(function (response) {
                                                    return response;
                                                }, function (reject) {
                                                    return reject;
                                                });
                                            },
                                            deps: load(['moment', 'daterangepicker', 'scripts/controllers/shop/dashboard/analysis.js', 'scripts/controllers/chart.js', 'scripts/controllers/vectormap.js']).deps
                                        }
                                    })
                                    .state('app.wall', {
                                        url: '/wall',
                                        templateUrl: 'views/pages/dashboard.wall.html',
                                        data: {title: 'Wall', folded: true}
                                    })
                                    .state('app.todo', {
                                        url: '/todo',
                                        templateUrl: 'apps/todo/todo.html',
                                        data: {title: 'Todo', theme: {primary: 'indigo-800'}},
                                        controller: 'TodoCtrl',
                                        resolve: load('apps/todo/todo.js')
                                    })
                                    .state('app.todo.list', {
                                        url: '/{fold}'
                                    })
                                    .state('app.note', {
                                        url: '/note',
                                        templateUrl: 'apps/note/main.html',
                                        data: {theme: {primary: 'blue-grey'}}
                                    })
                                    .state('app.note.list', {
                                        url: '/list',
                                        templateUrl: 'apps/note/list.html',
                                        data: {title: 'Note'},
                                        controller: 'NoteCtrl',
                                        resolve: load(['apps/note/note.js', 'moment'])
                                    })
                                    .state('app.note.item', {
                                        url: '/{id}',
                                        views: {
                                            '': {
                                                templateUrl: 'apps/note/item.html',
                                                controller: 'NoteItemCtrl',
                                                resolve: load(['apps/note/note.js', 'moment'])
                                            },
                                            'navbar@': {
                                                templateUrl: 'apps/note/navbar.html',
                                                controller: 'NoteItemCtrl'
                                            }
                                        },
                                        data: {title: '', child: true}
                                    })
                                    .state('app.inbox', {
                                        url: '/inbox',
                                        templateUrl: 'apps/inbox/inbox.html',
                                        data: {title: 'Inbox', folded: true},
                                        resolve: load(['apps/inbox/inbox.js', 'moment'])
                                    })
                                    .state('app.inbox.list', {
                                        url: '/inbox/{fold}',
                                        templateUrl: 'apps/inbox/list.html'
                                    })
                                    .state('app.inbox.detail', {
                                        url: '/{id:[0-9]{1,4}}',
                                        templateUrl: 'apps/inbox/detail.html'
                                    })
                                    .state('app.inbox.compose', {
                                        url: '/compose',
                                        templateUrl: 'apps/inbox/new.html',
                                        resolve: load(['textAngular', 'ui.select'])
                                    })
                                    .state('ui', {
                                        url: '/ui',
                                        abstract: true,
                                        views: {
                                            '': {
                                                templateUrl: 'views/layout.html'
                                            },
                                            'aside': {
                                                templateUrl: 'views/aside.html'
                                            },
                                            'content': {
                                                templateUrl: 'views/content.html'
                                            }
                                        }
                                    })
                                    // components router
                                    .state('ui.component', {
                                        url: '/component',
                                        abstract: true,
                                        template: '<div ui-view></div>'
                                    })
                                    .state('ui.component.arrow', {
                                        url: '/arrow',
                                        templateUrl: 'views/ui/component/arrow.html',
                                        data: {title: 'Arrows'}
                                    })
                                    .state('ui.component.badge-label', {
                                        url: '/badge-label',
                                        templateUrl: 'views/ui/component/badge-label.html',
                                        data: {title: 'Badges & Labels'}
                                    })
                                    .state('ui.component.button', {
                                        url: '/button',
                                        templateUrl: 'views/ui/component/button.html',
                                        data: {title: 'Buttons'}
                                    })
                                    .state('ui.component.color', {
                                        url: '/color',
                                        templateUrl: 'views/ui/component/color.html',
                                        data: {title: 'Colors'}
                                    })
                                    .state('ui.component.grid', {
                                        url: '/grid',
                                        templateUrl: 'views/ui/component/grid.html',
                                        data: {title: 'Grids'}
                                    })
                                    .state('ui.component.icon', {
                                        url: '/icons',
                                        templateUrl: 'views/ui/component/icon.html',
                                        data: {title: 'Icons'}
                                    })
                                    .state('ui.component.list', {
                                        url: '/list',
                                        templateUrl: 'views/ui/component/list.html',
                                        data: {title: 'Lists'}
                                    })
                                    .state('ui.component.nav', {
                                        url: '/nav',
                                        templateUrl: 'views/ui/component/nav.html',
                                        data: {title: 'Navs'}
                                    })
                                    .state('ui.component.progressbar', {
                                        url: '/progressbar',
                                        templateUrl: 'views/ui/component/progressbar.html',
                                        data: {title: 'Progressbars'}
                                    })
                                    .state('ui.component.streamline', {
                                        url: '/streamline',
                                        templateUrl: 'views/ui/component/streamline.html',
                                        data: {title: 'Streamlines'}
                                    })
                                    .state('ui.component.timeline', {
                                        url: '/timeline',
                                        templateUrl: 'views/ui/component/timeline.html',
                                        data: {title: 'Timelines'}
                                    })
                                    .state('ui.component.uibootstrap', {
                                        url: '/uibootstrap',
                                        templateUrl: 'views/ui/component/uibootstrap.html',
                                        resolve: load('scripts/controllers/bootstrap.js'),
                                        data: {title: 'UI Bootstrap'}
                                    })
                                    // material routers
                                    .state('ui.material', {
                                        url: '/material',
                                        template: '<div ui-view></div>',
                                        resolve: load('scripts/controllers/material.js')
                                    })
                                    .state('ui.material.button', {
                                        url: '/button',
                                        templateUrl: 'views/ui/material/button.html',
                                        data: {title: 'Buttons'}
                                    })
                                    .state('ui.material.color', {
                                        url: '/color',
                                        templateUrl: 'views/ui/material/color.html',
                                        data: {title: 'Colors'}
                                    })
                                    .state('ui.material.icon', {
                                        url: '/icon',
                                        templateUrl: 'views/ui/material/icon.html',
                                        data: {title: 'Icons'}
                                    })
                                    .state('ui.material.card', {
                                        url: '/card',
                                        templateUrl: 'views/ui/material/card.html',
                                        data: {title: 'Card'}
                                    })
                                    .state('ui.material.form', {
                                        url: '/form',
                                        templateUrl: 'views/ui/material/form.html',
                                        data: {title: 'Form'}
                                    })
                                    .state('ui.material.list', {
                                        url: '/list',
                                        templateUrl: 'views/ui/material/list.html',
                                        data: {title: 'List'}
                                    })
                                    .state('ui.material.ngmaterial', {
                                        url: '/ngmaterial',
                                        templateUrl: 'views/ui/material/ngmaterial.html',
                                        data: {title: 'NG Material'}
                                    })
                                    // form routers
                                    .state('ui.form', {
                                        url: '/form',
                                        template: '<div ui-view></div>'
                                    })
                                    .state('ui.form.layout', {
                                        url: '/layout',
                                        templateUrl: 'views/ui/form/layout.html',
                                        data: {title: 'Layouts'}
                                    })
                                    .state('ui.form.element', {
                                        url: '/element',
                                        templateUrl: 'views/ui/form/element.html',
                                        data: {title: 'Elements'}
                                    })
                                    .state('ui.form.validation', {
                                        url: '/validation',
                                        templateUrl: 'views/ui/form/validation.html',
                                        data: {title: 'Validations'}
                                    })
                                    .state('ui.form.select', {
                                        url: '/select',
                                        templateUrl: 'views/ui/form/select.html',
                                        data: {title: 'Selects'},
                                        controller: 'SelectCtrl',
                                        resolve: load(['ui.select', 'scripts/controllers/select.js'])
                                    })
                                    .state('ui.form.editor', {
                                        url: '/editor',
                                        templateUrl: 'views/ui/form/editor.html',
                                        data: {title: 'Editor'},
                                        controller: 'EditorCtrl',
                                        resolve: load(['textAngular', 'scripts/controllers/editor.js'])
                                    })
                                    .state('ui.form.slider', {
                                        url: '/slider',
                                        templateUrl: 'views/ui/form/slider.html',
                                        data: {title: 'Slider'},
                                        controller: 'SliderCtrl',
                                        resolve: load('scripts/controllers/slider.js')
                                    })
                                    .state('ui.form.tree', {
                                        url: '/tree',
                                        templateUrl: 'views/ui/form/tree.html',
                                        data: {title: 'Tree'},
                                        controller: 'TreeCtrl',
                                        resolve: load('scripts/controllers/tree.js')
                                    })
                                    .state('ui.form.file-upload', {
                                        url: '/file-upload',
                                        templateUrl: 'views/ui/form/file-upload.html',
                                        data: {title: 'File upload'},
                                        controller: 'UploadCtrl',
                                        resolve: load(['angularFileUpload', 'scripts/controllers/upload.js'])
                                    })
                                    .state('ui.form.image-crop', {
                                        url: '/image-crop',
                                        templateUrl: 'views/ui/form/image-crop.html',
                                        data: {title: 'Image Crop'},
                                        controller: 'ImgCropCtrl',
                                        resolve: load(['ngImgCrop', 'scripts/controllers/imgcrop.js'])
                                    })
                                    .state('ui.form.editable', {
                                        url: '/editable',
                                        templateUrl: 'views/ui/form/xeditable.html',
                                        data: {title: 'Xeditable'},
                                        controller: 'XeditableCtrl',
                                        resolve: load(['xeditable', 'scripts/controllers/xeditable.js'])
                                    })
                                    // table routers
                                    .state('ui.table', {
                                        url: '/table',
                                        template: '<div ui-view></div>'
                                    })
                                    .state('ui.table.static', {
                                        url: '/static',
                                        templateUrl: 'views/ui/table/static.html',
                                        data: {title: 'Static', theme: {primary: 'blue'}}
                                    })
                                    .state('ui.table.smart', {
                                        url: '/smart',
                                        templateUrl: 'views/ui/table/smart.html',
                                        data: {title: 'Smart'},
                                        controller: 'TableCtrl',
                                        resolve: load(['smart-table', 'scripts/controllers/table.js'])
                                    })
                                    .state('ui.table.datatable', {
                                        url: '/datatable',
                                        data: {title: 'Datatable'},
                                        templateUrl: 'views/ui/table/datatable.html'
                                    })
                                    .state('ui.table.footable', {
                                        url: '/footable',
                                        data: {title: 'Footable'},
                                        templateUrl: 'views/ui/table/footable.html'
                                    })
                                    .state('ui.table.nggrid', {
                                        url: '/nggrid',
                                        templateUrl: 'views/ui/table/nggrid.html',
                                        data: {title: 'NG Grid'},
                                        controller: 'NGGridCtrl',
                                        resolve: load(['ngGrid', 'scripts/controllers/nggrid.js'])
                                    })
                                    .state('ui.table.uigrid', {
                                        url: '/uigrid',
                                        templateUrl: 'views/ui/table/uigrid.html',
                                        data: {title: 'UI Grid'},
                                        controller: "UiGridCtrl",
                                        resolve: load(['ui.grid', 'scripts/controllers/uigrid.js'])
                                    })
                                    .state('ui.table.editable', {
                                        url: '/editable',
                                        templateUrl: 'views/ui/table/editable.html',
                                        data: {title: 'Editable'},
                                        controller: 'XeditableCtrl',
                                        resolve: load(['xeditable', 'scripts/controllers/xeditable.js'])
                                    })
                                    // chart
                                    .state('ui.chart', {
                                        url: '/chart',
                                        templateUrl: 'views/ui/chart/chart.html',
                                        data: {title: 'Charts'},
                                        resolve: load('scripts/controllers/chart.js')
                                    })
                                    // map routers
                                    .state('ui.map', {
                                        url: '/map',
                                        template: '<div ui-view></div>'
                                    })
                                    .state('ui.map.google', {
                                        url: '/google',
                                        templateUrl: 'views/ui/map/google.html',
                                        data: {title: 'Gmap'},
                                        controller: 'GoogleMapCtrl',
                                        resolve: load(['ui.map', 'scripts/controllers/load-google-maps.js', 'scripts/controllers/googlemap.js'], function () {
                                            return loadGoogleMaps();
                                        })
                                    })
                                    .state('ui.map.vector', {
                                        url: '/vector',
                                        templateUrl: 'views/ui/map/vector.html',
                                        data: {title: 'Vector'},
                                        controller: 'VectorMapCtrl',
                                        resolve: load('scripts/controllers/vectormap.js')
                                    })

                                    .state('page', {
                                        url: '/page',
                                        views: {
                                            '': {
                                                templateUrl: 'views/layout.html'
                                            },
                                            'aside': {
                                                templateUrl: 'views/aside.html'
                                            },
                                            'content': {
                                                templateUrl: 'views/content.html'
                                            }
                                        }
                                    })
                                    .state('page.profile', {
                                        url: '/profile',
                                        templateUrl: 'views/pages/profile.html',
                                        data: {title: 'Profile', theme: {primary: 'green'}}
                                    })
                                    .state('page.settings', {
                                        url: '/settings',
                                        templateUrl: 'views/pages/settings.html',
                                        data: {title: 'Settings'}
                                    })
                                    .state('page.blank', {
                                        url: '/blank',
                                        templateUrl: 'views/pages/blank.html',
                                        data: {title: 'Blank'}
                                    })
                                    .state('page.document', {
                                        url: '/document',
                                        templateUrl: 'views/pages/document.html',
                                        data: {title: 'Document'}
                                    })
                                    .state('404', {
                                        url: '/404',
                                        templateUrl: 'views/pages/404.html'
                                    })
                                    .state('505', {
                                        url: '/505',
                                        templateUrl: 'views/pages/505.html'
                                    })
                                    .state('access', {
                                        url: '/access',
                                        template: '<div class="indigo bg-big"><div ui-view class="fade-in-down smooth"></div></div>'
                                    })
                                    .state('access.signin', {
                                        url: '/signin',
                                        templateUrl: 'modules/themes/admin.default/assets/views/pages/signin.html',
                                        resolve: {
                                            checkLogin: function (IzSentinel, $state) {
                                                if (IzSentinel.isLogged()) {
                                                    $state.go('app.dashboard');
                                                } else
                                                    return true;
                                            },
                                            deps: load('modules/themes/admin.default/assets/scripts/controllers/account/auth.js').deps
                                        },
                                        controller: 'accountAuth'
                                    })
                                    .state('access.signup', {
                                        url: '/signup',
                                        data: {user: {name: null, email: null, password: null}},
                                        templateUrl: 'modules/themes/admin.default/assets/views/pages/signup.html',
                                        resolve: {
                                            checkLogin: function (IzSentinel, $state) {
                                                if (IzSentinel.isLogged()) {
                                                    $state.go('app.dashboard');
                                                } else
                                                    return true;
                                            },
                                            deps: load('modules/themes/admin.default/assets/scripts/controllers/account/auth.js').deps
                                        },
                                        controller: 'accountAuth'
                                    })
                                    .state('access.forgot-password', {
                                        url: '/forgot-password',
                                        templateUrl: 'modules/themes/admin.default/assets/views/pages/forgot-password.html',
                                        resolve: {
                                            checkLogin: function (IzSentinel, $state) {
                                                if (IzSentinel.isLogged()) {
                                                    $state.go('app.dashboard');
                                                } else
                                                    return true;
                                            },
                                            deps: load('modules/themes/admin.default/assets/scripts/controllers/account/auth.js').deps
                                        },
                                        controller: 'accountAuth'
                                    })
                                    .state('access.lockme', {
                                        url: '/lockme',
                                        templateUrl: 'modules/themes/admin.default/assets/views/pages/lockme.html',
                                        resolve: {
                                            checkLogin: function (IzSentinel, $state) {
                                                if (IzSentinel.isLogged()) {
                                                    $state.go('app.dashboard');
                                                } else
                                                    return true;
                                            },
                                            deps: load('modules/themes/admin.default/assets/scripts/controllers/account/auth.js').deps
                                        },
                                        controller: 'accountAuth'
                                    })
                                    // product routers
                                    .state('product', {
                                        url: '/product',
                                        abstract: true,
                                        views: {
                                            '': {
                                                templateUrl: 'views/layout.html'
                                            },
                                            'aside': {
                                                templateUrl: 'views/aside.html'
                                            },
                                            'content': {
                                                templateUrl: 'views/content.html',
                                                controller: function ($scope, getUser) {
                                                    $scope.user.email = getUser.data.email;
                                                    $scope.user.first_name = getUser.data.first_name == null ? '' : getUser.data.first_name;
                                                    $scope.user.last_name = getUser.data.last_name == null ? '' : getUser.data.last_name;
                                                    $scope.user.name = $scope.user.first_name + ' ' + $scope.user.last_name;
                                                }
                                            }
                                        },
                                        resolve: {
                                            getUser: function ($http, urlManagement) {
                                                return $http({
                                                    method: 'GET',
                                                    url: urlManagement.getUrlByKey('auth_account') + '/user'
                                                }).then(function (response) {
                                                    return response;
                                                }, function (reject) {
                                                    return reject;
                                                });
                                            }
                                        }
                                    })
                                    .state('product.crud', {
                                        url: '/crud',
                                        data: {title: 'Sản phẩm'},
                                        resolve: {
                                            deps: load('scripts/controllers/shop/product/crud.js').deps,
                                            loadCurrency: function (currencyData, $q) {
                                                var defer = $q.defer();
                                                currencyData.defer(defer);
                                                return defer.promise;
                                                //return currencyData.notDefer;
                                            }
                                        },
                                        controller: 'ProductCrudCtrl',
                                        templateUrl: 'views/shop/product/product.html'
                                    })
                                    .state('product.warehouse', {
                                        url: '/warehouse',
                                        data: {title: 'Nhập kho sản phẩm'},
                                        resolve: {
                                            deps: load(['xeditable', 'scripts/controllers/shop/product/warehouse.js', 'scripts/controllers/shop/product/crud.js']).deps,
                                            loadCurrency: function (currencyData, $q) {
                                                var defer = $q.defer();
                                                currencyData.defer(defer);
                                                return defer.promise;
                                                //return currencyData.notDefer;
                                            }
                                        },
                                        controller: 'WarehouseCtrl',
                                        templateUrl: 'views/shop/product/warehouse.html'
                                    })
                                    // customer routers
                                    .state('customer', {
                                        url: '/customer',
                                        abstract: true,
                                        views: {
                                            '': {
                                                templateUrl: 'views/layout.html'
                                            },
                                            'aside': {
                                                templateUrl: 'views/aside.html'
                                            },
                                            'content': {
                                                templateUrl: 'views/content.html',
                                                controller: function ($scope, getUser) {
                                                    $scope.user.email = getUser.data.email;
                                                    $scope.user.first_name = getUser.data.first_name == null ? '' : getUser.data.first_name;
                                                    $scope.user.last_name = getUser.data.last_name == null ? '' : getUser.data.last_name;
                                                    $scope.user.name = $scope.user.first_name + ' ' + $scope.user.last_name;
                                                }
                                            }
                                        },
                                        resolve: {
                                            getUser: function ($http, urlManagement) {
                                                return $http({
                                                    method: 'GET',
                                                    url: urlManagement.getUrlByKey('auth_account') + '/user'
                                                }).then(function (response) {
                                                    return response;
                                                }, function (reject) {
                                                    return reject;
                                                });
                                            }
                                        }
                                    })
                                    .state('customer.crud', {
                                        url: '/crud',
                                        data: {title: 'Khách hàng'},
                                        resolve: {
                                            deps: load('scripts/controllers/shop/customer/crud.js').deps
                                        },
                                        controller: 'CustomerCrudCtrl',
                                        templateUrl: 'views/shop/customer/customer.html'
                                    })

                                    // sales routers
                                    .state('sales', {
                                        url: '/sales',
                                        abstract: true,
                                        views: {
                                            '': {
                                                templateUrl: 'views/layout.html'
                                            },
                                            'aside': {
                                                templateUrl: 'views/aside.html'
                                            },
                                            'content': {
                                                templateUrl: 'views/content.html',
                                                controller: function ($scope, getUser) {
                                                    $scope.user.email = getUser.data.email;
                                                    $scope.user.first_name = getUser.data.first_name == null ? '' : getUser.data.first_name;
                                                    $scope.user.last_name = getUser.data.last_name == null ? '' : getUser.data.last_name;
                                                    $scope.user.name = $scope.user.first_name + ' ' + $scope.user.last_name;
                                                }
                                            }
                                        },
                                        resolve: {
                                            getUser: function ($http, urlManagement) {
                                                return $http({
                                                    method: 'GET',
                                                    url: urlManagement.getUrlByKey('auth_account') + '/user'
                                                }).then(function (response) {
                                                    return response;
                                                }, function (reject) {
                                                    return reject;
                                                });
                                            },
                                            loadCurrency: function (currencyData, $q) {
                                                var defer = $q.defer();
                                                currencyData.defer(defer);
                                                return defer.promise;
                                                //return currencyData.notDefer;
                                            }
                                        }
                                    })
                                    .state('sales.createorder', {
                                        url: '/createorder',
                                        data: {title: 'Tạo Đơn Hàng'},
                                        resolve: {
                                            deps: load(['ui.select', 'xeditable', 'scripts/controllers/shop/order/createOrder.js', 'scripts/controllers/shop/product/crud.js']).deps,
                                            customer: function ($http, urlManagement) {
                                                return $http({
                                                    method: 'GET',
                                                    url: urlManagement.getUrlByKey('restful_admin_shop_customer')
                                                })
                                                        .then(function (data) {
                                                            return data;
                                                        }, function (reject) {
                                                            return reject;
                                                        });
                                            }
                                        },
                                        controller: 'OrderCreateCtrl',
                                        templateUrl: 'views/shop/order/createOrder.html'
                                    })
                                    .state('sales.vieworder', {
                                        url: '/vieworder',
                                        data: {title: 'Xem Đơn Hàng'},
                                        resolve: {
                                            deps: load(['moment', 'daterangepicker', 'scripts/controllers/shop/order/crud.js']).deps
                                        },
                                        controller: 'OrderCrudCtrl',
                                        templateUrl: 'views/shop/order/order.html'
                                    })
                                    .state('sales.detail', {
                                        url: '/detail/:orderId',
                                        data: {
                                            title: 'Chi tiết đơn hàng'
                                        },
                                        resolve: {
                                            deps: load(['scripts/controllers/shop/order/viewDetailOrder.js']).deps,
                                            orderDetail: function ($http, urlManagement, $stateParams, $state, toastr) {
                                                if ($stateParams.orderId == '' || $stateParams.orderId == null) {
                                                    toastr.error('Not Found Order ID', 'Error');
                                                    $state.transitionTo('sales.vieworder');
                                                    return false;
                                                } else
                                                    return $http({
                                                        method: 'GET',
                                                        url: urlManagement.getUrlByKey('restful_admin_shop_order') + '/' + $stateParams.orderId
                                                    })
                                                            .then(function (data) {
                                                                return data;
                                                            }, function (reject) {
                                                                console.log('Error: No query results for model because product in order has been delete!');
                                                                toastr.error(reject.data.mess);
                                                                return reject;
                                                            });
                                            }
                                        },
                                        controller: 'OrderViewDetailCtrl',
                                        templateUrl: 'views/shop/order/viewOrderDetail.html'
                                    })
                                    .state('sales.detail.shipping', {
                                        url: '/shipping',
                                        data: {
                                            title: 'Vận chuyển'
                                        },
                                        resolve: {
                                            deps: load(['scripts/controllers/shop/order/shipping.js', 'xeditable']).deps
                                        },
                                        controller: 'OrderShippingCtrl',
                                        templateUrl: 'views/shop/order/orderShipping.html'
                                    })
                                    .state('sales.detail.refund', {
                                        url: '/refund',
                                        data: {
                                            title: 'Refund'
                                        },
                                        resolve: {
                                            deps: load(['scripts/controllers/shop/order/refund.js', 'xeditable']).deps
                                        },
                                        controller: 'OrderRefundCtrl',
                                        templateUrl: 'views/shop/order/orderRefund.html'
                                    })

                                    // state setting
                                    .state('system', {
                                        url: '/system',
                                        abstract: true,
                                        views: {
                                            '': {
                                                templateUrl: 'views/layout.html'
                                            },
                                            'aside': {
                                                templateUrl: 'views/aside.html'
                                            },
                                            'content': {
                                                templateUrl: 'views/content.html'
                                            }
                                        },
                                        resolve: load(['izFacebook'])
                                    })
                                    .state('system.control', {
                                        url: '/control',
                                        templateUrl: 'views/system/control.html',
                                        data: {title: 'System Control'},
                                        controller: "SystemControlCtrl",
                                        resolve: load(['ui.grid', 'scripts/controllers/system/control.js'])
                                    })
                                    .state('system.facebook', {
                                        url: '/facebook',
                                        templateUrl: 'views/facebook/control.html',
                                        data: {title: 'Tương tác Facebook'},
                                        controller: "FacebookControlCtrl",
                                        resolve: {
                                            deps: load(['ui.grid', 'iz-facebook-api', 'scripts/controllers/facebook/control.js']).deps
                                        }
                                    })
                                    .state('system.currency', {
                                        url: '/currency',
                                        templateUrl: 'views/shop/currency/currency.html',
                                        data: {title: 'Thêm loại tiền tệ'},
                                        controller: "CurrencyCrudCtrl",
                                        resolve: {
                                            deps: load(['xeditable', 'scripts/controllers/shop/currency/crud.js']).deps,
                                            currencyDataFromSv: function ($http, urlManagement, $stateParams, $state, toastr) {
                                                return $http({
                                                    method: 'GET',
                                                    url: urlManagement.getUrlByKey('restful_admin_shop_currency')
                                                })
                                                        .then(function (data) {
                                                            return data;
                                                        }, function (reject) {
                                                            toastr.error(reject.data.mess);
                                                            return reject;
                                                        });
                                            }
                                        }
                                    })
                                    .state('system.blog', {
                                        url: '/blog',
                                        template: '<div ui-view></div>',
                                        data: {title: 'System', folded: true},
                                        resolve: {
                                            blogConfigData: function ($http, urlManagement) {
                                                return $http({method: 'GET', url: urlManagement.getUrlByKey('restful_config')})
                                                        .then(function (data) {
                                                            return data;
                                                        });
                                            }
                                        },
                                        controller: function ($scope, blogConfigData) {
                                            // System.blog là controller cha. Chỉ có nhiệm vụ là thêm 1 cái template trống vào để mục đích cho thằng con hiển thị vào đấy
                                            // Khi đi qua thằng router cha này, thì nó load cái blogConfigData ở resolve và inject nó vào controller như là 1 object. Từ đó nó được thừa kế.
                                            $scope.blogConfigData = blogConfigData;
                                        }
                                    })
                                    .state('system.blog.config', {
                                        url: '/config',
                                        templateUrl: 'views/system/blog/site.html',
                                        data: {title: 'Blog Configuration'},
                                        controller: 'BlogCtrl',
                                        resolve: {
                                            deps: load('scripts/controllers/system/blog.js').deps
                                        }
                                    })
                            ;


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
                    ]
            )
            .config(['flowFactoryProvider', function (flowFactoryProvider) {
                flowFactoryProvider.defaults = {
                    target: 'http://' + window.location.hostname + '/izblog/articletable/upload',
                    permanentErrors: [404, 500, 501],
                    maxChunkRetries: 0,
                    chunkRetryInterval: 5000,
                    simultaneousUploads: 4,
                    singleFile: true
                }
            }
            ]);

</script>

{{--App Core Controller--}}
<script>
    angular.module('app')
            .controller('AppCtrl', [
                '$scope', '$translate', '$localStorage', '$window', '$document', '$location', '$rootScope', '$timeout',
                '$mdSidenav', '$mdColorPalette', '$anchorScroll', 'IzAdminConfigService', 'IzSentinel',
                function ($scope, $translate, $localStorage, $window, $document, $location, $rootScope, $timeout, $mdSidenav, $mdColorPalette,
                          $anchorScroll, IzAdminConfigService, IzSentinel) {
                    // add 'ie' classes to html
                    var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
                    isIE && angular.element($window.document.body).addClass('ie');
                    isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
                    // config
                    $scope.app = {
                        name: IzAdminConfigService.getConfig('appName'),
                        version: '1.0.2',
                        // for chart colors
                        color: {
                            primary: '#3f51b5',
                            info: '#2196f3',
                            success: '#4caf50',
                            warning: '#ffc107',
                            danger: '#f44336',
                            accent: '#7e57c2',
                            white: '#ffffff',
                            light: '#f1f2f3',
                            dark: '#475069'
                        },
                        setting: {
                            theme: {
                                primary: 'indigo',
                                accent: 'purple',
                                warn: 'amber'
                            },
                            asideFolded: true
                        },
                        search: {
                            content: '',
                            show: false
                        },
                        navShow: {
                            changeVersion: false
                        }
                    };

                    $scope.user = {
                        email: '',
                        name: '',
                        password: ''
                    };

                    $scope.IzAdminConfigService = IzAdminConfigService;
                    $scope.IzSentinel = IzSentinel;

                    $scope.setTheme = function (theme) {
                        $scope.app.setting.theme = theme;
                    };

                    // save settings to local storage
                    if (angular.isDefined($localStorage.appSetting)) {
                        $scope.app.setting = $localStorage.appSetting;
                    } else {
                        $localStorage.appSetting = $scope.app.setting;
                    }
                    $scope.$watch('app.setting', function () {
                        $localStorage.appSetting = $scope.app.setting;
                    }, true);

                    // angular translate
                    $scope.langs = {en: 'English', zh_CN: '中文'};
                    $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
                    $scope.setLang = function (langKey) {
                        // set the current lang
                        $scope.selectLang = $scope.langs[langKey];
                        // You can change the language during runtime
                        $translate.use(langKey);
                    };

                    function isSmartDevice($window) {
                        // Adapted from http://www.detectmobilebrowsers.com
                        var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
                        // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
                        return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
                    }

                    $scope.getColor = function (color, hue) {
                        if (color == "bg-dark" || color == "bg-white") return $scope.app.color[color.substr(3, color.length)];
                        return rgb2hex($mdColorPalette[color][hue]['value']);
                    };

                    //Function to convert hex format to a rgb color
                    function rgb2hex(rgb) {
                        return "#" + hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
                    }

                    function hex(x) {
                        var hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f");
                        return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
                    }

                    $rootScope.$on('$stateChangeSuccess', openPage);

                    function openPage() {
                        $scope.app.search.content = '';
                        $scope.app.search.show = false;
                        $scope.closeAside();
                        // goto top
                        $location.hash('view');
                        $anchorScroll();
                        $location.hash('');
                    }

                    $scope.goBack = function () {
                        $window.history.back();
                    };

                    $scope.openAside = function () {
                        $timeout(function () {
                            $mdSidenav('aside').open();
                        });
                    };
                    $scope.closeAside = function () {
                        $timeout(function () {
                            $document.find('#aside').length && $mdSidenav('aside').close();
                        });
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
                }
            ]);

</script>