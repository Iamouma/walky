/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Order management and retrieval
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Order details to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: Product 1
 *                     qty:
 *                       type: integer
 *                       example: 1
 *                     price:
 *                       type: number
 *                       example: 100.00
 *                     product:
 *                       type: string
 *                       example: productId123
 *               shippingAddress:
 *                 type: object
 *                 properties:
 *                   address:
 *                     type: string
 *                     example: 123 Main St
 *                   city:
 *                     type: string
 *                     example: New York
 *                   postalCode:
 *                     type: string
 *                     example: 10001
 *                   country:
 *                     type: string
 *                     example: USA
 *               paymentMethod:
 *                 type: string
 *                 example: PayPal
 *               itemsPrice:
 *                 type: number
 *                 example: 300.00
 *               taxPrice:
 *                 type: number
 *                 example: 20.00
 *               shippingPrice:
 *                 type: number
 *                 example: 10.00
 *               totalPrice:
 *                 type: number
 *                 example: 330.00
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/orders/myorders:
 *   get:
 *     summary: Get logged-in user's orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: orderId123
 *                   totalPrice:
 *                     type: number
 *                     example: 330.00
 *                   isPaid:
 *                     type: boolean
 *                     example: true
 *                   paidAt:
 *                     type: string
 *                     example: 2024-08-24T15:43:00.000Z
 *                   orderItems:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Product 1
 *                         qty:
 *                           type: integer
 *                           example: 1
 *                         price:
 *                           type: number
 *                           example: 100.00
 *                         product:
 *                           type: string
 *                           example: productId123
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     tags: [Orders]
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
 *         description: The order details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: orderId123
 *                 totalPrice:
 *                   type: number
 *                   example: 330.00
 *                 isPaid:
 *                   type: boolean
 *                   example: true
 *                 paidAt:
 *                   type: string
 *                   example: 2024-08-24T15:43:00.000Z
 *                 orderItems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: Product 1
 *                       qty:
 *                         type: integer
 *                         example: 1
 *                       price:
 *                         type: number
 *                         example: 100.00
 *                       product:
 *                         type: string
 *                         example: productId123
 *       404:
 *         description: Order not found
 */

/**
 * @swagger
 * /api/orders/{id}/pay:
 *   put:
 *     summary: Update order to paid
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The order ID
 *     requestBody:
 *       description: Payment result object
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentResult:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: paymentResultId123
 *                   status:
 *                     type: string
 *                     example: success
 *                   update_time:
 *                     type: string
 *                     example: 2024-08-24T15:43:00.000Z
 *                   email_address:
 *                     type: string
 *                     example: customer@example.com
 *     responses:
 *       200:
 *         description: Order updated to paid
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */

const express = require('express');
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

module.exports = router;