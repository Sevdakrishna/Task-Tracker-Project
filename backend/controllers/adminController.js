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
      
    `);

    // console.log("Task Printing.")
    // console.log(tasks);
    res.status(200).json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving all tasks' });
  }
};


exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  try {
    const [users] = await db.query('SELECT id, username FROM users');
    res.status(200).json(users); // send directly as array
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error retrieving users' });
  }
};

exports.filterTasks = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }

  const { user_id, status, start_date, end_date } = req.query;

  let query = `
    SELECT t.id, t.title, t.description, t.due_date, t.status, t.user_id, u.username
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

  if (start_date) {
    query += ' AND t.due_date >= ?';
    values.push(start_date);
  }

  if (end_date) {
    query += ' AND t.due_date <= ?';
    values.push(end_date);
  }

  query += ' ORDER BY t.due_date DESC';

  try {
    const [tasks] = await db.query(query, values);
    res.status(200).json(tasks);
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

