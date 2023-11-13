// app.js
const sequelize = require('./sequelize');
const User = require('./models/userModel');

(async () => {
    try {
        await sequelize.sync();
        console.log('Database is connected and models are synchronized.');
    } catch (error) {
        console.error('Error syncing models:', error);
    }
})();
