<?php
/**
 * Created by PhpStorm.
 * User: vjcspy
 * Date: 06/06/2016
 * Time: 10:50
 */

namespace Modules\IzAdmin\Repositories\IzAdminConfig;


class AdminConfig implements AdminConfigInterface {

    public function handle() {
        // TODO: Implement handle() method.
        return [
            'path' => 'modules/themes',
            'appFuncName'=>'Admin Function',
            'base_url'=>url('/')
        ];
    }
}