const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key'; // Replace with your actual secret key

module.exports = (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');

    // Check if a token is provided
    if (!token) {
        return res.status(401).json({ error: 'Access denied. Token missing.' });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Access denied. Invalid token.' });
        }

        // If the token is valid, add the user information to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route
    });
};
