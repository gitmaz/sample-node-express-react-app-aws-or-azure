// sequelize.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', // Replace with your database dialect (e.g., mysql, postgres)
});

module.exports = sequelize;
