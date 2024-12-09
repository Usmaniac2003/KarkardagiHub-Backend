const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Task = require('../models/Task');
const Project = require('../models/Project');
const Notification = require('../models/Notification');

// Add User
exports.addUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    // Validate the input (optional but recommended)
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        // Hash the password with bcrypt
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds, you can adjust it

        // Create a new user with the hashed password
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Store the hashed password
            role
        });

        // Save the new user to the database
        await newUser.save();

        res.status(201).json({ message: 'User added successfully', user: newUser });
    } catch (error) {
        console.error(error);
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
    const {filters} = req.params;
  
    if (search) {
        filters.$or = [
        { username: new RegExp(search, 'i') },  // Case-insensitive search for username
        { email: new RegExp(search, 'i') }     // Case-insensitive search for email
      ];
    }
  
    if (role) {
        filters.role = role;  // Filter by role if provided
    }
  
    try {
      const users = await User.find(filters);
      res.status(200).json({ message: 'Users retrieved successfully', users });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error });
    }
  };
  


//Projects

// Add a new project
exports.addProject = async (req, res) => {
  const { project_name, description, start_date, end_date, assigned_manager, priority, points, team_members, status } = req.body;

  if (!project_name || !start_date || !assigned_manager) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    // Create the new project
    const newProject = new Project({
      project_name,
      description,
      start_date,
      end_date,
      assigned_manager,
      priority,
      points,
      team_members,
      status
    });

    // Save the project to the database
    await newProject.save();
    res.status(201).json({ message: 'Project added successfully', project: newProject });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding project', error });
  }
};

// Update a project by ID
exports.updateProject = async (req, res) => {
  const projectId = req.params.id;
  const updates = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(projectId, updates, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: 'Error updating project', error });
  }
};

// Delete a project by ID
exports.deleteProject = async (req, res) => {
  const projectId = req.params.id;

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);

    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting project', error });
  }
};

// View all projects
exports.viewProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate('assigned_manager', 'username email');  // Populate manager's info

    res.status(200).json({ message: 'Projects retrieved successfully', projects });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving projects', error });
  }
};

// View a single project by ID
exports.viewProjectById = async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await Project.findById(projectId).populate('assigned_manager', 'username email').populate('team_members', 'username email');  // Populate team members' info

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project retrieved successfully', project });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving project', error });
  }
};

// Dashboard
// Get total number of Managers
exports.getTotalManagers = async (req, res) => {
  try {
    const managers = await User.countDocuments({ role: 'manager' });
    res.json({ totalManagers: managers });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching total managers' });
  }
};

// Get total number of Staff (Non-manager users)
exports.getTotalStaff = async (req, res) => {
  try {
    const staff = await User.countDocuments({ role: 'user' });
    res.json({ totalStaff: staff });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching total staff' });
  }
};

// Get total number of Active Users
exports.getActiveUsers = async (req, res) => {
  try {
    const activeUsers = await User.countDocuments({ status: 'active' });
    res.json({ totalActiveUsers: activeUsers });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching active users' });
  }
};

// Get total number of Projects
exports.getTotalProjects = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    res.json({ totalProjects });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching total projects' });
  }
};

// Get total number of Active Projects
exports.getActiveProjects = async (req, res) => {
  try {
    const activeProjects = await Project.countDocuments({ status: 'Active' });
    res.json({ totalActiveProjects: activeProjects });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching active projects' });
  }
};

// Get total number of Tasks
exports.getTotalTasks = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    res.json({ totalTasks });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching total tasks' });
  }
};

// Get total number of Completed Tasks
exports.getCompletedTasks = async (req, res) => {
  try {
    const completedTasks = await Task.countDocuments({ status: 'Completed' });
    res.json({ totalCompletedTasks: completedTasks });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching completed tasks' });
  }
};

// Get total number of Pending Reviews
exports.getPendingReviews = async (req, res) => {
  try {
    const pendingReviews = await ReviewSession.countDocuments({ status: 'Pending' });
    res.json({ totalPendingReviews: pendingReviews });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching pending reviews' });
  }
};

// Get total number of Users with Badges
exports.getUsersWithBadges = async (req, res) => {
  try {
    const usersWithBadges = await User.countDocuments({ badges: { $ne: [] } });
    res.json({ totalUsersWithBadges: usersWithBadges });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users with badges' });
  }
};
const getTotalManagers = async () => {
  // Replace with actual logic to get total managers from your DB
  return 50; // Example static value
};

const getTotalStaff = async () => {
  // Replace with actual logic to get total staff from your DB
  return 100; // Example static value
};

const getActiveUsers = async () => {
  // Replace with actual logic to get active users
  return 80; // Example static value
};

const getTotalProjects = async () => {
  // Replace with actual logic to get total projects
  return 30; // Example static value
};

const getActiveProjects = async () => {
  // Replace with actual logic to get active projects
  return 15; // Example static value
};

const getTotalTasks = async () => {
  // Replace with actual logic to get total tasks
  return 120; // Example static value
};

const getCompletedTasks = async () => {
  // Replace with actual logic to get completed tasks
  return 85; // Example static value
};

const getPendingReviews = async () => {
  // Replace with actual logic to get pending reviews
  return 10; // Example static value
};

const getUsersWithBadges = async () => {
  // Replace with actual logic to get users with badges
  return 20; // Example static value
};

exports.getDashboardData = async (req, res) => {
  try {
    // Fetch all metrics concurrently
    const [
      totalManagers,
      totalStaff,
      totalActiveUsers,
      totalProjects,
      totalActiveProjects,
      totalTasks,
      totalCompletedTasks,
      pendingReviews,
      usersWithBadges
    ] = await Promise.all([
      getTotalManagers(),
      getTotalStaff(),
      getActiveUsers(),
      getTotalProjects(),
      getActiveProjects(),
      getTotalTasks(),
      getCompletedTasks(),
      getPendingReviews(),
      getUsersWithBadges()
    ]);

    // Return the collected data as a response
    res.json({
      totalManagers,
      totalStaff,
      totalActiveUsers,
      totalProjects,
      totalActiveProjects,
      totalTasks,
      totalCompletedTasks,
      pendingReviews,
      usersWithBadges
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({ message: "An error occurred while fetching dashboard data." });
  }
};