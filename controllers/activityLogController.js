const ActivityLog = require('../models/ActivityLog');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Helper function to validate ObjectId
const isValidObjectId = (id) => {
  try {
    return ObjectId.isValid(id) && String(new ObjectId(id)) === id;
  } catch (error) {
    return false;
  }
};

// Get all activity logs
exports.getActivityLogs = async (req, res) => {
  try {
    const activityLogs = await ActivityLog.find(req.query)
      .populate('user_id', 'name email')
      .populate('task_id', 'task_name');
    res.json(activityLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new activity log
exports.createActivityLog = async (req, res) => {
  try {
    const {
      user_id,
      activity_type,
      activity_details,
      task_id,
      hours_spent,
      file_details
    } = req.body;

    // Validate user_id
    if (!user_id || !mongoose.Types.ObjectId.isValid(user_id)) {
      return res.status(400).json({ message: 'Invalid or missing user_id' });
    }

    // Create new activity log
    const activityLog = new ActivityLog({
      user_id: new mongoose.Types.ObjectId(user_id),
      activity_type,
      activity_details,
      hours_spent: Number(hours_spent) || 0,
      file_details: Array.isArray(file_details) ? file_details : []
    });

    // Only add task_id if it's provided and valid
    if (task_id && mongoose.Types.ObjectId.isValid(task_id)) {
      activityLog.task_id = new mongoose.Types.ObjectId(task_id);
    }

    const savedActivityLog = await activityLog.save();
    
    res.status(201).json(savedActivityLog);
  } catch (error) {
    console.error('Activity Log Creation Error:', error);
    res.status(400).json({ 
      message: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
};

// Update an activity log
exports.updateActivityLog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // Validate ObjectIds in update data
    if (updateData.user_id && !isValidObjectId(updateData.user_id)) {
      return res.status(400).json({ message: 'Invalid user_id format' });
    }
    if (updateData.task_id && !isValidObjectId(updateData.task_id)) {
      return res.status(400).json({ message: 'Invalid task_id format' });
    }

    // Convert IDs to ObjectId if present
    if (updateData.user_id) updateData.user_id = new ObjectId(updateData.user_id);
    if (updateData.task_id) updateData.task_id = new ObjectId(updateData.task_id);

    const updatedActivityLog = await ActivityLog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('user_id', 'name email')
      .populate('task_id', 'task_name');

    if (!updatedActivityLog) {
      return res.status(404).json({ message: 'Activity log not found' });
    }

    res.json(updatedActivityLog);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      details: error.errors ? Object.values(error.errors).map(err => err.message) : []
    });
  }
};

// Delete an activity log
exports.deleteActivityLog = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid activity log id format' });
    }

    const activityLog = await ActivityLog.findByIdAndDelete(id);
    if (!activityLog) {
      return res.status(404).json({ message: 'Activity log not found' });
    }

    res.json({ message: 'Activity log deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single activity log
exports.getActivityLog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: 'Invalid activity log id format' });
    }

    const activityLog = await ActivityLog.findById(id)
      .populate('user_id', 'name email')
      .populate('task_id', 'task_name');

    if (!activityLog) {
      return res.status(404).json({ message: 'Activity log not found' });
    }

    res.json(activityLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllActivityLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skipIndex = (page - 1) * limit;

    const logs = await ActivityLog.find()
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skipIndex)
      .populate('user_id', 'name email')
      .populate('task_id', 'task_name');

    const totalLogs = await ActivityLog.countDocuments();
    const totalPages = Math.ceil(totalLogs / limit);

    res.status(200).json({
      success: true,
      count: logs.length,
      page,
      totalPages,
      data: logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching activity logs",
      error: error.message
    });
  }
};


