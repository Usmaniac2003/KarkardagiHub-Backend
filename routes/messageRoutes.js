const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


router.post('/send', messageController.sendMessage);
router.get('/conversation/:userId', messageController.getConversation);
router.put('/read/:messageId', messageController.markAsRead);

module.exports = router;

