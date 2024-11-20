const User = require('../models/User');  // Import the User model if needed for verification

/**
 * Middleware to check if the user is an admin.
 */
const adminMiddleware = async (req, res, next) => {
    try {
        // Ensure req.user is populated by authMiddleware
        if (!req.user) {
            return res.status(401).json({ message: 'Authentication required.' });
        }
        // Fetch user details from the database
        const user = await User.findById(req.user._id);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        next(); // User is an admin, proceed
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


module.exports = adminMiddleware;
