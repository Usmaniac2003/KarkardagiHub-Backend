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

//Project

// Create a new project
router.post('/add-project', adminController.addProject);
// Update a project by ID
router.put('/update-project/:id', adminController.updateProject);
// Delete a project by ID
router.delete('/delete-project/:id', adminController.deleteProject);
// View all projects
router.get('/projects', adminController.viewProjects);
// View a single project by ID
router.get('/projects/:id', adminController.viewProjectById);

module.exports = router;
