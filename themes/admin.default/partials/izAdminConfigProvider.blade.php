<script>
    window.izAdminConfigProvider = {};

    @foreach ($izAdminConfigs as $key => $config)
            window.izAdminConfigProvider['{{$key}}'] ={!! $config !!};
    @endforeach
</script>