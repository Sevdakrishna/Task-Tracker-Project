const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');
const taskController = require('../controllers/taskController');

router.post('/create', authenticateToken, taskController.addTask);
router.get('/my-tasks', authenticateToken, taskController.getUserTasks);

router.put('/:id/status', authenticateToken, taskController.updateTaskStatus);

router.put('/:id/edit', authenticateToken, taskController.editTask);

router.delete('/:id/delete', authenticateToken, taskController.deleteTask);

router.get('/weekly-summary', authenticateToken, taskController.getWeeklySummary);



module.exports = router;
