const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//error log 
const notificationSchema = new Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to Admin
  created_at: { type: Date, default: Date.now },
  recipients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // List of Users
  status: { type: String, enum: ['Unread', 'Read'], default: 'Unread' }
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);


