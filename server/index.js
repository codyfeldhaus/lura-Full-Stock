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

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/search', authenticateToken, async (req, res) => {
  try {
    const searchQuery = req.query.q.toLowerCase();
   
    const responseData = await apiCall(searchQuery);

    // Extract "open" and "symbol" 
    const openPrice = responseData.open;
    const symbol = responseData.symbol;
    res.json({ openPrice, symbol });
  } catch (error) {
    res.status(500).send(error);
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

