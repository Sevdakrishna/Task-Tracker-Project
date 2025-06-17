const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const adminController = require('../controllers/adminController');

router.get('/all-tasks', authenticateToken, adminController.getAllTasksForAdmin);

// router.get('/filter-tasks', authenticateToken, adminController.filterTasks);
router.get('/filter-tasks', authenticateToken, adminController.filterTasks);


router.get('/weekly-summary', authenticateToken, adminController.getWeeklySummaryForAllUsers);

router.get('/users', authenticateToken, adminController.getAllUsers);



module.exports = router;