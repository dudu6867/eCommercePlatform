import express from 'express';
import productController from '../controllers/productController.js';

const router = express.Router();

/**
 * @swagger
 * /bff/products:
 *   post:
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Product created
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /bff/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', productController.getAllProducts);

/**
 * @swagger
 * /bff/products/stewards:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/stewards', productController.getAllProductsStewards);

/**
 * @swagger
 * /bff/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 */
router.get('/:id', productController.getProductById);

/**
 * @swagger
 * /bff/products/{id}:
 *   patch:
 *     summary: Update product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 */
router.patch('/:id', productController.patchProduct);

/**
 * @swagger
 * /bff/products/{id}:
 *   delete:
 *     summary: Delete product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */
router.delete('/:id', productController.deleteProduct);

/**
 * @swagger
 * /bff/products/category/{categoryId}:
 *   get:
 *     summary: Get products by category
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products in category
 */
router.get('/category/:categoryId', productController.getProductByCategory);

/**
 * @swagger
 * /bff/products/supplier/{supplierId}:
 *   get:
 *     summary: Get products by supplier
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products by supplier
 */
router.get('/supplier/:supplierId', productController.getProductBySupplier);

/**
 * @swagger
 * /bff/products/names/{name}:
 *   get:
 *     summary: Search products by name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/names/:name', productController.searchProductsByName);

/**
 * @swagger
 * /bff/products/stewardNames/{name}:
 *   get:
 *     summary: Search products by name
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/stewardNames/:name', productController.searchProductsByStewardName);

/**
 * @swagger
 * /bff/products/supplierItems/{supplierId}/{name}:
 *   get:
 *     summary: Search products by name relevant to supplier
 *     parameters:
 *       - in: path
 *         name: supplierId
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Search results
 */
router.get('/supplierItems/:supplierId/:name', productController.searchProductsBySupplierName);

/**
 * @swagger
 * /bff/products/supplier/{id}:
 *   patch:
 *     summary: Supplier updates product fields
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *               price: { type: number }
 *               quantity: { type: number }
 *               categoryId: { type: string }
 *     responses:
 *       200:
 *         description: Product updated
 */
router.patch('/supplier/:id', productController.patchProductBySupplier);

/**
 * @swagger
 * /bff/products/steward/{id}:
 *   patch:
 *     summary: Steward updates isApproved field
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               isApproved: { type: boolean }
 *     responses:
 *       200:
 *         description: Product updated
 */
router.patch('/steward/:id', productController.patchProductBySteward);

/**
 * @swagger
 * /bff/products/categories:
 *   post:
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 */
router.post('/categories', productController.createCategory);

/**
 * @swagger
 * /bff/products/categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category details
 */
router.get('/categories/:id', productController.getCategoryById);

/**
 * @swagger
 * /bff/products/categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of categories
 */
router.get('/categories', productController.getAllCategories);

/**
 * @swagger
 * /bff/products/categories/{id}:
 *   patch:
 *     summary: Update category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               categoryId: { type: string }
 *     responses:
 *       200:
 *         description: Category updated
 */
router.patch('/categories/:id', productController.patchCategory);

/**
 * @swagger
 * /bff/products/categories/{id}:
 *   delete:
 *     summary: Delete category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted
 */
router.delete('/categories/:id', productController.deleteCategory);


export default router;
