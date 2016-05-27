<?php namespace Modules\Izadmin\Http\Controllers;

use Pingpong\Modules\Routing\Controller;

class IzAdminController extends Controller {
	
	public function index()
	{
		return view('izadmin::index');
	}
	
}