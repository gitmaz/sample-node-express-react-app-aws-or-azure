// userModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    // other user attributes
});

module.exports = User;

// roleModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const Role = sequelize.define('Role', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    // other role attributes
});

module.exports = Role;

// userRoleModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize');

const UserRole = sequelize.define('UserRole', {
    // Define any additional attributes if needed
});

// Define associations
User.belongsToMany(Role, { through: UserRole });
Role.belongsToMany(User, { through: UserRole });

module.exports = UserRole;
