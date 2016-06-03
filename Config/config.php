<?php

return [
    'name'   => 'IzAdmin',
    'assets' => [
        'angular'           => [
            'source'     =>
                [
                    'scripts' => ['bower_components/angular/angular.min.js'],
                ],
            'dependency' => ['jquery']
        ],
        'jquery'            => [
            'source'     =>
                [
                    'scripts' => ['bower_components/jquery/jquery.min.js'],
                ],
            'dependency' => []
        ],
        'angular-material'  => [
            'source'     =>
                [
                    'scripts' => ['bower_components/angular-material/angular-material.min.js'],
                    'style'   => ['bower_components/angular-material/angular-material.min.css']
                ],
            'dependency' => ['angular', 'bootstrap']
        ],
        'angular-messages'  => [
            'source'     =>
                [
                    'scripts' => ['bower_components/angular-messages/angular-messages.min.js'],
                ],
            'dependency' => ['angular']
        ],
        'angular-aria'      => [
            'source'     =>
                [
                    'scripts' => ['bower_components/angular-aria/angular-messages.min.js'],
                ],
            'dependency' => ['angular']
        ],
        'angular-ui-router' => [
            'source'     =>
                [
                    'scripts' => ['bower_components/angular-ui-router/release/angular-ui-router.min.js']
                ],
            'dependency' => ['angular']
        ],
        'angular-animate'   => [
            'source'     =>
                [
                    'scripts' => ['bower_components/angular-animate/release/angular-animate.min.js']
                ],
            'dependency' => ['angular']
        ],
        'bootstrap'         => [
            'source'     =>
                [
                    'scripts' => ['bower_components/bootstrap/dist/js/bootstrap.min.js'],
                    'style'   => [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap-theme.min.css'
                    ]
                ],
            'dependency' => ['jquery']
        ],
    ]
];