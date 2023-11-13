// controllers/userController.js
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const userEvents = require('../eventEmitter'); // Import the event emitter
const { enqueueJob } = require('../jobQueue');

const secretKey = 'your-secret-key';

const createUser = (req, res) => {
    const { username, password } = req.body;

    const newUser = userModel.createUser(username, password);
    if (!newUser) {
        return res.status(409).json({ error: 'User already exists' });
    }

    // Emit a 'userCreated' event when a new user is created
    userEvents.emit('userCreated', newUser);

    res.status(201).json({ message: 'User created' });
};

const loginUser = (req, res) => {
    const { username, password } = req.body;

    const user = userModel.getUserByUsername(username);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign(user, secretKey);
    res.json({ token });
};

const createUser = async (req, res) => {
    const { username, password } = req.body;

    // Enqueue a job to process user creation
    await enqueueJob({ username, password });

    res.status(201).json({ message: 'User creation job enqueued' });
};


module.exports = {
    createUser,
    loginUser,
};
