/**
 * @swagger
 * tags:
 *   name: Stripe
 *   description: Stripe payment integration
 */

/**
 * @swagger
 * /api/stripe/create-payment-intent:
 *   post:
 *     summary: Create a Stripe Payment Intent
 *     tags: [Stripe]
 *     requestBody:
 *       description: Data required to create a payment intent
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: integer
 *                 description: Amount to be charged (in the smallest currency unit, e.g., cents)
 *                 example: 5000
 *               currency:
 *                 type: string
 *                 description: The currency of the payment (e.g., 'usd')
 *                 example: usd
 *               paymentMethodType:
 *                 type: string
 *                 description: The type of payment method (e.g., 'card')
 *                 example: card
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   description: The client secret used to complete the payment
 *                   example: pi_3Jj1yJ22vFz2BpY015tY4..._secret_KHDdU91ygzV
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const { createPaymentIntent } = require('../controllers/stripeController');
const router = express.Router();

// Create Payment Intent Route
router.post('/create-payment-intent', createPaymentIntent);

module.exports = router;