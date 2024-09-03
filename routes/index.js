// routes/index.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Home page
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('index', { title: 'Men Shoes E-Commerce', products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Page to add a new product
router.get('/add-product', (req, res) => {
  res.render('add-product', { title: 'Add New Product' });
});

// Handle new product form submission
router.post('/add-product', async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      category,
    });
    await newProduct.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
