const winston = require('winston');
const WinstonCloudWatch = require('winston-cloudwatch');

const isProduction = process.env.NODE_ENV === 'production';

const loggerAws = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(), // Log to console in all environments
    ],
});

if (isProduction) {
    const cloudWatchTransport = new WinstonCloudWatch({
        logGroupName: 'your-log-group-name',
        logStreamName: 'your-log-stream-name',
        awsAccessKeyId: 'YOUR_ACCESS_KEY',
        awsSecretKey: 'YOUR_SECRET_ACCESS_KEY',
        awsRegion: 'YOUR_AWS_REGION',
    });

    loggerAws.add(cloudWatchTransport);
} else {
    loggerAws.add(new winston.transports.File({ filename: 'app-logs.log' }));
}

// Usage:
loggerAws.log('info', 'This is an example log message.');
