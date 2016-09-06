<?php
/**
 * Created by mr.vjcspy@gmail.com/khoild@smartosc.com.
 * Date: 2/5/16
 * Time: 4:09 PM
 */

namespace Modules\IzAdmin\Http\Controllers\DataTable\Contract;

use Illuminate\Http\Request;
use Pingpong\Modules\Routing\Controller;
use Response;

/**
 * Class DataTableAbstract
 *
 * @package Modules\Admin\Http\Controllers\Api\DataTable\Contract
 */
class DataTableAbstract extends Controller {

    /**
     * @var \Illuminate\Database\Eloquent\Model
     */
    protected $_model;

    protected $_request;
    /**
     * @var
     */
    protected $_collection;

    protected $_dataSearchQuery;

    /**
     * @param $model
     */
    protected function setModel($model) {
        $this->_model = $model;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Model
     * @throws \Exception
     */
    protected function getModel() {
        if (is_null($this->_model))
            throw new \Exception('Must init model!');

        return $this->_model;
    }

    /**
     * @param Request $request
     *
     * @return array
     */
    protected function getRequestData(\Illuminate\Http\Request $request) {
        return $request->all();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     * @throws \Exception
     */
    protected function getCollection() {
        if (is_null($this->_collection))
            $this->_collection = $this->getModel()->query();

        return $this->_collection;
    }

    protected function getData() {
        if (empty($this->_dataSearchQuery))
            $collection = $this->getCollection()->get();
        else
            $collection = $this->getCollection()->where($this->_dataSearchQuery)->get();
        $data = [];
        foreach ($collection as $item) {
            $data[] = ($item->getAttributes());
        }

        return $data;
    }

    protected function processSearch(array $requestData) {
        $dataSearch = [];
        if (isset($requestData['columns']) && is_null($this->_dataSearchQuery)) {
            foreach ($requestData['columns'] as $column) {
                if ($column['search']['value'] != "")
                    $dataSearch[] = [$column['data'], 'LIKE', '%' . $column['search']['value'] . '%'];
            }
            $this->_dataSearchQuery = $dataSearch;
        }

        return $this->_dataSearchQuery;
    }
}
