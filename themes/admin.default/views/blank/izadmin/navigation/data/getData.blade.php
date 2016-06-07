<nav ui-nav>
    <ul class="nav">
        <li class="nav-header m-v-sm hidden-folded">
            @{{IzAdminConfigService.getConfig('appFuncName')}}
        </li>

        <li ui-sref-active="active">
            <a md-ink-ripple>
        <span class="pull-right text-muted">
          <i class="fa fa-caret-down"></i>
        </span>
                <i class="pull-right up"><b class="badge no-bg">2</b></i>
                <i class="icon mdi-action-settings-input-svideo i-20"></i>
                <span class="font-normal">Thống kê</span>
            </a>
            <ul class="nav nav-sub">
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="app.analysis">Tổng</a>
                </li>
            </ul>
        </li>
        <li>
            <a md-ink-ripple>
        <span class="pull-right text-muted">
          <i class="fa fa-caret-down"></i>
        </span>
                <i class="pull-right up"><b class="badge no-bg">3</b></i>
                <i class="icon mdi-navigation-apps i-20"></i>
                <span class="font-normal">Ứng dụng</span>
            </a>
            <ul class="nav nav-sub">
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="app.inbox.list">Hộp thư</a>
                </li>
            </ul>
        </li>

        <li ng-class="{active:$state.includes('sales')}">
            <a md-ink-ripple>
                <span class="pull-right text-muted"><i class="fa fa-caret-down"></i></span>
                <i class="pull-right up"><b class="badge no-bg">3</b></i>
                <i class="icon mdi-maps-local-grocery-store i-20"></i>
                <span class="font-normal">Bán hàng</span>
            </a>
            <ul class="nav nav-sub">
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="sales.createorder">Tạo mới đơn hàng</a>
                </li>
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="sales.vieworder">Xem đơn hàng</a>
                </li>
            </ul>
        </li>

        <li ng-class="{active:$state.includes('product')}">
            <a md-ink-ripple>
                <span class="pull-right text-muted"><i class="fa fa-caret-down"></i></span>
                <i class="pull-right up"><b class="badge no-bg">3</b></i>
                <i class="icon mdi-image-camera i-20"></i>
                <span class="font-normal">Sản phẩm</span>
            </a>
            <ul class="nav nav-sub">
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="app.note.list">List</a>
                </li>
            </ul>
            <ul class="nav nav-sub">
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="product.crud">Chi tiết</a>
                </li>
            </ul>
            <ul class="nav nav-sub">
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="product.warehouse">Nhập Kho</a>
                </li>
            </ul>
        </li>

        <li ng-class="{active:$state.includes('customer')}">
            <a md-ink-ripple>
                <span class="pull-right text-muted"><i class="fa fa-caret-down"></i></span>
                <i class="pull-right up"><b class="badge no-bg">3</b></i>
                <i class="icon mdi-action-perm-identity i-20"></i>
                <span class="font-normal">Khách hàng</span>
            </a>
            <ul class="nav nav-sub">
                <li ui-sref-active="active">
                    <a md-ink-ripple ui-sref="customer.crud">Thêm/sửa/xóa</a>
                </li>
            </ul>
        </li>

        <li ng-class="{active:$state.includes('system')}">
            <a md-ink-ripple href>
        <span class="pull-right text-muted">
          <i class="fa fa-caret-down"></i>
        </span>
                <i class="icon mdi-action-settings i-20"></i>
                <span>Hệ thống</span>
            </a>
            <ul class="nav nav-sub">
                <li><a md-ink-ripple ui-sref="system.control">Điều khiển</a></li>
                <li><a md-ink-ripple ui-sref="system.currency">Tiền tệ</a></li>
                <li><a md-ink-ripple ui-sref="system.facebook">Facebook</a></li>
                <li>
                    <a md-ink-ripple href>
            <span class="pull-right text-muted">
              <i class="fa fa-caret-down"></i>
            </span>
                        <span class="font-normal">Cửa hàng</span>
                    </a>
                    <ul class="nav nav-sub">
                        <li>
                            <a md-ink-ripple ui-sref="system.blog.config">Cài đặt</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
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
