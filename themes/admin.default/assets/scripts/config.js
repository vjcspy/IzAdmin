// config

var app =
    angular.module('app')
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
                        //console.log(rejection.status);
                        if (rejection.hasOwnProperty('status') && rejection.status === 401) {
                            $injector.get('toastr').error('Please login !', '');
                            $injector.get('$state').go('access.signin');
                            //if (canRecover(rejection)) {
                            //    return responseOrNewPromise
                            //}

                        }
                        return $q.reject(rejection);

                    }
                };
            });
        }]);
