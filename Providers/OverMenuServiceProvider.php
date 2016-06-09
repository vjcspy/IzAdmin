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

    const IZ_MENU = 'izAdminNav';

    public function boot() {
        /** @var IzMenu $izMenu */
        $izMenu = $this->app['izMenu'];
        $izMenu->addMenu(
            self::IZ_MENU,
            [
                [
                    'name_id'       => 'dashboard',
                    'name'          => 'Dashboard',
                    'url'           => '',
                    'badge'         => '3',
                    'icon-class'    => 'icon mdi-action-settings i-20',
                    'priority'      => 0,
                    'active-router' => 'dashboard',
                    'children'      => [
                        [
                            'name'     => 'Analysis',
                            'url'      => 'app.analysis',
                            'priority' => 1
                        ]
                    ]
                ],
                [
                    'name_id'       => 'system',
                    'name'          => 'System',
                    'url'           => 'system',
                    'badge'         => '0',
                    'active-router' => 'system',
                    'priority'      => 5,
                    'icon-class'    => 'icon mdi-action-settings i-20',
                    'children'      => [
                        [
                            'name'     => 'Currency',
                            'url'      => 'system.currency',
                            'priority' => 4
                        ],
                        [
                            'name'     => 'Currency',
                            'url'      => 'system.facebook',
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
                                    'priority' => 10
                                ],
                                [
                                    'name'     => 'Example',
                                    'url'      => 'system.shop.example',
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