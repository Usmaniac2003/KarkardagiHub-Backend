const Task = require('../models/Task');
const mongoose = require('mongoose');


// Create a new task
const createTask = async (req, res) => {
    try {
        // Convert each string in assigned_to to ObjectId using 'new' keyword
        const assignedTo = req.body.assigned_to.map(id => new mongoose.Types.ObjectId(id));

        // Create a new task object
        const task = new Task({
            ...req.body,
            assigned_to: assignedTo
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error creating task.', details: error.message });
    }
};
// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assigned_to').populate('project_id');
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching tasks.', details: error.message });
    }
};

// Get a single task
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('assigned_to').populate('project_id');
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching task.', details: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error updating task.', details: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found.' });
        }
        res.status(200).json({ message: 'Task deleted successfully.' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error deleting task.', details: error.message });
    }
};

// Get all tasks assigned to the user (without authentication)
const getTasksByUser = async (req, res) => {
    try {
      const userId = req.body.userId; // Assumes user ID is sent in the request body (you can modify this as needed)
      
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required.' });
      }
  
      // Find tasks where the user's ID is in the assigned_to array
      const tasks = await Task.find({ assigned_to: { $in: [userId] } });
  
      // If no tasks found
      if (tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks assigned to this user.' });
      }
  
      res.status(200).json(tasks);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error fetching tasks.', details: error.message });
    }
  };
  

// Update the status of a task
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ error: 'Task not found.' });
    if (task.assigned_to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to update this task.' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ message: 'Task status updated.', task });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error updating task status.', details: error.message });
  }
};

// Upload files for a task
const uploadTaskFiles = async (req, res) => {
  const { id } = req.params;
  const { file_name, file_url } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ error: 'Task not found.' });
    if (task.assigned_to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to upload files for this task.' });
    }

    task.file_details.push({ file_name, file_url });
    await task.save();

    res.status(200).json({ message: 'Files uploaded.', task });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error uploading files.', details: error.message });
  }
};

// Edit a submitted task
const editTask = async (req, res) => {
  const { id } = req.params;
  const { description, priority, status } = req.body;

  try {
    const task = await Task.findById(id);

    if (!task) return res.status(404).json({ error: 'Task not found.' });
    if (task.assigned_to.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to edit this task.' });
    }

    if (status) task.status = status;
    if (description) task.description = description;
    if (priority) task.priority = priority;

    await task.save();
    res.status(200).json({ message: 'Task updated.', task });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error editing task.', details: error.message });
  }
};

module.exports = {
    getTasksByUser,
  updateTaskStatus,
  uploadTaskFiles,
  editTask,
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

