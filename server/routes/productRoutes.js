/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management and retrieval
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: productId123
 *                   name:
 *                     type: string
 *                     example: Running Shoes
 *                   price:
 *                     type: number
 *                     example: 99.99
 *                   description:
 *                     type: string
 *                     example: High-quality running shoes for men
 *                   category:
 *                     type: string
 *                     example: Shoes
 *                   countInStock:
 *                     type: integer
 *                     example: 20
 */

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: The product details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: productId123
 *                 name:
 *                   type: string
 *                   example: Running Shoes
 *                 price:
 *                   type: number
 *                   example: 99.99
 *                 description:
 *                   type: string
 *                   example: High-quality running shoes for men
 *                 category:
 *                   type: string
 *                   example: Shoes
 *                 countInStock:
 *                   type: integer
 *                   example: 20
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Running Shoes
 *               price:
 *                 type: number
 *                 example: 99.99
 *               description:
 *                 type: string
 *                 example: High-quality running shoes for men
 *               category:
 *                 type: string
 *                 example: Shoes
 *               countInStock:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     requestBody:
 *       description: Updated product data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Running Shoes
 *               price:
 *                 type: number
 *                 example: 99.99
 *               description:
 *                 type: string
 *                 example: High-quality running shoes for men
 *               category:
 *                 type: string
 *                 example: Shoes
 *               countInStock:
 *                 type: integer
 *                 example: 20
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID (Admin only)
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search and filter products
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Search for products by name
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Server error
 */

const express = require('express');
const { 
  getProducts, 
  getProductById,
  searchProducts,
  createProduct, 
  updateProduct, 
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.get('/', getProducts); // Get all products
router.get('/:id', getProductById); // Get a single product by ID
router.get('/search', searchProducts); // Search and filter products

// Admin Routes
router.post('/', protect, admin, createProduct); // Create a new product
router.put('/:id', protect, admin, updateProduct); // Update a product by ID
router.delete('/:id', protect, admin, deleteProduct); // Delete a product by ID

module.exports = router;