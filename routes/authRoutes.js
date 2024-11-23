const express = require('express');
const { register, login, getCurrentUser,logout } = require('../controllers/authController'); // Check if getCurrentUser is imported here correctly
const authenticate = require('../middlewares/authMiddleware'); // Make sure the path to your middleware is correct

const router = express.Router();

router.post('/register', register);  // User registration
router.post('/login', login);        // User login
router.post('/logout', logout); // Route to get current user
router.get('/currentUser', authenticate, getCurrentUser); // Route to get current user

module.exports = router;
