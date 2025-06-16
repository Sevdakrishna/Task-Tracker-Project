const db = require('../config/db');
const { createTask, getTasksByUserId } = require('../dao/taskDao');

exports.getAllTasksForAdmin = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const [tasks] = await db.query(`
      SELECT t.id, t.title, t.description, t.due_date, t.status, t.user_id, u.username, u.email
      FROM tasks t
      JOIN users u ON t.user_id = u.id
      ORDER BY t.due_date DESC
    `);

    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving all tasks' });
  }
};



// Filter tasks by user or status
exports.filterTasks = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  const { user_id, status } = req.query;
  let query = `
    SELECT t.id, t.title, t.description, t.due_date, t.status, t.user_id, u.username, u.email
    FROM tasks t
    JOIN users u ON t.user_id = u.id
    WHERE 1=1
  `;
  const values = [];

  if (user_id) {
    query += ' AND t.user_id = ?';
    values.push(user_id);
  }

  if (status) {
    query += ' AND t.status = ?';
    values.push(status);
  }

  query += ' ORDER BY t.due_date DESC';

  try {
    const [tasks] = await db.query(query, values);
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error filtering tasks' });
  }
};





exports.getWeeklySummaryForAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admins only' });
  }

  try {
    const [summary] = await db.query(`
      SELECT 
        COUNT(*) AS total,
        SUM(status = 'Pending') AS pending,
        SUM(status = 'In Progress') AS inProgress,
        SUM(status = 'Completed') AS completed
      FROM tasks
      WHERE YEARWEEK(due_date, 1) = YEARWEEK(CURDATE(), 1)
    `);

    res.status(200).json({ summary: summary[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error getting weekly summary' });
  }
};

