const Product = require('../models/Product'); // Assuming you have a Product model

// Get inventory: Fetch all products
const getInventory = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update inventory: Update stock for a specific product
const updateInventory = async (req, res) => {
    try {
        const { stock } = req.body;
        const product = await Product.findById(req.params.id);
        
        if (product) {
            product.stock = stock;
            await product.save();
            res.json({ message: 'Inventory updated' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getInventory,
    updateInventory,
};