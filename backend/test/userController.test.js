// test/userController.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is in app.js
const userModel = require('../models/userModel');
const { expect } = chai;

chai.use(chaiHttp);

describe('User Controller', () => {
    beforeEach(() => {
        // Reset the user list before each test
        userModel.clearUsers();
    });

    describe('createUser', () => {
        it('should create a new user', (done) => {
            chai
                .request(app)
                .post('/api/users')
                .send({ username: 'newuser', password: 'password' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body.message).to.equal('User created');
                    done();
                });
        });

        it('should not create a user if the username already exists', (done) => {
            // Create a user with the same username first
            userModel.createUser('existinguser', 'password');

            chai
                .request(app)
                .post('/api/users')
                .send({ username: 'existinguser', password: 'password' })
                .end((err, res) => {
                    expect(res).to.have.status(409);
                    expect(res.body.error).to.equal('User already exists');
                    done();
                });
        });
    });
});
