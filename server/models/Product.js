const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    inStock: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);