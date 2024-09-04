const express = require('express');
const { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Public Routes
router.get('/', getProducts); // Get all products
router.get('/:id', getProductById); // Get a single product by ID

// Admin Routes
router.post('/', protect, admin, createProduct); // Create a new product
router.put('/:id', protect, admin, updateProduct); // Update a product by ID
router.delete('/:id', protect, admin, deleteProduct); // Delete a product by ID

module.exports = router;