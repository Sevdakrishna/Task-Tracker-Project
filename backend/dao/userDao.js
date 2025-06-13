// --- server/models/userModel.js ---
const db = require('../config/db');

const findUserByEmail = async (email) => {
    try{
        console.log(email)
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        // console.log(rows);
        return rows[0];
    }catch(e){
        console.log(e);
    }
};

const createUser = async (username, email, password, role) => {
  const [result] = await db.query(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
    [username, email, password, role]
  );
  return result.insertId;
};

module.exports = { findUserByEmail, createUser };