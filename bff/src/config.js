import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  productServiceUrl: process.env.PRODUCT_SERVICE_URL,
  cartServiceUrl: process.env.CART_SERVICE_URL,
  orderServiceUrl: process.env.ORDER_SERVICE_URL,
  userServiceUrl: process.env.USER_SERVICE_URL,
};