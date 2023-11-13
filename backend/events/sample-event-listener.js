// Some other part of your application, e.g., notificationService.js
const userEvents = require('../eventEmitter'); // Import the event emitter

userEvents.on('userCreated', (newUser) => {
    console.log(`New user created: ${newUser.username}`);
    // You can perform actions like sending a notification or logging here
});
