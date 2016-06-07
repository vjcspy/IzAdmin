<?php

Route::group(['middleware' => 'web', 'prefix' => 'izadmin', 'namespace' => 'Modules\IzAdmin\Http\Controllers'], function()
{
	Route::controller('/navigation', 'IzAdminNavigationController');
	Route::controller('/', 'IzAdminController');
});