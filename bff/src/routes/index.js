import express from 'express';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import productRoutes from './productRoutes.js'
import userRoutes from './userRoutes.js';
import uploadRoute from './uploadRoute.js';

const router = express.Router();

router.use('/carts', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;
