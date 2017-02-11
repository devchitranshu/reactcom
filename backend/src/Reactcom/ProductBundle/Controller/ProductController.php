<?php
/*
 * This file is part of the "reactcom" package.
 *
 * (c) Divante Sp. z o. o.
 *
 * Author: Cezary Olejarczyk
 * Date: 11.02.17 11:15
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Reactcom\ProductBundle\Controller;

use Silex\Api\ControllerProviderInterface;
use Silex\Application;

/**
 * Class ProductController
 *
 * @package Reactcom\ProductBundle\Controller
 */
class ProductController implements ControllerProviderInterface
{
    /**
     * @var array
     */
    protected $products = [
        '1' => [
            'name'  => 'Product 1',
            'price' => 100.00,
        ],
        '2' => [
            'name'  => 'Product 2',
            'price' => 200.00,
        ],
    ];

    /**
     * [@inheritdoc]
     */
    public function connect(Application $app)
    {
        $controllers = $app['controllers_factory'];

        // get product list
        $controllers->get('/', self::class.'::getAll');

        // get product by id
        $controllers->get('/{id}', self::class.'::getById');

        return $controllers;
    }

    /**
     * @return string
     */
    public function getAll(): string
    {
        return json_encode($this->products);
    }

    /**
     * @param Application $app
     * @param int         $id
     *
     * @return string
     */
    public function getById(Application $app, int $id): string
    {
        if (!array_key_exists($id, $this->products)) {
            $app->abort(404, "Product {$id} does not exits");
        }

        return json_encode($this->products[$id]);
    }
}
