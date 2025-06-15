// --- server/routes/authRoutes.js ---
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const jwt = require("jsonwebtoken");


router.post('/register', authController.register);
router.post('/login', authController.login);


// Token refresh route
router.post("/token", authController.token);

module.exports = router;
