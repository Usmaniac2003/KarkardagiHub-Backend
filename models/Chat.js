const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    team_number: { type: Number, required: true },  // The team the message belongs to
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to the user sending the message
    message: { type: String, required: true },  // The actual chat message
    timestamp: { type: Date, default: Date.now },  // Time when the message was sent
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
