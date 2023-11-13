const winston = require('winston');
const appInsights = require('applicationinsights');
const config = require('./config');

// Configure Application Insights
if (config.isProduction) {
    appInsights.setup(config.instrumentationKey).start();
}

// Configure Winston
const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console(), // Log to console in all environments
    ],
});

if (config.isProduction) {
    // Log to Application Insights
    logger.add(new winston.transports.ApplicationInsights({
        insights: appInsights.defaultClient,
    }));
} else {
    // Log to a local file for development
    logger.add(new winston.transports.File({ filename: 'app-logs.log' }));
}

module.exports = logger;
