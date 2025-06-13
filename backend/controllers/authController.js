// --- server/controllers/authController.js ---
const userModel = require('../models/userModel');
const userDao = require('../dao/userDao');

// const register = async (req, res) => {
//   const { username, email, password, role } = req.body;
//   const existingUser = await userDao.findUserByEmail(email);
//   if (existingUser) return res.status(400).json({ message: 'User already exists' });
//   const userId = await userDao.createUser(username, email, password, role);
//   res.status(201).json({ message: 'User registered', userId });
// };

// const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await userDao.findUserByEmail(email);
//   if (!user) return res.status(401).json({ message: 'Invalid credentials' });
//   if (user.password !== password) return res.status(401).json({ message: 'Invalid credentials' });
//   res.json({ role: user.role, username: user.username });
// };

// module.exports = { register, login };



const { findUserByEmail, createUser } = require("../dao/userDao");
const { generateAccessToken, generateRefreshToken } = require("../services/authService");

exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: "Email already registered" });

  const userId = await createUser(username, email, password, role || 'user');
  const user = { id: userId, username, email, role: role || 'user' };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(201).json({ message: "Registered", accessToken, refreshToken, user });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  console.log(user)
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({ message: "Login successful", accessToken, refreshToken, user });
};
