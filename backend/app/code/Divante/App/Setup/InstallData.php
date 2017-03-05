<?php
/*
 * This file is part of the "reactcom" package.
 *
 * (c) Divante Sp. z o. o.
 *
 * Author: Cezary Olejarczyk
 * Date: 04.03.17 22:08
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Divante\App\Setup;

use Magento\Config\Model\ResourceModel\Config;
use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Framework\Setup\InstallDataInterface;
use Magento\Framework\Setup\ModuleContextInterface;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Store\Model\Store;

/**
 * Class InstallData
 */
class InstallData implements InstallDataInterface
{
    /**
     * Config path
     */
    const XML_ALLOW_INSECURE = 'webapi/webapisecurity/allow_insecure';

    /**
     * @var Config
     */
    protected $config;

    /**
     * InstallData constructor.
     *
     * @param Config $config
     */
    public function __construct(Config $config)
    {
        $this->config = $config;
    }

    /**
     * {@inheritdoc}
     */
    public function install(ModuleDataSetupInterface $setup, ModuleContextInterface $context)
    {
        $setup->startSetup();

        $this->config->saveConfig(
            self::XML_ALLOW_INSECURE,
            1,
            ScopeConfigInterface::SCOPE_TYPE_DEFAULT,
            Store::DEFAULT_STORE_ID
        );

        $setup->endSetup();
    }
}
