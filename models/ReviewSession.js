const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSessionSchema = new Schema({
  employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Employee
  reviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reviewer (Manager)
  review_date: { type: Date, required: true },
  comments: { type: String },
  rating: { type: Number, min: 1, max: 5 },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },  // Reference to Task
  hours_spent: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('ReviewSession', reviewSessionSchema);
