const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Add User
router.post('/add-user', adminController.addUser);

// Update User
router.put('/update-user/:id', adminController.updateUser);

// Delete User
router.delete('/delete-user/:id', adminController.deleteUser);

// View User List
router.get('/users', adminController.viewUsers);


module.exports = router;
