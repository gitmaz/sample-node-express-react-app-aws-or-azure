// models/userModel.js
const fs = require('fs');

const usersFilePath = 'users.json';

const getUserByUsername = (username) => {
    const users = getUsers();
    return users.find((user) => user.username === username);
};

const getUsers = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const createUser = (username, password) => {
    const users = getUsers();

    const existingUser = getUserByUsername(username);
    if (existingUser) {
        return null; // User already exists
    }

    const newUser = { username, password };
    users.push(newUser);
    saveUsers(users);
    return newUser;
};

module.exports = {
    getUserByUsername,
    createUser,
};
