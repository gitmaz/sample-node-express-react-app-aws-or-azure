// userController.test.js
jest.mock('./userModel'); // Mock userModel.js

const userController = require('./userController');
const userModel = require('./userModel'); // Import the mocked userModel

describe('getUser', () => {
    it('returns a user', () => {
        userModel.getUserById.mockReturnValue({ id: 1, name: 'Mock User' });
        const user = userController.getUser(1);
        expect(user).toEqual({ id: 1, name: 'Mock User' });
    });
});
