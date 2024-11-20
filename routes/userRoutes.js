// authRoutes.js or userRoutes.js

const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


router.get('/:userId', authMiddleware, getProfile);  // Get user profile
router.put('/:userId', authMiddleware, updateProfile);  // Update user profile

module.exports = router;
