import express from 'express';
import orderController from '../controllers/orderController.js';

const router = express.Router();

/**
 * @swagger
 * /bff/orders:
 *   post:
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order created
 */
router.post('/', orderController.createOrder);

/**
 * @swagger
 * /bff/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', orderController.getAllOrders);

/**
 * @swagger
 * /bff/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /bff/orders/{id}:
 *   patch:
 *     summary: Update order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order updated
 */
router.patch('/:id', orderController.updateOrder);

/**
 * @swagger
 * /bff/orders/{id}:
 *   delete:
 *     summary: Delete order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */
router.delete('/:id', orderController.deleteOrder);

export default router;