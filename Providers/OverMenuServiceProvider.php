<?php
/**
 * Created by PhpStorm.
 * User: vjcspy
 * Date: 07/06/2016
 * Time: 11:59
 */

namespace Modules\IzAdmin\Providers;


use Illuminate\Support\ServiceProvider;
use Modules\IzCore\Repositories\IzMenu;

class OverMenuServiceProvider extends ServiceProvider {

    public function boot() {
        /** @var IzMenu $izMenu */
        $izMenu = $this->app['izMenu'];
        $izMenu->addMenu(
            'izAdminNav',
            [
                [
                    'name'     => 'Dashboard',
                    'url'      => '',
                    'badge'    => '3',
                    'priority' => 0,
                    'children' => [
                        [
                            'name'     => 'Analysis',
                            'url'      => 'app.analysis',
                            'priority' => 1
                        ]
                    ]
                ],
                [
                    'name'     => 'System',
                    'url'      => 'system',
                    'priority' => 5,
                    'children' => [
                        [
                            'name'     => 'Currency',
                            'url'      => 'system.currency',
                            'priority' => 1
                        ],
                        [
                            'name'     => 'Shop',
                            'url'      => 'system.shop',
                            'priority' => 1,
                            'children' => [
                                [
                                    'name'     => 'Configuration',
                                    'url'      => 'system.shop.config',
                                    'priority' => 1
                                ]
                            ]
                        ]

                    ]
                ]
            ]);
    }

    /**
     * Register the service provider.
     *
     * @return void
     */
    public function register() {
        // TODO: Implement register() method.
    }
}