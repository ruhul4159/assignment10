const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// Import models
const Product = require('./product');

// Create Express app
const app = express();

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/productdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Middleware to parse JSON requests
app.use(express.json());

// Route for root URL
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Route to get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}, 'name price');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// JSON Web Tokens (JWT) generation
function generateToken(userId, secretKey) {
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
}

// Example protected route using JWT authentication
app.get('/protected-route', authenticate, (req, res) => {
  res.json({ message: 'Access granted' });
});

// JWT authentication middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
}

// Start the server run
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
