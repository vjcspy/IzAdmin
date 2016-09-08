<?php
/**
 * Created by mr.vjcspy@gmail.com/khoild@smartosc.com.
 * Date: 2/5/16
 * Time: 4:09 PM
 */

namespace Modules\IzAdmin\Http\Controllers\DataTable\Contract;

use Illuminate\Http\Request;
use Pingpong\Modules\Routing\Controller;
use Illuminate\Pagination\Paginator;
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

    protected $_data = [];

    protected $_prefixMainTable;

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
        $this->_data['recordsTotal'] = $this->getCollection()->count();

        // process search
        if (!empty($this->_dataSearchQuery))
            $collection = $this->getCollection()->where($this->_dataSearchQuery);
        else
            $collection = $this->getCollection();

        $collection = $this->processSort($collection);

        $this->_data['recordsFiltered'] = $this->getCollection()->count();
        //paging
        $collection = $collection->paginate($this->_requestData['length'], ['*'], 'page', ($this->_requestData['start'] / $this->_requestData['length'] + 1));
        $collection = $collection->all();

        $data = [];
        foreach ($collection as $item) {
            if ($item instanceof \Illuminate\Database\Eloquent\Model)
                $data[] = ($item->getAttributes());
            else
                $data[] = $item;
        }
        return $data;
    }

    protected $_requestData;

    protected function processSearch(array $requestData) {
        //page and pagesize:
        $this->_requestData = $requestData;

        $dataSearch = [];
        if (isset($requestData['columns']) && is_null($this->_dataSearchQuery)) {
            foreach ($requestData['columns'] as $column) {
                if ($column['data'] == 'created_at' && ($value = $column['search']['value']) != "") {
                    $values = explode('/', $value);
                    // TODO: trong trÆ°á»ng há»£p sá»­ dá»¥ng join table
                    $columnName = !is_null($this->_prefixMainTable) ? $this->_prefixMainTable . '.' . $column['data'] : $column['data'];
                    $dataSearch[] = [$columnName, '<=', $values[1] . ' 23:59:59'];
                    $dataSearch[] = [$columnName, '>=', $values[0] . ' 00:00:01'];
                }
                else
                    if ($column['search']['value'] != "")
                        $dataSearch[] = [$column['data'], 'LIKE', '%' . $column['search']['value'] . '%'];
            }
            $this->_dataSearchQuery = $dataSearch;
        }
        return $this->_dataSearchQuery;
    }

    protected function processSort($collection) {
        $column = $this->_requestData['columns'][$this->_requestData['order'][0]['column']]['data'];
        if (($column == 'created_at' || $column == 'id') && !is_null($this->_prefixMainTable))
            $column = $this->_prefixMainTable . '.' . $column;
        $collection->orderBy($column, $this->_requestData['order'][0]['dir']);
        return $collection;
    }

    public function postSave(
        Request $request
    ) {
        $requestData = $this->getRequestData($request);
        $model = $this->getModel();

        if (!isset($requestData['id']))
            $requestData['id'] = null;
        $object = $model->query()->firstOrCreate(['id' => $requestData['id']]);
        if ($object->update($requestData))
            return Response::json($object, 200);
        else
            return Response::json($object, 303);
    }

    public function postDelete(Request $request) {
        $requestData = $this->getRequestData($request);
        $model = $this->getModel();
        $object = $model->query()->where(['id' => $requestData['id']])->firstOrFail();
        if ($object->delete())
            return Response::json($object, 200);
        else
            return Response::json($object, 303);
    }

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public function getIndex(Request $request) {
        $requestData = $this->getRequestData($request);
        $this->processSearch($requestData);
        $dataOTable = $this->getData();
        $data =
            [
                "draw"            => $requestData['draw'],
                "recordsTotal"    => $this->_data['recordsTotal'],
                "recordsFiltered" => $this->_data['recordsFiltered'],
                "data"            => $dataOTable
            ];
        return Response::json($data);
    }
}