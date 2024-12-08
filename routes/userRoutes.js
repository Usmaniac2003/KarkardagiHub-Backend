// authRoutes.js or userRoutes.js

const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
const authenticate = require('../middlewares/authMiddleware');
const userController  = require('../controllers/userController');

const router = express.Router();


router.get('/:userId', authenticate, getProfile);  // Get user profile
router.put('/:userId', authenticate, updateProfile);  // Update user profile
router.get('/', userController.getUsers);
router.post('/users', userController.createUser);

module.exports = router;
