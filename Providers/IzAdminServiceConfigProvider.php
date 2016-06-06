<?php
/**
 * Manage all setting in  admin app
 * User: vjcspy
 * Date: 06/06/2016
 * Time: 10:05
 */

namespace Modules\IzAdmin\Providers;


use Illuminate\Support\ServiceProvider;

class IzAdminServiceConfigProvider extends ServiceProvider {

    public function boot() {
        /** @var \Modules\IzAdmin\Repositories\IzAdminConfig $izAdminConfig */
        $izAdminConfig = $this->app['izAdminConfig'];

        $izAdminConfig->addConfigProvider('\Modules\IzAdmin\Repositories\IzAdminConfig\AdminConfig', 'global', 10);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register() {
        // TODO: Implement register() method.
        $this->app->singleton(
            'izAdminConfig',
            function ($app) {
                return $app->make('Modules\IzAdmin\Repositories\IzAdminConfig');
            });
    }
}