/**
 * @swagger
 * tags:
 *   name: Admin 
 *   description: Admin Dashboard functionalities
 */
/**
 * @swagger
 * /api/admin/dashboard-stats:
 *   get:
 *     summary: Get admin dashboard stats (total users, orders, revenue)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalUsers:
 *                   type: number
 *                 totalOrders:
 *                   type: number
 *                 totalRevenue:
 *                   type: number
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get all users (admin access)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
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
 *                   email:
 *                     type: string
 *                   isAdmin:
 *                     type: boolean
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   delete:
 *     summary: Delete a user (admin access)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/orders:
 *   get:
 *     summary: Get all orders (admin access)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   totalPrice:
 *                     type: number
 *                   isPaid:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/admin/orders/{id}:
 *   delete:
 *     summary: Delete an order (admin access)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted
 *       404:
 *         description: Order not found
 *       500:
 *         description: Server error
 */



const express = require('express');
const { getAllUsers, deleteUser, getAllOrders, deleteOrder, getDashboardStats } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');
const router = express.Router();

// Get dashboard stats (like total users, total orders, total revenue)
router.get('/dashboard-stats', protect, admin, getDashboardStats);

// User management routes
router.get('/users', protect, admin, getAllUsers); // Get all users
router.delete('/users/:id', protect, admin, deleteUser); // Delete a user

// Order management routes
router.get('/orders', protect, admin, getAllOrders); // Get all orders
router.delete('/orders/:id', protect, admin, deleteOrder); // Delete an order

module.exports = router;