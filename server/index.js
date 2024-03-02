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
    
    const { symbol, openPrice } = req.body;

    

    res.status(200).json({ message: 'Stock added to dashboard successfully' });
  } catch (error) {
    console.error('Error adding stock to dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
console.log (username, password);
  try {
    const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    console.log (rows);
    if (rows.length > 0) {
      const isValid = await bcrypt.compare(password, rows[0].password);
      console.log (isValid);
      if (isValid) {
        const token = jwt.sign(
          { username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );
        console.log (token);
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
// Registration endpoint
app.post('/register', async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
  await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username,hashedPassword]);
  res.status(200).send("registered successfully") 
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).send('Internal Server Error');
  }
})

// Logout endpoint
app.post('/logout', (req, res) => {
  res.status(200).send('Logged out successfully');
});


app.get('/search', async (req, res) => {
  console.log("server search")
  try {
    const searchQuery = req.query.q.toLowerCase();
    console.log("search query:", searchQuery);

    const responseData = await apiCall(searchQuery);

    // Extract "open" and "symbol" 
    const openPrice = responseData.open;
    const symbol = responseData.symbol;
    res.status(200).json({ openPrice, symbol });
  } catch (error) {
    console.error('Error adding stock to dashboard:', error);
    res.status(500).send(error);
  }
});
app.post('/add', async (req, res) => {
  console.log(req.body);
  const { openPrice, symbol } = req.body; 
  try {
    await pool.query('INSERT INTO stock_adds (openPrice, symbol) VALUES ($1, $2)', [openPrice, symbol]);
    res.status(200).send("Stock added successfully");
  } catch (error) {
    console.error('Error during stock add:', error);
    res.status(500).send('Internal Server Error');
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
