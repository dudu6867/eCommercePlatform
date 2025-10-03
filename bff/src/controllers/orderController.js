import orderService from '../services/orderService.js';
import { handleError } from '../utils/handleError.js';

export const createOrder = async (req, res, next) => {
  console.log('request body:', req.body); // Debugging line
  try {
    const orderData = req.body;
    console.log('orderData:', orderData); // Debugging line
    const order = await orderService.createOrder(orderData);
    console.log('created order:', order); // Debugging line
    res.status(201).json(order);
  } catch (err) {
    return handleError(res, err, 'An error occurred while creating the order.');
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (err) {
    return handleError(res, err, 'An error occurred while fetching orders.');
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await orderService.getOrderById(id);
    res.json(order);
  } catch (err) {
    return handleError(res, err, 'An error occurred while fetching the order.');
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderData = req.body;
    const updated = await orderService.updateOrder(id, orderData);
    res.json(updated);
  } catch (err) {
    return handleError(res, err, 'An error occurred while updating the order.');
  }
};

export const deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await orderService.deleteOrder(id);
    res.json(result);
  } catch (err) {
    return handleError(res, err, 'An error occurred while deleting the order.');
  }
};

export default {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder
};