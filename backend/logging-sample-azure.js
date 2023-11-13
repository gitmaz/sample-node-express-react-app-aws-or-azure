const logger = require('./logger');

logger.log('info', 'This is an example log message.');

// You can log custom events to Application Insights (production only)
if (config.isProduction) {
    const appInsights = require('applicationinsights');
    appInsights.defaultClient.trackEvent({ name: 'CustomEvent', properties: { key: 'value' } });
}
