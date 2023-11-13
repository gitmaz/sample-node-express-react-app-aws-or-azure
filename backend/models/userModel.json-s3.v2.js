// userModel.js
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');

const userFilePath = path.join(__dirname, 'users.json');
const s3BucketName = 'your-s3-bucket-name'; // Replace with your S3 bucket name

let s3;

if (process.env.NODE_ENV === 'production') {
    // Configure AWS SDK for S3
    AWS.config.update({
        accessKeyId: 'YOUR_AWS_ACCESS_KEY',
        secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
        region: 'us-east-1', // Replace with your AWS region
    });

    s3 = new AWS.S3();
}

function getUsers() {
    if (s3) {
        // Read user data from S3 in the "production" environment
        const params = {
            Bucket: s3BucketName,
            Key: 'users.json',
        };
        return s3.getObject(params).promise().then((data) => JSON.parse(data.Body.toString()));
    } else {
        // Read user data from the local JSON file
        const data = fs.readFileSync(userFilePath, 'utf-8');
        return JSON.parse(data);
    }
}

function saveUsers(users) {
    if (s3) {
        // Write user data to S3 in the "production" environment
        const params = {
            Bucket: s3BucketName,
            Key: 'users.json',
            Body: JSON.stringify(users, null, 2),
        };
        return s3.putObject(params).promise();
    } else {
        // Write user data to the local JSON file
        fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2));
    }
}

module.exports = {
    getUsers,
    saveUsers,
};
