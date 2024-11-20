const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteGenres: [{ type: String }],  // Array of favorite genres
    favoriteActors: [{ type: String }],  // Array of favorite actors
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'Movie' }],  // List of movie IDs
    customLists: [{ type: Schema.Types.ObjectId, ref: 'List' }],
    role:{type:String, required:true, default:"user"}
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
