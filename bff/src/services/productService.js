import httpClient from './httpClient.js';
import { config } from '../config.js';

const PRODUCT_SERVICE_URL = config.productServiceUrl;

const productService = {
    createProduct: async (dto) => {
        const response = await httpClient.post(`${PRODUCT_SERVICE_URL}`, dto);
        return response.data;
    },

    // getAllProducts: async () => {
    //     console.log('Fetching products from:', PRODUCT_SERVICE_URL);
    //     const response = await httpClient.get(`${PRODUCT_SERVICE_URL}`);
    //     return response.data;
    // },

    getAllProducts: async (params) => {
        try {
            console.log('Fetching products from:', PRODUCT_SERVICE_URL, 'with params:', params);
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}`, { params });

            console.log("res", response.data);

            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            // Create a map of categoryId to category name
            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            // Transform products to include categoryName instead of categoryId
            const transformedProducts = response.data.content.map(product => {
                return {
                    ...product,
                    categoryId: categoryMap[product.categoryId],
                };
            });

            const transformedResponse = {
                ...response.data,
                content: transformedProducts,
            };

            return transformedResponse;
        }
        catch (error) {
            throw error;
        }
    },

    getAllProductsStewards: async (params) => {
        try {
            // Fetch products and categories
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/stewards`, { params });

            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            // Create a map of categoryId to category name
            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            // Transform products to include categoryName instead of categoryId
            const transformedProducts = response.data.content.map(product => {
                return {
                    ...product,
                    categoryId: categoryMap[product.categoryId],
                };
            });

            const transformedResponse = {
                ...response.data,
                content: transformedProducts,
            };

            return transformedResponse;
        }
        catch (error) {
            throw error;
        }
        // console.log('Fetching products from:', PRODUCT_SERVICE_URL, 'with params:', params);
        // const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/stewards`, { params });
        // return response.data;
    },

    getProductById: async (id) => {
        const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/${id}`);
        return response.data;
    },

    patchProduct: async (id, partialDto) => {
        const response = await httpClient.patch(`${PRODUCT_SERVICE_URL}/${id}`, partialDto);
        return response.data;
    },

    deleteProduct: async (id) => {
        await httpClient.delete(`${PRODUCT_SERVICE_URL}/${id}`);
        return { message: `Product ${id} deleted successfully` };
    },

    getProductByCategory: async (categoryId, params) => {
        const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/category/${categoryId}`, { params });
        return response.data;
    },

    getProductBySupplier: async (supplierId, params) => {
        try {
            // Fetch products and categories
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/supplier/${supplierId}`, { params });
            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            // Create a map of categoryId to category name
            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            // Transform products to include categoryName instead of categoryId
            const transformedProducts = response.data.content.map(product => {
                return {
                    ...product,
                    categoryId: categoryMap[product.categoryId],
                };
            });

            const transformedResponse = {
                ...response.data,
                content: transformedProducts,
            };

            return transformedResponse;

        } catch (error) {
            console.error('Failed to fetch products by supplier:', error);
            throw error;
        }
    },

    searchProductsByName: async (name) => {
        try {
            console.log('Searching products by name from:', PRODUCT_SERVICE_URL, 'with name:', name);
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/names/${name}`);

            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            // Create a map of categoryId to category name
            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            // Transform products to include categoryName instead of categoryId
            const transformedProducts = response.data.map(product => {
                return {
                    ...product,
                    categoryId: categoryMap[product.categoryId],
                };
            });

            return transformedProducts;
           
        }
        catch (error) {
            throw error;
        }

    },

    // CATEGORY ENDPOINTS
    createCategory: async (dto) => {
        const response = await httpClient.post(`${PRODUCT_SERVICE_URL}/categories`, dto);
        return response.data;
    },

    getCategoryById: async (id) => {
        const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories/${id}`);
        return response.data;
    },

    getAllCategories: async () => {
        const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);
        return response.data;
    },

    patchCategory: async (id, dto) => {
        const response = await httpClient.patch(`${PRODUCT_SERVICE_URL}/categories/${id}`, dto);
        return response.data;
    },

    deleteCategory: async (id) => {
        await httpClient.delete(`${PRODUCT_SERVICE_URL}/categories/${id}`);
        return { message: `Category ${id} deleted successfully` };
    },

};

export default productService;
