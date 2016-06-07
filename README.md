# IzAdmin

# IzAdmin Config
1. How to add new config to IzAdmin
- Use Service Provider and use Core service:  $izAdminConfig = $this->app['izAdminConfig'];
- Use function addConfigProvider.

2. Use IzAdmin
- In IzAdmin call variable: window.izAdminConfigProvider

3. Chung về layout của izadmin 
- Sử dụng teenplus theme để có thể config được nhiều theme khác nhau. Trong mỗi một theme thì có các thành phần chính:
    + layout: Theme sẽ load layout đầu tiên. Trong layout sẽ gọi đến các thành phần bên dưới như assets, partial, widget, view content
    + partial: Sẽ được gọi trong layout qua: {!! Theme::partial('partial_name') !!}
    + view: Được gọi qua layout: {!! Theme::content('content_name') !!}. View content nằm ở thư mục views của theme. Cách đặt tên view thì xem ví dụ trong controller.
    + widget: Explain later  
    
- Có 2 provider là **izAsset** và **izView**. Có nhiệm vụ là init asset và data view vào theme. Ngoài ra chúng còn giúp có thể addcustom data từ module khác vào.
- Ở IzAdmin chỉ generate ra trang index của app. Sau đó sử dụng ui-router để routing.
- Để có thể thay đổi được data thì phần app.js/config.js/config.lazyload.js/config.router.js được đặt trong partial.
- Có 1 điểm chú ý là navigation được gọi từ url trả về data được generate ra bằng php. Sử dụng widget.

4. What is Widget?
- Lưu ý tất cả wiget đều nằm trong module IzWidget.
- Widget bao gồm 1 file data nằm trong thư mục widget của module IzWidget. Còn template của nó thì lại tùy thuộc vào theme nào đang dùng.
- Ví dụ như trong 1 widget khai báo sử dụng template là demo. Nếu theme đang dụng hiện tại là default thì template sẽ nằm trong thư mục ./default/widget/demo.
- Sử dụng widget hay ở chỗ là data vẫn giống nhau cho mọi theme. Nhưng mỗi theme lại tùy chỉnh 1 template. Giống cơ chế block của magento.