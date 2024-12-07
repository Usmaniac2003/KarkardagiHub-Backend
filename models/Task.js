const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  task_name: { type: String, required: true },
  description: { type: String },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User
  due_date: { type: Date },
  
  
  assigned_date: { type: Date, default: Date.now },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], required: true },
  project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },  // Reference to Project
  points_worth: { type: Number, default: 0 },
  manager_comment: { type: String },  // New field for a single comment from the manager

  // File details added to Task
  file_details: [{
    file_name: { type: String },
    file_url: { type: String }
  }]
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
