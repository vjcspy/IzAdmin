'use strict';

/**
 * @ngdoc function
 * @name app.controller:AppCtrl
 * @description
 * # MainCtrl
 * Controller of the app
 */
angular.module('app')
    .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', '$document', '$location', '$rootScope', '$timeout', '$mdSidenav', '$mdColorPalette', '$anchorScroll',
        function ($scope, $translate, $localStorage, $window, $document, $location, $rootScope, $timeout, $mdSidenav, $mdColorPalette, $anchorScroll) {
            // add 'ie' classes to html
            var isIE = !!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./);
            isIE && angular.element($window.document.body).addClass('ie');
            isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
            // config
            $scope.app = {
                name: 'X-App',
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
