<nav ui-nav>
    <ul class="nav">
        <li class="nav-header m-v-sm hidden-folded">
            @{{IzAdminConfigService.getConfig('appFuncName')}}
        </li>

        @foreach ($izAdminMenu as $menuItem)
            <li ng-class="{active:$state.includes('{{$menuItem['active-router']}}')}">
                <a md-ink-ripple href>
                    <span class="pull-right text-muted"><i class="fa fa-caret-down"></i></span>
                    <i class="pull-right up"><b class="badge no-bg">{{$menuItem['badge']}}</b></i>
                    <i class="{{$menuItem['icon-class']}}"></i>
                    <span>{{$menuItem['name']}}</span>
                </a>
                @if(isset($menuItem['children']))
                    <ul class="nav nav-sub">
                        @foreach($menuItem['children'] as $child)
                            @if(!isset($child['children']))
                                <li><a md-ink-ripple ui-sref="{{$child['url']}}">{{$child['name']}}</a></li>
                            @else
                                <li>
                                    <a md-ink-ripple href>
                                        <span class="pull-right text-muted"><i class="fa fa-caret-down"></i></span>
                                        <span class="font-normal">{{$child['name']}}</span>
                                    </a>
                                    <ul class="nav nav-sub">
                                        @foreach($child['children'] as $childLv2)
                                            <li>
                                                <a md-ink-ripple ui-sref="{{$childLv2['url']}}">{{$childLv2['name']}}</a>
                                            </li>
                                        @endforeach
                                    </ul>
                                </li>
                            @endif
                        @endforeach
                    </ul>
                @endif
            </li>
        @endforeach

        <li class="b-b b m-v-sm"></li>
        <li>
            <a md-ink-ripple ui-toggle-class="hide, show" target="#nav, #account">
                <span>Account</span>
            </a>
        </li>
        <li>
            <a md-ink-ripple ui-sref="page.document">
                <span>Document</span>
            </a>
        </li>
        <li class="m-b-sm" ng-show="app.navShow.changeVersion">
            <a md-ink-ripple href="../html">
                <span>HTML Version</span>
            </a>
        </li>
    </ul>
</nav>
