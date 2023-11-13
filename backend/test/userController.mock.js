const chai = require('chai');
const sinon = require('sinon');
const userController = require('./userController');
const userModel = require('./userModel');

const { expect } = chai;

describe('getUser', () => {
    it('returns a user', () => {
        // Mock the behavior of the userModel.getUserById function
        const mockUser = { id: 1, name: 'Mock User' };
        const getUserByIdStub = sinon.stub(userModel, 'getUserById').returns(mockUser);

        // Perform the test
        const user = userController.getUser(1);

        // Assertions
        expect(user).to.eql(mockUser);

        // Restore the original function to avoid affecting other tests
        getUserByIdStub.restore();
    });
});
