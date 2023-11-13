const nodemailer = require('nodemailer');

// Create a Nodemailer transporter using your Gmail account
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_app_password', // App password for Gmail
    },
});

// Define email data
const mailOptions = {
    from: 'your_email@gmail.com',
    to: 'recipient_email@example.com',
    subject: 'Hello from Nodemailer',
    text: 'This is a test email sent from Nodemailer.',
};

// Send the email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error sending email:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});
