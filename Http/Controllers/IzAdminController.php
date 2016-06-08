<?php namespace Modules\IzAdmin\Http\Controllers;

use Modules\IzCore\Http\Controllers\ThemeAbstractController;

class IzAdminController extends ThemeAbstractController {

    public function getIndex() {
        $this->setTheme('admin.default')->setLayout('default');

        $this->setThemeData(
            [
                'description' => 'IzAdmin Description',
                'keywords'    => 'IzAdmin Keyword'
            ]
        );

        return $this->renderHtml();
    }

}