// stripeController.js
const Stripe = require('stripe');
const dotenv = require('dotenv');

dotenv.config();

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Payment Intent
// @route   POST /api/stripe/create-payment-intent
// @access  Public
exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // amount should be in cents

  if (!amount || amount <= 0) {
    return res.status(400).json({ 
      error: 'Invalid amount provided. Amount must be a positive integer in cents.' 
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.status(200).json({
      success: true,
      message: 'Payment Intent successfully created',
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);

    // Error handling based on Stripe error type
    if (error.type === 'StripeCardError') {
      // A declined card error
      res.status(400).json({ 
        error: 'Your card was declined. Please try another payment method or contact your bank.' 
      });
    } else if (error.type === 'StripeInvalidRequestError') {
      // Invalid parameters were supplied to Stripe's API
      res.status(400).json({ 
        error: 'Invalid payment request. Please check your payment details and try again.' 
      });
    } else {
      // General server error
      res.status(500).json({ 
        error: 'Payment Intent creation failed due to a server error. Please try again later.' 
      });
    }
  }
};