// routes/api.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateToken = require('../middleware/authenticateToken'); // Assuming you have a middleware for token authentication

// Use authenticateToken middleware for these specific routes
router.post('/users', authenticateToken, userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;
