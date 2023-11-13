// jobWorker.js
const { Worker, QueueScheduler } = require('bullmq');
const { queue } = require('./jobQueue'); // Import the queue you defined

const worker = new Worker('my-job-queue', async (job) => {
    // Process the job data
    const data = job.data;
    console.log('Processing job:', data);
    // Add your job processing logic here
});

// Optional: Create a Queue Scheduler for delayed jobs
const queueScheduler = new QueueScheduler('my-job-queue');
