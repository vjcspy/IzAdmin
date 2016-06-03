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
                'angular-ui-router'
            ]);

        $this->setViewData(
            [
                'view_data' => 'View Data Test'
            ]
        );

        $this->setThemeData(
            [
                'title' => 'Admin Title Test'
            ]
        );

        // will render view: 'layout/router/current_function.blade.php';
        return $this->renderHtml();
    }

}