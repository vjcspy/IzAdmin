<?php
namespace Modules\IzAdmin\Repositories;

use Modules\IzAdmin\Repositories\IzAdminConfigProvider\AdminConfigInterface;

/**
 * Class IzAdminConfigProvider
 * Generate config to iz admin app
 *
 * @package Modules\IzAdmin\Respositories
 */
class IzAdminConfigProvider {

    /**
     * @var array
     */
    protected $izAdminConfigProvider = [];

    protected $izAdminConfigResolved;

    /**
     * Add config to Provider
     * Class add must instance of AdminConfig
     * If not set configName will add to global
     * Each config name can have multiple config. Will merger by priority
     *
     * @param        $className
     * @param string $configName
     *
     * @param int    $priority
     *
     * @return $this
     */
    public function addConfigProvider($className, $configName = 'global', $priority = 0) {
        if (!isset($this->izAdminConfigProvider[$configName])) {
            $this->izAdminConfigProvider[$configName] = [];
        }
        $this->izAdminConfigProvider[$configName][] = [
            'className' => $className,
            'priority'  => $priority
        ];

        return $this;
    }

    /**
     * @return array
     */
    public function initConfig() {
        if (is_null($this->izAdminConfigResolved)) {
            $this->izAdminConfigResolved = [];
            foreach ($this->izAdminConfigProvider as $configName => $arrayConfigs) {
                if (!isset($this->izAdminConfigResolved[$configName]))
                    $this->izAdminConfigResolved[$configName] = [];
                $newArrangedArrayConfig = $this->arrangeArrayAdminConfig($arrayConfigs);
                foreach ($newArrangedArrayConfig as $instanceClass) {
                    /** @var AdminConfigInterface $instance */
                    $instance                                 = app()->make($instanceClass['className']);
                    $this->izAdminConfigResolved[$configName] = array_merge($this->izAdminConfigResolved[$configName], $instance->handle());
                }
                $this->izAdminConfigResolved[$configName] = json_encode($this->izAdminConfigResolved[$configName]);
            }
        }

        return $this->izAdminConfigResolved;
    }

    /**
     * Arrange array admin config by priority
     *
     * @param array $adminConfigs
     * @param int   $NKey
     *
     * @return array
     */
    private function arrangeArrayAdminConfig(array &$adminConfigs, $NKey = 1) {
        foreach ($adminConfigs as $key => $adminConfig) {
            if ($key >= (count($adminConfigs) - $NKey))
                break;
            if ($adminConfig['priority'] > $adminConfigs[$key + 1]['priority']) {
                $adminConfigs[$key]     = $adminConfigs[$key + 1];
                $adminConfigs[$key + 1] = $adminConfig;

                return $this->arrangeArrayAdminConfig($adminConfigs, $NKey);
            }
        }

        if ($NKey < (count($adminConfigs) - 1))
            $this->arrangeArrayAdminConfig($adminConfigs, $NKey + 1);

        return $adminConfigs;
    }
}