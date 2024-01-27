// module imports
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Added JWT module
require('dotenv').config();

const app = express()
// middleware
app.use(cors());
app.use(express.json());
// database connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'full_stock',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Middleware to verify JWT token
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

// Registration endpoint
app.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // Validate username and password if needed

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the user into the database
  try {
    await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Search endpoint with authentication middleware
app.get('/search', authenticateToken, async (req, res) => {
  try {
    const searchQuery = req.query.q.toLowerCase();
    const { rows } = await pool.query('SELECT * FROM users WHERE LOWER(last_name) = $1', [`${searchQuery}`]);
    res.json(rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    
    if (rows.length > 0) {
      const isValid = await bcrypt.compare(password, rows[0].password);

      if (isValid) {
        const token = jwt.sign(
          { username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        res.json({ token });
      } else {
        res.status(403).send('Invalid password');
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//start our server at given port
const PORT = process.env.PORT || 3001; //use port specificied in .env if there is one, default to 3001 otherwise
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

