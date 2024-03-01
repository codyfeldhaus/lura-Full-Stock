const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const apiCall = require('./api'); // Import the apiCall function

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'full_stock',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    next();
  });
}

// Route to add a stock to the user's dashboard
app.post('/api/dashboard/stocks', authenticateToken, async (req, res) => {
  try {
    // Extract the stock data from the request body
    const { symbol, openPrice } = req.body;

    // TODO: Add the stock to the user's dashboard in the database

    res.status(200).json({ message: 'Stock added to dashboard successfully' });
  } catch (error) {
    console.error('Error adding stock to dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Other routes for registration, login, logout, and search remain unchanged...

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
