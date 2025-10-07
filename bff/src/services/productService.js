import httpClient from './httpClient.js';
import { config } from '../config.js';

const PRODUCT_SERVICE_URL = config.productServiceUrl;

const productService = {
    createProduct: async (dto) => {
        try {
            const response = await httpClient.post(`${PRODUCT_SERVICE_URL}`, dto);
            return response.data;
        }
        catch (error) {
            throw error;
        }

    },

    getAllProducts: async (params) => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}`, { params });

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
                    categoryName: categoryMap[product.categoryId],
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
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/stewards`, { params });

            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            const transformedProducts = response.data.content.map(product => {
                return {
                    ...product,
                    categoryName: categoryMap[product.categoryId],
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

    getProductById: async (id) => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/${id}`);
            return response.data;
        }
        catch (error) {
            throw error;
        }

    },

    patchProduct: async (id, partialDto) => {
        try {
            const response = await httpClient.patch(`${PRODUCT_SERVICE_URL}/${id}`, partialDto);
            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            console.log("here", response.data);

            const transformedProducts = {
                ...response.data,
                categoryName: categoryMap[response.data.categoryId]
            };

            return transformedProducts;
        }
        catch (error) {
            throw error;
        }

    },

    deleteProduct: async (id) => {
        try {
            await httpClient.delete(`${PRODUCT_SERVICE_URL}/${id}`);
            return { message: `Product ${id} deleted successfully` };
        }
        catch (error) {
            throw error;
        }

    },

    getProductByCategory: async (categoryId, params) => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/category/${categoryId}`, { params });
            return response.data;
        }
        catch (error) {
            throw error;
        }

    },

    getProductBySupplier: async (supplierId, params) => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/supplier/${supplierId}`, { params });
            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            const transformedProducts = response.data.content.map(product => {
                return {
                    ...product,
                    categoryName: categoryMap[product.categoryId],
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
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/names/${name}`);

            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            const transformedProducts = response.data.map(product => {
                return {
                    ...product,
                    categoryName: categoryMap[product.categoryId],
                };
            });

            return transformedProducts;

        }
        catch (error) {
            throw error;
        }

    },

    searchProductsByStewardName: async (name) => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/stewardNames/${name}`);

            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            const transformedProducts = response.data.map(product => {
                return {
                    ...product,
                    categoryName: categoryMap[product.categoryId],
                };
            });

            return transformedProducts;

        }
        catch (error) {
            throw error;
        }

    },

    searchProductsBySupplierName: async (supplierId, name) => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/supplierItems/${supplierId}/${name}`);

            const categoryResponse = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);

            const categoryMap = {};
            categoryResponse.data.forEach(cat => {
                categoryMap[cat.categoryId] = cat.name;
            });

            const transformedProducts = response.data.map(product => {
                return {
                    ...product,
                    categoryName: categoryMap[product.categoryId],
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
        try {
            const response = await httpClient.post(`${PRODUCT_SERVICE_URL}/categories`, dto);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getCategoryById: async (id) => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getAllCategories: async () => {
        try {
            const response = await httpClient.get(`${PRODUCT_SERVICE_URL}/categories`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    patchCategory: async (id, dto) => {
        try {
            const response = await httpClient.patch(`${PRODUCT_SERVICE_URL}/categories/${id}`, dto);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteCategory: async (id) => {
        try {
            await httpClient.delete(`${PRODUCT_SERVICE_URL}/categories/${id}`);
            return { message: `Category ${id} deleted successfully` };
        } catch (error) {
            throw error;
        }
    },

};

export default productService;
