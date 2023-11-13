// jobQueue.js
const { Worker, Queue, QueueScheduler } = require('bullmq');

const queue = new Queue('my-job-queue');

// Enqueue a job
const enqueueJob = async (data) => {
    const job = await queue.add('process-job', data);
    return job;
};

module.exports = { queue, enqueueJob };
