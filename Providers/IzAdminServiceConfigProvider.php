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
        /** @var \Modules\IzAdmin\Repositories\IzAdminConfigProvider $izAdminConfig */
        $izAdminConfig = $this->app['izAdminConfig'];
        $izAdminConfig->addConfigProvider('\Modules\IzAdmin\Repositories\IzAdminConfigProvider\AdminConfig', 'global', 10);
        $izAdminConfig->addConfigProvider('\Modules\IzAdmin\Repositories\IzAdminConfigProvider\AdminConfig', 'global', 5);
        $izAdminConfig->addConfigProvider('\Modules\IzAdmin\Repositories\IzAdminConfigProvider\AdminConfig', 'global', 1);
        $izAdminConfig->addConfigProvider('\Modules\IzAdmin\Repositories\IzAdminConfigProvider\AdminConfig', 'global', 1);
        $izAdminConfig->addConfigProvider('\Modules\IzAdmin\Repositories\IzAdminConfigProvider\AdminConfig', 'global', 99);
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
                return $app->make('Modules\IzAdmin\Repositories\IzAdminConfigProvider');
            });
    }
}