const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');

// Get all activity logs
router.get('/activity-logs', activityLogController.getActivityLogs);

// Create a new activity log
router.post('/add-activity-log', activityLogController.createActivityLog);

// Update an activity log
router.put('/update-activity-log/:id', activityLogController.updateActivityLog);

// Delete an activity log
router.delete('/delete-activity-log/:id', activityLogController.deleteActivityLog);

// Get a single activity log
router.get('/activity-log/:id', activityLogController.getActivityLog);

module.exports = router;

