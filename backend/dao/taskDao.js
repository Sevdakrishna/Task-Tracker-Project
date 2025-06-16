// dao/taskDao.js
const db = require('../config/db');

const createTask = async (userId, title, description, dueDate) => {
  const [result] = await db.query(
    'INSERT INTO tasks (user_id, title, description, due_date) VALUES (?, ?, ?, ?)',
    [userId, title, description, dueDate]
  );
  return result.insertId;
};

const getTasksByUserId = async (userId) => {
  const [rows] = await db.query(
    'SELECT * FROM tasks WHERE user_id = ? ORDER BY due_date',
    [userId]
  );
  return rows;
};

// Add more methods for update, delete, filter later

module.exports = { createTask, getTasksByUserId };
