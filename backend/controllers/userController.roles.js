// controllers/userController.js
const User = require('../models/userModel');
const Role = require('../models/roleModel');

const getRolesForUser = async (req, res) => {
    const { userId } = req.params; // Assuming you have a userId as a parameter

    try {
        const user = await User.findByPk(userId, {
            include: Role, // Include the Role model in the query
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const roles = user.Roles; // Access the roles assigned to the user

        res.status(200).json({ roles });
    } catch (error) {
        console.error('Error retrieving roles for user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getRolesForUser,
};
