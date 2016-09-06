<?php
/**
 * Created by mr.vjcspy@gmail.com/khoild@smartosc.com.
 * Date: 2/5/16
 * Time: 4:08 PM
 */

namespace Modules\IzAdmin\Http\Controllers\DataTable\Contract;

use Illuminate\Http\Request;

/**
 * Interface DataTableInterface
 *
 * @package Modules\Admin\Http\Controllers\Api\DataTable\Contract
 */
interface DataTableInterface {

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function getIndex(Request $request);
}
