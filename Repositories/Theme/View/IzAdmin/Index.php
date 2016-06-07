<?php
namespace Modules\IzAdmin\Repositories\Theme\View\IzAdmin;

use Modules\IzCore\Repositories\Theme\View\AdditionViewInterface;

/**
 * Created by PhpStorm.
 * User: vjcspy
 * Date: 07/06/2016
 * Time: 17:05
 */
class Index implements AdditionViewInterface {

    /**
     * @return []
     */
    public function handle() {
        // TODO: Implement handle() method.
        return [
            'view_data' => 'View Data Test'
        ];
    }
}