const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activityLogSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // User performing the action
  activity_type: { type: String, required: true },  // Type of activity (e.g., Task Assignment, Task Completion, Review)
  activity_details: { type: String },  // Description/details of the activity
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },  // Reference to Task (if applicable)
  hours_spent: { type: Number, default: 0 },  // Hours spent on the activity
  attendance: { type: Boolean, default: true },  // Attendance status (e.g., true for present, false for absent)
  timestamp: { type: Date, default: Date.now },  // Date/Time of Activity

  // File details added to Activity Log
  file_details: [{
    file_name: { type: String },
    file_url: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
