// config.js
module.exports = {
    instrumentationKey: 'YOUR_INSTRUMENTATION_KEY', // Replace with your Application Insights Instrumentation Key
    isProduction: process.env.NODE_ENV === 'production',
};
