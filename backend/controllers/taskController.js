const { createTask, getTasksByUserId } = require('../dao/taskDao');
const db = require('../config/db');

exports.addTask = async (req, res) => {
  const { title, description, due_date } = req.body;
  const userId = req.user.id;

  try {
    const taskId = await createTask(userId, title, description, due_date);
    res.status(201).json({ message: 'Task created', taskId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating task' });
  }
};

exports.getUserTasks = async (req, res) => {
  const userId = req.user.id;

  try {
    const tasks = await getTasksByUserId(userId);
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};




exports.updateTaskStatus = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { status } = req.body;

  // Validate status
  const allowedStatuses = ['Pending', 'In Progress', 'Completed'];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    // Ensure user owns the task
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (task.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    await db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, taskId]);
    res.status(200).json({ message: 'Task status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task status' });
  }
};




exports.editTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;
  const { title, description, due_date } = req.body;

  try {
    // Verify ownership
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (task.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Update task
    await db.query(
      'UPDATE tasks SET title = ?, description = ?, due_date = ? WHERE id = ?',
      [title, description, due_date, taskId]
    );

    res.status(200).json({ message: 'Task updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating task' });
  }
};



exports.deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.id;

  try {
    // Check if task exists and belongs to the user
    const [task] = await db.query('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
    if (task.length === 0) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }

    // Delete the task
    await db.query('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting task' });
  }
};




exports.getWeeklySummary = async (req, res) => {
  const userId = req.user.id;

  try {
    const [summary] = await db.query(
      `
      SELECT
        COUNT(*) AS total,
        SUM(status = 'Pending') AS pending,
        SUM(status = 'In Progress') AS inProgress,
        SUM(status = 'Completed') AS completed
      FROM tasks
      WHERE user_id = ? AND YEARWEEK(due_date, 1) = YEARWEEK(CURDATE(), 1)
      `,
      [userId]
    );

    res.status(200).json({ summary: summary[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting weekly summary' });
  }
};



