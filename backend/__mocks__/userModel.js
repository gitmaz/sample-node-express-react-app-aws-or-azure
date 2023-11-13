// __mocks__/userModel.js
module.exports = {
    getUserById: (userId) => {
        // Implement a mock response for getUserById
        return { id: userId, name: 'Mock User' };
    },
};
