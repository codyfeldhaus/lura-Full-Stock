// module imports
const express = require('express');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

const pool = new Pool({
  //user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: process.env.DB_PASSWORD,
  port: 5432,
});

router.post('/register', async (req, res) => {
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

module.exports = router;
