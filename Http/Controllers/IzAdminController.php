<?php namespace Modules\Izadmin\Http\Controllers;

use Modules\IzCore\Http\Controllers\ThemeAbstractController;

class IzAdminController extends ThemeAbstractController {

    public function getIndex() {
        $this->setTheme('admin.default')->setLayout('default');
        $this->addAssets(
            [
                'angular-material',
                'angular',
                'bootstrap',
                'jquery',
                'angular-aria',
                'angular-messages',
                'angular-animate',
                'angular-ui-router',
                'oclazyload',
                'angular-sanitize',
                'angular-toastr',
                'angular-loading-bar',
                'lodash',
                'components-font-awesome',
                'angular-bootstrap',
                'angular-cookies',
                'angular-translate',
                'ngstorage',
                'animate-css'
            ]
        );

        $this->addCustomAssets(
            [
                /*CSS*/
                'material-design-icons' =>
                    [
                        'source'     => 'css/material-design-icons.css',
                        'dependency' => [],
                        'theme_name' => 'admin.default'
                    ],
                'font-css'              =>
                    [
                        'source'     => 'css/font.css',
                        'dependency' => [],
                        'theme_name' => 'admin.default'
                    ],
                'app-css'               =>
                    [
                        'source'     => 'css/app.css',
                        'dependency' => [],
                        'theme_name' => 'admin.default'
                    ],
                'izStyle-css'           =>
                    [
                        'source'     => 'css/izStyle.css',
                        'dependency' => [],
                        'theme_name' => 'admin.default'
                    ],
                /*JS*/
                /*Directive*/
                'lazyload'              => [
                    'source'     => 'scripts/directives/lazyload.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                'ui.jp'                 => [
                    'source'     => 'scripts/directives/ui-jp.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                'ui-nav'                => [
                    'source'     => 'scripts/directives/ui-nav.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                'ui-fullscreen'         => [
                    'source'     => 'scripts/directives/ui-fullscreen.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                'ui-scroll'             => [
                    'source'     => 'scripts/directives/ui-scroll.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                'ui-toggle'             => [
                    'source'     => 'scripts/directives/ui-toggle.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                /*Services*/
                'ui.load'               => [
                    'source'     => 'scripts/services/ui-load.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                'ngstore'               => [
                    'source'     => 'scripts/services/ngstore.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
                'IzAdminConfigService'               => [
                    'source'     => 'scripts/services/core/IzAdminConfigService.js',
                    'dependency' => [],
                    'theme_name' => 'admin.default'
                ],
            ]
        );

        $this->setViewData(
            [
                'view_data' => 'View Data Test'
            ]
        );

        $this->setThemeData(
            [
                'description' => 'IzAdmin Description',
                'keywords'    => 'IzAdmin Keyword'
            ]
        );

        return $this->renderHtml();
    }

}