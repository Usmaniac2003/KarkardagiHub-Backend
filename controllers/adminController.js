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