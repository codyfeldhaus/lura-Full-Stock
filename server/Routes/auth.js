// routes/auth.js
const express = require('express');
const router = express.Router();

// Mock user data (replace with a database)
const users = [
  { id: 1, username: 'demo', password: 'password' }
];

// POST /api/auth/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Implement JWT token generation and send it in the response
    const token = 'your_generated_token';
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Add more authentication routes (signup, logout) as needed

module.exports = router;
