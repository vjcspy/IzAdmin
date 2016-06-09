<?php
/**
 * Created by PhpStorm.
 * User: vjcspy
 * Date: 06/06/2016
 * Time: 10:50
 */

namespace Modules\IzAdmin\Repositories\CoreConfig;


use Modules\IzCore\Repositories\CoreConfig\ConfigInterface;

class AdminConfig implements ConfigInterface {

    public function handle() {
        // TODO: Implement handle() method.
        return [
            'path'              => 'modules/themes',
            'appFuncName'       => 'Admin Function',
            'base_url'          => url('/'),
            'admin.default_url' => 'modules/themes/admin.default/',
            'appName'           => 'X-Admin'
        ];
    }
}