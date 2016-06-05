<!DOCTYPE html>
<html>
<head>
    <title>{!! Theme::get('title') !!}</title>
    <meta charset="utf-8">
    <meta name="keywords" content="{!!  Theme::get('keywords') !!}">
    <meta name="description" content="{!! Theme::get('description') !!}">
    {!! Theme::asset()->styles() !!}
    {!! Theme::asset()->scripts() !!}

    {!! Theme::asset()->container('custom-assets')->styles() !!}
</head>
<body>
{!! Theme::partial('header') !!}

<div class="container">
    {!! Theme::content() !!}
</div>

{!! Theme::partial('footer') !!}

{!! Theme::asset()->container('footer')->scripts() !!}

{!! Theme::asset()->container('custom-assets')->scripts() !!}
</body>
</html>