import productService from '../services/productService.js';
import { handleError } from '../utils/handleError.js';
import logger from '../utils/logger.js';

export const createProduct = async (req, res, next) => {
  try {
    const dto = req.body;
    // logger.info('Creating product', { body: dto.id }); 
    const product = await productService.createProduct(dto);
    res.status(201).json(product);
  } catch (err) {
    logger.error('Error creating product', { where: 'controllers/productController.js - createProduct', error: err.message });
    return handleError(res, err, 'An error occurred while creating the product.');
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    // logger.info('Fetching all products');
    const products = await productService.getAllProducts(req.query);
    res.json(products);
  } catch (err) {
    logger.error('Error getting all product', { where: 'controllers/productController.js - getAllProducts', error: err });
    return handleError(res, err, 'An error occurred while fetching products.');
  }
};

export const getAllProductsStewards = async (req, res, next) => {
  try {
    // logger.info('Fetching all products');
    const products = await productService.getAllProductsStewards(req.query);
    res.json(products);
  } catch (err) {
    logger.error('Error getting all product by stewards', { where: 'controllers/productController.js - getAllProductsStewards', error: err });
    return handleError(res, err, 'An error occurred while fetching products.');
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // logger.info('Fetching product by Id', { id });
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (err) {
    logger.error('Error getting products by Id', { where: 'controllers/productController.js - getProductById', error: err });
    return handleError(res, err, 'An error occurred while fetching the product.');
  }
};

export const patchProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const partialDto = req.body;
    // logger.info('Patching product', { id });
    const updated = await productService.patchProduct(id, partialDto);
    res.json(updated);
  } catch (err) {
    logger.error('Error patching product', { where: 'controllers/productController.js - patchProduct', error: err });
    return handleError(res, err, 'An error occurred while updating the product.');
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // logger.info('Deleting product', { id });
    const result = await productService.deleteProduct(id);
    res.json(result);
  } catch (err) {
    logger.error('Error deleting product', { where: 'controllers/productController.js - deleteProduct', error: err });
    return handleError(res, err, 'An error occurred while deleting the product.');
  }
};

export const getProductByCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    // logger.info('Fetching products by category', { categoryId });
    const products = await productService.getProductByCategory(categoryId, req.query);
    res.json(products);
  } catch (err) {
    logger.error('Error getting product by category', { where: 'controllers/productController.js - getProductByCategory', error: err });
    return handleError(res, err, 'An error occurred while fetching products by category.');
  }
};

export const getProductBySupplier = async (req, res, next) => {
  try {
    const { supplierId } = req.params;
    // logger.info('Fetching products by supplier', { supplierId });
    const products = await productService.getProductBySupplier(supplierId, req.query);
    res.json(products);
  } catch (err) {
    logger.error('Error getting product by supplier', { where: 'controllers/productController.js - getProductBySupplier', error: err });
    return handleError(res, err, 'An error occurred while fetching products by supplier.');
  }
};

export const searchProductsByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    // logger.info('Searching products by name', { name });
    const results = await productService.searchProductsByName(name);
    res.json(results);
  } catch (err) {
    logger.error('Error searching products by name', { where: 'controllers/productController.js - searchProductsByName', error: err });
    return handleError(res, err, 'An error occurred while searching for products.');
  }
};

export const searchProductsByStewardName = async (req, res, next) => {
  try {
    const { name } = req.params;
    // logger.info('Searching products by name for stewards', { name });
    const results = await productService.searchProductsByStewardName(name);
    res.json(results);
  } catch (err) {
    logger.error('Error searching products by name for stewards', { where: 'controllers/productController.js - searchProductsByStewardName', error: err });
    return handleError(res, err, 'An error occurred while searching for products.');
  }
};

export const searchProductsBySupplierName = async (req, res, next) => {
  try {
    const {supplierId,  name } = req.params;
    // logger.info('Searching products by name for stewards', { supplierId, name });
    const results = await productService.searchProductsBySupplierName(supplierId, name);
    res.json(results);
  } catch (err) {
    logger.error('Error searching products by name for stewards', { where: 'controllers/productController.js - searchProductsBySupplierName', error: err });
    return handleError(res, err, 'An error occurred while searching for products.');
  }
};

export const patchProductBySupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, quantity, categoryId } = req.body;
    const updateFields = { name, description, price, quantity, categoryId };
    // logger.info('Patching product by supplier', { id });
    const updated = await productService.patchProduct(id, updateFields);
    res.json(updated);
  } catch (err) {
    logger.error('Error patching product by supplier', { where: 'controllers/productController.js - patchProductBySupplier', error: err });
    return handleError(res, err, 'An error occurred while updating the product (supplier).');
  }
};

export const patchProductBySteward = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isApproved } = req.body;
    const updateFields = { isApproved };
    // logger.info('Patching product by steward', { id });
    const updated = await productService.patchProduct(id, updateFields);
    res.json(updated);
  } catch (err) {
    logger.error('Error patching product by steward', { where: 'controllers/productController.js - patchProductBySteward', error: err });
    return handleError(res, err, 'An error occurred while updating the product (steward).');
  }
};

export const createCategory = async (req, res) => {
  try {
    const dto = req.body;
    const category = await productService.createCategory(dto);
    res.status(201).json(category);
  } catch (err) {
    logger.error('Error creating category', { where: 'controllers/productController.js - createCategory', error: err });
    return handleError(res, err, 'An error occurred while creating the category.');
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await productService.getCategoryById(id);
    res.json(category);
  } catch (err) {
    logger.error('Error get by category id', { where: 'controllers/productController.js - getCategoryById', error: err });
    return handleError(res, err, 'An error occurred while fetching the category.');
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await productService.getAllCategories();
    res.json(categories);
  } catch (err) {
    logger.error('Error getting all categories', { where: 'controllers/productController.js - getAllCategories', error: err });
    return handleError(res, err, 'An error occurred while fetching categories.');
  }
};

export const patchCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const dto = req.body;
    const updated = await productService.patchCategory(id, dto);
    res.json(updated);
  } catch (err) {
    logger.error('Error patching category', { where: 'controllers/productController.js - patchCategory', error: err });
    return handleError(res, err, 'An error occurred while updating the category.');
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteCategory(id);
    res.json({ message: `Category ${id} deleted successfully` });
  } catch (err) {
    logger.error('Error deleting category', { where: 'controllers/productController.js - deleteCategory', error: err });
    return handleError(res, err, 'An error occurred while deleting the category.');
  }
};


export default {
  createProduct,
  getAllProducts,
  getAllProductsStewards,
  getProductById,
  patchProduct,
  deleteProduct,
  getProductByCategory,
  getProductBySupplier,
  searchProductsByName,
  patchProductBySupplier,
  patchProductBySteward,
  createCategory,
  getCategoryById,
  getAllCategories,
  patchCategory,
  deleteCategory,
  searchProductsByStewardName,
  searchProductsBySupplierName
};
