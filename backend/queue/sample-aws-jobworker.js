// jobWorker.js
const AWS = require('aws-sdk');
const Bull = require('bull');

if (process.env.NODE_ENV === 'production') {
    // Configuration for AWS SQS in production
    const sqs = new AWS.SQS({ region: 'your-aws-region' }); // Replace with your AWS region
    const queueUrl = 'your-sqs-queue-url'; // Replace with your SQS queue URL

    const processJob = async (message) => {
        const data = JSON.parse(message.Body);
        // Add your job processing logic here
    };

    const pollMessages = async () => {
        const params = {
            QueueUrl: queueUrl,
            MaxNumberOfMessages: 1,
            WaitTimeSeconds: 20, // Adjust this as needed
        };

        try {
            const data = await sqs.receiveMessage(params).promise();
            if (data.Messages) {
                const message = data.Messages[0];
                await processJob(message);
                await sqs.deleteMessage({ QueueUrl: queueUrl, ReceiptHandle: message.ReceiptHandle }).promise();
            }
        } catch (error) {
            console.error('Error processing job:', error);
        }
    }

    // Poll for and process messages continuously
    setInterval(pollMessages, 1000); // Adjust the interval as needed
} else {
    // Configuration for Bull in local development
    const queue = new Bull('my-job-queue');

    const worker = new BullWorker('my-job-queue', async (job) => {
        // Process the job data
        const data = job.data;
        console.log('Processing job:', data);
        // Add your job processing logic here
    });
}
