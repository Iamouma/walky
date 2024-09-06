const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const connectDB = require('./config/db');
const inventoryRoutes = require('./routes/inventoryRoutes');
const adminRoutes = require('./routes/adminRoutes');
const stripeRoutes = require('./routes/stripe');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // For parsing JSON bodies
app.use(morgan('dev')); // For logging requests

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Default route to serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'payment.html'));
});

// Define routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/inventory', inventoryRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/stripe', stripeRoutes);


// Swagger setup
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Walky API',
    version: '1.0.0',
    description: 'API documentation'
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server'
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to your API files
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));