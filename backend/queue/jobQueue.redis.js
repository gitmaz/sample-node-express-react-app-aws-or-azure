const { Worker, Queue, QueueScheduler } = require('bullmq');
const { redisConfig } = require('./config'); // Import your Redis configuration

const queue = new Queue('my-job-queue', {
    redis: redisConfig, // Configure Bull to use your Redis instance
});

// The rest of your job queue setup code
