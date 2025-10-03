import express from 'express';
import cartController from '../controllers/cartController.js';

const router = express.Router();

/**
 * @swagger
 * /bff/carts/{userId}/{productId}:
 *   post:
 *     summary: Add a product to a user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Product added to cart
 */
router.post('/:userId/:productId', cartController.addProductToCart);


/**
 * @swagger
 * /bff/carts/{userId}:
 *   get:
 *     summary: Get cart by userId
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart details for the user
 */
router.get('/:userId', cartController.getCartByUserId);


/**
 * @swagger
 * /bff/carts/{userId}/{productId}:
 *   delete:
 *     summary: Remove a product from a user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product removed from cart
 */
router.delete('/:userId/:productId', cartController.removeProductFromCart);


/**
 * @swagger
 * /bff/carts/{userId}:
 *   delete:
 *     summary: Clear all products from a user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart cleared successfully
 */
router.delete('/:userId', cartController.clearCart);

/**
 * @swagger
 * /bff/carts/items/{userId}:
 *   get:
 *     summary: Get cart by userId with item details
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cart details for the user
 */
router.get('/items/:userId', cartController.getCartByUserIdWithItems);

/**
 * @swagger
 * /bff/carts/{userId}:
 *   patch:
 *     summary: Patch product quantities in a user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productQuantities:
 *                 type: object
 *                 additionalProperties:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Cart updated successfully
 */
router.patch('/:userId', cartController.patchCart);



export default router;