import httpClient from './httpClient.js';
import { config } from '../config.js';

const ORDER_SERVICE_URL = config.orderServiceUrl;
const USER_SERVICE_URL = config.userServiceUrl;
const CART_SERVICE_URL = config.cartServiceUrl;
const PRODUCT_SERVICE_URL = config.productServiceUrl;

const orderService = {
  createOrder: async (dto) => {
    try {
      // Prepare order request body
      const userResponse = await httpClient.get(`${USER_SERVICE_URL}/${dto.userId}`);
      if (!userResponse.data || !userResponse.data.address) {
        throw new Error(`User data not found or missing address for userId: ${dto.userId}`);
      }

      const productIds = dto.cartItems.map(item => item.id);
      const requestBody = {
        userId: dto.userId,
        productIds,
        orderAddress: userResponse.data.address,
        totalAmount: dto.totalAmount,
      };

      // Update product quantites
      const updatedProducts = [];

      for (const item of dto.cartItems) {
        try {
          // Get current product data
          const productResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/${item.id}`);
          const currentQuantity = productResponse.data.quantity;

          // Step 2: Calculate new quantity
          const newQuantity = currentQuantity - item.quantity;
          console.log(`Product ID ${item.id}: currentQuantity=${currentQuantity}, orderedQuantity=${item.quantity}, newQuantity=${newQuantity}`);
          if (newQuantity < 0) {
            throw new Error(`Insufficient stock for product ID ${item.id}`);
          }

          //  Patch product with new quantity
          await httpClient.patch(`${PRODUCT_SERVICE_URL}/${item.id}`, { quantity: newQuantity });

          updatedProducts.push({
            id: item.id,
            originalQuantity: currentQuantity,
            orderedQuantity: item.quantity,
          });

        } catch (err) {
          console.log(`Failed to update product ID ${item.id}:`, err);
          console.error(`Failed to update product ID ${item.id}:`, err);

          // Rollback previously updated products
          for (const updated of updatedProducts) {
            await httpClient.patch(`${PRODUCT_SERVICE_URL}/${updated.id}`, { quantity: updated.originalQuantity });
          }

          throw new Error(`Order rolled back due to insufficient stock of product ID ${item.id}`);

        }
      }

      // Create order
      const orderResponse = await httpClient.post(`${ORDER_SERVICE_URL}`, requestBody);
      if (orderResponse.status != 200) {
        throw new Error("Order creation failed");
      }

      // Clear cart
      const cartClearResponse = await httpClient.delete(`${CART_SERVICE_URL}/${dto.userId}`);
      if (cartClearResponse.status != 204) {
        await httpClient.delete(`${ORDER_SERVICE_URL}/${orderResponse.data.id}`); //rollback
        throw new Error("Cart clear failed, order rolled back");
      }

      // Return order data
      return orderResponse.data;

    } catch (error) {
      console.error("Error in createOrder:", error.message || error);
      throw new Error("Failed to create order. Please try again later.");
    }
  },

  getAllOrders: async () => {
    const response = await httpClient.get(`${ORDER_SERVICE_URL}`);
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await httpClient.get(`${ORDER_SERVICE_URL}/user/${id}`);
    return response.data;
  },

  updateOrder: async (id, dto) => {
    const response = await httpClient.patch(`${ORDER_SERVICE_URL}/${id}`, dto);
    return response.data;
  },

  deleteOrder: async (id) => {
    await httpClient.delete(`${ORDER_SERVICE_URL}/${id}`);
    return { message: `Order ${id} deleted successfully` };
  }
};

export default orderService;