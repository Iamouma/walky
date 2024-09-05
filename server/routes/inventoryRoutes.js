/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: Inventory management and retrieval
 */

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Get inventory list
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Inventory list
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   stock:
 *                     type: number
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update inventory for a product
 *     tags: [Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product
 *     requestBody:
 *       description: Updated stock quantity
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stock:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Inventory updated
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

const express = require('express');
const { getInventory, updateInventory } = require('../controllers/inventoryController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to get the inventory list (admin access only)
router.get('/', protect, admin, getInventory);

// Route to update inventory for a specific product (admin access only)
router.put('/:id', protect, admin, updateInventory);

module.exports = router;