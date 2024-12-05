const User = require('../models/User');

// Add User
exports.addUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const newUser = new User({ username, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error adding user', error });
    }
};

// Update User
exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const updates = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// View User List
exports.viewUsers = async (req, res) => {
    const { search, role } = req.query;
    const filter = {};

    if (search) {
        filter.$or = [
            { username: new RegExp(search, 'i') },
            { email: new RegExp(search, 'i') }
        ];
    }
    if (role) {
        filter.role = role;
    }

    try {
        const users = await User.find(filter);
        res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving users', error });
    }
};
