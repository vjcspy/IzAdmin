<?php
/**
 * Created by IntelliJ IDEA.
 * User: vjcspy
 * Date: 23/06/2016
 * Time: 14:58
 */

namespace Modules\IzAdmin\Providers;

use Log;

class RegisterThemeServiceProvider extends \Illuminate\Support\ServiceProvider {

    public function boot() {
        /*Register theme*/
        /** @var \Modules\IzCore\Repositories\Theme $izTheme */
        $izTheme = app()['izTheme'];
        try {
            $izTheme->registerTheme('admin.default', true);
        } catch (\Exception $e) {
            // truong hop moi tao app chua co table
            Log::error($e->getMessage());
        }
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