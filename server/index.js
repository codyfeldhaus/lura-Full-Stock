// module imports
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config()

//express &port app
const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use

app.use(cors()); //resource sharing
app.use(express.json()); //parsing Json requests


// database connection
const pool = new Pool({
user: 'postgres',
host: 'localhost',
database: 'Full_Stock',
password: process.env.DB_PASSWORD,
port: 5432 
});

// add routes in this section

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
