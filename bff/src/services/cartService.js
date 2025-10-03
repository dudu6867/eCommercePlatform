import httpClient from './httpClient.js';
import { config } from '../config.js';
import { getCartByUserIdWithItems } from '../controllers/cartController.js';

const CART_SERVICE_URL = config.cartServiceUrl;
const PRODUCT_SERVICE_URL = config.productServiceUrl;

const cartService = {
    // Add product to cart
    addProductToCart: async (userId, productId) => {
        const response = await httpClient.post(`${CART_SERVICE_URL}/${userId}/${productId}`);
        return response.data;
    },

    // Get cart by userId
    getCartByUserId: async (userId) => {
        const response = await httpClient.get(`${CART_SERVICE_URL}/${userId}`);
        return response.data;
    },

    // Remove a product from cart
    removeProductFromCart: async (userId, productId) => {
        const response = await httpClient.delete(`${CART_SERVICE_URL}/${userId}/${productId}`);
        return response.data;
    },

    // Clear a user's cart
    clearCart: async (userId) => {
        const response = await httpClient.delete(`${CART_SERVICE_URL}/${userId}`);
        return response.data;
    },

    patchCart: async (userId, cartDTO) => {
        try {
            const response = await httpClient.patch(`${CART_SERVICE_URL}/${userId}`, cartDTO);
            return response.data;
        } catch (error) {
            console.error('Failed to patch cart:', error);
            throw error;
        }
    },

    getCartByUserIdWithItems: async (userId) => {
        try {
            const response = await httpClient.get(`${CART_SERVICE_URL}/${userId}`);

            if (!response.data) {
                console.warn(`No cart found for user ID: ${userId}`); // ToDo: log here
                return {
                    items: [],
                };
            }

            const cartData = response.data;
            console.log(`Cart data retrieved for user ID ${userId}:`, cartData); // ToDo: log here

            const cartItemsPromises =
                Object.entries(cartData.productQuantities).map(async ([productId, quantity]) => {
                    const productResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/${productId}`);
                    return {
                        id: productResponse.data.id,
                        name: productResponse.data.name,
                        description: productResponse.data.description,
                        price: productResponse.data.price,
                        quantity: quantity,
                        imageUrl: productResponse.data.imageUrl
                    };

                });

            console.log(`Cart data for user ID ${userId}:`, cartData); // ToDo: log here

            const items = await Promise.all(cartItemsPromises);
            console.log(`Fetched items for user ID ${userId}:`, items);
            return items;
        } catch (error) {
            console.error(`Error fetching cart or items for user ID ${userId}:`, error); // ToDo: log here
            throw error;
        }
    },
};

export default cartService;
