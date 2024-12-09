// routes/me.js

const express = require('express');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

// Get Current User Route
router.get('/me', authenticate, (req, res) => {
  const user = req.user;  // The user will be attached to the request by the authenticate middleware
  res.json(user);
});

module.exports = router;
