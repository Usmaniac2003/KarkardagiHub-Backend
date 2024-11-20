const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const URL=process.env.MONGODB_URI;
const DBNAME=process.env.DBNAME;
const URI=URL+DBNAME;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
