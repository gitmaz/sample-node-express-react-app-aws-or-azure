// test/userModel.test.js
const chai = require('chai');
const { expect } = chai;
const userModel = require('../models/userModel');

describe('User Model', () => {
    beforeEach(() => {
        // Reset the user list before each test
        userModel.clearUsers();
    });

    describe('createUser', () => {
        it('should create a new user', () => {
            const user = userModel.createUser('newuser', 'password');
            expect(user).to.exist;
            expect(user.username).to.equal('newuser');
            expect(user.password).to.equal('password');
        });

        it('should return null if the username already exists', () => {
            userModel.createUser('existinguser', 'password');
            const user = userModel.createUser('existinguser', 'password');
            expect(user).to.be.null;
        });
    });

    describe('getUserByUsername', () => {
        it('should return the user with the specified username', () => {
            userModel.createUser('testuser', 'password');
            const user = userModel.getUserByUsername('testuser');
            expect(user).to.exist;
            expect(user.username).to.equal('testuser');
        });

        it('should return null if the username does not exist', () => {
            const user = userModel.getUserByUsername('nonexistentuser');
            expect(user).to.be.null;
        });
    });
});
