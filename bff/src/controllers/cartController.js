import cartService from '../services/cartService.js';
import { handleError } from '../utils/handleError.js';

export const addProductToCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await cartService.addProductToCart(userId, productId);
    res.status(201).json(cart);
  } catch (err) {
    logger.error('Error adding product to cart', { where: 'controllers/cartController.js - addProductToCart', error: err });
    return handleError(res, err, 'Error adding product to cart.');
  }
};

export const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartService.getCartByUserId(userId);
    res.json(cart);
  } catch (err) {
    logger.error('Error getting cart by user id', { where: 'controllers/cartController.js - getCartByUserId', error: err });
    return handleError(res, err, 'Error fetching cart by userId.');
  }
};

export const getCartByUserIdWithItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await cartService.getCartByUserIdWithItems(userId);
    res.json(cart);
  } catch (err) {
    logger.error('Error getting cart by user id with items', { where: 'controllers/cartController.js - getCartByUserIdWithItems', error: err });
    return handleError(res, err, 'Error fetching cart by userId.');
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const cart = await cartService.removeProductFromCart(userId, productId);
    res.json(cart);
  } catch (err) {
    logger.error('Error removig product from cart', { where: 'controllers/cartController.js - removeProductFromCart', error: err });
    return handleError(res, err, 'Error removing product from cart.');
  }
};

export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await cartService.clearCart(userId);
    res.json(result);
  } catch (err) {
    logger.error('Error clearing cart', { where: 'controllers/cartController.js - clearCart', error: err });
    return handleError(res, err, 'Error clearing cart.');
  }
};

export const patchCart = async (req, res) => {
  console.log('Patching cart with data:', req.body);
  try {
    const { userId } = req.params;
    const cartDTO = req.body;
    const updatedCart = await cartService.patchCart(userId, cartDTO);
    res.json(updatedCart);
  } catch (err) {
    logger.error('Error patching cart', { where: 'controllers/cartController.js - patchCart', error: err });
    return handleError(res, err, 'Error patching cart.');
  }
};

export default {
  addProductToCart,
  getCartByUserId,
  removeProductFromCart,
  clearCart,
  getCartByUserIdWithItems,
  patchCart,
};
