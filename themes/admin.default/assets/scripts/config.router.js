'use strict';

/**
 * @ngdoc function
 * @name app.config:uiRouter
 * @description
 * # Config
 * Config for the router
 */
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
                    .otherwise('/test');
                $stateProvider
                    .state('test',{
                        url:'/test',
                        templateUrl: 'views/layout.html'
                    })
                    .state('app', {
                        abstract: true,
                        url: '/app',
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
                    .state('app.dashboard', {
                        url: '/dashboard',
                        templateUrl: 'views/pages/dashboard.html',
                        data: {title: 'Dashboard', folded: true},
                        resolve: {deps: load(['scripts/controllers/chart.js', 'scripts/controllers/vectormap.js']).deps}
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
                        templateUrl: 'views/pages/signin.html',
                        resolve: {
                            checkLogin: function ($http, urlManagement, $state) {
                                return $http({
                                    method: 'GET',
                                    url: urlManagement.getUrlByKey('auth_account') + '/check-login'
                                })
                                    .then(function (response) {
                                        if (response.status === 200 && response.data.length != 0) {
                                            $state.go('app.dashboard');
                                        }
                                        return response;
                                    }, function (reject) {
                                        return reject;
                                    });
                            },
                            deps: load('scripts/controllers/account/auth.js').deps
                        },
                        controller: 'accountAuth'
                    })
                    .state('access.signup', {
                        url: '/signup',
                        data: {user: {name: null, email: null, password: null}},
                        templateUrl: 'views/pages/signup.html',
                        resolve: {
                            checkLogin: function ($http, urlManagement, $state) {
                                return $http({
                                    method: 'GET',
                                    url: urlManagement.getUrlByKey('auth_account') + '/check-login'
                                }).then(function (response) {
                                    if (response.status === 200 && response.data.length != 0) {
                                        $state.go('app.dashboard');
                                    }
                                    return response;
                                }, function (reject) {
                                    return reject;
                                });
                            },
                            deps: load('scripts/controllers/account/auth.js').deps
                        },
                        controller: 'accountAuth'
                    })
                    .state('access.forgot-password', {
                        url: '/forgot-password',
                        templateUrl: 'views/pages/forgot-password.html',
                        resolve: {
                            checkLogin: function ($http, urlManagement, $state) {
                                return $http({
                                    method: 'GET',
                                    url: urlManagement.getUrlByKey('auth_account') + '/check-login'
                                }).then(function (response) {
                                    if (response.status === 200 && response.data.length != 0) {
                                        $state.go('app.dashboard');
                                    }
                                    return response;
                                }, function (reject) {
                                    return reject;
                                });
                            },
                            deps: load('scripts/controllers/account/auth.js').deps
                        },
                        controller: 'accountAuth'
                    })
                    .state('access.lockme', {
                        url: '/lockme',
                        templateUrl: 'views/pages/lockme.html',
                        resolve: {
                            checkLogin: function ($http, urlManagement, toastr) {
                                return $http({
                                    method: 'GET',
                                    url: urlManagement.getUrlByKey('auth_account') + '/logout'
                                }).then(function (response) {
                                    if (response.status === 200)
                                        toastr.success('Locked!');
                                    return response;
                                }, function (reject) {
                                    return reject;
                                });
                            },
                            deps: load('scripts/controllers/account/auth.js').deps
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
    );
