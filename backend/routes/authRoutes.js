// --- server/routes/authRoutes.js ---
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require("jsonwebtoken");


router.post('/register', authController.register);
router.post('/login', authController.login);


// 🔁 Token refresh route
router.post("/token", (req, res) => {
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
});

module.exports = router;
