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

exports.getUsers = async (req, res) => {
    try {
        // Fetch all fields for all users
        const users = await User.find({});

        // Respond with the users data
        res.status(200).json({ users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users', error: error.message });
    }
};

exports.createUser = async (req, res) => {
    try {
      // Destructure the user data from the request body
      const { username, email, password, role, status, manager_id, team_number, total_points_earned, badges, reward_lists } = req.body;
  
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        username,
        email,
        password, // In real-world apps, you'd hash the password before saving it
        role,
        status,
        manager_id,
        team_number,
        total_points_earned,
        badges,
        reward_lists
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Respond with the created user data (excluding password for security)
      res.status(201).json({
        message: 'User created successfully',
        user: {
          username: newUser.username,
          email: newUser.email,
          role: newUser.role,
          status: newUser.status,
          manager_id: newUser.manager_id,
          team_number: newUser.team_number,
          total_points_earned: newUser.total_points_earned,
          badges: newUser.badges,
          reward_lists: newUser.reward_lists
        }
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Error creating user', error: error.message });
    }
  };
