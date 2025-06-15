const userModel = require('../models/userModel');
const userDao = require('../dao/userDao');
const { findUserByEmail, createUser } = require("../dao/userDao");
const { generateAccessToken, generateRefreshToken } = require("../services/authService");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;


exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) return res.status(400).json({ message: "Email already registered" });

  const encrPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const userId = await createUser(username, email, encrPassword, role || 'user');
  const user = { id: userId, username, email, role: role || 'user' };

  // const accessToken = generateAccessToken(user);
  // const refreshToken = generateRefreshToken(user);

  res.status(201).json({ message: "Registered", user });
};



exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare plain password with hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.status(200).json({ message: "Login successful", accessToken, refreshToken, user });
};



exports.token = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: "No refresh token provided" });

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    res.json({ accessToken });
  });
}

