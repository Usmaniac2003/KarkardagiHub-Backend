const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },

    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    manager_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the user's manager
    team_number: { type: Number,default: 0} ,
    total_points_earned: { type: Number, default: 0 },
    badges: [{ type: String }],  // List of badges awarded
    reward_lists: [{ type: String }],  // List of rewards
    
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
