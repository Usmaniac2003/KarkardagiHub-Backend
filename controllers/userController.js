const User = require('../models/User');

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    const { username, email, favoriteGenres,favoriteActors } = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            { username, email, favoriteGenres,favoriteActors },
            { new: true, select: '-password' }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating profile', error });
    }
};

