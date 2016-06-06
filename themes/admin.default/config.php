<?php

return [

    'assets' => [
        'angular'             => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular/angular.min.js'],
                ],
            'dependency' => ['jquery']
        ],
        'angular-material'    => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-material/angular-material.min.js'],
                    'styles'  => ['bower_components/angular-material/angular-material.min.css']
                ],
            'dependency' => ['angular']
        ],
        'angular-messages'    => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-messages/angular-messages.min.js'],
                ],
            'dependency' => ['angular']
        ],
        'angular-aria'        => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-aria/angular-aria.min.js'],
                ],
            'dependency' => ['angular']
        ],
        'angular-ui-router'   => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-ui-router/release/angular-ui-router.min.js']
                ],
            'dependency' => ['angular']
        ],
        'angular-animate'     => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-animate/angular-animate.min.js']
                ],
            'dependency' => ['angular']
        ],
        'oclazyload'          => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/oclazyload/dist/ocLazyLoad.min.js']
                ],
            'dependency' => ['angular']
        ],
        'angular-sanitize'    => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-sanitize/angular-sanitize.min.js']
                ],
            'dependency' => ['angular']
        ],
        'angular-loading-bar' => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-loading-bar/build/loading-bar.min.js'],
                    'styles'  => ['bower_components/angular-loading-bar/build/loading-bar.min.css']
                ],
            'dependency' => ['angular']
        ],
        'angular-toastr'      => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-toastr/dist/angular-toastr.min.js'],
                    'styles'  => ['bower_components/angular-toastr/dist/angular-toastr.min.css']
                ],
            'dependency' => ['angular']
        ],
        'angular-bootstrap'   => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js']
                ],
            'dependency' => ['angular', 'bootstrap']
        ],
        'angular-cookies'     => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-cookies/angular-cookies.min.js']
                ],
            'dependency' => ['angular']
        ],
        'angular-translate'   => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/angular-translate/angular-translate.min.js']
                ],
            'dependency' => ['angular']
        ],
        'ngstorage'           => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/ngstorage/ngStorage.min.js']
                ],
            'dependency' => ['angular']
        ],
        'ui.utils'            => [
            'sources'    =>
                [
                    'scripts' => ['bower_components/ngstorage/ngStorage.min.js']
                ],
            'dependency' => ['angular']
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Inherit from another theme
    |--------------------------------------------------------------------------
    |
    | Set up inherit from another if the file is not exists,
    | this is work with "layouts", "partials", "views" and "widgets"
    |
    | [Notice] assets cannot inherit.
    |
    */

    'inherit' => null, //default

    /*
    |--------------------------------------------------------------------------
    | Listener from events
    |--------------------------------------------------------------------------
    |
    | You can hook a theme when event fired on activities
    | this is cool feature to set up a title, meta, default styles and scripts.
    |
    | [Notice] these event can be override by package config.
    |
    */

    'events' => [

        // Before event inherit from package config and the theme that call before,
        // you can use this event to set meta, breadcrumb template or anything
        // you want inheriting.
        'before'             => function ($theme) {
            // You can remove this line anytime.
            /** @var \Teepluss\Theme\Theme $theme */

            // $theme->setTitle('Copyright ©  2013 - Laravel.in.th');

            /*TODO: IzAdmin Config Provider*/
            /** @var \Modules\IzAdmin\Repositories\IzAdminConfigProvider $izAdminConfigs */
            $izAdminConfigs = app()['izAdminConfig'];
            $theme->partialComposer(
                'izAdminConfigProvider',
                function ($view) use ($izAdminConfigs) {
                    $view->with('izAdminConfigs', $izAdminConfigs->initConfig());
                });

            // Breadcrumb template.
            // $theme->breadcrumb()->setTemplate('
            //     <ul class="breadcrumb">
            //     @foreach ($crumbs as $i => $crumb)
            //         @if ($i != (count($crumbs) - 1))
            //         <li><a href="{{ $crumb["url"] }}">{!! $crumb["label"] !!}</a><span class="divider">/</span></li>
            //         @else
            //         <li class="active">{!! $crumb["label"] !!}</li>
            //         @endif
            //     @endforeach
            //     </ul>
            // ');
        },

        // Listen on event before render a theme,
        // this event should call to assign some assets,
        // breadcrumb template.
        'beforeRenderTheme'  => function ($theme) {
            // Partial composer.
            // $theme->partialComposer('header', function($view)
            // {
            //     $view->with('auth', Auth::user());
            // });
        },

        // Listen on event before render a layout,
        // this should call to assign style, script for a layout.
        'beforeRenderLayout' => [

            'default' => function ($theme) {
                // $theme->asset()->usePath()->add('ipad', 'css/layouts/ipad.css');
            }

        ]

    ]

];