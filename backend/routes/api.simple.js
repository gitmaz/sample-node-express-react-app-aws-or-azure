// routes/api.simple.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const jwt = require('jsonwebtoken');

const fs = require('fs');

const secretKey = 'your-secret-key';
const usersFilePath = 'users.json';

// Middleware to check JWT token before accessing the /users endpoint
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (token === null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user; // Store the authenticated user in the request object
        next();
    });
};

router.post('/users', (req, res) => {
    const { username, password } = req.body;

    // In a real application, you might want to validate the input data.
    // Here, we assume the input is valid.

    const newUser = userModel.createUser(username, password);
    if (!newUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    res.status(201).json({ message: 'User created' });
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = userModel.getUserByUsername(username);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(user, secretKey);
    res.json({ token });
});

module.exports = router;