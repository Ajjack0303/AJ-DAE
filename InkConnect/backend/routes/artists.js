const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all artists
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT user_id, username, email FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
