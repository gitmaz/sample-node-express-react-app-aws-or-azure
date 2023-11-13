// database.js
const mysql = require('mysql2'); // Import the MySQL library
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env; // Use environment variables for database configuration

// Create a connection pool to handle MySQL connections
const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10, // You can adjust the connection limit as needed
    queueLimit: 0,
});

// Export the pool as the database object
module.exports = pool;
