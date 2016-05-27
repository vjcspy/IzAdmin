<?php

Route::group(['middleware' => 'web', 'prefix' => 'izadmin', 'namespace' => 'Modules\IzAdmin\Http\Controllers'], function()
{
	Route::get('/', 'IzAdminController@index');
});