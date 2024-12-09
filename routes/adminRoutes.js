const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const nodemailer=require("nodemailer");

// Add User
router.post('/add-user', adminController.addUser);
// Update User
router.put('/update-user/:id', adminController.updateUser);
// Delete User
router.delete('/delete-user/:id', adminController.deleteUser);
// View User List
router.get('/users', adminController.viewUsers);

//Project

// Create a new project
router.post('/add-project', adminController.addProject);
// Update a project by ID
router.put('/update-project/:id', adminController.updateProject);
// Delete a project by ID
router.delete('/delete-project/:id', adminController.deleteProject);
// View all projects
router.get('/projects', adminController.viewProjects);
// View a single project by ID
router.get('/projects/:id', adminController.viewProjectById);

//Dashboard
router.get('/dashboard', adminController.getDashboardData);

router.post('/send-email', async (req, res) => {
    const { recipient, subject, content } = req.body;  // Get recipient, subject, and content from the request body
    
    // Check if all required fields are provided
    if (!recipient || !subject || !content) {
      return res.status(400).json({ message: 'Recipient, subject, and content are required.' });
    }
  
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
        user: 'usmanghanicoc3@gmail.com',  // Replace with your email
        pass: 'tipusultan123',   // Replace with your email password or an app password
      },
    });

    
      
  
    // Email options
    const mailOptions = {
      from: 'usmanghanicoc3@gmail.com',   // Your email address
      to: recipient,                  // The recipient's email
      subject: subject,               // Subject of the email
      text: content,                  // Email content
    };
  
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Failed to send email', error: error.message });
    }
  });

module.exports = router;


