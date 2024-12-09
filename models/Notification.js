const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notificationSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  generated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to Admin
  created_at: { type: Date, default: Date.now },
  
  type: { type: String, enum: ['Deadline', 'Attendance','Submission'], default: 'Deadline' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);


