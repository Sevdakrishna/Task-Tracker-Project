const db = require('../config/db');

class DatabaseError extends Error {
    constructor(message, originalError) {
        super(message);
        this.name = 'DatabaseError';
        this.originalError = originalError;
    }
}

const findUserByEmail = async (email) => {
    try {
      //validation
        if (!email) throw new Error('Email is required');
        
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    } catch (error) {
        console.error('Database error in findUserByEmail:', error);
        throw new DatabaseError('Failed to find user', error);
    }
};

const createUser = async (username, email, password, role) => {
    try {
      //validation
        if (!username || !email || !password) {
            throw new Error('Username, email and password are required');
        }

        const [result] = await db.query(
            'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
            [username, email, password, role]
        );
        
        if (!result.insertId) {
            throw new Error('Failed to create user');
        }
        
        return result.insertId;
    } catch (error) {
        console.error('Database error in createUser:', error);
        if (error.code === 'ER_DUP_ENTRY') {
            throw new DatabaseError('Email already exists', error);
        }
        throw new DatabaseError('Failed to create user', error);
    }
};

module.exports = { findUserByEmail, createUser };