// jobQueue.js
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'your-aws-region' }); // Replace with your AWS region

const queueUrl = 'your-sqs-queue-url'; // Replace with your SQS queue URL

// Enqueue a job
const enqueueJob = async (data) => {
    const params = {
        MessageBody: JSON.stringify(data),
        QueueUrl: queueUrl,
    };

    const result = await sqs.sendMessage(params).promise();
    return result.MessageId;
};

module.exports = { enqueueJob };
