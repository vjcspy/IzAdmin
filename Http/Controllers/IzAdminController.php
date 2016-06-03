<?php namespace Modules\Izadmin\Http\Controllers;

use Modules\IzCore\Http\Controllers\ThemeAbstractController;

class IzAdminController extends ThemeAbstractController {

    public function getTest() {
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
                'components-font-awesome'
            ])
             ->addCustomAssets(
                 [
                     'app-css'               =>
                         [
                             'source'     => 'css/app.css',
                             'dependency' => [],
                             'theme_name' => 'admin.default'
                         ],
                     'font-css'              =>
                         [
                             'source'     => 'css/font.css',
                             'dependency' => [],
                             'theme_name' => 'admin.default'
                         ],
                     'izStyle-css'           =>
                         [
                             'source'     => 'css/izStyle.css',
                             'dependency' => [],
                             'theme_name' => 'admin.default'
                         ],
                     'material-design-icons' =>
                         [
                             'source'     => 'css/material-design-icons.css',
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

        // will render view: 'layout/router/current_function.blade.php';
        return $this->renderHtml();
    }

}