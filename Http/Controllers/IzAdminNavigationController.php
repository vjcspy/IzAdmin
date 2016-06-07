<?php
/**
 * Created by PhpStorm.
 * User: vjcspy
 * Date: 07/06/2016
 * Time: 10:09
 */

namespace Modules\IzAdmin\Http\Controllers;


use Modules\IzCore\Http\Controllers\ThemeAbstractController;

class IzAdminNavigationController extends ThemeAbstractController {

    public function getData() {
        $this->setTheme('admin.default')->setLayout('blank');

        return $this->renderHtml();
    }
}