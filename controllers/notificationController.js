const Notification = require('../models/Notification');
const Task = require('../models/Task');

exports.createNotification = async (req, res) => {
    try {
      const { taskId, userId, type } = req.body;
  
      if (!taskId || !userId || !type) {
        return res.status(400).json({ error: 'Task ID, User ID, and type are required.' });
      }
  
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      const title = type === 'Submission' ? 'Task Submitted Successfully' : 'Task Submission Overdue';
      const description = `Task: ${task.task_name} - ${type === 'Submission' ? 'submitted on time' : 'submitted after the deadline'}`;
  
      const notification = new Notification({
        title,
        description,
        generated_by: userId,
        type,
      });
  
      await notification.save();
      res.status(201).json(notification);
    } catch (error) {
      console.error('Error creating notification:', error);
      res.status(500).json({ error: 'Error creating notification', details: error.message });
    }
  };
  

exports.getNotifications = async (req, res) => {
    try {
      // Use query parameter or a hardcoded ID for testing
      const generatedBy = req.query.generated_by || '6753141f81d79f72aa3cfe96'; // Replace with an actual user ID from your database
      
      if (!generatedBy) {
        return res.status(400).json({ error: 'generated_by parameter is required.' });
      }
  
      const notifications = await Notification.find({ generated_by: generatedBy })
        .sort({ created_at: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({ error: 'Error fetching notifications', details: error.message });
    }
  };
  