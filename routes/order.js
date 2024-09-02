const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();
const { authenticateToken, checkAdmin } = require('../middleware/auth');


// Create a new order
router.post('/', authenticateToken, async (req, res) => {
    const { user, products } = req.body;

    try {
        let total = 0;
        const orderProducts = await Promise.all(products.map(async (item) => {
            const product = await Product.findById(item.product);
            if (product) {
                total += product.price * item.quantity;
                return { product: product._id, quantity: item.quantity };
            }
            throw new Error('Product not found');
        }));

        const newOrder = new Order({
            user,
            products: orderProducts,
            total,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all orders (Admin only)
router.get('/', authenticateToken, checkAdmin, async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'name email').populate('products.product', 'name price');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get orders by user ID
router.get('/user/:id', authenticateToken, checkAdmin, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.params.id }).populate('products.product', 'name price');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update order status by ID (Admin only)
router.put('/:id', authenticateToken, checkAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an order by ID (Admin only)
router.delete('/:id', authenticateToken, checkAdmin, async (req, res) => {
    try {
        const deletedOrder = await Order.findByIdAndDelete(req.params.id);
        if (!deletedOrder) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;