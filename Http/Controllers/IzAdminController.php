<?php namespace Modules\IzAdmin\Http\Controllers;

use Modules\IzCore\Http\Controllers\ThemeAbstractController;

class IzAdminController extends ThemeAbstractController {

    public function getIndex() {
        /* FIXME: get by configuration*/
        $this->setTheme('admin.default')->setLayout('default');

        /*Add Dependency for view appCoreJs*/
        $this->theme->partialComposer(
            'appCoreJs',
            function ($view) {
                $xml = $this->izXml->getXmlByPath($this->theme->getLayoutName());
                $view->with('appDependencies', isset($xml['app_dependencies']) ? $xml['app_dependencies'] : []);
            });

        return $this->renderHtml();
    }

}