const express = require('express');
const router = express.Router();
const { 
    getTasksByUser,
    updateTaskStatus,
    uploadTaskFiles,
    editTask,
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

router.post('/tasks/user', getTasksByUser);  

router.patch('/tasks/:id/status', updateTaskStatus);
router.post('/tasks/:id/files', uploadTaskFiles);
router.patch('/tasks/:id/edit', editTask);

// Task management routes
router.post('/', createTask); 
router.get('/', getAllTasks); 
router.get('/:id', getTaskById); 
router.put('/:id', updateTask); 
router.delete('/:id', deleteTask);

module.exports = router;

