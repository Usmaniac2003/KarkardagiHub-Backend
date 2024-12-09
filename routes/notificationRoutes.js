const express = require('express');
const { getNotifications, createNotification } = require('../controllers/notificationController');
const router = express.Router();

// Route to get notifications (accepts query parameter `generated_by`)
router.get('/', getNotifications);

// Route to create a notification
router.post('/create', createNotification);

module.exports = router;
