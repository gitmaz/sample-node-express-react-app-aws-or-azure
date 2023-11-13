// statisticsService.js
const userEvents = require('./eventEmitter'); // Import the event emitter
const db = require('./database'); // Import your database connection

userEvents.on('userCreated', (newUser) => {
    // Store user statistics in the MySQL database
    const { username } = newUser;

    // Perform database query to insert user statistics
    const sql = 'INSERT INTO user_statistics (username) VALUES (?)';
    db.query(sql, [username], (err, results) => {
        if (err) {
            console.error('Error storing user statistics:', err);
        } else {
            console.log('User statistics stored successfully.');
        }
    });
});
