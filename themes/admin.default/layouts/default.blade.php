<!DOCTYPE html>
<html>
<head>
    <title>{!! Theme::get('title') !!}</title>
    <meta charset="utf-8">
    <meta name="keywords" content="{!!  Theme::get('keywords') !!}">
    <meta name="description" content="{!! Theme::get('description') !!}">

    {{--Assets style in bower--}}
    {!! Theme::asset()->styles() !!}

    {{--Assest style of custom--}}
    {!! Theme::asset()->container('custom-assets')->styles() !!}
</head>
<body ng-app="app">

<div class="container">
    {!! Theme::content() !!}
</div>
{{--ConfigProvider--}}
{!! Theme::partial('izAdminConfigProvider') !!}

{{--Assets scripts in bower--}}
{!! Theme::asset()->container('footer')->scripts() !!}

{{--Core js: app.js/config.js/config.lazyload/config.router.js--}}
{!! Theme::partial('appCoreJs') !!}

{{--Assets scripts of custom--}}
{!! Theme::asset()->container('custom-assets')->scripts() !!}
</body>
</html>