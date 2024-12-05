const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  project_name: { type: String, required: true },
  description: { type: String },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  assigned_manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Active', 'On Hold', 'Completed'], default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
