<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 23/06/2016
 * Time: 14:58
 */

namespace Modules\IzAdmin\Providers;


class RegisterThemeServiceProvider extends \Illuminate\Support\ServiceProvider {

    public function boot() {
        /*Register theme*/
        /** @var \Modules\IzCore\Repositories\Theme $izTheme */
        $izTheme = app()['izTheme'];
        $izTheme->registerTheme('admin.default', true);
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