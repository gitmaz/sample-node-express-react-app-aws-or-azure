// jobQueue.js
const AWS = require('aws-sdk');
const Bull = require('bull');

if (process.env.NODE_ENV === 'production') {
    // Configuration for AWS SQS in production
    const sqs = new AWS.SQS({ region: 'your-aws-region' }); // Replace with your AWS region
    const queueUrl = 'your-sqs-queue-url'; // Replace with your SQS queue URL

    const enqueueJob = async (data) => {
        const params = {
            MessageBody: JSON.stringify(data),
            QueueUrl: queueUrl,
        };

        const result = await sqs.sendMessage(params).promise();
        return result.MessageId;
    };

    module.exports = { enqueueJob };
} else {
    // Configuration for Bull in local development
    const queue = new Bull('my-job-queue');

    // Enqueue a job
    const enqueueJob = async (data) => {
        const job = await queue.add('process-job', data);
        return job;
    };

    module.exports = { queue, enqueueJob };
}
